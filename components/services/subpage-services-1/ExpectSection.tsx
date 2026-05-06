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
    <section className="py-28 bg-gray-50 border-t border-gray-100">
      <div className="container-base">
        <RevealWrapper>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-16 max-w-xl">
            {headline}
          </h2>
        </RevealWrapper>

        {/* 2×2 grid — landing page proof section style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <RevealWrapper key={i} delay={Math.min(i % 4, 4) as 0 | 1 | 2 | 3 | 4}>
              <div className="group bg-white p-10 hover:bg-gray-900 transition-all duration-300 cursor-default h-full">
                <div className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-500 mb-6 transition-colors">
                  {item.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white mb-3 transition-colors tracking-tight">
                  {item.headline}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">
                  {item.description}
                </p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
