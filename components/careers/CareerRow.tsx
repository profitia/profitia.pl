import Link from 'next/link'
import type { JobPost, CareerLocale } from '@/lib/careers'
import { tCareer } from '@/lib/careers'

interface Props {
  job: JobPost
  locale: CareerLocale
  isFirst?: boolean
}

const LOCALE_PREFIX: Record<CareerLocale, string> = { pl: '', en: '/en' }

const NAV_LABEL: Record<CareerLocale, string> = {
  pl: 'Zobacz rolę',
  en: 'Explore role',
}

/**
 * CareerRow
 * ─────────────────────────────────────────────────────────────
 * Single job post listing row - editorial, not a card.
 * Mirrors CapabilityCard row variant: title + meta + nav arrow.
 * Conversion language excluded. Navigation language only.
 */
export default function CareerRow({ job, locale, isFirst = false }: Props) {
  const href = `${LOCALE_PREFIX[locale]}/career/${job.slug}`
  const title = tCareer(job.title, locale)
  const department = tCareer(job.department, locale)
  const location = tCareer(job.location, locale)
  const navLabel = NAV_LABEL[locale]

  return (
    <div className={`group border-b border-gray-100 flex items-start justify-between gap-6 ${isFirst ? 'pt-6 pb-9' : 'py-6'}`}>
      <div className="min-w-0">
        <h3 className={`text-[15px] tracking-tight text-gray-900 leading-snug ${isFirst ? 'font-semibold' : 'font-medium'}`}>
          {title}
        </h3>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400 mt-1">
          {department} · {location}
        </p>
      </div>
      <Link
        href={href}
        className={`flex-shrink-0 text-xs hover:text-gray-900 transition-colors duration-200 whitespace-nowrap pt-0.5 ${isFirst ? 'text-gray-500' : 'text-gray-400'}`}
        aria-label={`${title} - ${navLabel}`}
      >
        {navLabel} →
      </Link>
    </div>
  )
}
