import type { Metadata } from 'next'
import EducationPage from '@/components/pages/EducationPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('education:index', 'en', {
  title: 'Procurement Training',
  description:
    'Profitia procurement training: negotiation workshops, development programmes and CIPS qualifications. Build practical skills across your team.',
})

export default function Page() {
  return <EducationPage locale="en" />
}
