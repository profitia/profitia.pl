import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Usługi | Profitia',
  description:
    'Katalog usług Profitia z podziałem na domeny, produkty i rozwijane zakresy wsparcia. Bez osobnych stron produktowych.',
}

export default function Page() {
  return <ServicesPage locale="pl" />
}
