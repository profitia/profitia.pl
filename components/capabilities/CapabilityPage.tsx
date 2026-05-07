import type { Capability, Locale } from '@/lib/capabilities'
import { t, getRelatedCapabilities } from '@/lib/capabilities'
import CapabilityDetail from './CapabilityDetail'
import CapabilityOutcome from './CapabilityOutcome'
import CapabilityMethodology from './CapabilityMethodology'
import CapabilityEngagement from './CapabilityEngagement'
import CapabilityRelated from './CapabilityRelated'
import CapabilityCTA from './CapabilityCTA'

interface Props {
  capability: Capability
  locale: Locale
  prefix: 'services' | 'education'
}

const COPY = {
  pl: {
    whatItSolves: { eyebrow: 'Problem', title: 'Co rozwiązujemy' },
    methodology: { eyebrow: 'Podejście', title: 'Jak pracujemy' },
    outcomes: { eyebrow: 'Efekty', title: 'Measurable outcomes' },
    engagement: { eyebrow: 'Format', title: 'Typowe zaangażowanie' },
    related: { eyebrow: 'Zobacz też', title: 'Powiązane obszary' },
    cta: { note: 'Następny krok', href: '/contact' },
  },
  en: {
    whatItSolves: { eyebrow: 'Problem', title: 'What we solve' },
    methodology: { eyebrow: 'Approach', title: 'How we work' },
    outcomes: { eyebrow: 'Results', title: 'Measurable outcomes' },
    engagement: { eyebrow: 'Format', title: 'Typical engagement' },
    related: { eyebrow: 'See also', title: 'Related areas' },
    cta: { note: 'Next step', href: '/en/contact' },
  },
}

/**
 * CapabilityPage
 * ─────────────────────────────────────────────────────────────
 * Canonical detail page template for both services and education.
 * Sections: Detail hero → What it solves → How we work →
 *           Outcomes → Engagement → Related → CTA
 *
 * Editorial institution paper feel.
 * No landing page patterns, no animated counters, no icon grids.
 */
export default function CapabilityPage({ capability, locale, prefix }: Props) {
  const c = COPY[locale]
  const related = getRelatedCapabilities(capability.slug)
  const ctaLabel = t(capability.ctaLabel, locale)

  return (
    <>
      <CapabilityDetail capability={capability} locale={locale} prefix={prefix} />

      <div className="container-base">

        {/* What it solves */}
        <div className="border-t border-gray-100 pt-14 pb-10">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
            {c.whatItSolves.eyebrow}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-8">
            {c.whatItSolves.title}
          </h2>
          <ul className="space-y-3 max-w-2xl">
            {capability.whatItSolves.map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-1 h-1 rounded-full bg-gray-300 mt-[10px]" aria-hidden="true" />
                <p className="text-base text-gray-600 leading-relaxed">
                  {t(item, locale)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <CapabilityMethodology
          steps={capability.methodology}
          locale={locale}
          eyebrow={c.methodology.eyebrow}
          title={c.methodology.title}
        />

        <CapabilityOutcome
          items={capability.outcomes}
          locale={locale}
          eyebrow={c.outcomes.eyebrow}
          title={c.outcomes.title}
        />

        <CapabilityEngagement
          capability={capability}
          locale={locale}
          eyebrow={c.engagement.eyebrow}
          title={c.engagement.title}
        />

        <CapabilityRelated
          capabilities={related}
          locale={locale}
          prefix={prefix}
          eyebrow={c.related.eyebrow}
          title={c.related.title}
        />

        <CapabilityCTA
          locale={locale}
          note={c.cta.note}
          label={ctaLabel}
          href={c.cta.href}
        />

      </div>
    </>
  )
}
