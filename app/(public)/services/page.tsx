import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Usługi | Profitia',
  description:
    'Doradztwo zakupowe, negocjacje, analityka spend i transformacja funkcji zakupowej. Advisory capabilities dla organizacji budujących trwałą przewagę kosztową.',
}

export default function Page() {
  return <ServicesPage locale="pl" />
}
