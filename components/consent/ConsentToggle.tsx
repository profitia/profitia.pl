'use client'

/**
 * ConsentToggle - Accessible Category Toggle
 *
 * WCAG 2.1 AA compliant toggle switch with:
 * - role="switch" + aria-checked for screen readers
 * - Keyboard: Enter / Space to toggle
 * - Visual locked state for required categories
 * - Canonical Profitia interaction timing
 */

interface ConsentToggleProps {
  id: string
  enabled: boolean
  required?: boolean
  onChange: (enabled: boolean) => void
}

export function ConsentToggle({ id, enabled, required = false, onChange }: ConsentToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={enabled}
      disabled={required}
      onClick={() => !required && onChange(!enabled)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !required) {
          e.preventDefault()
          onChange(!enabled)
        }
      }}
      className={[
        'relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full',
        'transition-colors duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        enabled ? 'bg-gray-900' : 'bg-gray-200',
        required ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      <span className="sr-only">{enabled ? 'Włączone' : 'Wyłączone'}</span>
      <span
        aria-hidden="true"
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm',
          'transition-transform duration-200 ease-out',
          enabled ? 'translate-x-5' : 'translate-x-0.5',
        ].join(' ')}
      />
    </button>
  )
}
