import type { Locale } from '@/lib/capabilities'
import { CapabilityCTA, CapabilityHero } from '@/components/capabilities'
import ServicesContainer from './ServicesContainer'
import { SERVICES_CATALOG } from './servicesCatalog'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Doradztwo · Struktura · Proces · Narzędzia',
      title: 'Usługi uporządkowane według domen, produktów i zakresu wsparcia.',
      subtitle:
        'Prezentujemy katalog usług bez przechodzenia do osobnych stron produktowych. Każdą domenę można rozwinąć do poziomu konkretnego produktu i zakresu prac.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Umów rozmowę',
      href: '/contact',
    },
  },
  en: {
    hero: {
      eyebrow: 'Advisory · Organisation · Process · Tools',
      title: 'Services organised by domain, product and scope of support.',
      subtitle:
        'We present the service catalogue without sending visitors to separate product pages. Each domain can be expanded down to the exact product and scope of work.',
    },
    cta: {
      note: 'Next step',
      label: 'Schedule a conversation',
      href: '/en/contact',
    },
  },
} as const

export default function ServicesPage({ locale }: Props) {
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