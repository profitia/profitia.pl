import type { Metadata } from 'next'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('terms', 'pl', {
  title: 'Regulamin | Profitia',
})

export { default } from '../terms/page'