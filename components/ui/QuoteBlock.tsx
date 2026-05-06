interface Props {
  quote: string
  author: string
  role: string
  metric?: string
  metricLabel?: string
}

/**
 * Editorial testimonial quote block.
 * Designed for use inside a dark section (bg-gray-900 or bg-[#242F44]).
 */
export default function QuoteBlock({ quote, author, role, metric, metricLabel }: Props) {
  return (
    <div className="max-w-3xl">
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
    </div>
  )
}
