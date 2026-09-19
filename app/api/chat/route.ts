import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { nanoid } from 'nanoid'
import type { AdvisoryDecision, PageContext, SessionState } from '@/types'
import { buildAdvisorySystemPrompt } from '@/lib/advisory-quality/system-prompt'
import { getCompressionProfile } from '@/lib/advisory-quality/advisory-compression'
import { evaluateAdvisoryQuality } from '@/lib/advisory-quality/quality-evaluator'
import { finalizeAdvisoryResponse } from '@/lib/advisory-chat/finalize-response'
// ETAP 5 — Runtime Hardening
import { obs } from '@/lib/runtime-hardening/observability'
import {
  compositeRateLimitCheck,
  recordTokenUsage,
} from '@/lib/runtime-hardening/rate-limiter'
import {
  runSecurityCheck,
  validateChatRequestSchema,
} from '@/lib/runtime-hardening/security'
import {
  selectModel,
  checkBudget,
  recordTokenSpend,
  adaptiveMaxTokens,
  getBudgetStatus,
} from '@/lib/runtime-hardening/cost-governance'
import {
  classifyFailure,
  evaluateRetry,
} from '@/lib/runtime-hardening/retry-engine'
import {
  createStreamState,
  processChunk,
  registerStream,
  unregisterStream,
  hasActiveStream,
} from '@/lib/runtime-hardening/streaming-recovery'
import {
  acquireRequestLock,
  releaseRequestLock,
} from '@/lib/runtime-hardening/state-coordinator'
import {
  getFallbackResponse,
  reportFailure,
  reportSuccess,
  isDegraded,
  getCurrentDegradationLevel,
} from '@/lib/runtime-hardening/graceful-degradation'
import { buildConversationRecoveryPayload } from '@/lib/advisory-chat/conversation-recovery'
import type { SecuritySignal } from '@profitia/cic-core'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function encodeSSE(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

export async function POST(req: NextRequest) {
  const requestId = nanoid()
  const requestStart = Date.now()

  // ── 1. Extract IP ────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  try {
    // ── 2. Parse + Schema Validation ─────────────────────
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const schemaCheck = validateChatRequestSchema(body)
    if (!schemaCheck.valid) {
      return NextResponse.json(
        { error: 'Invalid request', details: schemaCheck.errors },
        { status: 400 },
      )
    }

    const { messages, locale, pageContext, sessionState, advisoryDecision } =
      body as {
        messages: Array<{ role: string; content: string }>
        locale: string
        pageContext: PageContext
        sessionState: SessionState
        advisoryDecision?: AdvisoryDecision | null
      }

    const sessionId: string =
      (body as Record<string, unknown>).sessionId as string ?? nanoid()
    const messageCount = messages.length
    const userMessageCount = messages.filter((message) => message.role === 'user').length
    const l = locale === 'en' ? 'en' : 'pl'

    // ── 3. Rate Limiting + Spam ───────────────────────────
    const lastUserMessage = messages.findLast((m) => m.role === 'user')?.content ?? ''
    // Blank content still passes traffic throttles, but is handled as an
    // explicit recoverable conversation signal rather than an HTTP error.
    const rateLimitMessage = lastUserMessage.trim().length > 0
      ? lastUserMessage
      : '[empty-conversation-turn]'
    const rlCheck = compositeRateLimitCheck(ip, sessionId, rateLimitMessage)
    if (!rlCheck.allowed) {
      obs.rateLimitHit(ip, sessionId)
      return NextResponse.json(
        {
          error: 'Too many requests',
          reason: rlCheck.reason,
          retryAfterMs: rlCheck.retryAfterMs,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rlCheck.retryAfterMs ?? 30000) / 1000)),
          },
        },
      )
    }

    // ── 4. Security Check ─────────────────────────────────
    // Every user turn sent to the model passes the same security and PII gate.
    // A previously blocked turn is omitted instead of poisoning all later
    // requests. The current turn receives a deterministic recovery response.
    const sanitizedMessages: typeof messages = []
    const lastUserIndex = messages.findLastIndex((message) => message.role === 'user')
    let currentSecuritySignal: SecuritySignal | null = null

    for (const [index, message] of messages.entries()) {
      if (message.role !== 'user') {
        sanitizedMessages.push(message)
        continue
      }

      const securityCheck = runSecurityCheck(message.content, sessionId)
      if (!securityCheck.passed) {
        obs.securityBlock(sessionId, securityCheck.reasons.join('; '))
        if (index === lastUserIndex) {
          currentSecuritySignal = securityCheck.reasons.some((reason) =>
            reason.toLocaleLowerCase().includes('injection'),
          )
            ? 'instruction_manipulation'
            : null
        }
        continue
      }

      if (index === lastUserIndex && securityCheck.action === 'sanitize') {
        currentSecuritySignal = 'personal_data'
      }

      sanitizedMessages.push({
        ...message,
        content: securityCheck.sanitizedMessage ?? message.content,
      })
    }

    const recoveryPayload = buildConversationRecoveryPayload({
      message: lastUserMessage,
      locale: l,
      userTurnCount: userMessageCount,
      sessionState,
      securitySignal: currentSecuritySignal,
    })

    if (recoveryPayload) {
      obs.requestStart(sessionId, l, messageCount)
      obs.requestComplete(sessionId, Date.now() - requestStart, 0)
      return NextResponse.json({
        type: 'recovery',
        content: recoveryPayload.response.content,
        recovery: recoveryPayload.decision,
        contact: recoveryPayload.contact,
      })
    }

    // ── 5. Concurrent Request Guard ────────────────────────
    if (hasActiveStream(sessionId)) {
      return NextResponse.json(
        { error: 'Stream already active for this session' },
        { status: 409 },
      )
    }

    const lockResult = acquireRequestLock(sessionId, requestId)
    if (!lockResult.acquired) {
      return NextResponse.json(
        { error: 'Request conflict', reason: lockResult.reason },
        { status: 409 },
      )
    }

    // ── 6. Cost Governance ────────────────────────────────
    const budgetStatus = getBudgetStatus()
    const budgetMode = budgetStatus.budgetMode
    const selectedModel = selectModel({
      taskType: isDegraded() ? 'fallback' : 'advisory_chat',
      urgency: sessionState.urgency,
      sessionDepth: messageCount,
      budgetMode,
      isDegraded: isDegraded(),
    })
    const budgetCheck = checkBudget(500, selectedModel) // rough pre-check
    if (!budgetCheck.allowed) {
      releaseRequestLock(sessionId)
      obs.fallbackActivated(sessionId, 'Daily budget exceeded')
      const fallback = getFallbackResponse(
        sessionState.detectedIntent ?? 'UNKNOWN',
        l,
        'degraded',
      )
      return NextResponse.json(
        { type: 'fallback', content: fallback, reason: 'budget_exceeded' },
        { status: 200 },
      )
    }

    obs.requestStart(sessionId, l, messageCount)

    // ── 7. Degraded Mode Fast Path ─────────────────────────
    if (getCurrentDegradationLevel() === 'emergency') {
      releaseRequestLock(sessionId)
      const fallback = getFallbackResponse(
        sessionState.detectedIntent ?? 'UNKNOWN',
        l,
        'emergency',
      )
      return NextResponse.json({ type: 'fallback', content: fallback, degraded: true })
    }

    // ── 8. Build System Prompt ────────────────────────────
    const systemPrompt = buildAdvisorySystemPrompt({
      locale: l,
      pageContext,
      sessionState,
      decision: advisoryDecision ?? null,
      messageCount,
      userMessageCount,
    })

    const compressionProfile = getCompressionProfile({
      urgency: sessionState.urgency,
      buyingStage: sessionState.buyingStage,
      maturity: sessionState.maturity,
      messageCount,
      intentConfidence: sessionState.intentConfidence,
    })

    const maxTokens = adaptiveMaxTokens(compressionProfile.maxTokens, budgetMode)

    // ── 9. Streaming Response ─────────────────────────────
    const streamState = createStreamState(requestId, sessionId)
    registerStream(streamState)

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        let attempt = 1
        const maxAttempts = 3
        const attemptStart = Date.now()

        const tryCompletion = async (): Promise<void> => {
          try {
            const completion = await openai.chat.completions.create({
              model: selectedModel,
              messages: [
                { role: 'system', content: systemPrompt },
                ...sanitizedMessages.map((m) => ({
                  role: m.role as 'user' | 'assistant',
                  content: m.content,
                })),
              ],
              stream: true,
              max_tokens: maxTokens,
              temperature: compressionProfile.temperature,
            })

            obs.streamEvent(sessionId, 'start', { model: selectedModel, maxTokens })
            let fullContent = ''

            for await (const chunk of completion) {
              const delta = chunk.choices[0]?.delta?.content ?? ''
              if (!delta) continue

              const chunkResult = processChunk(streamState, delta)
              if (!chunkResult.accepted) continue

              fullContent += delta
            }

            // ── Validated response gate ──────────────────
            // Buffer the upstream model stream and release content only after
            // metadata removal and output guardrails. This prevents partial
            // metadata, unsafe content, or retry fragments reaching the UI.
            // The server owns the hard four-turn limit. A client-provided
            // contract may only make the output stricter (zero questions),
            // never relax the server-side limit.
            const questionLimit: 0 | 1 =
              userMessageCount >= 4 ||
              (advisoryDecision?.conversation?.contractVersion === '1' &&
                advisoryDecision.conversation.questionLimit === 0)
                ? 0
                : 1
            const finalized = finalizeAdvisoryResponse(fullContent, {
              questionLimit,
              emptyContentFallback: l === 'pl'
                ? 'Na podstawie rozmowy rekomenduję przejście do wskazanego kierunku.'
                : 'Based on our conversation, I recommend proceeding to the indicated direction.',
            })
            if (finalized.issues.length > 0) {
              obs.hallucinationDetected(sessionId, finalized.issues)
            }

            const visibleContent = finalized.content || getFallbackResponse(
              sessionState.detectedIntent ?? 'UNKNOWN',
              l,
            )

            // Rough token count from characters (avg 4 chars/token)
            const approxTokens = Math.ceil(fullContent.length / 4) + 500 // +500 for system prompt
            recordTokenSpend(approxTokens, selectedModel)
            recordTokenUsage(sessionId, approxTokens)
            obs.tokenUsage(sessionId, 500, Math.ceil(fullContent.length / 4), selectedModel)

            // Quality evaluation
            const qualityReport = evaluateAdvisoryQuality({
              response: visibleContent,
              locale: l,
              urgency: sessionState.urgency,
              phase: sessionState.phase,
              hallucinationIssueCount: finalized.issues.length,
              hasDeterministicCTA:
                advisoryDecision?.conversation?.action === 'recommend' &&
                advisoryDecision.conversation.destinationId !== null,
            })
            obs.qualityScore(sessionId, qualityReport.overallScore, l)

            controller.enqueue(
              encoder.encode(encodeSSE({ type: 'text', content: visibleContent })),
            )

            // Dev-mode quality warning
            if (process.env.NODE_ENV !== 'production' && !qualityReport.passed) {
              controller.enqueue(
                encoder.encode(
                  encodeSSE({
                    type: 'quality_warning',
                    score: qualityReport.overallScore,
                    suggestions: qualityReport.suggestions,
                  }),
                ),
              )
            }

            // Advisory metadata
            if (finalized.metadata) {
              controller.enqueue(
                encoder.encode(encodeSSE({ type: 'metadata', ...finalized.metadata })),
              )
            }

            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
            obs.requestComplete(sessionId, Date.now() - requestStart, approxTokens)
            obs.streamEvent(sessionId, 'complete', {
              durationMs: Date.now() - requestStart,
              chunkCount: streamState.chunkCount,
            })
            reportSuccess()
          } catch (error) {
            const failureClass = classifyFailure(error)
            const retryCtx = {
              attempt,
              failureClass,
              lastError: error instanceof Error ? error : String(error),
              totalElapsedMs: Date.now() - attemptStart,
              idempotencyKey: requestId,
            }
            const retryDecision = evaluateRetry(retryCtx)
            obs.retryAttempt(sessionId, attempt, failureClass, retryDecision.delayMs)

            if (retryDecision.shouldRetry && attempt < maxAttempts) {
              attempt++
              await new Promise((r) => setTimeout(r, retryDecision.delayMs))
              return tryCompletion()
            }

            // All retries exhausted — fallback
            reportFailure()
            obs.requestError(sessionId, String(error), failureClass)
            obs.fallbackActivated(sessionId, `Retry exhausted (${failureClass})`)

            const fallbackContent = getFallbackResponse(
              sessionState.detectedIntent ?? 'UNKNOWN',
              l,
            )
            controller.enqueue(
              encoder.encode(
                encodeSSE({ type: 'text', content: fallbackContent }),
              ),
            )
            controller.enqueue(
              encoder.encode(
                encodeSSE({ type: 'fallback', degraded: true }),
              ),
            )
            controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          }
        }

        try {
          await tryCompletion()
        } finally {
          unregisterStream(sessionId)
          releaseRequestLock(sessionId)
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
        'X-Request-Id': requestId,
      },
    })
  } catch {
    obs.requestError('unknown', 'Unhandled exception in POST handler', 'non_retryable')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
