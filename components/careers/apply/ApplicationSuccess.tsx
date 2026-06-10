import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationSuccess - institutional confirmation screen.
//
// Shows: eyebrow / heading / role applied for / next-steps body / back link.
// No emojis. No celebration language. Calm, document-centric.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  eyebrow?: string
  heading: string
  /** "Applied for:" label */
  appliedLabel?: string
  /** Role title displayed after appliedLabel */
  roleName?: string
  body: string
  backLabel?: string
  backHref?: string
}

export function ApplicationSuccess({
  eyebrow,
  heading,
  appliedLabel,
  roleName,
  body,
  backLabel,
  backHref,
}: Props) {
  return (
    <div className="py-10" role="status" aria-live="polite">
      {eyebrow && (
        <p className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gray-400 mb-6">
          {eyebrow}
        </p>
      )}

      <div className="flex items-start gap-5">
        {/* Vertical accent bar */}
        <div className="w-0.5 h-14 bg-gray-900 flex-shrink-0 mt-0.5" aria-hidden="true" />

        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 leading-snug mb-3">
            {heading}
          </h2>

          {/* Role applied for */}
          {appliedLabel && roleName && (
            <p className="text-[13px] text-gray-500 mb-4">
              <span className="text-gray-400">{appliedLabel}:</span>{' '}
              <span className="text-gray-700 font-medium">{roleName}</span>
            </p>
          )}

          <p className="text-[15px] text-gray-500 leading-[1.75]">{body}</p>
        </div>
      </div>

      {/* Back link */}
      {backLabel && backHref && (
        <div className="mt-10">
          <Link
            href={backHref}
            className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors duration-200 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-600"
          >
            ← {backLabel}
          </Link>
        </div>
      )}
    </div>
  )
}
