export type LanguagePaths = Partial<Record<'pl' | 'en', string>>

export function resolveLanguageSwitchPath(
  locale: 'pl' | 'en',
  currentPath: string,
  isEnglishPath: boolean,
  languagePaths: LanguagePaths | null,
): string {
  if (languagePaths) {
    return languagePaths[locale] ?? (locale === 'en' ? '/en/blog' : '/blog')
  }

  if (locale === 'en') {
    return isEnglishPath ? currentPath : `/en${currentPath}`
  }

  return isEnglishPath ? currentPath.slice(3) || '/' : currentPath
}
