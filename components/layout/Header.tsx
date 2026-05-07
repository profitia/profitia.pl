'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import plDict from '@/dictionaries/pl.json'
import enDict from '@/dictionaries/en.json'

const LOCALE_COOKIE = 'PROFITIA_LOCALE'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isEN = pathname.startsWith('/en')
  const currentLocale = isEN ? 'en' : 'pl'
  const dict = isEN ? enDict : plDict
  const prefix = isEN ? '/en' : ''

  // ── Legal pages always show the scrolled (stable) header ──────
  const isLegalPage = ['/privacy', '/cookies', '/terms'].some(
    (p) => pathname === p || pathname === `/en${p}`
  )
  const showScrolled = scrolled || isLegalPage

  // ── Scroll detection ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── ESC closes mobile menu ────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // ── Lock body scroll when menu open ──────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ── Close on route change ─────────────────────────────────────
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // ── Locale switch ─────────────────────────────────────────────
  const switchLocale = (locale: 'pl' | 'en') => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
    const newPath =
      locale === 'en'
        ? isEN ? pathname : '/en' + pathname
        : isEN ? pathname.slice(3) || '/' : pathname
    router.push(newPath)
  }

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname.startsWith(href)
  }

  // ── Navigation structure ──────────────────────────────────────
  // Primary: weighted links (Usługi, Blog)
  const primaryNav = [
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/blog`, label: dict.nav.blog },
  ]
  // Secondary: lighter links (O nas, Kontakt)
  const secondaryNav = [
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ]

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HEADER — two-state sticky
          ══════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-[260ms] ease-out ${
          showScrolled
            ? 'bg-white/96 backdrop-blur-md border-b border-gray-100/80 shadow-[0_1px_16px_0_rgba(0,0,0,0.04)]'
            : 'bg-white/0 backdrop-blur-[2px] border-b border-transparent'
        }`}
      >
        <div
          className={`container-base flex items-center justify-between transition-all duration-[260ms] ease-out ${
            showScrolled ? 'h-[72px]' : 'h-[88px]'
          }`}
        >
          {/* Logo */}
          <Link
            href={isEN ? '/en' : '/'}
            className="flex items-center flex-shrink-0 opacity-100 hover:opacity-70 transition-opacity duration-200"
            aria-label="Profitia — strona główna"
          >
            <Image
              src="/logo/profitia-default.svg"
              alt="Profitia"
              width={160}
              height={44}
              priority
              className="h-[42px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Nawigacja główna"
          >
            {/* Primary links */}
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ease-out ${
                  isActive(link.href)
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-gray-800 opacity-30 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}

            {/* Visual separator */}
            <span className="w-px h-3.5 bg-gray-200 mx-0.5" aria-hidden="true" />

            {/* Secondary links */}
            {secondaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13.5px] tracking-[-0.01em] transition-colors duration-200 ease-out ${
                  isActive(link.href)
                    ? 'text-gray-700 font-medium'
                    : 'text-gray-400 hover:text-gray-700 font-normal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: lang switcher + CTA + hamburger */}
          <div className="flex items-center gap-4">

            {/* Language switcher — desktop */}
            <div
              className="hidden md:flex items-center gap-[2px] text-[11.5px]"
              role="group"
              aria-label="Wybór języka"
            >
              <button
                onClick={() => switchLocale('pl')}
                aria-label="Przełącz na język polski"
                aria-pressed={currentLocale === 'pl'}
                className={`px-1 py-0.5 transition-colors duration-150 ease-out leading-none ${
                  currentLocale === 'pl'
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-gray-700 font-normal'
                }`}
              >
                PL
              </button>
              <span className="text-gray-300 select-none leading-none" aria-hidden="true">·</span>
              <button
                onClick={() => switchLocale('en')}
                aria-label="Switch to English"
                aria-pressed={currentLocale === 'en'}
                className={`px-1 py-0.5 transition-colors duration-150 ease-out leading-none ${
                  currentLocale === 'en'
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-gray-700 font-normal'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA — advisory dark graphite */}
            <Link
              href={`${prefix}/contact`}
              className="hidden md:inline-flex items-center justify-center px-4 py-[9px] text-[13px] font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-lg transition-colors duration-200 tracking-[-0.01em]"
            >
              {dict.nav.cta}
            </Link>

            {/* Hamburger / close toggle */}
            <button
              type="button"
              className="md:hidden relative flex items-center justify-center w-8 h-8 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              {/* Hamburger lines */}
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                aria-hidden="true"
                className={`absolute transition-all duration-200 ${mobileOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
              >
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {/* Close X */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className={`absolute transition-all duration-200 ${mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
              >
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE — fullscreen overlay
          ══════════════════════════════════════════════════ */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacyjne"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 md:hidden flex flex-col bg-white transition-all duration-300 ease-out ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex-1 flex flex-col px-6 pt-[100px] pb-10 transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >
          {/* Primary nav links — large editorial typography */}
          <nav
            className="flex-1 flex flex-col justify-center"
            aria-label="Nawigacja mobilna"
          >
            <div className="space-y-0">
              {[...primaryNav, ...secondaryNav].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-2xl font-medium tracking-tight leading-tight transition-colors duration-150 ease-out ${
                    isActive(link.href)
                      ? 'text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom bar */}
          <div className="mt-auto space-y-5 pt-8 border-t border-gray-100">
            {/* Language switcher */}
            <div className="flex items-center gap-[3px]" role="group" aria-label="Wybór języka">
              <button
                onClick={() => switchLocale('pl')}
                aria-pressed={currentLocale === 'pl'}
                aria-label="Przełącz na język polski"
                className={`px-1 py-0.5 text-xs tracking-wide transition-colors duration-150 ease-out ${
                  currentLocale === 'pl' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-700 font-normal'
                }`}
              >
                PL
              </button>
              <span className="text-gray-300 select-none text-xs" aria-hidden="true">·</span>
              <button
                onClick={() => switchLocale('en')}
                aria-pressed={currentLocale === 'en'}
                aria-label="Switch to English"
                className={`px-1 py-0.5 text-xs tracking-wide transition-colors duration-150 ease-out ${
                  currentLocale === 'en' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-gray-700 font-normal'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <Link
              href={`${prefix}/contact`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-4 text-sm font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-xl transition-colors duration-200"
            >
              {dict.nav.cta}
            </Link>

            {/* Contact email */}
            <a
              href="mailto:kontakt@profitia.pl"
              className="block text-center text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              kontakt@profitia.pl
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
