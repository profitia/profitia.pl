import Link from 'next/link'
import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  capability: Capability
  locale: Locale
  /** 'services' | 'education' - determines the URL prefix */
  prefix: 'services' | 'education'
  /** Whether to render as a border-bottom row (list) vs a boxed card */
  variant?: 'row' | 'card'
  /**
   * First item in its section. Slightly more present: semibold title,
   * extra bottom pause - creates reading hierarchy inside the section,
   * reduces spreadsheet feel without redesigning the row.
   */
  isFirst?: boolean
}

/**
 * Navigation labels for listing rows and related rows.
 * CTA language is only for the final conversion section on detail pages.
 * Listing rows navigate - they do not convert.
 */
const NAV_LABEL: Record<'service' | 'education', { pl: string; en: string }> = {
  service:   { pl: 'Zobacz usługę', en: 'Explore service' },
  education: { pl: 'Zobacz program', en: 'Explore programme' },
}

const LOCALE_PREFIX: Record<Locale, string> = { pl: '', en: '/en' }

/**
 * CapabilityCard
 * ─────────────────────────────────────────────────────────────
 * Institutional editorial card. Zero icons, zero shadows.
 *
 * row  - scan-friendly listing entry: title + eyebrow + CTA arrow.
 *        Description intentionally omitted - belongs on the detail page.
 * card - contained tile for Related section and grids.
 */
export default function CapabilityCard({ capability, locale, prefix, variant = 'row', isFirst = false }: Props) {
  const href = `${LOCALE_PREFIX[locale]}/${prefix}/${capability.slug}`
  const title = t(capability.title, locale)
  const eyebrow = t(capability.eyebrow, locale)
  // Navigation label - derived from type, not ctaLabel.
  // ctaLabel is reserved for the final conversion CTA on detail pages.
  const navLabel = NAV_LABEL[capability.type][locale]
  const cta = t(capability.ctaLabel, locale)

  if (variant === 'row') {
    return (
      <div className={`group border-b border-gray-100 flex items-start justify-between gap-6 ${isFirst ? 'pt-6 pb-9' : 'py-6'}`}>
        <div className="min-w-0">
          <h3 className={`text-[15px] tracking-tight text-gray-900 leading-snug ${isFirst ? 'font-semibold' : 'font-medium'}`}>
            {title}
          </h3>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mt-1">
            {eyebrow}
          </p>
        </div>
        <Link
          href={href}
          className={`flex-shrink-0 text-xs hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-0.5 ${isFirst ? 'text-gray-500' : 'text-gray-400'}`}
          aria-label={`${title} - ${navLabel}`}
        >
          {navLabel} →
        </Link>
      </div>
    )
  }

  // card variant - used in Related section
  const desc = t(capability.shortDescription, locale)
  return (
    <Link
      href={href}
      className="group block border border-gray-100 rounded-2xl p-7 hover:border-gray-300 transition-colors duration-200"
    >
      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-4">
        {eyebrow}
      </p>
      <h3 className="text-base font-semibold tracking-tight text-gray-900 mb-2 leading-snug group-hover:text-gray-700 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        {desc}
      </p>
      <p className="text-xs font-medium text-gray-400 mt-5 group-hover:text-gray-700 transition-colors duration-200">
        {cta} →
      </p>
    </Link>
  )
}
