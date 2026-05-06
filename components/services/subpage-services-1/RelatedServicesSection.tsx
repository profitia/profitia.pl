import Link from 'next/link'
import RevealWrapper from './RevealWrapper'

interface ServiceCard {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

interface Props {
  label: string
  headline: string
  services: ServiceCard[]
}

export default function RelatedServicesSection({ label, headline, services }: Props) {
  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-16">
            {headline}
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <RevealWrapper key={i} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
              <Link
                href={service.href}
                className="group block h-full border border-gray-200 rounded-xl p-8 transition-all duration-300 hover:bg-gray-900 hover:border-gray-900 hover:shadow-lg"
              >
                <div className="mb-5 text-gray-400 group-hover:text-gray-500 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-300 leading-relaxed transition-colors mb-6">
                  {service.description}
                </p>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors flex items-center gap-1.5">
                  Dowiedz się więcej
                  <svg
                    className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
