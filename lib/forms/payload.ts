/**
 * lib/forms/payload.ts
 *
 * Payload builders - transform validated form values into canonical
 * CRM-ready, audit-ready submission payloads.
 */

import { CONSENT_VERSION } from './constants'
import type {
  ContactFormValues,
  NewsletterFormValues,
  ContactSubmissionPayload,
  NewsletterSubmissionPayload,
  Locale,
} from './types'

export function buildContactPayload(
  values: ContactFormValues,
  locale: Locale,
  source: string
): ContactSubmissionPayload {
  const now = new Date().toISOString()

  const payload: ContactSubmissionPayload = {
    formType: 'contact',
    locale,
    submittedAt: now,
    source,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    topic: values.topic,
    message: values.message.trim(),
    consent: {
      gdpr: values.consentGdpr,
      newsletter: values.consentNewsletter,
      consentVersion: CONSENT_VERSION,
      consentAt: now,
      lawfulBasis: 'consent',
    },
  }

  if (values.company.trim()) {
    payload.company = values.company.trim()
  }

  return payload
}

export function buildNewsletterPayload(
  values: NewsletterFormValues,
  locale: Locale,
  source: string,
  options: {
    website: string
    formStartedAt: number
    turnstileToken: string
  }
): NewsletterSubmissionPayload {
  return {
    formType: 'newsletter',
    locale,
    sourcePage: source,
    email: values.email,
    consent: true,
    website: options.website,
    formStartedAt: options.formStartedAt,
    turnstileToken: options.turnstileToken,
  }
}
