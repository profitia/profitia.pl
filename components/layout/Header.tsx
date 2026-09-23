'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import plDict from '@/dictionaries/pl.json'
import enDict from '@/dictionaries/en.json'
import { useLanguageNavigation } from './LanguageNavigationProvider'
import { resolveLanguageSwitchPath } from '@/lib/articles/language-navigation'
import { getPublicPath } from '@/lib/routing/public-routes'
import {
  HEADER_MENU_CONTENT,
  type HeaderMenuContent,
  type HeaderMenuId,
  type HeaderMenuItemContent,
} from '@/lib/navigation/header-menu-content'

const LOCALE_COOKIE = 'PROFITIA_LOCALE'
const HEADER_SURFACE_CLASS = 'bg-[rgba(255,255,255,0.96)] backdrop-blur-md border-gray-100/80'
const MEGA_MENU_SURFACE_CLASS = 'bg-white'
const HEADER_RESPONSIVE_CLASSES = {
  desktopNav: 'hidden lg:flex items-center gap-4 lg:gap-6',
  desktopLanguage: 'hidden lg:flex items-center gap-[2px] text-[11.5px]',
  desktopCta:
    'hidden lg:inline-flex items-center justify-center rounded-lg bg-gray-900 px-3 py-[9px] text-[12.5px] font-medium tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-brand-blue lg:px-4 lg:text-[13px]',
  mobileToggle:
    'lg:hidden relative flex items-center justify-center w-8 h-8 text-gray-700 hover:text-brand-blue transition-colors duration-200',
  mobilePanel:
    'fixed inset-0 z-40 lg:hidden flex flex-col overflow-y-auto overscroll-contain touch-pan-y bg-white transition-all duration-300 ease-out [-webkit-overflow-scrolling:touch]',
} as const

type DesktopMenuId = HeaderMenuId | null

type HeaderMenuLink = HeaderMenuItemContent & {
  href: string
}

type HeaderMenuDefinition = Omit<HeaderMenuContent, 'items'> & {
  id: HeaderMenuId
  links: HeaderMenuLink[]
  isLinkActive: (href: string, pathname: string) => boolean
}

export default function Header({ localeOverride }: { localeOverride?: 'pl' | 'en' } = {}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenuId>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const desktopNavRef = useRef<HTMLElement | null>(null)
  const desktopMenuTriggerRefs = useRef<Record<HeaderMenuId, HTMLButtonElement | null>>({ advisory: null, 'digital-services': null })
  const firstDesktopLinkRefs = useRef<Record<HeaderMenuId, HTMLAnchorElement | null>>({ advisory: null, 'digital-services': null })
  const menuToFocusRef = useRef<HeaderMenuId | null>(null)
  const { languagePaths } = useLanguageNavigation()

  const isEN = localeOverride ? localeOverride === 'en' : pathname.startsWith('/en')
  const currentLocale = isEN ? 'en' : 'pl'
  const dict = isEN ? enDict : plDict
  const servicesHref = getPublicPath('services:index', currentLocale)
  const productsHref = getPublicPath('products:index', currentLocale)
  const educationHref = getPublicPath('education:index', currentLocale)
  const careerHref = getPublicPath('career:index', currentLocale)
  const aboutHref = getPublicPath('about', currentLocale)
  const contactHref = getPublicPath('contact', currentLocale)
  const spotHref = getPublicPath('service:analiza-spot', currentLocale)
  const homeHref = getPublicPath('home', currentLocale)
  const blogHref = isEN ? '/en/blog' : '/blog'
  const menuContent = HEADER_MENU_CONTENT[currentLocale]
  const resolveMenuLinks = (menu: HeaderMenuContent): HeaderMenuLink[] => menu.items.map((item) => ({
    ...item,
    href: getPublicPath(item.routeId, currentLocale),
  }))
  const advisoryLinks = resolveMenuLinks(menuContent.advisory)
  const digitalServiceLinks = resolveMenuLinks(menuContent['digital-services'])
  const isAdvisoryLinkActive = (href: string, currentPath: string) => {
    if (href === spotHref) {
      return currentPath === spotHref
    }

    if (href === servicesHref) {
      return currentPath === href || (currentPath.startsWith(`${href}/`) && currentPath !== spotHref)
    }

    if (href === productsHref) {
      return currentPath === href || currentPath.startsWith(`${href}/`)
    }

    return currentPath === href || currentPath.startsWith(`${href}/`)
  }
  const isDigitalServiceLinkActive = (href: string, currentPath: string) => currentPath === href || currentPath.startsWith(`${href}/`)
  const desktopMenus: HeaderMenuDefinition[] = [
    {
      id: 'advisory',
      ...menuContent.advisory,
      links: advisoryLinks,
      isLinkActive: isAdvisoryLinkActive,
    },
    {
      id: 'digital-services',
      ...menuContent['digital-services'],
      links: digitalServiceLinks,
      isLinkActive: isDigitalServiceLinkActive,
    },
  ]
  const isMenuActive = (menu: HeaderMenuDefinition) => menu.links.some((link) => menu.isLinkActive(link.href, pathname))
  const activeDesktopMenu = openDesktopMenu
    ? desktopMenus.find((menu) => menu.id === openDesktopMenu)
    : undefined

  // ── Legal pages always show the scrolled (stable) header ──────
  const isLegalPage = [
    getPublicPath('privacy', 'pl'),
    getPublicPath('privacy', 'en'),
    getPublicPath('cookies', 'pl'),
    getPublicPath('cookies', 'en'),
    getPublicPath('terms', 'pl'),
    getPublicPath('terms', 'en'),
  ].includes(pathname)
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

  useEffect(() => {
    if (!openDesktopMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        desktopMenuTriggerRefs.current[openDesktopMenu]?.focus()
        setOpenDesktopMenu(null)
      }
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setOpenDesktopMenu(null)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [openDesktopMenu])

  useEffect(() => {
    if (!openDesktopMenu || menuToFocusRef.current !== openDesktopMenu) return

    menuToFocusRef.current = null
    firstDesktopLinkRefs.current[openDesktopMenu]?.focus()
  }, [openDesktopMenu])

  // ── Lock body scroll when menu open ──────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // ── Close on route change ─────────────────────────────────────
  useEffect(() => {
    setMobileOpen(false)
    setOpenDesktopMenu(null)
  }, [pathname])

  // ── Locale switch ─────────────────────────────────────────────
  const switchLocale = (locale: 'pl' | 'en') => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`
    const newPath = resolveLanguageSwitchPath(locale, pathname, isEN, languagePaths)
    router.push(newPath)
  }

  const isActive = (href: string) => {
    if (href === '/' || href === '/en') return pathname === href
    return pathname.startsWith(href)
  }

  // ── Navigation structure ──────────────────────────────────────
  // Primary order requested by design pass.
  const primaryNav = [
    { href: educationHref, label: dict.nav.education },
    { href: careerHref, label: dict.nav.career },
    ...(!isEN ? [{ href: blogHref, label: dict.nav.blog }] : []),
    { href: aboutHref, label: dict.nav.about },
  ]
  const secondaryNav = [
    { href: contactHref, label: dict.nav.contact },
  ]
  const focusFirstDesktopLink = (menuId: HeaderMenuId) => {
    menuToFocusRef.current = menuId
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════
          HEADER - two-state sticky
          ══════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-[260ms] ease-out ${
          showScrolled
            ? `${HEADER_SURFACE_CLASS} border-b shadow-[0_1px_16px_0_rgba(0,0,0,0.04)]`
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
            href={homeHref}
            className="flex items-center flex-shrink-0 opacity-100 hover:opacity-70 transition-opacity duration-200"
            aria-label={isEN ? 'Profitia - home' : 'Profitia - strona główna'}
          >
            <Image
              src="/logo/profitia-default.svg"
              alt="Profitia"
              width={192}
              height={53}
              priority
              className="h-[50px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav
            ref={desktopNavRef}
            className={`${HEADER_RESPONSIVE_CLASSES.desktopNav} relative h-full`}
            aria-label={isEN ? 'Main navigation' : 'Nawigacja główna'}
            onMouseLeave={() => setOpenDesktopMenu(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setOpenDesktopMenu(null)
              }
            }}
          >
            {desktopMenus.map((menu) => {
              const menuOpen = openDesktopMenu === menu.id
              const menuActive = isMenuActive(menu)

              return (
                <div
                  key={menu.id}
                  className="flex h-full items-center"
                  onMouseEnter={() => setOpenDesktopMenu(menu.id)}
                >
                  <button
                    ref={(node) => { desktopMenuTriggerRefs.current[menu.id] = node }}
                    id={`desktop-menu-trigger-${menu.id}`}
                    type="button"
                    className={`relative inline-flex items-center gap-1 text-[13px] lg:text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ease-out ${
                      menuActive || menuOpen ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,109,158)] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md`}
                    aria-expanded={menuOpen}
                    aria-controls={`desktop-menu-${menu.id}`}
                    onClick={() => setOpenDesktopMenu((current) => current === menu.id ? null : menu.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setOpenDesktopMenu(null)
                        return
                      }

                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setOpenDesktopMenu(menu.id)
                        focusFirstDesktopLink(menu.id)
                        return
                      }

                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        if (menuOpen) {
                          setOpenDesktopMenu(null)
                        } else {
                          setOpenDesktopMenu(menu.id)
                          focusFirstDesktopLink(menu.id)
                        }
                      }
                    }}
                  >
                    {menu.label}
                    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-3.5 w-3.5 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`}>
                      <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {menuActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-blue opacity-40 rounded-full" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )
            })}

            {activeDesktopMenu && (
              <div
                id={`desktop-menu-${activeDesktopMenu.id}`}
                className="absolute left-0 top-full z-50"
              >
                <div
                  role="group"
                  aria-labelledby={`desktop-menu-trigger-${activeDesktopMenu.id}`}
                  className={`max-w-[calc(100vw-2rem)] overflow-hidden rounded-b-2xl ${MEGA_MENU_SURFACE_CLASS} shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${
                    activeDesktopMenu.desktopColumns === 3 ? 'w-[760px]' : 'w-[510px]'
                  }`}
                >
                  <div className="px-5 py-4">
                    <p className="editorial-label text-[rgba(0,109,158,0.82)]">
                      {activeDesktopMenu.label}
                    </p>
                    <p className="mt-1.5 text-[18px] font-medium tracking-[-0.025em] text-[rgb(36,47,68)]">
                      {activeDesktopMenu.heading}
                    </p>
                  </div>

                  <div className={`grid justify-center gap-1.5 p-2 ${
                    activeDesktopMenu.desktopColumns === 3
                      ? 'grid-cols-[repeat(3,244px)]'
                      : 'grid-cols-[repeat(2,244px)]'
                  }`}>
                    {activeDesktopMenu.links.map((link, index) => (
                      <Link
                        key={link.href}
                        ref={index === 0 ? (node) => { firstDesktopLinkRefs.current[activeDesktopMenu.id] = node } : undefined}
                        href={link.href}
                        className={`group flex h-[244px] w-[244px] min-w-0 flex-col rounded-xl p-2.5 transition-colors duration-200 ${
                          activeDesktopMenu.isLinkActive(link.href, pathname)
                            ? 'bg-[rgba(199,237,251,0.45)]'
                            : 'hover:bg-gray-50'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,109,158)] focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
                      >
                        <div className="relative mx-auto aspect-[16/9] w-[216px] flex-none overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={link.imageSrc}
                            alt={link.imageAlt}
                            fill
                            sizes="216px"
                            className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                          />
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col px-0.5 pb-0.5 pt-3">
                          <div className={`flex min-h-[22px] items-center gap-2 text-[14px] font-medium tracking-[-0.015em] ${
                            activeDesktopMenu.isLinkActive(link.href, pathname)
                              ? 'text-brand-blue'
                              : 'text-[rgb(36,47,68)] group-hover:text-brand-blue'
                          }`}>
                            <span className="line-clamp-1">{link.label}</span>
                            <span className="text-brand-blue transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">→</span>
                          </div>
                          <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-[1.55] text-gray-500">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Primary links */}
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenDesktopMenu(null)}
                className={`relative text-[13px] lg:text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ease-out ${
                  isActive(link.href)
                    ? 'text-brand-blue'
                    : 'text-gray-500 hover:text-brand-blue'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-px bg-brand-blue opacity-40 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            ))}

            {/* Visual separator */}
            <span className="mx-0 h-3.5 w-px bg-gray-200 lg:mx-0.5" aria-hidden="true" />

            {/* Secondary links */}
            {secondaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setOpenDesktopMenu(null)}
                className={`text-[13px] lg:text-[13.5px] tracking-[-0.01em] transition-colors duration-200 ease-out ${
                  isActive(link.href)
                    ? 'text-brand-blue font-medium'
                    : 'text-gray-500 hover:text-brand-blue font-normal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: lang switcher + CTA + hamburger */}
          <div className="flex items-center gap-3 lg:gap-4">

            {/* Language switcher - desktop */}
            <div
              className={HEADER_RESPONSIVE_CLASSES.desktopLanguage}
              role="group"
              aria-label={isEN ? 'Language selection' : 'Wybór języka'}
            >
              <button
                onClick={() => switchLocale('pl')}
                aria-label={isEN ? 'Switch to Polish' : 'Przełącz na język polski'}
                aria-pressed={currentLocale === 'pl'}
                className={`px-1 py-0.5 transition-colors duration-150 ease-out leading-none ${
                  currentLocale === 'pl'
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-brand-blue font-normal'
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
                    : 'text-gray-400 hover:text-brand-blue font-normal'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA - advisory dark graphite */}
            <Link
              href={getPublicPath('contact', currentLocale)}
              className={HEADER_RESPONSIVE_CLASSES.desktopCta}
            >
              {dict.nav.cta}
            </Link>

            {/* Hamburger / close toggle */}
            <button
              type="button"
              className={HEADER_RESPONSIVE_CLASSES.mobileToggle}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? (isEN ? 'Close menu' : 'Zamknij menu') : (isEN ? 'Open menu' : 'Otwórz menu')}
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
          MOBILE - fullscreen overlay
          ══════════════════════════════════════════════════ */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label={isEN ? 'Navigation menu' : 'Menu nawigacyjne'}
        aria-hidden={!mobileOpen}
        className={`${HEADER_RESPONSIVE_CLASSES.mobilePanel} ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`min-h-full flex-none flex flex-col px-6 pt-[100px] pb-10 transition-transform duration-300 ease-out ${
            mobileOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >
          {/* Primary nav links - large editorial typography */}
          <nav
            className="flex-1 flex flex-col justify-center"
            aria-label={isEN ? 'Mobile navigation' : 'Nawigacja mobilna'}
          >
            <div className="space-y-0">
              {desktopMenus.map((menu) => (
                <div key={menu.id} className="py-3 first:pt-0">
                  <p className={`text-2xl font-medium tracking-tight leading-tight ${isMenuActive(menu) ? 'text-brand-blue' : 'text-gray-700'}`}>
                    {menu.label}
                  </p>
                  <div className="mt-3 space-y-1 pl-5 border-l border-gray-100">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block py-2 text-lg font-medium tracking-tight leading-tight transition-colors duration-150 ease-out ${
                          menu.isLinkActive(link.href, pathname)
                            ? 'text-brand-blue'
                            : 'text-gray-600 hover:text-brand-blue'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(0,109,158)] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md`}
                      >
                        <span className="block">{link.label}</span>
                        <span className={`mt-1.5 block max-w-[30rem] text-[13px] font-normal leading-relaxed ${
                          menu.isLinkActive(link.href, pathname)
                            ? 'text-brand-blue/80'
                            : 'text-gray-500'
                        }`}>
                          {link.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-2xl font-medium tracking-tight leading-tight transition-colors duration-150 ease-out ${
                    isActive(link.href)
                      ? 'text-brand-blue'
                      : 'text-gray-700 hover:text-brand-blue'
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
            <div className="flex items-center gap-[3px]" role="group" aria-label={isEN ? 'Language selection' : 'Wybór języka'}>
              <button
                onClick={() => switchLocale('pl')}
                aria-pressed={currentLocale === 'pl'}
                aria-label={isEN ? 'Switch to Polish' : 'Przełącz na język polski'}
                className={`px-1 py-0.5 text-xs tracking-wide transition-colors duration-150 ease-out ${
                  currentLocale === 'pl' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-brand-blue font-normal'
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
                  currentLocale === 'en' ? 'text-gray-900 font-semibold' : 'text-gray-400 hover:text-brand-blue font-normal'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <Link
              href={getPublicPath('contact', currentLocale)}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-4 text-sm font-medium text-white bg-gray-900 hover:bg-brand-blue rounded-xl transition-colors duration-200"
            >
              {dict.nav.cta}
            </Link>

            {/* Contact email */}
            <a
              href="mailto:kontakt@profitia.pl"
              className="block text-center text-xs text-gray-500 hover:text-brand-blue transition-colors duration-150"
            >
              kontakt@profitia.pl
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
