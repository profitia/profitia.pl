import jwt from 'jsonwebtoken'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const ADMIN_SESSION_COOKIE = 'admin_token'
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60
export const ADMIN_JWT_ISSUER = 'profitia.pl'
export const ADMIN_JWT_AUDIENCE = 'profitia-admin-cms'

export interface AdminTokenPayload {
  sub: string
  role: 'admin'
  iat: number
  exp: number
  iss: string
  aud: string | string[]
}

function readJwtSecret(env: NodeJS.ProcessEnv = process.env): string {
  const secret = env.JWT_SECRET?.trim()
  if (!secret) throw new Error('JWT_SECRET not set')

  if (env.NODE_ENV === 'production' && (
    Buffer.byteLength(secret, 'utf8') < 32
    || /change-me|placeholder/i.test(secret)
  )) {
    throw new Error('JWT_SECRET does not meet production requirements')
  }

  return secret
}

export function signAdminToken(adminUserId: string): string {
  return jwt.sign(
    { role: 'admin' },
    readJwtSecret(),
    {
      algorithm: 'HS256',
      audience: ADMIN_JWT_AUDIENCE,
      expiresIn: ADMIN_SESSION_MAX_AGE_SECONDS,
      issuer: ADMIN_JWT_ISSUER,
      subject: adminUserId,
    },
  )
}

export function verifyAdminTokenValue(token: string | null | undefined): AdminTokenPayload | null {
  if (!token) return null

  try {
    const payload = jwt.verify(token, readJwtSecret(), {
      algorithms: ['HS256'],
      audience: ADMIN_JWT_AUDIENCE,
      issuer: ADMIN_JWT_ISSUER,
    }) as AdminTokenPayload
    return payload.role === 'admin' && typeof payload.sub === 'string' ? payload : null
  } catch {
    return null
  }
}

export function verifyAdminToken(request: NextRequest): AdminTokenPayload | null {
  return verifyAdminTokenValue(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
}

type FindAdmin = (id: string) => Promise<{ active: boolean } | null>

export async function verifyActiveAdminTokenValue(
  token: string | null | undefined,
  findAdmin: FindAdmin = (id) => prisma.adminUser.findUnique({
    where: { id },
    select: { active: true },
  }),
): Promise<AdminTokenPayload | null> {
  const session = verifyAdminTokenValue(token)
  if (!session) return null

  const admin = await findAdmin(session.sub)
  return admin?.active ? session : null
}

export function verifyActiveAdminToken(request: NextRequest): Promise<AdminTokenPayload | null> {
  return verifyActiveAdminTokenValue(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)
}

export function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  if (!origin) return false

  const forwardedHost = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim()
  const expectedOrigin = forwardedHost
    ? `${forwardedProto || 'https'}://${forwardedHost}`
    : request.nextUrl.origin

  try {
    return new URL(origin).origin === new URL(expectedOrigin).origin
  } catch {
    return false
  }
}
