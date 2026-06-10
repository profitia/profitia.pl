// ─────────────────────────────────────────────────────────────────────────────
// Career Application - Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Maximum CV file size in bytes (10 MB) */
export const CV_MAX_BYTES = 10 * 1024 * 1024

/** Allowed MIME types for CV upload */
export const CV_ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',                                                        // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',   // .docx
]

/** Allowed file extensions (display only) */
export const CV_ALLOWED_EXTENSIONS = '.pdf,.doc,.docx'

/** Query param name used to preselect role from detail page CTA */
export const ROLE_PARAM = 'role'

/** Field character limits */
export const FIELD_LIMITS = {
  fullName: 120,
  email: 254,
  phone: 30,
  motivation: 2000,
} as const
