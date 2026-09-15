import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('about', 'pl', {
  title: 'O nas | Profitia',
  description:
    'Profitia to centrum kompetencji zakupowych dla liderów biznesu w Polsce. Doradztwo zakupowe, przygotowanie do negocjacji i analityka zakupowa od 2010 roku.',
})

export default function AboutPagePL() {
  return <AboutPage locale="pl" />
}
