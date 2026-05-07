import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
  eyebrow: string
  title: string
  subtitle?: string
  /**
   * Controls pacing and subtitle width.
   * services - commanding pause, terse subtitle (strategic manifesto)
   * education - expansive subtitle, academy cadence
   * default - neutral
   */
  variant?: 'services' | 'education'
}

/**
 * CapabilityHero
 * ─────────────────────────────────────────────────────────────
 * Canonical editorial hero for listing pages (Services, Education).
 * Variant controls pacing - not visual language.
 */
export default function CapabilityHero({ eyebrow, title, subtitle, variant }: Props) {
  // Services: commanding opening statement - more top gravity, terse subtitle
  // Education: current pacing, wider subtitle (expansive academy statement)
  const section = variant === 'services'
    ? 'pt-28 pb-24 border-b border-gray-100'
    : 'pt-20 pb-16 border-b border-gray-100'

  const subtitleMaxW = variant === 'services'
    ? 'max-w-[22rem]'
    : variant === 'education'
    ? 'max-w-[42rem]'
    : 'max-w-[36rem]'

  return (
    <section className={section}>
      <div className="container-base">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-10">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-[42rem] mb-10">
          {title}
        </h1>
        {subtitle && (
          <p className={`text-lg text-gray-500 leading-relaxed ${subtitleMaxW}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
