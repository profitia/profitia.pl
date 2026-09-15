import type { Metadata } from 'next'
import SpotAnalysisPage from '@/components/pages/SpotAnalysisPage'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('service:analiza-spot', 'en', {
  title: 'SPOT Procurement Maturity Assessment | Profitia',
  description:
    'SPOT is a procurement maturity assessment that identifies gaps, action priorities and the next transformation steps for the procurement function.',
})

export default function Page() {
  return <SpotAnalysisPage locale="en" />
}