/**
 * lib/forms/constants.ts
 *
 * Canonical constants for the Profitia form system.
 */

/** Current consent schema version - bump when consent copy changes. */
export const CONSENT_VERSION = '2026-05-07'

/** Privacy policy snapshot version used by the current form bundle. */
export const PRIVACY_POLICY_VERSION = '2026-05-07'

export const PRIVACY_POLICY_PATHS = {
  pl: '/privacy',
  en: '/en/privacy',
} as const

export const CONTACT_CONSENT_COPY = {
  pl: {
    privacyConsentText:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu udzielenia odpowiedzi na moje zapytanie, zgodnie z',
    privacyPolicyLabel: 'Polityką Prywatności.',
    marketingConsentText:
      'Zgadzam się na przesyłanie informacji o usługach, publikacjach i wydarzeniach Profitia. Zgodę mogę wycofać w dowolnym momencie.',
  },
  en: {
    privacyConsentText:
      'I consent to processing of my personal data by Profitia for the purpose of responding to my enquiry, in accordance with the',
    privacyPolicyLabel: 'Privacy Policy.',
    marketingConsentText:
      'I agree to receive information about Profitia services, publications and events. I may withdraw this consent at any time.',
  },
} as const

export const NEWSLETTER_CONSENT_COPY = {
  pl: {
    privacyConsentText:
      'Wyrażam zgodę na przetwarzanie moich danych osobowych przez Profitia w celu przesyłania newslettera, zgodnie z Polityką Prywatności.',
  },
  en: {
    privacyConsentText:
      'I consent to processing of my personal data by Profitia for the purpose of sending the newsletter, in accordance with the Privacy Policy.',
  },
} as const

export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 200 },
  message: { min: 10, max: 2000 },
} as const

export const TURNSTILE_ACTION = 'contact_form'
export const ADMIN_LOGIN_TURNSTILE_ACTION = 'admin_login'
export const TURNSTILE_TOKEN_MAX_LENGTH = 2048

export const CONTACT_TOPICS = {
  pl: [
    { value: '', label: 'Wybierz temat...' },
    { value: 'general', label: 'Ogólne zapytanie' },
    { value: 'advisory', label: 'Doradztwo zakupowe' },
    { value: 'spendguru', label: 'SpendGuru' },
    { value: 'training', label: 'Szkolenia i certyfikacja' },
    { value: 'partnership', label: 'Współpraca i partnerstwo' },
    { value: 'other', label: 'Inne' },
  ],
  en: [
    { value: '', label: 'Select a topic...' },
    { value: 'general', label: 'General enquiry' },
    { value: 'advisory', label: 'Procurement advisory' },
    { value: 'spendguru', label: 'SpendGuru' },
    { value: 'training', label: 'Training & certification' },
    { value: 'partnership', label: 'Collaboration & partnership' },
    { value: 'other', label: 'Other' },
  ],
} as const
