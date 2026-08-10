import assert from 'node:assert/strict'
import fs from 'node:fs'

import { NextRequest } from 'next/server'

import { PrismaClient } from '@/prisma/generated/forms-client'
import { createNewsletterPostHandler } from '@/lib/forms/newsletter-route-handler'
import { processNewsletterSubscription } from '@/lib/forms/newsletter-subscription'
import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'
import type { MailchimpNewsletterSyncInput, MailchimpNewsletterSyncResult } from '@/lib/newsletter/mailchimp'

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

    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    env[key] = value
  }

  return env
}

function buildRequest(body: Record<string, unknown>) {
  return new NextRequest('https://profitia.pl/api/newsletter', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      website: '',
      formStartedAt: Date.now() - 5_000,
      turnstileToken: 'newsletter-etap3-turnstile-token',
      ...body,
    }),
  })
}

function makeSmtpSuccessStub(tracker: HomeplSmtpEmailInput[], messageId: string) {
  return async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    tracker.push(input)
    return {
      success: true,
      accepted: [String(input.to).trim().toLowerCase()],
      rejected: [],
      pending: [],
      messageId,
      timestamp: new Date().toISOString(),
    }
  }
}

function makeSmtpFailureStub(tracker: HomeplSmtpEmailInput[]) {
  return async (input: HomeplSmtpEmailInput): Promise<HomeplSmtpSendResult> => {
    tracker.push(input)
    return {
      success: false,
      kind: 'SMTP_CONNECTION_ERROR',
      code: 'ECONNREFUSED',
      message: 'SMTP connection failed.',
      timestamp: new Date().toISOString(),
    }
  }
}

function makeMailchimpSuccessStub(tracker: MailchimpNewsletterSyncInput[]) {
  return async (input: MailchimpNewsletterSyncInput): Promise<MailchimpNewsletterSyncResult> => {
    tracker.push(input)
    return {
      success: true,
      subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
      remoteStatus: 'subscribed',
      httpStatus: 200,
      timestamp: new Date().toISOString(),
    }
  }
}

function makeMailchimpFailureStub(
  tracker: MailchimpNewsletterSyncInput[],
  result: MailchimpNewsletterSyncResult
) {
  return async (input: MailchimpNewsletterSyncInput): Promise<MailchimpNewsletterSyncResult> => {
    tracker.push(input)
    return result
  }
}

async function main() {
  const fileEnv = readEnvFile('.env')
  Object.assign(process.env, fileEnv)

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for ETAP 3 tests')

  const prisma = new PrismaClient({ datasources: { db: { url: formsUrl } } })
  const createdEmails = new Set<string>()
  const stamp = Date.now()

  const successEmail = `newsletter-etap3-success-${stamp}@example.com`
  const mailchimpFailEmail = `newsletter-etap3-mailchimp-fail-${stamp}@example.com`
  const smtpFailEmail = `newsletter-etap3-smtp-fail-${stamp}@example.com`
  const bothFailEmail = `newsletter-etap3-both-fail-${stamp}@example.com`
  const duplicateEmail = `newsletter-etap3-dup-${stamp}@example.com`
  const caseEmail = `newsletter-etap3-case-${stamp}@example.com`
  const failedSyncDuplicateEmail = `newsletter-etap3-failed-sync-${stamp}@example.com`
  const mismatchEmail = `newsletter-etap3-mismatch-${stamp}@example.com`

  try {
    await test('full success persists ACTIVE + SENT + SYNCED with one SMTP and one Mailchimp attempt', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-success@test>'),
            syncMailchimp: makeMailchimpSuccessStub(mailchimpCalls),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({ formType: 'newsletter', email: successEmail, locale: 'pl', sourcePage: '/', consent: true }))
      const body = await response.json()
      createdEmails.add(successEmail)

      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: successEmail } })
      assert.ok(row)
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.confirmationEmailStatus, 'SENT')
      assert.equal(row.mailchimpSyncStatus, 'SYNCED')
      assert.ok(row.mailchimpSyncedAt)
      assert.ok(row.mailchimpSubscriberHash)
      assert.equal(row.mailchimpError, null)
      assert.equal(row.confirmedAt, null)
    })

    await test('Mailchimp failure leaves local ACTIVE and confirmation SENT', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-mailchimp-fail@test>'),
            syncMailchimp: makeMailchimpFailureStub(mailchimpCalls, {
              success: false,
              kind: 'MAILCHIMP_API_ERROR',
              code: 'MAILCHIMP_API_ERROR',
              message: 'Mailchimp API request failed.',
              subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
              httpStatus: 500,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({ formType: 'newsletter', email: mailchimpFailEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(mailchimpFailEmail)
      assert.equal(response.status, 200)
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: mailchimpFailEmail } })
      assert.ok(row)
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.confirmationEmailStatus, 'SENT')
      assert.equal(row.mailchimpSyncStatus, 'FAILED')
      assert.equal(row.mailchimpSyncedAt, null)
      assert.equal(row.mailchimpError, 'MAILCHIMP_API_ERROR: 500')
    })

    await test('SMTP failure still allows Mailchimp SYNCED', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpFailureStub(smtpCalls),
            syncMailchimp: makeMailchimpSuccessStub(mailchimpCalls),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({ formType: 'newsletter', email: smtpFailEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(smtpFailEmail)
      assert.equal(response.status, 200)
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: smtpFailEmail } })
      assert.ok(row)
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.confirmationEmailStatus, 'FAILED')
      assert.equal(row.mailchimpSyncStatus, 'SYNCED')
    })

    await test('both integrations can fail independently while API stays neutral', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpFailureStub(smtpCalls),
            syncMailchimp: makeMailchimpFailureStub(mailchimpCalls, {
              success: false,
              kind: 'MAILCHIMP_TIMEOUT',
              code: 'MAILCHIMP_TIMEOUT',
              message: 'Mailchimp request timed out.',
              subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({ formType: 'newsletter', email: bothFailEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(bothFailEmail)
      const body = await response.json()
      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: bothFailEmail } })
      assert.ok(row)
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.confirmationEmailStatus, 'FAILED')
      assert.equal(row.mailchimpSyncStatus, 'FAILED')
    })

    await test('active duplicate suppresses second SMTP and Mailchimp attempt', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-dup@test>'),
            syncMailchimp: makeMailchimpSuccessStub(mailchimpCalls),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const first = await handler(buildRequest({ formType: 'newsletter', email: duplicateEmail, locale: 'pl', sourcePage: '/', consent: true }))
      const second = await handler(buildRequest({ formType: 'newsletter', email: duplicateEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(duplicateEmail)

      assert.equal((await prisma.newsletterSubscription.count({ where: { email: duplicateEmail } })), 1)
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)
      assert.deepEqual(await first.json(), await second.json())
    })

    await test('case-variant duplicate normalizes to one row and one external attempt set', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-case@test>'),
            syncMailchimp: makeMailchimpSuccessStub(mailchimpCalls),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      await handler(buildRequest({ formType: 'newsletter', email: caseEmail, locale: 'pl', sourcePage: '/', consent: true }))
      await handler(buildRequest({ formType: 'newsletter', email: caseEmail.toUpperCase(), locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(caseEmail)

      assert.equal((await prisma.newsletterSubscription.count({ where: { email: caseEmail } })), 1)
      assert.equal(smtpCalls.length, 1)
      assert.equal(mailchimpCalls.length, 1)
    })

    await test('failed Mailchimp sync duplicate does not trigger uncontrolled retry', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-failed-sync@test>'),
            syncMailchimp: makeMailchimpFailureStub(mailchimpCalls, {
              success: false,
              kind: 'MAILCHIMP_API_ERROR',
              code: 'MAILCHIMP_API_ERROR',
              message: 'Mailchimp API request failed.',
              subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
              httpStatus: 500,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      await handler(buildRequest({ formType: 'newsletter', email: failedSyncDuplicateEmail, locale: 'pl', sourcePage: '/', consent: true }))
      await handler(buildRequest({ formType: 'newsletter', email: failedSyncDuplicateEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(failedSyncDuplicateEmail)

      assert.equal(mailchimpCalls.length, 1)
      assert.equal(smtpCalls.length, 1)
    })

    await test('remote unsubscribed simulation persists failed sync without forcing resubscribe', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const mailchimpCalls: MailchimpNewsletterSyncInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSmtpSuccessStub(smtpCalls, '<newsletter-etap3-mismatch@test>'),
            syncMailchimp: makeMailchimpFailureStub(mailchimpCalls, {
              success: false,
              kind: 'MAILCHIMP_STATUS_MISMATCH',
              code: 'MAILCHIMP_STATUS_MISMATCH',
              message: 'Mailchimp member status is not compatible with the local subscription state.',
              subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
              remoteStatus: 'unsubscribed',
              httpStatus: 200,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({ formType: 'newsletter', email: mismatchEmail, locale: 'pl', sourcePage: '/', consent: true }))
      createdEmails.add(mismatchEmail)
      assert.equal(response.status, 200)
      assert.equal(mailchimpCalls.length, 1)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: mismatchEmail } })
      assert.ok(row)
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.mailchimpSyncStatus, 'FAILED')
      assert.equal(row.mailchimpError, 'MAILCHIMP_STATUS_MISMATCH: unsubscribed')
    })
  } finally {
    if (createdEmails.size > 0) {
      await prisma.newsletterSubscription.deleteMany({ where: { email: { in: Array.from(createdEmails) } } })
    }

    const remaining = createdEmails.size > 0
      ? await prisma.newsletterSubscription.count({ where: { email: { in: Array.from(createdEmails) } } })
      : 0

    console.log(`CLEANUP_REMAINING_ETAP3_TEST_ROWS=${remaining}`)
    await prisma.$disconnect()
  }

  if (failures > 0) {
    process.exitCode = 1
  }
}

void main()