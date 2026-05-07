/**
 * lib/forms/validation.ts
 *
 * Client-side validation logic — locale-aware, text-first, calm error messages.
 * Server-side boundary validation lives in the API routes (Zod).
 */

import { FIELD_LIMITS } from './constants'
import type { ContactFormValues, NewsletterFormValues, FieldErrors, Locale } from './types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MESSAGES = {
  pl: {
    required: 'To pole jest wymagane.',
    emailInvalid: 'Podaj poprawny adres e-mail.',
    tooShort: (min: number) => `Minimalna długość to ${min} znaki.`,
    tooLong: (max: number) => `Maksymalna długość to ${max} znaków.`,
    consentRequired: 'Akceptacja tej zgody jest wymagana.',
    topicRequired: 'Wybierz temat zapytania.',
  },
  en: {
    required: 'This field is required.',
    emailInvalid: 'Please enter a valid email address.',
    tooShort: (min: number) => `Minimum length is ${min} characters.`,
    tooLong: (max: number) => `Maximum length is ${max} characters.`,
    consentRequired: 'Your acceptance is required.',
    topicRequired: 'Please select a topic.',
  },
} as const

export function validateContactForm(
  values: ContactFormValues,
  locale: Locale
): FieldErrors<ContactFormValues> {
  const m = MESSAGES[locale]
  const errors: FieldErrors<ContactFormValues> = {}

  // Name
  if (!values.name.trim()) {
    errors.name = m.required
  } else if (values.name.trim().length < FIELD_LIMITS.name.min) {
    errors.name = m.tooShort(FIELD_LIMITS.name.min)
  } else if (values.name.length > FIELD_LIMITS.name.max) {
    errors.name = m.tooLong(FIELD_LIMITS.name.max)
  }

  // Email
  if (!values.email.trim()) {
    errors.email = m.required
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = m.emailInvalid
  }

  // Company (optional — validate only if provided)
  if (values.company && values.company.length > FIELD_LIMITS.company.max) {
    errors.company = m.tooLong(FIELD_LIMITS.company.max)
  }

  // Topic
  if (!values.topic) {
    errors.topic = m.topicRequired
  }

  // Message
  if (!values.message.trim()) {
    errors.message = m.required
  } else if (values.message.trim().length < FIELD_LIMITS.message.min) {
    errors.message = m.tooShort(FIELD_LIMITS.message.min)
  } else if (values.message.length > FIELD_LIMITS.message.max) {
    errors.message = m.tooLong(FIELD_LIMITS.message.max)
  }

  // GDPR consent (required)
  if (!values.consentGdpr) {
    errors.consentGdpr = m.consentRequired
  }

  return errors
}

export function validateNewsletterForm(
  values: NewsletterFormValues,
  locale: Locale
): FieldErrors<NewsletterFormValues> {
  const m = MESSAGES[locale]
  const errors: FieldErrors<NewsletterFormValues> = {}

  if (!values.email.trim()) {
    errors.email = m.required
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = m.emailInvalid
  }

  if (!values.consentGdpr) {
    errors.consentGdpr = m.consentRequired
  }

  return errors
}

export function hasErrors<T extends object>(
  errors: FieldErrors<T>
): boolean {
  return Object.keys(errors).length > 0
}
