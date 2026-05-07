import type { Metadata } from 'next'
import EducationPage from '@/components/pages/EducationPage'

export const metadata: Metadata = {
  title: 'Edukacja | Profitia',
  description:
    'Programy executive, warsztaty negocjacyjne i szkolenia zakupowe. Rozwijamy kompetencje zakupowe poprzez praktyczną edukację opartą na realnych negocjacjach.',
}

export default function Page() {
  return <EducationPage locale="pl" />
}
