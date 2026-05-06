import RevealWrapper from './RevealWrapper'

interface FocusItem {
  icon: React.ReactNode
  headline: string
  description: string
}

interface Props {
  label: string
  headline: string
  items: FocusItem[]
}

export default function FocusAreasSection({ label, headline, items }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-brand-secondary mb-5">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight tracking-tight mb-16 max-w-xl">
            {headline}
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {items.map((item, i) => (
            <RevealWrapper key={i} delay={((i % 3) as 0 | 1 | 2 | 3 | 4)}>
              <div className="flex gap-5 items-start group">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-brand-light text-brand-secondary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-heading font-semibold text-brand-primary mb-1.5">
                    {item.headline}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
