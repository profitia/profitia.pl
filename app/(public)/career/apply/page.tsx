import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import ApplicationForm from '@/components/careers/apply/ApplicationForm'

export const metadata: Metadata = {
  title: 'Aplikacja | Kariera | Profitia',
  description: 'Prześlij aplikację do Profitia. Rekrutacja na stanowiska konsultanta zakupowego i analityka biznesowego.',
}

/**
 * Apply Page — PL
 * ─────────────────────────────────────────────────────────────
 * Institutional application page. Document-centric. Low-emotion UX.
 *
 * Structure:
 *   Breadcrumb → eyebrow → heading → intro → form
 *
 * Suspense boundary is required because ApplicationForm uses
 * useSearchParams() — a client-side API not available during SSR.
 */
export default function Page() {
  return (
    <div className="pt-20 pb-24">
      <div className="container-base">
        <div className="max-w-[42rem]">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs text-gray-400 mb-12"
            aria-label="Ścieżka nawigacji"
          >
            <Link href="/" className="hover:text-gray-600 transition-colors duration-200">
              Strona główna
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/career" className="hover:text-gray-600 transition-colors duration-200">
              Kariera
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-gray-600">Aplikacja</span>
          </nav>

          {/* Eyebrow */}
          <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-5">
            Rekrutacja
          </p>

          {/* Heading */}
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 leading-snug mb-6">
            Prześlij aplikację
          </h1>

          {/* Intro */}
          <p className="text-[15px] text-gray-500 leading-[1.75] mb-14 pb-14 border-b border-gray-100">
            Wybierz stanowisko i prześlij CV. Odpowiadamy po przeanalizowaniu każdego zgłoszenia.
          </p>

          {/* Form — Suspense required for useSearchParams */}
          <Suspense fallback={null}>
            <ApplicationForm locale="pl" />
          </Suspense>

        </div>
      </div>
    </div>
  )
}
