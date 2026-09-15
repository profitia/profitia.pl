export type LanguagePaths = Partial<Record<'pl' | 'en', string>>

import { getLocalizedSiblingPath, getPublicPath } from '@/lib/routing/public-routes'

export function resolveLanguageSwitchPath(
  locale: 'pl' | 'en',
  currentPath: string,
  isEnglishPath: boolean,
  languagePaths: LanguagePaths | null,
): string {
  if (languagePaths) {
    return languagePaths[locale] ?? (locale === 'en' ? '/en/blog' : '/blog')
  }

  if (currentPath === '/blog' || currentPath.startsWith('/blog/') || currentPath === '/en/blog' || currentPath.startsWith('/en/blog/')) {
    if (locale === 'en') {
      return isEnglishPath ? currentPath : `/en${currentPath}`
    }

    return isEnglishPath ? currentPath.slice(3) || '/' : currentPath
  }

  const localizedSiblingPath = getLocalizedSiblingPath(currentPath, locale)
  if (localizedSiblingPath) {
    return localizedSiblingPath
  }

  return getPublicPath('home', locale)
}
