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
    <section className="py-24 bg-white">
      <div className="container-base">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: text */}
          <div>
            <RevealWrapper>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-brand-secondary mb-5">
                {label}
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary leading-tight tracking-tight mb-8">
                {headline}
              </h2>
            </RevealWrapper>
            <div className="space-y-5">
              {paragraphs.map((text, i) => (
                <RevealWrapper key={i} delay={((i + 1) as 1 | 2 | 3) > 3 ? 3 : ((i + 1) as 1 | 2 | 3)}>
                  <p className="text-gray-600 leading-relaxed">{text}</p>
                </RevealWrapper>
              ))}
            </div>
          </div>

          {/* Right: stat box */}
          <RevealWrapper delay={2}>
            <div className="bg-brand-light border border-blue-200 rounded-2xl p-8 space-y-8">
              {stats.map((stat, i) => (
                <div key={i} className={i > 0 ? 'pt-8 border-t border-blue-200' : ''}>
                  <p className="text-4xl font-heading font-bold text-brand-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
          </RevealWrapper>

        </div>
      </div>
    </section>
  )
}
