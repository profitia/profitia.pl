import FeaturedArticleCard, { type ArticleCardData } from './FeaturedArticleCard'

interface InsightsCopy {
  eyebrow: string
  h2: string
  body: string
}

interface Props {
  copy: InsightsCopy
  articles: ArticleCardData[]
}

export default function FeaturedArticles({ copy, articles }: Props) {
  return (
    <section id="insights-section" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mb-5">
            {copy.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-gray-900">
            {copy.h2}
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            {copy.body}
          </p>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((article) => (
            <FeaturedArticleCard key={article.slug} article={article} />
          ))}
        </div>

      </div>
    </section>
  )
}
