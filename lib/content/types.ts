/**
 * Editorial Content Model - Type Definitions
 *
 * Canonical category system + article types for the Profitia
 * Procurement Intelligence Publication.
 *
 * Categories are defined here - the DB stores the slug as a plain String.
 * This file is the single source of truth for editorial taxonomy.
 */

// ── Category Registry ─────────────────────────────────────────────────────────

export const ARTICLE_CATEGORIES = {
  'negotiations': {
    slug: 'negotiations',
    label: { pl: 'Negocjacje', en: 'Negotiations' },
    description: { pl: 'Taktyki, struktury i wyniki negocjacji zakupowych', en: 'Procurement negotiation tactics, structures and outcomes' },
  },
  'procurement-strategy': {
    slug: 'procurement-strategy',
    label: { pl: 'Strategia zakupów', en: 'Procurement Strategy' },
    description: { pl: 'Modele operacyjne, dojrzałość zakupowa i transformacja', en: 'Operating models, procurement maturity and transformation' },
  },
  'cost-intelligence': {
    slug: 'cost-intelligence',
    label: { pl: 'Cost Intelligence', en: 'Cost Intelligence' },
    description: { pl: 'Analiza kosztów, benchmarki i inteligencja wydatkowa', en: 'Cost analysis, benchmarks and spend intelligence' },
  },
  'supplier-risk': {
    slug: 'supplier-risk',
    label: { pl: 'Ryzyko dostawców', en: 'Supplier Risk' },
    description: { pl: 'Zarządzanie ryzykiem w bazie dostawców', en: 'Managing risk in the supplier base' },
  },
  'supply-chain': {
    slug: 'supply-chain',
    label: { pl: 'Łańcuch dostaw', en: 'Supply Chain' },
    description: { pl: 'Odporność, optymalizacja i transformacja łańcucha dostaw', en: 'Resilience, optimisation and supply chain transformation' },
  },
  'market-analysis': {
    slug: 'market-analysis',
    label: { pl: 'Analizy rynkowe', en: 'Market Analysis' },
    description: { pl: 'Trendy rynkowe, dynamika cenowa i analiza sektorów', en: 'Market trends, pricing dynamics and sector analysis' },
  },
  'spend-management': {
    slug: 'spend-management',
    label: { pl: 'Zarządzanie wydatkami', en: 'Spend Management' },
    description: { pl: 'Struktura wydatków, kontrola i optymalizacja kosztów', en: 'Spend structure, control and cost optimisation' },
  },
} as const

export type ArticleCategorySlug = keyof typeof ARTICLE_CATEGORIES

// ── Article View Types ────────────────────────────────────────────────────────

/** Lightweight shape for index page grid cards */
export interface ArticlePreviewData {
  id: string
  slug: string
  title: string
  excerpt: string | null
  subtitle: string | null
  category: string | null
  readingTime: number | null
  coverImage: string | null
  featured: boolean
  publishedAt: Date | null
  authorName: string | null
  authorRole: string | null
}

/** Full shape for article detail page */
export interface ArticleDetailData extends ArticlePreviewData {
  content: string
  authorBio: string | null
  relatedSlugs: string[]
  metaTitle: string | null
  metaDescription: string | null
}

// ── TOC ───────────────────────────────────────────────────────────────────────

export interface ArticleTOCItem {
  id: string
  label: string
  level: 2 | 3
}
