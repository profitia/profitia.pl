'use client'

import { useRef } from 'react'
import { CV_ALLOWED_EXTENSIONS } from '@/lib/careers/application'

interface Props {
  id: string
  label: string
  required?: boolean
  disabled?: boolean
  error?: string
  value: File | null
  onChange: (file: File | null) => void
  hint?: string
}

/**
 * ApplicationUpload - institutional document upload row.
 *
 * Visual: small bordered row - document-oriented, not a drag-and-drop zone.
 * No animated states. No colorful UI. No giant drop areas.
 * Feels like attaching a file to a professional email.
 */
export function ApplicationUpload({
  id,
  label,
  required,
  disabled,
  error,
  value,
  onChange,
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onChange(file)
  }

  const handleClear = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label
        className="block text-[11px] font-semibold tracking-[0.18em] uppercase text-gray-500 mb-2"
      >
        {label}
        {required && (
          <span className="text-gray-400 ml-1" aria-hidden="true">*</span>
        )}
      </label>

      {/* Document row - minimal, institutional */}
      <div
        className={[
          'border rounded-xl px-5 py-4 flex items-center justify-between gap-4',
          'transition-colors duration-200',
          error ? 'border-red-200' : 'border-gray-200',
        ].join(' ')}
      >
        {value ? (
          /* File selected state */
          <>
            <div className="min-w-0">
              <p className="text-[14px] text-gray-900 font-medium truncate">
                {value.name}
              </p>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {(value.size / 1024 / 1024).toFixed(1)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="flex-shrink-0 text-[12px] text-gray-400 hover:text-gray-700 transition-colors duration-200 whitespace-nowrap"
            >
              Usuń / Remove
            </button>
          </>
        ) : (
          /* Empty state */
          <>
            <p className="text-[14px] text-gray-400">
              {hint ?? 'PDF · max 10 MB'}
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="flex-shrink-0 text-[12px] text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 whitespace-nowrap underline underline-offset-4 decoration-gray-300 hover:decoration-gray-600"
            >
              Wybierz plik / Choose file
            </button>
          </>
        )}
      </div>

      {/* Hidden native file input */}
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={CV_ALLOWED_EXTENSIONS}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="sr-only"
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12px] text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
