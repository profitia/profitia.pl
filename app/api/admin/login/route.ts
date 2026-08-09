import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  isSameOriginRequest,
  signAdminToken,
} from '@/lib/auth'
import { ADMIN_LOGIN_TURNSTILE_ACTION, TURNSTILE_TOKEN_MAX_LENGTH } from '@/lib/forms/constants'
import {
  checkCredentialThrottle,
  checkPreAuthIpLimit,
  createAdminAuthKeys,
  extractAdminClientIp,
  normalizeAdminEmail,
  recordAdminLoginAudit,
  type AdminAuthKeys,
} from '@/lib/security/admin-auth'
import { verifyTurnstileToken } from '@/lib/security/turnstile'
import { verifyAdminCredentials } from '@/lib/security/admin-credentials'

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(256),
  turnstileToken: z.string().trim().min(1).max(TURNSTILE_TOKEN_MAX_LENGTH),
})

async function parseLoginRequest(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return {
      data: LoginSchema.parse(await request.json()),
      expectsRedirect: false,
    }
  }

  const formData = await request.formData()
  return {
    data: LoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      turnstileToken: formData.get('turnstileToken'),
    }),
    expectsRedirect: true,
  }
}

function loginFailure(
  request: NextRequest,
  expectsRedirect: boolean,
  status: 400 | 401 | 403 | 429 | 500,
  error: 'invalid' | 'turnstile' | 'rate-limit' | 'server' | 'validation',
  message: string,
  retryAfterSeconds?: number,
) {
  const headers = retryAfterSeconds
    ? { 'Retry-After': String(retryAfterSeconds) }
    : undefined

  if (expectsRedirect) {
    return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url), {
      status: 303,
      headers,
    })
  }

  return NextResponse.json({ success: false, message }, { status, headers })
}

async function auditRateLimit(
  keys: AdminAuthKeys,
  adminUserId: string | null,
  userAgent: string | null,
) {
  await recordAdminLoginAudit(prisma.adminLoginAudit, {
    ...keys,
    adminUserId,
    outcome: 'RATE_LIMITED',
    userAgent,
  })
}

// POST /api/admin/login
export async function POST(request: NextRequest) {
  let expectsRedirect = false

  try {
    const parsed = await parseLoginRequest(request)
    expectsRedirect = parsed.expectsRedirect
    const { email, password, turnstileToken } = parsed.data

    if (!isSameOriginRequest(request)) {
      return loginFailure(request, expectsRedirect, 403, 'server', 'Nie udało się zalogować. Spróbuj ponownie.')
    }

    const normalizedEmail = normalizeAdminEmail(email)
    const keys = createAdminAuthKeys(normalizedEmail, extractAdminClientIp(request))
    const userAgent = request.headers.get('user-agent')
    const preAuthLimit = await checkPreAuthIpLimit(prisma.adminLoginAudit, keys.ipKey)
    if (!preAuthLimit.allowed) {
      await auditRateLimit(keys, null, userAgent)
      return loginFailure(
        request,
        expectsRedirect,
        429,
        'rate-limit',
        'Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.',
        preAuthLimit.retryAfterSeconds,
      )
    }

    const turnstile = await verifyTurnstileToken(turnstileToken, process.env, fetch, ADMIN_LOGIN_TURNSTILE_ACTION)
    if (!turnstile.ok) {
      await recordAdminLoginAudit(prisma.adminLoginAudit, {
        ...keys,
        outcome: 'TURNSTILE_FAILED',
        userAgent,
      })
      return loginFailure(
        request,
        expectsRedirect,
        403,
        'turnstile',
        'Nie udało się zweryfikować zabezpieczenia. Spróbuj ponownie.',
      )
    }

    const credentialThrottle = await checkCredentialThrottle(prisma.adminLoginAudit, keys)
    if (!credentialThrottle.allowed) {
      await auditRateLimit(keys, null, userAgent)
      return loginFailure(
        request,
        expectsRedirect,
        429,
        'rate-limit',
        'Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.',
        credentialThrottle.retryAfterSeconds,
      )
    }

    const user = await prisma.adminUser.findUnique({ where: { email: normalizedEmail } })
    const credentials = await verifyAdminCredentials(user, password)

    if (!credentials.authenticated || !user) {
      await recordAdminLoginAudit(prisma.adminLoginAudit, {
        ...keys,
        adminUserId: user?.id,
        outcome: credentials.authenticated ? 'INVALID_CREDENTIALS' : credentials.outcome,
        userAgent,
      })
      return loginFailure(
        request,
        expectsRedirect,
        401,
        'invalid',
        'Nieprawidłowy e-mail lub hasło.',
      )
    }

    const token = signAdminToken(user.id)
    await recordAdminLoginAudit(prisma.adminLoginAudit, {
      ...keys,
      adminUserId: user.id,
      outcome: 'SUCCESS',
      userAgent,
    })

    const response = expectsRedirect
      ? NextResponse.redirect(new URL('/admin/dashboard', request.url), { status: 303 })
      : NextResponse.json({ success: true })
    response.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      path: '/',
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return loginFailure(request, expectsRedirect, 400, 'validation', 'Nieprawidłowe dane logowania.')
    }
    console.error('[API /admin/login] unexpected failure')
    return loginFailure(request, expectsRedirect, 500, 'server', 'Nie udało się zalogować. Spróbuj ponownie.')
  }
}
