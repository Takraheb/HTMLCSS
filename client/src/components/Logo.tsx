import { Link } from 'react-router-dom'
import { cx } from '../lib/format'

interface LogoProps {
  /** `light` sits over the hero image, `dark` on the solid header/footer. */
  tone?: 'light' | 'dark'
  className?: string
  asLink?: boolean
}

/** Minimal architectural mark: a champagne line roof over two piers. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 20L20 9l12 11" stroke="#C5A059" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 18.5V31h15V18.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M20 31V24" stroke="#C5A059" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M4 33.5h32" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className, asLink = true }: LogoProps) {
  const content = (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <LogoMark className={tone === 'light' ? 'text-white' : 'text-navy-900'} />
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'font-display text-[0.95rem] font-semibold tracking-[0.24em]',
            tone === 'light' ? 'text-white' : 'text-navy-900',
          )}
        >
          HORIZON
        </span>
        <span
          className={cx(
            'font-display text-[0.6rem] font-medium tracking-[0.42em]',
            tone === 'light' ? 'text-white/70' : 'text-slate-soft',
          )}
        >
          PROPERTIES
        </span>
      </span>
    </span>
  )

  if (!asLink) return content

  return (
    <Link to="/" aria-label="Horizon Properties — home" className="inline-flex">
      {content}
    </Link>
  )
}
