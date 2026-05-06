export type Locale = 'pl' | 'en'

export type Dictionary = typeof import('@/dictionaries/pl.json')

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  pl: () => import('@/dictionaries/pl.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.pl
  return loader()
}
