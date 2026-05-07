import type { Capability, Locale } from '@/lib/capabilities'
import { t } from '@/lib/capabilities'

interface Props {
  capability: Capability
  locale: Locale
}

/**
 * CapabilityMeta - eyebrow + category badge.
 * Minimal, institutional. Used inside hero and detail sections.
 */
export default function CapabilityMeta({ capability, locale }: Props) {
  return (
    <p className="text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
      {t(capability.eyebrow, locale)}
    </p>
  )
}
