import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('contact', 'en', {
  title: 'Contact',
  description:
    'Contact Profitia - procurement advisory, SpendGuru, CIPS training. We respond within one business day.',
})

export default function ContactRouteEN() {
  return <ContactPage locale="en" />
}
