import type { MetadataRoute } from 'next'
import { buildArticleSitemapEntries, getSiteUrl } from '@/lib/articles/article-seo'
import { prisma } from '@/lib/prisma'
import { getIndexablePublicPaths } from '@/lib/routing/public-routes'

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

  const articleEntries = buildArticleSitemapEntries(articles.flatMap((article) => (
    article.locale ? [{ ...article, locale: article.locale }] : []
  )))

  const siteUrl = getSiteUrl()
  const staticEntries: MetadataRoute.Sitemap = getIndexablePublicPaths().map(({ path }) => ({
    url: new URL(path, `${siteUrl}/`).toString(),
    lastModified: new Date(),
  }))

  return [...staticEntries, ...articleEntries]
}