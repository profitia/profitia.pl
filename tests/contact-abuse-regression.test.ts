import assert from 'node:assert/strict'

import { NextRequest } from 'next/server'

import { POST as contactPost } from '@/app/api/contact/route'
import { TURNSTILE_ACTION, RECRUITMENT_TURNSTILE_ACTION } from '@/lib/forms/constants'
import {
  getContactAbuseConfig,
  getRecruitmentAbuseConfig,
  rateLimitContactSubmission,
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
      fullName: 'Contact Regression Candidate',
      email: 'contact-regression@example.com',
      company: 'Profitia',
      topic: 'general',
      message: 'This is a sufficiently long contact regression message.',
      privacyConsent: true,
      marketingConsent: false,
      website: '',
      formStartedAt: Date.now() - 5_000,
      turnstileToken: 'contact-regression-token',
      ...body,
    }),
  })
}

async function main() {
  const turnstileEnv: NodeJS.ProcessEnv = {
    ...process.env,
    TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
    TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,127.0.0.1,localhost',
  }
  const contactConfigEnv: NodeJS.ProcessEnv = {
    ...process.env,
    CONTACT_RATE_LIMIT_MAX_PER_EMAIL: '1',
    CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
    CONTACT_RATE_LIMIT_MAX_PER_IP: '1',
    CONTACT_RATE_LIMIT_WINDOW_MS: '3600000',
  }
  const recruitmentConfigEnv: NodeJS.ProcessEnv = {
    ...process.env,
    RECRUITMENT_RATE_LIMIT_MAX_PER_EMAIL: '1',
    RECRUITMENT_RATE_LIMIT_EMAIL_WINDOW_MS: '3600000',
    RECRUITMENT_RATE_LIMIT_MAX_PER_IP: '1',
    RECRUITMENT_RATE_LIMIT_WINDOW_MS: '3600000',
  }

  await test('contact route honeypot still rejects before any downstream work', async () => {
    const response = await contactPost(buildContactRequest({ website: 'https://spam.example' }))
    const body = await response.json()
    assert.equal(response.status, 403)
    assert.equal(body.errorCode, 'BOT_VERIFICATION_FAILED')
  })

  await test('contact route timing still rejects too-fast submit', async () => {
    const response = await contactPost(buildContactRequest({ formStartedAt: Date.now() - 100 }))
    const body = await response.json()
    assert.equal(response.status, 403)
    assert.equal(body.errorCode, 'BOT_VERIFICATION_FAILED')
  })

  await test('shared verifier still isolates contact action from recruitment action', async () => {
    const contactOk = await verifyTurnstileToken('token', turnstileEnv, async () => new Response(JSON.stringify({
      success: true,
      hostname: 'profitia.pl',
      action: TURNSTILE_ACTION,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }), TURNSTILE_ACTION)
    const recruitmentWrong = await verifyTurnstileToken('token', turnstileEnv, async () => new Response(JSON.stringify({
      success: true,
      hostname: 'profitia.pl',
      action: RECRUITMENT_TURNSTILE_ACTION,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }), TURNSTILE_ACTION)

    assert.equal(contactOk.ok, true)
    assert.equal(recruitmentWrong.ok, false)
  })

  await test('recruitment limiter traffic does not consume contact limiter buckets', () => {
    const suffix = Date.now()
    const contactConfig = getContactAbuseConfig(contactConfigEnv)
    const recruitmentConfig = getRecruitmentAbuseConfig(recruitmentConfigEnv)
    const email = `contact-isolation-${suffix}@example.com`
    const ip = `198.51.100.${(suffix % 100) + 1}`

    assert.equal(rateLimitRecruitmentSubmission({ config: recruitmentConfig, clientIp: ip, email }).ok, true)
    assert.equal(rateLimitContactSubmission({ config: contactConfig, clientIp: ip, email }).ok, true)
  })

  if (failures > 0) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})