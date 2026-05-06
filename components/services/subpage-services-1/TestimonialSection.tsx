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
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container-base">
        <div className="max-w-3xl mx-auto text-center">
          <RevealWrapper>
            {/* Quote mark */}
            <svg
              className="w-10 h-10 text-brand-light mx-auto mb-8"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M10 8H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4l-2 6h4l2-6a2 2 0 0 0 0-1V10a2 2 0 0 0-2-2zm18 0h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4l-2 6h4l2-6a2 2 0 0 0 0-1V10a2 2 0 0 0-2-2z" />
            </svg>

            <blockquote className="text-xl md:text-2xl font-heading font-semibold text-brand-primary leading-relaxed tracking-tight mb-8">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-px bg-gray-300" />
              <div className="text-center">
                <p className="text-sm font-semibold text-brand-dark">{author}</p>
                <p className="text-xs text-gray-500 mt-0.5">{role}</p>
              </div>
              <div className="w-10 h-px bg-gray-300" />
            </div>

            {metric && (
              <div className="mt-12 inline-block px-8 py-5 bg-brand-light border border-blue-200 rounded-xl">
                <p className="text-3xl font-heading font-bold text-brand-primary mb-1">{metric}</p>
                <p className="text-xs text-gray-500">{metricLabel}</p>
              </div>
            )}
          </RevealWrapper>
        </div>
      </div>
    </section>
  )
}
