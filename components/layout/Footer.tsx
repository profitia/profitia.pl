import Link from 'next/link'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'

type Props = {
  lang: Locale
  dict: Dictionary
}

export default function Footer({ lang, dict }: Props) {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container-base py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-heading font-bold mb-3">Profitia</div>
            <p className="text-blue-200 text-sm leading-relaxed">
              {dict.site.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-semibold mb-4">{dict.footer.navigation}</div>
            <nav className="space-y-2">
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
                  className="block text-sm text-blue-200 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="font-semibold mb-4">{dict.footer.contact}</div>
            <div className="text-sm text-blue-200 space-y-2">
              <p>ul. Przykładowa 1, 00-001 Warszawa</p>
              <p>biuro@profitia.pl</p>
              <p>+48 22 000 00 00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 text-sm text-blue-300 flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Profitia. {dict.footer.rights}</span>
          <div className="flex gap-4">
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
