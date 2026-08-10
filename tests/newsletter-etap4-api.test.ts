import assert from 'node:assert/strict'
import fs from 'node:fs'

import { NextRequest } from 'next/server'

import { POST as contactPost } from '@/app/api/contact/route'
import { createNewsletterPostHandler } from '@/lib/forms/newsletter-route-handler'
import { getNewsletterAbuseConfig, rateLimitNewsletterSubmission } from '@/lib/security/contact-rate-limit'
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

function buildNewsletterRequest(body: Record<string, unknown>, init?: { headers?: HeadersInit; rawBody?: string }) {
  return new NextRequest('https://profitia.pl/api/newsletter', {
    method: 'POST',
    headers: init?.headers ?? {
      'content-type': 'application/json',
    },
    body: init?.rawBody ?? JSON.stringify({
      formType: 'newsletter',
      email: 'newsletter-etap4-api@example.com',
      locale: 'pl',
      sourcePage: '/',
      consent: true,
      website: '',
      formStartedAt: Date.now() - 5_000,
      turnstileToken: 'newsletter-etap4-turnstile-token',
      ...body,
    }),
  })
}

function buildContactRequest(body: Record<string, unknown>) {
  return new NextRequest('https://profitia.pl/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://profitia.pl',
    },
    body: JSON.stringify({
      formType: 'contact',
      locale: 'pl',
      sourcePage: '/',
      fullName: 'Newsletter Etap 4 Contact Check',
      email: 'newsletter-etap4-contact-check@example.com',
      company: 'Profitia',
      topic: 'general',
      message: 'This is a sufficiently long contact message.',
      privacyConsent: true,
      marketingConsent: false,
      website: '',
      formStartedAt: Date.now() - 5_000,
      ...body,
    }),
  })
}

async function main() {
  Object.assign(process.env, readEnvFile('.env'))

  await test('newsletter turnstile helper rejects missing token without siteverify fetch', async () => {
    let called = false
    const result = await verifyTurnstileToken(undefined, {
      ...process.env,
      TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,127.0.0.1,localhost',
      TURNSTILE_SECRET_KEY: 'test-secret',
    }, async () => {
      called = true
      return new Response()
    }, 'newsletter_form')
    assert.equal(result.ok, false)
    assert.equal(called, false)
  })

  await test('newsletter turnstile helper isolates newsletter action', async () => {
    const result = await verifyTurnstileToken('token', {
      ...process.env,
      TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,127.0.0.1,localhost',
      TURNSTILE_SECRET_KEY: 'test-secret',
    }, async () => new Response(JSON.stringify({
      success: true,
      hostname: 'profitia.pl',
      action: 'contact_form',
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }), 'newsletter_form')
    assert.equal(result.ok, false)
  })

  await test('newsletter honeypot rejects before turnstile and process subscription', async () => {
    let verifyCalls = 0
    let processCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      processCalls += 1
      return {
        publicSuccess: true,
        subscriptionCreated: true,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: null,
      }
    }, {
      verifyTurnstile: async () => {
        verifyCalls += 1
        return { ok: true }
      },
    })

    const response = await handler(buildNewsletterRequest({ website: 'spam' }))
    assert.equal(response.status, 403)
    assert.equal(verifyCalls, 0)
    assert.equal(processCalls, 0)
  })

  await test('newsletter timing rejects too-fast submit before turnstile', async () => {
    let verifyCalls = 0
    let processCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      processCalls += 1
      return {
        publicSuccess: true,
        subscriptionCreated: true,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: null,
      }
    }, {
      verifyTurnstile: async () => {
        verifyCalls += 1
        return { ok: true }
      },
      now: () => 10_000,
    })

    const response = await handler(buildNewsletterRequest({ formStartedAt: 9_900 }))
    assert.equal(response.status, 403)
    assert.equal(verifyCalls, 0)
    assert.equal(processCalls, 0)
  })

  await test('newsletter invalid timing type returns validation error', async () => {
    const handler = createNewsletterPostHandler(async () => {
      throw new Error('process should not run')
    })

    const response = await handler(buildNewsletterRequest({ formStartedAt: 'bad' }))
    const body = await response.json()
    assert.equal(response.status, 422)
    assert.equal(body.errorCode, 'VALIDATION_ERROR')
    assert.equal(body.fields.formStartedAt, 'Invalid security metadata.')
  })

  await test('newsletter missing timing is rejected without turnstile', async () => {
    let verifyCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      throw new Error('process should not run')
    }, {
      verifyTurnstile: async () => {
        verifyCalls += 1
        return { ok: true }
      },
    })

    const response = await handler(buildNewsletterRequest({}, {
      rawBody: JSON.stringify({
        formType: 'newsletter',
        email: 'newsletter-etap4-missing-timing@example.com',
        locale: 'pl',
        sourcePage: '/',
        consent: true,
        website: '',
        turnstileToken: 'newsletter-etap4-turnstile-token',
      }),
    }))
    assert.equal(response.status, 403)
    assert.equal(verifyCalls, 0)
  })

  await test('newsletter missing turnstile token returns BOT_VERIFICATION_REQUIRED', async () => {
    const handler = createNewsletterPostHandler(async () => {
      throw new Error('process should not run')
    }, {
      verifyTurnstile: async () => ({ ok: false, errorCode: 'BOT_VERIFICATION_REQUIRED' }),
    })

    const response = await handler(buildNewsletterRequest({ turnstileToken: '' }))
    const body = await response.json()
    assert.equal(response.status, 403)
    assert.equal(body.errorCode, 'BOT_VERIFICATION_REQUIRED')
  })

  await test('newsletter turnstile failure returns 403 with zero process side effects', async () => {
    let processCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      processCalls += 1
      return {
        publicSuccess: true,
        subscriptionCreated: true,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: null,
      }
    }, {
      verifyTurnstile: async () => ({ ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }),
    })

    const response = await handler(buildNewsletterRequest({}))
    assert.equal(response.status, 403)
    assert.equal(processCalls, 0)
  })

  await test('newsletter turnstile unavailable returns 503 with zero process side effects', async () => {
    let processCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      processCalls += 1
      return {
        publicSuccess: true,
        subscriptionCreated: true,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: null,
      }
    }, {
      verifyTurnstile: async () => ({ ok: false, errorCode: 'BOT_VERIFICATION_UNAVAILABLE' }),
    })

    const response = await handler(buildNewsletterRequest({}))
    assert.equal(response.status, 503)
    assert.equal(processCalls, 0)
  })

  await test('newsletter rate limit returns 429 with retry-after and zero turnstile/process side effects', async () => {
    let verifyCalls = 0
    let processCalls = 0
    const handler = createNewsletterPostHandler(async () => {
      processCalls += 1
      return {
        publicSuccess: true,
        subscriptionCreated: true,
        smtpAttempted: false,
        smtpAccepted: false,
        smtpPersistedStatus: null,
        mailchimpAttempted: false,
        mailchimpSynced: false,
        mailchimpPersistedStatus: null,
        existingStatus: null,
      }
    }, {
      rateLimitSubmission: () => ({ ok: false, retryAfterSeconds: 60 }),
      verifyTurnstile: async () => {
        verifyCalls += 1
        return { ok: true }
      },
    })

    const response = await handler(buildNewsletterRequest({}))
    const body = await response.json()
    assert.equal(response.status, 429)
    assert.equal(response.headers.get('Retry-After'), '60')
    assert.equal(body.errorCode, 'RATE_LIMITED')
    assert.equal(verifyCalls, 0)
    assert.equal(processCalls, 0)
  })

  await test('newsletter oversized body returns 413', async () => {
    const response = await createNewsletterPostHandler()(buildNewsletterRequest({}, {
      headers: {
        'content-type': 'application/json',
        'content-length': String(NEWSLETTER_PAYLOAD_TOO_LARGE),
      },
    }))
    assert.equal(response.status, 413)
  })

  await test('newsletter unknown field remains rejected', async () => {
    const response = await createNewsletterPostHandler()(buildNewsletterRequest({ admin: true }))
    assert.equal(response.status, 422)
  })

  await test('newsletter invalid JSON returns 400', async () => {
    const response = await createNewsletterPostHandler()(buildNewsletterRequest({}, {
      rawBody: '{bad json',
    }))
    assert.equal(response.status, 400)
  })

  await test('newsletter unsupported media type returns 415', async () => {
    const response = await createNewsletterPostHandler()(buildNewsletterRequest({}, {
      headers: { 'content-type': 'text/plain' },
      rawBody: 'newsletter',
    }))
    assert.equal(response.status, 415)
  })

  await test('newsletter email rate limit uses the normalized email bucket across case variants', () => {
    const config = getNewsletterAbuseConfig({
      ...process.env,
      NEWSLETTER_RATE_LIMIT_MAX_PER_EMAIL: '2',
      NEWSLETTER_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
      NEWSLETTER_RATE_LIMIT_MAX_PER_IP: '100',
      NEWSLETTER_RATE_LIMIT_WINDOW_MS: '3600000',
    })

    const a = rateLimitNewsletterSubmission({ config, clientIp: null, email: `Test+${Date.now()}@Example.com` })
    const b = rateLimitNewsletterSubmission({ config, clientIp: null, email: `test+${Date.now()}@example.com` })
    const c = rateLimitNewsletterSubmission({ config, clientIp: null, email: 'case-bucket@example.com' })
    const d = rateLimitNewsletterSubmission({ config, clientIp: null, email: 'CASE-BUCKET@EXAMPLE.COM' })
    const e = rateLimitNewsletterSubmission({ config, clientIp: null, email: 'case-bucket@example.com' })

    assert.equal(a.ok, true)
    assert.equal(b.ok, true)
    assert.equal(c.ok, true)
    assert.equal(d.ok, true)
    assert.equal(e.ok, false)
  })

  await test('newsletter ip rate limit has an independent ip bucket', () => {
    const config = getNewsletterAbuseConfig({
      ...process.env,
      NEWSLETTER_RATE_LIMIT_MAX_PER_IP: '2',
      NEWSLETTER_RATE_LIMIT_WINDOW_MS: '3600000',
      NEWSLETTER_RATE_LIMIT_MAX_PER_EMAIL: '100',
      NEWSLETTER_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
    })
    const ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`
    const one = rateLimitNewsletterSubmission({ config, clientIp: ip, email: `newsletter-ip-a-${Date.now()}@example.com` })
    const two = rateLimitNewsletterSubmission({ config, clientIp: ip, email: `newsletter-ip-b-${Date.now()}@example.com` })
    const three = rateLimitNewsletterSubmission({ config, clientIp: ip, email: `newsletter-ip-c-${Date.now()}@example.com` })
    assert.equal(one.ok, true)
    assert.equal(two.ok, true)
    assert.equal(three.ok, false)
  })

  await test('contact route still rejects missing turnstile before DB writes', async () => {
    const response = await contactPost(buildContactRequest({ turnstileToken: undefined }))
    const body = await response.json()
    assert.equal(response.status, 403)
    assert.equal(body.errorCode, 'BOT_VERIFICATION_REQUIRED')
  })

  if (failures > 0) {
    process.exitCode = 1
  }
}

const NEWSLETTER_PAYLOAD_TOO_LARGE = 8 * 1024 + 1

void main()