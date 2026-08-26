'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import type { CareerLocale } from '@/lib/careers'
import { JOB_POSTS, tCareer } from '@/lib/careers'
import { RECRUITMENT_TURNSTILE_ACTION } from '@/lib/forms/constants'
import { RECRUITMENT_CONSENT_COPY } from '@/lib/recruitment/consent'
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
import { TurnstileWidget, type TurnstileWidgetHandle, type TurnstileWidgetStatus } from '@/components/forms/TurnstileWidget'

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
      current: RECRUITMENT_CONSENT_COPY.pl.current,
      future: RECRUITMENT_CONSENT_COPY.pl.future,
    },
    submit: 'Prześlij aplikację',
    submitting: 'Wysyłanie...',
    submitError: 'Nie udało się przesłać aplikacji. Spróbuj ponownie za chwilę.',
    security: {
      inProgress: 'Weryfikacja bezpieczeństwa jest w toku. Spróbuj ponownie za chwilę.',
      failed: 'Nie udało się zweryfikować formularza. Spróbuj ponownie.',
      unavailable: 'Weryfikacja bezpieczeństwa jest chwilowo niedostępna. Spróbuj ponownie.',
    },
    rateLimited: 'Zbyt wiele prób przesłania aplikacji. Spróbuj ponownie za kilka minut.',
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
      current: RECRUITMENT_CONSENT_COPY.en.current,
      future: RECRUITMENT_CONSENT_COPY.en.future,
    },
    submit: 'Submit application',
    submitting: 'Submitting...',
    submitError: 'We could not submit your application. Please try again in a moment.',
    security: {
      inProgress: 'Security verification is in progress. Please try again in a moment.',
      failed: "We couldn't verify the form. Please try again.",
      unavailable: 'Security verification is temporarily unavailable. Please try again.',
    },
    rateLimited: 'Too many application attempts. Please try again in a few minutes.',
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
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const preselectedRole = searchParams.get(ROLE_PARAM) ?? ''

  const c = COPY[locale]
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

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
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
  const [website, setWebsite] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileWidgetStatus>(turnstileSiteKey ? 'loading' : 'error')
  const submitLockRef = useRef(false)
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null)

  // ── Derived state ────────────────────────────────────────────
  const roleConfig: RoleFormConfig | undefined = getRoleConfig(values.roleSlug)
  const hasRole = values.roleSlug !== ''
  const roleAnswerToApiField: Record<string, string> = {
    startDate: 'availableFrom',
    hoursPerWeek: 'weeklyAvailability',
    hybridAccepted: 'hybridAccepted',
    businessTravel: 'businessTravel',
    excelLevel: 'excelLevel',
    englishLevel: 'englishLevel',
    salaryExpectation: 'financialExpectations',
    motivation: 'motivation',
  }

  useEffect(() => {
    setFormStartedAt(Date.now())
  }, [values.roleSlug])

  // ── Field setters ────────────────────────────────────────────
  const setField = <K extends keyof ApplicationFormValues>(
    key: K,
    val: ApplicationFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (submitErrorMessage) {
      setSubmitErrorMessage(null)
    }
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const setRoleAnswer = (questionId: string, val: string) => {
    setValues((prev) => ({
      ...prev,
      roleAnswers: { ...prev.roleAnswers, [questionId]: val },
    }))
    if (submitErrorMessage) {
      setSubmitErrorMessage(null)
    }
    const errorKey = `roleAnswers_${questionId}`
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: undefined }))
    }
  }

  // When role changes: reset role-specific answers and their errors
  const handleRoleChange = (roleSlug: string) => {
    setValues((prev) => ({ ...prev, roleSlug, roleAnswers: {} }))
    setSubmitErrorMessage(null)
    setErrors((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((k) => {
        if (k.startsWith('roleAnswers_')) delete next[k]
      })
      delete next.roleSlug
      return next
    })
  }

  const mapServerFieldErrors = (fields?: Record<string, string>): ApplicationFieldErrors => {
    if (!fields) {
      return {}
    }

    const mapped: ApplicationFieldErrors = {}
    const aliases: Record<string, string> = {
      roleSlug: 'roleSlug',
      fullName: 'fullName',
      email: 'email',
      phone: 'phone',
      availableFrom: 'roleAnswers_startDate',
      weeklyAvailability: 'roleAnswers_hoursPerWeek',
      hybridAccepted: 'roleAnswers_hybridAccepted',
      businessTravel: 'roleAnswers_businessTravel',
      excelLevel: 'roleAnswers_excelLevel',
      englishLevel: 'roleAnswers_englishLevel',
      financialExpectations: 'roleAnswers_salaryExpectation',
      motivation: 'roleAnswers_motivation',
      consentCurrent: 'consentCurrent',
      consentFuture: 'consentFuture',
      cv: 'cv',
    }

    for (const [field, message] of Object.entries(fields)) {
      const target = aliases[field]
      if (target && !mapped[target]) {
        mapped[target] = message
      }
    }

    return mapped
  }

  const focusFirstError = (fieldErrors: ApplicationFieldErrors) => {
    const preferredOrder = [
      'roleSlug',
      'fullName',
      'email',
      'phone',
      'roleAnswers_startDate',
      'roleAnswers_hoursPerWeek',
      'roleAnswers_hybridAccepted',
      'roleAnswers_businessTravel',
      'roleAnswers_excelLevel',
      'roleAnswers_englishLevel',
      'roleAnswers_salaryExpectation',
      'roleAnswers_motivation',
      'cv',
      'consentCurrent',
    ]

    const firstKey = preferredOrder.find((key) => fieldErrors[key]) ?? Object.keys(fieldErrors)[0]
    if (!firstKey) {
      return
    }

    const focusId = firstKey.startsWith('roleAnswers_')
      ? firstKey.replace('roleAnswers_', '')
      : firstKey
    document.getElementById(focusId)?.focus()
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append('roleSlug', values.roleSlug)
    formData.append('fullName', values.fullName)
    formData.append('email', values.email)
    formData.append('phone', values.phone)
    formData.append('consentCurrent', String(values.consentCurrent))
    formData.append('consentFuture', String(values.consentFuture))
    formData.append('locale', locale)
    formData.append('sourcePage', pathname)
    formData.append('website', website)
    formData.append('formStartedAt', String(formStartedAt))
    if (turnstileToken) {
      formData.append('turnstileToken', turnstileToken)
    }

    for (const [questionId, answer] of Object.entries(values.roleAnswers)) {
      const targetField = roleAnswerToApiField[questionId]
      if (!targetField || !answer) {
        continue
      }

      if (values.roleSlug === 'procurement-consultant' && targetField === 'weeklyAvailability') {
        continue
      }

      formData.append(targetField, answer)
    }

    if (values.cv) {
      formData.append('cv', values.cv)
    }

    return formData
  }

  const resetTurnstileChallenge = () => {
    setTurnstileToken(null)
    turnstileRef.current?.reset()
  }

  const resetSecurityTransport = () => {
    setWebsite('')
    setFormStartedAt(Date.now())
  }

  const getSubmissionErrorMessage = (errorCode?: string) => {
    switch (errorCode) {
      case 'RATE_LIMITED':
        return c.rateLimited
      case 'BOT_VERIFICATION_REQUIRED':
      case 'BOT_VERIFICATION_FAILED':
        return c.security.failed
      case 'BOT_VERIFICATION_UNAVAILABLE':
        return c.security.unavailable
      default:
        return c.submitError
    }
  }

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitLockRef.current) {
      return
    }

    const fieldErrors = validateApplication(values, locale, roleConfig)
    if (hasApplicationErrors(fieldErrors)) {
      setErrors(fieldErrors)
      setSubmitErrorMessage(null)
      focusFirstError(fieldErrors)
      return
    }

    if (!turnstileToken) {
      setSubmitErrorMessage(turnstileStatus === 'error' ? c.security.unavailable : c.security.inProgress)
      return
    }

    submitLockRef.current = true
    setIsSubmitting(true)
    setErrors({})
    setSubmitErrorMessage(null)

    try {
      const response = await fetch('/api/career/apply', {
        method: 'POST',
        body: buildFormData(),
      })

      const payload = await response.json().catch(() => null) as null | {
        success?: boolean
        errorCode?: string
        fields?: Record<string, string>
      }

      if (response.ok && payload?.success) {
        resetSecurityTransport()
        setTurnstileToken(null)
        setSubmittedRoleName(roleConfig?.title[locale] ?? '')
        setSubmitted(true)
        return
      }

      resetTurnstileChallenge()

      const serverFieldErrors = mapServerFieldErrors(payload?.fields)
      if (Object.keys(serverFieldErrors).length > 0) {
        setErrors(serverFieldErrors)
        focusFirstError(serverFieldErrors)
      }

      setSubmitErrorMessage(getSubmissionErrorMessage(payload?.errorCode))
    } catch {
      resetTurnstileChallenge()
      setSubmitErrorMessage(c.submitError)
    } finally {
      submitLockRef.current = false
      setIsSubmitting(false)
    }
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
      <div className="sr-only" aria-live="polite">
        {isSubmitting ? c.submitting : submitErrorMessage ?? ''}
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
                  layout={question.radioLayout ?? 'stack'}
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

          <div className="min-h-px overflow-hidden">
            <TurnstileWidget
              ref={turnstileRef}
              action={RECRUITMENT_TURNSTILE_ACTION}
              locale={locale}
              siteKey={turnstileSiteKey}
              onTokenChange={setTurnstileToken}
              onStatusChange={setTurnstileStatus}
            />
          </div>

          {submitErrorMessage && (
            <p role="alert" className="text-[13px] text-red-600 leading-[1.7]">
              {submitErrorMessage}
            </p>
          )}

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
