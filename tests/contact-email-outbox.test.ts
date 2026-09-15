import assert from 'node:assert/strict'

import { NextRequest } from 'next/server'

import {
  buildContactEmailMessageId,
  createPrismaContactEmailOutboxRepository,
  createContactSubmissionWithOutbox,
  processContactEmailOutboxBatch,
  type ContactEmailOutboxJobRecord,
  type ContactEmailOutboxRepository,
} from '@/lib/forms/contact-email-outbox'
import { CONTACT_CONSENT_COPY } from '@/lib/forms/constants'
import { createContactPostHandler } from '@/lib/forms/contact-route-handler'
import { runContactEmailOutboxScript } from '@/scripts/process-contact-email-outbox'
import type {
  ContactEmailKind,
  ContactEmailJobStatus,
  ContactSubmission,
} from '@/prisma/generated/forms-client'
import { getContactAbuseConfig, rateLimitContactSubmission } from '@/lib/security/contact-rate-limit'

let failures = 0

async function test(name: string, run: () => Promise<void> | void) {
  try {
    await run()
    console.log(`PASS ${name}`)
  } catch (error) {
    failures += 1
    console.error(`FAIL ${name}`)
    console.error(error)
  }
}

function buildContactRequest(overrides: Record<string, unknown> = {}) {
  return new NextRequest('https://profitia.pl/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://profitia.pl',
    },
    body: JSON.stringify({
      formType: 'contact',
      locale: 'pl',
      sourcePage: '/kontakt',
      fullName: 'Contact Outbox Test User',
      email: 'contact-outbox@example.com',
      company: 'Profitia',
      topic: 'general',
      message: 'This is a sufficiently long contact message for outbox testing.',
      privacyConsent: true,
      marketingConsent: false,
      website: '',
      formStartedAt: Date.now() - 5_000,
      turnstileToken: 'contact-outbox-token',
      ...overrides,
    }),
  })
}

function createSubmission(overrides: Partial<ContactSubmission> = {}): ContactSubmission {
  return {
    id: 'contact-submission-1',
    fullName: 'Jan Kowalski',
    email: 'jan.kowalski@gmail.com',
    company: 'Profitia Test',
    topic: 'general',
    message: 'To jest wiadomość testowa o odpowiedniej długości.',
    privacyConsent: true,
    privacyConsentText: CONTACT_CONSENT_COPY.pl.privacyConsentText,
    privacyConsentVersion: '2026-08-26',
    marketingConsent: false,
    marketingConsentText: CONTACT_CONSENT_COPY.pl.marketingConsentText,
    marketingConsentVersion: '2026-08-26',
    lawfulBasis: 'consent',
    privacyPolicyUrl: '/polityka-prywatnosci',
    privacyPolicyVersion: '2026-08-26',
    locale: 'pl',
    sourcePage: '/kontakt',
    submissionStatus: 'NEW',
    internalEmailStatus: 'PENDING',
    internalEmailSentAt: null,
    internalEmailMessageId: null,
    internalEmailError: null,
    confirmationEmailStatus: 'PENDING',
    confirmationEmailSentAt: null,
    confirmationEmailMessageId: null,
    confirmationEmailError: null,
    submittedAt: new Date('2026-09-15T10:00:00.000Z'),
    createdAt: new Date('2026-09-15T10:00:00.000Z'),
    updatedAt: new Date('2026-09-15T10:00:00.000Z'),
    ...overrides,
  }
}

function createJob(overrides: Partial<ContactEmailOutboxJobRecord> = {}): ContactEmailOutboxJobRecord {
  const submission = overrides.contactSubmission ?? createSubmission({
    id: overrides.contactSubmissionId ?? 'contact-submission-1',
  })

  return {
    id: 'contact-job-1',
    contactSubmissionId: submission.id,
    kind: 'INTERNAL_NOTIFICATION',
    status: 'PENDING',
    attempts: 0,
    availableAt: new Date('2026-09-15T10:00:00.000Z'),
    lockedAt: null,
    lastAttemptAt: null,
    sentAt: null,
    messageId: null,
    lastError: null,
    createdAt: new Date('2026-09-15T10:00:00.000Z'),
    updatedAt: new Date('2026-09-15T10:00:00.000Z'),
    contactSubmission: submission,
    ...overrides,
  }
}

function createLogger() {
  const entries: Array<{ level: 'info' | 'warn' | 'error'; message: string }> = []

  return {
    entries,
    logger: {
      info(message: string) {
        entries.push({ level: 'info', message })
      },
      warn(message: string) {
        entries.push({ level: 'warn', message })
      },
      error(message: string) {
        entries.push({ level: 'error', message })
      },
    },
  }
}

function createAllowedAbuseConfig() {
  return {
    minFillTimeMs: 1_000,
  } as ReturnType<typeof getContactAbuseConfig>
}

function createAllowedRateLimitDecision() {
  return {
    ok: true,
  } as ReturnType<typeof rateLimitContactSubmission>
}

class InMemoryContactEmailOutboxRepository implements ContactEmailOutboxRepository {
  constructor(public jobs: ContactEmailOutboxJobRecord[]) {}

  async findProcessableJobIds(input: { now: Date; leaseExpiresAt: Date; batchSize: number }) {
    return this.jobs
      .filter((job) => this.isClaimable(job, input.now, input.leaseExpiresAt))
      .sort((left, right) => {
        const availableCompare = left.availableAt.getTime() - right.availableAt.getTime()
        if (availableCompare !== 0) {
          return availableCompare
        }

        return left.createdAt.getTime() - right.createdAt.getTime()
      })
      .slice(0, input.batchSize)
      .map((job) => job.id)
  }

  async claimJob(input: { jobId: string; now: Date; leaseExpiresAt: Date }) {
    const job = this.requireJob(input.jobId)
    if (!this.isClaimable(job, input.now, input.leaseExpiresAt)) {
      return false
    }

    job.status = 'PROCESSING'
    job.lockedAt = new Date(input.now)
    return true
  }

  async getJobForProcessing(jobId: string) {
    return this.jobs.find((job) => job.id === jobId) ?? null
  }

  async markJobSent(input: {
    job: ContactEmailOutboxJobRecord
    sentAt: Date
    messageId: string | null
    attempts: number
  }) {
    const job = this.requireJob(input.job.id)
    job.status = 'SENT'
    job.attempts = input.attempts
    job.lockedAt = null
    job.lastAttemptAt = new Date(input.sentAt)
    job.sentAt = new Date(input.sentAt)
    job.messageId = input.messageId
    job.lastError = null
    this.applySubmissionUpdate(job.contactSubmission, job.kind, 'SENT', input.sentAt, input.messageId, null)
  }

  async rescheduleJob(input: {
    job: ContactEmailOutboxJobRecord
    attemptedAt: Date
    attempts: number
    availableAt: Date
    errorSummary: string
  }) {
    const job = this.requireJob(input.job.id)
    job.status = 'PENDING'
    job.attempts = input.attempts
    job.availableAt = new Date(input.availableAt)
    job.lockedAt = null
    job.lastAttemptAt = new Date(input.attemptedAt)
    job.sentAt = null
    job.messageId = null
    job.lastError = input.errorSummary
  }

  async markJobFailed(input: {
    job: ContactEmailOutboxJobRecord
    attemptedAt: Date
    attempts: number
    errorSummary: string
  }) {
    const job = this.requireJob(input.job.id)
    job.status = 'FAILED'
    job.attempts = input.attempts
    job.lockedAt = null
    job.lastAttemptAt = new Date(input.attemptedAt)
    job.sentAt = null
    job.messageId = null
    job.lastError = input.errorSummary
    this.applySubmissionUpdate(job.contactSubmission, job.kind, 'FAILED', null, null, input.errorSummary)
  }

  private requireJob(jobId: string) {
    const job = this.jobs.find((item) => item.id === jobId)
    assert.ok(job, `Expected job ${jobId} to exist.`)
    return job
  }

  private isClaimable(job: ContactEmailOutboxJobRecord, now: Date, leaseExpiresAt: Date) {
    return (job.status === 'PENDING' && job.availableAt.getTime() <= now.getTime())
      || (
        job.status === 'PROCESSING'
        && (!job.lockedAt || job.lockedAt.getTime() <= leaseExpiresAt.getTime())
      )
  }

  private applySubmissionUpdate(
    submission: ContactSubmission,
    kind: ContactEmailKind,
    status: 'SENT' | 'FAILED',
    timestamp: Date | null,
    messageId: string | null,
    errorSummary: string | null
  ) {
    if (kind === 'INTERNAL_NOTIFICATION') {
      submission.internalEmailStatus = status
      submission.internalEmailSentAt = timestamp
      submission.internalEmailMessageId = messageId
      submission.internalEmailError = errorSummary
      return
    }

    submission.confirmationEmailStatus = status
    submission.confirmationEmailSentAt = timestamp
    submission.confirmationEmailMessageId = messageId
    submission.confirmationEmailError = errorSummary
  }
}

async function main() {
  await test('createContactSubmissionWithOutbox uses one nested write with exactly two jobs', async () => {
    let connectCalls = 0
    let createCalls = 0
    let capturedKinds: ContactEmailKind[] = []

    const created = await createContactSubmissionWithOutbox({
      fullName: 'Jan Kowalski',
      email: 'jan.kowalski@gmail.com',
      company: 'Profitia Test',
      topic: 'general',
      message: 'To jest wiadomość testowa o odpowiedniej długości.',
      locale: 'pl',
      sourcePage: '/kontakt',
      privacyConsent: true,
      privacyConsentText: CONTACT_CONSENT_COPY.pl.privacyConsentText,
      privacyConsentVersion: '2026-08-26',
      marketingConsent: false,
      marketingConsentText: CONTACT_CONSENT_COPY.pl.marketingConsentText,
      marketingConsentVersion: '2026-08-26',
      lawfulBasis: 'consent',
      privacyPolicyUrl: '/polityka-prywatnosci',
      privacyPolicyVersion: '2026-08-26',
    }, {
      prisma: {
        async $connect() {
          connectCalls += 1
        },
        contactSubmission: {
          async create(args) {
            createCalls += 1
            capturedKinds = args.data.emailOutboxJobs.create.map((job) => job.kind)
            return createSubmission({ id: 'contact-submission-created', email: args.data.email, locale: args.data.locale })
          },
        },
      },
    })

    assert.equal(connectCalls, 1)
    assert.equal(createCalls, 1)
    assert.deepEqual(capturedKinds, ['INTERNAL_NOTIFICATION', 'USER_CONFIRMATION'])
    assert.equal(created.id, 'contact-submission-created')
  })

  await test('contact handler returns 201 without synchronous SMTP and accepts public email domains', async () => {
    const persistedEmails: string[] = []
    const handler = createContactPostHandler({
      verifyTurnstile: async () => ({ ok: true }),
      getAbuseConfig: () => createAllowedAbuseConfig(),
      rateLimitSubmission: () => createAllowedRateLimitDecision(),
      persistSubmissionWithOutbox: async (input) => {
        persistedEmails.push(input.email)
        return createSubmission({
          id: `submission-${persistedEmails.length}`,
          email: input.email,
          locale: input.locale,
          sourcePage: input.sourcePage,
        })
      },
    })

    for (const email of ['buyer@gmail.com', 'kupiec@wp.pl', 'user@o2.pl']) {
      const response = await handler(buildContactRequest({ email }))
      const body = await response.json()
      assert.equal(response.status, 201)
      assert.equal(body.success, true)
      assert.ok(typeof body.submissionId === 'string' && body.submissionId.length > 0)
    }

    assert.deepEqual(persistedEmails, ['buyer@gmail.com', 'kupiec@wp.pl', 'user@o2.pl'])
  })

  await test('internal notification success updates job and submission atomically', async () => {
    const logger = createLogger()
    const submission = createSubmission({ email: 'jan.kowalski@gmail.com' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-internal-success',
        kind: 'INTERNAL_NOTIFICATION',
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      env: {
        ...process.env,
        CONTACT_NOTIFICATION_EMAIL: 'kontakt@profitia.pl',
        CONTACT_NOTIFICATION_BCC: 'tomasz.uscinski@profitia.pl',
        MAILBOX_LOGIN: 'smtp@profitia.pl',
      },
      logger: logger.logger,
      now: () => new Date('2026-09-15T10:01:00.000Z'),
      sendEmail: async (input) => {
        assert.equal(input.messageId, '<contact.contact-submission-1.internal-notification@profitia.pl>')
        return {
          success: true,
          accepted: ['kontakt@profitia.pl', 'tomasz.uscinski@profitia.pl'],
          rejected: [],
          pending: [],
          messageId: input.messageId ?? null,
          timestamp: '2026-09-15T10:01:00.000Z',
        }
      },
    })

    assert.equal(result.sent, 1)
    assert.equal(repository.jobs[0]?.status, 'SENT')
    assert.equal(repository.jobs[0]?.attempts, 1)
    assert.equal(submission.internalEmailStatus, 'SENT')
    assert.equal(submission.internalEmailMessageId, '<contact.contact-submission-1.internal-notification@profitia.pl>')
    assert.equal(submission.internalEmailError, null)
    assert.equal(logger.entries[0]?.level, 'info')
    assert.equal(logger.entries[0]?.message.includes(submission.email), false)
  })

  await test('user confirmation success updates job and submission atomically', async () => {
    const submission = createSubmission({
      id: 'contact-submission-confirmation',
      email: 'jan.kowalski@wp.pl',
      locale: 'en',
    })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-confirmation-success',
        contactSubmissionId: submission.id,
        kind: 'USER_CONFIRMATION',
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      env: {
        ...process.env,
        CONTACT_NOTIFICATION_EMAIL: 'kontakt@profitia.pl',
        CONTACT_NOTIFICATION_BCC: 'tomasz.uscinski@profitia.pl',
        MAILBOX_LOGIN: 'smtp@profitia.pl',
      },
      now: () => new Date('2026-09-15T10:02:00.000Z'),
      sendEmail: async (input) => ({
        success: true,
        accepted: [Array.isArray(input.to) ? input.to[0] : input.to],
        rejected: [],
        pending: [],
        messageId: input.messageId ?? null,
        timestamp: '2026-09-15T10:02:00.000Z',
      }),
    })

    assert.equal(result.sent, 1)
    assert.equal(repository.jobs[0]?.status, 'SENT')
    assert.equal(submission.confirmationEmailStatus, 'SENT')
    assert.equal(submission.confirmationEmailMessageId, '<contact.contact-submission-confirmation.user-confirmation@profitia.pl>')
  })

  await test('internal notification requires both TO and BCC recipients to be accepted', async () => {
    const submission = createSubmission({ id: 'contact-submission-recipient-check' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-recipient-check',
        contactSubmissionId: submission.id,
        kind: 'INTERNAL_NOTIFICATION',
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      env: {
        ...process.env,
        CONTACT_NOTIFICATION_EMAIL: 'kontakt@profitia.pl',
        CONTACT_NOTIFICATION_BCC: 'tomasz.uscinski@profitia.pl',
      },
      now: () => new Date('2026-09-15T10:03:00.000Z'),
      sendEmail: async () => ({
        success: true,
        accepted: ['kontakt@profitia.pl'],
        rejected: [],
        pending: [],
        messageId: 'smtp-id',
        timestamp: '2026-09-15T10:03:00.000Z',
      }),
    })

    assert.equal(result.failed, 1)
    assert.equal(repository.jobs[0]?.status, 'FAILED')
    assert.equal(submission.internalEmailStatus, 'FAILED')
    assert.equal(submission.internalEmailError, 'SMTP_RECIPIENT_REJECTED: SMTP_RECIPIENT_REJECTED')
  })

  await test('transient SMTP failures reschedule the next attempt and keep submission pending', async () => {
    const submission = createSubmission({ id: 'contact-submission-retry' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-retry',
        contactSubmissionId: submission.id,
        kind: 'USER_CONFIRMATION',
        contactSubmission: submission,
      }),
    ])

    const now = new Date('2026-09-15T10:04:00.000Z')
    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => now,
      sendEmail: async () => ({
        success: false,
        kind: 'SMTP_TIMEOUT',
        code: 'ETIMEDOUT',
        message: 'SMTP request timed out.',
        timestamp: now.toISOString(),
      }),
    })

    assert.equal(result.rescheduled, 1)
    assert.equal(repository.jobs[0]?.status, 'PENDING')
    assert.equal(repository.jobs[0]?.attempts, 1)
    assert.equal(repository.jobs[0]?.availableAt.toISOString(), '2026-09-15T10:05:00.000Z')
    assert.equal(repository.jobs[0]?.lastError, 'SMTP_TIMEOUT: ETIMEDOUT')
    assert.equal(submission.confirmationEmailStatus, 'PENDING')
  })

  await test('permanent SMTP failures mark the job as failed', async () => {
    const submission = createSubmission({ id: 'contact-submission-permanent' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-permanent',
        contactSubmissionId: submission.id,
        kind: 'USER_CONFIRMATION',
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => new Date('2026-09-15T10:06:00.000Z'),
      sendEmail: async () => ({
        success: false,
        kind: 'SMTP_AUTH_ERROR',
        code: 'EAUTH',
        message: 'SMTP authentication failed.',
        timestamp: '2026-09-15T10:06:00.000Z',
      }),
    })

    assert.equal(result.failed, 1)
    assert.equal(repository.jobs[0]?.status, 'FAILED')
    assert.equal(repository.jobs[0]?.attempts, 1)
    assert.equal(submission.confirmationEmailStatus, 'FAILED')
    assert.equal(submission.confirmationEmailError, 'SMTP_AUTH_ERROR: EAUTH')
  })

  await test('fifth failed attempt becomes terminal even for transient send errors', async () => {
    const submission = createSubmission({ id: 'contact-submission-max-attempts' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-max-attempts',
        contactSubmissionId: submission.id,
        kind: 'INTERNAL_NOTIFICATION',
        attempts: 4,
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => new Date('2026-09-15T10:07:00.000Z'),
      sendEmail: async () => ({
        success: false,
        kind: 'SMTP_SEND_ERROR',
        code: 'EUNKNOWN',
        message: 'SMTP send failed.',
        timestamp: '2026-09-15T10:07:00.000Z',
      }),
    })

    assert.equal(result.failed, 1)
    assert.equal(repository.jobs[0]?.status, 'FAILED')
    assert.equal(repository.jobs[0]?.attempts, 5)
    assert.equal(submission.internalEmailStatus, 'FAILED')
  })

  await test('sent jobs are not processed again', async () => {
    let sendCalls = 0
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-already-sent',
        status: 'SENT',
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => new Date('2026-09-15T10:08:00.000Z'),
      sendEmail: async () => {
        sendCalls += 1
        return {
          success: true,
          accepted: ['kontakt@profitia.pl', 'tomasz.uscinski@profitia.pl'],
          rejected: [],
          pending: [],
          messageId: 'sent-again',
          timestamp: '2026-09-15T10:08:00.000Z',
        }
      },
    })

    assert.equal(result.scanned, 0)
    assert.equal(sendCalls, 0)
  })

  await test('concurrent claims do not produce double sends', async () => {
    let sendCalls = 0
    const submission = createSubmission({ id: 'contact-submission-concurrency' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-concurrency',
        contactSubmissionId: submission.id,
        kind: 'USER_CONFIRMATION',
        contactSubmission: submission,
      }),
    ])

    await Promise.all([
      processContactEmailOutboxBatch({
        repository,
        now: () => new Date('2026-09-15T10:09:00.000Z'),
        sendEmail: async (input) => {
          sendCalls += 1
          return {
            success: true,
            accepted: [Array.isArray(input.to) ? input.to[0] : input.to],
            rejected: [],
            pending: [],
            messageId: input.messageId ?? null,
            timestamp: '2026-09-15T10:09:00.000Z',
          }
        },
      }),
      processContactEmailOutboxBatch({
        repository,
        now: () => new Date('2026-09-15T10:09:00.000Z'),
        sendEmail: async (input) => {
          sendCalls += 1
          return {
            success: true,
            accepted: [Array.isArray(input.to) ? input.to[0] : input.to],
            rejected: [],
            pending: [],
            messageId: input.messageId ?? null,
            timestamp: '2026-09-15T10:09:00.000Z',
          }
        },
      }),
    ])

    assert.equal(sendCalls, 1)
    assert.equal(repository.jobs[0]?.status, 'SENT')
  })

  await test('stale processing jobs are recovered after lease expiry', async () => {
    const submission = createSubmission({ id: 'contact-submission-stale-processing' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-stale-processing',
        contactSubmissionId: submission.id,
        kind: 'USER_CONFIRMATION',
        status: 'PROCESSING',
        lockedAt: new Date('2026-09-15T09:40:00.000Z'),
        contactSubmission: submission,
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => new Date('2026-09-15T10:10:00.000Z'),
      sendEmail: async (input) => ({
        success: true,
        accepted: [Array.isArray(input.to) ? input.to[0] : input.to],
        rejected: [],
        pending: [],
        messageId: input.messageId ?? null,
        timestamp: '2026-09-15T10:10:00.000Z',
      }),
    })

    assert.equal(result.sent, 1)
    assert.equal(repository.jobs[0]?.status, 'SENT')
  })

  await test('single-job failure does not block subsequent jobs in the same batch', async () => {
    const submissionA = createSubmission({ id: 'contact-submission-a' })
    const submissionB = createSubmission({ id: 'contact-submission-b', email: 'buyer@o2.pl' })
    const repository = new InMemoryContactEmailOutboxRepository([
      createJob({
        id: 'job-first-fails',
        contactSubmissionId: submissionA.id,
        kind: 'INTERNAL_NOTIFICATION',
        contactSubmission: submissionA,
      }),
      createJob({
        id: 'job-second-succeeds',
        contactSubmissionId: submissionB.id,
        kind: 'USER_CONFIRMATION',
        contactSubmission: submissionB,
        createdAt: new Date('2026-09-15T10:00:01.000Z'),
      }),
    ])

    const result = await processContactEmailOutboxBatch({
      repository,
      now: () => new Date('2026-09-15T10:11:00.000Z'),
      sendEmail: async (input) => {
        if (input.subject.startsWith('Nowe zapytanie')) {
          return {
            success: false,
            kind: 'SMTP_AUTH_ERROR',
            code: 'EAUTH',
            message: 'SMTP authentication failed.',
            timestamp: '2026-09-15T10:11:00.000Z',
          }
        }

        return {
          success: true,
          accepted: [Array.isArray(input.to) ? input.to[0] : input.to],
          rejected: [],
          pending: [],
          messageId: input.messageId ?? null,
          timestamp: '2026-09-15T10:11:00.000Z',
        }
      },
    })

    assert.equal(result.failed, 1)
    assert.equal(result.sent, 1)
    assert.equal(repository.jobs[0]?.status, 'FAILED')
    assert.equal(repository.jobs[1]?.status, 'SENT')
  })

  await test('dispatcher script succeeds with an empty outbox and disconnects Prisma', async () => {
    let disconnectCalls = 0
    const previousExitCode = process.exitCode
    process.exitCode = undefined
    const fakeClient = {
      async $disconnect() {
        disconnectCalls += 1
      },
    } as ReturnType<typeof import('@/lib/forms/prisma').getFormsPrisma>
    const fakeRepository = new InMemoryContactEmailOutboxRepository([])
    let repositoryFactoryClient: unknown = null
    let processBatchRepository: unknown = null

    try {
      const result = await runContactEmailOutboxScript({
        argv: ['node', 'scripts/process-contact-email-outbox.ts'],
        env: { NODE_ENV: 'production' },
        logger: {
          log() {},
          info() {},
          warn() {},
          error() {},
        },
        getFormsClient: () => fakeClient,
        createRepository: (client) => {
          repositoryFactoryClient = client
          return fakeRepository as ReturnType<typeof createPrismaContactEmailOutboxRepository>
        },
        processBatch: async (options = {}) => {
          const { repository } = options
          processBatchRepository = repository
          return {
            scanned: 0,
            claimed: 0,
            sent: 0,
            rescheduled: 0,
            failed: 0,
            skipped: 0,
            technicalFailures: 0,
            fatalError: false,
          }
        },
      })

      assert.equal(result.scanned, 0)
      assert.equal(result.fatalError, false)
      assert.equal(repositoryFactoryClient, fakeClient)
      assert.equal(processBatchRepository, fakeRepository)
      assert.equal(disconnectCalls, 1)
      assert.equal(process.exitCode, 0)
    } finally {
      process.exitCode = previousExitCode
    }
  })

  await test('dispatcher script sets exitCode 1 on fatalError and still disconnects the same client', async () => {
    let disconnectCalls = 0
    const previousExitCode = process.exitCode
    process.exitCode = undefined
    const fakeClient = {
      async $disconnect() {
        disconnectCalls += 1
      },
    } as ReturnType<typeof import('@/lib/forms/prisma').getFormsPrisma>
    const fakeRepository = new InMemoryContactEmailOutboxRepository([])

    try {
      const result = await runContactEmailOutboxScript({
        argv: ['node', 'scripts/process-contact-email-outbox.ts'],
        env: { NODE_ENV: 'production' },
        logger: {
          log() {},
          info() {},
          warn() {},
          error() {},
        },
        getFormsClient: () => fakeClient,
        createRepository: (client) => {
          assert.equal(client, fakeClient)
          return fakeRepository as ReturnType<typeof createPrismaContactEmailOutboxRepository>
        },
        processBatch: async (options = {}) => {
          const { repository } = options
          assert.equal(repository, fakeRepository)
          return {
            scanned: 0,
            claimed: 0,
            sent: 0,
            rescheduled: 0,
            failed: 0,
            skipped: 0,
            technicalFailures: 0,
            fatalError: true,
          }
        },
      })

      assert.equal(result.fatalError, true)
      assert.equal(disconnectCalls, 1)
      assert.equal(process.exitCode, 1)
    } finally {
      process.exitCode = previousExitCode
    }
  })

  await test('dispatcher script sets exitCode 1 on technicalFailures', async () => {
    let disconnectCalls = 0
    const previousExitCode = process.exitCode
    process.exitCode = undefined
    const fakeClient = {
      async $disconnect() {
        disconnectCalls += 1
      },
    } as ReturnType<typeof import('@/lib/forms/prisma').getFormsPrisma>
    const fakeRepository = new InMemoryContactEmailOutboxRepository([])

    try {
      const result = await runContactEmailOutboxScript({
        argv: ['node', 'scripts/process-contact-email-outbox.ts'],
        env: { NODE_ENV: 'production' },
        logger: {
          log() {},
          info() {},
          warn() {},
          error() {},
        },
        getFormsClient: () => fakeClient,
        createRepository: (client) => {
          assert.equal(client, fakeClient)
          return fakeRepository as ReturnType<typeof createPrismaContactEmailOutboxRepository>
        },
        processBatch: async (options = {}) => {
          const { repository } = options
          assert.equal(repository, fakeRepository)
          return {
          scanned: 0,
          claimed: 0,
          sent: 0,
          rescheduled: 0,
          failed: 0,
          skipped: 0,
          technicalFailures: 2,
          fatalError: false,
          }
        },
      })

      assert.equal(result.technicalFailures, 2)
      assert.equal(disconnectCalls, 1)
      assert.equal(process.exitCode, 1)
    } finally {
      process.exitCode = previousExitCode
    }
  })

  await test('dispatcher script disconnects the active Prisma client on exception path', async () => {
    let disconnectCalls = 0
    const fakeClient = {
      async $disconnect() {
        disconnectCalls += 1
      },
    } as ReturnType<typeof import('@/lib/forms/prisma').getFormsPrisma>
    const fakeRepository = new InMemoryContactEmailOutboxRepository([])

    await assert.rejects(
      () => runContactEmailOutboxScript({
        argv: ['node', 'scripts/process-contact-email-outbox.ts'],
        env: { NODE_ENV: 'production' },
        logger: {
          log() {},
          info() {},
          warn() {},
          error() {},
        },
        getFormsClient: () => fakeClient,
        createRepository: (client) => {
          assert.equal(client, fakeClient)
          return fakeRepository as ReturnType<typeof createPrismaContactEmailOutboxRepository>
        },
        processBatch: async (options = {}) => {
          const { repository } = options
          assert.equal(repository, fakeRepository)
          throw new Error('PROCESS_BATCH_THROWN')
        },
      }),
      /PROCESS_BATCH_THROWN/
    )

    assert.equal(disconnectCalls, 1)
  })

  await test('deterministic Message-ID depends only on submission id and job kind', () => {
    const internal = buildContactEmailMessageId('submission-cuid-1', 'INTERNAL_NOTIFICATION', {
      ...process.env,
      MAILBOX_LOGIN: 'mailer@profitia.pl',
    })
    const confirmation = buildContactEmailMessageId('submission-cuid-1', 'USER_CONFIRMATION', {
      ...process.env,
      MAILBOX_LOGIN: 'mailer@profitia.pl',
    })

    assert.equal(internal, '<contact.submission-cuid-1.internal-notification@profitia.pl>')
    assert.equal(confirmation, '<contact.submission-cuid-1.user-confirmation@profitia.pl>')
    assert.equal(buildContactEmailMessageId('submission-cuid-1', 'INTERNAL_NOTIFICATION', {
      ...process.env,
      MAILBOX_LOGIN: 'mailer@profitia.pl',
    }), internal)
  })

  if (failures > 0) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})