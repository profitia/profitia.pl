import { randomUUID } from 'node:crypto'
import type { Article, ArticleLocale, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export const ARTICLE_LOCALES = ['PL', 'EN'] as const satisfies readonly ArticleLocale[]

export function createTranslationGroupId(): string {
  return randomUUID()
}

export async function findPublishedArticleBySlug(
  slug: string,
  locale: ArticleLocale,
): Promise<Article | null> {
  const localized = await prisma.article.findFirst({
    where: { slug, locale, published: true },
  })

  if (localized) {
    return localized
  }

  return prisma.article.findFirst({
    where: { slug, locale: null, published: true },
  })
}

export async function findPublishedTranslationSibling(
  article: Pick<Article, 'id' | 'locale' | 'translationGroupId'>,
  targetLocale: ArticleLocale,
): Promise<{
  locale: ArticleLocale
  translationGroupId: string
  slug: string
  published: true
} | null> {
  if (!article.locale || !article.translationGroupId || article.locale === targetLocale) {
    return null
  }

  const sibling = await prisma.article.findFirst({
    where: {
      id: { not: article.id },
      locale: targetLocale,
      translationGroupId: article.translationGroupId,
      published: true,
    },
    select: { locale: true, translationGroupId: true, slug: true, published: true },
  })

  if (!sibling?.locale || !sibling.translationGroupId || !sibling.published) {
    return null
  }

  return { ...sibling, locale: sibling.locale, translationGroupId: sibling.translationGroupId, published: true }
}

export function publishedArticlesForLocaleWhere(
  locale: ArticleLocale,
): Prisma.ArticleWhereInput {
  return {
    published: true,
    OR: [{ locale }, { locale: null }],
  }
}

export function preferLocalizedArticles<T extends Pick<Article, 'slug' | 'locale'>>(
  rows: T[],
  locale: ArticleLocale,
): T[] {
  const bySlug = new Map<string, T>()
  for (const row of rows) {
    const existing = bySlug.get(row.slug)
    if (!existing || (existing.locale === null && row.locale === locale)) {
      bySlug.set(row.slug, row)
    }
  }
  return Array.from(bySlug.values())
}

export async function findPublishedRelatedArticles(
  slugs: string[],
  locale: ArticleLocale,
): Promise<Article[]> {
  if (slugs.length === 0) {
    return []
  }

  const rows = await prisma.article.findMany({
    where: {
      slug: { in: slugs },
      published: true,
      OR: [{ locale }, { locale: null }],
    },
  })

  const bySlug = new Map(preferLocalizedArticles(rows, locale).map((row) => [row.slug, row]))

  return slugs.flatMap((slug) => {
    const article = bySlug.get(slug)
    return article ? [article] : []
  })
}

export async function findPublishedArticleNeighbors(
  articleId: string,
  locale: ArticleLocale,
): Promise<{
  previous: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}> {
  const rows = await prisma.article.findMany({
    where: publishedArticlesForLocaleWhere(locale),
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      locale: true,
      title: true,
    },
  })

  const articles = preferLocalizedArticles(rows, locale)
  const currentIndex = articles.findIndex((article) => article.id === articleId)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  const olderArticle = articles[currentIndex + 1]
  const newerArticle = articles[currentIndex - 1]

  return {
    previous: olderArticle ? { slug: olderArticle.slug, title: olderArticle.title } : null,
    next: newerArticle ? { slug: newerArticle.slug, title: newerArticle.title } : null,
  }
}
