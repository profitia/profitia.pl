import type { Capability, Locale } from '@/lib/capabilities'
import { CAPABILITIES, SERVICE_SECTIONS } from '@/lib/capabilities'
import { CapabilityLayout } from '@/components/capabilities'

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
  const visibleSections = SERVICE_SECTIONS.slice(0, 1).map((section) => ({
    ...section,
    eyebrow: { pl: '', en: '' },
  }))

  const serviceList = [
    { slug: 'analiza-spot', title: { pl: 'Analiza SPOT', en: 'SPOT Analysis' } },
    { slug: 'procurement-pmo', title: { pl: 'Oszczędności', en: 'Savings' } },
    { slug: 'negotiation-preparation', title: { pl: 'Negocjacje', en: 'Negotiations' } },
    { slug: 'category-strategy', title: { pl: 'Zarządzanie kategoriami', en: 'Category Management' } },
    { slug: 'interim-management', title: { pl: 'Rent an Expert', en: 'Rent an Expert' } },
  ] as const

  const advisoryCapabilities = serviceList.reduce<Capability[]>((acc, { slug, title }) => {
    const capability = CAPABILITIES.find((item) => item.slug === slug)

    if (!capability) return acc

    acc.push({
      ...capability,
      title,
    })

    return acc
  }, [])

  return (
    <CapabilityLayout
      locale={locale}
      prefix="services"
      sections={visibleSections}
      sectionCapabilities={{ advisory: advisoryCapabilities }}
      hero={c.hero}
      cta={c.cta}
      heroVariant="services"
      editorialBreaks={[]}
    />
  )
}
