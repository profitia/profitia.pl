import type { JobPost, CareerLocale } from '@/lib/careers'
import CareerRow from './CareerRow'

interface Props {
  eyebrow: string
  title: string
  jobs: JobPost[]
  locale: CareerLocale
}

/**
 * CareerRoles
 * ─────────────────────────────────────────────────────────────
 * Open roles section — editorial rows, not cards.
 * Mirrors CapabilitySection layout: label column + row list.
 */
export default function CareerRoles({ eyebrow, title, jobs, locale }: Props) {
  return (
    <section className="pt-20 pb-10 border-b border-gray-100">
      <div className="container-base">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">

          {/* Left — label column */}
          <div className="mb-10 lg:mb-0 lg:pt-1">
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-4">
              {eyebrow}
            </p>
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>

          {/* Right — editorial rows */}
          <div>
            {jobs.map((job, index) => (
              <CareerRow
                key={job.slug}
                job={job}
                locale={locale}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
