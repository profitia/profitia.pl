'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import plDict from '@/dictionaries/pl.json'
import enDict from '@/dictionaries/en.json'
import { ProtectedEmail, ProtectedPhone, ProtectedPerson } from '@/components/security'
import { useConsent } from '@/components/consent'

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function Footer() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const dict = isEN ? enDict : plDict
  const prefix = isEN ? '/en' : ''
  const { openModal } = useConsent()

  // ── Legal pages skip the newsletter section ────────────────────
  const isLegalPage = ['/privacy', '/cookies', '/terms'].some(
    (p) => pathname === p || pathname === `/en${p}`
  )
  // Article pages: inline newsletter present — suppress footer newsletter
  // and use compressed footer rhythm
  const isArticlePage = /^(\/en)?\/blog\/[^/]+/.test(pathname)
  const NAV_LINKS = [
    { href: isEN ? '/en' : '/', label: dict.nav.home },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/blog`, label: dict.nav.blog },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/contact`, label: dict.nav.contact },
    { href: `${prefix}/privacy`, label: dict.footer.privacy },
  ]

  return (
    <footer className="bg-white border-t border-gray-100">

      {/* ══════════════════════════════════════════════════
          SECTION 1 — NEWSLETTER
          ══════════════════════════════════════════════════ */}
      {!isLegalPage && !isArticlePage && (
      <div className="border-b border-gray-100">
        <div className="container-base py-12 grid md:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 items-center">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">
              {dict.footer.newsletter.eyebrow}
            </p>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug max-w-sm">
              {dict.footer.newsletter.heading}
            </h3>
            <p className="text-sm text-gray-500 mt-3 max-w-xs leading-relaxed">
              {dict.footer.newsletter.sub}
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label="Newsletter"
            >
              <input
                type="email"
                required
                placeholder={dict.footer.newsletter.placeholder}
                aria-label={dict.footer.newsletter.placeholder}
                className="flex-1 min-w-0 px-4 py-3.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-500 transition-colors duration-200 ease-out"
              />
              <button
                type="submit"
                className="px-5 py-3.5 text-sm font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-lg transition-colors duration-200 ease-out whitespace-nowrap"
              >
                {dict.footer.newsletter.button}
              </button>
            </form>
          </div>
        </div>
      </div>
      )}

      {/* ══════════════════════════════════════════════════
          SECTION 2 — MAIN FOOTER GRID
          ══════════════════════════════════════════════════ */}
      <div className={`container-base ${isArticlePage ? 'py-10' : 'py-16'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1: Brand / Trust */}
          <div>
            <Link
              href={isEN ? '/en' : '/'}
              className="inline-block mb-5 opacity-100 hover:opacity-70 transition-opacity duration-200 ease-out"
              aria-label="Profitia"
            >
              <Image
                src="/logo/profitia-default.svg"
                alt="Profitia"
                width={140}
                height={38}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-gray-600 leading-relaxed mb-3">
              Profitia Management Consultants<br />
              Mazurowski i Wspólnicy Sp. J.
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
              Negotiations Intelligence · Data-driven Procurement ·{' '}
              Certyfikowany Partner CIPS w Polsce · Doradztwo · Szkolenia · Analityka zakupowa
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-6">
              02-715 Warszawa, Villa Metro<br />
              ul. Puławska 145, V p.
            </p>
            <a
              href="https://cipsdistancelearning.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CIPS Centre of Excellence"
              className="inline-block opacity-50 hover:opacity-80 transition-opacity duration-200 ease-out"
            >
              <Image
                src="https://cipsdistancelearning.com/wp-content/uploads/2022/07/CIPS_Centre-Excellence_Logo_2022.png"
                alt="CIPS Centre of Excellence"
                width={96}
                height={38}
                className="h-9 w-auto grayscale"
              />
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-5">
              {dict.footer.navigation}
            </p>
            <nav className="space-y-2.5" aria-label="Nawigacja stopki">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-5">
              {dict.footer.contact}
            </p>
            <div className="space-y-5 text-sm">

              {/* Main contact */}
              <div className="space-y-1">
                <ProtectedPhone
                  parts={['+48', '533', '747', '340']}
                  display="+48 533 747 340"
                  className="block text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                />
                <ProtectedEmail
                  user="kontakt"
                  domain="profitia.pl"
                  className="block text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                />
              </div>

              {/* Training */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                  {dict.footer.contactTraining}
                </p>
                <ProtectedPerson
                  name="Agnieszka Tworzyńska"
                  className="text-gray-700 font-medium text-xs mb-1"
                />
                <div className="space-y-0.5">
                  <ProtectedEmail
                    user="agnieszka.tworzynska"
                    domain="profitia.pl"
                    className="block text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                  />
                  <ProtectedPhone
                    parts={['+48', '572', '001', '381']}
                    display="+48 572 001 381"
                    className="block text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                  />
                </div>
              </div>

              {/* SpendGuru */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400 mb-1.5">
                  {dict.footer.contactSpendGuru}
                </p>
                <ProtectedPerson
                  name="Tomasz Uściński"
                  className="text-gray-700 font-medium text-xs mb-1"
                />
                <div className="space-y-0.5">
                  <ProtectedEmail
                    user="tomasz.uscinski"
                    domain="profitia.pl"
                    className="block text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                  />
                  <ProtectedPhone
                    parts={['+48', '787', '417', '293']}
                    display="+48 787 417 293"
                    className="block text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Resources + Social */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-5">
              {dict.footer.resources}
            </p>
            <div className="space-y-3 mb-10">
              <a
                href="https://profitia.pl/images/pedp/PEDP-2026-CIPS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out"
              >
                PEDP — broszura informacyjna ↗
              </a>
              <a
                href="https://profitia.pl/images/profitia/cips-globalstandard_2017_pl.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 ease-out leading-snug"
              >
                Globalny Standard w Zakupach i Łańcuchu Dostaw ↗
              </a>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/profitia-management-consultants"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profitia na LinkedIn"
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-900 transition-colors duration-200 ease-out"
              >
                <IconLinkedIn />
              </a>
              <a
                href="https://www.facebook.com/profitiakariera/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profitia na Facebook"
                className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-900 transition-colors duration-200 ease-out"
              >
                <IconFacebook />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          SECTION 3 — LEGAL BAR
          ══════════════════════════════════════════════════ */}
      <div className="border-t border-gray-100">
        <div className={`container-base ${isArticlePage ? 'py-4' : 'py-5'} flex items-center justify-between gap-4 flex-wrap`}>
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} Profitia Management Consultants. {dict.footer.rights}
          </span>
          <button
            onClick={openModal}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out whitespace-nowrap"
          >
            {dict.footer.privacySettings}
          </button>
        </div>
      </div>

    </footer>
  )
}
