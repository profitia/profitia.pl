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
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: content */}
        <div className="flex flex-col justify-center px-6 md:px-10 lg:px-14 py-20 lg:py-0 lg:min-h-[calc(100vh-64px)]">

          <RevealWrapper>
            <nav
              className="flex items-center gap-2 text-xs text-gray-400 mb-10"
              aria-label="Breadcrumb"
            >
              <Link href={`/${lang}`} className="hover:text-gray-600 transition-colors duration-200">
                Strona główna
              </Link>
              <span>/</span>
              <Link href={`/${lang}/services`} className="hover:text-gray-600 transition-colors duration-200">
                Usługi
              </Link>
              <span>/</span>
              <span className="text-gray-600">{breadcrumb}</span>
            </nav>
          </RevealWrapper>

          <RevealWrapper delay={1}>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-6">
              {label}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={2}>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.08] mb-7 max-w-lg">
              {headline}
            </h1>
          </RevealWrapper>

          <RevealWrapper delay={3}>
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-md">
              {subtitle}
            </p>
          </RevealWrapper>

          <RevealWrapper delay={4}>
            <div className="flex flex-wrap gap-3">
              <Link
                href={ctaPrimary.href}
                className="inline-block bg-black text-white rounded-xl px-6 py-3.5 font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
              >
                {ctaPrimary.label}
              </Link>
              <Link
                href={ctaSecondary.href}
                className="inline-block border border-gray-300 text-gray-700 rounded-xl px-6 py-3.5 font-medium text-sm hover:border-gray-900 hover:text-gray-900 transition-colors duration-200"
              >
                {ctaSecondary.label}
              </Link>
            </div>
          </RevealWrapper>
        </div>

        {/* Right: image — full bleed, cinematic */}
        <RevealWrapper
          delay={2}
          className="relative w-full h-[60vh] lg:h-[calc(100vh-64px)] overflow-hidden"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
        </RevealWrapper>

      </div>
    </section>
  )
}
