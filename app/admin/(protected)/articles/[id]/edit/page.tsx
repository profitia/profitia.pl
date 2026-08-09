import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'
import Button from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Edycja artykułu' }

type Props = { params: Promise<{ id: string }> }

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  if (!article.locale || !article.translationGroupId) {
    return (
      <div className="max-w-2xl rounded-lg bg-white p-8 shadow-sm">
        <span className="mb-4 inline-flex rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">LEGACY</span>
        <h1 className="mb-3 text-2xl font-heading font-bold text-brand-primary">{article.title}</h1>
        <p className="mb-6 text-gray-600">
          This is a legacy article and is not managed by the localized CMS workflow.
        </p>
        <Button href="/admin/articles" variant="secondary">Wróć do listy</Button>
      </div>
    )
  }

  const sibling = await prisma.article.findFirst({
    where: {
      translationGroupId: article.translationGroupId,
      locale: article.locale === 'PL' ? 'EN' : 'PL',
    },
    select: { id: true, locale: true },
  })
  const localizedSibling = sibling?.locale
    ? { id: sibling.id, locale: sibling.locale }
    : null

  return (
    <ArticleForm
      mode="edit"
      sibling={localizedSibling}
      initialValue={{
        id: article.id,
        locale: article.locale,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? '',
        content: article.content,
        published: article.published,
        publishedAt: article.publishedAt?.toISOString() ?? '',
        metaTitle: article.metaTitle ?? '',
        metaDescription: article.metaDescription ?? '',
        category: article.category ?? '',
        readingTime: article.readingTime?.toString() ?? '',
        coverImage: article.coverImage ?? '',
        coverImageAlt: article.coverImageAlt ?? '',
        coverMediaId: article.coverMediaId ?? '',
        featured: article.featured,
      }}
    />
  )
}