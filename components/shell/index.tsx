/**
 * PROFITIA — Shell Wrapper System
 * ─────────────────────────────────────────────────────────────────────────
 * Canonical layout primitives used by every public page.
 * These enforce consistent spacing, container widths, and tonal rhythm.
 *
 * Import pattern:
 *   import { PageWrapper, SectionWrapper, DarkSectionWrapper } from '@/components/shell'
 *
 * TONAL RHYTHM (ideal page flow):
 *   white → gray-50 → white → gray-900 (dark break) → black (CTA) → navy footer
 *
 * Rules:
 *   - Never use ad-hoc padding or max-width on pages
 *   - Always wrap page sections in SectionWrapper or DarkSectionWrapper
 *   - Container width is always via container-base (defined in globals.css)
 */

'use client'
import { ReactNode } from 'react'

// ─── PageWrapper ──────────────────────────────────────────────────────────
// Wraps all content on a page. Adds no visual style — pure structure.
// Already applied globally via the (public) layout — use on special pages only.
export function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="min-h-screen flex flex-col">{children}</div>
}

// ─── SectionWrapper ───────────────────────────────────────────────────────
// Standard content section. White or gray-50 background.
// Handles section vertical padding and top border.
interface SectionWrapperProps {
  children: ReactNode
  background?: 'white' | 'gray-50'
  border?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  id?: string
  className?: string
}

const sectionSizes = {
  sm: 'py-16',
  md: 'py-24',
  lg: 'py-28',
  xl: 'py-36',
}

export function SectionWrapper({
  children,
  background = 'white',
  border = true,
  size = 'lg',
  id,
  className = '',
}: SectionWrapperProps) {
  const bgCls = background === 'white' ? 'bg-white' : 'bg-gray-50'
  const borderCls = border ? 'border-t border-gray-100' : ''
  return (
    <section id={id} className={`${sectionSizes[size]} ${bgCls} ${borderCls} ${className}`}>
      <div className="container-base">{children}</div>
    </section>
  )
}

// ─── DarkSectionWrapper ───────────────────────────────────────────────────
// Dark tonal break. For testimonials, proof moments, stats strips.
// bg-gray-900 — never used for CTA (that's black via CTASection).
interface DarkSectionWrapperProps {
  children: ReactNode
  size?: 'md' | 'lg'
  id?: string
}

export function DarkSectionWrapper({
  children,
  size = 'lg',
  id,
}: DarkSectionWrapperProps) {
  return (
    <section id={id} className={`${sectionSizes[size]} bg-gray-900 border-t border-gray-800`}>
      <div className="container-base">{children}</div>
    </section>
  )
}

// ─── ContentWrapper ───────────────────────────────────────────────────────
// Narrow content column for editorial text: articles, about, legal.
interface ContentWrapperProps {
  children: ReactNode
  width?: 'narrow' | 'standard' | 'wide'
  center?: boolean
}

const contentWidths = {
  narrow: 'max-w-2xl',
  standard: 'max-w-3xl',
  wide: 'max-w-4xl',
}

export function ContentWrapper({
  children,
  width = 'narrow',
  center = false,
}: ContentWrapperProps) {
  return (
    <div className={`${contentWidths[width]} ${center ? 'mx-auto' : ''}`}>
      {children}
    </div>
  )
}

// ─── CTAWrapper ───────────────────────────────────────────────────────────
// Thin wrapper confirming CTA placement. CTASection (bg-black) handles
// the actual visual. Use this to enforce canonical CTA positioning.
export function CTAWrapper({ children }: { children: ReactNode }) {
  return <div role="complementary" aria-label="Wezwanie do działania">{children}</div>
}

// ─── HeroWrapper ─────────────────────────────────────────────────────────
// Canonical hero section wrapper. Always bg-white, no border-t.
interface HeroWrapperProps {
  children: ReactNode
  size?: 'standard' | 'xl'
  id?: string
}

export function HeroWrapper({
  children,
  size = 'standard',
  id,
}: HeroWrapperProps) {
  const paddingCls = size === 'xl' ? 'py-24 lg:py-36' : 'py-24 lg:py-32'
  return (
    <section id={id} className={`${paddingCls} bg-white`}>
      <div className="container-base">{children}</div>
    </section>
  )
}
