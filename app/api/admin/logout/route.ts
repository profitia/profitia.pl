import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, isSameOriginRequest } from '@/lib/auth'

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ success: false, message: 'Invalid request origin' }, { status: 403 })
  }

  const response = NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
  return response
}