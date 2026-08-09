import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ArticleDetailData, ArticlePreviewData } from '@/lib/content/types'
import BlogArticlePage from '@/components/pages/BlogArticlePage'
import {
  findPublishedArticleBySlug,
  findPublishedRelatedArticles,
  findPublishedTranslationSibling,
} from '@/lib/articles/queries'
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  serializeJsonLd,
} from '@/lib/articles/article-seo'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await findPublishedArticleBySlug(slug, 'PL')
  if (!article) return { title: 'Not Found' }

  const sibling = article.locale
    ? await findPublishedTranslationSibling(article, 'EN')
    : null
  return buildArticleMetadata({ ...article, locale: 'PL' }, sibling)
}

async function getRelated(slugs: string[]): Promise<ArticlePreviewData[]> {
  const rows = await findPublishedRelatedArticles(slugs, 'PL')
  return rows as ArticlePreviewData[]
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const row = await findPublishedArticleBySlug(slug, 'PL')
  if (!row) notFound()
  const article = row as ArticleDetailData

  const [related, sibling] = await Promise.all([
    getRelated(article.relatedSlugs ?? []),
    article.locale ? findPublishedTranslationSibling(article, 'EN') : null,
  ])
  const languagePaths = article.locale
    ? { pl: `/blog/${article.slug}`, ...(sibling && { en: `/en/blog/${sibling.slug}` }) }
    : undefined
  const jsonLd = buildArticleJsonLd({ ...row, locale: 'PL' })

  return (
    <>
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          type="application/ld+json"
        />
      ) : null}
      <BlogArticlePage locale="pl" article={article} relatedArticles={related} languagePaths={languagePaths} />
    </>
  )
}
