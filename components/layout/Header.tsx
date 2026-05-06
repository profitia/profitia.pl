import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'

type Props = {
  lang: Locale
  dict: Dictionary
}

export default function Header({ lang, dict }: Props) {
  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/services`, label: dict.nav.services },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/blog`, label: dict.nav.blog },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ]

  const altLang = lang === 'pl' ? 'en' : 'pl'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-base flex items-center justify-between h-16">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center" aria-label="Profitia — strona główna">
          <Image
            src="/logo/profitia-default.svg"
            alt="Profitia"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${altLang}`}
            className="text-sm text-gray-500 hover:text-gray-900 uppercase font-medium transition-colors duration-200"
            aria-label={`Switch to ${altLang.toUpperCase()}`}
          >
            {altLang}
          </Link>
          <Link href={`/${lang}/contact`} className="btn-primary hidden md:inline-flex">
            {dict.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  )
}
