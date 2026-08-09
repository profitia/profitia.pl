import type { Metadata } from 'next'
import Link from 'next/link'
import { unstable_noStore as noStore } from 'next/cache'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import BlogArticlePage from '@/components/pages/BlogArticlePage'
import PublicShell from '@/components/layout/PublicShell'
import { findPublishedRelatedArticles } from '@/lib/articles/queries'
import { ADMIN_SESSION_COOKIE, verifyActiveAdminTokenValue } from '@/lib/auth'
import type { ArticleDetailData, ArticlePreviewData } from '@/lib/content/types'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Article preview',
  robots: { index: false, follow: false },
}

type Props = {
  params: Promise<{ id: string }>
}

const COPY = {
  pl: {
    back: 'Wróć do edytora',
    draft: 'Podgląd - artykuł nieopublikowany',
    legacy: 'Podgląd read-only - artykuł legacy używa istniejącego publicznego renderera',
    published: 'Podgląd - artykuł opublikowany',
  },
  en: {
    back: 'Back to editor',
    draft: 'Preview - unpublished article',
    legacy: 'Read-only preview - legacy article uses the existing public renderer',
    published: 'Preview - published article',
  },
} as const

export default async function ArticlePreviewPage({ params }: Props) {
  noStore()
  const cookieStore = await cookies()
  const session = await verifyActiveAdminTokenValue(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
  if (!session) redirect('/admin/login')

  const { id } = await params
  const row = await prisma.article.findUnique({ where: { id } })
  if (!row) notFound()

  const locale = row.locale === 'EN' ? 'en' : 'pl'
  const copy = COPY[locale]
  const related = await findPublishedRelatedArticles(row.relatedSlugs, locale === 'en' ? 'EN' : 'PL')
  const label = !row.locale
    ? copy.legacy
    : row.published ? copy.published : copy.draft

  return (
    <PublicShell articlePage locale={locale}>
      <div className="sticky top-0 z-[60] border-b border-amber-300 bg-amber-50 px-4 py-3 text-amber-950 shadow-sm">
        <div className="container-base flex flex-wrap items-center justify-between gap-3 text-sm">
          <strong>{label}</strong>
          <Link
            className="font-semibold underline decoration-amber-500 underline-offset-4 hover:text-brand-blue"
            href={`/admin/articles/${row.id}/edit`}
          >
            {copy.back}
          </Link>
        </div>
      </div>
      <BlogArticlePage
        article={row as ArticleDetailData}
        locale={locale}
        relatedArticles={related as ArticlePreviewData[]}
      />
    </PublicShell>
  )
}