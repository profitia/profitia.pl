import type { Locale } from '@/lib/capabilities'
import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import ServicesContainer from './ServicesContainer'
import { PRODUCTS_CATALOG } from './productsCatalog'
import { getPublicPath } from '@/lib/routing/public-routes'
import { PUBLIC_HERO_ASSETS } from '@/lib/presentation/public-hero-assets'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo · Produkty',
      title: 'Autonomiczne produkty dla funkcji zakupowej.',
      subtitle:
        'Od dedykowanego eksperta odpowiedzialnego za konkretny rezultat biznesowy po kompleksową, 3–4-tygodniową diagnozę dojrzałości zakupów i roadmapę dalszego rozwoju.',
    },
    intro: {
      heading: 'Rent an Expert / Buyer',
      body:
        'Nie sprzedajemy wyłącznie doradztwa i rekomendacji, ale dedykowanego eksperta odpowiedzialnego za osiągnięcie konkretnych rezultatów biznesowych. Rozwiązanie jest szczególnie atrakcyjne dla organizacji, które nie mają odpowiednich kompetencji wewnętrznych lub potrzebują czasowego wsparcia bez zwiększania zatrudnienia.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: getPublicPath('contact', 'pl'),
    },
  },
  en: {
    hero: {
      eyebrow: 'Advisory · Products',
      title: 'Standalone products for the procurement function.',
      subtitle:
        'From a dedicated expert accountable for a specific business outcome to a comprehensive 3–4-week procurement maturity assessment and a roadmap for further development.',
    },
    intro: {
      heading: 'Rent an Expert / Buyer',
      body:
        'We do not provide advisory and recommendations alone. We provide a dedicated expert accountable for achieving specific business outcomes. This model is particularly valuable for organisations that lack the required internal capabilities or need temporary support without increasing permanent headcount.',
    },
    cta: {
      note: 'Next step',
      label: 'Schedule a conversation',
      href: getPublicPath('contact', 'en'),
    },
  },
} as const

const SEO = {
  pl: {
    title: 'Produkty | Profitia',
    description: 'Rent an Expert / Buyer i SPOT Check - produkty Profitia wspierające oszczędności, sourcing, organizację, procesy, narzędzia oraz diagnozę dojrzałości funkcji zakupowej.',
  },
  en: {
    title: 'Products | Profitia',
    description: 'Rent an Expert / Buyer and SPOT Check - Profitia products supporting savings, sourcing, organisation, processes, tools, and procurement maturity diagnosis.',
  },
} as const

export default function ProductsPage({ locale }: Props) {
  const c = COPY[locale]
  const seo = SEO[locale]

  return (
    <>
      <PublicJsonLd routeId="products:index" locale={locale} title={seo.title} description={seo.description} />
      <CapabilityHero
        locale={locale}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        imageSrc={PUBLIC_HERO_ASSETS.advisoryProducts}
        imageAlt={locale === 'pl' ? 'Produkty doradcze Profitia' : 'Profitia advisory products'}
        variant="services"
      />

      <div className="container-base pb-20">
        <section className="py-14 border-b border-gray-100">
          <div className="max-w-[52rem] space-y-4">
            <p className="editorial-label text-[rgba(0,109,158,0.8)]">
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
