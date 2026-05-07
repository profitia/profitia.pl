import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'
import CapabilityCard from './CapabilityCard'

interface Props {
  capabilities: Capability[]
  locale: Locale
  prefix: 'services' | 'education'
  eyebrow: string
  title: string
}

/**
 * CapabilityRelated
 * ─────────────────────────────────────────────────────────────
 * Quiet related capability block. Research-report cadence.
 * No carousel, no marketing. Max 3 items.
 */
export default function CapabilityRelated({ capabilities, locale, prefix, eyebrow, title }: Props) {
  if (capabilities.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-14 pb-4">
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-8">
        {title}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilities.slice(0, 3).map((cap) => (
          <CapabilityCard
            key={cap.slug}
            capability={cap}
            locale={locale}
            prefix={prefix}
            variant="card"
          />
        ))}
      </div>
    </div>
  )
}
