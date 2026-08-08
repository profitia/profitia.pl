'use client'

/**
 * ContactForm - canonical institutional contact form.
 *
 * - Locale-aware (PL/EN)
 * - GDPR consent with privacy policy link
 * - Optional newsletter consent
 * - Submit: validate → build payload → POST /api/contact → show success/error
 * - States: idle | submitting | success | error
 * - On success: form replaced by editorial FormSuccess block
 * - On error: form stays, inline FormError shown below consents
 */

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { validateContactForm, hasErrors } from '@/lib/forms/validation'
import { buildContactPayload } from '@/lib/forms/payload'
import { submitContactForm } from '@/lib/forms/submission'
import {
  CONTACT_CONSENT_COPY,
  CONTACT_TOPICS,
  FIELD_LIMITS,
  PRIVACY_POLICY_PATHS,
} from '@/lib/forms/constants'
import type { ContactFormValues, FieldErrors, FormSubmitState, Locale, ContactTopic } from '@/lib/forms/types'

import { FormField } from './FormField'
import { FormTextarea } from './FormTextarea'
import { FormSelect } from './FormSelect'
import { FormConsent } from './FormConsent'
import { SubmitButton } from './SubmitButton'
import { FormSuccess } from './FormSuccess'
import { FormError } from './FormError'
import { TurnstileWidget, type TurnstileWidgetHandle, type TurnstileWidgetStatus } from './TurnstileWidget'

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  topic: '',
  message: '',
  consentGdpr: false,
  consentNewsletter: false,
}

const COPY = {
  pl: {
    ariaLabel: 'Formularz kontaktowy',
    fields: {
      name: 'Imię i nazwisko',
      email: 'Adres e-mail',
      company: 'Firma',
      topic: 'Temat',
      message: 'Wiadomość',
    },
    placeholders: {
      company: 'Opcjonalnie',
      message: 'Opisz swoje zapytanie...',
    },
    consents: {
      gdpr: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu udzielenia odpowiedzi na moje zapytanie, zgodnie z',
      gdprLink: 'Polityką Prywatności.',
      newsletter:
        'Zgadzam się na przesyłanie informacji o usługach, publikacjach i wydarzeniach Profitia. Zgodę mogę wycofać w dowolnym momencie.',
    },
    submit: 'Wyślij wiadomość',
    submitting: 'Wysyłanie...',
    success: {
      eyebrow: 'Wiadomość odebrana',
      heading: 'Dziękujemy za wiadomość',
      body: 'Twoje zgłoszenie zostało wysłane. Wkrótce się z Tobą skontaktujemy.',
    },
    error: {
      eyebrow: 'Błąd wysyłki',
      message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.',
      retry: 'Spróbuj ponownie',
    },
    security: {
      inProgress: 'Trwa weryfikacja bezpieczeństwa. Spróbuj ponownie za chwilę.',
      failed: 'Nie udało się zweryfikować formularza. Spróbuj ponownie.',
      unavailable: 'Weryfikacja bezpieczeństwa jest chwilowo niedostępna. Spróbuj ponownie.',
    },
    serviceUnavailable: 'Usługa formularza jest chwilowo niedostępna. Spróbuj ponownie później.',
    rateLimited: 'Zbyt wiele prób wysłania formularza. Spróbuj ponownie za kilka minut.',
  },
  en: {
    ariaLabel: 'Contact form',
    fields: {
      name: 'Full name',
      email: 'Email address',
      company: 'Company',
      topic: 'Topic',
      message: 'Message',
    },
    placeholders: {
      company: 'Optional',
      message: 'Please describe your enquiry...',
    },
    consents: {
      gdpr: 'I consent to processing of my personal data by Profitia for the purpose of responding to my enquiry, in accordance with the',
      gdprLink: 'Privacy Policy.',
      newsletter:
        'I agree to receive information about Profitia services, publications and events. I may withdraw this consent at any time.',
    },
    submit: 'Send message',
    submitting: 'Sending...',
    success: {
      eyebrow: 'Message received',
      heading: 'Thank you for your message',
      body: 'Your enquiry has been sent. We will get back to you soon.',
    },
    error: {
      eyebrow: 'Submission error',
      message: "We couldn't send your message. Please try again.",
      retry: 'Try again',
    },
    security: {
      inProgress: 'Security verification is in progress. Please try again in a moment.',
      failed: "We couldn't verify the form. Please try again.",
      unavailable: 'Security verification is temporarily unavailable. Please try again.',
    },
    serviceUnavailable: 'The form service is temporarily unavailable. Please try again later.',
    rateLimited: 'Too many submission attempts. Please try again in a few minutes.',
  },
} as const

interface ContactFormProps {
  locale?: Locale
}

export function ContactForm({ locale = 'pl' }: ContactFormProps) {
  const t = COPY[locale]
  const pathname = usePathname()
  const topics = CONTACT_TOPICS[locale]
  const consentCopy = CONTACT_CONSENT_COPY[locale]
  const privacyHref = PRIVACY_POLICY_PATHS[locale]
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors<ContactFormValues>>({})
  const [submitState, setSubmitState] = useState<FormSubmitState>('idle')
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [website, setWebsite] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileWidgetStatus>(turnstileSiteKey ? 'loading' : 'error')

  const formRef = useRef<HTMLFormElement | null>(null)
  const successRef = useRef<HTMLDivElement | null>(null)
  const errorRef = useRef<HTMLDivElement | null>(null)
  const submitLockRef = useRef(false)
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null)

  const isSubmitting = submitState === 'submitting'

  useEffect(() => {
    if (submitState === 'success') {
      successRef.current?.focus()
    }
  }, [submitState])

  useEffect(() => {
    if (submitState === 'error') {
      errorRef.current?.focus()
    }
  }, [submitState])

  function focusField(fieldId: keyof ContactFormValues | 'name' | 'email' | 'topic' | 'message' | 'consentGdpr') {
    if (!formRef.current) {
      return
    }

    const element = formRef.current.querySelector<HTMLElement>(`#${fieldId}`)
    element?.focus()
  }

  function focusFirstError(nextErrors: FieldErrors<ContactFormValues>) {
    const order: Array<keyof ContactFormValues> = ['name', 'email', 'company', 'topic', 'message', 'consentGdpr']
    const firstField = order.find((field) => nextErrors[field])

    if (!firstField) {
      return
    }

    requestAnimationFrame(() => focusField(firstField))
  }

  function mapServerFieldErrors(fields?: Record<string, string>): FieldErrors<ContactFormValues> {
    if (!fields) {
      return {}
    }

    const mapped: FieldErrors<ContactFormValues> = {}
    const aliases: Record<string, keyof ContactFormValues> = {
      name: 'name',
      fullName: 'name',
      email: 'email',
      company: 'company',
      topic: 'topic',
      message: 'message',
      privacyConsent: 'consentGdpr',
      'consent.gdpr': 'consentGdpr',
    }

    for (const [field, message] of Object.entries(fields)) {
      const target = aliases[field]
      if (target && !mapped[target]) {
        mapped[target] = message
      }
    }

    return mapped
  }

  function setField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (submitState === 'error') {
      setSubmitState('idle')
      setSubmitErrorMessage(null)
    }
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
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
      case 'FORMS_STORAGE_UNAVAILABLE':
        return t.serviceUnavailable
      case 'BOT_VERIFICATION_REQUIRED':
      case 'BOT_VERIFICATION_FAILED':
        return t.security.failed
      case 'BOT_VERIFICATION_UNAVAILABLE':
        return t.security.unavailable
      default:
        return fallbackMessage ?? t.error.message
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (submitLockRef.current) {
      return
    }

    submitLockRef.current = true

    const validationErrors = validateContactForm(values, locale)
    if (hasErrors(validationErrors)) {
      submitLockRef.current = false
      setSubmitState('idle')
      setSubmitErrorMessage(null)
      setErrors(validationErrors)
      focusFirstError(validationErrors)
      return
    }

    if (!turnstileToken) {
      submitLockRef.current = false
      setSubmitState('error')
      setSubmitErrorMessage(turnstileStatus === 'error' ? t.security.unavailable : t.security.inProgress)
      return
    }

    setSubmitState('submitting')
    setErrors({})
    setSubmitErrorMessage(null)

    try {
      const payload = {
        ...buildContactPayload(values, locale, pathname),
        website,
        formStartedAt,
        turnstileToken,
      }
      const result = await submitContactForm(payload)

      if (result.success) {
        resetSecurityTransport()
        setTurnstileToken(null)
        setValues(INITIAL_VALUES)
        setErrors({})
        setSubmitErrorMessage(null)
        setSubmitState('success')
        return
      }

      resetTurnstileChallenge()

      const serverFieldErrors = mapServerFieldErrors(result.fields)
      if (result.errorCode === 'VALIDATION_ERROR' && hasErrors(serverFieldErrors)) {
        setErrors(serverFieldErrors)
        setSubmitState('idle')
        focusFirstError(serverFieldErrors)
        return
      }

      setSubmitErrorMessage(getSubmissionErrorMessage(result.errorCode, result.message ?? null))
      setSubmitState('error')
    } finally {
      submitLockRef.current = false
    }
  }

  function handleRetry() {
    setSubmitState('idle')
    setSubmitErrorMessage(null)
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitState === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} className="focus:outline-none">
        <FormSuccess
          eyebrow={t.success.eyebrow}
          heading={t.success.heading}
          body={t.success.body}
        />
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.ariaLabel}
      className="space-y-5"
    >
      <div className="sr-only" aria-live="polite">
        {isSubmitting ? t.submitting : submitState === 'error' ? submitErrorMessage ?? t.error.message : ''}
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

      {/* Row 1: Name + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          id="name"
          label={t.fields.name}
          value={values.name}
          onChange={(v) => setField('name', v)}
          required
          disabled={isSubmitting}
          error={errors.name}
          autoComplete="name"
        />
        <FormField
          id="email"
          label={t.fields.email}
          type="email"
          value={values.email}
          onChange={(v) => setField('email', v)}
          required
          disabled={isSubmitting}
          error={errors.email}
          autoComplete="email"
        />
      </div>

      {/* Row 2: Company + Topic */}
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField
          id="company"
          label={t.fields.company}
          value={values.company}
          onChange={(v) => setField('company', v)}
          placeholder={t.placeholders.company}
          disabled={isSubmitting}
          error={errors.company}
          autoComplete="organization"
        />
        <FormSelect
          id="topic"
          label={t.fields.topic}
          options={topics as ReadonlyArray<{ readonly value: string; readonly label: string }>}
          value={values.topic}
          onChange={(v) => setField('topic', v as ContactTopic | '')}
          required
          disabled={isSubmitting}
          error={errors.topic}
        />
      </div>

      {/* Message */}
      <FormTextarea
        id="message"
        label={t.fields.message}
        value={values.message}
        onChange={(v) => setField('message', v)}
        placeholder={t.placeholders.message}
        required
        disabled={isSubmitting}
        rows={5}
        maxLength={FIELD_LIMITS.message.max}
        error={errors.message}
      />

      {/* Consent block */}
      <div className="pt-6 border-t border-gray-100 space-y-4">
        <FormConsent
          id="consentGdpr"
          description={consentCopy.privacyConsentText}
          privacyHref={privacyHref}
          privacyLabel={consentCopy.privacyPolicyLabel}
          required
          checked={values.consentGdpr}
          onChange={(v) => setField('consentGdpr', v)}
          error={errors.consentGdpr}
        />
        <FormConsent
          id="consentNewsletter"
          description={consentCopy.marketingConsentText}
          checked={values.consentNewsletter}
          onChange={(v) => setField('consentNewsletter', v)}
        />
        <TurnstileWidget
          ref={turnstileRef}
          locale={locale}
          siteKey={turnstileSiteKey}
          onTokenChange={setTurnstileToken}
          onStatusChange={setTurnstileStatus}
        />
      </div>

      {/* Inline error (submission failure) */}
      {submitState === 'error' && (
        <div ref={errorRef} tabIndex={-1} className="focus:outline-none">
          <FormError
            eyebrow={t.error.eyebrow}
            message={submitErrorMessage ?? t.error.message}
            retryLabel={t.error.retry}
            onRetry={handleRetry}
          />
        </div>
      )}

      {/* Submit */}
      <div className="pt-1">
        <SubmitButton
          label={t.submit}
          loadingLabel={t.submitting}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}
