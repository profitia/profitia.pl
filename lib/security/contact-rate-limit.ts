import { createHash } from 'node:crypto'
import { isIP } from 'node:net'

const DEFAULT_CONTACT_MIN_FILL_TIME_MS = 800
const DEFAULT_CONTACT_RATE_LIMIT_WINDOW_MS = 600_000
const DEFAULT_CONTACT_RATE_LIMIT_MAX_PER_IP = 10
const DEFAULT_CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS = 1_800_000
const DEFAULT_CONTACT_RATE_LIMIT_MAX_PER_EMAIL = 3
const DEFAULT_MAX_ACTIVE_KEYS = 5_000
const MAX_FUTURE_SKEW_MS = 30_000

export const CONTACT_REQUEST_BODY_MAX_BYTES = 16 * 1024

interface RateLimitBucket {
  count: number
  resetAt: number
}

interface RateLimiterStore {
  buckets: Map<string, RateLimitBucket>
  operations: number
}

interface ConsumeBucketInput {
  key: string
  limit: number
  windowMs: number
}

export interface ContactAbuseConfig {
  minFillTimeMs: number
  rateLimitWindowMs: number
  rateLimitMaxPerIp: number
  rateLimitEmailWindowMs: number
  rateLimitMaxPerEmail: number
}

type TimingValidationResult =
  | { ok: true; startedAt: number }
  | { ok: false; errorCode: 'VALIDATION_ERROR' | 'BOT_VERIFICATION_FAILED' }

type RateLimitDecision =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number }

function readPositiveInteger(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  const parsed = Number(raw)

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return fallback
  }

  if (parsed < min || parsed > max) {
    return fallback
  }

  return parsed
}

function getStore(): RateLimiterStore {
  const globalStore = globalThis as typeof globalThis & {
    __contactRateLimiterStore?: RateLimiterStore
  }

  if (!globalStore.__contactRateLimiterStore) {
    globalStore.__contactRateLimiterStore = {
      buckets: new Map(),
      operations: 0,
    }
  }

  return globalStore.__contactRateLimiterStore
}

function cleanupStore(store: RateLimiterStore, now: number, maxActiveKeys = DEFAULT_MAX_ACTIVE_KEYS) {
  for (const [key, bucket] of store.buckets) {
    if (bucket.resetAt <= now) {
      store.buckets.delete(key)
    }
  }

  while (store.buckets.size > maxActiveKeys) {
    const oldestKey = store.buckets.keys().next().value
    if (!oldestKey) {
      break
    }

    store.buckets.delete(oldestKey)
  }
}

export function createInMemoryRateLimiter(maxActiveKeys = DEFAULT_MAX_ACTIVE_KEYS) {
  const store: RateLimiterStore = {
    buckets: new Map(),
    operations: 0,
  }

  function maybeCleanup(now: number) {
    store.operations += 1
    if (store.operations % 32 === 0 || store.buckets.size >= maxActiveKeys) {
      cleanupStore(store, now, maxActiveKeys)
    }
  }

  function consumeMany(inputs: ConsumeBucketInput[], now = Date.now()): RateLimitDecision {
    maybeCleanup(now)

    let retryAfterSeconds = 0

    for (const input of inputs) {
      const current = store.buckets.get(input.key)
      if (!current) {
        continue
      }

      if (current.resetAt <= now) {
        store.buckets.delete(input.key)
        continue
      }

      if (current.count >= input.limit) {
        retryAfterSeconds = Math.max(
          retryAfterSeconds,
          Math.max(1, Math.ceil((current.resetAt - now) / 1000))
        )
      }
    }

    if (retryAfterSeconds > 0) {
      return { ok: false, retryAfterSeconds }
    }

    for (const input of inputs) {
      const current = store.buckets.get(input.key)
      const nextBucket: RateLimitBucket = current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + input.windowMs }

      store.buckets.delete(input.key)
      store.buckets.set(input.key, nextBucket)
    }

    maybeCleanup(now)
    return { ok: true }
  }

  return {
    consumeMany,
    size: () => store.buckets.size,
    cleanup: (now = Date.now()) => cleanupStore(store, now, maxActiveKeys),
  }
}

const globalLimiter = createInMemoryRateLimiter()

function hashKey(prefix: 'ip' | 'email', value: string): string {
  return `${prefix}:${createHash('sha256').update(value).digest('hex')}`
}

export function getContactAbuseConfig(env: NodeJS.ProcessEnv = process.env): ContactAbuseConfig {
  return {
    minFillTimeMs: readPositiveInteger(env.CONTACT_MIN_FILL_TIME_MS, DEFAULT_CONTACT_MIN_FILL_TIME_MS, 100, 60_000),
    rateLimitWindowMs: readPositiveInteger(env.CONTACT_RATE_LIMIT_WINDOW_MS, DEFAULT_CONTACT_RATE_LIMIT_WINDOW_MS, 1_000, 86_400_000),
    rateLimitMaxPerIp: readPositiveInteger(env.CONTACT_RATE_LIMIT_MAX_PER_IP, DEFAULT_CONTACT_RATE_LIMIT_MAX_PER_IP, 1, 1_000),
    rateLimitEmailWindowMs: readPositiveInteger(
      env.CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS,
      DEFAULT_CONTACT_RATE_LIMIT_EMAIL_WINDOW_MS,
      1_000,
      86_400_000
    ),
    rateLimitMaxPerEmail: readPositiveInteger(
      env.CONTACT_RATE_LIMIT_MAX_PER_EMAIL,
      DEFAULT_CONTACT_RATE_LIMIT_MAX_PER_EMAIL,
      1,
      100
    ),
  }
}

export function validateContactFormStartedAt(
  value: unknown,
  options: { now?: number; minFillTimeMs: number }
): TimingValidationResult {
  if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isInteger(value) || value <= 0) {
    return value === undefined
      ? { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
      : { ok: false, errorCode: 'VALIDATION_ERROR' }
  }

  const now = options.now ?? Date.now()

  if (value > now + MAX_FUTURE_SKEW_MS) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  if (now - value < options.minFillTimeMs) {
    return { ok: false, errorCode: 'BOT_VERIFICATION_FAILED' }
  }

  return { ok: true, startedAt: value }
}

export function extractClientIp(request: { headers: Headers }): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstCandidate = forwardedFor
      .split(',')
      .map((entry) => entry.trim())
      .find(Boolean)

    if (firstCandidate && isIP(firstCandidate)) {
      return firstCandidate
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp && isIP(realIp)) {
    return realIp
  }

  return null
}

export function rateLimitContactSubmission(input: {
  config: ContactAbuseConfig
  clientIp: string | null
  email: string
}): RateLimitDecision {
  const emailKey = hashKey('email', input.email.trim().toLowerCase())
  const keys: ConsumeBucketInput[] = [
    {
      key: emailKey,
      limit: input.config.rateLimitMaxPerEmail,
      windowMs: input.config.rateLimitEmailWindowMs,
    },
  ]

  if (input.clientIp) {
    keys.unshift({
      key: hashKey('ip', input.clientIp),
      limit: input.config.rateLimitMaxPerIp,
      windowMs: input.config.rateLimitWindowMs,
    })
  }

  return globalLimiter.consumeMany(keys)
}