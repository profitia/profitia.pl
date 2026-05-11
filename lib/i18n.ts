export type Locale = 'pl' | 'en'

export type Dictionary = typeof import('@/dictionaries/pl.json')
export type HomepageDictionary = Dictionary['homepage']

export const LOCALES: Locale[] = ['pl', 'en']

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pl: () => import('@/dictionaries/pl.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.pl
  return loader()
}

// ── Advisory additions ────────────────────────────────────
export const DEFAULT_LOCALE = 'pl' as const

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale)
}

export const ASSISTANT_STRINGS = {
  pl: {
    triggerLabel: 'Doradca',
    triggerAriaLabel: 'Otwórz doradcę zakupowego',
    closeAriaLabel: 'Zamknij asystenta',
    placeholder: 'Napisz o swojej sytuacji zakupowej...',
    thinking: 'Analizuję...',
    openingGreeting: 'Czym mogę pomóc?',
    ctaSuffix: '→',
    errorMessage: 'Wystąpił błąd. Spróbuj ponownie.',
    poweredBy: 'Powered by Profitia Advisory Intelligence',
  },
  en: {
    triggerLabel: 'Advisor',
    triggerAriaLabel: 'Open procurement advisor',
    closeAriaLabel: 'Close advisor',
    placeholder: 'Describe your procurement situation...',
    thinking: 'Analysing...',
    openingGreeting: 'How can I help?',
    ctaSuffix: '→',
    errorMessage: 'Something went wrong. Please try again.',
    poweredBy: 'Powered by Profitia Advisory Intelligence',
  },
} as const

export type AssistantStrings = typeof ASSISTANT_STRINGS[Locale]
