/**
 * PROFITIA — Legal Typography Token System
 * Reference: docs/design-system/LEGAL_SYSTEM.md
 *
 * Optimized for: long-form legal reading, institutional clarity, premium feel.
 * No @tailwindcss/typography — all tokens are plain Tailwind class strings.
 */

export const legalTypo = {
  // ─── Page headings ──────────────────────────────────────────────────────
  h1:      'text-3xl md:text-[2.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08]',
  h2:      'text-xl font-semibold tracking-tight text-gray-900 leading-snug',
  h3:      'text-[15px] font-semibold text-gray-800 leading-snug',

  // ─── Body text ──────────────────────────────────────────────────────────
  lead:    'text-base text-gray-500 leading-[1.75]',
  body:    'text-[15px] text-gray-600 leading-[1.8]',
  small:   'text-sm text-gray-500 leading-relaxed',

  // ─── Eyebrow / label ────────────────────────────────────────────────────
  eyebrow: 'text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400',

  // ─── Meta chips ─────────────────────────────────────────────────────────
  metaLabel: 'text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-400',
  metaValue: 'text-[11px] text-gray-500',

  // ─── TOC ────────────────────────────────────────────────────────────────
  tocHeading: 'text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400',
  tocItem:    'text-[13px] text-gray-400 leading-snug',
  tocActive:  'text-[13px] text-gray-900 font-medium leading-snug',
} as const
