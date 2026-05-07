/**
 * Canonical Consent Storage Layer
 *
 * Handles persistence of the consent record across sessions.
 * Strategy: cookie (primary, survives tab/session) + localStorage (sync layer, fast read).
 *
 * Safety guarantees:
 * - SSR-safe: all reads/writes guarded by typeof window/document check
 * - Hydration-safe: never throws, always falls back to null
 * - Corruption-safe: invalid JSON silently returns null
 * - Version-aware: stale records (different version) treated as null → re-consent
 */

import type { ConsentRecord } from './types'

// ── Constants ─────────────────────────────────────────────────────────────────

export const CONSENT_COOKIE_NAME = 'profitia_consent'
export const CONSENT_VERSION = '1.0'

/** One year in seconds */
const MAX_AGE = 365 * 24 * 60 * 60

// ── Internal helpers ──────────────────────────────────────────────────────────

function isValidRecord(obj: unknown): obj is ConsentRecord {
  if (!obj || typeof obj !== 'object') return false
  const r = obj as Record<string, unknown>
  return (
    typeof r.version === 'string' &&
    typeof r.createdAt === 'string' &&
    typeof r.updatedAt === 'string' &&
    typeof r.locale === 'string' &&
    typeof r.status === 'string' &&
    r.categories !== null &&
    typeof r.categories === 'object'
  )
}

function parseRecord(raw: string): ConsentRecord | null {
  try {
    const parsed = JSON.parse(raw)
    if (!isValidRecord(parsed)) return null
    // Version gate - different version = treat as new visitor
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Read the consent record from cookie storage.
 * Returns null if: no cookie found, JSON corrupt, version mismatch.
 */
export function readConsent(): ConsentRecord | null {
  if (typeof document === 'undefined') return null // SSR guard

  try {
    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${CONSENT_COOKIE_NAME}=`))

    if (!match) return null

    const raw = decodeURIComponent(match.slice(CONSENT_COOKIE_NAME.length + 1))
    return parseRecord(raw)
  } catch {
    return null
  }
}

/**
 * Persist the consent record to cookie + localStorage sync.
 * Silent on failure - non-fatal.
 */
export function writeConsent(record: ConsentRecord): void {
  if (typeof document === 'undefined') return // SSR guard

  try {
    const encoded = encodeURIComponent(JSON.stringify(record))
    document.cookie = [
      `${CONSENT_COOKIE_NAME}=${encoded}`,
      `max-age=${MAX_AGE}`,
      'path=/',
      'samesite=lax',
    ].join('; ')
  } catch {
    // Cookie write failure is non-fatal
  }

  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(record))
  } catch {
    // localStorage unavailable (private mode, etc.) - non-fatal
  }
}

/**
 * Clear the consent record from all storage.
 * Used for testing and consent reset flows.
 */
export function clearConsent(): void {
  if (typeof document === 'undefined') return

  try {
    document.cookie = `${CONSENT_COOKIE_NAME}=; max-age=0; path=/`
  } catch {
    // silent
  }

  try {
    localStorage.removeItem(CONSENT_COOKIE_NAME)
  } catch {
    // silent
  }
}
