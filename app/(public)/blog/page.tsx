import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import type { ArticlePreviewData } from '@/lib/content/types'
import BlogListingPage from '@/components/pages/BlogListingPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Inteligencja zakupowa | Profitia',
  description:
    'Analizy, strategie i inteligencja dla osób odpowiedzialnych za zakupy, koszty i negocjacje.',
  alternates: {
    canonical: 'https://profitia.pl/blog',
    languages: { en: 'https://profitia.pl/en/blog' },
  },
  openGraph: {
    title: 'Inteligencja zakupowa | Profitia',
    description:
      'Analizy zakupowe, strategie negocjacyjne i inteligencja rynkowa od Profitia.',
    type: 'website',
  },
}

async function getArticles(): Promise<ArticlePreviewData[]> {
  const rows = await prisma.article.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      subtitle: true,
      category: true,
      readingTime: true,
      coverImage: true,
      featured: true,
      publishedAt: true,
      authorName: true,
      authorRole: true,
    },
  })
  return rows as ArticlePreviewData[]
}

export default async function BlogPage() {
  const articles = await getArticles()
  return <BlogListingPage locale="pl" articles={articles} />
}
