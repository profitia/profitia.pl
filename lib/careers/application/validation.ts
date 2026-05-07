import { z } from 'zod'
import { CV_MAX_BYTES, CV_ALLOWED_TYPES, FIELD_LIMITS } from './constants'
import type { ApplicationFormValues, ApplicationFieldErrors } from './types'

// ─────────────────────────────────────────────────────────────────────────────
// Zod schema — used as the canonical validation source.
// The manual validateApplication function runs this for field-level errors.
// ─────────────────────────────────────────────────────────────────────────────

export const applicationSchema = z.object({
  roleSlug: z.string().min(1, 'Wybierz stanowisko / Select a role'),
  fullName: z
    .string()
    .min(2, 'Imię i nazwisko jest wymagane / Full name is required')
    .max(FIELD_LIMITS.fullName),
  email: z
    .string()
    .min(1, 'Adres e-mail jest wymagany / Email is required')
    .email('Nieprawidłowy adres e-mail / Invalid email address')
    .max(FIELD_LIMITS.email),
  phone: z
    .string()
    .min(7, 'Numer telefonu jest wymagany / Phone number is required')
    .max(FIELD_LIMITS.phone),
  linkedin: z.string().max(FIELD_LIMITS.linkedin).optional(),
  message: z.string().max(FIELD_LIMITS.message).optional(),
  consentCurrent: z.literal(true, {
    errorMap: () => ({ message: 'Ta zgoda jest wymagana / This consent is required' }),
  }),
  consentFuture: z.boolean(),
})

/**
 * Validate application form values.
 * File (cv) is validated separately — Zod doesn't model File objects well on the client.
 *
 * Returns field-level errors in display-ready format.
 */
export function validateApplication(
  values: ApplicationFormValues,
  locale: 'pl' | 'en'
): ApplicationFieldErrors {
  const errors: ApplicationFieldErrors = {}

  // ── CV file validation ────────────────────────────────────────
  if (!values.cv) {
    errors.cv = locale === 'en'
      ? 'Please attach your CV (PDF)'
      : 'Proszę załączyć CV (PDF)'
  } else if (!CV_ALLOWED_TYPES.includes(values.cv.type)) {
    errors.cv = locale === 'en'
      ? 'Only PDF files are accepted'
      : 'Akceptowane są tylko pliki PDF'
  } else if (values.cv.size > CV_MAX_BYTES) {
    errors.cv = locale === 'en'
      ? 'File exceeds 10 MB limit'
      : 'Plik przekracza limit 10 MB'
  }

  // ── Zod validation for text fields ───────────────────────────
  const result = applicationSchema.safeParse({
    roleSlug: values.roleSlug,
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    linkedin: values.linkedin || undefined,
    message: values.message || undefined,
    consentCurrent: values.consentCurrent || undefined,
    consentFuture: values.consentFuture,
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof ApplicationFieldErrors
      if (!errors[field]) {
        // Surface locale-appropriate message
        const raw = issue.message
        // Messages are stored as "PL / EN" — split by locale
        if (raw.includes(' / ')) {
          errors[field] = locale === 'en' ? raw.split(' / ')[1] : raw.split(' / ')[0]
        } else {
          errors[field] = raw
        }
      }
    }
  }

  return errors
}

export function hasApplicationErrors(errors: ApplicationFieldErrors): boolean {
  return Object.keys(errors).length > 0
}
