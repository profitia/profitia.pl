import assert from 'node:assert/strict'
import { createHash, randomUUID } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'

import { NextRequest } from 'next/server'

import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import { processJobApplicationEmails } from '@/lib/recruitment/application-email'
import {
  buildCandidateConfirmationEmail,
  buildRecruiterApplicationEmail,
  resolveRecruitmentMailboxReplyTo,
  resolveRecruitmentNotificationRecipient,
} from '@/lib/recruitment/email'
import { createCareerApplyPostHandler } from '@/lib/recruitment/route-handler'
import { storeRecruitmentCvFile } from '@/lib/recruitment/storage'
import { buildCvStorageKey } from '@/lib/recruitment/cv-file'
import {
  createPendingJobApplication,
  normalizeJobApplicationInput,
  updateJobApplicationCvStatus,
} from '@/lib/recruitment/job-application'
import type { PrismaClient } from '@/prisma/generated/forms-client'
import { PrismaClient as FormsPrismaClient } from '@/prisma/generated/forms-client'

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

function readEnvFile(filePath: string) {
  const env: Record<string, string> = {}
  const text = fs.readFileSync(filePath, 'utf8')

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    let value = line.slice(separatorIndex + 1).trim()

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

function createPdfBytes() {
  return Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n', 'utf8')
}

async function createStoredApplication(
  prisma: PrismaClient,
  env: NodeJS.ProcessEnv,
  email: string,
  overrides: Partial<{
    roleSlug: 'junior-business-analyst' | 'procurement-consultant'
    locale: 'pl' | 'en'
    motivation: string
    financialExpectations: string | undefined
    weeklyAvailability: '20-30h' | '30-40h' | '40h' | undefined
    fullName: string
    sourcePage: string
  }> = {},
  file: { name?: string; bytes?: Buffer; type?: string } = {}
) {
  const now = new Date('2026-08-26T12:34:56.000Z')
  const roleSlug = overrides.roleSlug ?? 'junior-business-analyst'
  const locale = overrides.locale ?? 'pl'
  const bytes = file.bytes ?? createPdfBytes()
  const type = file.type ?? 'application/pdf'
  const filename = file.name ?? 'candidate.pdf'
  const storageKey = buildCvStorageKey(now, '.pdf', randomUUID())
  const sha256 = createHash('sha256').update(bytes).digest('hex')

  const transport = {
    roleSlug,
    fullName: overrides.fullName ?? 'Recruitment Etap 3 Test',
    email,
    phone: '+48 500 333 444',
    availableFrom: 'od zaraz',
    weeklyAvailability: roleSlug === 'junior-business-analyst' ? overrides.weeklyAvailability ?? '30-40h' : undefined,
    hybridAccepted: 'tak',
    businessTravel: 'tak',
    excelLevel: 'zaawansowany',
    englishLevel: 'biegly',
    financialExpectations: overrides.financialExpectations ?? '12000 PLN',
    motivation: overrides.motivation ?? 'TEST TECHNICZNY',
    consentCurrent: true,
    consentFuture: true,
    locale,
    sourcePage: overrides.sourcePage ?? (locale === 'en' ? '/en/career/apply' : '/career/apply'),
  } as const

  const normalized = normalizeJobApplicationInput(transport)
  const created = await createPendingJobApplication(prisma, normalized, {
    originalFilename: filename,
    canonicalMimeType: type,
    sizeBytes: bytes.byteLength,
    sha256,
    storageKey,
  }, now)

  await storeRecruitmentCvFile(storageKey, bytes, env)
  await updateJobApplicationCvStatus(prisma, created.id, {
    originalFilename: filename,
    canonicalMimeType: type,
    sizeBytes: bytes.byteLength,
    sha256,
    storageKey,
  }, 'STORED')

  return {
    application: await prisma.jobApplication.findUniqueOrThrow({ where: { id: created.id } }),
    bytes,
  }
}

function makeSuccessStub(calls: HomeplSmtpEmailInput[]) {
  return async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    calls.push(input)
    const recipient = String(Array.isArray(input.to) ? input.to[0] : input.to).trim().toLowerCase()
    return {
      success: true,
      accepted: [recipient],
      rejected: [],
      pending: [],
      messageId: input.attachments?.length ? '<recruiter@test>' : '<candidate@test>',
      timestamp: new Date().toISOString(),
    }
  }
}

function makeSelectiveFailureStub(calls: HomeplSmtpEmailInput[], matcher: (input: HomeplSmtpEmailInput) => boolean) {
  return async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    calls.push(input)
    if (matcher(input)) {
      return {
        success: false,
        kind: 'SMTP_CONNECTION_ERROR',
        code: 'ECONNREFUSED',
        message: 'SMTP connection failed.',
        timestamp: new Date().toISOString(),
      }
    }

    const recipient = String(Array.isArray(input.to) ? input.to[0] : input.to).trim().toLowerCase()
    return {
      success: true,
      accepted: [recipient],
      rejected: [],
      pending: [],
      messageId: input.attachments?.length ? '<recruiter@test>' : '<candidate@test>',
      timestamp: new Date().toISOString(),
    }
  }
}

function buildMultipartRequest(fields: Record<string, string | undefined>, file: File) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      formData.append(key, value)
    }
  }
  formData.append('cv', file)
  return new NextRequest('https://profitia.pl/api/career/apply', { method: 'POST', body: formData })
}

function buildValidSecurityFields(now = Date.now()) {
  return {
    website: '',
    formStartedAt: String(now - 5_000),
    turnstileToken: 'recruitment-etap3-turnstile-token',
  }
}

async function main() {
  Object.assign(process.env, readEnvFile('.env'))

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for recruitment ETAP 3 tests')

  const storageRoot = await mkdtemp(path.join(os.tmpdir(), 'profitia-recruitment-etap3-'))
  const env = {
    ...process.env,
    RECRUITMENT_CV_STORAGE_PATH: storageRoot,
    RECRUITMENT_NOTIFICATION_TO: 'tomasz.uscinski@profitia.pl',
    MAILBOX_LOGIN: process.env.MAILBOX_LOGIN ?? 'kontakt@profitia.pl',
  }
  const prisma = new FormsPrismaClient({ datasources: { db: { url: formsUrl } } })
  const cleanupPrefix = 'recruitment-etap3-'
  const stamp = Date.now()

  try {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })

    await test('builders keep recruiter mail Polish, candidate mail localized, and HTML escaped', async () => {
      const fileBytes = createPdfBytes()
      const { application } = await createStoredApplication(
        prisma,
        env,
        `${cleanupPrefix}builder-${stamp}@example.com`,
        {
          locale: 'en',
          roleSlug: 'procurement-consultant',
          motivation: 'Motivation with <script>alert(1)</script> & special chars',
          financialExpectations: '',
          fullName: 'Jane\nRecruiter Test',
        },
        { name: 'candidate\r\n-safe.pdf', bytes: fileBytes }
      )

      const recruiterEmail = buildRecruiterApplicationEmail(application, {
        filename: application.cvOriginalFilename ?? 'candidate.pdf',
        content: fileBytes,
        contentType: application.cvMimeType ?? 'application/pdf',
      }, env)

      assert.equal(recruiterEmail.to, 'tomasz.uscinski@profitia.pl')
      assert.equal(recruiterEmail.replyTo, application.email)
      assert.equal(recruiterEmail.subject, 'Nowa aplikacja na: Konsultant Zakupowy')
      assert.equal(recruiterEmail.attachments?.length, 1)
      assert.equal(recruiterEmail.attachments?.[0]?.filename, 'candidate-safe.pdf')
      assert.equal(recruiterEmail.attachments?.[0]?.contentType, 'application/pdf')
      assert.deepEqual(recruiterEmail.attachments?.[0]?.content, fileBytes)
      assert.match(recruiterEmail.text ?? '', /Dostępność tygodniowa:\nNie dotyczy/)
      assert.match(recruiterEmail.text ?? '', /Oczekiwania finansowe:\nNie podano/)
      assert.doesNotMatch(recruiterEmail.html, /<script>alert\(1\)<\/script>/)
      assert.match(recruiterEmail.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/)

      const candidatePl = buildCandidateConfirmationEmail({ ...application, locale: 'pl' }, env)
      assert.equal(candidatePl.subject, 'Dziękujemy za przesłanie aplikacji do Profitia')
      assert.equal(candidatePl.replyTo, resolveRecruitmentMailboxReplyTo(env))
      assert.equal(candidatePl.attachments, undefined)
      assert.match(candidatePl.text ?? '', /dziękujemy za przesłanie aplikacji na stanowisko "Konsultant Zakupowy"\./)

      const candidateEn = buildCandidateConfirmationEmail(application, env)
      assert.equal(candidateEn.subject, 'Thank you for applying to Profitia')
      assert.equal(candidateEn.attachments, undefined)
      assert.match(candidateEn.text ?? '', /Thank you for applying for the position of "Procurement Consultant"\./)
      assert.equal(resolveRecruitmentNotificationRecipient(env), 'tomasz.uscinski@profitia.pl')
    })

    await test('service marks both email branches SENT and keeps CV stored', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const { application, bytes } = await createStoredApplication(prisma, env, `${cleanupPrefix}success-${stamp}@example.com`)

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSuccessStub(calls),
      })

      assert.equal(result.publicSuccess, true)
      assert.equal(result.internalStatus, 'SENT')
      assert.equal(result.candidateStatus, 'SENT')
      assert.equal(calls.length, 2)
      assert.equal(calls[0]?.attachments?.length, 1)
      assert.equal(calls[0]?.attachments?.[0]?.filename, 'candidate.pdf')
      assert.equal(calls[0]?.attachments?.[0]?.contentType, 'application/pdf')
      assert.deepEqual(calls[0]?.attachments?.[0]?.content, bytes)
      assert.equal(calls[0]?.replyTo, application.email)
      assert.equal(calls[1]?.attachments, undefined)
      assert.equal(calls[1]?.replyTo, resolveRecruitmentMailboxReplyTo(env))

      const row = await prisma.jobApplication.findUniqueOrThrow({ where: { id: application.id } })
      assert.equal(row.applicationStatus, 'RECEIVED')
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'SENT')
      assert.equal(row.internalEmailMessageId, '<recruiter@test>')
      assert.equal(row.candidateEmailStatus, 'SENT')
      assert.equal(row.candidateEmailMessageId, '<candidate@test>')
    })

    await test('recruiter failure does not block candidate success', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const { application } = await createStoredApplication(prisma, env, `${cleanupPrefix}recruiter-fail-${stamp}@example.com`)

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSelectiveFailureStub(calls, (input) => String(input.to).includes('tomasz.uscinski@profitia.pl')),
      })

      assert.equal(result.internalStatus, 'FAILED')
      assert.equal(result.candidateStatus, 'SENT')
      assert.equal(calls.length, 2)

      const row = await prisma.jobApplication.findUniqueOrThrow({ where: { id: application.id } })
      assert.equal(row.internalEmailStatus, 'FAILED')
      assert.match(row.internalEmailError ?? '', /SMTP_CONNECTION_ERROR: ECONNREFUSED/)
      assert.equal(row.candidateEmailStatus, 'SENT')
    })

    await test('candidate failure does not block recruiter success', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const { application } = await createStoredApplication(prisma, env, `${cleanupPrefix}candidate-fail-${stamp}@example.com`)

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSelectiveFailureStub(calls, (input) => String(input.to).includes(application.email)),
      })

      assert.equal(result.internalStatus, 'SENT')
      assert.equal(result.candidateStatus, 'FAILED')
      assert.equal(calls.length, 2)

      const row = await prisma.jobApplication.findUniqueOrThrow({ where: { id: application.id } })
      assert.equal(row.internalEmailStatus, 'SENT')
      assert.equal(row.candidateEmailStatus, 'FAILED')
      assert.match(row.candidateEmailError ?? '', /SMTP_CONNECTION_ERROR: ECONNREFUSED/)
    })

    await test('both failures preserve application and CV truth', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const { application } = await createStoredApplication(prisma, env, `${cleanupPrefix}both-fail-${stamp}@example.com`)

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSelectiveFailureStub(calls, () => true),
      })

      assert.equal(result.internalStatus, 'FAILED')
      assert.equal(result.candidateStatus, 'FAILED')

      const row = await prisma.jobApplication.findUniqueOrThrow({ where: { id: application.id } })
      assert.equal(row.applicationStatus, 'RECEIVED')
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'FAILED')
      assert.equal(row.candidateEmailStatus, 'FAILED')
    })

    await test('pending tracking failure prevents sends and still returns public success', async () => {
      let sendCalls = 0
      const fakePrisma = {
        jobApplication: {
          findUnique: async () => ({
            id: 'pending-failure-app',
            position: 'JUNIOR_BUSINESS_ANALYST',
            fullName: 'Pending Failure',
            email: `${cleanupPrefix}pending-failure-${stamp}@example.com`,
            phone: '+48 500 111 222',
            availableFrom: 'od zaraz',
            weeklyAvailability: 'HOURS_30_40',
            hybridAccepted: true,
            businessTravelAccepted: true,
            excelLevel: 'ADVANCED',
            englishLevel: 'FLUENT',
            financialExpectations: '10000 PLN',
            motivation: 'Pending failure case',
            cvOriginalFilename: 'pending.pdf',
            cvMimeType: 'application/pdf',
            cvSizeBytes: 4,
            cvStorageKey: '2026/08/pending.pdf',
            cvSha256: 'abcd',
            cvStorageStatus: 'STORED',
            currentRecruitmentConsentVersion: '2026-08-26',
            currentRecruitmentConsentAt: new Date(),
            futureRecruitmentConsent: false,
            futureRecruitmentConsentVersion: null,
            futureRecruitmentConsentAt: null,
            locale: 'pl',
            internalEmailStatus: null,
            candidateEmailStatus: null,
          }),
          update: async () => {
            throw new Error('tracking update failed')
          },
        },
      } as unknown as PrismaClient

      const result = await processJobApplicationEmails(fakePrisma, 'pending-failure-app', {
        env,
        readStoredCv: async () => Buffer.from('test'),
        sendEmail: async () => {
          sendCalls += 1
          return {
            success: true,
            accepted: ['x@example.com'],
            rejected: [],
            pending: [],
            messageId: '<never@test>',
            timestamp: new Date().toISOString(),
          }
        },
        logger: { error: () => undefined },
      })

      assert.equal(result.publicSuccess, true)
      assert.equal(result.emailsAttempted, false)
      assert.equal(sendCalls, 0)
    })

    await test('non-stored CV states block all email attempts', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const pending = await prisma.jobApplication.create({
        data: {
          position: 'JUNIOR_BUSINESS_ANALYST',
          fullName: 'Pending Candidate',
          email: `${cleanupPrefix}pending-${stamp}@example.com`,
          phone: '+48 500 000 000',
          availableFrom: 'od zaraz',
          weeklyAvailability: 'HOURS_30_40',
          hybridAccepted: true,
          businessTravelAccepted: true,
          excelLevel: 'ADVANCED',
          englishLevel: 'FLUENT',
          motivation: 'Pending state',
          cvOriginalFilename: 'pending.pdf',
          cvMimeType: 'application/pdf',
          cvSizeBytes: 10,
          cvStorageKey: '2026/08/pending.pdf',
          cvSha256: 'abc',
          cvStorageStatus: 'PENDING',
          currentRecruitmentConsent: true,
          currentRecruitmentConsentText: 'x',
          currentRecruitmentConsentVersion: '2026-08-26',
          currentRecruitmentConsentAt: new Date(),
          futureRecruitmentConsent: false,
          locale: 'pl',
        },
      })
      const failed = await prisma.jobApplication.create({
        data: {
          position: 'JUNIOR_BUSINESS_ANALYST',
          fullName: 'Failed Candidate',
          email: `${cleanupPrefix}failed-${stamp}@example.com`,
          phone: '+48 500 000 001',
          availableFrom: 'od zaraz',
          weeklyAvailability: 'HOURS_30_40',
          hybridAccepted: true,
          businessTravelAccepted: true,
          excelLevel: 'ADVANCED',
          englishLevel: 'FLUENT',
          motivation: 'Failed state',
          cvOriginalFilename: 'failed.pdf',
          cvMimeType: 'application/pdf',
          cvSizeBytes: 10,
          cvStorageKey: '2026/08/failed.pdf',
          cvSha256: 'abc',
          cvStorageStatus: 'FAILED',
          currentRecruitmentConsent: true,
          currentRecruitmentConsentText: 'x',
          currentRecruitmentConsentVersion: '2026-08-26',
          currentRecruitmentConsentAt: new Date(),
          futureRecruitmentConsent: false,
          locale: 'pl',
        },
      })

      const pendingResult = await processJobApplicationEmails(prisma, pending.id, { env, sendEmail: makeSuccessStub(calls) })
      const failedResult = await processJobApplicationEmails(prisma, failed.id, { env, sendEmail: makeSuccessStub(calls) })

      assert.equal(pendingResult.emailsAttempted, false)
      assert.equal(failedResult.emailsAttempted, false)
      assert.equal(calls.length, 0)
    })

    await test('missing stored CV file fails recruiter and still sends candidate confirmation', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const { application } = await createStoredApplication(prisma, env, `${cleanupPrefix}missing-file-${stamp}@example.com`)
      await rm(path.join(storageRoot, application.cvStorageKey ?? ''), { force: true })

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSuccessStub(calls),
      })

      assert.equal(result.internalStatus, 'FAILED')
      assert.equal(result.candidateStatus, 'SENT')
      assert.equal(calls.length, 1)

      const row = await prisma.jobApplication.findUniqueOrThrow({ where: { id: application.id } })
      assert.match(row.internalEmailError ?? '', /CV_ATTACHMENT_UNAVAILABLE: STORED_FILE_MISSING/)
    })

    await test('corrupt traversal storage metadata is blocked and candidate mail still sends', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const application = await prisma.jobApplication.create({
        data: {
          position: 'JUNIOR_BUSINESS_ANALYST',
          fullName: 'Traversal Candidate',
          email: `${cleanupPrefix}traversal-${stamp}@example.com`,
          phone: '+48 500 000 002',
          availableFrom: 'od zaraz',
          weeklyAvailability: 'HOURS_30_40',
          hybridAccepted: true,
          businessTravelAccepted: true,
          excelLevel: 'ADVANCED',
          englishLevel: 'FLUENT',
          motivation: 'Traversal state',
          cvOriginalFilename: 'evil.pdf',
          cvMimeType: 'application/pdf',
          cvSizeBytes: 5,
          cvStorageKey: '../../evil.pdf',
          cvSha256: 'abc',
          cvStorageStatus: 'STORED',
          currentRecruitmentConsent: true,
          currentRecruitmentConsentText: 'x',
          currentRecruitmentConsentVersion: '2026-08-26',
          currentRecruitmentConsentAt: new Date(),
          futureRecruitmentConsent: false,
          locale: 'en',
        },
      })

      const result = await processJobApplicationEmails(prisma, application.id, {
        env,
        sendEmail: makeSuccessStub(calls),
      })

      assert.equal(result.internalStatus, 'FAILED')
      assert.equal(result.candidateStatus, 'SENT')
      assert.equal(calls.length, 1)
    })

    await test('route returns success after downstream SMTP failures and persists FAILED statuses', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const handler = createCareerApplyPostHandler({
        env,
        verifyTurnstile: async () => ({ ok: true }),
        processApplicationEmails: (formsPrisma, applicationId, options) =>
          processJobApplicationEmails(formsPrisma, applicationId, {
            ...options,
            env,
            sendEmail: makeSelectiveFailureStub(calls, () => true),
          }),
      })

      const email = `${cleanupPrefix}route-both-fail-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({
        roleSlug: 'junior-business-analyst',
        fullName: 'Route Test',
        email,
        phone: '+48 500 777 888',
        availableFrom: 'od zaraz',
        weeklyAvailability: '30-40h',
        hybridAccepted: 'tak',
        businessTravel: 'tak',
        excelLevel: 'zaawansowany',
        englishLevel: 'biegly',
        financialExpectations: '10000 PLN',
        motivation: 'Route-level downstream failure test',
        consentCurrent: 'true',
        consentFuture: 'false',
        locale: 'pl',
        sourcePage: '/career/apply',
        ...buildValidSecurityFields(stamp),
      }, new File([createPdfBytes()], 'route.pdf', { type: 'application/pdf' })))

      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { success: true })

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'FAILED')
      assert.equal(row.candidateEmailStatus, 'FAILED')
      assert.equal(calls.length, 2)
    })

    await test('duplicate applications remain independent and each triggers two email attempts', async () => {
      const calls: HomeplSmtpEmailInput[] = []
      const email = `${cleanupPrefix}duplicate-${stamp}@example.com`
      const first = await createStoredApplication(prisma, env, email)
      const second = await createStoredApplication(prisma, env, email, { motivation: 'Second application' }, { name: 'second.pdf' })

      await processJobApplicationEmails(prisma, first.application.id, { env, sendEmail: makeSuccessStub(calls) })
      await processJobApplicationEmails(prisma, second.application.id, { env, sendEmail: makeSuccessStub(calls) })

      const rows = await prisma.jobApplication.findMany({ where: { email } })
      assert.equal(rows.length, 2)
      assert.equal(rows.every((row) => row.internalEmailStatus === 'SENT'), true)
      assert.equal(rows.every((row) => row.candidateEmailStatus === 'SENT'), true)
      assert.equal(calls.length, 4)
    })
  } finally {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })
    await prisma.$disconnect()
    await rm(storageRoot, { recursive: true, force: true })
  }

  if (failures > 0) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})