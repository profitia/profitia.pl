import type { Metadata } from 'next'
import CareerListingPage from '@/components/pages/CareerListingPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('career:index', 'en', {
  title: 'Career | Profitia',
  description:
    'Working at Profitia - a professional environment for people who want to work on real procurement problems. Analytics, negotiations, advisory.',
})

export default function Page() {
  return <CareerListingPage locale="en" />
}
