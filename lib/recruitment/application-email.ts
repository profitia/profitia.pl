import type {
  EmailDeliveryStatus,
  JobApplication,
  PrismaClient,
} from '@/prisma/generated/forms-client'
import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import { sendHomeplSmtpEmail } from '@/lib/email/homepl-smtp'
import {
  buildCandidateConfirmationEmail,
  buildRecruiterApplicationEmail,
  doesStoredCvMatchMetadata,
  resolveRecruitmentNotificationRecipient,
  summarizeMissingCvAttachmentError,
  summarizeRecruitmentEmailFailure,
} from '@/lib/recruitment/email'
import { readRecruitmentCvFile } from '@/lib/recruitment/storage'

type SendRecruitmentEmail = typeof sendHomeplSmtpEmail
type ReadStoredCv = typeof readRecruitmentCvFile
type Logger = Pick<Console, 'error'>

type ApplicationForRecruitmentEmail = Pick<
  JobApplication,
  | 'id'
  | 'position'
  | 'fullName'
  | 'email'
  | 'phone'
  | 'availableFrom'
  | 'weeklyAvailability'
  | 'hybridAccepted'
  | 'businessTravelAccepted'
  | 'excelLevel'
  | 'englishLevel'
  | 'financialExpectations'
  | 'motivation'
  | 'cvOriginalFilename'
  | 'cvMimeType'
  | 'cvSizeBytes'
  | 'cvStorageKey'
  | 'cvSha256'
  | 'cvStorageStatus'
  | 'currentRecruitmentConsentVersion'
  | 'currentRecruitmentConsentAt'
  | 'futureRecruitmentConsent'
  | 'futureRecruitmentConsentVersion'
  | 'futureRecruitmentConsentAt'
  | 'locale'
  | 'internalEmailStatus'
  | 'candidateEmailStatus'
>

export interface ProcessJobApplicationEmailsOptions {
  env?: NodeJS.ProcessEnv
  sendEmail?: SendRecruitmentEmail
  readStoredCv?: ReadStoredCv
  logger?: Logger
  now?: () => Date
}

export interface ProcessJobApplicationEmailsResult {
  publicSuccess: true
  emailsAttempted: boolean
  internalAttempted: boolean
  candidateAttempted: boolean
  internalStatus: EmailDeliveryStatus | null
  candidateStatus: EmailDeliveryStatus | null
}

function hasAcceptedRecipient(result: { accepted: string[] }, email: string): boolean {
  return result.accepted.includes(email.trim().toLowerCase())
}

function logRecruitmentTrackingFailure(
  logger: Logger,
  error: unknown,
  applicationId: string,
  integration: 'internal' | 'candidate',
  stage: 'pending' | 'success' | 'failure'
) {
  const safeMessage = error instanceof Error ? error.message : 'Unknown tracking persistence failure.'
  logger.error(`[recruitment ${integration} tracking/${stage}] application=${applicationId} ${safeMessage}`)
}

async function updateEmailTracking(
  formsPrisma: PrismaClient,
  applicationId: string,
  branch: 'internal' | 'candidate',
  status: EmailDeliveryStatus,
  sentAt: Date | null,
  messageId: string | null,
  error: string | null
) {
  if (branch === 'internal') {
    return formsPrisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        internalEmailStatus: status,
        internalEmailSentAt: sentAt,
        internalEmailMessageId: messageId,
        internalEmailError: error,
      },
    })
  }

  return formsPrisma.jobApplication.update({
    where: { id: applicationId },
    data: {
      candidateEmailStatus: status,
      candidateEmailSentAt: sentAt,
      candidateEmailMessageId: messageId,
      candidateEmailError: error,
    },
  })
}

async function markEmailsPending(formsPrisma: PrismaClient, applicationId: string) {
  await formsPrisma.jobApplication.update({
    where: { id: applicationId },
    data: {
      internalEmailStatus: 'PENDING',
      internalEmailSentAt: null,
      internalEmailMessageId: null,
      internalEmailError: null,
      candidateEmailStatus: 'PENDING',
      candidateEmailSentAt: null,
      candidateEmailMessageId: null,
      candidateEmailError: null,
    },
  })
}

async function attemptRecruiterEmail(
  formsPrisma: PrismaClient,
  application: ApplicationForRecruitmentEmail,
  options: Required<Pick<ProcessJobApplicationEmailsOptions, 'env' | 'sendEmail' | 'readStoredCv' | 'logger' | 'now'>>
): Promise<EmailDeliveryStatus> {
  const { env, sendEmail, readStoredCv, logger, now } = options

  if (!application.cvStorageKey || !application.cvOriginalFilename || !application.cvMimeType) {
    try {
      await updateEmailTracking(formsPrisma, application.id, 'internal', 'FAILED', null, null, summarizeMissingCvAttachmentError('MISSING_CV_METADATA'))
    } catch (error) {
      logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'failure')
      return 'PENDING'
    }
    return 'FAILED'
  }

  let cvBytes: Buffer
  try {
    cvBytes = await readStoredCv(application.cvStorageKey, env)
  } catch {
    try {
      await updateEmailTracking(formsPrisma, application.id, 'internal', 'FAILED', null, null, summarizeMissingCvAttachmentError('STORED_FILE_MISSING'))
    } catch (error) {
      logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'failure')
      return 'PENDING'
    }
    return 'FAILED'
  }

  if (!doesStoredCvMatchMetadata(application, cvBytes)) {
    try {
      await updateEmailTracking(formsPrisma, application.id, 'internal', 'FAILED', null, null, summarizeMissingCvAttachmentError('STORED_FILE_METADATA_MISMATCH'))
    } catch (error) {
      logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'failure')
      return 'PENDING'
    }
    return 'FAILED'
  }

  const recruiterRecipient = resolveRecruitmentNotificationRecipient(env)
  const recruiterEmail = buildRecruiterApplicationEmail(application, {
    filename: application.cvOriginalFilename,
    content: cvBytes,
    contentType: application.cvMimeType,
  }, env)

  let result: HomeplSmtpSendResult
  try {
    result = await sendEmail(recruiterEmail, env)
  } catch {
    result = {
      success: false,
      kind: 'SMTP_SEND_ERROR',
      code: 'SMTP_UNEXPECTED_ERROR',
      message: 'SMTP send failed.',
      timestamp: now().toISOString(),
    }
  }

  if (result.success && hasAcceptedRecipient(result, recruiterRecipient)) {
    try {
      await updateEmailTracking(formsPrisma, application.id, 'internal', 'SENT', now(), result.messageId, null)
      return 'SENT'
    } catch (error) {
      logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'success')
      return 'PENDING'
    }
  }

  const failureSummary = result.success
    ? 'SMTP_RECIPIENT_REJECTED: SMTP_RECIPIENT_REJECTED'
    : summarizeRecruitmentEmailFailure(result)

  try {
    await updateEmailTracking(formsPrisma, application.id, 'internal', 'FAILED', null, null, failureSummary)
    return 'FAILED'
  } catch (error) {
    logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'failure')
    return 'PENDING'
  }
}

async function attemptCandidateEmail(
  formsPrisma: PrismaClient,
  application: ApplicationForRecruitmentEmail,
  options: Required<Pick<ProcessJobApplicationEmailsOptions, 'env' | 'sendEmail' | 'logger' | 'now'>>
): Promise<EmailDeliveryStatus> {
  const { env, sendEmail, logger, now } = options
  const candidateEmail = buildCandidateConfirmationEmail(application, env)

  let result: HomeplSmtpSendResult
  try {
    result = await sendEmail(candidateEmail, env)
  } catch {
    result = {
      success: false,
      kind: 'SMTP_SEND_ERROR',
      code: 'SMTP_UNEXPECTED_ERROR',
      message: 'SMTP send failed.',
      timestamp: now().toISOString(),
    }
  }

  if (result.success && hasAcceptedRecipient(result, application.email)) {
    try {
      await updateEmailTracking(formsPrisma, application.id, 'candidate', 'SENT', now(), result.messageId, null)
      return 'SENT'
    } catch (error) {
      logRecruitmentTrackingFailure(logger, error, application.id, 'candidate', 'success')
      return 'PENDING'
    }
  }

  const failureSummary = result.success
    ? 'SMTP_RECIPIENT_REJECTED: SMTP_RECIPIENT_REJECTED'
    : summarizeRecruitmentEmailFailure(result)

  try {
    await updateEmailTracking(formsPrisma, application.id, 'candidate', 'FAILED', null, null, failureSummary)
    return 'FAILED'
  } catch (error) {
    logRecruitmentTrackingFailure(logger, error, application.id, 'candidate', 'failure')
    return 'PENDING'
  }
}

export async function processJobApplicationEmails(
  formsPrisma: PrismaClient,
  applicationId: string,
  options: ProcessJobApplicationEmailsOptions = {}
): Promise<ProcessJobApplicationEmailsResult> {
  const {
    env = process.env,
    sendEmail = sendHomeplSmtpEmail,
    readStoredCv = readRecruitmentCvFile,
    logger = console,
    now = () => new Date(),
  } = options

  const application = await formsPrisma.jobApplication.findUnique({
    where: { id: applicationId },
  })

  if (!application || application.cvStorageStatus !== 'STORED' || !application.cvStorageKey) {
    return {
      publicSuccess: true,
      emailsAttempted: false,
      internalAttempted: false,
      candidateAttempted: false,
      internalStatus: application?.internalEmailStatus ?? null,
      candidateStatus: application?.candidateEmailStatus ?? null,
    }
  }

  try {
    await markEmailsPending(formsPrisma, application.id)
  } catch (error) {
    logRecruitmentTrackingFailure(logger, error, application.id, 'internal', 'pending')
    logRecruitmentTrackingFailure(logger, error, application.id, 'candidate', 'pending')
    return {
      publicSuccess: true,
      emailsAttempted: false,
      internalAttempted: false,
      candidateAttempted: false,
      internalStatus: application.internalEmailStatus ?? null,
      candidateStatus: application.candidateEmailStatus ?? null,
    }
  }

  const baseOptions = { env, sendEmail, readStoredCv, logger, now }
  const internalStatus = await attemptRecruiterEmail(formsPrisma, application, baseOptions)
  const candidateStatus = await attemptCandidateEmail(formsPrisma, application, baseOptions)

  return {
    publicSuccess: true,
    emailsAttempted: true,
    internalAttempted: true,
    candidateAttempted: true,
    internalStatus,
    candidateStatus,
  }
}