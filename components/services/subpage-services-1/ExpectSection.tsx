import RevealWrapper from './RevealWrapper'

interface ExpectItem {
  number: string
  headline: string
  description: string
}

interface Props {
  label: string
  headline: string
  items: ExpectItem[]
}

export default function ExpectSection({ label, headline, items }: Props) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-brand-secondary mb-5 text-center">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight tracking-tight mb-16 text-center max-w-2xl mx-auto">
            {headline}
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <RevealWrapper
              key={i}
              delay={((i % 4) as 0 | 1 | 2 | 3 | 4)}
              className="group"
            >
              <div className="h-full p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-secondary mb-5">
                  {item.number}
                </div>
                <h3 className="text-lg font-heading font-semibold text-brand-primary mb-3 leading-snug">
                  {item.headline}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
