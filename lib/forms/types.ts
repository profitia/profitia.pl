/**
 * lib/forms/types.ts
 *
 * Canonical type definitions for the Profitia form system.
 * CRM-ready, consent-aware, locale-first.
 */

export type Locale = 'pl' | 'en'

export type FormType = 'contact' | 'newsletter'

export type FormSubmitState = 'idle' | 'submitting' | 'success' | 'error'

export type ContactTopic =
  | 'general'
  | 'advisory'
  | 'spendguru'
  | 'training'
  | 'partnership'
  | 'other'

/** Per-field error map keyed by field name. */
export type FieldErrors<T extends object> = Partial<Record<keyof T, string>>

// ── Form value shapes ─────────────────────────────────────────────────────────

export interface ContactFormValues {
  name: string
  email: string
  company: string
  topic: ContactTopic | ''
  message: string
  consentGdpr: boolean
  consentNewsletter: boolean
}

export interface NewsletterFormValues {
  email: string
  consentGdpr: boolean
}

// ── Consent metadata (GDPR audit trail) ──────────────────────────────────────

export interface FormConsentMeta {
  gdpr: boolean
  newsletter: boolean
  /** Semver or date - must match CONSENT_VERSION constant. */
  consentVersion: string
  /** ISO 8601 timestamp of the moment consent was given. */
  consentAt: string
  /** GDPR Article 6 lawful basis - always 'consent' for these forms. */
  lawfulBasis: 'consent'
}

// ── Submission payloads (CRM-ready, audit-ready) ──────────────────────────────

export interface ContactSubmissionPayload {
  formType: 'contact'
  locale: Locale
  /** ISO 8601 */
  submittedAt: string
  /** Pathname from which the form was submitted - source tracking. */
  source: string
  /** UTM / campaign readiness (populated by future analytics layer). */
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  // Form data
  name: string
  email: string
  company?: string
  topic: ContactTopic | ''
  message: string
  consent: FormConsentMeta
}

export interface NewsletterSubmissionPayload {
  formType: 'newsletter'
  locale: Locale
  /** ISO 8601 */
  submittedAt: string
  /** Pathname - source tracking. */
  source: string
  email: string
  consent: FormConsentMeta
}

// ── API response shape ────────────────────────────────────────────────────────

export interface SubmissionResult {
  success: boolean
  message?: string
  errorCode?: string
}
