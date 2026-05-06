import { type NextRequest, NextResponse } from 'next/server'

// Locale routing is intentionally disabled — all routes live at the root level.
// This middleware is a required pass-through for the Next.js runtime.
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Skip static assets, API routes, and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'],
}

