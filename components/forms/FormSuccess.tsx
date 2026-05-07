/**
 * FormSuccess — editorial success confirmation block.
 *
 * Institutional tone: calm, reassuring, specific.
 * NOT: "Thanks 🎉" — YES: "Zapytanie zostało wysłane."
 *
 * Visual: vertical accent bar + eyebrow + heading + body.
 */

interface FormSuccessProps {
  eyebrow?: string
  heading: string
  body: string
}

export function FormSuccess({ eyebrow, heading, body }: FormSuccessProps) {
  return (
    <div className="py-10" role="status" aria-live="polite">
      {eyebrow && (
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-6">
          {eyebrow}
        </p>
      )}
      <div className="flex items-start gap-5">
        {/* Vertical accent bar */}
        <div
          className="w-0.5 h-14 bg-gray-900 flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug mb-3">
            {heading}
          </h2>
          <p className="text-[15px] text-gray-500 leading-[1.75]">{body}</p>
        </div>
      </div>
    </div>
  )
}
