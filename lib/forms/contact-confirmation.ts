import type { ContactSubmission } from '@/prisma/generated/forms-client'

import type { HomeplSmtpEmailInput } from '@/lib/email/homepl-smtp'
import { resolveContactNotificationRecipient } from '@/lib/forms/contact-notification'

const CONFIRMATION_COPY = {
  pl: {
    subject: 'Dziękujemy za kontakt z Profitia',
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <p style="margin:0 0 16px;">Dzień dobry,</p>',
      '  <p style="margin:0 0 16px;">dziękujemy za kontakt z Profitia. Otrzymaliśmy Twoją wiadomość i wrócimy z odpowiedzią możliwie szybko.</p>',
      '  <p style="margin:0;">Pozdrawiamy,<br>Zespół Profitia</p>',
      '</div>',
    ].join('\n'),
  },
  en: {
    subject: 'Thank you for contacting Profitia',
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <p style="margin:0 0 16px;">Hello,</p>',
      '  <p style="margin:0 0 16px;">Thank you for contacting Profitia. We have received your message and will get back to you as soon as possible.</p>',
      '  <p style="margin:0;">Best regards,<br>Profitia Team</p>',
      '</div>',
    ].join('\n'),
  },
} as const

export function buildContactConfirmationEmail(
  submission: ContactSubmission,
  env: NodeJS.ProcessEnv = process.env
): HomeplSmtpEmailInput {
  const locale = submission.locale === 'en' ? 'en' : 'pl'
  const copy = CONFIRMATION_COPY[locale]

  return {
    to: submission.email,
    replyTo: resolveContactNotificationRecipient(env),
    subject: copy.subject,
    html: copy.html,
  }
}