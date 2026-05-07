import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { ArticleDetailData, ArticlePreviewData } from '@/lib/content/types'
import {
  ArticleHero,
  ArticleLayout,
  ArticleAuthor,
  ArticleNewsletter,
  ArticleRelated,
  ReadingProgress,
} from '@/components/blog'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      title: true,
      metaTitle: true,
      metaDescription: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      authorName: true,
      category: true,
    },
  })
  if (!article) return { title: 'Not Found' }

  const title = article.metaTitle ?? article.title
  const description = article.metaDescription ?? article.excerpt ?? undefined

  return {
    title,
    description,
    alternates: {
      canonical: `https://profitia.pl/blog/${slug}`,
      languages: { en: `https://profitia.pl/en/blog/${slug}` },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      ...(article.publishedAt && { publishedTime: new Date(article.publishedAt as Date | string).toISOString() }),
      ...(article.authorName && { authors: [article.authorName] }),
      ...(article.coverImage && { images: [article.coverImage] }),
    },
  }
}

async function getArticle(slug: string): Promise<ArticleDetailData | null> {
  const row = await prisma.article.findFirst({
    where: { slug, published: true },
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
      content: true,
      authorBio: true,
      relatedSlugs: true,
      metaTitle: true,
      metaDescription: true,
    },
  })
  if (!row) return null
  return row as ArticleDetailData
}

async function getRelated(slugs: string[]): Promise<ArticlePreviewData[]> {
  if (slugs.length === 0) return []
  const rows = await prisma.article.findMany({
    where: { slug: { in: slugs }, published: true },
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = await getRelated(article.relatedSlugs ?? [])
  const locale = 'pl' as const

  return (
    <>
      {/* Reading progress - fixed top bar, client-side */}
      <ReadingProgress />

      {/* Article hero - category, time, date, title, subtitle, author, image */}
      <ArticleHero article={article} locale={locale} />

      {/* Two-column: sticky TOC sidebar + editorial content (client) */}
      <ArticleLayout content={article.content} />

      {/* Author bio */}
      <ArticleAuthor article={article} locale={locale} />

      {/* Newsletter subscription */}
      <ArticleNewsletter locale={locale} />

      {/* Related articles */}
      <ArticleRelated articles={related} locale={locale} />
    </>
  )
}
