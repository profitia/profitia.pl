import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises'

import { NextRequest } from 'next/server'

import { PrismaClient } from '@/prisma/generated/forms-client'
import { createCareerApplyPostHandler } from '@/lib/recruitment/route-handler'

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

function createDocBytes() {
  return Buffer.concat([
    Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]),
    Buffer.from('DOC-CONTENT', 'utf8'),
  ])
}

function createDocxBytes() {
  const localHeader = Buffer.alloc(30)
  localHeader.writeUInt32LE(0x04034b50, 0)
  localHeader.writeUInt16LE(20, 4)
  localHeader.writeUInt16LE(0, 6)
  localHeader.writeUInt16LE(0, 8)
  localHeader.writeUInt16LE(0, 10)
  localHeader.writeUInt16LE(0, 12)
  localHeader.writeUInt32LE(0, 14)
  localHeader.writeUInt32LE(0, 18)
  localHeader.writeUInt32LE(0, 22)

  const contentTypesName = Buffer.from('[Content_Types].xml', 'utf8')
  const wordName = Buffer.from('word/document.xml', 'utf8')

  const localOne = Buffer.from(localHeader)
  localOne.writeUInt16LE(contentTypesName.length, 26)
  const localTwo = Buffer.from(localHeader)
  localTwo.writeUInt16LE(wordName.length, 26)

  const centralHeader = Buffer.alloc(46)
  centralHeader.writeUInt32LE(0x02014b50, 0)
  centralHeader.writeUInt16LE(20, 4)
  centralHeader.writeUInt16LE(20, 6)
  centralHeader.writeUInt16LE(0, 8)
  centralHeader.writeUInt16LE(0, 10)
  centralHeader.writeUInt16LE(0, 12)
  centralHeader.writeUInt16LE(0, 14)
  centralHeader.writeUInt32LE(0, 16)
  centralHeader.writeUInt32LE(0, 20)
  centralHeader.writeUInt32LE(0, 24)
  centralHeader.writeUInt16LE(0, 30)
  centralHeader.writeUInt16LE(0, 32)
  centralHeader.writeUInt16LE(0, 34)
  centralHeader.writeUInt16LE(0, 36)
  centralHeader.writeUInt16LE(0, 38)
  centralHeader.writeUInt32LE(0, 42)

  const offsetLocalTwo = localOne.length + contentTypesName.length

  const centralOne = Buffer.from(centralHeader)
  centralOne.writeUInt16LE(contentTypesName.length, 28)
  centralOne.writeUInt32LE(0, 42)
  const centralTwo = Buffer.from(centralHeader)
  centralTwo.writeUInt16LE(wordName.length, 28)
  centralTwo.writeUInt32LE(offsetLocalTwo, 42)

  const centralDirectory = Buffer.concat([
    centralOne,
    contentTypesName,
    centralTwo,
    wordName,
  ])

  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(0x06054b50, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(2, 8)
  eocd.writeUInt16LE(2, 10)
  eocd.writeUInt32LE(centralDirectory.length, 12)
  eocd.writeUInt32LE(offsetLocalTwo + localTwo.length + wordName.length, 16)
  eocd.writeUInt16LE(0, 20)

  return Buffer.concat([
    localOne,
    contentTypesName,
    localTwo,
    wordName,
    centralDirectory,
    eocd,
  ])
}

function buildMultipartRequest(fields: Record<string, string | undefined>, file: File | null, duplicateCv = false) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined) {
      formData.append(key, value)
    }
  }

  if (file) {
    formData.append('cv', file)
    if (duplicateCv) {
      formData.append('cv', file)
    }
  }

  return new NextRequest('https://profitia.pl/api/career/apply', {
    method: 'POST',
    body: formData,
  })
}

function buildValidSecurityFields(now = Date.now()) {
  return {
    website: '',
    formStartedAt: String(now - 5_000),
    turnstileToken: 'recruitment-etap2-turnstile-token',
  }
}

async function main() {
  Object.assign(process.env, readEnvFile('.env'))

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for recruitment ETAP 2 tests')

  const storageRoot = await mkdtemp(path.join(os.tmpdir(), 'profitia-recruitment-etap2-'))
  const prisma = new PrismaClient({ datasources: { db: { url: formsUrl } } })
  const handler = createCareerApplyPostHandler({
    env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
    verifyTurnstile: async () => ({ ok: true }),
  })

  const stamp = Date.now()
  const cleanupPrefix = 'recruitment-etap2-'

  const baseFields = {
    roleSlug: 'junior-business-analyst',
    fullName: 'Jan Kowalski',
    email: `${cleanupPrefix}${stamp}@example.com`,
    phone: '+48 500 000 000',
    availableFrom: 'od 01.09.2026',
    weeklyAvailability: '30-40h',
    hybridAccepted: 'tak',
    businessTravel: 'tak',
    excelLevel: 'zaawansowany',
    englishLevel: 'biegly',
    financialExpectations: '50-60 PLN/h brutto',
    motivation: 'Aplikuję z pełnym CV i świadomie przechodzę przez walidację pliku.',
    consentCurrent: 'true',
    consentFuture: 'false',
    locale: 'pl',
    sourcePage: '/career/apply',
    ...buildValidSecurityFields(stamp),
  }

  try {
    await prisma.jobApplication.deleteMany({ where: { email: { startsWith: cleanupPrefix } } })

    await test('accepts valid PDF and stores exact bytes on disk', async () => {
      const email = `${cleanupPrefix}pdf-${stamp}@example.com`
      const fileBytes = createPdfBytes()
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([fileBytes], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 200)

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvStorageStatus, 'STORED')
      assert.ok(row.cvStorageKey)

      const diskBytes = await readFile(path.join(storageRoot, row.cvStorageKey!))
      assert.deepEqual(diskBytes, fileBytes)
      const fileInfo = await stat(path.join(storageRoot, row.cvStorageKey!))
      assert.equal(fileInfo.mode & 0o777, 0o600)
    })

    await test('accepts valid DOC', async () => {
      const email = `${cleanupPrefix}doc-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createDocBytes()], 'candidate.doc', { type: 'application/msword' })))
      assert.equal(response.status, 200)
      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvMimeType, 'application/msword')
      assert.equal(row.cvStorageStatus, 'STORED')
    })

    await test('accepts valid DOCX', async () => {
      const email = `${cleanupPrefix}docx-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createDocxBytes()], 'candidate.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })))
      assert.equal(response.status, 200)
      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvMimeType, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    })

    await test('rejects oversize file', async () => {
      const email = `${cleanupPrefix}oversize-${stamp}@example.com`
      const bytes = Buffer.concat([createPdfBytes(), Buffer.alloc(10 * 1024 * 1024)])
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([bytes], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 413)
      const count = await prisma.jobApplication.count({ where: { email } })
      assert.equal(count, 0)
    })

    await test('rejects unsupported extension', async () => {
      const email = `${cleanupPrefix}txt-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([Buffer.from('hello')], 'candidate.txt', { type: 'text/plain' })))
      assert.equal(response.status, 422)
      const body = await response.json()
      assert.equal(body.errorCode, 'UNSUPPORTED_FILE_TYPE')
    })

    await test('rejects fake PDF signature', async () => {
      const email = `${cleanupPrefix}fake-pdf-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([Buffer.from('not-a-pdf')], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 422)
    })

    await test('rejects MIME mismatch', async () => {
      const email = `${cleanupPrefix}mime-mismatch-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'candidate.pdf', { type: 'application/msword' })))
      assert.equal(response.status, 422)
      const body = await response.json()
      assert.equal(body.errorCode, 'UNSUPPORTED_FILE_TYPE')
    })

    await test('rejects fake DOCX structure', async () => {
      const email = `${cleanupPrefix}fake-docx-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([Buffer.from('PK\x03\x04broken')], 'candidate.docx', {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })))
      assert.equal(response.status, 422)
    })

    await test('rejects HTML masquerading as PDF', async () => {
      const email = `${cleanupPrefix}html-mask-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([Buffer.from('<html></html>')], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 422)
    })

    await test('sanitizes traversal filename before persistence', async () => {
      const email = `${cleanupPrefix}traversal-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], '../../evil.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 200)
      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvOriginalFilename, 'evil.pdf')
      assert.ok(row.cvStorageKey)
      assert.equal(path.isAbsolute(row.cvStorageKey!), false)
    })

    await test('strips CRLF from original filename', async () => {
      const email = `${cleanupPrefix}crlf-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'candidate\r\n.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 200)
      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvOriginalFilename, 'candidate.pdf')
    })

    await test('duplicate filenames still get distinct storage keys', async () => {
      const emailOne = `${cleanupPrefix}same-name-1-${stamp}@example.com`
      const emailTwo = `${cleanupPrefix}same-name-2-${stamp}@example.com`
      const file = new File([createPdfBytes()], 'same-name.pdf', { type: 'application/pdf' })

      assert.equal((await handler(buildMultipartRequest({ ...baseFields, email: emailOne }, file))).status, 200)
      assert.equal((await handler(buildMultipartRequest({ ...baseFields, email: emailTwo }, file))).status, 200)

      const rows = await prisma.jobApplication.findMany({
        where: { email: { in: [emailOne, emailTwo] } },
        orderBy: { submittedAt: 'asc' },
      })
      assert.equal(rows.length, 2)
      assert.notEqual(rows[0]?.cvStorageKey, rows[1]?.cvStorageKey)
    })

    await test('duplicate emails are allowed as separate applications', async () => {
      const email = `${cleanupPrefix}duplicate-email-${stamp}@example.com`
      assert.equal((await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'one.pdf', { type: 'application/pdf' })))).status, 200)
      assert.equal((await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'two.pdf', { type: 'application/pdf' })))).status, 200)

      const count = await prisma.jobApplication.count({ where: { email } })
      assert.equal(count, 2)
    })

    await test('rejects duplicate cv fields', async () => {
      const email = `${cleanupPrefix}duplicate-cv-${stamp}@example.com`
      const response = await handler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'dup.pdf', { type: 'application/pdf' }), true))
      assert.equal(response.status, 422)
      const count = await prisma.jobApplication.count({ where: { email } })
      assert.equal(count, 0)
    })

    await test('returns 503 and marks row FAILED when disk write fails', async () => {
      const email = `${cleanupPrefix}disk-fail-${stamp}@example.com`
      const failingHandler = createCareerApplyPostHandler({
        env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        storeCv: async () => {
          throw new Error('disk offline')
        },
      })

      const response = await failingHandler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 503)

      const row = await prisma.jobApplication.findFirstOrThrow({ where: { email } })
      assert.equal(row.cvStorageStatus, 'FAILED')
      assert.ok(row.cvStorageKey)
      await assert.rejects(() => stat(path.join(storageRoot, row.cvStorageKey!)))
    })

    await test('DB create failure leaves disk untouched', async () => {
      const email = `${cleanupPrefix}db-create-fail-${stamp}@example.com`
      const before = await readdir(storageRoot)
      const failingHandler = createCareerApplyPostHandler({
        env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        getFormsClient: () => ({
          jobApplication: {
            create: async () => {
              throw new Error('db create failed')
            },
          },
        }) as unknown as PrismaClient,
      })

      const response = await failingHandler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 500)
      const after = await readdir(storageRoot)
      assert.deepEqual(after, before)
    })

    await test('DB finalization failure cleans orphaned file and marks row FAILED', async () => {
      const email = `${cleanupPrefix}finalize-fail-${stamp}@example.com`
      const statusUpdates: string[] = []
      let storedKey = ''

      const failingHandler = createCareerApplyPostHandler({
        env: { ...process.env, RECRUITMENT_CV_STORAGE_PATH: storageRoot },
        verifyTurnstile: async () => ({ ok: true }),
        getFormsClient: () => ({
          jobApplication: {
            create: async ({ data }: { data: { cvStorageKey: string } }) => {
              storedKey = data.cvStorageKey
              return { id: 'test-app-id' }
            },
            update: async ({ data }: { data: { cvStorageStatus: string } }) => {
              statusUpdates.push(data.cvStorageStatus)
              if (data.cvStorageStatus === 'STORED') {
                throw new Error('finalization failed')
              }
              return { id: 'test-app-id' }
            },
          },
        }) as unknown as PrismaClient,
      })

      const response = await failingHandler(buildMultipartRequest({ ...baseFields, email }, new File([createPdfBytes()], 'candidate.pdf', { type: 'application/pdf' })))
      assert.equal(response.status, 503)
      assert.deepEqual(statusUpdates, ['STORED', 'FAILED'])
      assert.equal(storedKey.length > 0, true)
      await assert.rejects(() => stat(path.join(storageRoot, storedKey)))
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