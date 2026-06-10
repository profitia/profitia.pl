import { z } from 'zod'
import { CV_MAX_BYTES, CV_ALLOWED_TYPES, FIELD_LIMITS } from './constants'
import type { ApplicationFormValues, ApplicationFieldErrors } from './types'
import type { RoleFormConfig } from './role-config'

// ─────────────────────────────────────────────────────────────────────────────
// Zod schema - validates core contact fields.
// Role-specific answers are validated separately via roleConfig.
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
  consentCurrent: z.literal(true, {
    errorMap: () => ({ message: 'Ta zgoda jest wymagana / This consent is required' }),
  }),
  consentFuture: z.boolean(),
})

/**
 * Validate application form values.
 *
 * Validates core fields via Zod schema, CV via file checks, and
 * role-specific required answers via roleConfig (if provided).
 *
 * Role answer errors are stored as flat keys: "roleAnswers_<questionId>".
 *
 * Returns field-level errors in display-ready format.
 */
export function validateApplication(
  values: ApplicationFormValues,
  locale: 'pl' | 'en',
  roleConfig?: RoleFormConfig
): ApplicationFieldErrors {
  const errors: ApplicationFieldErrors = {}

  // ── CV file validation ────────────────────────────────────────
  if (!values.cv) {
    errors.cv = locale === 'en'
      ? 'Please attach your CV (PDF, DOC or DOCX)'
      : 'Proszę załączyć CV (PDF, DOC lub DOCX)'
  } else if (!CV_ALLOWED_TYPES.includes(values.cv.type)) {
    errors.cv = locale === 'en'
      ? 'Only PDF, DOC and DOCX files are accepted'
      : 'Akceptowane są pliki PDF, DOC i DOCX'
  } else if (values.cv.size > CV_MAX_BYTES) {
    errors.cv = locale === 'en'
      ? 'File exceeds 10 MB limit'
      : 'Plik przekracza limit 10 MB'
  }

  // ── Core fields via Zod ───────────────────────────────────────
  const result = applicationSchema.safeParse({
    roleSlug: values.roleSlug,
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    consentCurrent: values.consentCurrent || undefined,
    consentFuture: values.consentFuture,
  })

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string
      if (!errors[field]) {
        const raw = issue.message
        // Messages stored as "PL / EN" - split by locale
        if (raw.includes(' / ')) {
          errors[field] = locale === 'en' ? raw.split(' / ')[1] : raw.split(' / ')[0]
        } else {
          errors[field] = raw
        }
      }
    }
  }

  // ── Role-specific required answers ────────────────────────────
  if (roleConfig) {
    for (const question of roleConfig.questions) {
      if (question.required) {
        const answer = values.roleAnswers[question.id]
        if (!answer || answer.trim() === '') {
          errors[`roleAnswers_${question.id}`] = locale === 'en'
            ? 'This field is required'
            : 'To pole jest wymagane'
        }
      }
    }
  }

  return errors
}

export function hasApplicationErrors(errors: ApplicationFieldErrors): boolean {
  return Object.values(errors).some((v) => v !== undefined)
}
