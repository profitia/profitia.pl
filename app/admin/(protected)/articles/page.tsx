import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Artykuły' }

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, published: true, createdAt: true },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-brand-primary">Artykuły</h1>
        <Button href="/admin/articles/new">
          + Nowy artykuł
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Tytuł</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Data</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                  Brak artykułów
                </td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 font-medium">{article.title}</td>
                <td className="px-6 py-4 text-gray-500">{article.slug}</td>
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
                  {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-gray-400">Edycja w przygotowaniu</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}