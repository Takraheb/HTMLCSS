import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    focusable: false,
    ...props,
  }
}

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)} className={['arrow', p.className].filter(Boolean).join(' ')}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

export const ChevronLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

export const Phone = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16.5 16.5 0 014.5 5.7 2 2 0 016.5 3.5z" />
  </svg>
)

export const Mail = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </svg>
)

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const Bed = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 18v-7h13a5 5 0 015 5v2" />
    <path d="M3 18h18" />
    <path d="M7 11V7h5a4 4 0 014 4" />
  </svg>
)

export const Bath = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12h16v3a4 4 0 01-4 4H8a4 4 0 01-4-4v-3z" />
    <path d="M7 12V6.5A2.5 2.5 0 019.5 4c1.2 0 2 .7 2.3 1.6" />
    <path d="M9.5 7h1.8" />
    <path d="M6.5 19.5l-1 1.5M17.5 19.5l1 1.5" />
  </svg>
)

export const Area = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M8 3.5v4M3.5 8h4M16 20.5v-4M20.5 16h-4" />
  </svg>
)

export const Calendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
  </svg>
)

export const Heart = ({ filled, ...p }: IconProps & { filled?: boolean }) => (
  <svg {...base(p)} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7-4.4-7-9.4A4.1 4.1 0 0112 8.2a4.1 4.1 0 017 2.4c0 5-7 9.4-7 9.4z" />
  </svg>
)

export const Close = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const Menu = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
)

export const Sliders = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 8h9M18 8h1M5 16h3M12 16h7" />
    <circle cx="16" cy="8" r="2" />
    <circle cx="10" cy="16" r="2" />
  </svg>
)

export const Expand = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
  </svg>
)

export const Quote = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 6c-2.5 1.2-4 3.5-4 6.5V18h5v-5H7.5c0-2 .6-3.3 2-4.2z" />
    <path d="M18 6c-2.5 1.2-4 3.5-4 6.5V18h5v-5h-2.5c0-2 .6-3.3 2-4.2z" />
  </svg>
)

/** Circular key-in-house mark used by the closing call to action. */
export const KeyMark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 11.5L12 5l8 6.5" />
    <path d="M6 10.5V19h12v-8.5" />
    <circle cx="12" cy="13.5" r="2.2" />
    <path d="M12 15.7V18" />
  </svg>
)

export const Instagram = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const LinkedIn = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M8 10.5V16M8 7.8v.2M12 16v-3.2a2 2 0 014 0V16" />
  </svg>
)

export const Facebook = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M14.5 8.5h-1.3a1.7 1.7 0 00-1.7 1.7V16M10.2 12h3.6" />
  </svg>
)
