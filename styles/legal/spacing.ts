/**
 * PROFITIA — Legal Spacing Token System
 * Reference: docs/design-system/LEGAL_SYSTEM.md
 */

export const legalSpacing = {
  // ─── Page rhythm ────────────────────────────────────────────────────────
  pageTop:    'pt-16 lg:pt-24',
  pageBottom: 'pb-24 lg:pb-32',

  // ─── Hero ───────────────────────────────────────────────────────────────
  heroBottom: 'mb-12 pb-12 border-b border-gray-100',

  // ─── Section ────────────────────────────────────────────────────────────
  sectionSpacing: 'scroll-mt-28',   // offset for sticky header (~88px)
  sectionH2Top:   'mt-12 pt-6 border-t border-gray-100',

  // ─── Content max-width ──────────────────────────────────────────────────
  contentWidth: 'max-w-[65ch]',

  // ─── Sidebar ────────────────────────────────────────────────────────────
  sidebarTop:   'top-28',
  sidebarWidth: '240px',            // used in LegalLayout grid definition
} as const
