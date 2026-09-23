import type { Metadata } from 'next'
import ServicesPage from '@/components/pages/ServicesPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('services:index', 'en', {
  title: 'Procurement Advisory',
  description:
    'Profitia procurement advisory: negotiations, spend analytics and procurement transformation. Explore our advisory services for businesses.',
})

export default function Page() {
  return <ServicesPage locale="en" />
}