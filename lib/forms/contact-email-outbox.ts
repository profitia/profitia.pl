import {
  type ContactEmailKind,
  type ContactEmailJobStatus,
  type ContactSubmission,
  type PrismaClient,
} from '@/prisma/generated/forms-client'

import {
  sendHomeplSmtpEmail,
  summarizeHomeplSmtpFailure,
  type HomeplSmtpFailure,
  type HomeplSmtpSendResult,
} from '@/lib/email/homepl-smtp'
import { buildContactConfirmationEmail } from '@/lib/forms/contact-confirmation'
import {
  buildInternalContactNotificationEmail,
  resolveContactNotificationBcc,
  resolveContactNotificationRecipient,
} from '@/lib/forms/contact-notification'
import { getFormsPrisma } from '@/lib/forms/prisma'

const CONTACT_EMAIL_QUEUE_KINDS: ContactEmailKind[] = ['INTERNAL_NOTIFICATION', 'USER_CONFIRMATION']
const CONTACT_EMAIL_CONNECT_RETRY_DELAY_MS = 150
const DEFAULT_CONTACT_EMAIL_BATCH_SIZE = 20
const MAX_CONTACT_EMAIL_BATCH_SIZE = 100
const DEFAULT_CONTACT_EMAIL_LEASE_MS = 15 * 60 * 1000
const CONTACT_EMAIL_MAX_ATTEMPTS = 5
const CONTACT_EMAIL_ERROR_MAX_LENGTH = 300
const CONTACT_EMAIL_BACKOFF_SCHEDULE_MS = [60_000, 5 * 60_000, 15 * 60_000, 60 * 60_000] as const

type ContactSubmissionWithEmailJobs = ContactSubmission

export interface ContactSubmissionPersistenceInput {
  fullName: string
  email: string
  company: string | null
  topic: string
  message: string
  locale: 'pl' | 'en'
  sourcePage: string | null
  privacyConsent: true
  privacyConsentText: string
  privacyConsentVersion: string
  marketingConsent: boolean
  marketingConsentText: string
  marketingConsentVersion: string
  lawfulBasis: string
  privacyPolicyUrl: string
  privacyPolicyVersion: string
}

interface ContactSubmissionCreateCapable {
  $connect(): Promise<void>
  contactSubmission: {
    create(args: {
      data: ContactSubmissionPersistenceInput & {
        emailOutboxJobs: {
          create: Array<{
            kind: ContactEmailKind
          }>
        }
      }
    }): Promise<ContactSubmissionWithEmailJobs>
  }
}

export interface ContactEmailOutboxJobRecord {
  id: string
  contactSubmissionId: string
  kind: ContactEmailKind
  status: ContactEmailJobStatus
  attempts: number
  availableAt: Date
  lockedAt: Date | null
  lastAttemptAt: Date | null
  sentAt: Date | null
  messageId: string | null
  lastError: string | null
  createdAt: Date
  updatedAt: Date
  contactSubmission: ContactSubmission
}

export interface ContactEmailOutboxRepository {
  findProcessableJobIds(input: {
    now: Date
    leaseExpiresAt: Date
    batchSize: number
  }): Promise<string[]>
  claimJob(input: {
    jobId: string
    now: Date
    leaseExpiresAt: Date
  }): Promise<boolean>
  getJobForProcessing(jobId: string): Promise<ContactEmailOutboxJobRecord | null>
  markJobSent(input: {
    job: ContactEmailOutboxJobRecord
    sentAt: Date
    messageId: string | null
    attempts: number
  }): Promise<void>
  rescheduleJob(input: {
    job: ContactEmailOutboxJobRecord
    attemptedAt: Date
    attempts: number
    availableAt: Date
    errorSummary: string
  }): Promise<void>
  markJobFailed(input: {
    job: ContactEmailOutboxJobRecord
    attemptedAt: Date
    attempts: number
    errorSummary: string
  }): Promise<void>
}

export interface ProcessContactEmailOutboxBatchOptions {
  batchSize?: number
  leaseMs?: number
  now?: () => Date
  env?: NodeJS.ProcessEnv
  logger?: Pick<Console, 'info' | 'warn' | 'error'>
  repository?: ContactEmailOutboxRepository
  sendEmail?: typeof sendHomeplSmtpEmail
}

export interface ProcessContactEmailOutboxBatchResult {
  scanned: number
  claimed: number
  sent: number
  rescheduled: number
  failed: number
  skipped: number
  technicalFailures: number
  fatalError: boolean
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function nowIso(date: Date) {
  return date.toISOString()
}

function isRetryableFormsConnectionError(error: unknown): boolean {
  if (error instanceof Error && error.name === 'PrismaClientInitializationError') {
    return true
  }

  return typeof error === 'object'
    && error !== null
    && 'code' in error
    && String((error as { code?: unknown }).code ?? '') === 'P1001'
}

async function ensureFormsConnection(
  prisma: ContactSubmissionCreateCapable,
  logger: Pick<Console, 'warn'> = console
) {
  try {
    await prisma.$connect()
  } catch (error) {
    if (!isRetryableFormsConnectionError(error)) {
      throw error
    }

    logger.warn('[contact-email-outbox] prisma_connect_retry=1')
    await sleep(CONTACT_EMAIL_CONNECT_RETRY_DELAY_MS)
    await prisma.$connect()
  }
}

function getSubmissionStatusUpdate(
  kind: ContactEmailKind,
  status: 'SENT' | 'FAILED',
  timestamp: Date | null,
  messageId: string | null,
  errorSummary: string | null
) {
  if (kind === 'INTERNAL_NOTIFICATION') {
    return {
      internalEmailStatus: status,
      internalEmailSentAt: timestamp,
      internalEmailMessageId: messageId,
      internalEmailError: errorSummary,
    }
  }

  return {
    confirmationEmailStatus: status,
    confirmationEmailSentAt: timestamp,
    confirmationEmailMessageId: messageId,
    confirmationEmailError: errorSummary,
  }
}

function hasAcceptedRecipient(result: { accepted: string[] }, email: string): boolean {
  return result.accepted.includes(email.trim().toLowerCase())
}

function createRecipientRejectedFailure(attemptedAt: Date): HomeplSmtpFailure {
  return {
    success: false,
    kind: 'SMTP_RECIPIENT_REJECTED',
    code: 'SMTP_RECIPIENT_REJECTED',
    message: 'SMTP server did not accept all required recipients.',
    timestamp: nowIso(attemptedAt),
  }
}

function normalizeMessageIdSegment(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-+|-+$/g, '')
}

function getMessageIdDomain(env: NodeJS.ProcessEnv): string {
  const login = env.MAILBOX_LOGIN?.trim().toLowerCase()
  if (login && login.includes('@')) {
    return login.split('@').at(-1) || 'profitia.pl'
  }

  return 'profitia.pl'
}

export function buildContactEmailMessageId(
  submissionId: string,
  kind: ContactEmailKind,
  env: NodeJS.ProcessEnv = process.env
): string {
  const kindSegment = kind === 'INTERNAL_NOTIFICATION' ? 'internal-notification' : 'user-confirmation'
  return `<contact.${normalizeMessageIdSegment(submissionId)}.${kindSegment}@${getMessageIdDomain(env)}>`
}

function classifyUnexpectedEmailError(error: unknown, attemptedAt: Date): HomeplSmtpFailure {
  const code = typeof error === 'object' && error !== null && 'code' in error
    ? String((error as { code?: unknown }).code ?? 'UNEXPECTED_ERROR')
    : 'UNEXPECTED_ERROR'
  const message = error instanceof Error ? error.message : 'Unknown SMTP error.'
  const combined = `${code} ${message}`

  if (/EAUTH|auth|Invalid login|authentication/i.test(combined)) {
    return {
      success: false,
      kind: 'SMTP_AUTH_ERROR',
      code,
      message: 'SMTP authentication failed.',
      timestamp: nowIso(attemptedAt),
    }
  }

  if (/ESOCKET|ECONNECTION|ENOTFOUND|ECONNREFUSED|EHOSTUNREACH/i.test(combined)) {
    return {
      success: false,
      kind: 'SMTP_CONNECTION_ERROR',
      code,
      message: 'SMTP connection failed.',
      timestamp: nowIso(attemptedAt),
    }
  }

  if (/ETIMEDOUT|Timeout/i.test(combined)) {
    return {
      success: false,
      kind: 'SMTP_TIMEOUT',
      code,
      message: 'SMTP request timed out.',
      timestamp: nowIso(attemptedAt),
    }
  }

  if (/certificate|TLS|ssl/i.test(combined)) {
    return {
      success: false,
      kind: 'SMTP_TLS_ERROR',
      code,
      message: 'SMTP TLS negotiation failed.',
      timestamp: nowIso(attemptedAt),
    }
  }

  return {
    success: false,
    kind: 'SMTP_SEND_ERROR',
    code,
    message: 'SMTP send failed.',
    timestamp: nowIso(attemptedAt),
  }
}

function isTransientSmtpFailure(error: HomeplSmtpFailure): boolean {
  return error.kind === 'SMTP_CONNECTION_ERROR'
    || error.kind === 'SMTP_TLS_ERROR'
    || error.kind === 'SMTP_TIMEOUT'
    || error.kind === 'SMTP_SEND_ERROR'
}

function truncateSafeError(errorSummary: string): string {
  return errorSummary.length <= CONTACT_EMAIL_ERROR_MAX_LENGTH
    ? errorSummary
    : errorSummary.slice(0, CONTACT_EMAIL_ERROR_MAX_LENGTH)
}

function getNextRetryDelayMs(attempts: number): number | null {
  if (attempts >= CONTACT_EMAIL_MAX_ATTEMPTS) {
    return null
  }

  return CONTACT_EMAIL_BACKOFF_SCHEDULE_MS[attempts - 1] ?? CONTACT_EMAIL_BACKOFF_SCHEDULE_MS.at(-1) ?? null
}

function normalizeBatchSize(batchSize: number | undefined): number {
  if (!Number.isFinite(batchSize)) {
    return DEFAULT_CONTACT_EMAIL_BATCH_SIZE
  }

  return Math.max(1, Math.min(Math.trunc(batchSize as number), MAX_CONTACT_EMAIL_BATCH_SIZE))
}

function buildEmailInput(
  job: ContactEmailOutboxJobRecord,
  env: NodeJS.ProcessEnv
) {
  const messageId = buildContactEmailMessageId(job.contactSubmissionId, job.kind, env)
  const baseMessage = job.kind === 'INTERNAL_NOTIFICATION'
    ? buildInternalContactNotificationEmail(job.contactSubmission, env)
    : buildContactConfirmationEmail(job.contactSubmission, env)

  return {
    ...baseMessage,
    messageId,
  }
}

function isSuccessfulDispatch(
  job: ContactEmailOutboxJobRecord,
  result: HomeplSmtpSendResult,
  env: NodeJS.ProcessEnv,
  attemptedAt: Date
): { ok: true; messageId: string | null } | { ok: false; failure: HomeplSmtpFailure } {
  if (!result.success) {
    return { ok: false, failure: result }
  }

  if (job.kind === 'INTERNAL_NOTIFICATION') {
    const requiredTo = resolveContactNotificationRecipient(env)
    const requiredBcc = resolveContactNotificationBcc(env)
    const accepted = hasAcceptedRecipient(result, requiredTo) && hasAcceptedRecipient(result, requiredBcc)
    return accepted
      ? { ok: true, messageId: result.messageId }
      : { ok: false, failure: createRecipientRejectedFailure(attemptedAt) }
  }

  return hasAcceptedRecipient(result, job.contactSubmission.email)
    ? { ok: true, messageId: result.messageId }
    : { ok: false, failure: createRecipientRejectedFailure(attemptedAt) }
}

export async function createContactSubmissionWithOutbox(
  input: ContactSubmissionPersistenceInput,
  dependencies: {
    prisma?: ContactSubmissionCreateCapable
    logger?: Pick<Console, 'warn'>
  } = {}
): Promise<ContactSubmissionWithEmailJobs> {
  const prisma = dependencies.prisma ?? getFormsPrisma()
  await ensureFormsConnection(prisma, dependencies.logger)

  return prisma.contactSubmission.create({
    data: {
      ...input,
      emailOutboxJobs: {
        create: CONTACT_EMAIL_QUEUE_KINDS.map((kind) => ({ kind })),
      },
    },
  })
}

export function createPrismaContactEmailOutboxRepository(
  prisma: PrismaClient = getFormsPrisma()
): ContactEmailOutboxRepository {
  return {
    async findProcessableJobIds({ now, leaseExpiresAt, batchSize }) {
      const jobs = await prisma.contactEmailOutbox.findMany({
        where: {
          OR: [
            {
              status: 'PENDING',
              availableAt: { lte: now },
            },
            {
              status: 'PROCESSING',
              OR: [
                { lockedAt: null },
                { lockedAt: { lte: leaseExpiresAt } },
              ],
            },
          ],
        },
        orderBy: [
          { availableAt: 'asc' },
          { createdAt: 'asc' },
        ],
        take: batchSize,
        select: { id: true },
      })

      return jobs.map((job) => job.id)
    },

    async claimJob({ jobId, now, leaseExpiresAt }) {
      const result = await prisma.contactEmailOutbox.updateMany({
        where: {
          id: jobId,
          OR: [
            {
              status: 'PENDING',
              availableAt: { lte: now },
            },
            {
              status: 'PROCESSING',
              OR: [
                { lockedAt: null },
                { lockedAt: { lte: leaseExpiresAt } },
              ],
            },
          ],
        },
        data: {
          status: 'PROCESSING',
          lockedAt: now,
        },
      })

      return result.count === 1
    },

    async getJobForProcessing(jobId) {
      return prisma.contactEmailOutbox.findUnique({
        where: { id: jobId },
        include: { contactSubmission: true },
      })
    },

    async markJobSent({ job, sentAt, messageId, attempts }) {
      await prisma.$transaction([
        prisma.contactEmailOutbox.update({
          where: { id: job.id },
          data: {
            status: 'SENT',
            attempts,
            lastAttemptAt: sentAt,
            lockedAt: null,
            sentAt,
            messageId,
            lastError: null,
          },
        }),
        prisma.contactSubmission.update({
          where: { id: job.contactSubmissionId },
          data: getSubmissionStatusUpdate(job.kind, 'SENT', sentAt, messageId, null),
        }),
      ])
    },

    async rescheduleJob({ job, attemptedAt, attempts, availableAt, errorSummary }) {
      await prisma.contactEmailOutbox.update({
        where: { id: job.id },
        data: {
          status: 'PENDING',
          attempts,
          availableAt,
          lockedAt: null,
          lastAttemptAt: attemptedAt,
          sentAt: null,
          messageId: null,
          lastError: errorSummary,
        },
      })
    },

    async markJobFailed({ job, attemptedAt, attempts, errorSummary }) {
      await prisma.$transaction([
        prisma.contactEmailOutbox.update({
          where: { id: job.id },
          data: {
            status: 'FAILED',
            attempts,
            lockedAt: null,
            lastAttemptAt: attemptedAt,
            sentAt: null,
            messageId: null,
            lastError: errorSummary,
          },
        }),
        prisma.contactSubmission.update({
          where: { id: job.contactSubmissionId },
          data: getSubmissionStatusUpdate(job.kind, 'FAILED', null, null, errorSummary),
        }),
      ])
    },
  }
}

export async function processContactEmailOutboxBatch(
  options: ProcessContactEmailOutboxBatchOptions = {}
): Promise<ProcessContactEmailOutboxBatchResult> {
  const logger = options.logger ?? console
  const repository = options.repository ?? createPrismaContactEmailOutboxRepository()
  const sendEmail = options.sendEmail ?? sendHomeplSmtpEmail
  const env = options.env ?? process.env
  const now = options.now ?? (() => new Date())
  const batchSize = normalizeBatchSize(options.batchSize)
  const leaseMs = options.leaseMs ?? DEFAULT_CONTACT_EMAIL_LEASE_MS
  const batchNow = now()
  const leaseExpiresAt = new Date(batchNow.getTime() - leaseMs)
  const result: ProcessContactEmailOutboxBatchResult = {
    scanned: 0,
    claimed: 0,
    sent: 0,
    rescheduled: 0,
    failed: 0,
    skipped: 0,
    technicalFailures: 0,
    fatalError: false,
  }

  let jobIds: string[]

  try {
    jobIds = await repository.findProcessableJobIds({ now: batchNow, leaseExpiresAt, batchSize })
  } catch (error) {
    logger.error('[contact-email-outbox] result=BATCH_QUERY_FAILED')
    return {
      ...result,
      fatalError: true,
      technicalFailures: 1,
    }
  }

  result.scanned = jobIds.length

  for (const jobId of jobIds) {
    const attemptedAt = now()
    const attemptLeaseExpiresAt = new Date(attemptedAt.getTime() - leaseMs)

    try {
      const claimed = await repository.claimJob({
        jobId,
        now: attemptedAt,
        leaseExpiresAt: attemptLeaseExpiresAt,
      })

      if (!claimed) {
        result.skipped += 1
        continue
      }

      result.claimed += 1

      const job = await repository.getJobForProcessing(jobId)
      if (!job || job.status !== 'PROCESSING') {
        result.skipped += 1
        continue
      }

      const attempts = job.attempts + 1
      const smtpInput = buildEmailInput(job, env)

      try {
        const smtpResult = await sendEmail(smtpInput, env)
        const dispatch = isSuccessfulDispatch(job, smtpResult, env, attemptedAt)

        if (dispatch.ok) {
          await repository.markJobSent({
            job,
            sentAt: attemptedAt,
            messageId: dispatch.messageId,
            attempts,
          })
          logger.info(
            `[contact-email-outbox] job=${job.id} submission=${job.contactSubmissionId} kind=${job.kind} attempt=${attempts} result=SENT`
          )
          result.sent += 1
          continue
        }

        const errorSummary = truncateSafeError(summarizeHomeplSmtpFailure(dispatch.failure))
        const nextDelayMs = isTransientSmtpFailure(dispatch.failure) ? getNextRetryDelayMs(attempts) : null

        if (nextDelayMs !== null) {
          await repository.rescheduleJob({
            job,
            attemptedAt,
            attempts,
            availableAt: new Date(attemptedAt.getTime() + nextDelayMs),
            errorSummary,
          })
          logger.warn(
            `[contact-email-outbox] job=${job.id} submission=${job.contactSubmissionId} kind=${job.kind} attempt=${attempts} result=RETRY code=${dispatch.failure.code}`
          )
          result.rescheduled += 1
          continue
        }

        await repository.markJobFailed({
          job,
          attemptedAt,
          attempts,
          errorSummary,
        })
        logger.warn(
          `[contact-email-outbox] job=${job.id} submission=${job.contactSubmissionId} kind=${job.kind} attempt=${attempts} result=FAILED code=${dispatch.failure.code}`
        )
        result.failed += 1
      } catch (error) {
        const failure = classifyUnexpectedEmailError(error, attemptedAt)
        const errorSummary = truncateSafeError(summarizeHomeplSmtpFailure(failure))
        const nextDelayMs = isTransientSmtpFailure(failure) ? getNextRetryDelayMs(attempts) : null

        if (nextDelayMs !== null) {
          await repository.rescheduleJob({
            job,
            attemptedAt,
            attempts,
            availableAt: new Date(attemptedAt.getTime() + nextDelayMs),
            errorSummary,
          })
          logger.warn(
            `[contact-email-outbox] job=${job.id} submission=${job.contactSubmissionId} kind=${job.kind} attempt=${attempts} result=RETRY code=${failure.code}`
          )
          result.rescheduled += 1
          continue
        }

        await repository.markJobFailed({
          job,
          attemptedAt,
          attempts,
          errorSummary,
        })
        logger.warn(
          `[contact-email-outbox] job=${job.id} submission=${job.contactSubmissionId} kind=${job.kind} attempt=${attempts} result=FAILED code=${failure.code}`
        )
        result.failed += 1
      }
    } catch (error) {
      result.technicalFailures += 1
      logger.error(`[contact-email-outbox] job=${jobId} result=PROCESSING_ERROR`)
    }
  }

  return result
}