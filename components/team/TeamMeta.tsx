/**
 * TeamMeta
 * ─────────────────────────────────────────────────────────────
 * Renders name, role, credentials, experience and expertise areas.
 * Used as a sub-unit inside TeamMemberCard and TeamMemberRow.
 *
 * SIZE VARIANTS:
 *   - 'sm'  compact — card context
 *   - 'md'  row context (default)
 *   - 'lg'  featured leadership row
 */

interface TeamMetaProps {
  name: string
  role: string
  credentials?: string
  yearsExperience?: string
  areas?: string[]
  size?: 'sm' | 'md' | 'lg'
  showAreas?: boolean
}

export function TeamMeta({
  name,
  role,
  credentials,
  yearsExperience,
  areas = [],
  size = 'md',
  showAreas = true,
}: TeamMetaProps) {
  const nameCls =
    size === 'lg'
      ? 'text-2xl font-semibold tracking-tight text-gray-900 leading-tight'
      : size === 'md'
      ? 'text-[1.125rem] font-semibold tracking-tight text-gray-900 leading-tight'
      : 'text-base font-semibold tracking-tight text-gray-900 leading-tight'

  const roleCls =
    size === 'lg'
      ? 'text-[10.5px] font-semibold tracking-[0.24em] uppercase text-gray-500 mt-2'
      : 'text-[10px] font-semibold tracking-[0.22em] uppercase text-gray-500 mt-1.5'

  return (
    <div>
      <div className="flex items-baseline gap-2.5">
        <span className={nameCls}>{name}</span>
        {credentials && (
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
            {credentials}
          </span>
        )}
      </div>

      <p className={roleCls}>
        {role}
        {yearsExperience && (
          <span className="ml-3 text-gray-300 font-normal normal-case tracking-normal">
            · {yearsExperience} lat
          </span>
        )}
      </p>

      {showAreas && areas.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {areas.map((area) => (
            <span
              key={area}
              className="text-[10px] font-medium text-gray-500 tracking-[0.06em] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md"
            >
              {area}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
