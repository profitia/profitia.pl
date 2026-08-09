import { createHmac } from 'node:crypto'
import { isIP } from 'node:net'
import type { AdminLoginAudit, PrismaClient } from '@prisma/client'

export const ADMIN_LOGIN_REQUEST_WINDOW_MS = 10 * 60 * 1000
export const ADMIN_LOGIN_REQUEST_MAX_PER_IP = 20
export const ADMIN_LOGIN_FAILURE_WINDOW_MS = 24 * 60 * 60 * 1000

export type AdminLoginOutcome =
  | 'SUCCESS'
  | 'INVALID_CREDENTIALS'
  | 'INACTIVE_ACCOUNT'
  | 'TURNSTILE_FAILED'
  | 'RATE_LIMITED'

type AuditStore = Pick<PrismaClient['adminLoginAudit'], 'count' | 'findMany' | 'create'>

interface CredentialEvent {
  createdAt: Date
  emailKey: string
  ipKey: string
  outcome: string
}

export interface AdminAuthKeys {
  emailKey: string
  ipKey: string
}

export interface CredentialThrottleDecision {
  allowed: boolean
  retryAfterSeconds: number
  failureCount: number
}

const CREDENTIAL_FAILURE_OUTCOMES = new Set<AdminLoginOutcome>([
  'INVALID_CREDENTIALS',
  'INACTIVE_ACCOUNT',
])

function readHmacSecret(env: NodeJS.ProcessEnv): string {
  const secret = env.ADMIN_AUTH_HMAC_SECRET?.trim()
  if (!secret || Buffer.byteLength(secret, 'utf8') < 32 || /change-me|placeholder/i.test(secret)) {
    throw new Error('ADMIN_AUTH_HMAC_SECRET must contain at least 32 bytes')
  }
  return secret
}

function hmacKey(kind: 'email' | 'ip', value: string, env: NodeJS.ProcessEnv): string {
  return createHmac('sha256', readHmacSecret(env))
    .update(`${kind}:${value}`)
    .digest('hex')
}

export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function extractAdminClientIp(request: { headers: Headers }): string {
  const cloudflareIp = request.headers.get('cf-connecting-ip')?.trim()
  if (cloudflareIp && isIP(cloudflareIp)) return cloudflareIp

  const forwardedIp = request.headers.get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim()
  if (forwardedIp && isIP(forwardedIp)) return forwardedIp

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp && isIP(realIp)) return realIp

  return 'unknown'
}

export function createAdminAuthKeys(
  email: string,
  clientIp: string,
  env: NodeJS.ProcessEnv = process.env,
): AdminAuthKeys {
  return {
    emailKey: hmacKey('email', normalizeAdminEmail(email), env),
    ipKey: hmacKey('ip', clientIp || 'unknown', env),
  }
}

export function getProgressiveBackoffMs(failureCount: number): number {
  if (failureCount < 3) return 0
  if (failureCount === 3) return 5_000
  if (failureCount === 4) return 30_000
  if (failureCount === 5) return 2 * 60_000
  return 10 * 60_000
}

function evaluateKeyThrottle(
  events: CredentialEvent[],
  matchesKey: (event: CredentialEvent) => boolean,
  now: Date,
): CredentialThrottleDecision {
  const relevantEvents = events.filter(matchesKey)
  const lastSuccessIndex = relevantEvents.findIndex((event) => event.outcome === 'SUCCESS')
  const sinceLastSuccess = lastSuccessIndex === -1
    ? relevantEvents
    : relevantEvents.slice(0, lastSuccessIndex)
  const failures = sinceLastSuccess.filter((event) => CREDENTIAL_FAILURE_OUTCOMES.has(event.outcome as AdminLoginOutcome))
  const failureCount = failures.length
  const backoffMs = getProgressiveBackoffMs(failureCount)
  const retryMs = failures[0]
    ? Math.max(0, failures[0].createdAt.getTime() + backoffMs - now.getTime())
    : 0

  return {
    allowed: retryMs === 0,
    retryAfterSeconds: retryMs > 0 ? Math.max(1, Math.ceil(retryMs / 1000)) : 0,
    failureCount,
  }
}

export function evaluateCredentialThrottle(
  events: CredentialEvent[],
  keys: AdminAuthKeys,
  now = new Date(),
): CredentialThrottleDecision {
  const orderedEvents = [...events].sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime())
  const ipDecision = evaluateKeyThrottle(orderedEvents, (event) => event.ipKey === keys.ipKey, now)
  const emailDecision = evaluateKeyThrottle(orderedEvents, (event) => event.emailKey === keys.emailKey, now)

  return {
    allowed: ipDecision.allowed && emailDecision.allowed,
    retryAfterSeconds: Math.max(ipDecision.retryAfterSeconds, emailDecision.retryAfterSeconds),
    failureCount: Math.max(ipDecision.failureCount, emailDecision.failureCount),
  }
}

export async function checkPreAuthIpLimit(
  store: AuditStore,
  ipKey: string,
  now = new Date(),
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const windowStart = new Date(now.getTime() - ADMIN_LOGIN_REQUEST_WINDOW_MS)
  const requestCount = await store.count({
    where: {
      ipKey,
      createdAt: { gte: windowStart },
      outcome: { not: 'RATE_LIMITED' },
    },
  })

  return requestCount >= ADMIN_LOGIN_REQUEST_MAX_PER_IP
    ? { allowed: false, retryAfterSeconds: Math.ceil(ADMIN_LOGIN_REQUEST_WINDOW_MS / 1000) }
    : { allowed: true, retryAfterSeconds: 0 }
}

export async function checkCredentialThrottle(
  store: AuditStore,
  keys: AdminAuthKeys,
  now = new Date(),
): Promise<CredentialThrottleDecision> {
  const events = await store.findMany({
    where: {
      createdAt: { gte: new Date(now.getTime() - ADMIN_LOGIN_FAILURE_WINDOW_MS) },
      outcome: { in: ['SUCCESS', 'INVALID_CREDENTIALS', 'INACTIVE_ACCOUNT'] },
      OR: [{ ipKey: keys.ipKey }, { emailKey: keys.emailKey }],
    },
    orderBy: { createdAt: 'desc' },
    select: { createdAt: true, emailKey: true, ipKey: true, outcome: true },
  })

  return evaluateCredentialThrottle(events, keys, now)
}

export async function recordAdminLoginAudit(
  store: AuditStore,
  input: AdminAuthKeys & {
    adminUserId?: string | null
    outcome: AdminLoginOutcome
    userAgent?: string | null
  },
): Promise<AdminLoginAudit> {
  return store.create({
    data: {
      adminUserId: input.adminUserId ?? null,
      emailKey: input.emailKey,
      ipKey: input.ipKey,
      outcome: input.outcome,
      userAgent: input.userAgent?.slice(0, 512) || null,
    },
  })
}