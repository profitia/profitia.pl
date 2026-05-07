import Link from 'next/link'
import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'
import CapabilityMeta from './CapabilityMeta'

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
 * Two variants:
 *   row  — full-width border-bottom entry (used inside CapabilitySection)
 *   card — contained grid tile (used in CapabilityGrid)
 */
export default function CapabilityCard({ capability, locale, prefix, variant = 'row' }: Props) {
  const href = `${LOCALE_PREFIX[locale]}/${prefix}/${capability.slug}`
  const title = t(capability.title, locale)
  const desc = t(capability.shortDescription, locale)
  const cta = t(capability.ctaLabel, locale)

  if (variant === 'row') {
    return (
      <div className="group border-b border-gray-100 py-7 grid sm:grid-cols-[1fr_auto] gap-4 items-start">
        <div>
          <CapabilityMeta capability={capability} locale={locale} />
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 mt-3 mb-2 leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
            {desc}
          </p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <Link
            href={href}
            className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap"
            aria-label={`${title} — ${cta}`}
          >
            {cta} →
          </Link>
        </div>
      </div>
    )
  }

  // card variant
  return (
    <Link
      href={href}
      className="group block border border-gray-100 rounded-2xl p-7 hover:border-gray-300 transition-colors duration-200"
    >
      <CapabilityMeta capability={capability} locale={locale} />
      <h3 className="text-base font-semibold tracking-tight text-gray-900 mt-4 mb-2 leading-snug group-hover:text-gray-700 transition-colors duration-200">
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
