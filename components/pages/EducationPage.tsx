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
 * Academy learning philosophy — rendered once, between hero and first track.
 * Positions the education offer as institutional capability development,
 * not a training catalogue.
 */
const PHILOSOPHY = {
  pl: 'Nowoczesne zakupy wymagają nie tylko wiedzy operacyjnej, ale zdolności podejmowania decyzji w środowisku zmienności, presji kosztowej i ryzyka dostaw.',
  en: 'Modern procurement demands not just operational knowledge, but the capacity to make decisions in environments of volatility, cost pressure and supply risk.',
}

/**
 * Editorial breaks — signal strategic transitions between learning tracks.
 */
const EDITORIAL_BREAKS = [
  {
    afterIndex: 1,
    pl: 'Technika negocjacji jest narzędziem. Jej wartość zależy od głębokości analizy, którą ją poprzedza.',
    en: 'Negotiation technique is a tool. Its value depends on the depth of analysis that precedes it.',
  },
]

/**
 * EducationPage
 * ─────────────────────────────────────────────────────────────
 * Executive procurement academy — not a course catalogue.
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
      heroVariant="education"
      philosophyStatement={PHILOSOPHY}
      editorialBreaks={EDITORIAL_BREAKS}
    />
  )
}
