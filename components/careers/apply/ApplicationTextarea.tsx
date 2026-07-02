'use client'

import { FormTextarea } from '@/components/forms/FormTextarea'
import type { FormTextareaProps } from '@/components/forms/FormTextarea'

type Props = Omit<FormTextareaProps, 'hint'>

/**
 * ApplicationTextarea - institutional multi-line input.
 * No resize handle on y-axis. Minimal styling.
 */
export function ApplicationTextarea({
  ...props
}: Props) {
  return <FormTextarea {...props} />
}
