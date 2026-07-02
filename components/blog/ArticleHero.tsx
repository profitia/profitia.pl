/**
 * ArticleHero - Single Article Page Hero
 *
 * Institutional editorial hero.
 * No dark backgrounds - white, premium whitespace, strong typographic hierarchy.
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
import MobileHeroImage from '@/components/ui/MobileHeroImage'

interface ArticleHeroProps {
  article: ArticleDetailData
  locale: 'pl' | 'en'
}

const BACK = { pl: 'Wszystkie materiały', en: 'All articles' }

export function ArticleHero({ article, locale }: ArticleHeroProps) {
  const prefix = locale === 'en' ? '/en' : ''
  const coverImage = article.coverImage

  return (
    <header className="pt-14 pb-12 lg:pt-24 lg:pb-16">

      <div className="container-base">

        {/* Back link */}
        <Link
          href={`${prefix}/blog`}
          className="inline-flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-brand-blue transition-colors duration-200 ease-out mb-8"
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
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <CategoryBadge category={article.category} locale={locale} />
          {article.readingTime && (
            <span className="text-[12px] text-gray-500">
              {formatReadingTime(article.readingTime, locale)}
            </span>
          )}
          {article.publishedAt && (
            <>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <time
                dateTime={new Date(article.publishedAt as Date | string).toISOString()}
                className="text-[12px] text-gray-500"
              >
                {formatPublishDate(article.publishedAt, locale)}
              </time>
            </>
          )}
        </div>

        {/* Title */}
        <h1 className="text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-semibold tracking-tight text-gray-900 leading-[1.06] mb-6 max-w-[44rem]">
          {article.title}
        </h1>

        {/* Subtitle / standfirst */}
        {article.subtitle && (
          <p className="text-xl text-gray-500 leading-[1.7] max-w-[58ch] mb-10">
            {article.subtitle}
          </p>
        )}

        {/* Author */}
        {article.authorName && (
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-semibold text-gray-500" aria-hidden="true">
                {article.authorName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{article.authorName}</p>
              {article.authorRole && (
                <p className="text-[12px] text-gray-500">{article.authorRole}</p>
              )}
            </div>
          </div>
        )}

        {/* Desktop cover image */}
        {coverImage ? (
          <div className="relative hidden md:block w-full aspect-[16/7] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="hidden md:block w-full aspect-[16/7] rounded-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />
        )}
      </div>

      {/* Mobile cover image - same full-bleed presentation as system heroes */}
      {coverImage ? (
        <MobileHeroImage
          src={coverImage}
          alt={article.title}
          priority
        />
      ) : (
        <div className="w-full h-[60vh] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 md:hidden" />
      )}

    </header>
  )
}
