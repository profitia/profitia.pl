import RevealWrapper from './RevealWrapper'

interface StatItem {
  value: string
  label: string
}

interface Props {
  label: string
  headline: string
  paragraphs: string[]
  stats: StatItem[]
}

export default function OverviewSection({ label, headline, paragraphs, stats }: Props) {
  return (
    <section className="py-28 bg-white border-t border-gray-100">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: text */}
          <div>
            <RevealWrapper>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400 mb-5">
                {label}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 leading-tight mb-10">
                {headline}
              </h2>
            </RevealWrapper>
            <div className="space-y-5">
              {paragraphs.map((text, i) => (
                <RevealWrapper key={i} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </RevealWrapper>
              ))}
            </div>
          </div>

          {/* Right: editorial stats — no heavy box */}
          <div className="space-y-10 lg:pt-16">
            {stats.map((stat, i) => (
              <RevealWrapper key={i} delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}>
                <div className={i > 0 ? 'pt-10 border-t border-gray-100' : ''}>
                  <p className="text-5xl font-semibold tracking-tight text-gray-900 mb-3">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
                    {stat.label}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
