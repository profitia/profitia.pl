import jwt from 'jsonwebtoken'
import type { NextRequest } from 'next/server'

export interface AdminTokenPayload {
  sub: string
  email: string
  role: 'admin'
  iat: number
  exp: number
}

export function verifyAdminTokenValue(token: string | null | undefined): AdminTokenPayload | null {
  if (!token) return null

  const secret = process.env.JWT_SECRET
  if (!secret) return null

  try {
    const payload = jwt.verify(token, secret) as AdminTokenPayload
    return payload.role === 'admin' ? payload : null
  } catch {
    return null
  }
}

export function verifyAdminToken(request: NextRequest): AdminTokenPayload | null {
  return verifyAdminTokenValue(request.cookies.get('admin_token')?.value)
}
