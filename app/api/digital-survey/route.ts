import { createHash } from 'node:crypto'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { sendHomeplSmtpEmail, summarizeHomeplSmtpFailure } from '@/lib/email/homepl-smtp'
import { DIGITAL_SURVEY_TURNSTILE_ACTION } from '@/lib/forms/constants'
import { getFormsPrisma, isMissingFormsDatabaseUrlError } from '@/lib/forms/prisma'
import { createInMemoryRateLimiter, extractClientIp, validateContactFormStartedAt } from '@/lib/security/contact-rate-limit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

const BODY_MAX_BYTES = 16 * 1024
const MIN_FILL_TIME_MS = 800
const RATE_LIMIT_WINDOW_MS = 600_000
const RATE_LIMIT_MAX_PER_IP = 10
const RATE_LIMIT_EMAIL_WINDOW_MS = 1_800_000
const RATE_LIMIT_MAX_PER_EMAIL = 3
const CONSENT_VERSION = '2026-10-21'
const PRIVACY_CONSENT_TEXT =
  'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu kontaktu w sprawie badania i dopasowania rozwiązania AI.'
const MARKETING_CONSENT_TEXT =
  'Zgadzam się na przesyłanie informacji o usługach, publikacjach i wydarzeniach Profitia. Zgodę mogę wycofać w dowolnym momencie.'
const INTERNAL_TO = 'kontakt@profitia.pl'
const INTERNAL_BCC = 'tomasz.uscinski@profitia.pl'

const globalStore = globalThis as typeof globalThis & {
  __digitalSurveyLimiter?: ReturnType<typeof createInMemoryRateLimiter>
}
const limiter = globalStore.__digitalSurveyLimiter ?? createInMemoryRateLimiter()
if (!globalStore.__digitalSurveyLimiter) globalStore.__digitalSurveyLimiter = limiter

const schema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  organization: z.string().trim().min(2).max(200),
  jobTitle: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(6).max(60),
  privacyConsent: z.literal(true),
  marketingConsent: z.boolean(),
  website: z.string().max(200),
  formStartedAt: z.unknown(),
  turnstileToken: z.unknown(),
  locale: z.literal('pl'),
  sourcePage: z.literal('/ankieta-digital'),
}).strict()

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function errorResponse(errorCode: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ success: false, error: errorCode, errorCode }, { status, headers })
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    if (!contentType?.toLowerCase().startsWith('application/json')) {
      return errorResponse('UNSUPPORTED_MEDIA_TYPE', 415)
    }

    const contentLength = Number(request.headers.get('content-length'))
    if (Number.isFinite(contentLength) && contentLength > BODY_MAX_BYTES) {
      return errorResponse('PAYLOAD_TOO_LARGE', 413)
    }

    let raw: unknown
    try {
      raw = await request.json()
    } catch {
      return errorResponse('INVALID_JSON', 400)
    }

    const data = schema.parse(raw)

    if (data.website.trim()) {
      return errorResponse('BOT_VERIFICATION_FAILED', 403)
    }

    const timing = validateContactFormStartedAt(data.formStartedAt, { minFillTimeMs: MIN_FILL_TIME_MS })
    if (!timing.ok) {
      return errorResponse(timing.errorCode, timing.errorCode === 'VALIDATION_ERROR' ? 422 : 403)
    }

    const email = data.email.toLowerCase()
    const buckets = [
      {
        key: `email:${hash(email)}`,
        limit: RATE_LIMIT_MAX_PER_EMAIL,
        windowMs: RATE_LIMIT_EMAIL_WINDOW_MS,
      },
    ]
    const ip = extractClientIp(request)
    if (ip) {
      buckets.unshift({
        key: `ip:${hash(ip)}`,
        limit: RATE_LIMIT_MAX_PER_IP,
        windowMs: RATE_LIMIT_WINDOW_MS,
      })
    }

    const rateLimit = limiter.consumeMany(buckets)
    if (!rateLimit.ok) {
      return errorResponse('RATE_LIMITED', 429, { 'Retry-After': String(rateLimit.retryAfterSeconds) })
    }

    const turnstile = await verifyTurnstileToken(
      data.turnstileToken,
      process.env,
      fetch,
      DIGITAL_SURVEY_TURNSTILE_ACTION
    )
    if (!turnstile.ok) {
      return errorResponse(
        turnstile.errorCode,
        turnstile.errorCode === 'BOT_VERIFICATION_UNAVAILABLE' ? 503 : 403
      )
    }

    const prisma = getFormsPrisma()
    const lead = await prisma.digitalSurveyLead.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        organization: data.organization,
        jobTitle: data.jobTitle,
        email,
        phone: data.phone,
        privacyConsent: true,
        privacyConsentText: PRIVACY_CONSENT_TEXT,
        privacyConsentVersion: CONSENT_VERSION,
        marketingConsent: data.marketingConsent,
        marketingConsentText: MARKETING_CONSENT_TEXT,
        marketingConsentVersion: CONSENT_VERSION,
        locale: 'pl',
        sourcePage: data.sourcePage,
      },
    })

    const fullName = `${lead.firstName} ${lead.lastName}`
    const internal = await sendHomeplSmtpEmail({
      to: process.env.CONTACT_NOTIFICATION_EMAIL?.trim().toLowerCase() || INTERNAL_TO,
      bcc: process.env.CONTACT_NOTIFICATION_BCC?.trim().toLowerCase() || INTERNAL_BCC,
      replyTo: lead.email,
      subject: 'Nowe zgłoszenie - Ankieta Digital',
      text: [
        'Nowe zgłoszenie z formularza Ankieta Digital',
        `Imię i nazwisko: ${fullName}`,
        `Organizacja: ${lead.organization}`,
        `Stanowisko: ${lead.jobTitle}`,
        `E-mail: ${lead.email}`,
        `Telefon: ${lead.phone}`,
        `Zgoda marketingowa: ${lead.marketingConsent ? 'TAK' : 'NIE'}`,
      ].join('\n'),
      html: [
        '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
        '<h2 style="margin:0 0 16px;">Nowe zgłoszenie - Ankieta Digital</h2>',
        '<table style="border-collapse:collapse;width:100%;max-width:720px;">',
        `<tr><td style="padding:6px 0;font-weight:600;width:180px;">Imię i nazwisko</td><td>${escapeHtml(fullName)}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;">Organizacja</td><td>${escapeHtml(lead.organization)}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;">Stanowisko</td><td>${escapeHtml(lead.jobTitle)}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;">E-mail</td><td>${escapeHtml(lead.email)}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;">Telefon</td><td>${escapeHtml(lead.phone)}</td></tr>`,
        `<tr><td style="padding:6px 0;font-weight:600;">Zgoda marketingowa</td><td>${lead.marketingConsent ? 'TAK' : 'NIE'}</td></tr>`,
        '</table></div>',
      ].join(''),
    })

    await prisma.digitalSurveyLead.update({
      where: { id: lead.id },
      data: internal.success
        ? {
            internalEmailStatus: 'SENT',
            internalEmailSentAt: new Date(),
            internalEmailMessageId: internal.messageId,
            internalEmailError: null,
          }
        : {
            internalEmailStatus: 'FAILED',
            internalEmailError: summarizeHomeplSmtpFailure(internal),
          },
    }).catch(() => undefined)

    const confirmation = await sendHomeplSmtpEmail({
      to: lead.email,
      replyTo: process.env.CONTACT_NOTIFICATION_EMAIL?.trim().toLowerCase() || INTERNAL_TO,
      subject: 'Dziękujemy za zgłoszenie udziału w badaniu Profitia',
      text: [
        `Dzień dobry ${lead.firstName},`,
        '',
        'dziękujemy za wypełnienie formularza.',
        'Prześlemy krótki kwestionariusz, pozwalający nam dopasować agenta AI do rzeczywistych wyzwań Twojej organizacji.',
        '',
        'Pozdrawiamy,',
        'Zespół Profitia',
      ].join('\n'),
      html: [
        '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
        `<p style="margin:0 0 16px;">Dzień dobry ${escapeHtml(lead.firstName)},</p>`,
        '<p style="margin:0 0 16px;">dziękujemy za wypełnienie formularza.</p>',
        '<p style="margin:0 0 16px;">Prześlemy krótki kwestionariusz, pozwalający nam dopasować agenta AI do rzeczywistych wyzwań Twojej organizacji.</p>',
        '<p style="margin:0;">Pozdrawiamy,<br>Zespół Profitia</p>',
        '</div>',
      ].join(''),
    })

    await prisma.digitalSurveyLead.update({
      where: { id: lead.id },
      data: confirmation.success
        ? {
            confirmationEmailStatus: 'SENT',
            confirmationEmailSentAt: new Date(),
            confirmationEmailMessageId: confirmation.messageId,
            confirmationEmailError: null,
          }
        : {
            confirmationEmailStatus: 'FAILED',
            confirmationEmailError: summarizeHomeplSmtpFailure(confirmation),
          },
    }).catch(() => undefined)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse('VALIDATION_ERROR', 422)
    }
    if (isMissingFormsDatabaseUrlError(error)) {
      return errorResponse('SERVICE_UNAVAILABLE', 503)
    }
    console.error('[API /digital-survey] category=unhandled')
    return errorResponse('SERVER_ERROR', 500)
  }
}
