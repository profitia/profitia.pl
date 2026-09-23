import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('services:index', 'pl', {
  title: 'Doradztwo zakupowe',
  description:
    'Doradztwo zakupowe Profitia: negocjacje, analityka wydatków i transformacja zakupów. Poznaj usługi doradcze dla firm.',
})

export default function Page() {
  return <ServicesPage locale="pl" />
}