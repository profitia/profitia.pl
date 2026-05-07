/**
 * lib/forms/submission.ts
 *
 * Submission handlers - send canonical payloads to API routes.
 *
 * Architecture supports future integrations:
 *   - HubSpot CRM
 *   - Pipedrive
 *   - Apollo.io
 *   - Mailchimp / Brevo / Mailerlite
 *   - Webhooks / automation flows
 *
 * CRM integrations belong in the API routes (/api/contact, /api/newsletter),
 * not here. This layer is intentionally thin - build/send/return.
 */

import type {
  ContactSubmissionPayload,
  NewsletterSubmissionPayload,
  SubmissionResult,
} from './types'

export async function submitContactForm(
  payload: ContactSubmissionPayload
): Promise<SubmissionResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return {
        success: false,
        errorCode: (body as { errorCode?: string }).errorCode ?? 'SERVER_ERROR',
        message: (body as { message?: string }).message,
      }
    }

    return { success: true }
  } catch {
    return { success: false, errorCode: 'NETWORK_ERROR' }
  }
}

export async function submitNewsletterForm(
  payload: NewsletterSubmissionPayload
): Promise<SubmissionResult> {
  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return {
        success: false,
        errorCode: (body as { errorCode?: string }).errorCode ?? 'SERVER_ERROR',
        message: (body as { message?: string }).message,
      }
    }

    return { success: true }
  } catch {
    return { success: false, errorCode: 'NETWORK_ERROR' }
  }
}
