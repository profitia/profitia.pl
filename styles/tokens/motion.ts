/**
 * PROFITIA — Motion Token System
 * Reference: docs/design-system/VISUAL_CONTEXT_PROFITIA.md § Animation Philosophy
 *
 * Usage:
 *   import { motion } from '@/styles/tokens/motion'
 *   <div className={motion.hover.card}>...</div>
 *
 * RULES:
 *   - All animations are subtle, quiet, premium
 *   - Reveal: fade + slight translateY only
 *   - Hover: color/opacity transitions — no scale, no bounce
 *   - Duration: 200ms (micro) → 550ms (reveal) max
 */

// ─── Scroll reveal ────────────────────────────────────────────────────────
// These control the CSS classes defined in globals.css (.reveal, .reveal.active)
// Delays are applied via RevealWrapper delay prop (0–4)
export const reveal = {
  fast: {
    duration: 'duration-300',   // 300ms — micro reveals, icons
    translateY: '16px',
  },
  standard: {
    duration: 'duration-[550ms]', // 550ms — standard (globals.css default)
    translateY: '24px',
  },
  slow: {
    duration: 'duration-700',   // 700ms — hero sections only
    translateY: '32px',
  },
} as const

// ─── Hover transitions ────────────────────────────────────────────────────
export const hover = {
  // Card dark inversion — all PremiumCard variants
  card: 'hover:bg-gray-900 hover:border-gray-900 hover:text-white hover:shadow-lg transition-all duration-300',
  // Text/link color shifts — desktop nav, body links
  soft: 'hover:text-gray-900 transition-colors duration-200',
  // Button hover (used inline, not via class)
  button: 'transition-colors duration-200',
  // Icon subtle lift
  icon: 'hover:text-gray-600 transition-colors duration-200',
  // Arrow translate (→)
  arrow: 'group-hover:translate-x-1 transition-transform duration-200',
  // Navigation link — desktop (gray-500 base → gray-900 hover)
  navDesktop: 'transition-colors duration-200 ease-out',
  // Navigation link — mobile overlay (gray-700 base → gray-900 hover)
  navMobile: 'transition-colors duration-150 ease-out',
  // Logo opacity
  logo: 'opacity-100 hover:opacity-70 transition-opacity duration-200',
  // Language switcher (text-only, no bg)
  lang: 'transition-colors duration-150 ease-out',
} as const

// ─── Transition presets ───────────────────────────────────────────────────
export const transition = {
  // Standard — color, opacity, border changes
  standard: 'transition-colors duration-200',
  // Premium — full property change (background, shadow, transform)
  premium: 'transition-all duration-300',
  // Slow — section-level, cinematic
  slow: 'transition-all duration-500',
} as const

// ─── Delay classes (map to globals.css .reveal-delay-*) ──────────────────
export const delay = {
  none: 0,
  xs: 1,    // 0.1s
  sm: 2,    // 0.2s
  md: 3,    // 0.3s
  lg: 4,    // 0.4s
} as const

export type DelayValue = 0 | 1 | 2 | 3 | 4

// ─── Easing ──────────────────────────────────────────────────────────────
// For use in inline style or Tailwind JIT arbitrary values
export const easing = {
  standard: 'ease',             // CSS ease — covers most cases
  out: 'ease-out',              // Reveal entries
  inOut: 'ease-in-out',         // Hover on/off
} as const
