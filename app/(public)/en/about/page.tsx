import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'

export const metadata: Metadata = {
  title: 'About | Profitia',
  description:
    'Profitia is the procurement competence hub for business leaders in Poland. Procurement advisory, negotiation preparation and spend analytics since 2010.',
  alternates: {
    canonical: 'https://www.profitia.pl/en/about',
    languages: {
      'pl': 'https://www.profitia.pl/about',
      'en': 'https://www.profitia.pl/en/about',
    },
  },
}

export default function AboutPageEN() {
  return <AboutPage locale="en" />
}
