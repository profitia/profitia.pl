interface Props {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

/**
 * Section label tag - caps, tracked, small.
 * dark=true for use on dark backgrounds (gray-900, black).
 */
export default function LabelTag({ children, className = '', dark = false }: Props) {
  const color = dark ? 'text-gray-500' : 'text-gray-400'
  return (
    <p className={`text-xs font-medium tracking-[0.25em] uppercase ${color} ${className}`.trim()}>
      {children}
    </p>
  )
}
