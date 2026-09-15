import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('contact', 'pl', {
  title: 'Kontakt',
  description:
    'Skontaktuj się z Profitia - doradztwo zakupowe, SpendGuru, szkolenia CIPS. Odpowiadamy w ciągu jednego dnia roboczego.',
})

export default function ContactRouteLocalized() {
  return <ContactPage locale="pl" />
}