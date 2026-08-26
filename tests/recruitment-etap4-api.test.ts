import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, rm } from 'node:fs/promises'

import { NextRequest } from 'next/server'

import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import { PrismaClient } from '@/prisma/generated/forms-client'
import { RECRUITMENT_TURNSTILE_ACTION } from '@/lib/forms/constants'
import { processJobApplicationEmails } from '@/lib/recruitment/application-email'
import { RECRUITMENT_REQUEST_BODY_MAX_BYTES } from '@/lib/recruitment/contract'
import { createCareerApplyPostHandler } from '@/lib/recruitment/route-handler'
import {
  getContactAbuseConfig,
  getNewsletterAbuseConfig,
  getRecruitmentAbuseConfig,
  rateLimitContactSubmission,
  rateLimitNewsletterSubmission,
  rateLimitRecruitmentSubmission,
} from '@/lib/security/contact-rate-limit'
import { verifyTurnstileToken } from '@/lib/security/turnstile'

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

function createPdfFile(name = 'candidate.pdf', bytes = createPdfBytes(), type = 'application/pdf') {
  return new File([bytes], name, { type })
}

function buildValidSecurityFields(now = Date.now()) {
  return {
    website: '',
    formStartedAt: String(now - 5_000),
    turnstileToken: 'recruitment-etap4-turnstile-token',
  }
}

function buildBaseFields(now = Date.now()) {
  return {
    roleSlug: 'junior-business-analyst',
    fullName: 'Recruitment Etap 4 Candidate',
    email: `recruitment-etap4-${now}@example.com`,
    phone: '+48 500 123 123',
    availableFrom: 'od zaraz',
    weeklyAvailability: '30-40h',
    hybridAccepted: 'tak',
    businessTravel: 'tak',
    excelLevel: 'zaawansowany',
    englishLevel: 'biegly',
    financialExpectations: '12000 PLN',
    motivation: 'This is a valid recruitment ETAP 4 transport payload.',
    consentCurrent: 'true',
    consentFuture: 'false',
    locale: 'pl',
    sourcePage: '/career/apply',
    ...buildValidSecurityFields(now),
  }
}

function buildMultipartRequest(
  fields: Record<string, string | undefined>,
  file: File | null,
  init?: { headers?: HeadersInit; duplicateCv?: boolean; extraFile?: { field: string; file: File } }
) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      formData.append(key, value)
    }
  }

  if (file) {
    formData.append('cv', file)
    if (init?.duplicateCv) {
      formData.append('cv', file)
    }
  }

  if (init?.extraFile) {
    formData.append(init.extraFile.field, init.extraFile.file)
  }

  return new NextRequest('https://profitia.pl/api/career/apply', {
    method: 'POST',
    headers: init?.headers,
    body: formData,
  })
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
      messageId: input.attachments?.length ? '<recruitment-etap4-internal@test>' : '<recruitment-etap4-candidate@test>',
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
      messageId: input.attachments?.length ? '<recruitment-etap4-internal@test>' : '<recruitment-etap4-candidate@test>',
      timestamp: new Date().toISOString(),
    }
  }
}

function makeTurnstileVerifier(options?: {
  mode?: 'success' | 'failed' | 'unavailable'
  action?: string
  hostname?: string
}) {
  let siteverifyCalls = 0
  const verifierEnv: NodeJS.ProcessEnv = {
    ...process.env,
    TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
    TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,www.profitia.pl,profitia-pl.onrender.com,127.0.0.1,localhost',
  }

  const verifyTurnstile = async (
    token: unknown,
    env?: NodeJS.ProcessEnv,
    fetchImpl?: typeof fetch,
    expectedAction?: string
  ) => verifyTurnstileToken(
    token,
    { ...verifierEnv, ...env },
    async () => {
      siteverifyCalls += 1

      if (options?.mode === 'unavailable') {
        throw new Error('siteverify unavailable')
      }

      const success = options?.mode !== 'failed'
      return new Response(JSON.stringify({
        success,
        hostname: options?.hostname ?? 'profitia.pl',
        action: options?.action ?? expectedAction ?? RECRUITMENT_TURNSTILE_ACTION,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    },
    expectedAction
  )

  return {
    verifyTurnstile,
    getSiteverifyCalls: () => siteverifyCalls,
  }
}

function createSideEffectHarness(options?: {
  nowMs?: number
  rateLimitResult?: { ok: true } | { ok: false; retryAfterSeconds: number }
  turnstile?: ReturnType<typeof makeTurnstileVerifier>
}) {
  let dbCreates = 0
  let storageWrites = 0
  let smtpAttempts = 0

  const turnstile = options?.turnstile ?? makeTurnstileVerifier()
  const handler = createCareerApplyPostHandler({
    now: () => new Date(options?.nowMs ?? 10_000),
    env: {
      ...process.env,
      RECRUITMENT_CV_STORAGE_PATH: path.join(os.tmpdir(), 'profitia-recruitment-etap4-side-effects'),
    },
    verifyTurnstile: turnstile.verifyTurnstile,
    rateLimitSubmission: () => options?.rateLimitResult ?? ({ ok: true }),
    getFormsClient: () => ({
      jobApplication: {
        create: async () => {
          dbCreates += 1
          return { id: 'test-app-id' }
        },
        update: async () => ({ id: 'test-app-id' }),
      },
    }) as unknown as PrismaClient,
    storeCv: async () => {
      storageWrites += 1
    },
    processApplicationEmails: async () => {
      smtpAttempts += 1
      return {
        publicSuccess: true,
        emailsAttempted: true,
        internalAttempted: true,
        candidateAttempted: true,
        internalStatus: 'SENT',
        candidateStatus: 'SENT',
      }
    },
    logger: { error: () => undefined },
  })

  return {
    handler,
    getCounts: () => ({
      siteverifyCalls: turnstile.getSiteverifyCalls(),
      dbCreates,
      storageWrites,
      smtpAttempts,
    }),
  }
}

async function main() {
  Object.assign(process.env, readEnvFile('.env'))

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for recruitment ETAP 4 tests')

  const prisma = new PrismaClient({ datasources: { db: { url: formsUrl } } })
  const storageRoot = await mkdtemp(path.join(os.tmpdir(), 'profitia-recruitment-etap4-'))
  const env = {
    ...process.env,
    RECRUITMENT_CV_STORAGE_PATH: storageRoot,
    RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl',
    MAILBOX_LOGIN: process.env.MAILBOX_LOGIN ?? 'kontakt@profitia.pl',
  }
  const cleanupPrefix = 'recruitment-etap4-'
  const stamp = Date.now()
  const antiAbuseNow = 10_000
  const sharedTurnstileEnv: NodeJS.ProcessEnv = {
    ...env,
    TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
    TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,127.0.0.1,localhost',
  }

  try {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })

    await test('shared verifier accepts only the recruitment action and rejects contact/newsletter actions', async () => {
      const wrongContact = await verifyTurnstileToken('token', sharedTurnstileEnv, async () => new Response(JSON.stringify({ success: true, hostname: 'profitia.pl', action: 'contact_form' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }), RECRUITMENT_TURNSTILE_ACTION)
      const wrongNewsletter = await verifyTurnstileToken('token', sharedTurnstileEnv, async () => new Response(JSON.stringify({ success: true, hostname: 'profitia.pl', action: 'newsletter_form' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }), RECRUITMENT_TURNSTILE_ACTION)
      const correct = await verifyTurnstileToken('token', sharedTurnstileEnv, async () => new Response(JSON.stringify({ success: true, hostname: 'profitia.pl', action: RECRUITMENT_TURNSTILE_ACTION }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }), RECRUITMENT_TURNSTILE_ACTION)

      assert.equal(wrongContact.ok, false)
      assert.equal(wrongNewsletter.ok, false)
      assert.equal(correct.ok, true)
    })

    await test('honeypot rejects before siteverify and all side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}honeypot-${stamp}@example.com`,
        website: 'https://spam.example',
      }, createPdfFile()))
      const body = await response.json()
      assert.equal(response.status, 403)
      assert.equal(body.errorCode, 'BOT_VERIFICATION_FAILED')
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('too-fast submit rejects before siteverify and all side effects', async () => {
      const harness = createSideEffectHarness({ nowMs: 10_000 })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}too-fast-${stamp}@example.com`,
        formStartedAt: '9500',
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('missing timing rejects before siteverify and all side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...(() => {
          const { formStartedAt, ...rest } = buildBaseFields(antiAbuseNow)
          return rest
        })(),
        email: `${cleanupPrefix}missing-timing-${stamp}@example.com`,
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('future timestamp rejects before siteverify and all side effects', async () => {
      const harness = createSideEffectHarness({ nowMs: 10_000 })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}future-${stamp}@example.com`,
        formStartedAt: '45000',
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('missing turnstile token returns BOT_VERIFICATION_REQUIRED with zero fetch and zero side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...(() => {
          const { turnstileToken, ...rest } = buildBaseFields(antiAbuseNow)
          return rest
        })(),
        email: `${cleanupPrefix}missing-token-${stamp}@example.com`,
      }, createPdfFile()))
      const body = await response.json()
      assert.equal(response.status, 403)
      assert.equal(body.errorCode, 'BOT_VERIFICATION_REQUIRED')
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('turnstile failure rejects with zero persistence side effects', async () => {
      const harness = createSideEffectHarness({ turnstile: makeTurnstileVerifier({ mode: 'failed' }) })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}turnstile-failed-${stamp}@example.com`,
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('wrong contact action rejects with zero persistence side effects', async () => {
      const harness = createSideEffectHarness({ turnstile: makeTurnstileVerifier({ action: 'contact_form' }) })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}wrong-contact-action-${stamp}@example.com`,
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('wrong newsletter action rejects with zero persistence side effects', async () => {
      const harness = createSideEffectHarness({ turnstile: makeTurnstileVerifier({ action: 'newsletter_form' }) })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}wrong-newsletter-action-${stamp}@example.com`,
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('hostname mismatch rejects with zero persistence side effects', async () => {
      const harness = createSideEffectHarness({ turnstile: makeTurnstileVerifier({ hostname: 'evil.example' }) })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}hostname-mismatch-${stamp}@example.com`,
      }, createPdfFile()))
      assert.equal(response.status, 403)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('turnstile unavailable returns 503 with zero persistence side effects', async () => {
      const harness = createSideEffectHarness({ turnstile: makeTurnstileVerifier({ mode: 'unavailable' }) })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}turnstile-unavailable-${stamp}@example.com`,
      }, createPdfFile()))
      const body = await response.json()
      assert.equal(response.status, 503)
      assert.equal(body.errorCode, 'BOT_VERIFICATION_UNAVAILABLE')
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('rate limit returns 429 with retry-after before turnstile and side effects', async () => {
      const harness = createSideEffectHarness({ rateLimitResult: { ok: false, retryAfterSeconds: 60 } })
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}rate-limited-${stamp}@example.com`,
      }, createPdfFile()))
      const body = await response.json()
      assert.equal(response.status, 429)
      assert.equal(response.headers.get('Retry-After'), '60')
      assert.equal(body.errorCode, 'RATE_LIMITED')
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('recruitment email rate limit normalizes case variants', () => {
      const baseEmail = `case-bucket-${stamp}@example.com`
      const config = getRecruitmentAbuseConfig({
        ...process.env,
        RECRUITMENT_RATE_LIMIT_MAX_PER_EMAIL: '2',
        RECRUITMENT_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
        RECRUITMENT_RATE_LIMIT_MAX_PER_IP: '100',
        RECRUITMENT_RATE_LIMIT_WINDOW_MS: '3600000',
      })

      const first = rateLimitRecruitmentSubmission({ config, clientIp: null, email: baseEmail })
      const second = rateLimitRecruitmentSubmission({ config, clientIp: null, email: baseEmail.toUpperCase() })
      const third = rateLimitRecruitmentSubmission({ config, clientIp: null, email: baseEmail })

      assert.equal(first.ok, true)
      assert.equal(second.ok, true)
      assert.equal(third.ok, false)
    })

    await test('recruitment ip and email buckets are independent and isolated from contact/newsletter', () => {
      const uniqueIp = `198.51.100.${(stamp % 100) + 1}`
      const uniqueEmail = `recruitment-bucket-${stamp}@example.com`

      const recruitmentConfig = getRecruitmentAbuseConfig({
        ...process.env,
        RECRUITMENT_RATE_LIMIT_MAX_PER_IP: '1',
        RECRUITMENT_RATE_LIMIT_WINDOW_MS: '3600000',
        RECRUITMENT_RATE_LIMIT_MAX_PER_EMAIL: '1',
        RECRUITMENT_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
      })
      const contactConfig = getContactAbuseConfig({
        ...process.env,
        CONTACT_RATE_LIMIT_MAX_PER_IP: '1',
        CONTACT_RATE_LIMIT_WINDOW_MS: '3600000',
        CONTACT_RATE_LIMIT_MAX_PER_EMAIL: '1',
        CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
      })
      const newsletterConfig = getNewsletterAbuseConfig({
        ...process.env,
        NEWSLETTER_RATE_LIMIT_MAX_PER_IP: '1',
        NEWSLETTER_RATE_LIMIT_WINDOW_MS: '3600000',
        NEWSLETTER_RATE_LIMIT_MAX_PER_EMAIL: '1',
        NEWSLETTER_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
      })

      assert.equal(rateLimitRecruitmentSubmission({ config: recruitmentConfig, clientIp: uniqueIp, email: uniqueEmail }).ok, true)
      assert.equal(rateLimitRecruitmentSubmission({ config: recruitmentConfig, clientIp: uniqueIp, email: `other-${uniqueEmail}` }).ok, false)
      assert.equal(rateLimitRecruitmentSubmission({ config: recruitmentConfig, clientIp: `203.0.113.${(stamp % 100) + 1}`, email: uniqueEmail }).ok, false)

      assert.equal(rateLimitContactSubmission({ config: contactConfig, clientIp: uniqueIp, email: uniqueEmail }).ok, true)
      assert.equal(rateLimitNewsletterSubmission({ config: newsletterConfig, clientIp: uniqueIp, email: uniqueEmail }).ok, true)
    })

    await test('oversized multipart request rejects before parsing side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}oversized-request-${stamp}@example.com`,
      }, createPdfFile(), {
        headers: {
          'content-length': String(RECRUITMENT_REQUEST_BODY_MAX_BYTES + 1),
        },
      }))
      assert.equal(response.status, 413)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('actual CV over 10 MB is rejected after anti-abuse without persistence side effects', async () => {
      const harness = createSideEffectHarness()
      const hugeBytes = Buffer.concat([createPdfBytes(), Buffer.alloc(10 * 1024 * 1024)])
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}oversized-cv-${stamp}@example.com`,
      }, createPdfFile('huge.pdf', hugeBytes)))
      assert.equal(response.status, 413)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('unknown transport field is rejected with zero side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}unknown-field-${stamp}@example.com`,
        admin: 'true',
      } as Record<string, string>, createPdfFile()))
      assert.equal(response.status, 422)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 0,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('invalid CV after valid anti-abuse is rejected with zero persistence side effects', async () => {
      const harness = createSideEffectHarness()
      const response = await harness.handler(buildMultipartRequest({
        ...buildBaseFields(antiAbuseNow),
        email: `${cleanupPrefix}invalid-cv-${stamp}@example.com`,
      }, createPdfFile('bad.pdf', Buffer.from('not-a-pdf'))))
      assert.equal(response.status, 422)
      assert.deepEqual(harness.getCounts(), {
        siteverifyCalls: 1,
        dbCreates: 0,
        storageWrites: 0,
        smtpAttempts: 0,
      })
    })

    await test('valid PL flow persists, stores CV, sends both stubbed emails, and does not persist security transport fields', async () => {
      const emailCalls: HomeplSmtpEmailInput[] = []
      const handler = createCareerApplyPostHandler({
        env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
        verifyTurnstile: async () => ({ ok: true }),
        processApplicationEmails: (formsPrisma, applicationId, options) =>
          processJobApplicationEmails(formsPrisma, applicationId, {
            ...options,
            env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
            sendEmail: makeSuccessStub(emailCalls),
          }),
      })

      const email = `${cleanupPrefix}pl-valid-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({
        ...buildBaseFields(stamp),
        email,
      }, createPdfFile('candidate-pl.pdf')))
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { success: true })

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.locale, 'pl')
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'SENT')
      assert.equal(row.candidateEmailStatus, 'SENT')
      assert.equal('website' in (row as Record<string, unknown>), false)
      assert.equal('formStartedAt' in (row as Record<string, unknown>), false)
      assert.equal('turnstileToken' in (row as Record<string, unknown>), false)
      assert.equal(emailCalls.length, 2)
      assert.equal(String(emailCalls[0]?.to).trim().toLowerCase(), 'monika.osiecka@profitia.pl')
      assert.equal(emailCalls[0]?.attachments?.length, 1)
      assert.equal(emailCalls[1]?.attachments, undefined)
      assert.match(emailCalls[1]?.subject ?? '', /Dziękujemy za przesłanie aplikacji do Profitia/)
    })

    await test('valid EN flow persists, stores CV, keeps recruiter mail Polish, and candidate mail English', async () => {
      const emailCalls: HomeplSmtpEmailInput[] = []
      const handler = createCareerApplyPostHandler({
        env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
        verifyTurnstile: async () => ({ ok: true }),
        processApplicationEmails: (formsPrisma, applicationId, options) =>
          processJobApplicationEmails(formsPrisma, applicationId, {
            ...options,
            env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
            sendEmail: makeSuccessStub(emailCalls),
          }),
      })

      const email = `${cleanupPrefix}en-valid-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({
        ...buildBaseFields(stamp),
        roleSlug: 'procurement-consultant',
        email,
        locale: 'en',
        sourcePage: '/en/career/apply',
        weeklyAvailability: undefined,
        financialExpectations: '15000 PLN',
        motivation: 'This is the valid English ETAP 4 flow.',
      }, createPdfFile('candidate-en.pdf')))
      assert.equal(response.status, 200)

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.locale, 'en')
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'SENT')
      assert.equal(row.candidateEmailStatus, 'SENT')
      assert.equal(emailCalls.length, 2)
      assert.equal(emailCalls[0]?.subject, 'Nowa aplikacja na: Konsultant Zakupowy')
      assert.equal(emailCalls[1]?.subject, 'Thank you for applying to Profitia')
    })

    await test('SMTP failure regression preserves application, STORED CV, recruiter FAILED, candidate SENT, and public success', async () => {
      const emailCalls: HomeplSmtpEmailInput[] = []
      const handler = createCareerApplyPostHandler({
        env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
        verifyTurnstile: async () => ({ ok: true }),
        processApplicationEmails: (formsPrisma, applicationId, options) =>
          processJobApplicationEmails(formsPrisma, applicationId, {
            ...options,
            env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot, RECRUITMENT_NOTIFICATION_TO: 'monika.osiecka@profitia.pl' },
            sendEmail: makeSelectiveFailureStub(emailCalls, (input) => Boolean(input.attachments?.length)),
          }),
      })

      const email = `${cleanupPrefix}smtp-failure-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({
        ...buildBaseFields(stamp),
        email,
      }, createPdfFile('candidate-fail.pdf')))
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { success: true })

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.internalEmailStatus, 'FAILED')
      assert.equal(row.candidateEmailStatus, 'SENT')
      assert.equal(emailCalls.length, 2)
    })

    await test('storage failure regression returns 503, marks FAILED, and sends no SMTP', async () => {
      let smtpCalls = 0
      const handler = createCareerApplyPostHandler({
        env: { ...env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        storeCv: async () => {
          throw new Error('disk unavailable')
        },
        processApplicationEmails: async () => {
          smtpCalls += 1
          return {
            publicSuccess: true,
            emailsAttempted: true,
            internalAttempted: true,
            candidateAttempted: true,
            internalStatus: 'SENT',
            candidateStatus: 'SENT',
          }
        },
        logger: { error: () => undefined },
      })

      const email = `${cleanupPrefix}storage-failure-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({
        ...buildBaseFields(stamp),
        email,
      }, createPdfFile('candidate-storage-fail.pdf')))
      assert.equal(response.status, 503)
      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvStorageStatus, 'FAILED')
      assert.equal(smtpCalls, 0)
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
