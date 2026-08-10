'use client'

/**
 * NewsletterForm - consent-aware newsletter subscription form.
 *
 * Variants:
 *   footer   - inline (email + button in a row), used in Footer
 *   inline   - same layout, full width, for homepage / article contexts
 *   compact  - same as inline (alias for now)
 *
 * GDPR: explicit checkbox consent (Article 6(1)(a)).
 * No passive implied consent. Checkbox must be checked before submission.
 *
 * On success: replaces form with calm confirmation text.
 * On error: shows inline error below the button row.
 */

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { NEWSLETTER_TURNSTILE_ACTION } from '@/lib/forms/constants'
import { validateNewsletterForm, hasErrors } from '@/lib/forms/validation'
import { buildNewsletterPayload } from '@/lib/forms/payload'
import { submitNewsletterForm } from '@/lib/forms/submission'
import type { NewsletterFormValues, FieldErrors, FormSubmitState, Locale } from '@/lib/forms/types'
import { getNewsletterConsentContent } from '@/lib/newsletter/consent'
import { TurnstileWidget, type TurnstileWidgetHandle, type TurnstileWidgetStatus } from './TurnstileWidget'

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
    consentError: 'Akceptacja jest wymagana.',
    success: 'Dziękujemy. Zapisaliśmy Twój adres e-mail.',
    error: 'Nie udało się zapisać. Spróbuj ponownie.',
    security: {
      inProgress: 'Trwa weryfikacja bezpieczeństwa. Spróbuj ponownie za chwilę.',
      failed: 'Nie udało się zweryfikować formularza. Spróbuj ponownie.',
      unavailable: 'Weryfikacja bezpieczeństwa jest chwilowo niedostępna. Spróbuj ponownie.',
    },
    rateLimited: 'Zbyt wiele prób zapisu. Spróbuj ponownie za kilka minut.',
  },
  en: {
    emailPlaceholder: 'Your email address',
    button: 'Subscribe',
    submitting: 'Submitting...',
    consentError: 'Your acceptance is required.',
    success: 'Thank you. Your email address has been registered.',
    error: 'Could not subscribe. Please try again.',
    security: {
      inProgress: 'Security verification is in progress. Please try again in a moment.',
      failed: "We couldn't verify the form. Please try again.",
      unavailable: 'Security verification is temporarily unavailable. Please try again.',
    },
    rateLimited: 'Too many subscription attempts. Please try again in a few minutes.',
  },
} as const

const INITIAL: NewsletterFormValues = { email: '', consentGdpr: false }

export function NewsletterForm({ locale = 'pl', variant = 'inline' }: NewsletterFormProps) {
  const t = COPY[locale]
  const pathname = usePathname()
  const privacyHref = locale === 'pl' ? '/privacy' : '/en/privacy'
  const consentContent = getNewsletterConsentContent(locale)
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (
    process.env.NODE_ENV === 'development' ? 'newsletter-local-dev-site-key' : ''
  )

  const [values, setValues] = useState<NewsletterFormValues>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors<NewsletterFormValues>>({})
  const [submitState, setSubmitState] = useState<FormSubmitState>('idle')
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [website, setWebsite] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileWidgetStatus>(turnstileSiteKey ? 'loading' : 'error')
  const submitLockRef = useRef(false)
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null)
  const isFooter = variant === 'footer'

  const emailId = `newsletter-email-${variant}`
  const consentId = `newsletter-consent-${variant}`

  function setEmail(v: string) {
    setValues((prev) => ({ ...prev, email: v }))
    if (submitState === 'error') {
      setSubmitState('idle')
      setSubmitErrorMessage(null)
    }
    if (errors.email) setErrors((prev) => { const n = { ...prev }; delete n.email; return n })
  }

  function setConsent(v: boolean) {
    setValues((prev) => ({ ...prev, consentGdpr: v }))
    if (submitState === 'error') {
      setSubmitState('idle')
      setSubmitErrorMessage(null)
    }
    if (errors.consentGdpr) setErrors((prev) => { const n = { ...prev }; delete n.consentGdpr; return n })
  }

  function resetTurnstileChallenge() {
    setTurnstileToken(null)
    turnstileRef.current?.reset()
  }

  function resetSecurityTransport() {
    setWebsite('')
    setFormStartedAt(Date.now())
  }

  function getSubmissionErrorMessage(errorCode?: string, fallbackMessage?: string | null) {
    switch (errorCode) {
      case 'RATE_LIMITED':
        return t.rateLimited
      case 'BOT_VERIFICATION_REQUIRED':
      case 'BOT_VERIFICATION_FAILED':
        return t.security.failed
      case 'BOT_VERIFICATION_UNAVAILABLE':
        return t.security.unavailable
      default:
        return t.error
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (submitLockRef.current) {
      return
    }

    const validationErrors = validateNewsletterForm(values, locale)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    if (!turnstileToken) {
      setSubmitState('error')
      setSubmitErrorMessage(turnstileStatus === 'error' ? t.security.unavailable : t.security.inProgress)
      return
    }

    submitLockRef.current = true
    setSubmitState('submitting')
    setErrors({})
    setSubmitErrorMessage(null)

    try {
      const payload = buildNewsletterPayload(values, locale, pathname, {
        website,
        formStartedAt,
        turnstileToken,
      })
      const result = await submitNewsletterForm(payload)

      if (result.success) {
        resetSecurityTransport()
        setTurnstileToken(null)
        setValues(INITIAL)
        setErrors({})
        setSubmitErrorMessage(null)
        setSubmitState('success')
        return
      }

      resetTurnstileChallenge()
      setSubmitErrorMessage(getSubmissionErrorMessage(result.errorCode, result.message ?? null))
      setSubmitState('error')
    } finally {
      submitLockRef.current = false
    }
  }

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitState === 'success') {
    return (
      <p
        className={`${isFooter ? 'text-sm text-white/72' : 'text-sm text-gray-600'} leading-relaxed`}
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
      <div className="sr-only" aria-live="polite">
        {isSubmitting ? t.submitting : submitState === 'error' ? submitErrorMessage ?? t.error : ''}
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
        className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden opacity-0"
      />

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
                : isFooter
                ? 'border-white/15 focus:border-brand-blue'
                : 'border-gray-200 focus:border-brand-blue',
            ].join(' ')}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3.5 text-sm font-medium text-white bg-gray-900 hover:bg-brand-blue rounded-lg border border-transparent transition-colors duration-200 ease-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* GDPR consent checkbox - full label wrapping for correct click UX */}
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
              'peer-focus-visible:ring-1 peer-focus-visible:ring-brand-blue peer-focus-visible:ring-offset-1',
              values.consentGdpr
                ? 'bg-brand-blue border-brand-blue'
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
        <span className={`text-[11px] leading-[1.6] ${isFooter ? 'text-white/68' : 'text-gray-500'}`}>
          {consentContent.prefixText}{' '}
          <a
            href={privacyHref}
            className={`underline underline-offset-2 transition-colors duration-200 hover:text-brand-blue`}
            onClick={(e) => e.stopPropagation()}
          >
            {consentContent.linkLabel}
          </a>
        </span>
      </label>

      {/* Consent error */}
      {errors.consentGdpr && (
        <p role="alert" className="mt-1.5 text-[12px] text-red-600 pl-[26px]">
          {errors.consentGdpr}
        </p>
      )}

      <div className="mt-2 min-h-px overflow-hidden">
        <TurnstileWidget
          ref={turnstileRef}
          action={NEWSLETTER_TURNSTILE_ACTION}
          locale={locale}
          siteKey={turnstileSiteKey}
          onTokenChange={setTurnstileToken}
          onStatusChange={setTurnstileStatus}
        />
      </div>

      {/* Submission error */}
      {submitState === 'error' && (
        <p role="alert" aria-live="polite" className="mt-3 text-[12px] text-red-600">
          {submitErrorMessage ?? t.error}
        </p>
      )}
    </form>
  )
}
