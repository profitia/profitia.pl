// ─────────────────────────────────────────────────────────────────────────────
// Career Application - Core Types
// Storage-ready interface. Backend integration is a future step.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CareerApplication - canonical domain record.
 * Created on submission. Stored in future backend integration.
 */
export interface CareerApplication {
  /** UUID assigned at persistence time */
  id: string
  /** ISO 8601 timestamp */
  createdAt: string
  /** Matches JobPost.slug */
  roleSlug: string
  fullName: string
  email: string
  phone: string
  /** Role-specific answers keyed by question ID */
  roleAnswers: Record<string, string>
  /** Original filename of the uploaded CV */
  cvFileName: string
  /** Required GDPR consent for current recruitment */
  consentCurrent: boolean
  /** Optional GDPR consent for future recruitment processes */
  consentFuture: boolean
}

/**
 * ApplicationFormValues - in-memory form state (pre-persistence).
 * File is kept as the raw File object until upload.
 * roleAnswers holds all role-specific question answers keyed by question ID.
 */
export interface ApplicationFormValues {
  roleSlug: string
  fullName: string
  email: string
  phone: string
  roleAnswers: Record<string, string>
  cv: File | null
  consentCurrent: boolean
  consentFuture: boolean
}

/**
 * ApplicationFieldErrors - per-field validation error messages.
 * Uses a flat Record to support both top-level fields and
 * role-specific answer keys (prefixed with "roleAnswers_<questionId>").
 */
export type ApplicationFieldErrors = Record<string, string | undefined>
