import type { Capability, Locale } from '@/lib/capabilities'
import CapabilityCard from './CapabilityCard'

interface Props {
  capabilities: Capability[]
  locale: Locale
  prefix: 'services' | 'education'
  /** Number of columns: 2 or 3. Default 3. */
  columns?: 2 | 3
}

/**
 * CapabilityGrid
 * ─────────────────────────────────────────────────────────────
 * Card-variant grid layout. Used for featured capabilities
 * or cross-type related content.
 */
export default function CapabilityGrid({ capabilities, locale, prefix, columns = 3 }: Props) {
  const colClass = columns === 2
    ? 'sm:grid-cols-2'
    : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-4`}>
      {capabilities.map((cap) => (
        <CapabilityCard
          key={cap.slug}
          capability={cap}
          locale={locale}
          prefix={prefix}
          variant="card"
        />
      ))}
    </div>
  )
}
