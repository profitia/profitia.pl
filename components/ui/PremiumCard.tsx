import Link from 'next/link'
import RevealWrapper from './RevealWrapper'

interface Props {
  icon?: React.ReactNode
  title: string
  description: string
  href?: string
  linkLabel?: string
  delay?: 0 | 1 | 2 | 3 | 4
  className?: string
  children?: React.ReactNode
}

/**
 * Standard premium card: border → subtle Corporate Blue tint on hover.
 * Pass href to make the entire card a link (with arrow indicator).
 * Icon should be raw SVG/icon - no background circle, text-gray-400.
 */
export default function PremiumCard({
  icon,
  title,
  description,
  href,
  linkLabel,
  delay = 0,
  className = '',
  children,
}: Props) {
  const inner = (
    <div
      className={`group h-full border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-[rgba(0,109,158,0.03)] hover:border-[rgba(0,109,158,0.18)] hover:shadow-lg ${className}`}
    >
      {icon && (
        <div className="mb-5 text-gray-700 group-hover:text-brand-blue transition-colors">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 transition-colors tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed transition-colors">
        {description}
      </p>
      {children}
      {href && (
        <div className="mt-6 flex items-center gap-1.5 text-sm text-gray-500 group-hover:text-brand-blue transition-colors">
          {linkLabel ?? 'Dowiedz się więcej'}
          <svg
            className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  )

  return (
    <RevealWrapper delay={delay}>
      {href ? (
        <Link href={href} className="block h-full">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </RevealWrapper>
  )
}
