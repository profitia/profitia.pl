import type { JobPost, CareerLocale } from '@/lib/careers'
import CareerRoleCard from './CareerRoleCard'

interface Props {
  eyebrow: string
  title: string
  jobs: JobPost[]
  locale: CareerLocale
  applyLabel: string
  expandLabel: string
  collapseLabel: string
  responsibilitiesLabel: string
  learningLabel: string
  requirementsLabel: string
}

/**
 * CareerRoles
 * Interactive role explorer — expandable cards, not a job board list.
 * Each card reveals full role context, responsibilities, requirements and CTA.
 */
export default function CareerRoles({
  eyebrow,
  title,
  jobs,
  locale,
  applyLabel,
  expandLabel,
  collapseLabel,
  responsibilitiesLabel,
  learningLabel,
  requirementsLabel,
}: Props) {
  return (
    <section id="roles" className="py-24 border-b border-gray-100">
      <div className="container-base">
        <div className="mb-14 lg:grid lg:grid-cols-[260px_1fr] lg:gap-20">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-5">
              {eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-snug">
              {title}
            </h2>
          </div>
        </div>

        <div>
          {jobs.map((job) => (
            <CareerRoleCard
              key={job.slug}
              job={job}
              locale={locale}
              applyLabel={applyLabel}
              expandLabel={expandLabel}
              collapseLabel={collapseLabel}
              responsibilitiesLabel={responsibilitiesLabel}
              learningLabel={learningLabel}
              requirementsLabel={requirementsLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
