interface Props {
  children: React.ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
}

/**
 * Structural compatibility wrapper.
 *
 * Scroll entrance is owned canonically by SectionRevealController so that a
 * section, rather than each card or column inside it, moves as one visual unit.
 */
export default function RevealWrapper({ children, className = '', delay = 0 }: Props) {
  void delay
  return <div className={className}>{children}</div>
}
