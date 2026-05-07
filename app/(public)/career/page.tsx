import type { Metadata } from 'next'
import CareerListingPage from '@/components/pages/CareerListingPage'

export const metadata: Metadata = {
  title: 'Kariera | Profitia',
  description:
    'Praca w Profitia — środowisko dla osób, które chcą pracować na realnych problemach zakupowych. Analityka, negocjacje, doradztwo.',
}

export default function Page() {
  return <CareerListingPage locale="pl" />
}
