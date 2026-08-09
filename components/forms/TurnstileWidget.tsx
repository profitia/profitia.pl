'use client'

import Script from 'next/script'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { TURNSTILE_ACTION } from '@/lib/forms/constants'
import type { Locale } from '@/lib/forms/types'

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove?: (widgetId: string) => void
    }
  }
}

export type TurnstileWidgetStatus = 'loading' | 'ready' | 'verified' | 'error'

export interface TurnstileWidgetHandle {
  reset: () => void
}

interface TurnstileWidgetProps {
  action?: string
  locale: Locale
  siteKey: string
  onTokenChange: (token: string | null) => void
  onStatusChange: (status: TurnstileWidgetStatus) => void
}

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ action = TURNSTILE_ACTION, locale, siteKey, onTokenChange, onStatusChange }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const widgetIdRef = useRef<string | null>(null)
    const [scriptLoaded, setScriptLoaded] = useState(false)
    const [scriptFailed, setScriptFailed] = useState(false)

    useImperativeHandle(ref, () => ({
      reset() {
        onTokenChange(null)

        if (widgetIdRef.current && window.turnstile?.reset) {
          window.turnstile.reset(widgetIdRef.current)
          onStatusChange('ready')
          return
        }

        onStatusChange(siteKey ? 'loading' : 'error')
      },
    }), [onStatusChange, onTokenChange, siteKey])

    useEffect(() => {
      if (!siteKey) {
        onTokenChange(null)
        onStatusChange('error')
        return
      }

      if (window.turnstile?.render) {
        setScriptLoaded(true)
      } else {
        onStatusChange('loading')
      }
    }, [onStatusChange, onTokenChange, siteKey])

    useEffect(() => {
      if (!siteKey || scriptFailed || !scriptLoaded || !containerRef.current || widgetIdRef.current) {
        return
      }

      const turnstile = window.turnstile
      if (!turnstile?.render) {
        onStatusChange('error')
        return
      }

      widgetIdRef.current = turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action,
        appearance: 'interaction-only',
        theme: 'auto',
        size: 'flexible',
        retry: 'auto',
        'refresh-expired': 'auto',
        'refresh-timeout': 'auto',
        language: locale,
        callback: (token: string) => {
          onTokenChange(token)
          onStatusChange('verified')
        },
        'expired-callback': () => {
          onTokenChange(null)
          onStatusChange('ready')
        },
        'error-callback': () => {
          onTokenChange(null)
          onStatusChange('error')
        },
        'timeout-callback': () => {
          onTokenChange(null)
          onStatusChange('ready')
        },
      })

      onStatusChange('ready')
    }, [action, locale, onStatusChange, onTokenChange, scriptFailed, scriptLoaded, siteKey])

    useEffect(() => {
      return () => {
        onTokenChange(null)

        if (widgetIdRef.current && window.turnstile?.remove) {
          window.turnstile.remove(widgetIdRef.current)
        }

        widgetIdRef.current = null
      }
    }, [onTokenChange])

    return (
      <>
        <Script
          id="cloudflare-turnstile"
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => {
            setScriptLoaded(true)
            setScriptFailed(false)
          }}
          onError={() => {
            onTokenChange(null)
            onStatusChange('error')
            setScriptFailed(true)
          }}
        />
        <div ref={containerRef} className="min-h-px overflow-hidden" />
      </>
    )
  }
)