import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage() {
  // Fetch published articles — will be empty until DB is seeded
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, excerpt: true, createdAt: true },
  })

  return (
    <section className="py-20">
      <div className="container-base">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
          Wiedza i spostrzegżenia
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-12">
          Blog
        </h1>
        {articles.length === 0 ? (
          <p className="text-gray-500">Artykuły pojawią się wkrótce.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <time className="text-sm text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString('pl-PL')}
                  </time>
                  <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                    <Link href={`/blog/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h2>
                  {article.excerpt && (
                    <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
