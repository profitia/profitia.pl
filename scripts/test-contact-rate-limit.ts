import {
  createInMemoryRateLimiter,
  extractClientIp,
  getContactAbuseConfig,
  validateContactFormStartedAt,
} from '@/lib/security/contact-rate-limit'

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

function testRateLimiter() {
  const limiter = createInMemoryRateLimiter(3)
  const now = 1_000_000

  assert(limiter.consumeMany([{ key: 'ip:a', limit: 2, windowMs: 60_000 }], now).ok, 'first request should pass')
  assert(limiter.consumeMany([{ key: 'ip:a', limit: 2, windowMs: 60_000 }], now + 1).ok, 'second request should pass')

  const blocked = limiter.consumeMany([{ key: 'ip:a', limit: 2, windowMs: 60_000 }], now + 2)
  assert(!blocked.ok && blocked.retryAfterSeconds >= 1, 'third request should be rate limited with retry-after')

  assert(limiter.consumeMany([{ key: 'ip:a', limit: 2, windowMs: 60_000 }], now + 60_001).ok, 'window expiry should reset the bucket')

  assert(
    limiter.consumeMany([
      { key: 'ip:b', limit: 2, windowMs: 60_000 },
      { key: 'email:x', limit: 2, windowMs: 60_000 },
    ], now + 70_000).ok,
    'independent IP and email buckets should both pass initially'
  )

  limiter.consumeMany([{ key: 'ip:c', limit: 2, windowMs: 60_000 }], now + 70_001)
  limiter.consumeMany([{ key: 'ip:d', limit: 2, windowMs: 60_000 }], now + 70_002)
  assert(limiter.size() <= 3, 'limiter must keep the map bounded')
}

function testTimingValidation() {
  const now = 2_000_000

  assert(validateContactFormStartedAt(now - 900, { now, minFillTimeMs: 800 }).ok, 'elapsed time above threshold should pass')
  assert(!validateContactFormStartedAt(now - 100, { now, minFillTimeMs: 800 }).ok, 'elapsed time below threshold should fail')
  assert(!validateContactFormStartedAt(now + 31_000, { now, minFillTimeMs: 800 }).ok, 'future timestamp should fail')

  const wrongTypeResult = validateContactFormStartedAt('bad', { now, minFillTimeMs: 800 })
  assert(
    !wrongTypeResult.ok && wrongTypeResult.errorCode === 'VALIDATION_ERROR',
    'wrong type should be a controlled validation failure'
  )
}

function testConfigParsing() {
  const env = {
    CONTACT_MIN_FILL_TIME_MS: 'bad',
    CONTACT_RATE_LIMIT_WINDOW_MS: '-1',
    CONTACT_RATE_LIMIT_MAX_PER_IP: '0',
    CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS: '1800000',
    CONTACT_RATE_LIMIT_MAX_PER_EMAIL: '3',
  } as unknown as NodeJS.ProcessEnv

  const config = getContactAbuseConfig(env)

  assert(config.minFillTimeMs === 800, 'invalid minimum fill time should fall back to safe default')
  assert(config.rateLimitWindowMs === 600000, 'invalid IP window should fall back to safe default')
  assert(config.rateLimitMaxPerIp === 10, 'invalid IP max should fall back to safe default')
}

function testIpExtraction() {
  const forwardedHeaders = new Headers({ 'x-forwarded-for': '203.0.113.10, 10.0.0.1' })
  assert(extractClientIp({ headers: forwardedHeaders }) === '203.0.113.10', 'first forwarded IP should be selected')

  const realIpHeaders = new Headers({ 'x-real-ip': '203.0.113.20' })
  assert(extractClientIp({ headers: realIpHeaders }) === '203.0.113.20', 'x-real-ip should be used as fallback')
}

testRateLimiter()
testTimingValidation()
testConfigParsing()
testIpExtraction()

console.log('ETAP 8B contact abuse helper checks: PASS')