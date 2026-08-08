import type { ContactSubmission } from '@/prisma/generated/forms-client'

import type { Office365EmailFailure, Office365EmailInput } from '@/lib/email/office365'

const DEFAULT_CONTACT_NOTIFICATION_EMAIL = 'kontakt@profitia.pl'
const MAX_INTERNAL_EMAIL_ERROR_LENGTH = 300

const INTERNAL_TOPIC_LABELS: Record<string, string> = {
  general: 'Ogólne zapytanie',
  advisory: 'Doradztwo zakupowe',
  spendguru: 'SpendGuru',
  training: 'Szkolenia / certyfikacja',
  partnership: 'Współpraca / partnerstwo',
  other: 'Inne',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatNullable(value: string | null | undefined): string {
  if (!value) {
    return 'Nie podano'
  }

  return escapeHtml(value)
}

function formatMultiline(value: string): string {
  return escapeHtml(value).replace(/\r\n?|\n/g, '<br>')
}

function formatBoolean(value: boolean): string {
  return value ? 'TAK' : 'NIE'
}

export function resolveContactNotificationRecipient(env: NodeJS.ProcessEnv = process.env): string {
  return env.CONTACT_NOTIFICATION_EMAIL?.trim().toLowerCase() || DEFAULT_CONTACT_NOTIFICATION_EMAIL
}

export function getInternalContactTopicLabel(topic: string | null | undefined): string {
  if (!topic) {
    return INTERNAL_TOPIC_LABELS.other
  }

  return INTERNAL_TOPIC_LABELS[topic] ?? topic
}

export function buildInternalContactNotificationEmail(
  submission: ContactSubmission,
  env: NodeJS.ProcessEnv = process.env
): Office365EmailInput {
  const topicLabel = getInternalContactTopicLabel(submission.topic)

  return {
    to: resolveContactNotificationRecipient(env),
    replyTo: submission.email,
    subject: `Nowe zapytanie ze strony Profitia - ${topicLabel}`,
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">Nowe zapytanie kontaktowe</h2>',
      '  <p style="margin:0 0 16px;">Na stronie Profitia pojawiło się nowe zgłoszenie z formularza kontaktowego.</p>',
      '  <table style="border-collapse:collapse;width:100%;max-width:720px;">',
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Imię i nazwisko</td><td style="padding:8px 0;">${formatNullable(submission.fullName)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Email</td><td style="padding:8px 0;">${formatNullable(submission.email)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Firma</td><td style="padding:8px 0;">${formatNullable(submission.company)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Temat</td><td style="padding:8px 0;">${escapeHtml(topicLabel)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Wiadomość</td><td style="padding:8px 0;">${formatMultiline(submission.message)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Locale</td><td style="padding:8px 0;">${formatNullable(submission.locale)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Source page</td><td style="padding:8px 0;">${formatNullable(submission.sourcePage)}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Submitted at</td><td style="padding:8px 0;">${escapeHtml(submission.submittedAt.toISOString())}</td></tr>`,
      `    <tr><td style="padding:8px 0;font-weight:600;width:180px;vertical-align:top;">Zgoda marketingowa</td><td style="padding:8px 0;">${formatBoolean(submission.marketingConsent)}</td></tr>`,
      '  </table>',
      `  <p style="margin:16px 0 0;color:#6b7280;font-size:12px;">Submission ID: ${escapeHtml(submission.id)}</p>`,
      '</div>',
    ].join('\n'),
  }
}

export function summarizeOffice365EmailFailure(error: Office365EmailFailure): string {
  const detail = error.code === 'TOKEN_ACQUISITION_FAILED'
    ? 'token acquisition failed'
    : error.code

  const summary = `${error.kind}: ${detail}`
  return summary.length <= MAX_INTERNAL_EMAIL_ERROR_LENGTH
    ? summary
    : summary.slice(0, MAX_INTERNAL_EMAIL_ERROR_LENGTH)
}

export function summarizeInternalEmailFailure(error: Office365EmailFailure): string {
  return summarizeOffice365EmailFailure(error)
}