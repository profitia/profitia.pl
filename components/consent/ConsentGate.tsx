'use client'

/**
 * ConsentGate — Integration Readiness Component
 *
 * Conditionally renders children based on consent category state.
 * The primary mechanism for gating third-party integrations:
 * analytics, GTM, Meta Pixel, LinkedIn Insight, embedded content, forms tracking.
 *
 * Renders nothing until client hydration is complete (isLoaded = true).
 * This prevents SSR/hydration mismatches and ensures no third-party code
 * runs before explicit consent.
 *
 * @example
 *   // Future GA4 integration:
 *   <ConsentGate category="analytics">
 *     <GoogleAnalytics id="G-XXXXXXXX" />
 *   </ConsentGate>
 *
 *   // Future Meta Pixel:
 *   <ConsentGate category="marketing" fallback={<PixelPlaceholder />}>
 *     <MetaPixel id="..." />
 *   </ConsentGate>
 */

import React from 'react'
import type { ConsentCategory } from '@/lib/consent/types'
import { useConsent } from './ConsentProvider'

interface ConsentGateProps {
  /** The consent category required to render children. */
  category: ConsentCategory
  /** What to render when consent is not given. Defaults to null. */
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function ConsentGate({ category, children, fallback = null }: ConsentGateProps) {
  const { hasConsent, isLoaded } = useConsent()

  // Never render (in either direction) until client hydration is complete
  if (!isLoaded) return null

  if (!hasConsent(category)) return <>{fallback}</>

  return <>{children}</>
}
