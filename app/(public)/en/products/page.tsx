import type { Metadata } from 'next'
import ProductsPage from '@/components/pages/ProductsPage'

export const metadata: Metadata = {
  title: 'Products | Profitia',
  description:
    'Rent an Expert / Buyer and SPOT Check - Profitia products supporting savings, sourcing, organisation, processes, tools and procurement maturity assessment.',
}

export default function Page() {
  return <ProductsPage locale="en" />
}