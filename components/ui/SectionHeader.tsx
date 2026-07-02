import RevealWrapper from './RevealWrapper'
import LabelTag from './LabelTag'

interface Props {
  label?: string
  headline: string
  body?: string
  align?: 'left' | 'center'
  className?: string
  maxWidth?: string
  dark?: boolean
}

/**
 * Standard section opener: label → headline → optional body.
 * Used at the top of every content section.
 * align='center' for CTA and testimonial sections.
 * dark=true for sections with dark background.
 */
export default function SectionHeader({
  label,
  headline,
  body,
  align = 'left',
  className = '',
  maxWidth = 'max-w-xl',
  dark = false,
}: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  const labelColor = dark ? 'text-gray-500' : 'text-gray-400'
  const headlineColor = dark ? 'text-white' : 'text-gray-900'
  const bodyColor = dark ? 'text-gray-400' : 'text-gray-600'

  return (
    <RevealWrapper className={`${maxWidth} ${alignClass} ${className}`.trim()}>
      {label && (
        <LabelTag dark={dark} className={`mb-5 ${align === 'center' ? 'text-center' : ''}`}>
          {label}
        </LabelTag>
      )}
      <h2 className={`text-3xl md:text-4xl font-semibold tracking-tight ${headlineColor} leading-tight mb-6`}>
        {headline}
      </h2>
      {body && (
        <p className={`${bodyColor} leading-relaxed`}>
          {body}
        </p>
      )}
    </RevealWrapper>
  )
}
