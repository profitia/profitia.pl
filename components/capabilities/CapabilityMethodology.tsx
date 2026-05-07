import type { LocalizedString, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  steps: LocalizedString[]
  locale: Locale
  eyebrow: string
  title: string
}

/**
 * CapabilityMethodology
 * ─────────────────────────────────────────────────────────────
 * Numbered process steps. Vertical flow, editorial cadence.
 */
export default function CapabilityMethodology({ steps, locale, eyebrow, title }: Props) {
  if (steps.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-20 pb-14">
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-300 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-base font-medium text-gray-700 mb-10">
        {title}
      </h2>
      <ol className="space-y-8">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-5 items-start">
            <span className="flex-shrink-0 text-[9px] font-semibold text-gray-200 tabular-nums mt-[4px] w-5 text-right">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="border-l border-gray-200 pl-5">
              <p className="text-[15px] text-gray-700 leading-[1.75]">
                {t(step, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
