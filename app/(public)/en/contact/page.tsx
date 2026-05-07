import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Profitia — procurement advisory, SpendGuru, CIPS training. We respond within one business day.',
  alternates: {
    canonical: 'https://www.profitia.pl/en/contact',
    languages: {
      pl: 'https://www.profitia.pl/contact',
      en: 'https://www.profitia.pl/en/contact',
    },
  },
}

export default function ContactRouteEN() {
  return <ContactPage locale="en" />
}
