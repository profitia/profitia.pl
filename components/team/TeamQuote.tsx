/**
 * TeamQuote
 * ─────────────────────────────────────────────────────────────
 * Editorial pull-quote — a company statement, founding philosophy,
 * or mission framing. Large type, restrained border accent.
 *
 * NOT a testimonial widget. NOT a decorative element.
 * USAGE: About page philosophy section, company voice moment.
 */

interface TeamQuoteProps {
  quote: string
  attribution?: string
  role?: string
}

export function TeamQuote({ quote, attribution, role }: TeamQuoteProps) {
  return (
    <figure className="border-l-2 border-gray-200 pl-8 py-2 my-2">
      <blockquote>
        <p className="text-[1.375rem] md:text-[1.5rem] font-semibold tracking-tight text-gray-900 leading-[1.45] max-w-[52ch]">
          {quote}
        </p>
      </blockquote>
      {(attribution || role) && (
        <figcaption className="mt-6 text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-400">
          {attribution}
          {attribution && role && (
            <span className="text-gray-300"> · </span>
          )}
          {role}
        </figcaption>
      )}
    </figure>
  )
}
