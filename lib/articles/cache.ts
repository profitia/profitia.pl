import { ArticleLocale } from '@prisma/client'
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import type { ArticlePreviewData } from '@/lib/content/types'
import { prisma } from '@/lib/prisma'
import { preferLocalizedArticles, publishedArticlesForLocaleWhere } from './queries'

export const ARTICLE_LIST_CACHE_TAG = 'published-article-listings'
export const ARTICLE_LIST_REVALIDATE_SECONDS = 300

const articlePreviewSelect = {
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
} as const

function createCachedArticleListing(locale: ArticleLocale) {
  return unstable_cache(
    async (): Promise<ArticlePreviewData[]> => {
      const rows = await prisma.article.findMany({
        where: publishedArticlesForLocaleWhere(locale),
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
        select: articlePreviewSelect,
      })

      return preferLocalizedArticles(rows, locale) as ArticlePreviewData[]
    },
    [`published-article-listing-${locale.toLowerCase()}`],
    {
      revalidate: ARTICLE_LIST_REVALIDATE_SECONDS,
      tags: [ARTICLE_LIST_CACHE_TAG],
    }
  )
}

export const getPublishedPolishArticles = createCachedArticleListing(ArticleLocale.PL)
export const getPublishedEnglishArticles = createCachedArticleListing(ArticleLocale.EN)

export function revalidatePublishedArticlePages() {
  revalidateTag(ARTICLE_LIST_CACHE_TAG)
  revalidatePath('/blog')
  revalidatePath('/en/blog')
  revalidatePath('/sitemap.xml')
}
