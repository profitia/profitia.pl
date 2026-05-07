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
 *
 * Featured sections (anchor practices) get:
 * - larger left-column heading (text-2xl vs text-lg)
 * - more whitespace (pt-20 vs pt-12)
 * - wider left column (340px vs 220px)
 * - larger description type (text-base vs text-sm)
 *
 * This creates hierarchy and editorial rhythm across the page.
 */
export default function CapabilitySection({ section, capabilities, locale, prefix }: Props) {
  if (capabilities.length === 0) return null

  const isFeatured = section.featured === true

  return (
    <section
      className={
        isFeatured
          ? 'border-t border-gray-100 pt-24 pb-14'
          : 'border-t border-gray-100 pt-12 pb-4'
      }
    >
      <div
        className={
          isFeatured
            ? 'grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20'
            : 'grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14'
        }
      >
        {/* Left: section header */}
        <div className="lg:pt-1">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">
            {t(section.eyebrow, locale)}
          </p>
          <h2
            className={
              isFeatured
                ? 'text-2xl font-semibold tracking-tight text-gray-900 leading-snug mb-6'
                : 'text-lg font-semibold tracking-tight text-gray-900 leading-snug mb-4'
            }
          >
            {t(section.title, locale)}
          </h2>
          <p
            className={
              isFeatured
                ? 'text-base text-gray-500 leading-relaxed'
                : 'text-sm text-gray-500 leading-relaxed'
            }
          >
            {t(section.description, locale)}
          </p>
        </div>

        {/* Right: capability rows */}
        <div className={isFeatured ? 'lg:pt-2' : ''}>
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
