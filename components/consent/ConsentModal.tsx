'use client'

/**
 * ConsentModal — Preferences Management Modal
 *
 * Full GDPR-compliant consent preferences interface.
 * Canonical Profitia aesthetic: editorial, institutional, calm.
 *
 * Layout:
 * - Mobile: full-screen bottom sheet (rounded top corners)
 * - Desktop: centered modal, max-w-lg, max-h-[80vh], scroll on overflow
 *
 * Structure:
 * - Header: eyebrow + title + close button
 * - Category list: each with toggle, label, description, examples
 * - Footer: Save (primary CTA) + Cancel (text) + version metadata
 *
 * Necessary cookies: locked ON, visually distinct.
 * Backdrop: subtle blur overlay — closes modal on click.
 */

import { useCallback, useEffect, useState } from 'react'
import { CONSENT_CATEGORIES } from '@/lib/consent/categories'
import type { ConsentCategories } from '@/lib/consent/types'
import { CONSENT_VERSION } from '@/lib/consent/storage'
import { useConsent } from './ConsentProvider'
import { ConsentToggle } from './ConsentToggle'

const COPY = {
  pl: {
    eyebrow: 'Ustawienia prywatności',
    title: 'Zarządzaj zgodami',
    description:
      'Wybierz, które kategorie plików cookie chcesz aktywować. Niezbędne pliki cookie są zawsze włączone i nie można ich wyłączyć.',
    save: 'Zapisz ustawienia',
    cancel: 'Anuluj',
    version: 'Wersja polityki',
    required: 'Zawsze aktywne',
    examples: 'Przykłady',
    close: 'Zamknij',
  },
  en: {
    eyebrow: 'Privacy settings',
    title: 'Manage consent',
    description:
      'Choose which cookie categories you wish to enable. Necessary cookies are always active and cannot be disabled.',
    save: 'Save settings',
    cancel: 'Cancel',
    version: 'Policy version',
    required: 'Always active',
    examples: 'Examples',
    close: 'Close',
  },
}

interface ConsentModalProps {
  locale?: string
}

export function ConsentModal({ locale = 'pl' }: ConsentModalProps) {
  const { record, saveCustom, closeModal } = useConsent()

  const t = COPY[locale === 'en' ? 'en' : 'pl']
  const lang = locale === 'en' ? 'en' : 'pl'

  // Local draft state — mirrors saved consent, or defaults
  const [draft, setDraft] = useState<ConsentCategories>({
    necessary: true,
    analytics: record?.categories.analytics ?? false,
    marketing: record?.categories.marketing ?? false,
    functional: record?.categories.functional ?? false,
  })

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const handleToggle = useCallback((category: keyof ConsentCategories, value: boolean) => {
    setDraft((prev) => ({ ...prev, [category]: value }))
  }, [])

  const handleSave = useCallback(() => {
    saveCustom(draft)
  }, [draft, saveCustom])

  return (
    <>
      {/* ── Backdrop ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={closeModal}
        className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-[2px] motion-reduce:backdrop-blur-none"
      />

      {/* ── Modal shell ─────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-modal-title"
        className="fixed inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center z-[80] sm:p-6 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="bg-white w-full sm:max-w-lg sm:rounded-xl rounded-t-2xl sm:rounded-t-xl max-h-[90vh] sm:max-h-[80vh] flex flex-col shadow-[0_8px_40px_0_rgba(0,0,0,0.12)]">

          {/* ── Header ──────────────────────────────────── */}
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-1.5">
                {t.eyebrow}
              </p>
              <h2
                id="consent-modal-title"
                className="text-lg font-semibold tracking-tight text-gray-900"
              >
                {t.title}
              </h2>
            </div>
            <button
              onClick={closeModal}
              aria-label={t.close}
              className="ml-4 mt-0.5 flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-900 transition-colors duration-200 ease-out rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* ── Description ─────────────────────────────── */}
          <p className="px-6 pt-4 pb-3 text-sm text-gray-500 leading-[1.7]">
            {t.description}
          </p>

          {/* ── Category list ────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-6 pb-2">
            <ul className="divide-y divide-gray-100" role="list">
              {CONSENT_CATEGORIES.map((cat) => {
                const isEnabled = cat.required ? true : draft[cat.id]
                return (
                  <li key={cat.id} className="py-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Category label */}
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <label
                            htmlFor={`consent-toggle-${cat.id}`}
                            className="text-sm font-medium text-gray-900 cursor-pointer"
                          >
                            {cat.label[lang]}
                          </label>
                          {cat.required && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-400 bg-gray-100">
                              {t.required}
                            </span>
                          )}
                        </div>
                        {/* Description */}
                        <p className="text-[13.5px] text-gray-500 leading-[1.65] mb-2">
                          {cat.description[lang]}
                        </p>
                        {/* Examples */}
                        <p className="text-[12px] text-gray-400 leading-snug">
                          <span className="font-medium">{t.examples}:</span>{' '}
                          {cat.examples[lang]}
                        </p>
                      </div>

                      {/* Toggle */}
                      <div className="pt-0.5 flex-shrink-0">
                        <ConsentToggle
                          id={`consent-toggle-${cat.id}`}
                          enabled={isEnabled}
                          required={cat.required}
                          onChange={(val) =>
                            handleToggle(cat.id as keyof ConsentCategories, val)
                          }
                        />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── Footer ──────────────────────────────────── */}
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* Primary: Save */}
              <button
                onClick={handleSave}
                className="px-5 py-3 text-sm font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-lg transition-colors duration-200 ease-out"
              >
                {t.save}
              </button>

              {/* Cancel */}
              <button
                onClick={closeModal}
                className="px-4 py-3 text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out"
              >
                {t.cancel}
              </button>
            </div>

            {/* Consent version metadata */}
            <p className="mt-4 text-[11px] text-gray-300 leading-snug">
              {t.version}: {CONSENT_VERSION}
              {record?.updatedAt && (
                <>
                  {' · '}
                  {new Date(record.updatedAt).toLocaleDateString(
                    locale === 'en' ? 'en-GB' : 'pl-PL',
                    { day: 'numeric', month: 'long', year: 'numeric' }
                  )}
                </>
              )}
            </p>
          </div>

        </div>
      </div>
    </>
  )
}
