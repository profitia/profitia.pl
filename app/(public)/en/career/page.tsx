import type { Metadata } from 'next'
import CareerListingPage from '@/components/pages/CareerListingPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('career:index', 'en', {
  title: 'Careers',
  description:
    'Start your career at Profitia. Explore open roles, our team and recruitment process in procurement advisory, analytics and negotiations.',
})

export default function Page() {
  return <CareerListingPage locale="en" />
}
