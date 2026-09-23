'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useConsent } from '@/components/consent'

const MEASUREMENT_ID = 'G-5TQDR26KT5'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[][]
  gtag?: (...args: unknown[]) => void
} & Record<string, unknown>

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const { hasConsent, isLoaded } = useConsent()
  const allowed = isLoaded && hasConsent('analytics')
  const lastPageView = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !['profitia.pl', 'www.profitia.pl'].includes(window.location.hostname)) return

    const gaWindow = window as AnalyticsWindow
    gaWindow[`ga-disable-${MEASUREMENT_ID}`] = !allowed

    if (!allowed) {
      gaWindow.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      lastPageView.current = null
      return
    }

    if (!gaWindow.gtag) {
      gaWindow.dataLayer = gaWindow.dataLayer || []
      gaWindow.gtag = (...args: unknown[]) => {
        gaWindow.dataLayer?.push(args)
      }
      gaWindow.gtag('consent', 'default', { analytics_storage: 'denied' })
      gaWindow.gtag('js', new Date())
      // Page views are sent on route changes below, so disable the automatic initial hit.
      gaWindow.gtag('config', MEASUREMENT_ID, { send_page_view: false })
    }

    gaWindow.gtag('consent', 'update', { analytics_storage: 'granted' })

    const pageLocation = window.location.href
    if (lastPageView.current !== pageLocation) {
      gaWindow.gtag('event', 'page_view', {
        page_location: pageLocation,
        page_path: window.location.pathname + window.location.search,
      })
      lastPageView.current = pageLocation
    }

    if (!document.getElementById('profitia-ga4')) {
      const script = document.createElement('script')
      script.id = 'profitia-ga4'
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
      document.head.appendChild(script)
    }
  }, [allowed, isLoaded, pathname])

  return null
}
