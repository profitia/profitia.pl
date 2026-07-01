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
  title: 'Inteligencja zakupowa | Profitia',
  description:
    'Analizy, strategie i inteligencja dla osób odpowiedzialnych za zakupy, koszty i negocjacje.',
  alternates: {
    canonical: 'https://profitia.pl/blog',
    languages: { en: 'https://profitia.pl/en/blog' },
  },
  openGraph: {
    title: 'Inteligencja zakupowa | Profitia',
    description:
      'Analizy zakupowe, strategie negocjacyjne i inteligencja rynkowa od Profitia.',
    type: 'website',
  },
}

const GRID_LABEL = 'Pozostałe materiały'
const EMPTY_HEADING = 'Pierwsze analizy wkrótce.'
const EMPTY_SUB =
  'Przygotowujemy pierwsze materiały. Zapisz się, aby otrzymać je bezpośrednio.'
const COMING_SOON = 'Wkrótce'

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

export default async function BlogPage() {
  const articles = await getArticles()
  const featured = articles.find((a) => a.featured) ?? articles[0] ?? null
  const rest = featured ? articles.filter((a) => a.id !== featured.id) : []
  const locale = 'pl' as const

  return (
    <>
      {/* ── Publication introduction ───────────────────── */}
      <PublicationHero locale={locale} articleCount={articles.length} />

      {articles.length === 0 ? (
        /* ── Empty state ─────────────────────────────── */
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
          {/* ── Featured article ─────────────────────── */}
          {featured && (
            <div className="border-b border-gray-100">
              <FeaturedArticle article={featured} locale={locale} />
            </div>
          )}

          {/* ── Article grid ─────────────────────────── */}
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

      {/* ── Newsletter ───────────────────────────────── */}
      <BlogNewsletter locale={locale} />
    </>
  )
}
