import type { Metadata } from 'next'
import HomePageContent from '@/components/pages/HomePageContent'
import { getDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Oryginalna strona główna - archiwum',
  description: 'Zachowana wersja strony głównej Profitia sprzed wdrożenia wariantu V1.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default async function OriginalHomePageDraft() {
  const dict = await getDictionary('pl')

  return <HomePageContent dict={dict} locale="pl" variant="original" />
}
