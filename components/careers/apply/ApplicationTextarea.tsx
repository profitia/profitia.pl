'use client'

interface Props {
  id: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  rows?: number
  maxLength?: number
}

/**
 * ApplicationTextarea - institutional multi-line input.
 * No resize handle on y-axis. Minimal styling.
 */
export function ApplicationTextarea({
  id,
  label,
  placeholder,
  required,
  disabled,
  error,
  value,
  onChange,
  rows = 5,
  maxLength,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-2"
      >
        {label}
        {required && (
          <span className="text-gray-400 ml-1" aria-hidden="true">*</span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          'w-full border rounded-xl px-4 py-3 resize-none',
          'text-[15px] text-gray-900 placeholder:text-gray-300',
          'bg-white transition-colors duration-200 ease-out',
          'focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-200 focus:border-red-300'
            : 'border-gray-200 focus:border-gray-400',
        ].join(' ')}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
