import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import type { ArticlePreviewData } from '@/lib/content/types'
import BlogListingPage from '@/components/pages/BlogListingPage'
import { preferLocalizedArticles, publishedArticlesForLocaleWhere } from '@/lib/articles/queries'

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

async function getArticles(): Promise<ArticlePreviewData[]> {
  const rows = await prisma.article.findMany({
    where: publishedArticlesForLocaleWhere('EN'),
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      locale: true,
      translationGroupId: true,
      title: true,
      excerpt: true,
      subtitle: true,
      category: true,
      readingTime: true,
      coverImage: true,
      coverImageAlt: true,
      featured: true,
      publishedAt: true,
      authorName: true,
      authorRole: true,
    },
  })
  return preferLocalizedArticles(rows, 'EN') as ArticlePreviewData[]
}

export default async function EnBlogPage() {
  const articles = await getArticles()
  return <BlogListingPage locale="en" articles={articles} />
}
