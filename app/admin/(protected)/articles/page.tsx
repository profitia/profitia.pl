import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import ArticleRowActions from '@/components/admin/ArticleRowActions'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Artykuły' }

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      locale: true,
      translationGroupId: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
    },
  })

  const localesByGroup = new Map<string, Set<'PL' | 'EN'>>()
  for (const article of articles) {
    if (!article.locale || !article.translationGroupId) continue
    const locales = localesByGroup.get(article.translationGroupId) ?? new Set<'PL' | 'EN'>()
    locales.add(article.locale)
    localesByGroup.set(article.translationGroupId, locales)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-brand-primary">Artykuły</h1>
        <Button href="/admin/articles/new">
          + Nowy artykuł
        </Button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Tytuł</th>
              <th className="px-6 py-3 text-left">Type / Language</th>
              <th className="px-6 py-3 text-left">Translation</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Published</th>
              <th className="px-6 py-3 text-left">Updated</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  Brak artykułów
                </td>
              </tr>
            )}
            {articles.map((article) => {
              const locale = article.locale
              const translationGroupId = article.translationGroupId
              const legacy = locale === null || translationGroupId === null
              let missingLocale: 'PL' | 'EN' | null = null
              if (locale && translationGroupId) {
                missingLocale = locale === 'PL'
                  ? localesByGroup.get(translationGroupId)?.has('EN') ? null : 'EN'
                  : localesByGroup.get(translationGroupId)?.has('PL') ? null : 'PL'
              }
              const translation = legacy
                ? 'N/A'
                : missingLocale
                  ? `Missing ${missingLocale}`
                  : `${locale === 'PL' ? 'EN' : 'PL'} available`

              return <tr key={article.id}>
                <td className="max-w-sm px-6 py-4 font-medium">{article.title}</td>
                <td className="px-6 py-4">
                  <span className={`rounded px-2 py-1 text-xs font-semibold ${legacy ? 'bg-gray-200 text-gray-700' : 'bg-blue-50 text-blue-800'}`}>
                    {legacy ? 'LEGACY' : locale}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{translation}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    article.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {article.published ? 'Opublikowany' : 'Szkic'}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {article.publishedAt ? article.publishedAt.toLocaleDateString('pl-PL') : '-'}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {article.updatedAt.toLocaleDateString('pl-PL')}
                </td>
                <td className="px-6 py-4 text-right">
                  {!locale || !translationGroupId ? (
                    <span className="text-gray-400">Legacy - view only</span>
                  ) : (
                    <ArticleRowActions
                      id={article.id}
                      locale={locale}
                      published={article.published}
                      missingLocale={missingLocale}
                    />
                  )}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}