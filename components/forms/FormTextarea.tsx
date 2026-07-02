'use client'

/**
 * FormTextarea - controlled textarea with character counter and institutional styling.
 */

const TEXTAREA_BASE = [
  'w-full border rounded-xl px-4 py-3',
  'text-[15px] text-gray-900 placeholder:text-gray-300',
  'bg-white resize-none transition-colors duration-200 ease-out',
  'focus:outline-none',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ')

interface FormTextareaProps {
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
  hint?: string
}

export type { FormTextareaProps }

export function FormTextarea({
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
  hint,
}: FormTextareaProps) {
  const describedBy = [
    hint && !error ? `${id}-hint` : '',
    error ? `${id}-error` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={id}
          className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500"
        >
          {label}
          {required && (
            <span className="text-gray-400 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {maxLength && (
          <span className="text-[11px] text-gray-300 tabular-nums" aria-hidden="true">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
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
        aria-describedby={describedBy || undefined}
        className={`${TEXTAREA_BASE} ${
          error
            ? 'border-red-200 focus:border-red-300'
            : 'border-gray-200 focus:border-brand-blue'
        }`}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-gray-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
