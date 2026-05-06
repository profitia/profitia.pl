import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/middleware'
import RevealWrapper from './RevealWrapper'

interface Props {
  lang: Locale
  breadcrumb: string
  label: string
  headline: string
  subtitle: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  imageSrc: string
  imageAlt: string
}

export default function HeroSection({
  lang,
  breadcrumb,
  label,
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <section className="bg-brand-primary text-white pt-16 pb-0 overflow-hidden">
      <div className="container-base">
        {/* Breadcrumb */}
        <RevealWrapper>
          <nav className="text-sm text-blue-300 mb-10 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href={`/${lang}`} className="hover:text-white transition-colors duration-200">
              Strona główna
            </Link>
            <span className="text-blue-500">/</span>
            <Link href={`/${lang}/services`} className="hover:text-white transition-colors duration-200">
              Usługi
            </Link>
            <span className="text-blue-500">/</span>
            <span className="text-white">{breadcrumb}</span>
          </nav>
        </RevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          {/* Left: content */}
          <div className="pb-16 lg:pb-24">
            <RevealWrapper delay={1}>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-blue-300 mb-6">
                {label}
              </p>
            </RevealWrapper>
            <RevealWrapper delay={2}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold leading-[1.08] tracking-tight mb-7">
                {headline}
              </h1>
            </RevealWrapper>
            <RevealWrapper delay={3}>
              <p className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg">
                {subtitle}
              </p>
            </RevealWrapper>
            <RevealWrapper delay={4}>
              <div className="flex flex-wrap gap-4">
                <Link href={ctaPrimary.href} className="btn-primary bg-white text-brand-primary hover:bg-brand-light border-0">
                  {ctaPrimary.label}
                </Link>
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-400 text-blue-200 font-medium rounded-lg hover:border-white hover:text-white transition-colors duration-200"
                >
                  {ctaSecondary.label}
                </Link>
              </div>
            </RevealWrapper>
          </div>

          {/* Right: image */}
          <RevealWrapper delay={2} className="relative h-[340px] md:h-[420px] lg:h-[480px] rounded-t-2xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
