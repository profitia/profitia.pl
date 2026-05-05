import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/lib/i18n'
import { prisma } from '@/lib/prisma'
import type { Locale } from '@/middleware'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ lang: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.nav.blog }
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Fetch published articles — will be empty until DB is seeded
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, excerpt: true, createdAt: true },
  })

  return (
    <section className="py-20">
      <div className="container-base">
        <h1 className="text-4xl font-heading font-bold text-brand-primary mb-12">
          {dict.nav.blog}
        </h1>
        {articles.length === 0 ? (
          <p className="text-gray-500">{dict.blog.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <time className="text-sm text-gray-400">
                    {new Date(article.createdAt).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB')}
                  </time>
                  <h2 className="text-xl font-semibold text-brand-primary mt-2 mb-3">
                    <Link href={`/${lang}/blog/${article.slug}`} className="hover:underline">
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
