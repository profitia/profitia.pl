'use client'

/**
 * FormConsent — GDPR-compliant checkbox with custom visual treatment.
 *
 * Accessibility:
 *   - Real <input type="checkbox"> inside label (sr-only, keyboard reachable)
 *   - Custom visual span uses peer-focus-visible for keyboard focus ring
 *   - error message linked via aria-describedby
 *   - role="alert" on error paragraph
 *
 * Visual:
 *   - Custom 18×18px checkbox, rounded-[4px], border-gray-200
 *   - Checked: bg-gray-900 border-gray-900 + SVG checkmark
 *   - Error state: border-red-300
 *   - No shadows, no glow, no color
 */

interface FormConsentProps {
  id: string
  description: string
  required?: boolean
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  privacyHref?: string
  privacyLabel?: string
}

export function FormConsent({
  id,
  description,
  required,
  checked,
  onChange,
  error,
  privacyHref,
  privacyLabel,
}: FormConsentProps) {
  return (
    <div>
      <label htmlFor={id} className="flex gap-3 items-start cursor-pointer select-none">
        {/* Checkbox visual + real input (sibling structure for peer-focus-visible) */}
        <span className="relative mt-[3px] flex-shrink-0 w-[18px] h-[18px]">
          <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={[
              'absolute inset-0 flex items-center justify-center rounded-[4px] border',
              'transition-colors duration-200 ease-out',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-1',
              checked
                ? 'bg-gray-900 border-gray-900'
                : error
                ? 'border-red-300 bg-white'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            {checked && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>

        {/* Description */}
        <span className="text-[13px] text-gray-600 leading-[1.65]">
          {description}
          {privacyHref && privacyLabel && (
            <>
              {' '}
              <a
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-gray-300 hover:text-gray-900 hover:decoration-gray-600 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {privacyLabel}
              </a>
            </>
          )}
          {required && (
            <span className="text-gray-400 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </span>
      </label>

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[12px] text-red-600 pl-[30px]"
        >
          {error}
        </p>
      )}
    </div>
  )
}
