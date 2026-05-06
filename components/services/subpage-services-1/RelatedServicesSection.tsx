import Link from 'next/link'
import type { Locale } from '@/middleware'
import RevealWrapper from './RevealWrapper'

interface ServiceCard {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

interface Props {
  lang: Locale
  label: string
  headline: string
  services: ServiceCard[]
}

export default function RelatedServicesSection({ label, headline, services }: Props) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-brand-secondary mb-5 text-center">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight tracking-tight mb-16 text-center">
            {headline}
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <RevealWrapper key={i} delay={((i + 1) as 1 | 2 | 3)}>
              <Link
                href={service.href}
                className="group block h-full p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-light text-brand-secondary mb-5 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200">
                  {service.icon}
                </div>
                <h3 className="text-lg font-heading font-semibold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.description}</p>
                <span className="text-sm font-medium text-brand-secondary group-hover:text-brand-primary transition-colors duration-200 flex items-center gap-1">
                  Dowiedz się więcej
                  <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
