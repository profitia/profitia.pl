'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { LanguagePaths } from '@/lib/articles/language-navigation'

export type { LanguagePaths } from '@/lib/articles/language-navigation'

type LanguageNavigationContextValue = {
  languagePaths: LanguagePaths | null
  setLanguagePaths: (paths: LanguagePaths | null) => void
}

const LanguageNavigationContext = createContext<LanguageNavigationContextValue | null>(null)

export function LanguageNavigationProvider({ children }: { children: React.ReactNode }) {
  const [languagePaths, setLanguagePaths] = useState<LanguagePaths | null>(null)
  const value = useMemo(() => ({ languagePaths, setLanguagePaths }), [languagePaths])

  return (
    <LanguageNavigationContext.Provider value={value}>
      {children}
    </LanguageNavigationContext.Provider>
  )
}

export function useLanguageNavigation(): LanguageNavigationContextValue {
  const context = useContext(LanguageNavigationContext)
  if (!context) {
    throw new Error('useLanguageNavigation must be used within LanguageNavigationProvider')
  }
  return context
}
