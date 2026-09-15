import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import {
  CONSENT_VERSION,
  CONTACT_CONSENT_COPY,
  PRIVACY_POLICY_PATHS,
  PRIVACY_POLICY_VERSION,
} from '@/lib/forms/constants'
import { createContactSubmissionWithOutbox } from '@/lib/forms/contact-email-outbox'
import { isMissingFormsDatabaseUrlError } from '@/lib/forms/prisma'
import {
  CONTACT_REQUEST_BODY_MAX_BYTES,
  extractClientIp,
  getContactAbuseConfig,
  rateLimitContactSubmission,
  validateContactFormStartedAt,
} from '@/lib/security/contact-rate-limit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

const SUPPORTED_LOCALES = ['pl', 'en'] as const
const CONTACT_TOPICS = ['general', 'advisory', 'spendguru', 'training', 'partnership', 'other'] as const
const SOURCE_PAGE_PATTERN = /^\/[A-Za-z0-9\-._~\/]*$/

const RAW_CONSENT_SCHEMA = z.object({
  gdpr: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  consentVersion: z.string().optional(),
  consentAt: z.string().optional(),
  lawfulBasis: z.string().optional(),
}).strict()

const RawContactSchema = z.object({
  formType: z.literal('contact').optional(),
  submittedAt: z.unknown().optional(),
  locale: z.enum(SUPPORTED_LOCALES).optional(),
  source: z.string().optional(),
  sourcePage: z.string().optional(),
  name: z.string().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  company: z.string().optional(),
  topic: z.enum(CONTACT_TOPICS).optional(),
  message: z.string().optional(),
  consent: RAW_CONSENT_SCHEMA.optional(),
  privacyConsent: z.boolean().optional(),
  marketingConsent: z.boolean().optional(),
  website: z.string().optional(),
  formStartedAt: z.unknown().optional(),
  turnstileToken: z.unknown().optional(),
}).strict()

const NormalizedContactSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email().max(254),
  company: z.string().max(200).nullable(),
  topic: z.enum(CONTACT_TOPICS),
  message: z.string().min(10).max(2000),
  locale: z.enum(SUPPORTED_LOCALES),
  sourcePage: z.string().max(200).regex(SOURCE_PAGE_PATTERN).nullable(),
  privacyConsent: z.literal(true),
  marketingConsent: z.boolean(),
  consentVersion: z.string(),
  lawfulBasis: z.string(),
})

type ValidationFieldErrors = Record<string, string>
type TurnstileVerificationResult = Awaited<ReturnType<typeof verifyTurnstileToken>>
type ContactAbuseConfig = ReturnType<typeof getContactAbuseConfig>
type ContactRateLimitDecision = ReturnType<typeof rateLimitContactSubmission>

export interface ContactRouteDependencies {
  persistSubmissionWithOutbox?: typeof createContactSubmissionWithOutbox
  verifyTurnstile?: (
    token: unknown,
    env?: NodeJS.ProcessEnv,
    fetchImpl?: typeof fetch,
    expectedAction?: string
  ) => Promise<TurnstileVerificationResult>
  getAbuseConfig?: typeof getContactAbuseConfig
  rateLimitSubmission?: (input: {
    config: ContactAbuseConfig
    clientIp: string | null
    email: string
  }) => ContactRateLimitDecision
  now?: () => number
  logger?: Pick<Console, 'error'>
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function normalizeOptionalString(value: string | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function normalizeMessage(value: string | undefined): string {
  return (value ?? '').replace(/\r\n?/g, '\n').trim()
}

function normalizeSourcePage(value: string | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const input = /^https?:\/\//i.test(trimmed)
    ? (() => {
        try {
          return new URL(trimmed).pathname
        } catch {
          return trimmed
        }
      })()
    : trimmed

  const pathOnly = input.split(/[?#]/, 1)[0]?.trim() ?? ''
  return pathOnly || null
}

function flattenZodErrors(error: z.ZodError): ValidationFieldErrors {
  const flattened: ValidationFieldErrors = {}

  for (const issue of error.issues) {
    const field = issue.path.join('.') || 'body'
    if (!flattened[field]) {
      flattened[field] = issue.message
    }
  }

  return flattened
}

function validationResponse(fields: ValidationFieldErrors, status = 422) {
  return NextResponse.json(
    {
      success: false,
      error: 'VALIDATION_ERROR',
      errorCode: 'VALIDATION_ERROR',
      fields,
    },
    { status }
  )
}

function verificationResponse(errorCode: 'BOT_VERIFICATION_REQUIRED' | 'BOT_VERIFICATION_FAILED') {
  return NextResponse.json(
    {
      success: false,
      error: errorCode,
      errorCode,
    },
    { status: 403 }
  )
}

function verificationUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'BOT_VERIFICATION_UNAVAILABLE',
      errorCode: 'BOT_VERIFICATION_UNAVAILABLE',
    },
    { status: 503 }
  )
}

function formsStorageUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'FORMS_STORAGE_UNAVAILABLE',
      errorCode: 'FORMS_STORAGE_UNAVAILABLE',
      message: 'Contact form service is temporarily unavailable.',
    },
    { status: 503 }
  )
}

function rateLimitResponse(locale: (typeof SUPPORTED_LOCALES)[number], retryAfterSeconds: number) {
  const message = locale === 'pl'
    ? 'Zbyt wiele prób wysłania formularza. Spróbuj ponownie za kilka minut.'
    : 'Too many submission attempts. Please try again in a few minutes.'

  return NextResponse.json(
    {
      success: false,
      error: 'RATE_LIMITED',
      errorCode: 'RATE_LIMITED',
      message,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
      },
    }
  )
}

function parseContactRequest(body: unknown) {
  if (!isPlainObject(body)) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        message: 'Request body must be a JSON object.',
        path: ['body'],
      },
    ])
  }

  const raw = RawContactSchema.parse(body)
  const normalized = NormalizedContactSchema.parse({
    fullName: normalizeOptionalString(raw.fullName ?? raw.name) ?? '',
    email: (normalizeOptionalString(raw.email) ?? '').toLowerCase(),
    company: normalizeOptionalString(raw.company),
    topic: raw.topic ?? '',
    message: normalizeMessage(raw.message),
    locale: raw.locale ?? 'pl',
    sourcePage: normalizeSourcePage(raw.sourcePage ?? raw.source),
    privacyConsent: raw.privacyConsent ?? raw.consent?.gdpr,
    marketingConsent: raw.marketingConsent ?? raw.consent?.newsletter ?? false,
    consentVersion: CONSENT_VERSION,
    lawfulBasis: 'consent',
  })

  return {
    data: normalized,
    website: raw.website ?? '',
    formStartedAt: raw.formStartedAt,
    turnstileToken: raw.turnstileToken,
  }
}

export function createContactPostHandler(dependencies: ContactRouteDependencies = {}) {
  const {
    persistSubmissionWithOutbox = createContactSubmissionWithOutbox,
    verifyTurnstile = verifyTurnstileToken,
    getAbuseConfig = getContactAbuseConfig,
    rateLimitSubmission = rateLimitContactSubmission,
    now = () => Date.now(),
    logger = console,
  } = dependencies

  return async function handleContactPost(request: NextRequest) {
    try {
      const contentLengthHeader = request.headers.get('content-length')
      if (contentLengthHeader) {
        const contentLength = Number(contentLengthHeader)
        if (Number.isFinite(contentLength) && contentLength > CONTACT_REQUEST_BODY_MAX_BYTES) {
          return NextResponse.json(
            {
              success: false,
              error: 'PAYLOAD_TOO_LARGE',
              errorCode: 'PAYLOAD_TOO_LARGE',
              message: 'Request body is too large.',
            },
            { status: 413 }
          )
        }
      }

      let body: unknown

      try {
        body = await request.json()
      } catch {
        return NextResponse.json(
          {
            success: false,
            error: 'INVALID_JSON',
            errorCode: 'INVALID_JSON',
            message: 'Request body must be valid JSON.',
          },
          { status: 400 }
        )
      }

      const { data, website, formStartedAt, turnstileToken } = parseContactRequest(body)

      if (website.trim()) {
        return verificationResponse('BOT_VERIFICATION_FAILED')
      }

      const abuseConfig = getAbuseConfig()
      const timingResult = validateContactFormStartedAt(formStartedAt, {
        now: now(),
        minFillTimeMs: abuseConfig.minFillTimeMs,
      })

      if (!timingResult.ok) {
        if (timingResult.errorCode === 'VALIDATION_ERROR') {
          return validationResponse({ formStartedAt: 'Invalid security metadata.' })
        }

        return verificationResponse('BOT_VERIFICATION_FAILED')
      }

      const rateLimitResult = rateLimitSubmission({
        config: abuseConfig,
        clientIp: extractClientIp(request),
        email: data.email,
      })

      if (!rateLimitResult.ok) {
        return rateLimitResponse(data.locale, rateLimitResult.retryAfterSeconds)
      }

      const turnstileResult = await verifyTurnstile(turnstileToken)
      if (!turnstileResult.ok) {
        if (turnstileResult.errorCode === 'BOT_VERIFICATION_UNAVAILABLE') {
          return verificationUnavailableResponse()
        }

        return verificationResponse(turnstileResult.errorCode)
      }

      const consentCopy = CONTACT_CONSENT_COPY[data.locale]
      const contact = await persistSubmissionWithOutbox({
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        topic: data.topic,
        message: data.message,
        locale: data.locale,
        sourcePage: data.sourcePage,
        privacyConsent: data.privacyConsent,
        privacyConsentText: consentCopy.privacyConsentText,
        privacyConsentVersion: data.consentVersion,
        marketingConsent: data.marketingConsent,
        marketingConsentText: consentCopy.marketingConsentText,
        marketingConsentVersion: data.consentVersion,
        lawfulBasis: data.lawfulBasis,
        privacyPolicyUrl: PRIVACY_POLICY_PATHS[data.locale],
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      })

      return NextResponse.json({ success: true, submissionId: contact.id }, { status: 201 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return validationResponse(flattenZodErrors(error))
      }

      if (isMissingFormsDatabaseUrlError(error)) {
        return formsStorageUnavailableResponse()
      }

      logger.error('[API /contact]', error)
      return NextResponse.json(
        {
          success: false,
          error: 'SERVER_ERROR',
          errorCode: 'SERVER_ERROR',
          message: 'Internal server error',
        },
        { status: 500 }
      )
    }
  }
}