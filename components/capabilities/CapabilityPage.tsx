import type { Capability, Locale } from '@/lib/capabilities'
import { t, getRelatedCapabilities, CAPABILITY_THESIS } from '@/lib/capabilities'
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
    whatItSolves: {
      eyebrow: 'Problem',
      title: 'Gdzie organizacje się zatrzymują',
    },
    methodology: {
      eyebrow: 'Przebieg',
      title: 'Jak przebiega zaangażowanie',
    },
    outcomes: {
      eyebrow: 'Efekty',
      title: 'Co zmienia się operacyjnie',
    },
    engagement: {
      eyebrow: 'Format',
      title: 'Format współpracy',
    },
    related: { eyebrow: 'Zobacz też', title: 'Powiązane obszary' },
    cta: { note: 'Następny krok', href: '/contact' },
  },
  en: {
    whatItSolves: {
      eyebrow: 'Problem',
      title: 'Where organisations get stuck',
    },
    methodology: {
      eyebrow: 'Approach',
      title: 'How engagements work',
    },
    outcomes: {
      eyebrow: 'Results',
      title: 'What changes operationally',
    },
    engagement: {
      eyebrow: 'Format',
      title: 'Engagement format',
    },
    related: { eyebrow: 'See also', title: 'Related areas' },
    cta: { note: 'Next step', href: '/en/contact' },
  },
}

/**
 * CapabilityPage
 * ─────────────────────────────────────────────────────────────
 * Canonical detail page — institutional paper format.
 *
 * Structure:
 *   Detail hero (lede paragraph)
 *   → Where organisations get stuck (numbered problem statements)
 *   → How engagements work (numbered methodology steps)
 *   → What changes operationally (numbered outcomes)
 *   → Format (2-col metadata grid)
 *   → Related areas
 *   → Institutional CTA invitation
 *
 * No landing page patterns, no animated counters, no icon grids.
 * Maximum institutional authority.
 */
export default function CapabilityPage({ capability, locale, prefix }: Props) {
  const c = COPY[locale]
  const related = getRelatedCapabilities(capability.slug)
  const ctaLabel = t(capability.ctaLabel, locale)
  const thesis = CAPABILITY_THESIS[capability.slug]

  return (
    <>
      <CapabilityDetail capability={capability} locale={locale} prefix={prefix} />

      <div className="container-base">

        {/* Institutional thesis — expert observation, not a slogan */}
        {thesis && (
          <div className="pt-16 pb-14 border-b border-gray-100">
            <p className="text-[16px] text-gray-600 leading-relaxed max-w-[40rem]">
              {thesis[locale]}
            </p>
          </div>
        )}

        {/* Where organisations get stuck */}
        <div className="border-t border-gray-100 pt-20 pb-14">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-16">
            <div className="lg:pt-1">
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-3">
                {c.whatItSolves.eyebrow}
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-gray-900 leading-snug">
                {c.whatItSolves.title}
              </h2>
            </div>
            <ol className="space-y-4 lg:pt-1">
              {capability.whatItSolves.map((item, i) => (
                <li key={i} className="flex gap-5 items-start">
                  <span
                    className="flex-shrink-0 text-[10px] font-semibold text-gray-300 tabular-nums mt-[5px] w-5 text-right"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {t(item, locale)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
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
