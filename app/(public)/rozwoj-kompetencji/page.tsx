import type { Metadata } from 'next'
import EducationPage from '@/components/pages/EducationPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('education:index', 'pl', {
  title: 'Szkolenia zakupowe',
  description:
    'Szkolenia zakupowe Profitia: warsztaty negocjacyjne, programy rozwojowe i certyfikacja CIPS. Rozwijaj kompetencje zespołu w praktyce.',
})

export default function Page() {
  return <EducationPage locale="pl" />
}