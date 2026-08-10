import type { NewsletterSubscription } from '@/prisma/generated/forms-client'

import type { HomeplSmtpEmailInput } from '@/lib/email/homepl-smtp'

const DEFAULT_NEWSLETTER_REPLY_TO = 'kontakt@profitia.pl'

const NEWSLETTER_CONFIRMATION_COPY = {
  pl: {
    subject: 'Dziękujemy za zapis do newslettera Profitia',
    text: [
      'Dzień dobry,',
      '',
      'dziękujemy za zapis do newslettera Profitia.',
      '',
      'Od teraz będziemy informować Cię o najważniejszych publikacjach, wydarzeniach i aktualnościach Profitia.',
      '',
      'Pozdrawiamy,',
      'Zespół Profitia',
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <p style="margin:0 0 16px;">Dzień dobry,</p>',
      '  <p style="margin:0 0 16px;">dziękujemy za zapis do newslettera Profitia.</p>',
      '  <p style="margin:0 0 16px;">Od teraz będziemy informować Cię o najważniejszych publikacjach, wydarzeniach i aktualnościach Profitia.</p>',
      '  <p style="margin:0;">Pozdrawiamy,<br>Zespół Profitia</p>',
      '</div>',
    ].join('\n'),
  },
  en: {
    subject: 'Thank you for subscribing to the Profitia newsletter',
    text: [
      'Hello,',
      '',
      'Thank you for subscribing to the Profitia newsletter.',
      '',
      'You will now receive updates about our latest publications, events and news.',
      '',
      'Best regards,',
      'Profitia Team',
    ].join('\n'),
    html: [
      '<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1f2937;">',
      '  <p style="margin:0 0 16px;">Hello,</p>',
      '  <p style="margin:0 0 16px;">Thank you for subscribing to the Profitia newsletter.</p>',
      '  <p style="margin:0 0 16px;">You will now receive updates about our latest publications, events and news.</p>',
      '  <p style="margin:0;">Best regards,<br>Profitia Team</p>',
      '</div>',
    ].join('\n'),
  },
} as const

export function resolveNewsletterReplyTo(env: NodeJS.ProcessEnv = process.env): string {
  return env.MAILBOX_LOGIN?.trim().toLowerCase() || DEFAULT_NEWSLETTER_REPLY_TO
}

export function buildNewsletterConfirmationEmail(
  subscription: Pick<NewsletterSubscription, 'email' | 'locale'>,
  env: NodeJS.ProcessEnv = process.env
): HomeplSmtpEmailInput {
  const locale = subscription.locale === 'en' ? 'en' : 'pl'
  const copy = NEWSLETTER_CONFIRMATION_COPY[locale]

  return {
    to: subscription.email,
    replyTo: resolveNewsletterReplyTo(env),
    subject: copy.subject,
    text: copy.text,
    html: copy.html,
  }
}