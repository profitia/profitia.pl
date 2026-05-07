// ─────────────────────────────────────────────────────────────────────────────
// Career Layer — Core Types
// Institutional recruitment editorial system.
// Not employer branding. Not HR marketing.
// ─────────────────────────────────────────────────────────────────────────────

export type CareerLocale = 'pl' | 'en'

export interface CareerLocalizedString {
  pl: string
  en: string
}

export interface CareerMeta {
  title: CareerLocalizedString
  description: CareerLocalizedString
}

/**
 * A single job post in the canonical career data layer.
 * Editorial, institutional, bilingual.
 */
export interface JobPost {
  /** URL slug: kebab-case, language-neutral */
  slug: string
  /** Role title */
  title: CareerLocalizedString
  /** Department / practice label */
  department: CareerLocalizedString
  /** Location */
  location: CareerLocalizedString
  /** Employment type */
  employmentType: CareerLocalizedString
  /** Short description for listing rows */
  summary: CareerLocalizedString
  /**
   * Strategic positioning of this role — one paragraph.
   * Not a job ad intro. An honest description of where this role sits.
   */
  roleContext: CareerLocalizedString
  /** What you will work on — 4–6 items */
  workItems: CareerLocalizedString[]
  /** What matters in this role — 4–5 items */
  requirements: CareerLocalizedString[]
  /** What kind of person succeeds here — 3–4 items */
  profile: CareerLocalizedString[]
  /** Working model — format, location, flexibility */
  workingModel: CareerLocalizedString
  /** Development path in this role */
  development: CareerLocalizedString
  metadata: CareerMeta
}
