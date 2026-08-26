import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, readdir, rm } from 'node:fs/promises'

import { NextRequest } from 'next/server'

import { PrismaClient } from '@/prisma/generated/forms-client'
import { createCareerApplyPostHandler } from '@/lib/recruitment/route-handler'
import {
  JOB_POSITION_LABELS,
  RECRUITMENT_REQUEST_BODY_MAX_BYTES,
} from '@/lib/recruitment/contract'
import {
  RECRUITMENT_CONSENT_COPY,
  RECRUITMENT_CONSENT_VERSION,
} from '@/lib/recruitment/consent'

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

function createPdfFile(name = 'candidate-cv.pdf') {
  return new File([createPdfBytes()], name, { type: 'application/pdf' })
}

function buildMultipartRequest(
  body: Record<string, string | undefined>,
  file: File,
  init?: { headers?: HeadersInit }
) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      formData.append(key, value)
    }
  }
  formData.append('cv', file)

  return new NextRequest('https://profitia.pl/api/career/apply', {
    method: 'POST',
    headers: init?.headers,
    body: formData,
  })
}

function buildValidSecurityFields(now = Date.now()) {
  return {
    website: '',
    formStartedAt: String(now - 5_000),
    turnstileToken: 'recruitment-etap1-turnstile-token',
  }
}

async function main() {
  Object.assign(process.env, readEnvFile('.env'))

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for recruitment ETAP 1 tests')

  const storageRoot = await mkdtemp(path.join(os.tmpdir(), 'profitia-recruitment-etap1-'))
  process.env.RECRUITMENT_CV_STORAGE_PATH = storageRoot

  const prisma = new PrismaClient({
    datasources: {
      db: { url: formsUrl },
    },
  })
  const careerApplyPost = createCareerApplyPostHandler({
    env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
    verifyTurnstile: async () => ({ ok: true }),
  })

  const stamp = Date.now()
  const cleanupPrefix = 'recruitment-etap1-'
  const jbaEmail = `${cleanupPrefix}jba-${stamp}@example.com`
  const pcEmail = `${cleanupPrefix}pc-${stamp}@example.com`
  const duplicateEmail = `${cleanupPrefix}dup-${stamp}@example.com`
  const enEmail = `${cleanupPrefix}en-${stamp}@example.com`

  const beforeContactCount = await prisma.contactSubmission.count()
  const beforeNewsletterCount = await prisma.newsletterSubscription.count()

  try {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })

    const basePayload = {
      roleSlug: 'junior-business-analyst',
      fullName: 'Jan Kowalski',
      email: 'Candidate.Test@Example.COM',
      phone: '+48 500 000 000',
      availableFrom: 'od 01.09.2026',
      weeklyAvailability: '30-40h',
      hybridAccepted: 'tak',
      businessTravel: 'tak',
      excelLevel: 'zaawansowany',
      englishLevel: 'biegly',
      financialExpectations: '50–60 PLN/h brutto',
      motivation: 'Chcę rozwijać się w analizie zakupowej i pracy projektowej.',
      consentCurrent: 'true',
      consentFuture: 'false',
      locale: 'pl',
      sourcePage: '/career/apply',
      ...buildValidSecurityFields(stamp),
    } satisfies Record<string, string>

    await test('route rejects unsupported media type', async () => {
      const response = await careerApplyPost(new NextRequest('https://profitia.pl/api/career/apply', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(basePayload),
      }))
      assert.equal(response.status, 415)
    })

    await test('route rejects unknown fields and client-owned legal evidence', async () => {
      const beforeCount = await prisma.jobApplication.count({ where: { email: jbaEmail } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email: jbaEmail,
        admin: 'true',
        currentRecruitmentConsentText: 'attacker text',
        applicationStatus: 'HIRED',
        cvStorageKey: '/var/data/recruitment-cv/evil.pdf',
      } as Record<string, string>, createPdfFile()))
      const body = await response.json()
      const afterCount = await prisma.jobApplication.count({ where: { email: jbaEmail } })

      assert.equal(response.status, 422)
      assert.equal(body.errorCode, 'VALIDATION_ERROR')
      assert.equal(afterCount, beforeCount)
    })

    await test('route returns 503 when forms DB config is unavailable', async () => {
      const handler = createCareerApplyPostHandler({
        env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        getFormsClient: () => {
          throw new Error('Missing forms database connection string. Set DATABASE_FORMS_URL or legacy DATABASE_CONTACT_FORM_URL.')
        },
      })
      const response = await handler(buildMultipartRequest({ ...basePayload, email: `${cleanupPrefix}unavailable-${stamp}@example.com` }, createPdfFile()))
      assert.equal(response.status, 503)
    })

    await test('route returns controlled 500 for unexpected DB failure', async () => {
      const handler = createCareerApplyPostHandler({
        env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        getFormsClient: () => ({
          jobApplication: {
            create: async () => {
              throw new Error('database write failed')
            },
          },
        }) as unknown as PrismaClient,
      })
      const response = await handler(buildMultipartRequest({ ...basePayload, email: `${cleanupPrefix}server-error-${stamp}@example.com` }, createPdfFile()))
      const body = await response.json()
      assert.equal(response.status, 500)
      assert.equal(body.errorCode, 'SERVER_ERROR')
    })

    await test('valid JBA application persists structured row with exact PL consent evidence', async () => {
      const response = await careerApplyPost(buildMultipartRequest({ ...basePayload, email: jbaEmail }, createPdfFile()))
      const body = await response.json()

      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })

      const rows = await prisma.jobApplication.findMany({ where: { email: jbaEmail } })
      assert.equal(rows.length, 1)
      const row = rows[0]
      assert.ok(row)
      assert.equal(row.position, 'JUNIOR_BUSINESS_ANALYST')
      assert.equal(row.weeklyAvailability, 'HOURS_30_40')
      assert.equal(row.hybridAccepted, true)
      assert.equal(row.businessTravelAccepted, true)
      assert.equal(row.excelLevel, 'ADVANCED')
      assert.equal(row.englishLevel, 'FLUENT')
      assert.equal(row.fullName, 'Jan Kowalski')
      assert.equal(row.email, jbaEmail)
      assert.equal(row.currentRecruitmentConsentText, RECRUITMENT_CONSENT_COPY.pl.current)
      assert.equal(row.currentRecruitmentConsentVersion, RECRUITMENT_CONSENT_VERSION)
      assert.equal(row.futureRecruitmentConsent, false)
      assert.equal(row.futureRecruitmentConsentText, null)
      assert.equal(row.applicationStatus, 'RECEIVED')
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.equal(row.cvMimeType, 'application/pdf')
      assert.ok(row.cvStorageKey)
      assert.ok(row.cvSha256)
      const storedFiles = await readdir(path.join(storageRoot, row.cvStorageKey!.split('/').slice(0, 2).join('/')))
      assert.equal(storedFiles.length, 1)
    })

    await test('valid procurement consultant application persists structured row with weeklyAvailability null', async () => {
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        roleSlug: 'procurement-consultant',
        fullName: 'Anna Nowak',
        email: pcEmail,
        availableFrom: 'od zaraz',
        weeklyAvailability: undefined,
        hybridAccepted: 'nie',
        businessTravel: 'tak',
        excelLevel: 'sredniozaawansowany',
        englishLevel: 'zaawansowany',
        financialExpectations: '8 000 – 10 000 PLN brutto',
        motivation: 'Mam doświadczenie w analizie danych i projektach zakupowych.',
        consentFuture: 'true',
        locale: 'en',
        sourcePage: '/en/career/apply',
      }, createPdfFile('consultant.pdf')))

      assert.equal(response.status, 200)

      const rows = await prisma.jobApplication.findMany({ where: { email: pcEmail } })
      assert.equal(rows.length, 1)
      const row = rows[0]
      assert.ok(row)
      assert.equal(row.position, 'PROCUREMENT_CONSULTANT')
      assert.equal(row.weeklyAvailability, null)
      assert.equal(row.futureRecruitmentConsentText, RECRUITMENT_CONSENT_COPY.en.future)
      assert.equal(row.locale, 'en')
    })

    await test('junior role rejects missing weeklyAvailability with no DB row', async () => {
      const email = `${cleanupPrefix}missing-weekly-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email,
        weeklyAvailability: undefined,
      }, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email } })

      assert.equal(response.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('procurement role rejects unexpected weeklyAvailability with no DB row', async () => {
      const email = `${cleanupPrefix}unexpected-weekly-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        roleSlug: 'procurement-consultant',
        email,
        weeklyAvailability: '20-30h',
      }, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email } })

      assert.equal(response.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('current consent false is rejected with no DB row', async () => {
      const email = `${cleanupPrefix}consent-false-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email,
        consentCurrent: 'false',
      }, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email } })

      assert.equal(response.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('mixed-case email is normalized and duplicates are allowed across separate applications', async () => {
      const firstResponse = await careerApplyPost(buildMultipartRequest({ ...basePayload, email: duplicateEmail }, createPdfFile('CV.pdf')))
      const secondResponse = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        roleSlug: 'procurement-consultant',
        email: duplicateEmail.toUpperCase(),
        availableFrom: 'po okresie wypowiedzenia',
        weeklyAvailability: undefined,
        hybridAccepted: 'nie',
        businessTravel: 'nie',
        excelLevel: 'podstawowy',
        englishLevel: 'zaawansowany',
        motivation: 'To jest druga odrębna aplikacja w tym samym etapie testowym.',
        consentFuture: 'true',
        locale: 'en',
        sourcePage: '/en/career/apply',
      }, createPdfFile('CV.pdf')))

      assert.equal(firstResponse.status, 200)
      assert.equal(secondResponse.status, 200)

      const rows = await prisma.jobApplication.findMany({ where: { email: duplicateEmail }, orderBy: { submittedAt: 'asc' } })
      assert.equal(rows.length, 2)
      assert.equal(rows[0]?.position, 'JUNIOR_BUSINESS_ANALYST')
      assert.equal(rows[1]?.position, 'PROCUREMENT_CONSULTANT')
      assert.notEqual(rows[0]?.cvStorageKey, rows[1]?.cvStorageKey)
    })

    await test('invalid locale is rejected with no DB row', async () => {
      const email = `${cleanupPrefix}bad-locale-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email,
        locale: 'de',
      } as Record<string, string>, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email } })

      assert.equal(response.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('role header injection is rejected', async () => {
      const email = `${cleanupPrefix}role-injection-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email } })
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email,
        roleSlug: '\r\nBCC: attacker@example.com',
      } as Record<string, string>, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email } })

      assert.equal(response.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('motivation length limit is enforced', async () => {
      const email = `${cleanupPrefix}motivation-limit-${stamp}@example.com`
      const okResponse = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email,
        motivation: 'a'.repeat(2000),
      }, createPdfFile()))
      assert.equal(okResponse.status, 200)

      const overflowEmail = `${cleanupPrefix}motivation-overflow-${stamp}@example.com`
      const beforeCount = await prisma.jobApplication.count({ where: { email: overflowEmail } })
      const overflowResponse = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email: overflowEmail,
        motivation: 'a'.repeat(2001),
      }, createPdfFile()))
      const afterCount = await prisma.jobApplication.count({ where: { email: overflowEmail } })

      assert.equal(overflowResponse.status, 422)
      assert.equal(afterCount, beforeCount)
    })

    await test('future consent true stores exact EN evidence', async () => {
      const response = await careerApplyPost(buildMultipartRequest({
        ...basePayload,
        email: enEmail,
        locale: 'en',
        sourcePage: '/en/career/apply',
        consentFuture: 'true',
      }, createPdfFile('candidate-en.pdf')))
      assert.equal(response.status, 200)

      const row = await prisma.jobApplication.findFirst({ where: { email: enEmail } })
      assert.ok(row)
      assert.equal(row.currentRecruitmentConsentText, RECRUITMENT_CONSENT_COPY.en.current)
      assert.equal(row.futureRecruitmentConsentText, RECRUITMENT_CONSENT_COPY.en.future)
      assert.equal(row.currentRecruitmentConsentVersion, RECRUITMENT_CONSENT_VERSION)
      assert.equal(row.futureRecruitmentConsentVersion, RECRUITMENT_CONSENT_VERSION)
    })

    await test('role labels are frozen server-side', () => {
      assert.equal(JOB_POSITION_LABELS.PROCUREMENT_CONSULTANT.pl, 'Konsultant Zakupowy')
      assert.equal(JOB_POSITION_LABELS.PROCUREMENT_CONSULTANT.en, 'Procurement Consultant')
      assert.equal(JOB_POSITION_LABELS.JUNIOR_BUSINESS_ANALYST.pl, 'Młodszy Analityk Biznesowy')
      assert.equal(JOB_POSITION_LABELS.JUNIOR_BUSINESS_ANALYST.en, 'Junior Business Analyst')
    })
  } finally {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })
    const remainingSynthetic = await prisma.jobApplication.count({ where: { email: { startsWith: cleanupPrefix } } })
    console.log(`INFO syntheticRecruitmentRowsRemaining=${remainingSynthetic}`)
    const afterContactCount = await prisma.contactSubmission.count()
    const afterNewsletterCount = await prisma.newsletterSubscription.count()
    console.log(`INFO contactRowsBefore=${beforeContactCount} contactRowsAfter=${afterContactCount}`)
    console.log(`INFO newsletterRowsBefore=${beforeNewsletterCount} newsletterRowsAfter=${afterNewsletterCount}`)

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