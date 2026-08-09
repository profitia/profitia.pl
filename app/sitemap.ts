import type { MetadataRoute } from 'next'
import { buildArticleSitemapEntries } from '@/lib/articles/article-seo'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    where: {
      published: true,
      locale: { not: null },
      translationGroupId: { not: null },
    },
    select: {
      locale: true,
      translationGroupId: true,
      slug: true,
      published: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
  })

  return buildArticleSitemapEntries(articles.flatMap((article) => (
    article.locale ? [{ ...article, locale: article.locale }] : []
  )))
}