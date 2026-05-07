import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'

export const metadata: Metadata = {
  title: 'Services | Profitia',
  description:
    'Procurement advisory, negotiations, spend analytics and procurement transformation. Advisory capabilities for organisations building lasting cost advantage.',
}

export default function Page() {
  return <ServicesPage locale="en" />
}
