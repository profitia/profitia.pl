'use client'

/**
 * Canonical Consent Provider
 *
 * Global context for the Profitia consent infrastructure.
 * Wraps the app tree — provides state, actions, and renders Banner + Modal.
 *
 * SSR-safe: all storage access deferred to useEffect after hydration.
 * `isLoaded` guards against hydration mismatch — Banner/Modal never render on server.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import type {
  ConsentCategories,
  ConsentCategory,
  ConsentContextValue,
  ConsentRecord,
  ConsentStatus,
} from '@/lib/consent/types'
import { readConsent, writeConsent, CONSENT_VERSION } from '@/lib/consent/storage'
import { ConsentBanner } from './ConsentBanner'
import { ConsentModal } from './ConsentModal'

// ── Context ───────────────────────────────────────────────────────────────────

const ConsentContext = createContext<ConsentContextValue | null>(null)

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
}

// ── Record factory ────────────────────────────────────────────────────────────

function buildRecord(
  categories: ConsentCategories,
  status: ConsentStatus,
  locale: string,
  existing?: ConsentRecord
): ConsentRecord {
  const now = new Date().toISOString()
  return {
    version: CONSENT_VERSION,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    locale,
    status,
    categories,
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────

interface ConsentProviderProps {
  children: React.ReactNode
  /** Active locale — passed from layout. Defaults to 'pl'. */
  locale?: string
}

export function ConsentProvider({ children, locale = 'pl' }: ConsentProviderProps) {
  const [record, setRecord] = useState<ConsentRecord | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  // Hydration — read stored consent after mount
  useEffect(() => {
    const stored = readConsent()
    setRecord(stored)
    setBannerVisible(stored === null)
    setIsLoaded(true)
  }, [])

  // ── Internal commit helper ─────────────────────────────────────────────────

  const commit = useCallback(
    (rec: ConsentRecord) => {
      writeConsent(rec)
      setRecord(rec)
      setBannerVisible(false)
      setModalVisible(false)
    },
    []
  )

  // ── Public actions ─────────────────────────────────────────────────────────

  const acceptAll = useCallback(() => {
    const cats: ConsentCategories = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    commit(buildRecord(cats, 'accepted_all', locale, record ?? undefined))
  }, [locale, record, commit])

  const rejectAll = useCallback(() => {
    commit(buildRecord({ ...DEFAULT_CATEGORIES }, 'rejected_all', locale, record ?? undefined))
  }, [locale, record, commit])

  const saveCustom = useCallback(
    (categories: Partial<ConsentCategories>) => {
      const cats: ConsentCategories = {
        ...DEFAULT_CATEGORIES,
        ...categories,
        necessary: true, // always enforced
      }
      const status: ConsentStatus =
        cats.analytics && cats.marketing && cats.functional
          ? 'accepted_all'
          : !cats.analytics && !cats.marketing && !cats.functional
          ? 'rejected_all'
          : 'customized'
      commit(buildRecord(cats, status, locale, record ?? undefined))
    },
    [locale, record, commit]
  )

  const openModal = useCallback(() => {
    setBannerVisible(false)
    setModalVisible(true)
  }, [])

  const closeModal = useCallback(() => {
    setModalVisible(false)
    // If no decision made yet, restore the banner
    if (record === null) setBannerVisible(true)
  }, [record])

  const hasConsent = useCallback(
    (category: ConsentCategory): boolean => {
      if (category === 'necessary') return true
      return record?.categories[category] ?? false
    },
    [record]
  )

  // ── Context value ──────────────────────────────────────────────────────────

  const value: ConsentContextValue = {
    record,
    isLoaded,
    bannerVisible,
    modalVisible,
    acceptAll,
    rejectAll,
    saveCustom,
    openModal,
    closeModal,
    hasConsent,
  }

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {/* Banner and modal are client-only — guarded by isLoaded to prevent SSR mismatch */}
      {isLoaded && bannerVisible && <ConsentBanner locale={locale} />}
      {isLoaded && modalVisible && <ConsentModal locale={locale} />}
    </ConsentContext.Provider>
  )
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

/**
 * Access the full consent context.
 * Must be used inside ConsentProvider.
 */
export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider')
  return ctx
}

/**
 * Returns true if the given category is currently consented.
 * 'necessary' always returns true.
 * Returns false before hydration (isLoaded = false).
 */
export function useConsentCategory(category: ConsentCategory): boolean {
  const { hasConsent, isLoaded } = useConsent()
  if (!isLoaded) return false
  return hasConsent(category)
}

/**
 * Alias for useConsentCategory — semantically clearer in gate contexts.
 */
export function useHasConsent(category: ConsentCategory): boolean {
  return useConsentCategory(category)
}
