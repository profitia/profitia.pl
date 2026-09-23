import type { Metadata } from 'next'
import CareerListingPage from '@/components/pages/CareerListingPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('career:index', 'pl', {
  title: 'Praca i kariera',
  description:
    'Zacznij pracę w Profitia. Poznaj oferty pracy, zespół i proces rekrutacji w doradztwie zakupowym, analityce i negocjacjach.',
})

export default function Page() {
  return <CareerListingPage locale="pl" />
}