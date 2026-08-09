import type { ArticleLocale } from '@prisma/client'
import type { Metadata, MetadataRoute } from 'next'

const DEFAULT_SITE_URL = 'https://profitia.pl'

export type SeoArticle = {
  locale: ArticleLocale
  translationGroupId: string | null
  slug: string
  title: string
  excerpt: string | null
  metaTitle: string | null
  metaDescription: string | null
  coverImage: string | null
  coverImageAlt: string | null
  authorName?: string | null
  published: boolean
  publishedAt: Date | null
  updatedAt: Date
}

type TranslationSibling = Pick<
  SeoArticle,
  'locale' | 'translationGroupId' | 'slug' | 'published'
>

function nonEmpty(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim()
  return trimmed || undefined
}

export function getSiteUrl(): string {
  const configured = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL
  if (configured) {
    try {
      const url = new URL(configured)
      if (url.protocol === 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') {
        return url.toString().replace(/\/$/, '')
      }
    } catch {
      // Fall through to the canonical production URL.
    }
  }
  return DEFAULT_SITE_URL
}

export function getArticlePath(locale: ArticleLocale, slug: string): string {
  return locale === 'EN' ? `/en/blog/${slug}` : `/blog/${slug}`
}

export function getArticleCanonical(locale: ArticleLocale, slug: string): string {
  return new URL(getArticlePath(locale, slug), `${getSiteUrl()}/`).toString()
}

export function getAbsoluteArticleImage(image: string | null): string | undefined {
  const value = nonEmpty(image)
  if (!value) return undefined
  try {
    return new URL(value, `${getSiteUrl()}/`).toString()
  } catch {
    return undefined
  }
}

export function getArticleSeoTitle(article: Pick<SeoArticle, 'metaTitle' | 'title'>): string {
  return nonEmpty(article.metaTitle) ?? article.title
}

export function getArticleSeoDescription(
  article: Pick<SeoArticle, 'metaDescription' | 'excerpt'>,
): string | undefined {
  return nonEmpty(article.metaDescription) ?? nonEmpty(article.excerpt)
}

export function getArticleAlternates(
  article: Pick<SeoArticle, 'locale' | 'translationGroupId' | 'slug'>,
  sibling: TranslationSibling | null,
): Record<'pl' | 'en', string> | undefined {
  if (
    !sibling?.published
    || !article.translationGroupId
    || sibling.locale === article.locale
    || sibling.translationGroupId !== article.translationGroupId
  ) {
    return undefined
  }

  const pl = article.locale === 'PL' ? article : sibling
  const en = article.locale === 'EN' ? article : sibling
  return {
    pl: getArticleCanonical('PL', pl.slug),
    en: getArticleCanonical('EN', en.slug),
  }
}

export function buildArticleMetadata(
  article: SeoArticle,
  sibling: TranslationSibling | null,
): Metadata {
  const title = getArticleSeoTitle(article)
  const description = getArticleSeoDescription(article)
  const canonical = getArticleCanonical(article.locale, article.slug)
  const languages = getArticleAlternates(article, sibling)
  const image = getAbsoluteArticleImage(article.coverImage)

  return {
    title,
    ...(description && { description }),
    alternates: {
      canonical,
      ...(languages && { languages }),
    },
    openGraph: {
      type: 'article',
      title,
      url: canonical,
      ...(description && { description }),
      ...(article.publishedAt && { publishedTime: article.publishedAt.toISOString() }),
      modifiedTime: article.updatedAt.toISOString(),
      ...(nonEmpty(article.authorName) && { authors: [nonEmpty(article.authorName)!] }),
      ...(image && {
        images: [{
          url: image,
          ...(nonEmpty(article.coverImageAlt) && { alt: nonEmpty(article.coverImageAlt) }),
        }],
      }),
    },
  }
}

export function buildArticleJsonLd(article: SeoArticle): Record<string, unknown> | null {
  if (!article.published || !article.publishedAt) return null

  const description = getArticleSeoDescription(article)
  const image = getAbsoluteArticleImage(article.coverImage)
  const canonical = getArticleCanonical(article.locale, article.slug)
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    ...(description && { description }),
    ...(image && { image }),
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  }
}

export function serializeJsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

type SitemapArticle = Pick<
  SeoArticle,
  'locale' | 'translationGroupId' | 'slug' | 'published' | 'updatedAt'
>

export function buildArticleSitemapEntries(rows: SitemapArticle[]): MetadataRoute.Sitemap {
  return rows.flatMap((article) => {
    if (!article.published || !article.translationGroupId) return []
    return [{
      url: getArticleCanonical(article.locale, article.slug),
      lastModified: article.updatedAt,
    }]
  })
}