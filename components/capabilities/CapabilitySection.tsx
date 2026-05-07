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
 * Three editorial tiers:
 *
 * Dominant - single anchor practice. Most commanding presence on the page.
 *   400px left column, text-3xl heading, generous whitespace.
 *   Creates hierarchy narrative - one pillar, others supporting.
 *
 * Featured - significant practice track. Clearly present, secondary to dominant.
 *   300px left column, text-xl heading, moderate whitespace.
 *
 * Standard - supporting practice. Quiet, matter-of-fact.
 *   220px left column, text-lg heading, minimal whitespace.
 */
export default function CapabilitySection({ section, capabilities, locale, prefix }: Props) {
  if (capabilities.length === 0) return null

  const isDominant = section.dominant === true
  const isFeatured = section.featured === true && !isDominant

  return (
    <section
      className={
        isDominant
          ? 'border-t border-gray-100 pt-28 pb-16'
          : isFeatured
          ? 'border-t border-gray-100 pt-20 pb-10'
          : 'border-t border-gray-100 pt-12 pb-4'
      }
    >
      <div
        className={
          isDominant
            ? 'grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-24'
            : isFeatured
            ? 'grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-16'
            : 'grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-14'
        }
      >
        {/* Left: section header */}
        <div className="lg:pt-1">
          <p
            className={
              isDominant
                ? 'text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400 mb-5'
                : 'text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4'
            }
          >
            {t(section.eyebrow, locale)}
          </p>
          <h2
            className={
              isDominant
                ? 'text-3xl font-semibold tracking-tight text-gray-900 leading-snug mb-6'
                : isFeatured
                ? 'text-xl font-semibold tracking-tight text-gray-900 leading-snug mb-5'
                : 'text-lg font-semibold tracking-tight text-gray-900 leading-snug mb-4'
            }
          >
            {t(section.title, locale)}
          </h2>
          <p
            className={
              isDominant
                ? 'text-[15px] text-gray-500 leading-relaxed max-w-[26rem]'
                : 'text-sm text-gray-400 leading-relaxed'
            }
          >
            {t(section.description, locale)}
          </p>
        </div>

        {/* Right: capability rows */}
        <div className={isDominant ? 'lg:pt-4' : isFeatured ? 'lg:pt-2' : ''}>
          {capabilities.map((cap, index) => (
            <CapabilityCard
              key={cap.slug}
              capability={cap}
              locale={locale}
              prefix={prefix}
              variant="row"
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
