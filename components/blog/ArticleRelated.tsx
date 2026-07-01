/**
 * ArticleRelated - Related Intelligence Briefs
 *
 * Shown at the bottom of an article page.
 * Max 3 articles. Editorial, restrained presentation.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { ArticlePreviewData } from '@/lib/content/types'
import { CategoryBadge } from './CategoryBadge'
import { formatReadingTime } from '@/lib/content/utils'

interface ArticleRelatedProps {
  articles: ArticlePreviewData[]
  locale: 'pl' | 'en'
}

const LABEL = { pl: 'Powiązane materiały', en: 'Related articles' }

export function ArticleRelated({ articles, locale }: ArticleRelatedProps) {
  if (articles.length === 0) return null

  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="container-base">
      <div className="border-t border-gray-100 pt-10 pb-20">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mb-8">
          {LABEL[locale]}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              href={`${prefix}/blog/${article.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-lg aspect-[16/9] bg-gray-100 relative mb-4">
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
              </div>
              <div className="flex items-center gap-3 mb-2">
                <CategoryBadge category={article.category} locale={locale} />
                {article.readingTime && (
                  <span className="text-[11px] text-gray-500">
                    {formatReadingTime(article.readingTime, locale)}
                  </span>
                )}
              </div>
              <h4 className="text-base font-semibold tracking-tight text-gray-900 leading-snug group-hover:text-brand-blue transition-colors duration-200 ease-out">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
