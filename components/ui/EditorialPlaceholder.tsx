/**
 * EditorialPlaceholder
 * ─────────────────────────────────────────────────────────────────────────
 * A premium, intentional image placeholder — NOT a gray box.
 * Used during content development before photography is ready.
 *
 * Design rules:
 * - Cinematic aspect ratios (16/9, 4/3, 3/2, 1/1)
 * - Subtle gradient with noise texture feel
 * - Optional label in the center (e.g. "Hero — 1600×900")
 * - Intentionally premium — could pass for editorial art direction
 *
 * Usage:
 *   <EditorialPlaceholder aspect="16/9" label="Brand story moment" />
 *   <EditorialPlaceholder aspect="square" size="sm" />
 */

interface EditorialPlaceholderProps {
  /** Aspect ratio of the placeholder */
  aspect?: '16/9' | '4/3' | '3/2' | '1/1' | 'square' | 'portrait'
  /** Optional descriptive label shown in the center */
  label?: string
  /** Width hint — controls max-width when used inline */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /** Additional classes */
  className?: string
  /** Alt-style: 'subtle' (light) | 'deep' (dark) | 'warm' */
  tone?: 'subtle' | 'deep' | 'warm'
}

const aspectMap: Record<NonNullable<EditorialPlaceholderProps['aspect']>, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  'square': 'aspect-square',
  'portrait': 'aspect-[3/4]',
}

const sizeMap: Record<NonNullable<EditorialPlaceholderProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  full: 'w-full',
}

const toneMap: Record<NonNullable<EditorialPlaceholderProps['tone']>, string> = {
  subtle: 'from-gray-100 via-gray-50 to-gray-200',
  deep: 'from-gray-800 via-gray-900 to-gray-700',
  warm: 'from-stone-100 via-amber-50 to-stone-200',
}

const labelColorMap: Record<NonNullable<EditorialPlaceholderProps['tone']>, string> = {
  subtle: 'text-gray-400',
  deep: 'text-gray-500',
  warm: 'text-stone-400',
}

export default function EditorialPlaceholder({
  aspect = '16/9',
  label,
  size = 'full',
  className = '',
  tone = 'subtle',
}: EditorialPlaceholderProps) {
  const aspectCls = aspectMap[aspect]
  const sizeCls = sizeMap[size]
  const toneCls = toneMap[tone]
  const labelCls = labelColorMap[tone]

  return (
    <div
      className={`${sizeCls} ${className}`}
      role="img"
      aria-label={label ?? 'Placeholder obrazu'}
    >
      <div className={`relative w-full ${aspectCls} overflow-hidden rounded-2xl`}>
        {/* Gradient base */}
        <div className={`absolute inset-0 bg-gradient-to-br ${toneCls}`} />

        {/* Subtle diagonal lines — creates texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Center label */}
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs tracking-[0.15em] uppercase font-medium ${labelCls} select-none`}>
              {label}
            </span>
          </div>
        )}

        {/* Corner mark — art direction cue */}
        <div className={`absolute bottom-3 right-3 text-[10px] tracking-widest uppercase ${labelCls} opacity-50 select-none font-mono`}>
          {aspect === '16/9' ? '16:9' : aspect === 'portrait' ? '3:4' : aspect.replace('/', ':')}
        </div>
      </div>
    </div>
  )
}
