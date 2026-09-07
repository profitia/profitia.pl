import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services | Profitia',
  description:
    'Profitia service catalogue organised by domain, product and expandable scope of support. No separate product pages.',
}

export default function Page() {
  return <ServicesPage locale="en" />
}
