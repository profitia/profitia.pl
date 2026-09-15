import type { Locale } from '@/lib/capabilities'
import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import { PublicJsonLd } from '@/components/seo/PublicJsonLd'
import ServicesContainer from './ServicesContainer'
import { SERVICES_CATALOG } from './servicesCatalog'
import { getPublicPath } from '@/lib/routing/public-routes'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo · Oszczędności · Negocjacje',
      title: 'Budujemy przewagę zakupową poprzez dane, negocjacje i transformację funkcji zakupowej.',
      subtitle:
        'Pracujemy z organizacjami, które chcą odzyskać kontrolę nad kosztami, poprawić pozycję negocjacyjną i budować decyzje zakupowe w oparciu o dane, a nie intuicję.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: getPublicPath('contact', 'pl'),
    },
  },
  en: {
    hero: {
      eyebrow: 'Advisory · Negotiations · Analytics',
      title: 'We help procurement teams build leverage through intelligence, negotiations and operating transformation.',
      subtitle:
        'We work with organisations that want to regain control over costs, improve their negotiation position and build procurement decisions on data - not intuition.',
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
    title: 'Usługi | Profitia',
    description: 'Doradztwo zakupowe, negocjacje, analityka spend i transformacja funkcji zakupowej. Advisory capabilities dla organizacji budujących trwałą przewagę kosztową.',
  },
  en: {
    title: 'Services | Profitia',
    description: 'Procurement advisory, negotiations, spend analytics and procurement transformation. Advisory capabilities for organisations building lasting cost advantage.',
  },
} as const

export default function ServicesPage({ locale }: Props) {
  const c = COPY[locale]
  const seo = SEO[locale]

  return (
    <>
      <PublicJsonLd routeId="services:index" locale={locale} title={seo.title} description={seo.description} />
      <CapabilityHero
        locale={locale}
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        subtitle={c.hero.subtitle}
        variant="services"
      />

      <div className="container-base pb-20">
        <ServicesContainer domains={SERVICES_CATALOG[locale]} />

        <CapabilityCTA
          locale={locale}
          note={c.cta.note}
          label={c.cta.label}
          href={c.cta.href}
        />
      </div>
    </>
  )
}