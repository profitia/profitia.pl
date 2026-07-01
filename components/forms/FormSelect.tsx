'use client'

/**
 * FormSelect - controlled select with custom chevron and institutional styling.
 * appearance-none removes native arrow; replaced with a custom SVG chevron.
 */

const SELECT_BASE = [
  'w-full border rounded-xl px-4 py-3 pr-10',
  'text-[15px] bg-white appearance-none',
  'transition-colors duration-200 ease-out',
  'focus:outline-none',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ')

interface SelectOption {
  readonly value: string
  readonly label: string
}

interface FormSelectProps {
  id: string
  label: string
  options: ReadonlyArray<SelectOption>
  required?: boolean
  disabled?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
}

export function FormSelect({
  id,
  label,
  options,
  required,
  disabled,
  error,
  value,
  onChange,
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-2"
      >
        {label}
        {required && (
          <span className="text-gray-400 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${SELECT_BASE} ${value === '' ? 'text-gray-400' : 'text-gray-900'} ${
            error
              ? 'border-red-200 focus:border-red-300'
                : 'border-gray-200 focus:border-brand-blue'
          }`}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron - pointer-events-none so it doesn't block select clicks */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5"
          aria-hidden="true"
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="#485E88"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
