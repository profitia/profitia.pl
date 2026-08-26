export const RECRUITMENT_CONSENT_VERSION = '2026-08-26'
export const RECRUITMENT_LAWFUL_BASIS = 'consent'

export const RECRUITMENT_CONSENT_COPY = {
  pl: {
    current: 'Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia obecnego procesu rekrutacyjnego.',
    future: 'Wyrażam zgodę na przetwarzanie moich danych osobowych również w przyszłych procesach rekrutacyjnych prowadzonych przez Profitia.',
  },
  en: {
    current: 'I consent to the processing of my personal data for the purpose of the current recruitment process.',
    future: 'I consent to the processing of my personal data for future recruitment processes conducted by Profitia.',
  },
} as const

export type RecruitmentLocale = keyof typeof RECRUITMENT_CONSENT_COPY

export function getRecruitmentConsentContent(locale: RecruitmentLocale) {
  return RECRUITMENT_CONSENT_COPY[locale]
}