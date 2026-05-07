import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'primary-dark' | 'secondary-dark' | 'brand'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const VARIANTS: Record<Variant, string> = {
  'primary':        'bg-black text-white hover:bg-gray-800',
  'secondary':      'border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900',
  'primary-dark':   'bg-white text-black hover:bg-gray-100',
  'secondary-dark': 'border border-gray-700 text-gray-300 hover:border-gray-400 hover:text-white',
  'brand':          'text-white',
}

const SIZES: Record<Size, string> = {
  'sm': 'px-4 py-2.5 text-xs',
  'md': 'px-6 py-3.5 text-sm',
  'lg': 'px-8 py-4 text-base',
}

const BRAND_BG = { backgroundColor: '#242F44' } as const

/**
 * Unified button/link component for all Profitia UI contexts.
 * Renders as <Link> when href is provided, otherwise as <button>.
 *
 * Variants:
 *   primary       - bg-black (light sections)
 *   secondary     - border-gray-300 outline (light sections)
 *   primary-dark  - bg-white (dark/black sections)
 *   secondary-dark- border-gray-700 outline (dark/black sections)
 *   brand         - bg-[#242F44] → hover:#006D9E (high-brand moments)
 */
export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: Props) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200'
  const isBrand = variant === 'brand'
  const classes = `${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        style={isBrand ? BRAND_BG : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      style={isBrand ? BRAND_BG : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
