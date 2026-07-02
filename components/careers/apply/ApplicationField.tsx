'use client'

import { FormField } from '@/components/forms/FormField'
import type { FormFieldProps } from '@/components/forms/FormField'

interface Props extends FormFieldProps {
  type?: 'text' | 'email' | 'tel' | 'url'
}

/**
 * ApplicationField - institutional text input for the recruitment form.
 * Identical styling contract to FormField - minimal, no glow, no shadow.
 */
export function ApplicationField({
  ...props
}: Props) {
  return <FormField {...props} />
}
