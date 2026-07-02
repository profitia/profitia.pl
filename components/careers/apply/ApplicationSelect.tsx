'use client'

import { FormSelect } from '@/components/forms/FormSelect'
import type { FormSelectProps } from '@/components/forms/FormSelect'

interface Props extends FormSelectProps {
  options: FormSelectProps['options']
}

/**
 * ApplicationSelect - institutional role selector.
 * Derives options dynamically from JOB_POSTS via props - no hardcoding.
 */
export function ApplicationSelect({
  ...props
}: Props) {
  return <FormSelect {...props} />
}
