/**
 * PullQuote — Editorial Pull Quote Element
 *
 * Standalone React component for embedding strategic pull quotes
 * within article content via the future CMS / MDX layer.
 *
 * Restrained, editorial — left border rail, italic text.
 * Not decorative. Reserved for high-signal excerpts from the article.
 */

interface PullQuoteProps {
  text: string
  attribution?: string
}

export function PullQuote({ text, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-l-[3px] border-gray-300 pl-6 my-10">
      <p className="text-[17px] italic text-gray-500 leading-[1.8] mb-2">{text}</p>
      {attribution && (
        <cite className="text-[12px] not-italic text-gray-400 tracking-wide">
          {attribution}
        </cite>
      )}
    </blockquote>
  )
}
