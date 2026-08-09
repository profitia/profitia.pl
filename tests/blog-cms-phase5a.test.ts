import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'
import {
  ADMIN_JWT_AUDIENCE,
  ADMIN_JWT_ISSUER,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  isSameOriginRequest,
  signAdminToken,
  verifyActiveAdminTokenValue,
  verifyAdminTokenValue,
} from '../lib/auth'
import { POST as logout } from '../app/api/admin/logout/route'
import { POST as login } from '../app/api/admin/login/route'
import { POST as createArticle } from '../app/api/articles/route'
import { ADMIN_LOGIN_TURNSTILE_ACTION } from '../lib/forms/constants'
import {
  ADMIN_LOGIN_REQUEST_MAX_PER_IP,
  checkPreAuthIpLimit,
  createAdminAuthKeys,
  evaluateCredentialThrottle,
  extractAdminClientIp,
  getProgressiveBackoffMs,
  recordAdminLoginAudit,
} from '../lib/security/admin-auth'
import {
  DUMMY_BCRYPT_HASH,
  verifyAdminCredentials,
} from '../lib/security/admin-credentials'
import { verifyTurnstileToken } from '../lib/security/turnstile'

let failures = 0
const prisma = new PrismaClient()

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

const turnstileEnv = {
  ...process.env,
  TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
  TURNSTILE_ALLOWED_HOSTNAMES: 'profitia.pl,localhost',
  TURNSTILE_EXPECTED_ACTION: 'contact_form',
}

function siteverify(body: Record<string, unknown>, status = 200): typeof fetch {
  return async () => new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function event(
  outcome: string,
  secondsAgo: number,
  keys: { emailKey: string; ipKey: string },
) {
  return {
    ...keys,
    outcome,
    createdAt: new Date(Date.now() - secondsAgo * 1000),
  }
}

function loginRequest(
  email: string,
  password: string,
  clientIp: string,
  options: { origin?: string; turnstileToken?: string } = {},
) {
  return new NextRequest('https://profitia.pl/api/admin/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: options.origin ?? 'https://profitia.pl',
      'cf-connecting-ip': clientIp,
      'user-agent': 'Phase 5A integration test',
    },
    body: JSON.stringify({
      email,
      password,
      turnstileToken: options.turnstileToken ?? 'phase-5a-turnstile-token',
    }),
  })
}

async function main() {
  process.env.JWT_SECRET = 'phase-5a-test-secret-that-is-long-enough-for-tests'
  process.env.ADMIN_AUTH_HMAC_SECRET = 'phase-5a-hmac-secret-that-is-at-least-32-bytes'

  await test('missing Turnstile token is rejected without Siteverify', async () => {
    let called = false
    const result = await verifyTurnstileToken('', turnstileEnv, async () => {
      called = true
      return new Response()
    })
    assert.equal(result.ok, false)
    assert.equal(called, false)
  })

  await test('Siteverify failure is rejected', async () => {
    const result = await verifyTurnstileToken('token', turnstileEnv, siteverify({ success: false }))
    assert.equal(result.ok, false)
  })

  await test('wrong admin Turnstile action is rejected', async () => {
    const result = await verifyTurnstileToken('token', turnstileEnv, siteverify({
      success: true,
      hostname: 'profitia.pl',
      action: 'contact_form',
    }), ADMIN_LOGIN_TURNSTILE_ACTION)
    assert.equal(result.ok, false)
  })

  await test('wrong Turnstile hostname is rejected', async () => {
    const result = await verifyTurnstileToken('token', turnstileEnv, siteverify({
      success: true,
      hostname: 'attacker.example',
      action: ADMIN_LOGIN_TURNSTILE_ACTION,
    }), ADMIN_LOGIN_TURNSTILE_ACTION)
    assert.equal(result.ok, false)
  })

  await test('correct admin Turnstile action and hostname proceed', async () => {
    const result = await verifyTurnstileToken('token', turnstileEnv, siteverify({
      success: true,
      hostname: 'profitia.pl',
      action: ADMIN_LOGIN_TURNSTILE_ACTION,
    }), ADMIN_LOGIN_TURNSTILE_ACTION)
    assert.deepEqual(result, { ok: true })
  })

  await test('Contact Form retains its default Turnstile action', async () => {
    const result = await verifyTurnstileToken('token', turnstileEnv, siteverify({
      success: true,
      hostname: 'profitia.pl',
      action: 'contact_form',
    }))
    assert.deepEqual(result, { ok: true })
  })

  await test('HMAC audit keys contain neither raw email nor raw IP', () => {
    const keys = createAdminAuthKeys(' Admin@Example.com ', '203.0.113.10')
    assert.equal(keys.emailKey.length, 64)
    assert.equal(keys.ipKey.length, 64)
    assert.ok(!JSON.stringify(keys).includes('admin@example.com'))
    assert.ok(!JSON.stringify(keys).includes('203.0.113.10'))
  })

  await test('Cloudflare client IP wins and unknown uses a stable bucket', () => {
    const request = new NextRequest('https://profitia.pl/admin/login', {
      headers: {
        'cf-connecting-ip': '203.0.113.12',
        'x-forwarded-for': '198.51.100.2',
      },
    })
    assert.equal(extractAdminClientIp(request), '203.0.113.12')
    assert.equal(extractAdminClientIp({ headers: new Headers() }), 'unknown')
  })

  await test('pre-auth IP threshold rejects at the configured maximum', async () => {
    const allowed = await checkPreAuthIpLimit({
      count: async () => ADMIN_LOGIN_REQUEST_MAX_PER_IP - 1,
    } as never, 'ip-key')
    const blocked = await checkPreAuthIpLimit({
      count: async () => ADMIN_LOGIN_REQUEST_MAX_PER_IP,
    } as never, 'ip-key')
    assert.equal(allowed.allowed, true)
    assert.equal(blocked.allowed, false)
    assert.ok(blocked.retryAfterSeconds > 0)
  })

  await test('progressive backoff increases and caps at ten minutes', () => {
    assert.deepEqual([0, 1, 2, 3, 4, 5, 6, 20].map(getProgressiveBackoffMs), [
      0, 0, 0, 5_000, 30_000, 120_000, 600_000, 600_000,
    ])
  })

  await test('rotating emails still hits IP backoff', () => {
    const target = { emailKey: 'target-email', ipKey: 'shared-ip' }
    const events = [
      event('INVALID_CREDENTIALS', 1, { emailKey: 'a', ipKey: 'shared-ip' }),
      event('INVALID_CREDENTIALS', 2, { emailKey: 'b', ipKey: 'shared-ip' }),
      event('INVALID_CREDENTIALS', 3, { emailKey: 'c', ipKey: 'shared-ip' }),
    ]
    assert.equal(evaluateCredentialThrottle(events, target).allowed, false)
  })

  await test('rotating IPs still hits email backoff', () => {
    const target = { emailKey: 'shared-email', ipKey: 'target-ip' }
    const events = [
      event('INVALID_CREDENTIALS', 1, { emailKey: 'shared-email', ipKey: 'a' }),
      event('INVALID_CREDENTIALS', 2, { emailKey: 'shared-email', ipKey: 'b' }),
      event('INACTIVE_ACCOUNT', 3, { emailKey: 'shared-email', ipKey: 'c' }),
    ]
    assert.equal(evaluateCredentialThrottle(events, target).allowed, false)
  })

  await test('Turnstile and rate-limit outcomes do not increase credential failures', () => {
    const keys = { emailKey: 'email', ipKey: 'ip' }
    const decision = evaluateCredentialThrottle([
      event('TURNSTILE_FAILED', 1, keys),
      event('RATE_LIMITED', 2, keys),
    ], keys)
    assert.equal(decision.failureCount, 0)
    assert.equal(decision.allowed, true)
  })

  await test('SUCCESS logically resets earlier failures without deleting history', () => {
    const keys = { emailKey: 'email', ipKey: 'ip' }
    const decision = evaluateCredentialThrottle([
      event('SUCCESS', 1, keys),
      event('INVALID_CREDENTIALS', 2, keys),
      event('INVALID_CREDENTIALS', 3, keys),
      event('INVALID_CREDENTIALS', 4, keys),
    ], keys)
    assert.equal(decision.failureCount, 0)
    assert.equal(decision.allowed, true)
  })

  await test('audit write contains no password, JWT, cookie, or Turnstile token', async () => {
    let captured: unknown
    await recordAdminLoginAudit({
      create: async (args: unknown) => {
        captured = args
        return { id: 'audit' }
      },
    } as never, {
      emailKey: 'email-key',
      ipKey: 'ip-key',
      outcome: 'TURNSTILE_FAILED',
      userAgent: 'x'.repeat(600),
    })
    const serialized = JSON.stringify(captured)
    assert.ok(!/password|jwt|cookie|turnstileToken/i.test(serialized))
    assert.equal((captured as { data: { userAgent: string } }).data.userAgent.length, 512)
  })

  await test('unknown account executes one valid cost-12 dummy bcrypt comparison', async () => {
    const hashes: string[] = []
    const result = await verifyAdminCredentials(null, 'password', async (_password, hash) => {
      hashes.push(hash)
      return false
    })
    assert.deepEqual(result, { authenticated: false, outcome: 'INVALID_CREDENTIALS' })
    assert.deepEqual(hashes, [DUMMY_BCRYPT_HASH])
    assert.equal(DUMMY_BCRYPT_HASH.split('$')[2], '12')
  })

  await test('invalid, unknown, and inactive credentials share external auth failure class', async () => {
    const invalid = await verifyAdminCredentials({ active: true, passwordHash: 'real' }, 'x', async () => false)
    const unknown = await verifyAdminCredentials(null, 'x', async () => false)
    const inactive = await verifyAdminCredentials({ active: false, passwordHash: 'real' }, 'x', async () => true)
    assert.equal(invalid.authenticated, false)
    assert.equal(unknown.authenticated, false)
    assert.equal(inactive.authenticated, false)
  })

  await test('JWT has strict HS256 issuer, audience, subject, role, and eight-hour TTL', () => {
    const token = signAdminToken('admin-id')
    const decoded = verifyAdminTokenValue(token)
    assert.equal(decoded?.sub, 'admin-id')
    assert.equal(decoded?.role, 'admin')
    assert.equal(decoded?.iss, ADMIN_JWT_ISSUER)
    assert.equal(decoded?.aud, ADMIN_JWT_AUDIENCE)
    assert.equal((decoded?.exp ?? 0) - (decoded?.iat ?? 0), ADMIN_SESSION_MAX_AGE_SECONDS)
    assert.equal(jwt.decode(token, { complete: true })?.header.alg, 'HS256')
  })

  await test('tampered, expired, wrong issuer, audience, and algorithm JWTs are rejected', () => {
    const secret = process.env.JWT_SECRET as string
    const base = { role: 'admin' }
    const options = { subject: 'admin', expiresIn: '5m' } as const
    const tampered = `${signAdminToken('admin').slice(0, -1)}x`
    const expired = jwt.sign(base, secret, {
      algorithm: 'HS256', issuer: ADMIN_JWT_ISSUER, audience: ADMIN_JWT_AUDIENCE, subject: 'admin', expiresIn: -1,
    })
    const wrongIssuer = jwt.sign(base, secret, {
      algorithm: 'HS256', issuer: 'wrong', audience: ADMIN_JWT_AUDIENCE, ...options,
    })
    const wrongAudience = jwt.sign(base, secret, {
      algorithm: 'HS256', issuer: ADMIN_JWT_ISSUER, audience: 'wrong', ...options,
    })
    const wrongAlgorithm = jwt.sign(base, secret, {
      algorithm: 'HS384', issuer: ADMIN_JWT_ISSUER, audience: ADMIN_JWT_AUDIENCE, ...options,
    })
    for (const token of [tampered, expired, wrongIssuer, wrongAudience, wrongAlgorithm]) {
      assert.equal(verifyAdminTokenValue(token), null)
    }
  })

  await test('active-account lookup rejects deactivation with the same JWT', async () => {
    const token = signAdminToken('admin-id')
    assert.ok(await verifyActiveAdminTokenValue(token, async () => ({ active: true })))
    assert.equal(await verifyActiveAdminTokenValue(token, async () => ({ active: false })), null)
  })

  await test('login/logout same-origin comparison rejects mismatches', () => {
    const valid = new NextRequest('https://profitia.pl/api/admin/login', {
      method: 'POST', headers: { origin: 'https://profitia.pl' },
    })
    const invalid = new NextRequest('https://profitia.pl/api/admin/login', {
      method: 'POST', headers: { origin: 'https://attacker.example' },
    })
    assert.equal(isSameOriginRequest(valid), true)
    assert.equal(isSameOriginRequest(invalid), false)
  })

  await test('logout rejects wrong Origin and clears a hardened cookie on success', async () => {
    const rejected = await logout(new NextRequest('https://profitia.pl/api/admin/logout', {
      method: 'POST', headers: { origin: 'https://attacker.example' },
    }))
    assert.equal(rejected.status, 403)

    const response = await logout(new NextRequest('https://profitia.pl/api/admin/logout', {
      method: 'POST', headers: { origin: 'https://profitia.pl' },
    }))
    const cookie = response.headers.get('set-cookie') ?? ''
    assert.equal(response.status, 303)
    assert.match(cookie, /admin_token=/)
    assert.match(cookie, /HttpOnly/i)
    assert.match(cookie, /SameSite=lax/i)
    assert.match(cookie, /Max-Age=0/i)
    assert.equal(response.headers.get('location'), 'https://profitia.pl/admin/login')
  })

  await test('database-backed login lifecycle is generic, audited, secure, and deactivation-aware', async () => {
    const suffix = randomUUID()
    const adminId = `phase-5a-admin-${suffix}`
    const email = `phase-5a-${suffix}@example.invalid`
    const unknownEmail = `unknown-${suffix}@example.invalid`
    const password = 'Phase5A-Test-Password!'
    const trackedKeys = [
      createAdminAuthKeys(email, '203.0.113.31'),
      createAdminAuthKeys(unknownEmail, '203.0.113.32'),
      createAdminAuthKeys(email, '203.0.113.33'),
      createAdminAuthKeys(email, '203.0.113.34'),
      createAdminAuthKeys(email, '203.0.113.35'),
    ]
    const originalFetch = globalThis.fetch
    const originalNodeEnv = process.env.NODE_ENV

    await prisma.adminUser.create({
      data: {
        id: adminId,
        email,
        name: 'Phase 5A Admin',
        passwordHash: await bcrypt.hash(password, 12),
        active: true,
      },
    })

    globalThis.fetch = siteverify({
      success: true,
      hostname: 'profitia.pl',
      action: ADMIN_LOGIN_TURNSTILE_ACTION,
    })
    process.env.TURNSTILE_SECRET_KEY = 'phase-5a-test-turnstile-secret'
    process.env.TURNSTILE_ALLOWED_HOSTNAMES = 'profitia.pl'

    try {
      const wrongOrigin = await login(loginRequest(email, password, '203.0.113.30', {
        origin: 'https://attacker.example',
      }))
      assert.equal(wrongOrigin.status, 403)

      globalThis.fetch = siteverify({ success: false })
      const turnstileFailure = await login(loginRequest(email, password, '203.0.113.31'))
      assert.equal(turnstileFailure.status, 403)

      globalThis.fetch = siteverify({
        success: true,
        hostname: 'profitia.pl',
        action: ADMIN_LOGIN_TURNSTILE_ACTION,
      })
      const badPassword = await login(loginRequest(email, 'wrong-password', '203.0.113.35'))
      const unknown = await login(loginRequest(unknownEmail, password, '203.0.113.32'))
      assert.equal(badPassword.status, 401)
      assert.equal(unknown.status, 401)
      assert.deepEqual(await badPassword.json(), await unknown.json())

      await prisma.adminUser.update({ where: { id: adminId }, data: { active: false } })
      const inactive = await login(loginRequest(email, password, '203.0.113.33'))
      assert.equal(inactive.status, 401)
      assert.deepEqual(await inactive.json(), { success: false, message: 'Nieprawidłowy e-mail lub hasło.' })

      await prisma.adminUser.update({ where: { id: adminId }, data: { active: true } })
      Reflect.set(process.env, 'NODE_ENV', 'production')
      const success = await login(loginRequest(email, password, '203.0.113.34'))
      assert.equal(success.status, 200)
      const cookie = success.headers.get('set-cookie') ?? ''
      assert.match(cookie, /HttpOnly/i)
      assert.match(cookie, /Secure/i)
      assert.match(cookie, /SameSite=lax/i)
      assert.match(cookie, new RegExp(`Max-Age=${ADMIN_SESSION_MAX_AGE_SECONDS}`))

      const token = cookie.match(/admin_token=([^;]+)/)?.[1]
      assert.ok(token)
      assert.ok(await verifyActiveAdminTokenValue(token))

      const crossOriginWrite = await createArticle(new NextRequest('https://profitia.pl/api/articles', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: `admin_token=${token}`,
          origin: 'https://attacker.example',
        },
        body: JSON.stringify({}),
      }))
      assert.equal(crossOriginWrite.status, 403)

      await recordAdminLoginAudit(prisma.adminLoginAudit, {
        ...trackedKeys[4],
        adminUserId: adminId,
        outcome: 'RATE_LIMITED',
        userAgent: 'Phase 5A integration test',
      })
      await prisma.adminUser.update({ where: { id: adminId }, data: { active: false } })
      assert.equal(await verifyActiveAdminTokenValue(token), null)

      const audits = await prisma.adminLoginAudit.findMany({
        where: { adminUserId: adminId },
        select: { outcome: true, emailKey: true, ipKey: true, userAgent: true },
      })
      const outcomes = new Set(audits.map((row) => row.outcome))
      assert.ok(outcomes.has('SUCCESS'))
      assert.ok(outcomes.has('INVALID_CREDENTIALS'))
      assert.ok(outcomes.has('INACTIVE_ACCOUNT'))
      assert.ok(outcomes.has('RATE_LIMITED'))
      assert.ok(audits.every((row) => row.emailKey !== email && !row.ipKey.includes('203.0.113.')))

      const turnstileAudit = await prisma.adminLoginAudit.findFirst({
        where: { emailKey: trackedKeys[0].emailKey, ipKey: trackedKeys[0].ipKey },
      })
      assert.equal(turnstileAudit?.outcome, 'TURNSTILE_FAILED')
    } finally {
      globalThis.fetch = originalFetch
      if (originalNodeEnv === undefined) {
        Reflect.deleteProperty(process.env, 'NODE_ENV')
      } else {
        Reflect.set(process.env, 'NODE_ENV', originalNodeEnv)
      }
      await prisma.adminLoginAudit.deleteMany({
        where: {
          OR: trackedKeys.flatMap((keys) => [
            { emailKey: keys.emailKey },
            { ipKey: keys.ipKey },
          ]),
        },
      })
      await prisma.adminUser.deleteMany({ where: { id: adminId } })
    }
  })

  await prisma.$disconnect()
  if (failures > 0) process.exitCode = 1
}

void main()