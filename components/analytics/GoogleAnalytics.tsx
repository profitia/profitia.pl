'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useConsent } from '@/components/consent'

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void
}

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const { hasConsent, isLoaded } = useConsent()
  const analyticsAllowed = isLoaded && hasConsent('analytics')
  const marketingAllowed = isLoaded && hasConsent('marketing')
  const previousAnalyticsConsent = useRef<boolean | null>(null)
  const lastPageView = useRef<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !['profitia.pl', 'www.profitia.pl'].includes(window.location.hostname) || pathname.startsWith('/admin')) return

    const gaWindow = window as AnalyticsWindow
    if (!gaWindow.gtag) return

    gaWindow.gtag('consent', 'update', {
      analytics_storage: analyticsAllowed ? 'granted' : 'denied',
      ad_storage: marketingAllowed ? 'granted' : 'denied',
      ad_user_data: marketingAllowed ? 'granted' : 'denied',
      ad_personalization: marketingAllowed ? 'granted' : 'denied',
    })

    // Recount the current page if consent changes from denied to granted or back.
    if (previousAnalyticsConsent.current !== analyticsAllowed) {
      lastPageView.current = null
      previousAnalyticsConsent.current = analyticsAllowed
    }

    const pageLocation = window.location.href
    if (lastPageView.current !== pageLocation) {
      gaWindow.gtag('event', 'page_view', {
        page_location: pageLocation,
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
      })
      lastPageView.current = pageLocation
    }
  }, [analyticsAllowed, isLoaded, marketingAllowed, pathname])

  return null
}
