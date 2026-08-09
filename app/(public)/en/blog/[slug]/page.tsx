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
  const article = await findPublishedArticleBySlug(slug, 'EN')
  if (!article) return { title: 'Not Found' }

  const sibling = article.locale
    ? await findPublishedTranslationSibling(article, 'PL')
    : null
  return buildArticleMetadata({ ...article, locale: 'EN' }, sibling)
}

async function getRelated(slugs: string[]): Promise<ArticlePreviewData[]> {
  const rows = await findPublishedRelatedArticles(slugs, 'EN')
  return rows as ArticlePreviewData[]
}

export default async function EnArticlePage({ params }: Props) {
  const { slug } = await params
  const row = await findPublishedArticleBySlug(slug, 'EN')
  if (!row) notFound()
  const article = row as ArticleDetailData

  const [related, sibling] = await Promise.all([
    getRelated(article.relatedSlugs ?? []),
    article.locale ? findPublishedTranslationSibling(article, 'PL') : null,
  ])
  const languagePaths = article.locale
    ? { en: `/en/blog/${article.slug}`, ...(sibling && { pl: `/blog/${sibling.slug}` }) }
    : undefined
  const jsonLd = buildArticleJsonLd({ ...row, locale: 'EN' })

  return (
    <>
      {jsonLd ? (
        <script
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
          type="application/ld+json"
        />
      ) : null}
      <BlogArticlePage locale="en" article={article} relatedArticles={related} languagePaths={languagePaths} />
    </>
  )
}
