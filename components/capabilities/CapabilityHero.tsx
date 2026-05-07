import type { Locale } from '@/lib/capabilities'

interface Props {
  locale: Locale
  eyebrow: string
  title: string
  subtitle?: string
}

/**
 * CapabilityHero
 * ─────────────────────────────────────────────────────────────
 * Canonical editorial hero for listing pages (Services, Education).
 * Narrow manifesto width, cinematic spacing.
 * No illustrations, no icons, no badges.
 */
export default function CapabilityHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className="pt-20 pb-16 border-b border-gray-100">
      <div className="container-base">
        <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-8">
          {eyebrow}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-gray-900 leading-[1.08] max-w-[42rem] mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-500 leading-relaxed max-w-[36rem]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
