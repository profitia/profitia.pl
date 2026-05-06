/**
 * InsightArticleTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for blog / insight articles.
 *
 * SECTION ORDER:
 *   HeroMinimal → EditorialContent → optional QuoteHighlight → CTAMinimal
 *
 * TONAL RHYTHM:
 *   white → white → gray-50 (quote) → gray-50 (CTA)
 *
 * USAGE:
 *   Article body is passed as children (MDX / rich text rendered content).
 *   Metadata (date, author, readTime) is displayed in the hero area.
 */

import { ReactNode } from 'react'
import { HeroMinimal, QuoteHighlight, CTAMinimal, EditorialContent } from '@/components/sections'
import { RevealWrapper } from '@/components/ui'

export interface ArticleMeta {
  date: string           // e.g. "12 maja 2026"
  author?: string
  readTime?: string      // e.g. "8 min czytania"
  category?: string
}

export interface InsightArticleContent {
  category?: string
  headline: string
  subtitle?: string
  meta: ArticleMeta
  pullQuote?: {
    quote: string
    attribution?: string
    role?: string
  }
  cta?: {
    headline: string
    ctaLabel: string
    ctaHref: string
  }
}

export function InsightArticleTemplate({
  content,
  children,
}: {
  content: InsightArticleContent
  children: ReactNode
}) {
  return (
    <>
      <HeroMinimal
        label={content.category}
        headline={content.headline}
        subtitle={content.subtitle}
      />

      {/* Article meta */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap items-center gap-6 text-xs text-gray-400 tracking-wide">
            {content.meta.date && <span>{content.meta.date}</span>}
            {content.meta.author && (
              <>
                <span className="w-px h-4 bg-gray-200" />
                <span>{content.meta.author}</span>
              </>
            )}
            {content.meta.readTime && (
              <>
                <span className="w-px h-4 bg-gray-200" />
                <span>{content.meta.readTime}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article body */}
      <EditorialContent>
        {children}
      </EditorialContent>

      {/* Pull quote break */}
      {content.pullQuote && (
        <QuoteHighlight
          quote={content.pullQuote.quote}
          attribution={content.pullQuote.attribution}
          role={content.pullQuote.role}
          background="gray-50"
        />
      )}

      {/* End CTA */}
      {content.cta && (
        <CTAMinimal
          headline={content.cta.headline}
          cta={{ label: content.cta.ctaLabel, href: content.cta.ctaHref }}
          background="gray-50"
        />
      )}
    </>
  )
}
