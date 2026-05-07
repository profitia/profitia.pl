import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import ApplicationForm from '@/components/careers/apply/ApplicationForm'

export const metadata: Metadata = {
  title: 'Apply | Career | Profitia',
  description: 'Submit your application to Profitia. Recruitment for procurement consultant and business analyst positions.',
}

/**
 * Apply Page — EN
 * ─────────────────────────────────────────────────────────────
 * Institutional application page. Document-centric. Low-emotion UX.
 */
export default function Page() {
  return (
    <div className="pt-20 pb-24">
      <div className="container-base">
        <div className="max-w-[42rem]">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs text-gray-400 mb-12"
            aria-label="Breadcrumb"
          >
            <Link href="/en" className="hover:text-gray-600 transition-colors duration-200">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/en/career" className="hover:text-gray-600 transition-colors duration-200">
              Career
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-600">Apply</span>
          </nav>

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-5">
            Recruitment
          </p>

          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-snug mb-6">
            Submit your application
          </h1>

          {/* Intro */}
          <p className="text-[15px] text-gray-500 leading-[1.75] mb-14 pb-14 border-b border-gray-100">
            Select a position and attach your CV. We respond after reviewing each submission individually.
          </p>

          {/* Form — Suspense required for useSearchParams */}
          <Suspense fallback={null}>
            <ApplicationForm locale="en" />
          </Suspense>

        </div>
      </div>
    </div>
  )
}
