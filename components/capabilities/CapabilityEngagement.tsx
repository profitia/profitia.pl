import type { Capability, Locale } from '@/lib/capabilities'
import { t, CATEGORY_LABELS } from '@/lib/capabilities'

interface Props {
  capability: Capability
  locale: Locale
  eyebrow: string
  title: string
}

const COPY = {
  pl: { format: 'Format współpracy', area: 'Obszar kompetencji' },
  en: { format: 'Engagement format', area: 'Capability area' },
}

/**
 * CapabilityEngagement
 * ─────────────────────────────────────────────────────────────
 * Institutional metadata grid — 2 columns, no icons, no colours.
 * Shows engagement format and capability area as a dl grid.
 * Feels like document metadata, not a feature list.
 */
export default function CapabilityEngagement({ capability, locale, eyebrow }: Props) {
  const c = COPY[locale]
  const categoryLabel = CATEGORY_LABELS[capability.category]
  const catText = categoryLabel ? t(categoryLabel, locale) : null

  return (
    <div className="border-t border-gray-100 pt-16 pb-14">
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-200 mb-8">
        {eyebrow}
      </p>
      <dl className="grid sm:grid-cols-2 gap-x-16 gap-y-8 max-w-2xl">
        <div>
          <dt className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-200 mb-3">
            {c.format}
          </dt>
          <dd className="text-[15px] text-gray-600 leading-[1.75]">
            {t(capability.engagement, locale)}
          </dd>
        </div>
        {catText && (
          <div>
            <dt className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-200 mb-3">
              {c.area}
            </dt>
            <dd className="text-[15px] text-gray-600 leading-[1.75]">
              {catText}
            </dd>
          </div>
        )}
      </dl>
    </div>
  )
}
