import Link from 'next/link'
import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  capability: Capability
  locale: Locale
  /** 'services' | 'education' — determines the URL prefix */
  prefix: 'services' | 'education'
  /** Whether to render as a border-bottom row (list) vs a boxed card */
  variant?: 'row' | 'card'
}

const LOCALE_PREFIX: Record<Locale, string> = { pl: '', en: '/en' }

/**
 * CapabilityCard
 * ─────────────────────────────────────────────────────────────
 * Institutional editorial card. Zero icons, zero shadows.
 *
 * row  — scan-friendly listing entry: title + eyebrow + CTA arrow.
 *        Description intentionally omitted — belongs on the detail page.
 * card — contained tile for Related section and grids.
 */
export default function CapabilityCard({ capability, locale, prefix, variant = 'row' }: Props) {
  const href = `${LOCALE_PREFIX[locale]}/${prefix}/${capability.slug}`
  const title = t(capability.title, locale)
  const eyebrow = t(capability.eyebrow, locale)
  const cta = t(capability.ctaLabel, locale)

  if (variant === 'row') {
    return (
      <div className="group border-b border-gray-100 py-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium tracking-tight text-gray-900 leading-snug">
            {title}
          </h3>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mt-1">
            {eyebrow}
          </p>
        </div>
        <Link
          href={href}
          className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-0.5"
          aria-label={`${title} — ${cta}`}
        >
          {cta} →
        </Link>
      </div>
    )
  }

  // card variant — used in Related section
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
