import assert from 'node:assert/strict'

import {
  createMailchimpSubscriberHash,
  summarizeMailchimpSyncFailure,
  syncMailchimpNewsletterSubscriber,
} from '@/lib/newsletter/mailchimp'

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

function makeResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function main() {
  const env = {
    MAILCHIMP_API_KEY: 'test-api-key-us21',
    MAILCHIMP_AUDIENCE_ID: 'aud123',
  } as unknown as NodeJS.ProcessEnv

  await test('subscriber hash trims and lowercases before md5', () => {
    const a = createMailchimpSubscriberHash(' test@example.com ')
    const b = createMailchimpSubscriberHash('TEST@EXAMPLE.COM')
    assert.equal(a, '55502f40dc8b7c769880b10874abc9d0')
    assert.equal(a, b)
  })

  await test('request contract uses PUT with audience id, hash, and status_if_new only', async () => {
    let capturedUrl = ''
    let capturedInit: RequestInit | undefined

    const result = await syncMailchimpNewsletterSubscriber(
      { email: ' Test@Example.com ' },
      env,
      async (input, init) => {
        capturedUrl = String(input)
        capturedInit = init
        return makeResponse({ status: 'subscribed' }, 200)
      }
    )

    assert.equal(result.success, true)
    assert.equal(capturedInit?.method, 'PUT')
    assert.match(capturedUrl, /^https:\/\/us21\.api\.mailchimp\.com\/3\.0\/lists\/aud123\/members\/55502f40dc8b7c769880b10874abc9d0$/)
    const body = JSON.parse(String(capturedInit?.body ?? '{}'))
    assert.deepEqual(body, {
      email_address: 'test@example.com',
      status_if_new: 'subscribed',
    })
    assert.ok(!('status' in body))
  })

  await test('success requires remote subscribed status', async () => {
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => makeResponse({ status: 'subscribed' }, 200)
    )

    assert.deepEqual(result, {
      success: true,
      subscriberHash: '55502f40dc8b7c769880b10874abc9d0',
      remoteStatus: 'subscribed',
      httpStatus: 200,
      timestamp: result.success ? result.timestamp : '',
    })
  })

  await test('remote unsubscribed status is treated as mismatch without retry', async () => {
    let calls = 0
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => {
        calls += 1
        return makeResponse({ status: 'unsubscribed' }, 200)
      }
    )

    assert.equal(calls, 1)
    assert.equal(result.success, false)
    if (!result.success) {
      assert.equal(result.kind, 'MAILCHIMP_STATUS_MISMATCH')
      assert.equal(result.remoteStatus, 'unsubscribed')
      assert.equal(summarizeMailchimpSyncFailure(result), 'MAILCHIMP_STATUS_MISMATCH: unsubscribed')
    }
  })

  await test('401 maps to auth error without raw body leakage', async () => {
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => makeResponse({ title: 'API Key Invalid' }, 401)
    )

    assert.equal(result.success, false)
    if (!result.success) {
      assert.equal(result.kind, 'MAILCHIMP_AUTH_ERROR')
      assert.equal(summarizeMailchimpSyncFailure(result), 'MAILCHIMP_AUTH_ERROR: 401')
    }
  })

  await test('429 maps to rate limit error', async () => {
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => makeResponse({ title: 'Too Many Requests' }, 429)
    )

    assert.equal(result.success, false)
    if (!result.success) {
      assert.equal(result.kind, 'MAILCHIMP_RATE_LIMITED')
      assert.equal(summarizeMailchimpSyncFailure(result), 'MAILCHIMP_RATE_LIMITED: 429')
    }
  })

  await test('500 maps to api error', async () => {
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => makeResponse({ title: 'Internal Server Error' }, 500)
    )

    assert.equal(result.success, false)
    if (!result.success) {
      assert.equal(result.kind, 'MAILCHIMP_API_ERROR')
      assert.equal(summarizeMailchimpSyncFailure(result), 'MAILCHIMP_API_ERROR: 500')
    }
  })

  await test('timeout maps to MAILCHIMP_TIMEOUT', async () => {
    const result = await syncMailchimpNewsletterSubscriber(
      { email: 'test@example.com' },
      env,
      async () => {
        const error = new Error('Request timed out')
        error.name = 'TimeoutError'
        throw error
      }
    )

    assert.equal(result.success, false)
    if (!result.success) {
      assert.equal(result.kind, 'MAILCHIMP_TIMEOUT')
      assert.equal(summarizeMailchimpSyncFailure(result), 'MAILCHIMP_TIMEOUT: MAILCHIMP_TIMEOUT')
    }
  })

  if (failures > 0) {
    process.exitCode = 1
  }
}

void main()