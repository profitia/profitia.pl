import type { Metadata } from 'next'
import CareerListingPage from '@/components/pages/CareerListingPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('career:index', 'pl', {
  title: 'Kariera | Profitia',
  description:
    'Praca w Profitia - środowisko dla osób, które chcą pracować na realnych problemach zakupowych. Analityka, negocjacje, doradztwo.',
})

export default function Page() {
  return <CareerListingPage locale="pl" />
}