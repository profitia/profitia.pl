import Link from 'next/link'
import type { JobPost, CareerLocale } from '@/lib/careers'
import { tCareer } from '@/lib/careers'
import { getPublicPath } from '@/lib/routing/public-routes'

const BREADCRUMB = {
  pl: { home: 'Strona główna', career: 'Kariera' },
  en: { home: 'Home', career: 'Career' },
}

interface Props {
  job: JobPost
  locale: CareerLocale
}

/**
 * CareerJobDetail
 * ─────────────────────────────────────────────────────────────
 * Hero block for a job detail page.
 * Breadcrumb → department eyebrow → title → location / type meta → summary lede.
 * Mirrors CapabilityDetail pacing: generous whitespace, paper feel.
 */
export default function CareerJobDetail({ job, locale }: Props) {
  const c = BREADCRUMB[locale]
  const title = tCareer(job.title, locale)
  const subtitle = job.subtitle ? tCareer(job.subtitle, locale) : null
  const department = tCareer(job.department, locale)
  const location = tCareer(job.location, locale)
  const summary = tCareer(job.summary, locale)
  const homeHref = getPublicPath('home', locale)
  const careerHref = getPublicPath('career:index', locale)

  return (
    <section className="pt-20 pb-16 border-b border-gray-100">
      <div className="container-base">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-gray-400 mb-12"
          aria-label={locale === 'en' ? 'Breadcrumb' : 'Ścieżka nawigacji'}
        >
          <Link href={homeHref} className="hover:text-brand-blue transition-colors duration-200">
            {c.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={careerHref} className="hover:text-brand-blue transition-colors duration-200">
            {c.career}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600">{title}</span>
        </nav>

        {/* Department eyebrow */}
        <p className="editorial-label text-gray-400 mb-5">
          {department}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-6 max-w-[42rem]">
          {title}
        </h1>

        {subtitle && (
          <p className="-mt-2 mb-6 text-[15px] leading-relaxed text-gray-500">
            {subtitle}
          </p>
        )}

        {/* Location metadata */}
        <p className="text-[13px] text-gray-400 mb-10">
          {location}
        </p>

        {/* Lede paragraph */}
        <p className="text-[17px] text-gray-600 leading-relaxed max-w-[44rem]">
          {summary}
        </p>

      </div>
    </section>
  )
}
