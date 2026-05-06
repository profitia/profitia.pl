import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'

type Props = {
  lang: Locale
  dict: Dictionary
}

export default function Footer({ lang, dict }: Props) {
  return (
    <footer style={{ backgroundColor: '#242F44' }} className="text-white">
      <div className="container-base py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href={`/${lang}`} className="inline-block mb-5" aria-label="Profitia">
              <Image
                src="/logo/profitia-white.svg"
                alt="Profitia"
                width={110}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
              {dict.site.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-5">
              {dict.footer.navigation}
            </div>
            <nav className="space-y-3">
              {[
                { href: `/${lang}`, label: dict.nav.home },
                { href: `/${lang}/services`, label: dict.nav.services },
                { href: `/${lang}/about`, label: dict.nav.about },
                { href: `/${lang}/blog`, label: dict.nav.blog },
                { href: `/${lang}/contact`, label: dict.nav.contact },
              ].map((link) => (
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
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-5">
              {dict.footer.contact}
            </div>
            <div className="text-sm text-gray-400 space-y-2.5">
              <p>ul. Przykładowa 1, 00-001 Warszawa</p>
              <p>biuro@profitia.pl</p>
              <p>+48 22 000 00 00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-xs text-gray-600 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Profitia. {dict.footer.rights}</span>
          <div className="flex gap-5">
            <Link href={`/${lang}/privacy`} className="hover:text-gray-400 transition-colors duration-200">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
