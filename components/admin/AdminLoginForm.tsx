'use client'

import { FormEvent, useCallback, useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import {
  TurnstileWidget,
  type TurnstileWidgetHandle,
  type TurnstileWidgetStatus,
} from '@/components/forms/TurnstileWidget'
import { ADMIN_LOGIN_TURNSTILE_ACTION } from '@/lib/forms/constants'

interface AdminLoginFormProps {
  siteKey: string
}

export default function AdminLoginForm({ siteKey }: AdminLoginFormProps) {
  const turnstileRef = useRef<TurnstileWidgetHandle>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileWidgetStatus>('loading')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTokenChange = useCallback((token: string | null) => {
    setTurnstileToken(token)
  }, [])

  const handleStatusChange = useCallback((status: TurnstileWidgetStatus) => {
    setTurnstileStatus(status)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    if (!turnstileToken) {
      setError('Potwierdź zabezpieczenie przed logowaniem.')
      return
    }

    setSubmitting(true)
    setError(null)
    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          turnstileToken,
        }),
      })
      const result = await response.json() as { success?: boolean; message?: string }

      if (!response.ok || !result.success) {
        setError(result.message || 'Nie udało się zalogować. Spróbuj ponownie.')
        turnstileRef.current?.reset()
        return
      }

      window.location.assign('/admin/dashboard')
    } catch {
      setError('Nie udało się zalogować. Spróbuj ponownie.')
      turnstileRef.current?.reset()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-brand-primary"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          maxLength={256}
          autoComplete="current-password"
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-brand-primary"
        />
      </div>
      <TurnstileWidget
        ref={turnstileRef}
        action={ADMIN_LOGIN_TURNSTILE_ACTION}
        locale="pl"
        siteKey={siteKey}
        onTokenChange={handleTokenChange}
        onStatusChange={handleStatusChange}
      />
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
      <Button
        type="submit"
        fullWidth
        disabled={submitting || turnstileStatus === 'error' || !turnstileToken}
      >
        {submitting ? 'Logowanie...' : 'Zaloguj się'}
      </Button>
    </form>
  )
}