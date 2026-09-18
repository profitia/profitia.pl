import type { Metadata } from 'next'
import BlogListingPage from '@/components/pages/BlogListingPage'
import { getPublishedEnglishArticles } from '@/lib/articles/cache'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Procurement Intelligence | Profitia',
  description:
    'Analysis, strategy and intelligence for procurement, cost and negotiation leaders.',
  alternates: {
    canonical: 'https://profitia.pl/en/blog',
    languages: { pl: 'https://profitia.pl/blog' },
  },
  openGraph: {
    title: 'Procurement Intelligence | Profitia',
    description: 'Procurement analysis, negotiation strategy and supplier market intelligence.',
    type: 'website',
  },
}

export default async function EnBlogPage() {
  const articles = await getPublishedEnglishArticles()
  return <BlogListingPage locale="en" articles={articles} />
}
