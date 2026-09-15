import type { Metadata } from 'next'
import SpotAnalysisPage from '@/components/pages/SpotAnalysisPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('service:analiza-spot', 'pl', {
  title: 'Analiza dojrzałości zakupów SPOT | Profitia',
  description:
    'SPOT to diagnoza dojrzałości funkcji zakupowej, która wskazuje luki, priorytety działań i kierunek dalszej transformacji zakupów.',
})

export default function Page() {
  return <SpotAnalysisPage locale="pl" />
}