'use client'

/**
 * NewsletterForm — consent-aware newsletter subscription form.
 *
 * Variants:
 *   footer   — inline (email + button in a row), used in Footer
 *   inline   — same layout, full width, for homepage / article contexts
 *   compact  — same as inline (alias for now)
 *
 * GDPR: explicit checkbox consent (Article 6(1)(a)).
 * No passive implied consent. Checkbox must be checked before submission.
 *
 * On success: replaces form with calm confirmation text.
 * On error: shows inline error below the button row.
 */

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { validateNewsletterForm, hasErrors } from '@/lib/forms/validation'
import { buildNewsletterPayload } from '@/lib/forms/payload'
import { submitNewsletterForm } from '@/lib/forms/submission'
import type { NewsletterFormValues, FieldErrors, FormSubmitState, Locale } from '@/lib/forms/types'

export type NewsletterVariant = 'footer' | 'inline' | 'compact'

interface NewsletterFormProps {
  locale?: Locale
  variant?: NewsletterVariant
}

const COPY = {
  pl: {
    emailPlaceholder: 'Twój adres e-mail',
    button: 'Zapisz się',
    submitting: 'Wysyłanie...',
    consent:
      'Wyrażam zgodę na przetwarzanie moich danych przez Profitia w celu przesyłania newslettera, zgodnie z',
    consentLink: 'Polityką Prywatności.',
    consentError: 'Akceptacja jest wymagana.',
    success: 'Dziękujemy. Zapisaliśmy Twój adres e-mail.',
    error: 'Nie udało się zapisać. Spróbuj ponownie.',
  },
  en: {
    emailPlaceholder: 'Your email address',
    button: 'Subscribe',
    submitting: 'Submitting...',
    consent:
      'I consent to processing of my personal data by Profitia for the purpose of sending the newsletter, in accordance with the',
    consentLink: 'Privacy Policy.',
    consentError: 'Your acceptance is required.',
    success: 'Thank you. Your email address has been registered.',
    error: 'Could not subscribe. Please try again.',
  },
} as const

const INITIAL: NewsletterFormValues = { email: '', consentGdpr: false }

export function NewsletterForm({ locale = 'pl', variant = 'inline' }: NewsletterFormProps) {
  const t = COPY[locale]
  const pathname = usePathname()
  const privacyHref = locale === 'pl' ? '/privacy' : '/en/privacy'

  const [values, setValues] = useState<NewsletterFormValues>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors<NewsletterFormValues>>({})
  const [submitState, setSubmitState] = useState<FormSubmitState>('idle')

  const emailId = `newsletter-email-${variant}`
  const consentId = `newsletter-consent-${variant}`

  function setEmail(v: string) {
    setValues((prev) => ({ ...prev, email: v }))
    if (errors.email) setErrors((prev) => { const n = { ...prev }; delete n.email; return n })
  }

  function setConsent(v: boolean) {
    setValues((prev) => ({ ...prev, consentGdpr: v }))
    if (errors.consentGdpr) setErrors((prev) => { const n = { ...prev }; delete n.consentGdpr; return n })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validateNewsletterForm(values, locale)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setSubmitState('submitting')
    setErrors({})

    const payload = buildNewsletterPayload(values, locale, pathname)
    const result = await submitNewsletterForm(payload)

    setSubmitState(result.success ? 'success' : 'error')
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitState === 'success') {
    return (
      <p
        className="text-sm text-gray-600 leading-relaxed"
        role="status"
        aria-live="polite"
      >
        {t.success}
      </p>
    )
  }

  const isSubmitting = submitState === 'submitting'

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={locale === 'pl' ? 'Newsletter' : 'Newsletter'}
    >
      {/* Email + button row */}
      <div className="flex gap-2">
        <div className="flex-1 min-w-0">
          <label htmlFor={emailId} className="sr-only">
            {t.emailPlaceholder}
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            disabled={isSubmitting}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            className={[
              'w-full px-4 py-3.5 text-sm bg-white border rounded-lg',
              'text-gray-900 placeholder:text-gray-400',
              'focus:outline-none transition-colors duration-200 ease-out',
              errors.email
                ? 'border-red-300 focus:border-red-400'
                : 'border-gray-200 focus:border-gray-500',
            ].join(' ')}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3.5 text-sm font-medium text-white bg-[#1C1C1E] hover:bg-[#2D2D30] rounded-lg border border-transparent transition-colors duration-200 ease-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.submitting : t.button}
        </button>
      </div>

      {/* Email error */}
      {errors.email && (
        <p id={`${emailId}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {errors.email}
        </p>
      )}

      {/* GDPR consent checkbox — full label wrapping for correct click UX */}
      <label
        htmlFor={consentId}
        className="mt-2 flex gap-2.5 items-start cursor-pointer select-none"
      >
        <span className="relative mt-[2px] flex-shrink-0 w-4 h-4">
          <input
            id={consentId}
            type="checkbox"
            checked={values.consentGdpr}
            onChange={(e) => setConsent(e.target.checked)}
            className="peer sr-only"
            aria-invalid={errors.consentGdpr ? true : undefined}
          />
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 flex items-center justify-center rounded-[3px] border',
              'transition-colors duration-200 ease-out',
              'peer-focus-visible:ring-1 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-1',
              values.consentGdpr
                ? 'bg-gray-900 border-gray-900'
                : errors.consentGdpr
                ? 'border-red-300 bg-white'
                : 'border-gray-300 bg-white',
            ].join(' ')}
          >
            {values.consentGdpr && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                <path
                  d="M1 3l2 2 4-4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>
        <span className="text-[11px] text-gray-500 leading-[1.6]">
          {t.consent}{' '}
          <a
            href={privacyHref}
            className="underline underline-offset-2 hover:text-gray-700 transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {t.consentLink}
          </a>
        </span>
      </label>

      {/* Consent error */}
      {errors.consentGdpr && (
        <p role="alert" className="mt-1.5 text-[12px] text-red-600 pl-[26px]">
          {errors.consentGdpr}
        </p>
      )}

      {/* Submission error */}
      {submitState === 'error' && (
        <p role="alert" aria-live="polite" className="mt-3 text-[12px] text-red-600">
          {t.error}
        </p>
      )}
    </form>
  )
}
