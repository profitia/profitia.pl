import type { LocalizedString, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  items: LocalizedString[]
  locale: Locale
  eyebrow: string
  title: string
}

/**
 * CapabilityOutcome
 * ─────────────────────────────────────────────────────────────
 * Numbered outcome list. Clean, institutional.
 */
export default function CapabilityOutcome({ items, locale, eyebrow, title }: Props) {
  if (items.length === 0) return null

  return (
    <div className="border-t border-gray-100 pt-16 pb-14">
      <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gray-300 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-base font-medium text-gray-600 mb-10">
        {title}
      </h2>
      <ol className="space-y-8">
        {items.map((item, i) => (
          <li key={i} className="flex gap-5 items-start">
            <span className="flex-shrink-0 text-[9px] font-semibold text-gray-200 tabular-nums mt-[4px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-[15px] text-gray-700 leading-[1.85]">
              {t(item, locale)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
