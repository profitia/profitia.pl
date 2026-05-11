import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
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
import {
  getCompressionProfile,
} from '@/lib/advisory-quality/advisory-compression'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

function encodeSSE(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, locale, pageContext, sessionState, advisoryDecision } =
      body as {
        messages: Array<{ role: string; content: string }>
        locale: string
        pageContext: PageContext
        sessionState: SessionState
        advisoryDecision?: AdvisoryDecision | null
      }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const messageCount = messages.length
    const l = locale === 'en' ? 'en' : 'pl'

    // ETAP 4.5: Use quality-grade system prompt
    const systemPrompt = buildAdvisorySystemPrompt({
      locale: l,
      pageContext,
      sessionState,
      decision: advisoryDecision ?? null,
      messageCount,
    })

    // ETAP 4.5: Derive compression profile for token limit
    const compressionProfile = getCompressionProfile({
      urgency: sessionState.urgency,
      buyingStage: sessionState.buyingStage,
      maturity: sessionState.maturity,
      messageCount,
      intentConfidence: sessionState.intentConfidence,
    })

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        try {
          const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_PRIMARY_MODEL || 'gpt-4.1',
            messages: [
              { role: 'system', content: systemPrompt },
              ...messages.map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
              })),
            ],
            stream: true,
            max_tokens: compressionProfile.maxTokens,
            temperature: compressionProfile.temperature,
          })

          let fullContent = ''
          let metadataStarted = false
          // Buffer visible content until metadata block detected
          const visibleBuffer: string[] = []

          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta?.content ?? ''
            if (!delta) continue

            fullContent += delta

            if (!metadataStarted) {
              const metaIndex = fullContent.indexOf('```metadata')
              if (metaIndex !== -1) {
                metadataStarted = true
                // Flush buffered content up to metadata start
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

          // ETAP 4.5: Apply hallucination guardrails to full response
          const guardrail = applyHallucinationGuardrails(fullContent)
          const _quality = evaluateResponseQuality(guardrail.sanitizedContent, l)

          // Emit quality metadata for client-side logging (dev only)
          if (process.env.NODE_ENV !== 'production' && guardrail.issues.length > 0) {
            controller.enqueue(
              encoder.encode(
                encodeSSE({ type: 'quality_warning', issues: guardrail.issues }),
              ),
            )
          }

          // Emit advisory metadata (intent, urgency, phase)
          const advisoryMeta = parseAdvisoryMetadata(fullContent)
          if (advisoryMeta) {
            controller.enqueue(
              encoder.encode(encodeSSE({ type: 'metadata', ...advisoryMeta })),
            )
          }

          stripMetadataBlock(fullContent)
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        } catch {
          controller.enqueue(
            encoder.encode(
              encodeSSE({
                type: 'error',
                message: 'Advisory service temporarily unavailable',
              }),
            ),
          )
        } finally {
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
      },
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
