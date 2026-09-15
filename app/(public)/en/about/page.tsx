import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/AboutPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('about', 'en', {
  title: 'About | Profitia',
  description:
    'Profitia is the procurement competence hub for business leaders in Poland. Procurement advisory, negotiation preparation and spend analytics since 2010.',
})

export default function AboutPageEN() {
  return <AboutPage locale="en" />
}
