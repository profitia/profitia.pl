/**
 * HeroMinimal
 * ─────────────────────────────────────────────────────────────────────────
 * Small, compact hero for content pages (blog, case study, insights).
 * Typography-only. No image. Centered or left-aligned.
 *
 * VISUAL RHYTHM:
 *   bg-white → content section below
 */

import { RevealWrapper } from '@/components/ui'

export interface HeroMinimalProps {
  label?: string
  headline: string
  subtitle?: string
  align?: 'left' | 'center'
  breadcrumb?: { label: string; href: string }[]
}

export function HeroMinimal({
  label,
  headline,
  subtitle,
  align = 'left',
  breadcrumb,
}: HeroMinimalProps) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''
  const maxWCls = align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto max-w-7xl px-6">

        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center gap-2 mb-8 text-xs text-gray-400 tracking-wide">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <a href={crumb.href} className="hover:text-gray-900 transition-colors duration-200">
                  {crumb.label}
                </a>
              </span>
            ))}
          </nav>
        )}

        <div className={`${maxWCls}`}>
          <RevealWrapper delay={0}>
            {label && (
              <p className={`label-tag mb-5 ${alignCls}`}>{label}</p>
            )}
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-5 ${alignCls}`}>
              {headline}
            </h1>
            {subtitle && (
              <p className={`text-base text-gray-600 leading-relaxed ${alignCls}`}>
                {subtitle}
              </p>
            )}
          </RevealWrapper>
        </div>

      </div>
    </section>
  )
}
