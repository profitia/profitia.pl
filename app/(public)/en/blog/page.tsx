import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import type { ArticlePreviewData } from '@/lib/content/types'
import {
  PublicationHero,
  FeaturedArticle,
  ArticleCard,
  BlogNewsletter,
} from '@/components/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Procurement Intelligence | Profitia',
  description:
    'Analysis, strategy and intelligence for procurement, cost and negotiation leaders.',
  alternates: {
    canonical: 'https://profitia.pl/en/blog',
    languages: { pl: 'https://profitia.pl/blog' },
  },
  openGraph: {
    title: 'Procurement Intelligence | Profitia',
    description: 'Procurement analysis, negotiation strategy and supplier market intelligence.',
    type: 'website',
  },
}

const GRID_LABEL = 'Latest articles'
const EMPTY_HEADING = 'First intelligence briefs coming soon.'
const EMPTY_SUB = 'We are preparing the first analyses. Subscribe to receive them directly.'
const COMING_SOON = 'Upcoming'

async function getArticles(): Promise<ArticlePreviewData[]> {
  const rows = await prisma.article.findMany({
    where: { published: true },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      subtitle: true,
      category: true,
      readingTime: true,
      coverImage: true,
      featured: true,
      publishedAt: true,
      authorName: true,
      authorRole: true,
    },
  })
  return rows as ArticlePreviewData[]
}

export default async function EnBlogPage() {
  const articles = await getArticles()
  const featured = articles.find((a) => a.featured) ?? articles[0] ?? null
  const rest = featured ? articles.filter((a) => a.id !== featured.id) : []
  const locale = 'en' as const

  return (
    <>
      <PublicationHero locale={locale} articleCount={articles.length} />

      {articles.length === 0 ? (
        <div className="container-base py-24">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
            {COMING_SOON}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3">
            {EMPTY_HEADING}
          </h2>
          <p className="text-base text-gray-500 max-w-[42ch] leading-[1.7]">
            {EMPTY_SUB}
          </p>
        </div>
      ) : (
        <>
          {featured && (
            <div className="border-b border-gray-100">
              <FeaturedArticle article={featured} locale={locale} />
            </div>
          )}
          {rest.length > 0 && (
            <section className="container-base py-16 lg:py-20">
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400 mb-10">
                {GRID_LABEL}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {rest.map((article, i) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    locale={locale}
                    priority={i < 3}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <BlogNewsletter locale={locale} />
    </>
  )
}
