import { type NextRequest, NextResponse } from 'next/server'

// Locale routing is intentionally disabled — all routes live at the root level.
// /en redirect is a temporary compatibility shim; locale routing is a future sprint.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /en and /en/* to the root (English locale sprint is future work)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const destination = pathname.slice(3) || '/'
    return NextResponse.redirect(new URL(destination, request.url), 308)
  }

  return NextResponse.next()
}

export const config = {
  // Skip static assets, API routes, and Next.js internals
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'],
}

