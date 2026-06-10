import type { Locale } from '@/lib/capabilities'
import { SERVICE_SECTIONS } from '@/lib/capabilities'
import { CapabilityLayout } from '@/components/capabilities'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Advisory · Negocjacje · Analityka',
      title: 'Budujemy przewagę zakupową poprzez dane, negocjacje i transformację funkcji zakupowej.',
      subtitle:
        'Pracujemy z organizacjami, które chcą odzyskać kontrolę nad kosztami, poprawić pozycję negocjacyjną i budować decyzje zakupowe w oparciu o dane, a nie intuicję.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: '/contact',
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
      href: '/en/contact',
    },
  },
}

/**
 * Editorial breaks - short manifesto statements that interrupt the listing
 * rhythm and signal strategic transitions between practice areas.
 * Max 2 per page. Used sparingly.
 */
const EDITORIAL_BREAKS = [
  {
    afterIndex: 0,
    pl: 'Największe przewagi zakupowe nie wynikają z pojedynczych negocjacji. Powstają z architektury decyzji zakupowych.',
    en: "The greatest procurement advantages don't come from individual negotiations. They emerge from the architecture of procurement decisions.",
  },
  {
    afterIndex: 1,
    pl: 'Dane zakupowe mają wartość dopiero wtedy, gdy zmieniają decyzje.',
    en: 'Procurement data has value only when it changes decisions.',
  },
]

/**
 * ServicesPage
 * ─────────────────────────────────────────────────────────────
 * Institutional advisory capabilities listing.
 * Not a service catalogue. Not a sales landing page.
 * Server Component.
 */
export default function ServicesPage({ locale }: Props) {
  const c = COPY[locale]
  return (
    <CapabilityLayout
      locale={locale}
      prefix="services"
      sections={SERVICE_SECTIONS}
      hero={c.hero}
      cta={c.cta}
      heroVariant="services"
      editorialBreaks={EDITORIAL_BREAKS}
    />
  )
}
