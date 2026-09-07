import Image from 'next/image'
import type { Locale } from '@/lib/capabilities'
import { RevealWrapper } from '@/components/ui'
import MobileHeroImage from '@/components/ui/MobileHeroImage'

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
      <section className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)]">
        <div className="container-base relative z-10 py-16 lg:py-10 2xl:py-20 lg:min-h-[calc(100vh-140px)] 2xl:min-h-[calc(100vh-80px)] lg:flex lg:flex-col lg:justify-center">
          <RevealWrapper delay={0} className="lg:max-w-[52%] lg:pr-16">
            <div className="space-y-8 md:space-y-5 2xl:space-y-8">
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-[rgba(0,109,158,0.8)]">
                {eyebrow}
              </p>
              <h1 className="font-semibold text-[rgb(36,47,68)] tracking-[-0.05em] leading-[1.02] text-[2.5rem] sm:text-[3rem] md:text-[2.85rem] lg:text-[3.05rem] 2xl:text-[3.9rem]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-[0.92rem] lg:text-[0.96rem] 2xl:text-lg text-[rgb(59,56,56)] leading-relaxed md:leading-[1.55] 2xl:leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </RevealWrapper>
        </div>

        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%]" aria-hidden="true">
          <Image
            src="/images/website/Profitia_10.jpg"
            alt="Profitia services advisory hero"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
        </div>

        <MobileHeroImage
          src="/images/website/Profitia_10.jpg"
          alt="Profitia services advisory hero"
          priority
          overlayClassName="bg-gradient-to-l from-black/40 to-transparent"
        />
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
