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
    <div className="border-t border-gray-100 pt-16 pb-12">
      <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
        {eyebrow}
      </p>
      <h2 className="text-lg font-semibold tracking-tight text-gray-900 mb-8">
        {title}
      </h2>
      <ol className="space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-5 items-start">
            <span className="flex-shrink-0 text-[10px] font-semibold text-gray-300 tabular-nums mt-[3px]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-[15px] text-gray-700 leading-relaxed">
              {t(item, locale)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
