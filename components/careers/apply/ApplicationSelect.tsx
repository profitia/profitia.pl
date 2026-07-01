'use client'

interface SelectOption {
  value: string
  label: string
}

interface Props {
  id: string
  label: string
  required?: boolean
  disabled?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
}

/**
 * ApplicationSelect - institutional role selector.
 * Derives options dynamically from JOB_POSTS via props - no hardcoding.
 */
export function ApplicationSelect({
  id,
  label,
  required,
  disabled,
  error,
  value,
  onChange,
  options,
  placeholder,
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
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={[
          'w-full border rounded-xl px-4 py-3 appearance-none',
          'text-[15px] text-gray-900 bg-white',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' fill=\'none\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%239ca3af\' stroke-width=\'1.5\' stroke-linecap=\'round\'/%3E%3C/svg%3E")]',
          'bg-no-repeat bg-[right_1rem_center]',
          'transition-colors duration-200 ease-out focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-200 focus:border-red-300'
            : 'border-gray-200 focus:border-brand-blue',
        ].join(' ')}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
