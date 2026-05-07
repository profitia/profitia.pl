/**
 * PullQuote - Editorial Pull Quote Element
 *
 * Standalone React component for embedding strategic pull quotes
 * within article content via the future CMS / MDX layer.
 *
 * Restrained, editorial - left border rail, italic text.
 * Not decorative. Reserved for high-signal excerpts from the article.
 */

interface PullQuoteProps {
  text: string
  attribution?: string
}

export function PullQuote({ text, attribution }: PullQuoteProps) {
  return (
    <blockquote className="border-l-[3px] border-gray-300 pl-7 my-14">
      <p className="text-[18px] italic text-gray-500 leading-[1.85] mb-2">{text}</p>
      {attribution && (
        <cite className="text-[12px] not-italic text-gray-500 tracking-wide">
          {attribution}
        </cite>
      )}
    </blockquote>
  )
}
