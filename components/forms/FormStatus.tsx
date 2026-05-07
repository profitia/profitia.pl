import type { ReactNode } from 'react'
import type { FormSubmitState } from '@/lib/forms/types'

/**
 * FormStatus — conditionally renders form content or success slot.
 * Used to swap out the form after successful submission.
 */

interface FormStatusProps {
  state: FormSubmitState
  /** The form content (shown when idle, submitting, or error). */
  children: ReactNode
  /** Shown when state === 'success'. */
  successSlot: ReactNode
}

export function FormStatus({ state, children, successSlot }: FormStatusProps) {
  if (state === 'success') return <>{successSlot}</>
  return <>{children}</>
}
