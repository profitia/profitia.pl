import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getFormsPrisma, isMissingFormsDatabaseUrlError } from '@/lib/forms/prisma'
import { RECRUITMENT_TURNSTILE_ACTION } from '@/lib/forms/constants'
import {
  parseFormBoolean,
  RecruitmentTransportSchema,
  RECRUITMENT_ALLOWED_MULTIPART_FIELDS,
  RECRUITMENT_FIELD_LIMITS,
  RECRUITMENT_REQUEST_BODY_MAX_BYTES,
  type RecruitmentTransportInput,
} from '@/lib/recruitment/contract'
import {
  createPendingJobApplication,
  normalizeJobApplicationInput,
  updateJobApplicationCvStatus,
} from '@/lib/recruitment/job-application'
import {
  buildCvStorageKey,
  RecruitmentUploadError,
  validateUploadedCv,
} from '@/lib/recruitment/cv-file'
import {
  deleteRecruitmentCvFile,
  RecruitmentStorageUnavailableError,
  storeRecruitmentCvFile,
} from '@/lib/recruitment/storage'
import { processJobApplicationEmails } from '@/lib/recruitment/application-email'
import {
  extractClientIp,
  getRecruitmentAbuseConfig,
  rateLimitRecruitmentSubmission,
  validateRecruitmentFormStartedAt,
} from '@/lib/security/contact-rate-limit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

type ValidationFieldErrors = Record<string, string>

export interface CareerApplyRouteDependencies {
  now?: () => Date
  getFormsClient?: typeof getFormsPrisma
  validateCv?: typeof validateUploadedCv
  storeCv?: typeof storeRecruitmentCvFile
  deleteStoredCv?: typeof deleteRecruitmentCvFile
  processApplicationEmails?: typeof processJobApplicationEmails
  verifyTurnstile?: typeof verifyTurnstileToken
  getAbuseConfig?: typeof getRecruitmentAbuseConfig
  rateLimitSubmission?: typeof rateLimitRecruitmentSubmission
  env?: NodeJS.ProcessEnv
  logger?: Pick<Console, 'error'>
}

interface ParsedRecruitmentMultipartPayload {
  transport: RecruitmentTransportInput
  cv: File
  website: string
  formStartedAt: string | undefined
  turnstileToken: string | undefined
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

function rateLimitResponse(locale: RecruitmentTransportInput['locale'], retryAfterSeconds: number) {
  const message = locale === 'pl'
    ? 'Zbyt wiele prób przesłania aplikacji. Spróbuj ponownie za kilka minut.'
    : 'Too many application attempts. Please try again in a few minutes.'

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
      message: 'Content-Type must be multipart/form-data.',
    },
    { status: 415 }
  )
}

function payloadTooLargeResponse(fields?: ValidationFieldErrors) {
  return NextResponse.json(
    {
      success: false,
      error: 'PAYLOAD_TOO_LARGE',
      errorCode: 'PAYLOAD_TOO_LARGE',
      message: 'Request body is too large.',
      ...(fields ? { fields } : {}),
    },
    { status: 413 }
  )
}

function formsStorageUnavailableResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'SERVICE_UNAVAILABLE',
      errorCode: 'SERVICE_UNAVAILABLE',
      message: 'Recruitment application service is temporarily unavailable.',
    },
    { status: 503 }
  )
}

function serverErrorResponse() {
  return NextResponse.json(
    {
      success: false,
      error: 'SERVER_ERROR',
      errorCode: 'SERVER_ERROR',
    },
    { status: 500 }
  )
}

function responseFromUploadError(error: RecruitmentUploadError) {
  if (error.status === 413) {
    return payloadTooLargeResponse(error.fields)
  }

  return NextResponse.json(
    {
      success: false,
      error: error.errorCode,
      errorCode: error.errorCode,
      ...(error.fields ? { fields: error.fields } : {}),
    },
    { status: error.status }
  )
}

function multipartValidationError(field: string, message: string): z.ZodError {
  return new z.ZodError([
    {
      code: z.ZodIssueCode.custom,
      message,
      path: [field],
    },
  ])
}

async function parseMultipartTransport(request: NextRequest): Promise<{
  transport: RecruitmentTransportInput
  cv: File
  website: string
  formStartedAt: string | undefined
  turnstileToken: string | undefined
}> {
  const formData = await request.formData()
  const allowedFields = new Set<string>(RECRUITMENT_ALLOWED_MULTIPART_FIELDS)
  const payload: Record<string, unknown> = {}
  let cvFile: File | null = null

  for (const [key, value] of formData.entries()) {
    if (!allowedFields.has(key)) {
      throw multipartValidationError(key, 'Unknown field is not allowed.')
    }

    if (key === 'cv') {
      if (!(value instanceof File)) {
        throw multipartValidationError('cv', 'Please attach your CV (PDF, DOC or DOCX).')
      }

      if (cvFile) {
        throw multipartValidationError('cv', 'Exactly one CV file is required.')
      }

      cvFile = value
      continue
    }

    if (value instanceof File) {
      throw multipartValidationError(key, 'Unexpected file upload.')
    }

    if (Object.prototype.hasOwnProperty.call(payload, key)) {
      throw multipartValidationError(key, 'Duplicate field is not allowed.')
    }

    payload[key] = value
  }

  if (!cvFile) {
    throw multipartValidationError('cv', 'Please attach your CV (PDF, DOC or DOCX).')
  }

  const transport = RecruitmentTransportSchema.parse({
    roleSlug: payload.roleSlug,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    availableFrom: payload.availableFrom,
    weeklyAvailability: payload.weeklyAvailability || undefined,
    hybridAccepted: payload.hybridAccepted,
    businessTravel: payload.businessTravel,
    excelLevel: payload.excelLevel,
    englishLevel: payload.englishLevel,
    financialExpectations: payload.financialExpectations || undefined,
    motivation: payload.motivation,
    consentCurrent: parseFormBoolean(typeof payload.consentCurrent === 'string' ? payload.consentCurrent : undefined),
    consentFuture: parseFormBoolean(typeof payload.consentFuture === 'string' ? payload.consentFuture : undefined),
    locale: payload.locale,
    sourcePage: payload.sourcePage || undefined,
  })

  const website = typeof payload.website === 'string' ? payload.website : ''
  if (website.length > RECRUITMENT_FIELD_LIMITS.website) {
    throw multipartValidationError('website', `Website must not exceed ${RECRUITMENT_FIELD_LIMITS.website} characters.`)
  }

  const formStartedAt = typeof payload.formStartedAt === 'string' ? payload.formStartedAt : undefined
  if (formStartedAt !== undefined && formStartedAt.length > RECRUITMENT_FIELD_LIMITS.formStartedAt) {
    throw multipartValidationError(
      'formStartedAt',
      `Security metadata must not exceed ${RECRUITMENT_FIELD_LIMITS.formStartedAt} characters.`
    )
  }

  const turnstileToken = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : undefined
  if (turnstileToken !== undefined && turnstileToken.length > RECRUITMENT_FIELD_LIMITS.turnstileToken) {
    throw multipartValidationError(
      'turnstileToken',
      `Security token must not exceed ${RECRUITMENT_FIELD_LIMITS.turnstileToken} characters.`
    )
  }

  return {
    transport,
    cv: cvFile,
    website,
    formStartedAt,
    turnstileToken,
  }
}

function parseFormStartedAt(rawValue: string | undefined): number | undefined {
  if (rawValue === undefined) {
    return undefined
  }

  const trimmed = rawValue.trim()
  if (!trimmed) {
    return Number.NaN
  }

  if (!/^\d+$/.test(trimmed)) {
    return Number.NaN
  }

  const numeric = Number(trimmed)
  if (!Number.isSafeInteger(numeric)) {
    return Number.NaN
  }

  return numeric
}

export function createCareerApplyPostHandler(dependencies: CareerApplyRouteDependencies = {}) {
  const {
    now = () => new Date(),
    getFormsClient = getFormsPrisma,
    validateCv = validateUploadedCv,
    storeCv = storeRecruitmentCvFile,
    deleteStoredCv = deleteRecruitmentCvFile,
    processApplicationEmails = processJobApplicationEmails,
    verifyTurnstile = verifyTurnstileToken,
    getAbuseConfig = getRecruitmentAbuseConfig,
    rateLimitSubmission = rateLimitRecruitmentSubmission,
    env = process.env,
    logger = console,
  } = dependencies

  return async function handleCareerApplyPost(request: NextRequest) {
    try {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.toLowerCase().startsWith('multipart/form-data')) {
        return unsupportedMediaTypeResponse()
      }

      const contentLengthHeader = request.headers.get('content-length')
      if (contentLengthHeader) {
        const contentLength = Number(contentLengthHeader)
        if (Number.isFinite(contentLength) && contentLength > RECRUITMENT_REQUEST_BODY_MAX_BYTES) {
          return payloadTooLargeResponse()
        }
      }

      const requestNow = now()
      const { transport, cv, website, formStartedAt, turnstileToken } = await parseMultipartTransport(request)
      const normalized = normalizeJobApplicationInput(transport)

      if (website.trim()) {
        return verificationResponse('BOT_VERIFICATION_FAILED')
      }

      const abuseConfig = getAbuseConfig(env)
      const timingResult = validateRecruitmentFormStartedAt(parseFormStartedAt(formStartedAt), {
        now: requestNow.getTime(),
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
        email: normalized.email,
      })

      if (!rateLimitResult.ok) {
        return rateLimitResponse(transport.locale, rateLimitResult.retryAfterSeconds)
      }

      const turnstileResult = await verifyTurnstile(
        turnstileToken,
        env,
        fetch,
        RECRUITMENT_TURNSTILE_ACTION
      )

      if (!turnstileResult.ok) {
        if (turnstileResult.errorCode === 'BOT_VERIFICATION_UNAVAILABLE') {
          return verificationUnavailableResponse()
        }

        return verificationResponse(turnstileResult.errorCode)
      }

      const validatedCv = await validateCv(cv)
      const storageKey = buildCvStorageKey(requestNow, validatedCv.extension)
      const formsPrisma = getFormsClient()

      const cvMetadata = {
        originalFilename: validatedCv.originalFilename,
        canonicalMimeType: validatedCv.canonicalMimeType,
        sizeBytes: validatedCv.sizeBytes,
        sha256: validatedCv.sha256,
        storageKey,
      }

      const application = await createPendingJobApplication(formsPrisma, normalized, cvMetadata, requestNow)

      try {
        await storeCv(storageKey, validatedCv.bytes, env)
      } catch {
        try {
          await updateJobApplicationCvStatus(formsPrisma, application.id, cvMetadata, 'FAILED')
        } catch {
          logger.error(`[recruitment storage-failure-status-update] application=${application.id}`)
        }

        logger.error(`[recruitment storage-write-failed] application=${application.id}`)
        return formsStorageUnavailableResponse()
      }

      try {
        await updateJobApplicationCvStatus(formsPrisma, application.id, cvMetadata, 'STORED')
      } catch {
        try {
          await deleteStoredCv(storageKey, env)
        } catch {
          logger.error(`[recruitment storage-cleanup-failed] application=${application.id}`)
        }

        try {
          await updateJobApplicationCvStatus(formsPrisma, application.id, cvMetadata, 'FAILED')
        } catch {
          logger.error(`[recruitment finalization-status-update-failed] application=${application.id}`)
        }

        logger.error(`[recruitment db-finalization-failed] application=${application.id}`)
        return formsStorageUnavailableResponse()
      }

      await processApplicationEmails(formsPrisma, application.id, {
        env,
        logger,
        now,
      })

      return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return validationResponse(flattenZodErrors(error))
      }

      if (error instanceof RecruitmentUploadError) {
        return responseFromUploadError(error)
      }

      if (isMissingFormsDatabaseUrlError(error) || error instanceof RecruitmentStorageUnavailableError) {
        return formsStorageUnavailableResponse()
      }

      logger.error('[API /career/apply] category=unhandled')
      return serverErrorResponse()
    }
  }
}