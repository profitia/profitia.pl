import type { Locale } from '@/lib/capabilities'
import { EDUCATION_SECTIONS } from '@/lib/capabilities'
import { CapabilityLayout } from '@/components/capabilities'

interface Props {
  locale: Locale
}

const COPY = {
  pl: {
    hero: {
      eyebrow: 'Programy · Warsztaty · Coaching',
      title: 'Rozwijamy kompetencje zakupowe poprzez praktyczne programy, warsztaty i edukację opartą na realnych negocjacjach.',
      subtitle:
        'Akademia Zakupów, warsztaty negocjacyjne, analityka spend lub program dedykowany — każdy format zaprojektowany z myślą o natychmiastowym zastosowaniu w praktyce.',
    },
    cta: {
      note: 'Następny krok',
      label: 'Zapytaj o program',
      href: '/contact',
    },
  },
  en: {
    hero: {
      eyebrow: 'Programmes · Workshops · Coaching',
      title: 'We develop procurement capabilities through practical programmes, workshops and negotiation-based learning.',
      subtitle:
        'Procurement Academy, negotiation workshops, spend analytics or a custom programme — every format designed for immediate practical application.',
    },
    cta: {
      note: 'Next step',
      label: 'Ask about a programme',
      href: '/en/contact',
    },
  },
}

/**
 * EducationPage
 * ─────────────────────────────────────────────────────────────
 * Executive procurement education platform listing.
 * Not a course catalogue. Not a training menu.
 * Server Component.
 */
export default function EducationPage({ locale }: Props) {
  const c = COPY[locale]
  return (
    <CapabilityLayout
      locale={locale}
      prefix="education"
      sections={EDUCATION_SECTIONS}
      hero={c.hero}
      cta={c.cta}
    />
  )
}
