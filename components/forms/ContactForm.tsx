'use client'

/**
 * ContactForm — canonical institutional contact form.
 *
 * - Locale-aware (PL/EN)
 * - GDPR consent with privacy policy link
 * - Optional newsletter consent
 * - Submit: validate → build payload → POST /api/contact → show success/error
 * - States: idle | submitting | success | error
 * - On success: form replaced by editorial FormSuccess block
 * - On error: form stays, inline FormError shown below consents
 */

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { validateContactForm, hasErrors } from '@/lib/forms/validation'
import { buildContactPayload } from '@/lib/forms/payload'
import { submitContactForm } from '@/lib/forms/submission'
import { CONTACT_TOPICS, FIELD_LIMITS } from '@/lib/forms/constants'
import type { ContactFormValues, FieldErrors, FormSubmitState, Locale, ContactTopic } from '@/lib/forms/types'

import { FormField } from './FormField'
import { FormTextarea } from './FormTextarea'
import { FormSelect } from './FormSelect'
import { FormConsent } from './FormConsent'
import { SubmitButton } from './SubmitButton'
import { FormSuccess } from './FormSuccess'
import { FormError } from './FormError'

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
    submit: 'Wyślij zapytanie',
    submitting: 'Wysyłanie...',
    success: {
      eyebrow: 'Wiadomość odebrana',
      heading: 'Zapytanie zostało wysłane.',
      body: 'Skontaktujemy się z Tobą w ciągu jednego dnia roboczego.',
    },
    error: {
      eyebrow: 'Błąd wysyłki',
      message: 'Nie udało się wysłać zapytania. Sprawdź połączenie i spróbuj ponownie.',
      retry: 'Spróbuj ponownie',
    },
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
    submit: 'Send enquiry',
    submitting: 'Sending...',
    success: {
      eyebrow: 'Message received',
      heading: 'Your enquiry has been sent.',
      body: 'We will contact you within one business day.',
    },
    error: {
      eyebrow: 'Submission error',
      message: 'We could not send your enquiry. Please check your connection and try again.',
      retry: 'Try again',
    },
  },
} as const

interface ContactFormProps {
  locale?: Locale
}

export function ContactForm({ locale = 'pl' }: ContactFormProps) {
  const t = COPY[locale]
  const pathname = usePathname()
  const topics = CONTACT_TOPICS[locale]
  const privacyHref = locale === 'pl' ? '/privacy' : '/en/privacy'

  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FieldErrors<ContactFormValues>>({})
  const [submitState, setSubmitState] = useState<FormSubmitState>('idle')

  function setField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validationErrors = validateContactForm(values, locale)
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors)
      return
    }

    setSubmitState('submitting')
    setErrors({})

    const payload = buildContactPayload(values, locale, pathname)
    const result = await submitContactForm(payload)

    setSubmitState(result.success ? 'success' : 'error')
  }

  function handleRetry() {
    setSubmitState('idle')
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitState === 'success') {
    return (
      <FormSuccess
        eyebrow={t.success.eyebrow}
        heading={t.success.heading}
        body={t.success.body}
      />
    )
  }

  const isSubmitting = submitState === 'submitting'

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t.ariaLabel}
      className="space-y-5"
    >
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
          description={t.consents.gdpr}
          privacyHref={privacyHref}
          privacyLabel={t.consents.gdprLink}
          required
          checked={values.consentGdpr}
          onChange={(v) => setField('consentGdpr', v)}
          error={errors.consentGdpr}
        />
        <FormConsent
          id="consentNewsletter"
          description={t.consents.newsletter}
          checked={values.consentNewsletter}
          onChange={(v) => setField('consentNewsletter', v)}
        />
      </div>

      {/* Inline error (submission failure) */}
      {submitState === 'error' && (
        <FormError
          eyebrow={t.error.eyebrow}
          message={t.error.message}
          retryLabel={t.error.retry}
          onRetry={handleRetry}
        />
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
