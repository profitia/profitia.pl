import type { Metadata } from 'next'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('privacy', 'pl', {
  title: 'Polityka prywatności | Profitia',
})

export { default } from '../privacy/page'