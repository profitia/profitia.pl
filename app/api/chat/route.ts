import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { nanoid } from 'nanoid'
import type { AdvisoryDecision, PageContext, SessionState } from '@/types'
import {
  parseAdvisoryMetadata,
  stripMetadataBlock,
} from '@/runtime/schemas/advisory-output.schema'
import { buildAdvisorySystemPrompt } from '@/lib/advisory-quality/system-prompt'
import {
  applyHallucinationGuardrails,
  evaluateResponseQuality,
} from '@/lib/advisory-quality/hallucination-guard'
import { getCompressionProfile } from '@/lib/advisory-quality/advisory-compression'
import { evaluateAdvisoryQuality } from '@/lib/advisory-quality/quality-evaluator'
// ETAP 5 — Runtime Hardening
import { obs } from '@/lib/runtime-hardening/observability'
import {
  compositeRateLimitCheck,
  recordTokenUsage,
} from '@/lib/runtime-hardening/rate-limiter'
import {
  runSecurityCheck,
  validateChatRequestSchema,
  sanitizeOutput,
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
    const l = locale === 'en' ? 'en' : 'pl'

    // ── 3. Rate Limiting + Spam ───────────────────────────
    const lastUserMessage = messages.findLast((m) => m.role === 'user')?.content ?? ''
    const rlCheck = compositeRateLimitCheck(ip, sessionId, lastUserMessage)
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
    const secCheck = runSecurityCheck(lastUserMessage, sessionId)
    if (!secCheck.passed) {
      obs.securityBlock(sessionId, secCheck.reasons.join('; '))
      return NextResponse.json(
        { error: 'Request blocked', reason: secCheck.reasons[0] },
        { status: 422 },
      )
    }

    // Sanitize if PII detected
    const sanitizedMessages = secCheck.action === 'sanitize' && secCheck.sanitizedMessage
      ? messages.map((m, i) =>
          i === messages.length - 1 && m.role === 'user'
            ? { ...m, content: secCheck.sanitizedMessage! }
            : m,
        )
      : messages

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
            let metadataStarted = false
            const visibleBuffer: string[] = []

            for await (const chunk of completion) {
              const delta = chunk.choices[0]?.delta?.content ?? ''
              if (!delta) continue

              const chunkResult = processChunk(streamState, delta)
              if (!chunkResult.accepted) continue // dedup

              fullContent += delta

              if (!metadataStarted) {
                const metaIndex = fullContent.indexOf('```metadata')
                if (metaIndex !== -1) {
                  metadataStarted = true
                  const visiblePart = fullContent.slice(0, metaIndex)
                  const alreadySent = visibleBuffer.join('')
                  const toFlush = visiblePart.slice(alreadySent.length)
                  if (toFlush) {
                    controller.enqueue(
                      encoder.encode(encodeSSE({ type: 'text', content: toFlush })),
                    )
                  }
                  continue
                }
              }

              if (!metadataStarted) {
                visibleBuffer.push(delta)
                controller.enqueue(
                  encoder.encode(encodeSSE({ type: 'text', content: delta })),
                )
              }
            }

            // ── Post-stream processing ───────────────────
            // Rough token count from characters (avg 4 chars/token)
            const approxTokens = Math.ceil(fullContent.length / 4) + 500 // +500 for system prompt
            recordTokenSpend(approxTokens, selectedModel)
            recordTokenUsage(sessionId, approxTokens)
            obs.tokenUsage(sessionId, 500, Math.ceil(fullContent.length / 4), selectedModel)

            // Output sanitization
            const outputSanitized = sanitizeOutput(fullContent)
            const workingContent = outputSanitized.sanitized

            // Hallucination guard
            const guardrail = applyHallucinationGuardrails(workingContent)
            if (guardrail.issues.length > 0) {
              obs.hallucinationDetected(sessionId, guardrail.issues)
            }

            // Quality evaluation
            const qualityReport = evaluateAdvisoryQuality({
              response: guardrail.sanitizedContent,
              locale: l,
              urgency: sessionState.urgency,
              phase: sessionState.phase,
              hallucinationIssueCount: guardrail.issues.length,
            })
            obs.qualityScore(sessionId, qualityReport.overallScore, l)

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
            const advisoryMeta = parseAdvisoryMetadata(fullContent)
            if (advisoryMeta) {
              controller.enqueue(
                encoder.encode(encodeSSE({ type: 'metadata', ...advisoryMeta })),
              )
            }
            stripMetadataBlock(fullContent)

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
