import type { Locale } from '@/lib/capabilities'
import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import ServicesContainer from './ServicesContainer'
import { PRODUCTS_CATALOG } from './productsCatalog'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo · Produkty',
      title: 'Autonomiczne produkty dla funkcji zakupowej.',
      subtitle:
        'Od dedykowanego eksperta odpowiedzialnego za konkretny rezultat biznesowy po szybką diagnozę dojrzałości zakupów i roadmapę dalszego rozwoju.',
    },
    intro: {
      heading: 'Rent an Expert / Buyer',
      body:
        'Nie sprzedajemy wyłącznie doradztwa i rekomendacji, ale dedykowanego eksperta odpowiedzialnego za osiągnięcie konkretnych rezultatów biznesowych. Rozwiązanie jest szczególnie atrakcyjne dla organizacji, które nie mają odpowiednich kompetencji wewnętrznych lub potrzebują czasowego wsparcia bez zwiększania zatrudnienia.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: '/contact',
    },
  },
  en: {
    hero: {
      eyebrow: 'Advisory · Products',
      title: 'Standalone products for the procurement function.',
      subtitle:
        'From a dedicated expert accountable for a specific business outcome to a rapid procurement maturity assessment and a roadmap for further development.',
    },
    intro: {
      heading: 'Rent an Expert / Buyer',
      body:
        'We do not provide advisory and recommendations alone. We provide a dedicated expert accountable for achieving specific business outcomes. This model is particularly valuable for organisations that lack the required internal capabilities or need temporary support without increasing permanent headcount.',
    },
    cta: {
      note: 'Next step',
      label: 'Schedule a conversation',
      href: '/en/contact',
    },
  },
} as const

export default function ProductsPage({ locale }: Props) {
  const c = COPY[locale]

  return (
    <>
      <CapabilityHero
        locale={locale}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        variant="services"
      />

      <div className="container-base pb-20">
        <section className="py-14 border-b border-gray-100">
          <div className="max-w-[52rem] space-y-4">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-[rgba(0,109,158,0.8)]">
              {c.intro.heading}
            </p>
            <p className="text-[15px] text-[rgb(59,56,56)] leading-relaxed">
              {c.intro.body}
            </p>
          </div>
        </section>

        <ServicesContainer domains={PRODUCTS_CATALOG[locale]} />

        <CapabilityCTA locale={locale} note={c.cta.note} label={c.cta.label} href={c.cta.href} />
      </div>
    </>
  )
}