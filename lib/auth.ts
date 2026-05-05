import jwt from 'jsonwebtoken'
import type { NextRequest } from 'next/server'

export interface AdminTokenPayload {
  sub: string
  email: string
  role: 'admin'
  iat: number
  exp: number
}

export function verifyAdminToken(request: NextRequest): AdminTokenPayload | null {
  const token = request.cookies.get('admin_token')?.value
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
