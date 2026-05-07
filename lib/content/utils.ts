/**
 * Editorial Content Utilities
 *
 * Reading time estimation, category resolution, date formatting.
 */

import { ARTICLE_CATEGORIES, type ArticleCategorySlug } from './types'

// ── Reading time ──────────────────────────────────────────────────────────────

const WORDS_PER_MINUTE = 220

/**
 * Estimate reading time from HTML content string.
 * Strips tags, counts words, divides by average adult reading speed.
 * Returns at least 1 minute.
 */
export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const words = text.split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// ── Category helpers ──────────────────────────────────────────────────────────

/**
 * Returns the display label for a category slug.
 * Falls back to the slug itself if not found.
 */
export function getCategoryLabel(slug: string | null, locale: 'pl' | 'en'): string | null {
  if (!slug) return null
  const cat = ARTICLE_CATEGORIES[slug as ArticleCategorySlug]
  return cat ? cat.label[locale] : slug
}

/**
 * Returns all categories as a sorted array for filter UIs.
 */
export function getAllCategories(locale: 'pl' | 'en') {
  return Object.values(ARTICLE_CATEGORIES).map((c) => ({
    slug: c.slug,
    label: c.label[locale],
  }))
}

// ── Date formatting ───────────────────────────────────────────────────────────

/**
 * Formats a date as a readable string in the given locale.
 * e.g. "7 maja 2026" (PL) or "7 May 2026" (EN)
 */
export function formatPublishDate(
  date: Date | null | undefined,
  locale: 'pl' | 'en'
): string {
  if (!date) return ''
  try {
    return new Date(date).toLocaleDateString(locale === 'en' ? 'en-GB' : 'pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    // Fallback for environments with limited ICU data
    const d = new Date(date)
    const months = {
      pl: ['stycznia','lutego','marca','kwietnia','maja','czerwca','lipca','sierpnia','września','października','listopada','grudnia'],
      en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    }
    return `${d.getDate()} ${months[locale][d.getMonth()]} ${d.getFullYear()}`
  }
}

// ── Reading time display ──────────────────────────────────────────────────────

export function formatReadingTime(minutes: number | null, locale: 'pl' | 'en'): string {
  if (!minutes) return ''
  return locale === 'en' ? `${minutes} min read` : `${minutes} min czytania`
}
