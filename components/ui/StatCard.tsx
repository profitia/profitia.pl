import RevealWrapper from './RevealWrapper'

interface Props {
  value: string
  label: string
  delay?: 0 | 1 | 2 | 3 | 4
  dark?: boolean
  separator?: boolean
}

/**
 * Editorial stat block - no box, no border, just large value + supporting label.
 * Use separator=true to add border-t above (for stacked stat lists).
 * dark=true for use on gray-900/black backgrounds.
 */
export default function StatCard({
  value,
  label,
  delay = 0,
  dark = false,
  separator = false,
}: Props) {
  return (
    <RevealWrapper delay={delay}>
      <div className={separator ? 'pt-10 border-t border-gray-100' : ''}>
        <p
          className={`text-5xl font-semibold tracking-tight mb-3 ${
            dark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {value}
        </p>
        <p
          className={`text-sm leading-relaxed max-w-[240px] ${
            dark ? 'text-gray-400' : 'text-gray-500'
          }`}
        >
          {label}
        </p>
      </div>
    </RevealWrapper>
  )
}
