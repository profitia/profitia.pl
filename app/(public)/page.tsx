import type { Metadata } from 'next'
import { PremiumCard, CTASection } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Lepsze zakupy. Lepsze negocjacje. Lepszy wynik.',
}

const SERVICES = [
  {
    title: 'Optymalizacja zakupów',
    description: 'Analizujemy kategorie kosztowe i identyfikujemy potencjał oszczędnościowy w Twojej firmie.',
    href: '/services',
  },
  {
    title: 'Negocjacje z dostawcami',
    description: 'Przygotowujemy i prowadzimy negocjacje, które przekładają się na realne oszczędności.',
    href: '/services',
  },
  {
    title: 'Strategia sourcingowa',
    description: 'Budujemy strategie zakupowe dopasowane do modelu i skali Twojego biznesu.',
    href: '/services',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="container-base">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
            Negotiation Intelligence
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.06] mb-8 max-w-2xl">
            Lepsze zakupy. Lepsze negocjacje. Lepszy wynik.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-lg">
            Pomagamy firmom obniżać koszty zakupów i budować przewagę w negocjacjach z dostawcami.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/contact" className="btn-primary">
              Porozmawiajmy
            </a>
            <a href="/services" className="btn-secondary">
              Nasze usługi
            </a>
          </div>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50 border-t border-gray-100">
        <div className="container-base">
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
            Co robimy
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-16 max-w-xl">
            Kompleksowe wsparcie zakupowe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((item, i) => (
              <PremiumCard
                key={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
                delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <CTASection
        headline="Gotowy na lepsze wyniki zakupowe?"
        subtitle="Umów krótką rozmowę — pokażemy, gdzie Twoja firma traci i jak to naprawić."
        ctaPrimary={{ label: 'Porozmawiajmy', href: '/contact' }}
        ctaSecondary={{ label: 'Nasze usługi', href: '/services' }}
      />
    </>
  )
}
