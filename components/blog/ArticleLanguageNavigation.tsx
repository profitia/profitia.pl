'use client'

import { useEffect } from 'react'
import type { LanguagePaths } from '@/components/layout/LanguageNavigationProvider'
import { useLanguageNavigation } from '@/components/layout/LanguageNavigationProvider'

export function ArticleLanguageNavigation({ paths }: { paths: LanguagePaths }) {
  const { setLanguagePaths } = useLanguageNavigation()

  useEffect(() => {
    setLanguagePaths(paths)
    return () => setLanguagePaths(null)
  }, [paths, setLanguagePaths])

  return null
}
