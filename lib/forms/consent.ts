/**
 * lib/forms/consent.ts
 *
 * Consent field definitions for form contexts.
 *
 * These are inline form consents establishing GDPR lawful basis
 * (Article 6(1)(a)) at the point of data collection.
 * Separate from ConsentBanner system (cookie consent).
 */

export interface FormConsentField {
  id: string
  required: boolean
  label: { pl: string; en: string }
  description: { pl: string; en: string }
}

export const CONTACT_CONSENTS: FormConsentField[] = [
  {
    id: 'consentGdpr',
    required: true,
    label: {
      pl: 'Zgoda na przetwarzanie danych',
      en: 'Data processing consent',
    },
    description: {
      pl: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu udzielenia odpowiedzi na moje zapytanie, zgodnie z Polityką Prywatności.',
      en: 'I consent to processing of my personal data by Profitia for the purpose of responding to my enquiry, in accordance with the Privacy Policy.',
    },
  },
  {
    id: 'consentNewsletter',
    required: false,
    label: {
      pl: 'Zgoda marketingowa',
      en: 'Marketing consent',
    },
    description: {
      pl: 'Zgadzam się na przesyłanie informacji o usługach, publikacjach i wydarzeniach Profitia. Zgodę mogę wycofać w dowolnym momencie.',
      en: 'I agree to receive information about Profitia services, publications and events. I may withdraw this consent at any time.',
    },
  },
]

export const NEWSLETTER_CONSENTS: FormConsentField[] = [
  {
    id: 'consentGdpr',
    required: true,
    label: {
      pl: 'Zgoda na przetwarzanie danych',
      en: 'Data processing consent',
    },
    description: {
      pl: 'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu przesyłania newslettera, zgodnie z Polityką Prywatności.',
      en: 'I consent to processing of my personal data by Profitia for the purpose of sending the newsletter, in accordance with the Privacy Policy.',
    },
  },
]
