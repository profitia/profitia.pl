import type { Metadata } from 'next'
import EducationPage from '@/components/pages/EducationPage'

export const metadata: Metadata = {
  title: 'Education | Profitia',
  description:
    'Executive programmes, negotiation workshops and procurement training. We develop procurement capabilities through practical, negotiation-based learning.',
}

export default function Page() {
  return <EducationPage locale="en" />
}
