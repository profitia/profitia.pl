/**
 * CaseStudyTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for case study pages.
 *
 * SECTION ORDER:
 *   HeroMinimal → StatsStrip → ContentSplit → ComparisonGrid →
 *   QuoteHighlight → EditorialContent → CTADark
 *
 * TONAL RHYTHM:
 *   white → gray-50 → white → gray-50 → white → black
 *
 * USAGE:
 *   Case study narrative body is passed as children.
 *   Structured data (client, challenge, results) comes from content prop.
 */

import { ReactNode } from 'react'
import {
  HeroMinimal,
  StatsStrip,
  ContentSplit,
  ComparisonGrid,
  QuoteHighlight,
  EditorialContent,
  CTADark,
} from '@/components/sections'
import type { StripStat, ComparisonRow } from '@/components/sections'

export interface CaseStudyContent {
  category?: string
  headline: string
  subtitle?: string
  client?: string
  industry?: string
  metrics?: StripStat[]
  challenge?: {
    label?: string
    headline: string
    body: string
    image?: { src: string; alt: string }
  }
  comparison?: {
    label?: string
    headline?: string
    beforeLabel?: string
    afterLabel?: string
    rows: ComparisonRow[]
  }
  quote?: {
    quote: string
    attribution?: string
    role?: string
  }
  cta?: {
    headline?: string
    body?: string
    ctaPrimary?: { label: string; href: string }
  }
}

export function CaseStudyTemplate({
  content,
  children,
}: {
  content: CaseStudyContent
  children?: ReactNode
}) {
  return (
    <>
      <HeroMinimal
        label={content.category ?? content.industry}
        headline={content.headline}
        subtitle={content.subtitle}
      />

      {content.metrics && content.metrics.length > 0 && (
        <StatsStrip stats={content.metrics} />
      )}

      {content.challenge && content.challenge.image && (
        <ContentSplit
          label={content.challenge.label}
          headline={content.challenge.headline}
          body={content.challenge.body}
          image={content.challenge.image}
          imagePosition="right"
          background="white"
        />
      )}

      {content.comparison && (
        <ComparisonGrid
          label={content.comparison.label}
          headline={content.comparison.headline}
          beforeLabel={content.comparison.beforeLabel}
          afterLabel={content.comparison.afterLabel}
          rows={content.comparison.rows}
          background="gray-50"
        />
      )}

      {children && (
        <EditorialContent>
          {children}
        </EditorialContent>
      )}

      {content.quote && (
        <QuoteHighlight
          quote={content.quote.quote}
          attribution={content.quote.attribution}
          role={content.quote.role}
          background="gray-50"
        />
      )}

      <CTADark {...(content.cta ?? {})} />
    </>
  )
}
