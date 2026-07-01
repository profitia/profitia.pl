import Link from 'next/link'
import type { JobPost, CareerLocale } from '@/lib/careers'
import { tCareer } from '@/lib/careers'

const BREADCRUMB = {
  pl: { home: 'Strona główna', career: 'Kariera' },
  en: { home: 'Home', career: 'Career' },
}

const HOME_HREFS: Record<CareerLocale, string> = { pl: '/', en: '/en' }
const CAREER_HREFS: Record<CareerLocale, string> = { pl: '/career', en: '/en/career' }

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
  const department = tCareer(job.department, locale)
  const location = tCareer(job.location, locale)
  const employmentType = tCareer(job.employmentType, locale)
  const summary = tCareer(job.summary, locale)

  return (
    <section className="pt-20 pb-16 border-b border-gray-100">
      <div className="container-base">

        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-gray-400 mb-12"
          aria-label={locale === 'en' ? 'Breadcrumb' : 'Ścieżka nawigacji'}
        >
          <Link href={HOME_HREFS[locale]} className="hover:text-brand-blue transition-colors duration-200">
            {c.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={CAREER_HREFS[locale]} className="hover:text-brand-blue transition-colors duration-200">
            {c.career}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-gray-600">{title}</span>
        </nav>

        {/* Department eyebrow */}
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-5">
          {department}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-6 max-w-[42rem]">
          {title}
        </h1>

        {/* Location + employment type metadata */}
        <p className="text-[13px] text-gray-400 mb-10">
          {location} · {employmentType}
        </p>

        {/* Lede paragraph */}
        <p className="text-[17px] text-gray-600 leading-relaxed max-w-[44rem]">
          {summary}
        </p>

      </div>
    </section>
  )
}
