import Image from 'next/image'
import type { Locale } from '@/lib/capabilities'
import { RevealWrapper } from '@/components/ui'

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
  if (variant === 'services') {
    return (
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-auto md:h-[calc(100vh-140px)] 2xl:h-[calc(100vh-80px)] px-6 md:px-12">
            <div className="flex h-full max-w-xl flex-col justify-center py-16 md:py-10 2xl:py-20">
              <RevealWrapper delay={0}>
                <div className="space-y-8 md:space-y-5 2xl:space-y-8">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
                    {eyebrow}
                  </p>
                  <h1 className="font-semibold text-gray-900 tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem] max-w-xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-gray-600 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed max-w-lg">
                      {subtitle}
                    </p>
                  )}
                </div>
              </RevealWrapper>
            </div>
          </div>

          <RevealWrapper delay={1} className="relative w-full h-[60vh] md:h-[calc(100vh-140px)] 2xl:h-[calc(100vh-80px)] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80"
              alt="Profitia services advisory hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
          </RevealWrapper>
        </div>
      </section>
    )
  }

  // Education/default: current pacing, wider subtitle for academy-style statement.
  const section = 'pt-20 pb-16 border-b border-gray-100'

  const subtitleMaxW = variant === 'education'
    ? 'max-w-[42rem]'
    : 'max-w-[36rem]'

  return (
    <section className={section}>
      <div className="container-base">
        <RevealWrapper delay={0}>
          <div className="space-y-8 md:space-y-5 2xl:space-y-8">
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
              {eyebrow}
            </p>
            <h1 className="font-semibold text-gray-900 tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem] max-w-[42rem]">
              {title}
            </h1>
            {subtitle && (
              <p className={`text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-gray-500 leading-relaxed md:leading-[1.55] 2xl:leading-relaxed ${subtitleMaxW}`}>
                {subtitle}
              </p>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
}
