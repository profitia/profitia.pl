'use client'

// ─────────────────────────────────────────────────────────────────────────────
// ApplicationRadio - institutional radio group for yes/no and multi-choice
// questions in the recruitment application form.
//
// Styling is consistent with ApplicationField and ApplicationSelect:
// small uppercase label, minimal borders, no glow, no shadows.
// ─────────────────────────────────────────────────────────────────────────────

interface RadioOption {
  value: string
  label: string
}

interface Props {
  id: string
  label: string
  required?: boolean
  disabled?: boolean
  error?: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  /** 'inline' = horizontal wrap (Tak/Nie, 2-3 short options)
   *  'stack'  = vertical list (options with descriptions)
   *  Default: 'stack' */
  layout?: 'inline' | 'stack'
}

export function ApplicationRadio({
  id,
  label,
  required,
  disabled,
  error,
  options,
  value,
  onChange,
  layout = 'stack',
}: Props) {
  return (
    <div>
      {/* Field label */}
      <p
        id={`${id}-label`}
        className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-3"
      >
        {label}
        {required && (
          <span className="text-gray-400 ml-1" aria-hidden="true">*</span>
        )}
      </p>

      {/* Options */}
      <div
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={layout === 'inline' ? 'flex flex-wrap gap-x-6 gap-y-3' : 'flex flex-col gap-y-3'}
      >
        {options.map((opt) => {
          const isChecked = value === opt.value
          return (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              {/* Custom radio circle */}
              <span className="relative flex-shrink-0 w-[18px] h-[18px]">
                <input
                  type="radio"
                  name={id}
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => onChange(opt.value)}
                  disabled={disabled}
                  className="peer sr-only"
                />
                {/* Outer ring */}
                <span
                  aria-hidden="true"
                  className={[
                    'absolute inset-0 rounded-full border transition-colors duration-200 ease-out',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-gray-400 peer-focus-visible:ring-offset-1',
                    isChecked
                      ? 'border-gray-900 bg-gray-900'
                      : error
                      ? 'border-red-300 bg-white'
                      : 'border-gray-200 bg-white',
                    disabled ? 'opacity-50' : '',
                  ].join(' ')}
                />
                {/* Inner dot */}
                {isChecked && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-[4px] rounded-full bg-white"
                  />
                )}
              </span>

              {/* Option label */}
              <span
                className={[
                  'text-[14px] leading-snug',
                  disabled ? 'opacity-50' : '',
                  isChecked ? 'text-gray-900' : 'text-gray-600',
                ].join(' ')}
              >
                {opt.label}
              </span>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
