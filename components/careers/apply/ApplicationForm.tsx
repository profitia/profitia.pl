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
  getRoleConfig,
} from '@/lib/careers/application'
import type { ApplicationFormValues, ApplicationFieldErrors, FormQuestion, RoleFormConfig } from '@/lib/careers/application'
import { ApplicationField } from './ApplicationField'
import { ApplicationTextarea } from './ApplicationTextarea'
import { ApplicationSelect } from './ApplicationSelect'
import { ApplicationRadio } from './ApplicationRadio'
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
      cv: 'Załącz CV (PDF, DOC, DOCX · max 10 MB)',
      cvHint: 'PDF, DOC, DOCX · max 10 MB',
    },
    consents: {
      current: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia obecnego procesu rekrutacyjnego.',
      future: 'Wyrażam zgodę na przetwarzanie moich danych osobowych również w przyszłych procesach rekrutacyjnych prowadzonych przez Profitia.',
    },
    submit: 'Prześlij aplikację',
    submitting: 'Wysyłanie...',
    success: {
      eyebrow: 'Aplikacja przesłana',
      heading: 'Dziękujemy. Twoja aplikacja trafiła do Profitia.',
      appliedLabel: 'Złożono na stanowisko',
      body: 'Weryfikujemy każdą aplikację indywidualnie. Skontaktujemy się z Tobą, jeśli Twój profil będzie odpowiadał naszym wymaganiom.',
      backLabel: 'Wróć do strony Kariera',
      backHref: '/career',
    },
    legalNote: 'Administratorem Państwa danych osobowych jest Profitia Management Consultants Mazurowski i Wspólnicy Sp. J. Dane przetwarzane są wyłącznie w celu prowadzenia procesu rekrutacyjnego.',
    selectPrompt: 'Wybierz stanowisko, aby zobaczyć pełny formularz.',
    selectPlaceholder: 'Wybierz...',
  },
  en: {
    ariaLabel: 'Application form',
    fields: {
      role: 'Position',
      rolePlaceholder: 'Select a position',
      fullName: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      cv: 'Attach CV (PDF, DOC, DOCX · max 10 MB)',
      cvHint: 'PDF, DOC, DOCX · max 10 MB',
    },
    consents: {
      current: 'I consent to the processing of my personal data for the purpose of the current recruitment process.',
      future: 'I consent to the processing of my personal data for future recruitment processes conducted by Profitia.',
    },
    submit: 'Submit application',
    submitting: 'Submitting...',
    success: {
      eyebrow: 'Application received',
      heading: 'Thank you. Your application has been received by Profitia.',
      appliedLabel: 'Applied for',
      body: 'We review each application individually and will be in touch if your profile matches our requirements.',
      backLabel: 'Back to Career',
      backHref: '/en/career',
    },
    legalNote: 'The data controller is Profitia Management Consultants Mazurowski i Wspólnicy Sp. J. Data is processed solely for the purpose of the recruitment process.',
    selectPrompt: 'Select a role to see the full form.',
    selectPlaceholder: 'Select...',
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
 * Dynamic recruitment application form.
 *
 * Reads ?role= from URL to preselect the role and show role-specific questions.
 * When no role param is present: role selector shown first; full form appears
 * after the candidate picks a role.
 *
 * Architecture: roleConfig drives which extra questions appear between the
 * contact fields and the CV upload. Adding a new role = add to role-config.ts.
 *
 * State machine: idle → submitting → success
 */
export default function ApplicationForm({ locale }: Props) {
  const searchParams = useSearchParams()
  const preselectedRole = searchParams.get(ROLE_PARAM) ?? ''

  const c = COPY[locale]

  // ── Role options ─────────────────────────────────────────────
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
    roleAnswers: {},
    cv: null,
    consentCurrent: false,
    consentFuture: false,
  })

  const [errors, setErrors] = useState<ApplicationFieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submittedRoleName, setSubmittedRoleName] = useState('')

  // ── Derived state ────────────────────────────────────────────
  const roleConfig: RoleFormConfig | undefined = getRoleConfig(values.roleSlug)
  const hasRole = values.roleSlug !== ''

  // ── Field setters ────────────────────────────────────────────
  const setField = <K extends keyof ApplicationFormValues>(
    key: K,
    val: ApplicationFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const setRoleAnswer = (questionId: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      roleAnswers: { ...prev.roleAnswers, [questionId]: val },
    }))
    const errorKey = `roleAnswers_${questionId}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }))
    }
  }

  // When role changes: reset role-specific answers and their errors
  const handleRoleChange = (roleSlug: string) => {
    setValues((prev) => ({ ...prev, roleSlug, roleAnswers: {} }))
    setErrors((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (k.startsWith('roleAnswers_')) delete next[k]
      })
      delete next.roleSlug
      return next
    })
  }

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fieldErrors = validateApplication(values, locale, roleConfig)
    if (hasApplicationErrors(fieldErrors)) {
      setErrors(fieldErrors)
      // Focus first errored field
      const firstKey = Object.keys(fieldErrors)[0]
      const focusId = firstKey.startsWith('roleAnswers_')
        ? firstKey.replace('roleAnswers_', '')
        : firstKey
      document.getElementById(focusId)?.focus()
      return
    }

    setIsSubmitting(true)
    // Future: POST /api/career/apply with FormData including cv file
    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)
    setSubmittedRoleName(roleConfig?.title[locale] ?? '')
    setSubmitted(true)
  }

  // ── Success screen ───────────────────────────────────────────
  if (submitted) {
    return (
      <ApplicationSuccess
        eyebrow={c.success.eyebrow}
        heading={c.success.heading}
        appliedLabel={c.success.appliedLabel}
        roleName={submittedRoleName}
        body={c.success.body}
        backLabel={c.success.backLabel}
        backHref={c.success.backHref}
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

      {/* Role selector — always shown; drives which questions appear below */}
      <ApplicationSelect
        id="roleSlug"
        label={c.fields.role}
        required
        value={values.roleSlug}
        onChange={handleRoleChange}
        options={roleOptions}
        placeholder={c.fields.rolePlaceholder}
        error={errors.roleSlug}
        disabled={isSubmitting}
      />

      {/* Role not yet selected — prompt candidate */}
      {!hasRole && (
        <p className="text-[13px] text-gray-400 leading-[1.65] -mt-2">
          {c.selectPrompt}
        </p>
      )}

      {/* Full form — shown only after a role is selected */}
      {hasRole && (
        <>
          {/* Contact fields */}
          <ApplicationField
            id="fullName"
            label={c.fields.fullName}
            required
            value={values.fullName}
            onChange={(v) => setField('fullName', v)}
            autoComplete="name"
            error={errors.fullName}
            disabled={isSubmitting}
          />

          <ApplicationField
            id="email"
            label={c.fields.email}
            type="email"
            required
            value={values.email}
            onChange={(v) => setField('email', v)}
            autoComplete="email"
            error={errors.email}
            disabled={isSubmitting}
          />

          <ApplicationField
            id="phone"
            label={c.fields.phone}
            type="tel"
            required
            value={values.phone}
            onChange={(v) => setField('phone', v)}
            autoComplete="tel"
            error={errors.phone}
            disabled={isSubmitting}
          />

          {/* Role-specific questions */}
          {roleConfig && roleConfig.questions.map((question: FormQuestion) => {
            const label = question.label[locale]
            const answerValue = values.roleAnswers[question.id] ?? ''
            const errorKey = `roleAnswers_${question.id}`
            const fieldError = errors[errorKey]
            const placeholder = question.placeholder?.[locale]

            if (question.type === 'text') {
              return (
                <ApplicationField
                  key={question.id}
                  id={question.id}
                  label={label}
                  required={question.required}
                  value={answerValue}
                  onChange={(v) => setRoleAnswer(question.id, v)}
                  placeholder={placeholder}
                  error={fieldError}
                  disabled={isSubmitting}
                />
              )
            }

            if (question.type === 'radio') {
              return (
                <ApplicationRadio
                  key={question.id}
                  id={question.id}
                  label={label}
                  required={question.required}
                  options={(question.options ?? []).map((o) => ({
                    value: o.value,
                    label: o.label[locale],
                  }))}
                  value={answerValue}
                  onChange={(v) => setRoleAnswer(question.id, v)}
                  error={fieldError}
                  disabled={isSubmitting}
                />
              )
            }

            if (question.type === 'select') {
              return (
                <ApplicationSelect
                  key={question.id}
                  id={question.id}
                  label={label}
                  required={question.required}
                  options={(question.options ?? []).map((o) => ({
                    value: o.value,
                    label: o.label[locale],
                  }))}
                  value={answerValue}
                  onChange={(v) => setRoleAnswer(question.id, v)}
                  placeholder={c.selectPlaceholder}
                  error={fieldError}
                  disabled={isSubmitting}
                />
              )
            }

            if (question.type === 'textarea') {
              return (
                <ApplicationTextarea
                  key={question.id}
                  id={question.id}
                  label={label}
                  required={question.required}
                  value={answerValue}
                  onChange={(v) => setRoleAnswer(question.id, v)}
                  placeholder={placeholder}
                  rows={question.rows ?? 5}
                  maxLength={question.maxLength ?? FIELD_LIMITS.motivation}
                  error={fieldError}
                  disabled={isSubmitting}
                />
              )
            }

            return null
          })}

          {/* CV upload */}
          <ApplicationUpload
            id="cv"
            label={c.fields.cv}
            required
            value={values.cv}
            onChange={(f) => setField('cv', f)}
            hint={c.fields.cvHint}
            error={errors.cv}
            disabled={isSubmitting}
          />

          {/* Consents */}
          <div className="space-y-5 pt-2">
            <ApplicationConsent
              id="consentCurrent"
              description={c.consents.current}
              required
              checked={values.consentCurrent}
              onChange={(v) => setField('consentCurrent', v)}
              error={errors.consentCurrent}
            />
            <ApplicationConsent
              id="consentFuture"
              description={c.consents.future}
              checked={values.consentFuture}
              onChange={(v) => setField('consentFuture', v)}
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
        </>
      )}

    </form>
  )
}
