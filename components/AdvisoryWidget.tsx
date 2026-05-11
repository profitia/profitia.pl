'use client'

import { usePathname } from 'next/navigation'
import { AdvisoryAssistant } from '@/features/advisory-assistant/AdvisoryAssistant'
import { isValidLocale } from '@/lib/i18n'

export default function AdvisoryWidget() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const rawLocale = segments[0]
  const locale = isValidLocale(rawLocale) ? rawLocale : 'pl'

  return <AdvisoryAssistant locale={locale} />
}
