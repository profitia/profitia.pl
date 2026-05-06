'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import plDict from '@/dictionaries/pl.json'
import enDict from '@/dictionaries/en.json'

const LOCALE_COOKIE = 'PROFITIA_LOCALE'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isEN = pathname.startsWith('/en')
  const currentLocale = isEN ? 'en' : 'pl'
  const dict = isEN ? enDict : plDict
  const prefix = isEN ? '/en' : ''

  const NAV_LINKS = [
    { href: isEN ? '/en' : '/', label: dict.nav.home },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/blog`, label: dict.nav.blog },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ]

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname.startsWith(href)
  }

  const switchLocale = (locale: 'pl' | 'en') => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
    let newPath: string
    if (locale === 'en') {
      newPath = isEN ? pathname : '/en' + pathname
    } else {
      newPath = isEN ? (pathname.slice(3) || '/') : pathname
    }
    router.push(newPath)
    setMobileOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-base flex items-center justify-between h-16">

        {/* Logo */}
        <Link href={isEN ? '/en' : '/'} className="flex items-center flex-shrink-0" aria-label="Profitia">
          <Image
            src="/logo/profitia-default.svg"
            alt="Profitia"
            width={180}
            height={48}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Nawigacja główna">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: language switcher + CTA + hamburger */}
        <div className="flex items-center gap-3">

          {/* Language switcher — desktop */}
          <div className="hidden md:flex items-center gap-0.5 text-xs font-medium">
            <button
              onClick={() => switchLocale('pl')}
              aria-label="Polski"
              className={`px-2 py-1 rounded transition-colors duration-150 ${
                currentLocale === 'pl'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              PL
            </button>
            <span className="text-gray-300 select-none">/</span>
            <button
              onClick={() => switchLocale('en')}
              aria-label="English"
              className={`px-2 py-1 rounded transition-colors duration-150 ${
                currentLocale === 'en'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              EN
            </button>
          </div>

          <Link href={`${prefix}/contact`} className="btn-primary hidden md:inline-flex text-sm">
            {dict.nav.cta}
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="container-base py-4 flex flex-col gap-1" aria-label="Nawigacja mobilna">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher — mobile */}
            <div className="mt-2 pt-3 border-t border-gray-100 flex items-center gap-2 px-1">
              <button
                onClick={() => switchLocale('pl')}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                  currentLocale === 'pl' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                PL — Polski
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${
                  currentLocale === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                EN — English
              </button>
            </div>

            <div className="pt-2">
              <Link
                href={`${prefix}/contact`}
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full text-center text-sm"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
