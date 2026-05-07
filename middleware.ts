import { type NextRequest, NextResponse } from 'next/server'

const LOCALE_COOKIE = 'PROFITIA_LOCALE'

function detectBrowserLocale(acceptLanguage: string): 'pl' | 'en' {
  const langs = acceptLanguage
    .split(',')
    .map((l) => l.trim().split(';')[0].toLowerCase().split('-')[0])
  for (const lang of langs) {
    if (lang === 'en') return 'en'
    if (lang === 'pl') return 'pl'
  }
  return 'pl'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /en/* - serve as-is, ensure locale cookie is set to 'en'
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const response = NextResponse.next()
    if (!request.cookies.get(LOCALE_COOKIE)) {
      response.cookies.set(LOCALE_COOKIE, 'en', {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      })
    }
    return response
  }

  // Only apply auto-redirect logic on the root path
  if (pathname === '/') {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value

    // Saved preference = 'en' → redirect to /en
    if (saved === 'en') {
      return NextResponse.redirect(new URL('/en', request.url))
    }

    // No cookie → detect browser locale
    if (!saved) {
      const acceptLanguage = request.headers.get('accept-language') ?? ''
      const browserLocale = detectBrowserLocale(acceptLanguage)

      if (browserLocale === 'en') {
        const response = NextResponse.redirect(new URL('/en', request.url))
        response.cookies.set(LOCALE_COOKIE, 'en', {
          maxAge: 60 * 60 * 24 * 365,
          path: '/',
          sameSite: 'lax',
          httpOnly: false,
        })
        return response
      }

      // PL browser - set cookie and continue
      const response = NextResponse.next()
      response.cookies.set(LOCALE_COOKIE, 'pl', {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)'],
}
