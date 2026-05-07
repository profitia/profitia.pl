import type { Capability, CapabilityType, CapabilityCategory, Locale } from './types'
import { CAPABILITIES } from './data'
import { SECTION_CATEGORIES } from './categories'

/**
 * All capabilities of a given type, sorted by order.
 */
export function getCapabilitiesByType(type: CapabilityType): Capability[] {
  return CAPABILITIES.filter((c) => c.type === type).sort((a, b) => a.order - b.order)
}

/**
 * Capabilities belonging to a specific listing section ID.
 * Uses SECTION_CATEGORIES mapping.
 */
export function getCapabilitiesForSection(sectionId: string): Capability[] {
  const cats = SECTION_CATEGORIES[sectionId] ?? []
  return CAPABILITIES.filter((c) => cats.includes(c.category)).sort((a, b) => a.order - b.order)
}

/**
 * Capabilities by category.
 */
export function getCapabilitiesByCategory(category: CapabilityCategory): Capability[] {
  return CAPABILITIES.filter((c) => c.category === category).sort((a, b) => a.order - b.order)
}

/**
 * Single capability by slug. Returns undefined if not found.
 */
export function getCapabilityBySlug(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug)
}

/**
 * Related capabilities for a given slug (max 3).
 */
export function getRelatedCapabilities(slug: string, max = 3): Capability[] {
  const cap = getCapabilityBySlug(slug)
  if (!cap) return []
  return cap.relatedCapabilities
    .map((s) => getCapabilityBySlug(s))
    .filter((c): c is Capability => c !== undefined)
    .slice(0, max)
}

/**
 * Featured capabilities of a given type.
 */
export function getFeaturedCapabilities(type: CapabilityType, max = 4): Capability[] {
  return CAPABILITIES.filter((c) => c.type === type && c.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, max)
}

/**
 * Localise a LocalizedString safely.
 */
export function t(field: { pl: string; en: string }, locale: Locale): string {
  return field[locale]
}

/**
 * All slugs for a given type — used for generateStaticParams.
 */
export function getSlugsByType(type: CapabilityType): string[] {
  return CAPABILITIES.filter((c) => c.type === type).map((c) => c.slug)
}
