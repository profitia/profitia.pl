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

  const articleEntries = buildArticleSitemapEntries(articles.flatMap((article) => (
    article.locale ? [{ ...article, locale: article.locale }] : []
  )))

  const siteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://profitia.pl'
  const staticEntries: MetadataRoute.Sitemap = [
    { url: new URL('/services', siteUrl).toString(), lastModified: new Date() },
    { url: new URL('/products', siteUrl).toString(), lastModified: new Date() },
    { url: new URL('/en/services', siteUrl).toString(), lastModified: new Date() },
    { url: new URL('/en/products', siteUrl).toString(), lastModified: new Date() },
  ]

  return [...staticEntries, ...articleEntries]
}