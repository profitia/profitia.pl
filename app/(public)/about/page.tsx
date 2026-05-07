import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'O nas | Profitia',
  description:
    'Profitia to centrum kompetencji zakupowych dla liderów biznesu w Polsce. Doradztwo zakupowe, przygotowanie do negocjacji i analityka zakupowa od 2010 roku.',
  alternates: {
    canonical: 'https://www.profitia.pl/about',
    languages: {
      'pl': 'https://www.profitia.pl/about',
      'en': 'https://www.profitia.pl/en/about',
    },
  },
}

export default function AboutPagePL() {
  return <AboutPage locale="pl" />
}
