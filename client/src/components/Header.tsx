import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { cx } from '../lib/format'
import { useScrolled, useScrollLock } from '../lib/hooks'
import { useFavorites } from '../lib/FavoritesContext'
import { Logo } from './Logo'
import { Button } from './Button'
import { Close, Heart, Menu, Phone } from './Icons'

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const OFFICE_PHONE = '(555) 246-7890'

export function Header() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { favorites } = useFavorites()

  // Pages start with a navy masthead, so the header stays transparent until scroll.
  const overlay = !scrolled

  useScrollLock(open)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header
        className={cx('site-header', !overlay && 'site-header--solid')}
        data-open={open ? 'true' : undefined}
      >
        <div className="container-x">
          <div className="flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
            <Logo tone={overlay ? 'light' : 'dark'} />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cx(
                          'nav-link',
                          overlay ? 'text-white/85 hover:text-white' : 'text-navy-900/85 hover:text-navy-900',
                          isActive && (overlay ? 'text-white' : 'text-navy-900'),
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/saved"
                className={cx(
                  'relative hidden h-11 w-11 items-center justify-center rounded-full border transition sm:inline-flex',
                  overlay
                    ? 'border-white/40 text-white hover:border-white hover:bg-white/10'
                    : 'border-navy-900/20 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white',
                )}
                aria-label={`Saved properties${favorites.length ? ` (${favorites.length})` : ''}`}
              >
                <Heart size={18} filled={favorites.length > 0} />
                {favorites.length > 0 ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-champagne px-1 font-display text-[0.625rem] font-bold text-navy-950">
                    {favorites.length}
                  </span>
                ) : null}
              </Link>

              <Button
                href={`tel:${OFFICE_PHONE.replace(/[^\d]/g, '')}`}
                variant={overlay ? 'outline-light' : 'outline-dark'}
                size="sm"
                className="hidden md:inline-flex"
              >
                <Phone size={15} />
                {OFFICE_PHONE}
              </Button>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={cx(
                  'inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden',
                  open
                    ? 'border-white/40 text-white'
                    : overlay
                      ? 'border-white/40 text-white'
                      : 'border-navy-900/20 text-navy-900',
                )}
              >
                {open ? <Close size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / tablet panel */}
      <div
        id="mobile-menu"
        className={cx(
          // `invisible` (not just transparent) so the closed panel cannot bleed
          // over the page or take focus.
          'fixed inset-0 z-50 transition-[opacity,visibility] duration-500 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        aria-hidden={open ? undefined : true}
      >
        <div className="absolute inset-0 bg-navy-950" />
        <div
          className={cx(
            'relative flex h-full flex-col justify-between px-[clamp(1.25rem,5vw,3rem)] pb-10 pt-[84px] transition-transform duration-500',
            open ? 'translate-y-0' : '-translate-y-6',
          )}
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item, index) => (
                <li key={item.to} className="border-b border-white/10">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    style={{ transitionDelay: open ? `${80 + index * 45}ms` : '0ms' }}
                    className={({ isActive }) =>
                      cx(
                        'flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight transition-all duration-500',
                        open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
                        isActive ? 'text-champagne' : 'text-white',
                      )
                    }
                  >
                    {item.label}
                    <span className="font-display text-[0.625rem] tracking-[0.3em] text-white/35">
                      0{index + 1}
                    </span>
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/saved"
                  className="flex items-center justify-between py-4 font-display text-2xl font-medium tracking-tight text-white"
                >
                  Saved Homes
                  {favorites.length > 0 ? (
                    <span className="rounded-full bg-champagne px-2 py-0.5 font-display text-[0.6875rem] font-bold text-navy-950">
                      {favorites.length}
                    </span>
                  ) : (
                    <span className="font-display text-[0.625rem] tracking-[0.3em] text-white/35">07</span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="space-y-5">
            <div className="hairline hairline--light" />
            <Button href={`tel:${OFFICE_PHONE.replace(/[^\d]/g, '')}`} variant="outline-light" className="w-full">
              <Phone size={15} />
              {OFFICE_PHONE}
            </Button>
            <p className="font-display text-[0.6875rem] tracking-[0.24em] text-white/40 uppercase">
              Austin · Malibu · Beverly Hills
            </p>
          </div>
        </div>

      </div>
    </>
  )
}
