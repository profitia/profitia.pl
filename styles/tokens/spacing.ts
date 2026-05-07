/**
 * PROFITIA - Spacing Token System
 * Reference: docs/design-system/VISUAL_CONTEXT_PROFITIA.md § Spacing & Layout
 *
 * Usage:
 *   import { spacing } from '@/styles/tokens/spacing'
 *   <section className={spacing.section.lg}>...</section>
 */

// ─── Section vertical padding ─────────────────────────────────────────────
// Cinematic, whitespace-driven. Never compress.
export const section = {
  xs: 'py-12',               // Compact - admin, tight blocks
  sm: 'py-16',               // Small - sub-sections, embedded blocks
  md: 'py-24',               // Medium - secondary sections
  lg: 'py-28',               // Standard - all main content sections
  xl: 'py-36',               // Cinematic - hero variants, premium moments
  cta: 'py-24 lg:py-32',     // CTA section - exact match landing page
} as const

// ─── Content gap (between grid items) ────────────────────────────────────
export const gap = {
  xs: 'gap-3',
  sm: 'gap-5',
  md: 'gap-8',
  lg: 'gap-12',
  xl: 'gap-16 lg:gap-20',
  cinematic: 'gap-16 lg:gap-24',
} as const

// ─── Layout widths (max-width for content columns) ────────────────────────
export const width = {
  narrow: 'max-w-2xl',          // Paragraphs, captions (~65ch)
  standard: 'max-w-3xl',        // Blog, editorial, long-form
  headline: 'max-w-xl',         // Section H2 headlines
  hero: 'max-w-2xl',            // Hero H1
  cta: 'max-w-2xl mx-auto',     // CTA headline centered
  subtitle: 'max-w-lg mx-auto', // CTA subtitle centered
  wide: 'max-w-5xl',            // Feature content, wider sections
  full: 'max-w-7xl',            // Full container (container-base)
} as const

// ─── Spacing between typography blocks ────────────────────────────────────
export const stack = {
  labelToH2: 'mb-5',           // Label → H2
  h2ToBody: 'mb-6',            // H2 → body text
  h2ToGrid: 'mb-12 lg:mb-16',  // H2 → card grid (no body between)
  bodyToCta: 'mb-10',          // Body → CTA button
  bodyToList: 'mb-8',          // Body → bullet list
  sectionSeparator: 'border-t border-gray-100', // Between sections
} as const

// ─── Card padding ─────────────────────────────────────────────────────────
export const card = {
  sm: 'p-6',
  md: 'p-8',   // standard PremiumCard padding
  lg: 'p-10',  // proof-section cell padding
  xl: 'p-12',
} as const

// ─── Grid columns ─────────────────────────────────────────────────────────
export const grid = {
  two: 'grid grid-cols-1 md:grid-cols-2',
  three: 'grid grid-cols-1 md:grid-cols-3',
  four: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  split: 'grid grid-cols-1 lg:grid-cols-2',
  proofTwo: 'grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden',
  proofFour: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden',
} as const

// ─── Section backgrounds (tonal rhythm) ───────────────────────────────────
// Rhythm: white → gray-50 → white → gray-50 → gray-900 (break) → white → black (CTA)
export const bg = {
  primary: 'bg-white',
  alt: 'bg-gray-50',
  dark: 'bg-gray-900',        // testimonial, proof moment
  navy: 'bg-[#242F44]',       // brand dark
  black: 'bg-black',          // CTA section ONLY
  purple: 'bg-[#48103F]',     // premium accent - sparingly
} as const
