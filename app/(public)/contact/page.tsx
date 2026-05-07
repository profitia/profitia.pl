import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/ContactPage'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Skontaktuj się z Profitia - doradztwo zakupowe, SpendGuru, szkolenia CIPS. Odpowiadamy w ciągu jednego dnia roboczego.',
  alternates: {
    canonical: 'https://www.profitia.pl/contact',
    languages: {
      pl: 'https://www.profitia.pl/contact',
      en: 'https://www.profitia.pl/en/contact',
    },
  },
}

export default function ContactRoute() {
  return <ContactPage locale="pl" />
}
