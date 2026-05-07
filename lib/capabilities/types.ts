// ─────────────────────────────────────────────────────────────────────────────
// Capability Platform - Core Types
// Shared by Services and Education. One architecture, two surfaces.
// ─────────────────────────────────────────────────────────────────────────────

export type CapabilityType = 'service' | 'education'

export type CapabilityCategory =
  | 'advisory'
  | 'negotiations'
  | 'analytics'
  | 'transformation'
  | 'coaching'
  | 'executive-education'
  | 'workshops'
  | 'intelligence'

export type Locale = 'pl' | 'en'

export interface LocalizedString {
  pl: string
  en: string
}

export interface CapabilityMeta {
  title: LocalizedString
  description: LocalizedString
}

/**
 * Core capability entity.
 * Covers both services (type: 'service') and education (type: 'education').
 */
export interface Capability {
  slug: string
  type: CapabilityType
  category: CapabilityCategory
  featured: boolean
  order: number
  eyebrow: LocalizedString
  title: LocalizedString
  shortDescription: LocalizedString
  longDescription: LocalizedString
  /** Business problems this capability addresses */
  whatItSolves: LocalizedString[]
  /** Measurable outcomes */
  outcomes: LocalizedString[]
  /** Process / methodology steps */
  methodology: LocalizedString[]
  /** Typical engagement format (single sentence) */
  engagement: LocalizedString
  /** Slugs of related capabilities (cross-type allowed) */
  relatedCapabilities: string[]
  /** Blog article slugs (empty until content exists) */
  relatedInsights: string[]
  metadata: CapabilityMeta
  ctaLabel: LocalizedString
}

/**
 * Section grouping on the listing page (Services or Education).
 */
export interface CapabilitySectionDef {
  id: string
  type: CapabilityType
  order: number
  eyebrow: LocalizedString
  title: LocalizedString
  description: LocalizedString
  /** Anchor practice section - rendered with larger type and more whitespace */
  featured?: boolean
  /**
   * Primary anchor - the single most commanding section on the page.
   * Creates hierarchy narrative: one dominant, others supporting.
   * Only one section per page should carry this.
   */
  dominant?: boolean
}
