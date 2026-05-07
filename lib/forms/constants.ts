/**
 * lib/forms/constants.ts
 *
 * Canonical constants for the Profitia form system.
 */

/** Current consent schema version - bump when consent copy changes. */
export const CONSENT_VERSION = '2026-05-07'

export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { max: 200 },
  message: { min: 10, max: 2000 },
} as const

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
