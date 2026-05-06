import RevealWrapper from './RevealWrapper'

interface Props {
  quote: string
  author: string
  role: string
  metric?: string
  metricLabel?: string
}

export default function TestimonialSection({ quote, author, role, metric, metricLabel }: Props) {
  return (
    <section className="py-28 bg-gray-900 text-white border-t border-gray-800">
      <div className="container-base">
        <div className="max-w-3xl">
          <RevealWrapper>
            <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-500 mb-12">
              Opinia klienta
            </p>

            <blockquote className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-white mb-10">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-5">
              <div className="w-8 h-px bg-gray-700" />
              <div>
                <p className="text-sm font-medium text-white">{author}</p>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
            </div>

            {metric && (
              <div className="mt-16 pt-12 border-t border-gray-800 flex items-baseline gap-5">
                <p className="text-5xl font-semibold tracking-tight text-white">{metric}</p>
                <p className="text-sm text-gray-400 max-w-[200px] leading-relaxed">{metricLabel}</p>
              </div>
            )}
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
