import type { Capability, CapabilitySectionDef, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'
import CapabilityCard from './CapabilityCard'

interface Props {
  section: CapabilitySectionDef
  capabilities: Capability[]
  locale: Locale
  prefix: 'services' | 'education'
}

/**
 * CapabilitySection
 * ─────────────────────────────────────────────────────────────
 * A full listing section: eyebrow → title → description → capability rows.
 * Institutional rhythm. No decorative elements.
 */
export default function CapabilitySection({ section, capabilities, locale, prefix }: Props) {
  if (capabilities.length === 0) return null

  return (
    <section className="border-t border-gray-100 pt-14 pb-6">
      <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">

        {/* Left: section header (sticky label on desktop) */}
        <div className="lg:pt-1">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">
            {t(section.eyebrow, locale)}
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug mb-4">
            {t(section.title, locale)}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t(section.description, locale)}
          </p>
        </div>

        {/* Right: capability rows */}
        <div>
          {capabilities.map((cap) => (
            <CapabilityCard
              key={cap.slug}
              capability={cap}
              locale={locale}
              prefix={prefix}
              variant="row"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
