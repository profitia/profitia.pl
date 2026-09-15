import type { Metadata } from 'next'
import { buildPublicMetadata } from '@/lib/routing/public-seo'

export const metadata: Metadata = buildPublicMetadata('cookies', 'pl', {
  title: 'Polityka cookies | Profitia',
})

export { default } from '../cookies/page'