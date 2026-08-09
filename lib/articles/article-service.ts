import { randomUUID } from 'node:crypto'
import type { Article } from '@prisma/client'
import { ArticleLocale, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createTranslationGroupId } from './queries'
import { sanitizeArticleHtml } from './article-content'
import {
  publishableArticleSchema,
  type CreateArticleDraftInput,
  type UpdateArticleDraftInput,
} from './article-validation'

export type ArticleServiceErrorCode =
  | 'ARTICLE_NOT_FOUND'
  | 'LEGACY_ARTICLE'
  | 'SLUG_CONFLICT'
  | 'SLUG_LOCKED'
  | 'FEATURED_CONFLICT'
  | 'TRANSLATION_EXISTS'
  | 'INVALID_TRANSLATION_LOCALE'

export class ArticleServiceError extends Error {
  constructor(
    public readonly code: ArticleServiceErrorCode,
    message: string,
  ) {
    super(message)
    this.name = 'ArticleServiceError'
  }
}

function isUniqueConstraintError(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}

async function assertSlugAvailable(locale: ArticleLocale, slug: string, excludeId?: string) {
  const existing = await prisma.article.findFirst({
    where: {
      slug,
      id: excludeId ? { not: excludeId } : undefined,
      OR: [{ locale }, { locale: null }],
    },
    select: { id: true },
  })

  if (existing) {
    throw new ArticleServiceError('SLUG_CONFLICT', 'Slug already exists for this language')
  }
}

async function assertFeaturedAvailable(locale: ArticleLocale, featured: boolean, excludeId?: string) {
  if (!featured) return

  const existing = await prisma.article.findFirst({
    where: {
      featured: true,
      id: excludeId ? { not: excludeId } : undefined,
      OR: [{ locale }, { locale: null }],
    },
    select: { id: true },
  })
  if (existing) {
    throw new ArticleServiceError(
      'FEATURED_CONFLICT',
      'This language already has a featured article',
    )
  }
}

type CmsArticle = Article & { locale: ArticleLocale; translationGroupId: string }

async function getCmsArticle(id: string): Promise<CmsArticle> {
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) {
    throw new ArticleServiceError('ARTICLE_NOT_FOUND', 'Article not found')
  }
  if (!article.locale || !article.translationGroupId) {
    throw new ArticleServiceError(
      'LEGACY_ARTICLE',
      'This legacy article is not managed by the localized CMS workflow',
    )
  }
  return article as CmsArticle
}

export async function createArticleDraft(input: CreateArticleDraftInput) {
  await assertSlugAvailable(input.locale, input.slug)
  await assertFeaturedAvailable(input.locale, input.featured)

  const translationGroupId = input.translationGroupId ?? createTranslationGroupId()
  if (input.translationGroupId) {
    const group = await prisma.article.findFirst({
      where: { translationGroupId },
      select: { id: true },
    })
    if (!group) {
      throw new ArticleServiceError('ARTICLE_NOT_FOUND', 'Translation group not found')
    }
  }

  try {
    return await prisma.article.create({
      data: {
        ...input,
        content: sanitizeArticleHtml(input.content),
        translationGroupId,
        published: false,
      },
    })
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new ArticleServiceError('TRANSLATION_EXISTS', 'Translation already exists')
    }
    throw error
  }
}

export async function updateArticleDraft(id: string, input: UpdateArticleDraftInput) {
  const article = await getCmsArticle(id)
  if (article.published && input.slug !== article.slug) {
    throw new ArticleServiceError('SLUG_LOCKED', 'Slug cannot be changed after publication')
  }

  await assertSlugAvailable(article.locale, input.slug, article.id)
  await assertFeaturedAvailable(article.locale, input.featured, article.id)
  return prisma.article.update({
    where: { id },
    data: { ...input, content: sanitizeArticleHtml(input.content) },
  })
}

export async function publishArticle(id: string) {
  const article = await getCmsArticle(id)
  publishableArticleSchema.parse(article)

  return prisma.article.update({
    where: { id },
    data: {
      published: true,
      publishedAt: article.publishedAt ?? new Date(),
    },
  })
}

export async function unpublishArticle(id: string) {
  await getCmsArticle(id)
  return prisma.article.update({ where: { id }, data: { published: false } })
}

export async function createTranslation(id: string, locale: ArticleLocale) {
  const source = await getCmsArticle(id)
  if (source.locale === locale) {
    throw new ArticleServiceError(
      'INVALID_TRANSLATION_LOCALE',
      'Choose the other language for the translation',
    )
  }

  const existing = await prisma.article.findFirst({
    where: { translationGroupId: source.translationGroupId, locale },
    select: { id: true },
  })
  if (existing) {
    throw new ArticleServiceError('TRANSLATION_EXISTS', 'Translation already exists')
  }

  const draftId = randomUUID()
  const title = locale === ArticleLocale.PL ? 'Nowy artykuł' : 'New article'

  return prisma.article.create({
    data: {
      locale,
      translationGroupId: source.translationGroupId,
      title,
      slug: `draft-${draftId}`,
      content: sanitizeArticleHtml(''),
      published: false,
    },
  })
}