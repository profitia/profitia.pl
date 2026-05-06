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
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-16 max-w-xl">
            {headline}
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {items.map((item, i) => (
            <RevealWrapper key={i} delay={Math.min(i % 3, 4) as 0 | 1 | 2 | 3 | 4}>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-0.5 text-gray-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1.5 tracking-tight">
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
