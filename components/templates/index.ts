/**
 * PROFITIA — Page Templates
 * Composition systems for all page types.
 *
 * Templates = composition logic, not custom layouts.
 * Every page type has a canonical section order and tonal rhythm.
 *
 * Import pattern:
 *   import { ServicePageTemplate } from '@/components/templates'
 *   import type { ServicePageContent } from '@/components/templates'
 *
 * Visual reference: docs/design-system/VISUAL_CONTEXT_PROFITIA.md
 */

export { ServicePageTemplate } from './ServicePageTemplate'
export { AboutPageTemplate } from './AboutPageTemplate'
export { ContactPageTemplate } from './ContactPageTemplate'
export { InsightArticleTemplate } from './InsightArticleTemplate'
export { CaseStudyTemplate } from './CaseStudyTemplate'
export { LandingPageTemplate } from './LandingPageTemplate'

export type { ServicePageContent } from './ServicePageTemplate'
export type { AboutPageContent } from './AboutPageTemplate'
export type { ContactPageContent, ContactInfo } from './ContactPageTemplate'
export type { InsightArticleContent, ArticleMeta } from './InsightArticleTemplate'
export type { CaseStudyContent } from './CaseStudyTemplate'
export type { LandingPageContent } from './LandingPageTemplate'
