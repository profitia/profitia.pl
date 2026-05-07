/**
 * Canonical Consent Infrastructure — Type Definitions
 *
 * GDPR-grade typed model for the Profitia consent system.
 * Architecture-first — all other consent modules derive from these types.
 */

// ── Category identifiers ──────────────────────────────────────────────────────

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'functional'

// ── Consent decision states ───────────────────────────────────────────────────

/** Broad status of the consent decision for audit/analytics use */
export type ConsentStatus = 'pending' | 'accepted_all' | 'rejected_all' | 'customized'

// ── Per-category boolean map ──────────────────────────────────────────────────

export interface ConsentCategories {
  /** Always true — immutable. Session, security, language preferences. */
  necessary: boolean
  /** Aggregated analytics. Google Analytics, Hotjar, etc. */
  analytics: boolean
  /** Paid advertising attribution. Google Ads, Meta Pixel, LinkedIn Insight. */
  marketing: boolean
  /** Enhanced features. Embedded video, chat, forms. */
  functional: boolean
}

// ── Persisted consent record ──────────────────────────────────────────────────

export interface ConsentRecord {
  /** Schema version — used to detect stale records and trigger re-consent. */
  version: string
  /** ISO 8601 — first consent timestamp. Never updated after initial decision. */
  createdAt: string
  /** ISO 8601 — last update timestamp (re-customization). */
  updatedAt: string
  /** Active locale at time of consent: 'pl' | 'en' */
  locale: string
  /** Broad consent status for reporting. */
  status: ConsentStatus
  /** Per-category consent state. */
  categories: ConsentCategories
}

// ── Context shape ─────────────────────────────────────────────────────────────

export interface ConsentContextValue {
  /** Persisted record — null until client hydration or if no decision made yet. */
  record: ConsentRecord | null
  /** True after client-side hydration. SSR always false — prevents flicker. */
  isLoaded: boolean
  /** Controls initial consent banner visibility. */
  bannerVisible: boolean
  /** Controls preferences modal visibility. */
  modalVisible: boolean

  /** Accept all non-necessary categories. */
  acceptAll: () => void
  /** Reject all non-necessary categories. Necessary remains enabled. */
  rejectAll: () => void
  /** Save a custom selection. Necessary is always forced true. */
  saveCustom: (categories: Partial<ConsentCategories>) => void

  /** Open the full preferences modal. */
  openModal: () => void
  /** Close the preferences modal. Restores banner if no decision made. */
  closeModal: () => void

  /** Returns true if the given category is consented (necessary always returns true). */
  hasConsent: (category: ConsentCategory) => boolean
}
