'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { CareerLocale } from '@/lib/careers'
import { JOB_POSTS, tCareer } from '@/lib/careers'
import {
  validateApplication,
  hasApplicationErrors,
  ROLE_PARAM,
  FIELD_LIMITS,
} from '@/lib/careers/application'
import type { ApplicationFormValues } from '@/lib/careers/application'
import { ApplicationField } from './ApplicationField'
import { ApplicationTextarea } from './ApplicationTextarea'
import { ApplicationSelect } from './ApplicationSelect'
import { ApplicationUpload } from './ApplicationUpload'
import { ApplicationConsent } from './ApplicationConsent'
import { ApplicationSuccess } from './ApplicationSuccess'
import { SubmitButton } from '@/components/forms/SubmitButton'

// ─────────────────────────────────────────────────────────────────────────────
// Copy
// ─────────────────────────────────────────────────────────────────────────────

const COPY = {
  pl: {
    ariaLabel: 'Formularz aplikacyjny',
    fields: {
      role: 'Stanowisko',
      rolePlaceholder: 'Wybierz stanowisko',
      fullName: 'Imię i nazwisko',
      email: 'Adres e-mail',
      phone: 'Numer telefonu',
      linkedin: 'Profil LinkedIn (opcjonalnie)',
      message: 'Dodatkowa informacja (opcjonalnie)',
      messagePlaceholder: 'Możesz dodać krótki komentarz do aplikacji...',
      cv: 'Załącz CV (PDF, max 10 MB)',
      cvHint: 'PDF · max 10 MB',
    },
    consents: {
      current: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia obecnego procesu rekrutacyjnego.',
      future: 'Wyrażam zgodę na przetwarzanie moich danych osobowych również w przyszłych procesach rekrutacyjnych prowadzonych przez Profitia.',
    },
    submit: 'Prześlij aplikację',
    submitting: 'Wysyłanie...',
    success: {
      eyebrow: 'Aplikacja przesłana',
      heading: 'Dziękujemy za przesłanie aplikacji.',
      body: 'Wracamy z odpowiedzią po przeanalizowaniu zgłoszenia.',
    },
    legalNote: 'Administratorem Państwa danych osobowych jest Profitia Management Consultants Mazurowski i Wspólnicy Sp. J. Dane przetwarzane są wyłącznie w celu prowadzenia procesu rekrutacyjnego.',
  },
  en: {
    ariaLabel: 'Application form',
    fields: {
      role: 'Position',
      rolePlaceholder: 'Select a position',
      fullName: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      linkedin: 'LinkedIn profile (optional)',
      message: 'Additional note (optional)',
      messagePlaceholder: 'You may add a brief comment to your application...',
      cv: 'Attach CV (PDF, max 10 MB)',
      cvHint: 'PDF · max 10 MB',
    },
    consents: {
      current: 'I consent to the processing of my personal data for the purpose of the current recruitment process.',
      future: 'I consent to the processing of my personal data for future recruitment processes conducted by Profitia.',
    },
    submit: 'Submit application',
    submitting: 'Submitting...',
    success: {
      eyebrow: 'Application received',
      heading: 'Thank you for submitting your application.',
      body: 'We will respond after reviewing your submission.',
    },
    legalNote: 'The data controller is Profitia Management Consultants Mazurowski i Wspólnicy Sp. J. Data is processed solely for the purpose of the recruitment process.',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  locale: CareerLocale
}

/**
 * ApplicationForm
 * ─────────────────────────────────────────────────────────────
 * Recruitment application form - institutional, calm, document-centric.
 *
 * Reads ?role= from URL to preselect the role.
 * User may change it manually.
 *
 * State machine: idle → submitting → success
 * No backend storage yet - success state shown after validation passes.
 * Architecture is ready for future POST /api/career/apply integration.
 */
export default function ApplicationForm({ locale }: Props) {
  const searchParams = useSearchParams()
  const preselectedRole = searchParams.get(ROLE_PARAM) ?? ''

  const c = COPY[locale]

  // ── Role options derived from data - no hardcoding ──────────
  const roleOptions = JOB_POSTS.map((job) => ({
    value: job.slug,
    label: tCareer(job.title, locale),
  }))

  // ── Form state ───────────────────────────────────────────────
  const [values, setValues] = useState<ApplicationFormValues>({
    roleSlug: preselectedRole,
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    message: '',
    cv: null,
    consentCurrent: false,
    consentFuture: false,
  })

  const [errors, setErrors] = useState<Partial<ApplicationFormValues & { cv: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = <K extends keyof ApplicationFormValues>(key: K, val: ApplicationFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    // Clear error on change
    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fieldErrors = validateApplication(values, locale)
    if (hasApplicationErrors(fieldErrors)) {
      setErrors(fieldErrors as typeof errors)
      // Focus first error field
      const firstErrorKey = Object.keys(fieldErrors)[0]
      document.getElementById(firstErrorKey)?.focus()
      return
    }

    setIsSubmitting(true)
    // Future: POST /api/career/apply with FormData including cv file
    // For now: simulate submission latency, then show success
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  // ── Success state ────────────────────────────────────────────
  if (submitted) {
    return (
      <ApplicationSuccess
        eyebrow={c.success.eyebrow}
        heading={c.success.heading}
        body={c.success.body}
      />
    )
  }

  // ── Form ─────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      aria-label={c.ariaLabel}
      noValidate
      className="space-y-8"
    >

      {/* Role select */}
      <ApplicationSelect
        id="roleSlug"
        label={c.fields.role}
        required
        value={values.roleSlug}
        onChange={(v) => set('roleSlug', v)}
        options={roleOptions}
        placeholder={c.fields.rolePlaceholder}
        error={errors.roleSlug as string | undefined}
        disabled={isSubmitting}
      />

      {/* Full name */}
      <ApplicationField
        id="fullName"
        label={c.fields.fullName}
        required
        value={values.fullName}
        onChange={(v) => set('fullName', v)}
        autoComplete="name"
        error={errors.fullName as string | undefined}
        disabled={isSubmitting}
      />

      {/* Email */}
      <ApplicationField
        id="email"
        label={c.fields.email}
        type="email"
        required
        value={values.email}
        onChange={(v) => set('email', v)}
        autoComplete="email"
        error={errors.email as string | undefined}
        disabled={isSubmitting}
      />

      {/* Phone */}
      <ApplicationField
        id="phone"
        label={c.fields.phone}
        type="tel"
        required
        value={values.phone}
        onChange={(v) => set('phone', v)}
        autoComplete="tel"
        error={errors.phone as string | undefined}
        disabled={isSubmitting}
      />

      {/* LinkedIn - optional */}
      <ApplicationField
        id="linkedin"
        label={c.fields.linkedin}
        type="url"
        value={values.linkedin}
        onChange={(v) => set('linkedin', v)}
        placeholder="https://linkedin.com/in/..."
        error={errors.linkedin as string | undefined}
        disabled={isSubmitting}
        autoComplete="url"
      />

      {/* CV upload */}
      <ApplicationUpload
        id="cv"
        label={c.fields.cv}
        required
        value={values.cv}
        onChange={(f) => set('cv', f)}
        hint={c.fields.cvHint}
        error={errors.cv as string | undefined}
        disabled={isSubmitting}
      />

      {/* Message - optional */}
      <ApplicationTextarea
        id="message"
        label={c.fields.message}
        placeholder={c.fields.messagePlaceholder}
        value={values.message}
        onChange={(v) => set('message', v)}
        rows={4}
        maxLength={FIELD_LIMITS.message}
        error={errors.message as string | undefined}
        disabled={isSubmitting}
      />

      {/* Consents - two separate, never combined */}
      <div className="space-y-5 pt-2">
        <ApplicationConsent
          id="consentCurrent"
          description={c.consents.current}
          required
          checked={values.consentCurrent}
          onChange={(v) => set('consentCurrent', v)}
          error={errors.consentCurrent as string | undefined}
        />
        <ApplicationConsent
          id="consentFuture"
          description={c.consents.future}
          checked={values.consentFuture}
          onChange={(v) => set('consentFuture', v)}
        />
      </div>

      {/* Legal note */}
      <p className="text-[12px] text-gray-400 leading-[1.7]">
        {c.legalNote}
      </p>

      {/* Submit */}
      <div className="pt-2">
        <SubmitButton
          label={c.submit}
          loadingLabel={c.submitting}
          isSubmitting={isSubmitting}
        />
      </div>

    </form>
  )
}
