import type { Metadata } from 'next'
import ProductsPage from '@/components/pages/ProductsPage'

export const metadata: Metadata = {
  title: 'Produkty | Profitia',
  description:
    'Rent an Expert / Buyer i SPOT Check - produkty Profitia wspierające oszczędności, sourcing, organizację, procesy, narzędzia oraz diagnozę dojrzałości funkcji zakupowej.',
}

export default function Page() {
  return <ProductsPage locale="pl" />
}