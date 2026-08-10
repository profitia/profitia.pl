import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getFormsPrisma, isMissingFormsDatabaseUrlError } from '@/lib/forms/prisma'
import { processNewsletterSubscription } from '@/lib/forms/newsletter-subscription'
import { NEWSLETTER_TURNSTILE_ACTION } from '@/lib/forms/constants'
import {
  extractClientIp,
  getNewsletterAbuseConfig,
  NEWSLETTER_REQUEST_BODY_MAX_BYTES,
  rateLimitNewsletterSubmission,
  validateNewsletterFormStartedAt,
} from '@/lib/security/contact-rate-limit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

const SUPPORTED_LOCALES = ['pl', 'en'] as const
const SOURCE_PAGE_PATTERN = /^\/[A-Za-z0-9\-._~\/]*$/
const ALLOWED_SOURCE_HOSTS = new Set(['profitia.pl', 'www.profitia.pl', 'profitia-pl.onrender.com'])

const NewsletterSchema = z.object({
  formType: z.literal('newsletter'),
  locale: z.enum(SUPPORTED_LOCALES).optional(),
  sourcePage: z.string().max(200).optional(),
  email: z.string().trim().email().max(254),
  consent: z.literal(true),
  website: z.string().max(200),
  formStartedAt: z.unknown(),
  turnstileToken: z.unknown(),
}).strict()

type TurnstileVerificationResult = Awaited<ReturnType<typeof verifyTurnstileToken>>
type RateLimitDecision = ReturnType<typeof rateLimitNewsletterSubmission>

interface NewsletterRouteDependencies {
  verifyTurnstile?: (
    token: unknown,
    env?: NodeJS.ProcessEnv,
    fetchImpl?: typeof fetch,
    expectedAction?: string
  ) => Promise<TurnstileVerificationResult>
  getAbuseConfig?: typeof getNewsletterAbuseConfig
  rateLimitSubmission?: (input: {
    config: ReturnType<typeof getNewsletterAbuseConfig>
    clientIp: string | null
    email: string
  }) => RateLimitDecision
  now?: () => number
}

export type { NewsletterRouteDependencies }

type ValidationFieldErrors = Record<string, string>

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

function normalizeSourcePage(value: string | undefined): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  let input = trimmed

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed)
      if (!ALLOWED_SOURCE_HOSTS.has(parsed.hostname)) {
        return '__invalid_external_source__'
      }
      input = parsed.pathname
    } catch {
      return '__invalid_external_source__'
    }
  }

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

function formsStorageUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'SERVICE_UNAVAILABLE',
      message: 'Newsletter service is temporarily unavailable.',
    },
    { status: 503 }
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

function rateLimitResponse(locale: (typeof SUPPORTED_LOCALES)[number], retryAfterSeconds: number) {
  const message = locale === 'pl'
    ? 'Zbyt wiele prób zapisu. Spróbuj ponownie za kilka minut.'
    : 'Too many subscription attempts. Please try again in a few minutes.'

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

function unsupportedMediaTypeResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'UNSUPPORTED_MEDIA_TYPE',
      errorCode: 'UNSUPPORTED_MEDIA_TYPE',
      message: 'Content-Type must be application/json.',
    },
    { status: 415 }
  )
}

function payloadTooLargeResponse() {
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

function invalidJsonResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'INVALID_JSON',
      errorCode: 'INVALID_JSON',
    },
    { status: 400 }
  )
}

function normalizeNewsletterInput(body: unknown) {
  const data = NewsletterSchema.parse(body)
  const locale = data.locale ?? 'pl'
  const sourcePage = normalizeSourcePage(data.sourcePage)

  if (sourcePage && !SOURCE_PAGE_PATTERN.test(sourcePage)) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        message: 'Source page must be an internal pathname.',
        path: ['sourcePage'],
      },
    ])
  }

  return {
    locale,
    sourcePage,
    email: data.email.trim().toLowerCase(),
    website: data.website,
    formStartedAt: data.formStartedAt,
    turnstileToken: data.turnstileToken,
  }
}

export function createNewsletterPostHandler(
  processSubscription: typeof processNewsletterSubscription = processNewsletterSubscription,
  dependencies: NewsletterRouteDependencies = {}
) {
  const {
    verifyTurnstile = verifyTurnstileToken,
    getAbuseConfig = getNewsletterAbuseConfig,
    rateLimitSubmission = rateLimitNewsletterSubmission,
    now = () => Date.now(),
  } = dependencies

  return async function handleNewsletterPost(request: NextRequest) {
    try {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.toLowerCase().startsWith('application/json')) {
        return unsupportedMediaTypeResponse()
      }

      const contentLengthHeader = request.headers.get('content-length')
      if (contentLengthHeader) {
        const contentLength = Number(contentLengthHeader)
        if (Number.isFinite(contentLength) && contentLength > NEWSLETTER_REQUEST_BODY_MAX_BYTES) {
          return payloadTooLargeResponse()
        }
      }

      let body: unknown

      try {
        body = await request.json()
      } catch {
        return invalidJsonResponse()
      }

      const data = normalizeNewsletterInput(body)

      if (data.website.trim()) {
        return verificationResponse('BOT_VERIFICATION_FAILED')
      }

      const abuseConfig = getAbuseConfig()
      const timingResult = validateNewsletterFormStartedAt(data.formStartedAt, {
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

      const turnstileResult = await verifyTurnstile(
        data.turnstileToken,
        process.env,
        fetch,
        NEWSLETTER_TURNSTILE_ACTION
      )

      if (!turnstileResult.ok) {
        if (turnstileResult.errorCode === 'BOT_VERIFICATION_UNAVAILABLE') {
          return verificationUnavailableResponse()
        }

        return verificationResponse(turnstileResult.errorCode)
      }

      const formsPrisma = getFormsPrisma()

      await processSubscription(formsPrisma, data)

      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return validationResponse(flattenZodErrors(error))
      }

      if (isMissingFormsDatabaseUrlError(error)) {
        return formsStorageUnavailableResponse()
      }

      console.error('[API /newsletter]', error)
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