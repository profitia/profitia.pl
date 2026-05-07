import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  capability: Capability
  locale: Locale
  eyebrow: string
  title: string
}

/**
 * CapabilityEngagement
 * ─────────────────────────────────────────────────────────────
 * Single-line engagement format note.
 * Restrained — metadata, not hero copy.
 */
export default function CapabilityEngagement({ capability, locale, eyebrow, title }: Props) {
  return (
    <div className="border-t border-gray-100 pt-14 pb-10">
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-base text-gray-600 leading-relaxed max-w-xl">
        {t(capability.engagement, locale)}
      </p>
    </div>
  )
}
