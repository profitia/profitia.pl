/**
 * CategoryBadge — Editorial Category Chip
 *
 * Small, uppercase eyebrow-style category label.
 * Restrained — no color chips, institutional.
 */

import { getCategoryLabel } from '@/lib/content/utils'

interface CategoryBadgeProps {
  category: string | null
  locale: 'pl' | 'en'
  className?: string
}

export function CategoryBadge({ category, locale, className = '' }: CategoryBadgeProps) {
  const label = getCategoryLabel(category, locale)
  if (!label) return null

  return (
    <span
      className={`inline-block text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-600 ${className}`}
    >
      {label}
    </span>
  )
}
