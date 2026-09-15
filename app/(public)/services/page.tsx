import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('services:index', 'pl', {
  title: 'Usługi | Profitia',
  description:
    'Doradztwo zakupowe, negocjacje, analityka spend i transformacja funkcji zakupowej. Advisory capabilities dla organizacji budujących trwałą przewagę kosztową.',
})

export default function Page() {
  return <ServicesPage locale="pl" />
}
