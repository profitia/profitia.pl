import type { ArticlePreviewData } from '@/lib/content/types'
import {
  PublicationHero,
  FeaturedArticle,
  ArticleCard,
  BlogNewsletter,
} from '@/components/blog'

interface Props {
  locale: 'pl' | 'en'
  articles: ArticlePreviewData[]
}

const COPY = {
  pl: {
    gridLabel: 'Pozostałe materiały',
    emptyHeading: 'Pierwsze analizy wkrótce.',
    emptyBody: 'Przygotowujemy pierwsze materiały. Zapisz się, aby otrzymać je bezpośrednio.',
    comingSoon: 'Wkrótce',
  },
  en: {
    gridLabel: 'Latest articles',
    emptyHeading: 'First intelligence briefs coming soon.',
    emptyBody: 'We are preparing the first analyses. Subscribe to receive them directly.',
    comingSoon: 'Upcoming',
  },
} as const

export default function BlogListingPage({ locale, articles }: Props) {
  const copy = COPY[locale]
  const featured = articles.find((article) => article.featured) ?? articles[0] ?? null
  const rest = featured ? articles.filter((article) => article.id !== featured.id) : []

  return (
    <>
      <PublicationHero locale={locale} articleCount={articles.length} />

      {articles.length === 0 ? (
        <div className="container-base py-24">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
            {copy.comingSoon}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3">
            {copy.emptyHeading}
          </h2>
          <p className="text-base text-gray-500 max-w-[42ch] leading-[1.7]">
            {copy.emptyBody}
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
                {copy.gridLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {rest.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    locale={locale}
                    priority={index < 3}
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