'use client'

const INPUT_BASE = [
  'w-full border rounded-xl px-4 py-3',
  'text-[15px] text-gray-900 placeholder:text-gray-300',
  'bg-white transition-colors duration-200 ease-out',
  'focus:outline-none',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ')

interface Props {
  id: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  autoComplete?: string
}

/**
 * ApplicationField - institutional text input for the recruitment form.
 * Identical styling contract to FormField - minimal, no glow, no shadow.
 */
export function ApplicationField({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  disabled,
  error,
  value,
  onChange,
  autoComplete,
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
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${INPUT_BASE} ${
          error
            ? 'border-red-200 focus:border-red-300'
            : 'border-gray-200 focus:border-brand-blue'
        }`}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
