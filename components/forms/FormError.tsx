/**
 * FormError - calm inline error block.
 *
 * Shown below the form on submission failure.
 * Restrained red palette. No modal, no explosion, no retry badge.
 */

interface FormErrorProps {
  eyebrow?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
}

export function FormError({ eyebrow, message, onRetry, retryLabel }: FormErrorProps) {
  return (
    <div
      className="border-l-2 border-red-200 pl-4 py-0.5"
      role="alert"
      aria-live="polite"
    >
      {eyebrow && (
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-red-500 mb-1.5">
          {eyebrow}
        </p>
      )}
      <p className="text-[13px] text-gray-600 leading-[1.65]">{message}</p>
      {onRetry && retryLabel && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-[11px] font-semibold tracking-[0.16em] uppercase text-gray-500 hover:text-brand-blue transition-colors duration-200 ease-out"
        >
          {retryLabel}
        </button>
      )}
    </div>
  )
}
