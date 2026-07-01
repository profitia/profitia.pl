/**
 * ArticleCard - Editorial Intelligence Block
 *
 * Used in the blog index grid.
 * NOT a typical content card - editorial intelligence block.
 * Image, category, reading time, title, excerpt.
 * Clean divider-based separation, no heavy border-box aesthetics.
 *
 * Strong typographic hierarchy. Restrained hover states.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { ArticlePreviewData } from '@/lib/content/types'
import { CategoryBadge } from './CategoryBadge'
import { formatPublishDate, formatReadingTime } from '@/lib/content/utils'

interface ArticleCardProps {
  article: ArticlePreviewData
  locale: 'pl' | 'en'
  priority?: boolean
}

export function ArticleCard({ article, locale, priority = false }: ArticleCardProps) {
  const prefix = locale === 'en' ? '/en' : ''
  const href = `${prefix}/blog/${article.slug}`

  return (
    <article>
      <Link href={href} className="group block">

        {/* Image */}
        <div className="overflow-hidden rounded-lg aspect-[16/10] bg-gray-100 relative mb-6">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              priority={priority}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <CategoryBadge category={article.category} locale={locale} />
          {article.readingTime && (
            <>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <span className="text-[10px] font-medium text-gray-500">
                {formatReadingTime(article.readingTime, locale)}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 leading-[1.25] mb-2.5 group-hover:text-brand-blue transition-colors duration-200 ease-out">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-[14px] text-gray-600 leading-[1.7] line-clamp-2 mb-5">
            {article.excerpt}
          </p>
        )}

        {/* Footer: author + date */}
        <div className="flex items-center gap-3 text-[12px] text-gray-500">
          {article.authorName && (
            <span className="font-medium">{article.authorName}</span>
          )}
          {article.authorName && article.publishedAt && (
            <span aria-hidden="true">·</span>
          )}
          {article.publishedAt && (
            <time dateTime={new Date(article.publishedAt as Date | string).toISOString()}>
              {formatPublishDate(article.publishedAt, locale)}
            </time>
          )}
        </div>

      </Link>
    </article>
  )
}
