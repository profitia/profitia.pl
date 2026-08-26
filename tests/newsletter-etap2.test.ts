import assert from 'node:assert/strict'
import fs from 'node:fs'

import { NextRequest } from 'next/server'

import { PrismaClient } from '@/prisma/generated/forms-client'
import { createNewsletterPostHandler } from '@/lib/forms/newsletter-route-handler'
import { buildNewsletterConfirmationEmail } from '@/lib/forms/newsletter-confirmation'
import { processNewsletterSubscription } from '@/lib/forms/newsletter-subscription'
import type { HomeplSmtpEmailInput, HomeplSmtpSendResult } from '@/lib/email/homepl-smtp'

let failures = 0

function test(name: string, run: () => Promise<void> | void) {
  return Promise.resolve()
    .then(run)
    .then(() => {
      console.log(`PASS ${name}`)
    })
    .catch((error) => {
      failures += 1
      console.error(`FAIL ${name}`)
      console.error(error)
    })
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
      turnstileToken: 'newsletter-etap2-turnstile-token',
      ...body,
    }),
  })
}

function makeSuccessStub(tracker: HomeplSmtpEmailInput[], messageId: string) {
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

function makeFailureStub(tracker: HomeplSmtpEmailInput[]) {
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

async function main() {
  const fileEnv = readEnvFile('.env')
  Object.assign(process.env, fileEnv)

  const formsUrl = process.env.DATABASE_FORMS_URL || process.env.DATABASE_CONTACT_FORM_URL
  assert.ok(formsUrl, 'DATABASE_FORMS_URL or DATABASE_CONTACT_FORM_URL must be available for ETAP 2 tests')

  const prisma = new PrismaClient({
    datasources: {
      db: { url: formsUrl },
    },
  })

  const createdEmails = new Set<string>()
  const stamp = Date.now()

  const plEmail = `newsletter-etap2-pl-${stamp}@example.com`
  const enEmail = `newsletter-etap2-en-${stamp}@example.com`
  const duplicateEmail = `newsletter-etap2-dup-${stamp}@example.com`
  const caseVariantEmail = `newsletter-etap2-case-${stamp}@example.com`
  const failedEmail = `newsletter-etap2-fail-${stamp}@example.com`

  try {
    await test('builder returns exact PL and EN newsletter copy', () => {
      const plEmailMessage = buildNewsletterConfirmationEmail({ email: plEmail, locale: 'pl' }, process.env)
      const enEmailMessage = buildNewsletterConfirmationEmail({ email: enEmail, locale: 'en' }, process.env)

      assert.equal(plEmailMessage.subject, 'Dziękujemy za zapis do newslettera Profitia')
      assert.match(plEmailMessage.text ?? '', /dziękujemy za zapis do newslettera Profitia\./)
      assert.equal(plEmailMessage.replyTo, 'kontakt@profitia.pl')
      assert.equal(enEmailMessage.subject, 'Thank you for subscribing to the Profitia newsletter')
      assert.match(enEmailMessage.text ?? '', /You will now receive updates about our latest publications, events and news\./)
      assert.equal(enEmailMessage.replyTo, 'kontakt@profitia.pl')
    })

    await test('new PL subscription persists row and marks confirmation email as SENT', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSuccessStub(smtpCalls, '<newsletter-pl@test>'),
            syncMailchimp: async () => ({
              success: false,
              kind: 'MAILCHIMP_CONFIG_ERROR',
              code: 'MAILCHIMP_DISABLED_IN_ETAP2_TEST',
              message: 'Mailchimp is not exercised in ETAP 2 tests.',
              subscriberHash: null,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({
        formType: 'newsletter',
        email: plEmail,
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))

      const body = await response.json()
      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })
      assert.equal(smtpCalls.length, 1)
      assert.equal(smtpCalls[0]?.attachments, undefined)
      createdEmails.add(plEmail)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: plEmail } })
      assert.ok(row)
      assert.equal(row.locale, 'pl')
      assert.equal(row.sourcePage, '/')
      assert.equal(row.subscriptionStatus, 'ACTIVE')
      assert.equal(row.confirmationEmailStatus, 'SENT')
      assert.equal(row.confirmationEmailMessageId, '<newsletter-pl@test>')
      assert.ok(row.confirmationEmailSentAt)
      assert.equal(row.confirmationEmailError, null)
      assert.equal(row.confirmedAt, null)
    })

    await test('new EN subscription normalizes sourcePage and sends exact EN confirmation', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSuccessStub(smtpCalls, '<newsletter-en@test>'),
            syncMailchimp: async () => ({
              success: false,
              kind: 'MAILCHIMP_CONFIG_ERROR',
              code: 'MAILCHIMP_DISABLED_IN_ETAP2_TEST',
              message: 'Mailchimp is not exercised in ETAP 2 tests.',
              subscriberHash: null,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({
        formType: 'newsletter',
        email: enEmail,
        locale: 'en',
        sourcePage: 'https://profitia.pl/en?utm=test#footer-newsletter',
        consent: true,
      }))

      const body = await response.json()
      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })
      assert.equal(smtpCalls.length, 1)
      assert.equal(smtpCalls[0]?.attachments, undefined)
      assert.equal(smtpCalls[0]?.subject, 'Thank you for subscribing to the Profitia newsletter')
      assert.match(smtpCalls[0]?.text ?? '', /You will now receive updates about our latest publications, events and news\./)
      createdEmails.add(enEmail)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: enEmail } })
      assert.ok(row)
      assert.equal(row.locale, 'en')
      assert.equal(row.sourcePage, '/en')
      assert.equal(row.confirmationEmailStatus, 'SENT')
      assert.equal(row.confirmationEmailMessageId, '<newsletter-en@test>')
    })

    await test('active duplicate returns neutral success and does not send a second email', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSuccessStub(smtpCalls, '<newsletter-dup@test>'),
            syncMailchimp: async () => ({
              success: false,
              kind: 'MAILCHIMP_CONFIG_ERROR',
              code: 'MAILCHIMP_DISABLED_IN_ETAP2_TEST',
              message: 'Mailchimp is not exercised in ETAP 2 tests.',
              subscriberHash: null,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const firstResponse = await handler(buildRequest({
        formType: 'newsletter',
        email: duplicateEmail,
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))
      const secondResponse = await handler(buildRequest({
        formType: 'newsletter',
        email: duplicateEmail,
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))

      createdEmails.add(duplicateEmail)

      const firstBody = await firstResponse.json()
      const secondBody = await secondResponse.json()
      const rowCount = await prisma.newsletterSubscription.count({ where: { email: duplicateEmail } })

      assert.equal(firstResponse.status, 200)
      assert.equal(secondResponse.status, 200)
      assert.deepEqual(firstBody, { success: true })
      assert.deepEqual(secondBody, { success: true })
      assert.equal(rowCount, 1)
      assert.equal(smtpCalls.length, 1)
    })

    await test('case-variant duplicate reuses the same row and suppresses a second send', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeSuccessStub(smtpCalls, '<newsletter-case@test>'),
            syncMailchimp: async () => ({
              success: false,
              kind: 'MAILCHIMP_CONFIG_ERROR',
              code: 'MAILCHIMP_DISABLED_IN_ETAP2_TEST',
              message: 'Mailchimp is not exercised in ETAP 2 tests.',
              subscriberHash: null,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const firstResponse = await handler(buildRequest({
        formType: 'newsletter',
        email: caseVariantEmail,
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))
      const secondResponse = await handler(buildRequest({
        formType: 'newsletter',
        email: caseVariantEmail.toUpperCase(),
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))

      createdEmails.add(caseVariantEmail)

      const rowCount = await prisma.newsletterSubscription.count({ where: { email: caseVariantEmail } })
      assert.equal(firstResponse.status, 200)
      assert.equal(secondResponse.status, 200)
      assert.equal(rowCount, 1)
      assert.equal(smtpCalls.length, 1)
    })

    await test('SMTP failure still returns public success and persists FAILED tracking state', async () => {
      const smtpCalls: HomeplSmtpEmailInput[] = []
      const handler = createNewsletterPostHandler(
        (formsPrisma, data) =>
          processNewsletterSubscription(formsPrisma, data, {
            env: process.env,
            sendEmail: makeFailureStub(smtpCalls),
            syncMailchimp: async () => ({
              success: false,
              kind: 'MAILCHIMP_CONFIG_ERROR',
              code: 'MAILCHIMP_DISABLED_IN_ETAP2_TEST',
              message: 'Mailchimp is not exercised in ETAP 2 tests.',
              subscriberHash: null,
              timestamp: new Date().toISOString(),
            }),
          }),
        {
          verifyTurnstile: async () => ({ ok: true }),
        }
      )

      const response = await handler(buildRequest({
        formType: 'newsletter',
        email: failedEmail,
        locale: 'pl',
        sourcePage: '/',
        consent: true,
      }))

      const body = await response.json()
      assert.equal(response.status, 200)
      assert.deepEqual(body, { success: true })
      assert.equal(smtpCalls.length, 1)
      createdEmails.add(failedEmail)

      const row = await prisma.newsletterSubscription.findUnique({ where: { email: failedEmail } })
      assert.ok(row)
      assert.equal(row.confirmationEmailStatus, 'FAILED')
      assert.equal(row.confirmationEmailSentAt, null)
      assert.equal(row.confirmationEmailMessageId, null)
      assert.equal(row.confirmationEmailError, 'SMTP_CONNECTION_ERROR: ECONNREFUSED')
      assert.equal(row.confirmedAt, null)
    })

    await test('only the five synthetic ETAP 2 rows exist before cleanup', async () => {
      const count = await prisma.newsletterSubscription.count({
        where: {
          email: {
            in: Array.from(createdEmails),
          },
        },
      })

      assert.equal(count, 5)
    })
  } finally {
    if (createdEmails.size > 0) {
      await prisma.newsletterSubscription.deleteMany({
        where: {
          email: {
            in: Array.from(createdEmails),
          },
        },
      })
    }

    const remaining = createdEmails.size > 0
      ? await prisma.newsletterSubscription.count({
        where: {
          email: {
            in: Array.from(createdEmails),
          },
        },
      })
      : 0

    console.log(`CLEANUP_REMAINING_TEST_ROWS=${remaining}`)
    await prisma.$disconnect()
  }

  if (failures > 0) {
    process.exitCode = 1
  }
}

void main()