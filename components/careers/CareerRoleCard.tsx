'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { JobPost, CareerLocale } from '@/lib/careers'
import { tCareer } from '@/lib/careers'

interface Props {
  job: JobPost
  locale: CareerLocale
  applyLabel: string
  expandLabel: string
  collapseLabel: string
  responsibilitiesLabel: string
  learningLabel: string
  requirementsLabel: string
}

/**
 * CareerRoleCard
 * Expandable job role card — editorial, not a job board listing.
 * Closed state: title + department + location + type + summary.
 * Open state: full role context, work items, requirements, CTA.
 * Framer Motion AnimatePresence for smooth height animation.
 */
export default function CareerRoleCard({
  job,
  locale,
  applyLabel,
  expandLabel,
  collapseLabel,
  responsibilitiesLabel,
  learningLabel,
  requirementsLabel,
}: Props) {
  const [open, setOpen] = useState(false)
  const applyHref = `${locale === 'en' ? '/en' : ''}/career/apply?role=${job.slug}`

  const title = tCareer(job.title, locale)
  const department = tCareer(job.department, locale)
  const location = tCareer(job.location, locale)
  const type = tCareer(job.employmentType, locale)
  const summary = tCareer(job.summary, locale)
  const roleContext = tCareer(job.roleContext, locale)

  return (
    <div className="border-b border-gray-100 last:border-0">
      {/* Closed state header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left group py-9 flex items-start justify-between gap-6"
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h3 className="text-[20px] font-semibold tracking-tight text-gray-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200">
            {title}
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
              {department}
            </span>
            <span className="text-[11px] text-gray-300" aria-hidden="true">·</span>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
              {location}
            </span>
            <span className="text-[11px] text-gray-300" aria-hidden="true">·</span>
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
              {type}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 pt-1 flex items-center gap-3">
          <span className="text-[13px] text-gray-400 group-hover:text-brand-blue transition-colors duration-200">
            {open ? collapseLabel : expandLabel}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-gray-300 text-lg leading-none"
            aria-hidden="true"
          >
            +
          </motion.span>
        </div>
      </button>

      {/* Summary line — visible when closed */}
      {!open && (
        <p className="text-[14px] text-gray-500 leading-relaxed max-w-[52rem] pb-9 -mt-4">
          {summary}
        </p>
      )}

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-12 space-y-10">

              {/* Role context */}
              <p className="text-[15px] text-gray-600 leading-[1.8] max-w-[60rem]">
                {roleContext}
              </p>

              {/* Work items + requirements in 2-col on lg */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-16 space-y-10 lg:space-y-0">

                {/* Responsibilities */}
                {job.workItems && job.workItems.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-300 mb-5">
                      {responsibilitiesLabel}
                    </p>
                    <ul className="space-y-4">
                      {job.workItems.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-px bg-gray-200 mt-1 self-stretch" aria-hidden="true" />
                          <p className="text-[14px] text-gray-600 leading-[1.75]">
                            {tCareer(item, locale)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-300 mb-5">
                      {requirementsLabel}
                    </p>
                    <ul className="space-y-4">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="flex-shrink-0 w-px bg-gray-200 mt-1 self-stretch" aria-hidden="true" />
                          <p className="text-[14px] text-gray-600 leading-[1.75]">
                            {tCareer(req, locale)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href={applyHref}
                  className="inline-block bg-gray-900 text-white text-sm font-medium px-6 py-3 hover:bg-brand-blue transition-colors duration-200"
                >
                  {applyLabel} →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
