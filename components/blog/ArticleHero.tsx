/**
 * ArticleHero — Single Article Page Hero
 *
 * Institutional editorial hero.
 * No dark backgrounds — white, premium whitespace, strong typographic hierarchy.
 *
 * Structure:
 * - Metadata: category + reading time + date
 * - H1: article title
 * - Subtitle / standfirst
 * - Author name + role
 * - Cover image (full container width, 16:9, rounded)
 */

import Image from 'next/image'
import Link from 'next/link'
import type { ArticleDetailData } from '@/lib/content/types'
import { CategoryBadge } from './CategoryBadge'
import { formatPublishDate, formatReadingTime } from '@/lib/content/utils'

interface ArticleHeroProps {
  article: ArticleDetailData
  locale: 'pl' | 'en'
}

const BACK = { pl: 'Wszystkie materiały', en: 'All articles' }

export function ArticleHero({ article, locale }: ArticleHeroProps) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <header className="container-base pt-12 pb-10 lg:pt-16 lg:pb-12">

      {/* Back link */}
      <Link
        href={`${prefix}/blog`}
        className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-700 transition-colors duration-200 ease-out mb-8"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M9.5 6H2.5M5 3L2 6l3 3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {BACK[locale]}
      </Link>

      {/* Metadata row */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <CategoryBadge category={article.category} locale={locale} />
        {article.readingTime && (
          <span className="text-[12px] text-gray-400">
            {formatReadingTime(article.readingTime, locale)}
          </span>
        )}
        {article.publishedAt && (
          <>
            <span className="text-gray-200" aria-hidden="true">·</span>
            <time
              dateTime={article.publishedAt.toISOString()}
              className="text-[12px] text-gray-400"
            >
              {formatPublishDate(article.publishedAt, locale)}
            </time>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-gray-900 leading-[1.1] mb-5 max-w-[38rem]">
        {article.title}
      </h1>

      {/* Subtitle / standfirst */}
      {article.subtitle && (
        <p className="text-lg text-gray-500 leading-[1.7] max-w-[52ch] mb-8">
          {article.subtitle}
        </p>
      )}

      {/* Author */}
      {article.authorName && (
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <span className="text-[11px] font-semibold text-gray-500" aria-hidden="true">
              {article.authorName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
            {article.authorRole && (
              <p className="text-[12px] text-gray-400">{article.authorRole}</p>
            )}
          </div>
        </div>
      )}

      {/* Cover image */}
      {article.coverImage ? (
        <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="w-full aspect-[16/8] rounded-xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />
      )}

    </header>
  )
}
