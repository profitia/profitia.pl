'use client'

import { useRef, useState } from 'react'

import { FormConsent } from '@/components/forms/FormConsent'
import { FormField } from '@/components/forms/FormField'
import { SubmitButton } from '@/components/forms/SubmitButton'
import { TurnstileWidget, type TurnstileWidgetHandle, type TurnstileWidgetStatus } from '@/components/forms/TurnstileWidget'
import { DIGITAL_SURVEY_TURNSTILE_ACTION } from '@/lib/forms/constants'

type Values = {
  firstName: string
  lastName: string
  organization: string
  jobTitle: string
  email: string
  phone: string
  privacyConsent: boolean
  marketingConsent: boolean
}

type Errors = Partial<Record<keyof Values, string>>

const INITIAL: Values = {
  firstName: '',
  lastName: '',
  organization: '',
  jobTitle: '',
  email: '',
  phone: '',
  privacyConsent: false,
  marketingConsent: false,
}

const PRIVACY_COPY =
  'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu kontaktu w sprawie badania i dopasowania rozwiązania AI.'
const MARKETING_COPY =
  'Zgadzam się na przesyłanie informacji o usługach, publikacjach i wydarzeniach Profitia. Zgodę mogę wycofać w dowolnym momencie.'

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (values.firstName.trim().length < 2) errors.firstName = 'Podaj imię.'
  if (values.lastName.trim().length < 2) errors.lastName = 'Podaj nazwisko.'
  if (values.organization.trim().length < 2) errors.organization = 'Podaj organizację.'
  if (values.jobTitle.trim().length < 2) errors.jobTitle = 'Podaj stanowisko.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Podaj poprawny adres e-mail.'
  if (values.phone.trim().length < 6) errors.phone = 'Podaj numer telefonu.'
  if (!values.privacyConsent) errors.privacyConsent = 'Ta zgoda jest wymagana.'
  return errors
}

export function DigitalSurveyForm() {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [website, setWebsite] = useState('')
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now())
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileWidgetStatus>('loading')
  const submitLock = useRef(false)
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
    if (state === 'error') {
      setState('idle')
      setErrorMessage(null)
    }
  }

  function resetChallenge() {
    setTurnstileToken(null)
    turnstileRef.current?.reset()
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitLock.current) return

    const validationErrors = validate(values)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    if (!turnstileToken) {
      setState('error')
      setErrorMessage(
        turnstileStatus === 'error'
          ? 'Weryfikacja bezpieczeństwa jest chwilowo niedostępna. Spróbuj ponownie.'
          : 'Trwa weryfikacja bezpieczeństwa. Spróbuj ponownie za chwilę.'
      )
      return
    }

    submitLock.current = true
    setState('submitting')
    setErrorMessage(null)

    try {
      const response = await fetch('/api/digital-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website,
          formStartedAt,
          turnstileToken,
          locale: 'pl',
          sourcePage: '/ankieta-digital',
        }),
      })

      const body = await response.json().catch(() => ({})) as { errorCode?: string }
      if (!response.ok) {
        resetChallenge()
        setState('error')
        setErrorMessage(
          body.errorCode === 'RATE_LIMITED'
            ? 'Wysłano zbyt wiele prób. Spróbuj ponownie za kilka minut.'
            : body.errorCode === 'BOT_VERIFICATION_UNAVAILABLE'
              ? 'Weryfikacja bezpieczeństwa jest chwilowo niedostępna. Spróbuj ponownie.'
              : 'Nie udało się wysłać formularza. Spróbuj ponownie.'
        )
        return
      }

      setState('success')
      setValues(INITIAL)
      setWebsite('')
      setFormStartedAt(Date.now())
      setTurnstileToken(null)
    } catch {
      resetChallenge()
      setState('error')
      setErrorMessage('Nie udało się wysłać formularza. Sprawdź połączenie i spróbuj ponownie.')
    } finally {
      submitLock.current = false
    }
  }

  if (state === 'success') {
    return (
      <div role="status" aria-live="polite" className="py-8 sm:py-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[rgb(0,109,158)]">
          Kwestionariusz wysłany
        </p>
        <h3 className="mt-4 text-[32px] font-semibold leading-tight tracking-[-0.04em] text-[rgb(36,47,68)]">
          Dziękujemy za wypełnienie formularza
        </h3>
        <p className="mt-5 text-[15px] leading-7 text-[rgb(72,94,136)]">
          Prześlemy krótki kwestionariusz, pozwalający nam dopasować agenta AI do rzeczywistych wyzwań Twojej organizacji.
        </p>
      </div>
    )
  }

  const isSubmitting = state === 'submitting'

  return (
    <form onSubmit={submit} noValidate className="space-y-5" aria-label="Zgłoszenie udziału w badaniu">
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

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="firstName" label="Imię" value={values.firstName} onChange={(v) => update('firstName', v)} required disabled={isSubmitting} error={errors.firstName} autoComplete="given-name" />
        <FormField id="lastName" label="Nazwisko" value={values.lastName} onChange={(v) => update('lastName', v)} required disabled={isSubmitting} error={errors.lastName} autoComplete="family-name" />
      </div>

      <FormField id="organization" label="Organizacja" value={values.organization} onChange={(v) => update('organization', v)} required disabled={isSubmitting} error={errors.organization} autoComplete="organization" />
      <FormField id="jobTitle" label="Stanowisko" value={values.jobTitle} onChange={(v) => update('jobTitle', v)} required disabled={isSubmitting} error={errors.jobTitle} autoComplete="organization-title" />

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="email" label="Adres e-mail" type="email" value={values.email} onChange={(v) => update('email', v)} required disabled={isSubmitting} error={errors.email} autoComplete="email" />
        <FormField id="phone" label="Telefon" type="tel" value={values.phone} onChange={(v) => update('phone', v)} required disabled={isSubmitting} error={errors.phone} autoComplete="tel" />
      </div>

      <p className="text-[12px] leading-5 text-[rgb(72,94,136)]">
        Dane wykorzystamy do kontaktu w sprawie badania.
      </p>

      <div className="space-y-4 border-t border-gray-100 pt-5">
        <FormConsent
          id="privacyConsent"
          description={PRIVACY_COPY}
          privacyHref="/polityka-prywatnosci"
          privacyLabel="Polityka Prywatności."
          required
          checked={values.privacyConsent}
          onChange={(v) => update('privacyConsent', v)}
          error={errors.privacyConsent}
        />
        <FormConsent
          id="marketingConsent"
          description={MARKETING_COPY}
          checked={values.marketingConsent}
          onChange={(v) => update('marketingConsent', v)}
        />

        <TurnstileWidget
          ref={turnstileRef}
          action={DIGITAL_SURVEY_TURNSTILE_ACTION}
          locale="pl"
          siteKey={siteKey}
          onTokenChange={setTurnstileToken}
          onStatusChange={setTurnstileStatus}
        />
      </div>

      {state === 'error' && errorMessage && (
        <p role="alert" aria-live="polite" className="rounded-xl bg-red-50 px-4 py-3 text-[13px] leading-5 text-red-700">
          {errorMessage}
        </p>
      )}

      <SubmitButton
        label="Zgłaszam udział →"
        loadingLabel="Wysyłanie..."
        isSubmitting={isSubmitting}
        fullWidth
      />
    </form>
  )
}
