/**
 * AboutPageTemplate
 * ─────────────────────────────────────────────────────────────────────────
 * Composition system for the About page.
 *
 * SECTION ORDER:
 *   Hero → Mission (editorial) → Values (feature grid) →
 *   Stats → Team (content split) → CTA
 *
 * TONAL RHYTHM:
 *   white → white → gray-50 → gray-900 → white → black
 *
 * USAGE:
 *   const content: AboutPageContent = { ... }
 *   <AboutPageTemplate content={content} />
 */

import { HeroMinimal, FeatureEditorial, FeatureGrid, FeatureStats, ContentSplit, CTADark } from '@/components/sections'
import type { FeatureItem } from '@/components/sections'
import type { StatItem } from '@/components/sections'

export interface AboutTeamMember {
  name: string
  role: string
  body: string
  image?: { src: string; alt: string }
}

export interface AboutPageContent {
  hero: {
    label?: string
    headline: string
    subtitle?: string
  }
  mission?: {
    label?: string
    headline: string
    body?: string
  }
  values?: {
    label?: string
    headline: string
    items: FeatureItem[]
  }
  stats?: {
    label?: string
    headline: string
    body: string
    items: StatItem[]
  }
  cta?: {
    headline?: string
    body?: string
    ctaPrimary?: { label: string; href: string }
    ctaSecondary?: { label: string; href: string }
  }
}

export function AboutPageTemplate({ content }: { content: AboutPageContent }) {
  return (
    <>
      <HeroMinimal
        label={content.hero.label}
        headline={content.hero.headline}
        subtitle={content.hero.subtitle}
      />

      {content.mission && (
        <FeatureEditorial
          label={content.mission.label}
          headline={content.mission.headline}
          body={content.mission.body}
          background="white"
        />
      )}

      {content.values && (
        <FeatureGrid
          label={content.values.label}
          headline={content.values.headline}
          items={content.values.items}
          columns={3}
          background="gray-50"
        />
      )}

      {content.stats && (
        <FeatureStats
          label={content.stats.label}
          headline={content.stats.headline}
          body={content.stats.body}
          stats={content.stats.items}
          statsDark
          background="white"
        />
      )}

      <CTADark {...(content.cta ?? {})} />
    </>
  )
}
