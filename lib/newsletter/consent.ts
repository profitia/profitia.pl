import type { Locale } from '@/lib/forms/types'

export const NEWSLETTER_CONSENT_VERSION = '2026-08-10'
export const NEWSLETTER_LAWFUL_BASIS = 'consent' as const

export const NEWSLETTER_CONSENT_COPY = {
  pl: {
    fullText:
      'Wyrażam zgodę na przetwarzanie moich danych przez Profitia w celu przesyłania newslettera, zgodnie z Polityką Prywatności.',
    linkLabel: 'Polityką Prywatności.',
  },
  en: {
    fullText:
      'I consent to processing of my personal data by Profitia for the purpose of sending the newsletter, in accordance with the Privacy Policy.',
    linkLabel: 'Privacy Policy.',
  },
} as const satisfies Record<Locale, { fullText: string; linkLabel: string }>

export function getNewsletterConsentContent(locale: Locale) {
  const entry = NEWSLETTER_CONSENT_COPY[locale]

  if (!entry.fullText.endsWith(entry.linkLabel)) {
    throw new Error(`Newsletter consent copy for locale ${locale} must end with its link label.`)
  }

  return {
    fullText: entry.fullText,
    linkLabel: entry.linkLabel,
    prefixText: entry.fullText.slice(0, -entry.linkLabel.length).trimEnd(),
  }
}