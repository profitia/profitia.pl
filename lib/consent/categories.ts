/**
 * Canonical Consent Categories — Definition Registry
 *
 * Single source of truth for all consent categories.
 * Both PL and EN strings are inline — no dictionary dependency for consent copy.
 * The UI layer picks the correct locale at render time.
 */

import type { ConsentCategory } from './types'

export interface ConsentCategoryDefinition {
  id: ConsentCategory
  /** If true, always enabled — toggle is locked and unconfigurable. */
  required: boolean
  /** Default state for new visitors before any consent decision. */
  defaultEnabled: boolean
  label: { pl: string; en: string }
  description: { pl: string; en: string }
  /** Concrete examples — shown in preferences modal. */
  examples: { pl: string; en: string }
}

export const CONSENT_CATEGORIES: ConsentCategoryDefinition[] = [
  {
    id: 'necessary',
    required: true,
    defaultEnabled: true,
    label: {
      pl: 'Niezbędne',
      en: 'Necessary',
    },
    description: {
      pl: 'Wymagane do prawidłowego działania serwisu. Bez tych plików serwis nie będzie funkcjonować poprawnie. Nie można ich wyłączyć.',
      en: 'Required for the service to function correctly. Without these, the site cannot operate. Cannot be disabled.',
    },
    examples: {
      pl: 'Sesja, bezpieczeństwo, preferencje językowe, zgoda RODO',
      en: 'Session, security, language preferences, GDPR consent',
    },
  },
  {
    id: 'analytics',
    required: false,
    defaultEnabled: false,
    label: {
      pl: 'Analityczne',
      en: 'Analytics',
    },
    description: {
      pl: 'Pomagają nam rozumieć, jak użytkownicy korzystają z serwisu. Dane są agregowane i anonimowe — nie identyfikują konkretnych osób.',
      en: 'Help us understand how visitors use the site. Data is aggregated and anonymous — no individual is identified.',
    },
    examples: {
      pl: 'Google Analytics, Hotjar, Microsoft Clarity',
      en: 'Google Analytics, Hotjar, Microsoft Clarity',
    },
  },
  {
    id: 'marketing',
    required: false,
    defaultEnabled: false,
    label: {
      pl: 'Marketingowe',
      en: 'Marketing',
    },
    description: {
      pl: 'Umożliwiają personalizację reklam oraz pomiar skuteczności kampanii. Dane mogą być udostępniane partnerom reklamowym.',
      en: 'Enable personalised advertising and campaign measurement. Data may be shared with advertising partners.',
    },
    examples: {
      pl: 'Google Ads, Meta Pixel, LinkedIn Insight Tag',
      en: 'Google Ads, Meta Pixel, LinkedIn Insight Tag',
    },
  },
  {
    id: 'functional',
    required: false,
    defaultEnabled: false,
    label: {
      pl: 'Funkcjonalne',
      en: 'Functional',
    },
    description: {
      pl: 'Umożliwiają dodatkowe funkcje, które nie są niezbędne do działania serwisu, ale poprawiają komfort korzystania.',
      en: 'Enable additional features that are not essential to site operation, but improve usability.',
    },
    examples: {
      pl: 'Intercom, Vimeo, HubSpot Forms, Calendly',
      en: 'Intercom, Vimeo, HubSpot Forms, Calendly',
    },
  },
]

/** Quick lookup map: category id → definition */
export const CONSENT_CATEGORY_MAP = Object.fromEntries(
  CONSENT_CATEGORIES.map((c) => [c.id, c])
) as Record<ConsentCategory, ConsentCategoryDefinition>
