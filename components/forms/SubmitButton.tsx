'use client'

/**
 * SubmitButton - canonical submit button with loading state.
 *
 * Loading: restrained spinner (border-top white on transparent ring),
 * no brand colors, no bouncing animations.
 * Disabled: opacity-40 - no layout shift.
 */

interface SubmitButtonProps {
  label: string
  loadingLabel?: string
  isSubmitting?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

export function SubmitButton({
  label,
  loadingLabel,
  isSubmitting,
  disabled,
  fullWidth,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      aria-busy={isSubmitting}
      className={[
        fullWidth ? 'w-full' : '',
        'inline-flex items-center justify-center gap-2.5',
        'px-8 py-3.5 bg-gray-900 text-white',
        'text-[13px] font-semibold tracking-[0.06em]',
        'rounded-xl',
        'transition-colors duration-200 ease-out',
        'hover:bg-brand-blue',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isSubmitting ? (
        <>
          <span
            className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin flex-shrink-0"
            aria-hidden="true"
          />
          {loadingLabel ?? label}
        </>
      ) : (
        label
      )}
    </button>
  )
}
