/**
 * CTAInline
 * ─────────────────────────────────────────────────────────────────────────
 * Embedded CTA block. Can be placed inside content flow.
 * Bordered card style, not a full-width section.
 *
 * USAGE: Inside editorial content, service descriptions, between paragraphs.
 */

import Link from 'next/link'
import { RevealWrapper } from '@/components/ui'

export interface CTAInlineProps {
  headline: string
  body?: string
  cta: { label: string; href: string }
  variant?: 'bordered' | 'filled'
}

export function CTAInline({
  headline,
  body,
  cta,
  variant = 'bordered',
}: CTAInlineProps) {
  const wrapperCls =
    variant === 'filled'
      ? 'bg-gray-900 rounded-2xl p-8 md:p-10'
      : 'border border-gray-200 rounded-2xl p-8 md:p-10 bg-white'

  const headlineCls = variant === 'filled' ? 'text-white' : 'text-gray-900'
  const bodyCls = variant === 'filled' ? 'text-gray-400' : 'text-gray-600'
  const btnCls = variant === 'filled' ? 'btn-primary-dark' : 'btn-primary'

  return (
    <RevealWrapper delay={0}>
      <div className={wrapperCls}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-lg">
            <h3 className={`text-xl font-semibold tracking-tight leading-snug ${headlineCls}`}>
              {headline}
            </h3>
            {body && (
              <p className={`mt-2 text-sm leading-relaxed ${bodyCls}`}>{body}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <Link href={cta.href} className={btnCls}>
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </RevealWrapper>
  )
}
