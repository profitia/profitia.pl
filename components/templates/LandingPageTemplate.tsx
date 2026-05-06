/**
 * LandingPageTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for campaign / product landing pages.
 * Optimized for conversion. Single focused CTA flow.
 *
 * SECTION ORDER:
 *   HeroEditorial → LogoCloud → FeatureGrid → FeatureStats →
 *   TestimonialSection → FeatureEditorial → CTADark
 *
 * TONAL RHYTHM:
 *   white → gray-50 → white → white → gray-900 → white → black
 *
 * USAGE:
 *   const content: LandingPageContent = { ... }
 *   <LandingPageTemplate content={content} />
 */

import {
  HeroEditorial,
  LogoCloud,
  FeatureGrid,
  FeatureStats,
  TestimonialSection,
  FeatureEditorial,
  CTADark,
} from '@/components/sections'

import type {
  FeatureItem,
  StatItem,
  LogoItem,
} from '@/components/sections'

export interface LandingPageContent {
  hero: {
    label?: string
    headline: string
    subtitle?: string
    ctaPrimary: { label: string; href: string }
    ctaSecondary?: { label: string; href: string }
    note?: string
    size?: 'standard' | 'xl'
  }
  logos?: {
    label?: string
    items: LogoItem[]
  }
  features?: {
    label?: string
    headline: string
    body?: string
    items: FeatureItem[]
    columns?: 2 | 3 | 4
  }
  stats?: {
    label?: string
    headline: string
    body: string
    items: StatItem[]
    cta?: { label: string; href: string }
  }
  testimonial?: {
    label?: string
    headline?: string
    quote: string
    author: string
    role: string
    company?: string
    metric?: string
    metricLabel?: string
  }
  statement?: {
    label?: string
    headline: string
    body?: string
    cta?: { label: string; href: string }
  }
  cta?: {
    headline?: string
    body?: string
    ctaPrimary?: { label: string; href: string }
    ctaSecondary?: { label: string; href: string }
  }
}

export function LandingPageTemplate({ content }: { content: LandingPageContent }) {
  return (
    <>
      <HeroEditorial
        label={content.hero.label}
        headline={content.hero.headline}
        subtitle={content.hero.subtitle}
        ctaPrimary={content.hero.ctaPrimary}
        ctaSecondary={content.hero.ctaSecondary}
        note={content.hero.note}
        size={content.hero.size}
      />

      {content.logos && (
        <LogoCloud
          label={content.logos.label}
          logos={content.logos.items}
          background="gray-50"
        />
      )}

      {content.features && (
        <FeatureGrid
          label={content.features.label}
          headline={content.features.headline}
          body={content.features.body}
          items={content.features.items}
          columns={content.features.columns ?? 3}
          background="white"
        />
      )}

      {content.stats && (
        <FeatureStats
          label={content.stats.label}
          headline={content.stats.headline}
          body={content.stats.body}
          stats={content.stats.items}
          cta={content.stats.cta}
          background="white"
        />
      )}

      {content.testimonial && (
        <TestimonialSection
          label={content.testimonial.label}
          headline={content.testimonial.headline}
          quote={content.testimonial.quote}
          author={content.testimonial.author}
          role={content.testimonial.role}
          company={content.testimonial.company}
          metric={content.testimonial.metric}
          metricLabel={content.testimonial.metricLabel}
        />
      )}

      {content.statement && (
        <FeatureEditorial
          label={content.statement.label}
          headline={content.statement.headline}
          body={content.statement.body}
          cta={content.statement.cta}
          background="white"
        />
      )}

      <CTADark {...(content.cta ?? {})} />
    </>
  )
}
