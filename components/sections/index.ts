/**
 * PROFITIA - Section Library
 * Canonical section components for page composition.
 *
 * Import pattern:
 *   import { HeroEditorial, FeatureGrid, CTADark } from '@/components/sections'
 *
 * Visual reference: docs/design-system/VISUAL_CONTEXT_PROFITIA.md
 * Spacing reference: styles/tokens/spacing.ts
 * Motion reference:  styles/tokens/motion.ts
 */

// ─── Hero ────────────────────────────────────────────────────────────────
export { HeroEditorial } from './hero/HeroEditorial'
export { HeroSplit } from './hero/HeroSplit'
export { HeroMinimal } from './hero/HeroMinimal'

export type { HeroEditorialProps } from './hero/HeroEditorial'
export type { HeroSplitProps } from './hero/HeroSplit'
export type { HeroMinimalProps } from './hero/HeroMinimal'

// ─── Features ────────────────────────────────────────────────────────────
export { FeatureGrid } from './features/FeatureGrid'
export { FeatureSplit } from './features/FeatureSplit'
export { FeatureStats } from './features/FeatureStats'
export { FeatureEditorial } from './features/FeatureEditorial'

export type { FeatureGridProps, FeatureItem } from './features/FeatureGrid'
export type { FeatureSplitProps } from './features/FeatureSplit'
export type { FeatureStatsProps, StatItem } from './features/FeatureStats'
export type { FeatureEditorialProps } from './features/FeatureEditorial'

// ─── Proof & Trust ───────────────────────────────────────────────────────
export { LogoCloud } from './proof/LogoCloud'
export { StatsStrip } from './proof/StatsStrip'
export { TestimonialSection } from './proof/TestimonialSection'
export { QuoteHighlight } from './proof/QuoteHighlight'

export type { LogoCloudProps, LogoItem } from './proof/LogoCloud'
export type { StatsStripProps, StripStat } from './proof/StatsStrip'
export type { TestimonialSectionProps } from './proof/TestimonialSection'
export type { QuoteHighlightProps } from './proof/QuoteHighlight'

// ─── Content ─────────────────────────────────────────────────────────────
export { ContentSplit } from './content/ContentSplit'
export { EditorialContent } from './content/EditorialContent'
export { ComparisonGrid } from './content/ComparisonGrid'

export type { ContentSplitProps } from './content/ContentSplit'
export type { EditorialContentProps } from './content/EditorialContent'
export type { ComparisonGridProps, ComparisonRow } from './content/ComparisonGrid'

// ─── CTA ─────────────────────────────────────────────────────────────────
export { CTADark } from './cta/CTADark'
export { CTAMinimal } from './cta/CTAMinimal'
export { CTAInline } from './cta/CTAInline'

export type { CTADarkProps } from './cta/CTADark'
export type { CTAMinimalProps } from './cta/CTAMinimal'
export type { CTAInlineProps } from './cta/CTAInline'
