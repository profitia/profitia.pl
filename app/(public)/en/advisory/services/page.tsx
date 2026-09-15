import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('services:index', 'en', {
  title: 'Services | Profitia',
  description:
    'Procurement advisory, negotiations, spend analytics and procurement transformation. Advisory capabilities for organisations building lasting cost advantage.',
})

export default function Page() {
  return <ServicesPage locale="en" />
}