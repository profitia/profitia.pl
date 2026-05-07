'use client'

interface Props {
  id: string
  description: string
  required?: boolean
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
}

/**
 * ApplicationConsent — GDPR checkbox with institutional styling.
 * Each consent is its own instance — never combined.
 * Matches existing FormConsent visual contract exactly.
 */
export function ApplicationConsent({
  id,
  description,
  required,
  checked,
  onChange,
  error,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="flex gap-3 items-start cursor-pointer select-none">
        {/* Custom checkbox */}
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
              error
                ? checked
                  ? 'bg-gray-900 border-gray-900'
                  : 'border-red-300 bg-white'
                : checked
                ? 'bg-gray-900 border-gray-900'
                : 'border-gray-200 bg-white',
            ].join(' ')}
          >
            {checked && (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 3.5L3.8 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </span>

        {/* Description text */}
        <span className="text-[13px] text-gray-500 leading-[1.65]">
          {description}
          {required && (
            <span className="text-gray-400 ml-1" aria-hidden="true">*</span>
          )}
        </span>
      </label>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[12px] text-red-600 pl-[26px]">
          {error}
        </p>
      )}
    </div>
  )
}
