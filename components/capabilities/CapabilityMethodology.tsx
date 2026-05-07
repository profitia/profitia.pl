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
    <div className="border-t border-gray-100 pt-14 pb-10">
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-8">
        {title}
      </h2>
      <ol className="space-y-5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-5 items-start">
            <span className="flex-shrink-0 text-[10px] font-semibold text-gray-300 tabular-nums mt-[3px] w-5 text-right">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="border-l border-gray-100 pl-5">
              <p className="text-base text-gray-700 leading-relaxed">
                {t(step, locale)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
