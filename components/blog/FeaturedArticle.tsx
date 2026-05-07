/**
 * FeaturedArticle — Editorial Cover Story
 *
 * The primary editorial surface on the blog index.
 * Asymmetric layout: content (40%) + image (60%) on desktop.
 * Looks like a premium editorial feature story, not a card.
 *
 * Desktop: two-column, image right, content left.
 * Mobile: image top, content below.
 */

import Link from 'next/link'
import Image from 'next/image'
import type { ArticlePreviewData } from '@/lib/content/types'
import { CategoryBadge } from './CategoryBadge'
import { formatPublishDate, formatReadingTime } from '@/lib/content/utils'

interface FeaturedArticleProps {
  article: ArticlePreviewData
  locale: 'pl' | 'en'
}

const CTA = { pl: 'Czytaj analizę', en: 'Read the analysis' }
const FEATURED = { pl: 'Materiał wiodący', en: 'Featured' }

export function FeaturedArticle({ article, locale }: FeaturedArticleProps) {
  const prefix = locale === 'en' ? '/en' : ''
  const href = `${prefix}/blog/${article.slug}`

  return (
    <section className="container-base py-16 lg:py-20">
      <Link href={href} className="group block" aria-label={article.title}>
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 lg:items-center">

          {/* ── Content column ───────────────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow: featured label + category */}
            <div className="flex items-center gap-4 mb-5">
              <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-300">
                {FEATURED[locale]}
              </span>
              <CategoryBadge category={article.category} locale={locale} />
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-[2rem] font-semibold tracking-tight text-gray-900 leading-[1.12] mb-4 group-hover:text-gray-700 transition-colors duration-200 ease-out">
              {article.title}
            </h2>

            {/* Subtitle / excerpt */}
            {(article.subtitle || article.excerpt) && (
              <p className="text-base text-gray-500 leading-[1.75] mb-7 max-w-[52ch]">
                {article.subtitle ?? article.excerpt}
              </p>
            )}

            {/* Meta: author + date + reading time */}
            <div className="flex items-center gap-4 text-[12px] text-gray-400 mb-8">
              {article.authorName && (
                <span className="font-medium text-gray-500">{article.authorName}</span>
              )}
              {article.publishedAt && (
                <span>{formatPublishDate(article.publishedAt, locale)}</span>
              )}
              {article.readingTime && (
                <span>{formatReadingTime(article.readingTime, locale)}</span>
              )}
            </div>

            {/* CTA */}
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:gap-3 transition-all duration-200 ease-out">
              {CTA[locale]}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0"
              >
                <path
                  d="M2.5 7h9M8 4l3.5 3L8 10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {/* ── Image column ─────────────────────────────────── */}
          <div className="order-1 lg:order-2 overflow-hidden rounded-xl aspect-[16/10] bg-gray-100 relative">
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                priority
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200" />
            )}
          </div>

        </div>
      </Link>
    </section>
  )
}
