'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import plDict from '@/dictionaries/pl.json'
import enDict from '@/dictionaries/en.json'

export default function Footer() {
  const pathname = usePathname()
  const isEN = pathname.startsWith('/en')
  const dict = isEN ? enDict : plDict
  const prefix = isEN ? '/en' : ''

  const NAV_LINKS = [
    { href: isEN ? '/en' : '/', label: dict.nav.home },
    { href: `${prefix}/services`, label: dict.nav.services },
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/blog`, label: dict.nav.blog },
    { href: `${prefix}/contact`, label: dict.nav.contact },
  ]

  return (
    <footer style={{ backgroundColor: '#242F44' }} className="text-white">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href={isEN ? '/en' : '/'} className="inline-block mb-6" aria-label="Profitia">
              <Image
                src="/logo/profitia-white.svg"
                alt="Profitia"
                width={165}
                height={45}
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">
              {dict.footer.navigation}
            </div>
            <nav className="space-y-3" aria-label="Nawigacja stopki">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">
              {dict.footer.contact}
            </div>
            <div className="text-sm text-gray-400 space-y-3">
              <p>
                <a href="mailto:biuro@profitia.pl" className="hover:text-white transition-colors duration-200">
                  biuro@profitia.pl
                </a>
              </p>
              <p>
                <a href="tel:+48787417293" className="hover:text-white transition-colors duration-200">
                  +48 787 417 293
                </a>
              </p>
              <p className="text-gray-500">Warszawa, Polska</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 mt-14 pt-6 text-xs text-gray-600 flex flex-col md:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} Profitia. {dict.footer.rights}</span>
          <div className="flex gap-5">
            <Link href={`${prefix}/privacy`} className="hover:text-gray-400 transition-colors duration-200">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
