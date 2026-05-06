import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/', label: 'Strona główna' },
  { href: '/services', label: 'Usługi' },
  { href: '/about', label: 'O nas' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#242F44' }} className="text-white">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-6" aria-label="Profitia">
              <Image
                src="/logo/profitia-white.svg"
                alt="Profitia"
                width={165}
                height={45}
                className="h-[42px] w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[220px]">
              Doradztwo zakupowe i negocjacyjne dla firm, które chcą budować trwałą przewagę kosztową.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-6">
              Nawigacja
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
              Kontakt
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
          <span>© {new Date().getFullYear()} Profitia. Wszelkie prawa zastrzeżone.</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors duration-200">
              Polityka prywatności
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
