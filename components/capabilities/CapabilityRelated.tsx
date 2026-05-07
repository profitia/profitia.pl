import Link from 'next/link'
import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  capabilities: Capability[]
  locale: Locale
  /** Kept for API compatibility. URL is derived from capability.type. */
  prefix: 'services' | 'education'
  eyebrow: string
  title: string
}

const LOCALE_PREFIX: Record<Locale, string> = { pl: '', en: '/en' }

/**
 * Navigation labels — type-derived, not ctaLabel.
 * Related rows navigate to detail pages; they do not convert.
 */
const NAV_LABEL: Record<'service' | 'education', { pl: string; en: string }> = {
  service:   { pl: 'Zobacz usługę', en: 'Explore service' },
  education: { pl: 'Zobacz program', en: 'Explore programme' },
}

/**
 * CapabilityRelated
 * ─────────────────────────────────────────────────────────────
 * Adjacent expertise references — editorial reading continuation.
 * Not a card grid. Not a component showcase.
 *
 * Uses simple border-bottom rows, identical to the listing page,
 * for visual continuity and to reduce SaaS UI feel.
 *
 * Cross-type safe: derives the correct prefix from capability.type
 * so a service detail page can link correctly to education capabilities.
 */
export default function CapabilityRelated({ capabilities, locale, eyebrow, title }: Props) {
  if (capabilities.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-20 pb-10">
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-300 mb-3">
        {eyebrow}
      </p>
      <h2 className="text-base font-medium text-gray-800 mb-10">
        {title}
      </h2>
      <div>
        {capabilities.slice(0, 3).map((cap) => {
          const capType = cap.type === 'service' ? 'services' : 'education'
          const href = `${LOCALE_PREFIX[locale]}/${capType}/${cap.slug}`
          const capTitle = t(cap.title, locale)
          const capEyebrow = t(cap.eyebrow, locale)
          const navLabel = NAV_LABEL[cap.type][locale]
          return (
            <div
              key={cap.slug}
              className="border-b border-gray-100 py-6 flex items-start justify-between gap-6"
            >
              <div className="min-w-0">
                <h3 className="text-[15px] font-medium tracking-tight text-gray-900 leading-snug">
                  {capTitle}
                </h3>
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mt-1">
                  {capEyebrow}
                </p>
              </div>
              <Link
                href={href}
                className="flex-shrink-0 text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-0.5"
                aria-label={`${capTitle} — ${navLabel}`}
              >
                {navLabel} →
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

