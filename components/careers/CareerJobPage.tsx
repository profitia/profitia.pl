import type { JobPost, CareerLocale } from '@/lib/careers'
import { tCareer } from '@/lib/careers'
import CareerJobDetail from './CareerJobDetail'
import CareerCTA from './CareerCTA'

interface Props {
  job: JobPost
  locale: CareerLocale
}

const COPY = {
  pl: {
    roleContext: { eyebrow: 'Kontekst roli', title: 'Gdzie ta rola działa' },
    workItems:   { eyebrow: 'Zakres pracy', title: 'Nad czym będziesz pracować' },
    requirements:{ eyebrow: 'Kompetencje', title: 'Co ma znaczenie w tej roli' },
    profile:     { eyebrow: 'Profil', title: 'Jaka osoba tu dobrze funkcjonuje' },
    workingModel:{ eyebrow: 'Model pracy', title: 'Forma i organizacja pracy' },
    development: { eyebrow: 'Rozwój', title: 'Jak wygląda rozwój w tej roli' },
    cta: {
      invitation: 'Jeżeli ta rola odpowiada temu, czego szukasz - prześlij aplikację.',
      label: 'Prześlij CV',
    },
  },
  en: {
    roleContext: { eyebrow: 'Role context', title: 'Where this role operates' },
    workItems:   { eyebrow: 'Scope of work', title: 'What you will work on' },
    requirements:{ eyebrow: 'Competencies', title: 'What matters in this role' },
    profile:     { eyebrow: 'Profile', title: 'What kind of person succeeds here' },
    workingModel:{ eyebrow: 'Working model', title: 'Format and working arrangement' },
    development: { eyebrow: 'Development', title: 'How development looks in this role' },
    cta: {
      invitation: 'If this role matches what you are looking for - submit an application.',
      label: 'Submit your CV',
    },
  },
}

/**
 * CareerJobPage
 * ─────────────────────────────────────────────────────────────
 * Full detail page for a job post.
 *
 * Structure (mirrors capability detail page emotional arc):
 *   JobDetail hero (lede)
 *   → Role context (positioning paragraph)
 *   → What you will work on (numbered items - presence/density)
 *   → What matters in this role (requirements - structured clarity)
 *   → What kind of person succeeds (profile - forward-looking)
 *   → Working model (metadata - quiet facts)
 *   → Development (airy close)
 *   → Institutional CTA
 *
 * No salary. No perks. No "dynamic team". No emojis.
 */
export default function CareerJobPage({ job, locale }: Props) {
  const c = COPY[locale]

  return (
    <>
      <CareerJobDetail job={job} locale={locale} />

      <div className="container-base">

        {/* ── Role context ──────────────────────────────────── */}
        <div className="pt-16 pb-14 border-b border-gray-100">
          <p className="text-[9px] font-medium tracking-[0.28em] uppercase text-gray-400 mb-3">
            {c.roleContext.eyebrow}
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-[42rem]">
            {tCareer(job.roleContext, locale)}
          </p>
        </div>

        {/* ── What you will work on ────────────────────────── */}
        <div className="pt-24 pb-14 border-b border-gray-100">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
            <div className="mb-8 lg:mb-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">
                {c.workItems.eyebrow}
              </p>
              <h2 className="text-[15px] font-medium text-gray-800 leading-snug">
                {c.workItems.title}
              </h2>
            </div>
            <ol className="space-y-5">
              {job.workItems.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-[11px] text-gray-300 font-medium tabular-nums mt-0.5 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] text-gray-600 leading-[1.65]">
                    {tCareer(item, locale)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── What matters in this role ────────────────────── */}
        <div className="pt-20 pb-14 border-b border-gray-100">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
            <div className="mb-8 lg:mb-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-300 mb-3">
                {c.requirements.eyebrow}
              </p>
              <h2 className="text-base font-medium text-gray-700 leading-snug">
                {c.requirements.title}
              </h2>
            </div>
            <ol className="space-y-8">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex gap-4 border-l border-gray-200 pl-5">
                  <p className="text-[15px] text-gray-700 leading-[1.75]">
                    {tCareer(req, locale)}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Profile ─────────────────────────────────────── */}
        <div className="pt-16 pb-14 border-b border-gray-100">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
            <div className="mb-8 lg:mb-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-300 mb-3">
                {c.profile.eyebrow}
              </p>
              <h2 className="text-base font-medium text-gray-600 leading-snug">
                {c.profile.title}
              </h2>
            </div>
            <ol className="space-y-8">
              {job.profile.map((item, i) => (
                <li key={i} className="text-[15px] text-gray-700 leading-[1.85]">
                  {tCareer(item, locale)}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ── Working model ───────────────────────────────── */}
        <div className="pt-16 pb-14 border-b border-gray-100">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
            <div className="mb-4 lg:mb-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-200 mb-3">
                {c.workingModel.eyebrow}
              </p>
              <h2 className="text-base font-medium text-gray-600 leading-snug">
                {c.workingModel.title}
              </h2>
            </div>
            <p className="text-[15px] text-gray-600 leading-[1.75]">
              {tCareer(job.workingModel, locale)}
            </p>
          </div>
        </div>

        {/* ── Development ─────────────────────────────────── */}
        <div className="pt-16 pb-14 border-b border-gray-100">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-16">
            <div className="mb-4 lg:mb-0">
              <p className="text-[9px] font-medium tracking-[0.2em] uppercase text-gray-200 mb-3">
                {c.development.eyebrow}
              </p>
              <h2 className="text-base font-medium text-gray-600 leading-snug">
                {c.development.title}
              </h2>
            </div>
            <p className="text-[15px] text-gray-700 leading-[1.85]">
              {tCareer(job.development, locale)}
            </p>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <CareerCTA
          locale={locale}
          invitation={c.cta.invitation}
          label={c.cta.label}
          href={`${locale === 'en' ? '/en' : ''}/career/apply?role=${job.slug}`}
        />

      </div>
    </>
  )
}
