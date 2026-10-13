import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitInquiry } from '../lib/api'
import { navItems, OFFICE_PHONE } from './Header'
import { services } from '../lib/services'
import { Logo } from './Logo'
import { ArrowRight, Check, Facebook, Instagram, LinkedIn, Mail, MapPin, Phone } from './Icons'

const OFFICE_ADDRESS = '410 W 2nd Street, Suite 900, Austin, Texas 78701'
const OFFICE_EMAIL = 'hello@horizonproperties.com'

export function Footer() {
  const [newsletter, setNewsletter] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function onSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setNewsletter('sending')
    const result = await submitInquiry({
      type: 'newsletter',
      email: String(data.get('email') ?? ''),
    })
    setNewsletter(result.ok ? 'sent' : 'error')
  }

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/65">
              Horizon Properties represents exceptional homes and considered investments across the United States,
              pairing architecture with the people who will live with it.
            </p>

            <div className="mt-7 flex items-center gap-2">
              {[
                { label: 'Instagram', Icon: Instagram },
                { label: 'LinkedIn', Icon: LinkedIn },
                { label: 'Facebook', Icon: Facebook },
              ].map(({ label, Icon }) => (
                <a
                  key={label}
                  href="https://example.com"
                  aria-label={`Horizon Properties on ${label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-champagne hover:text-champagne"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-champagne">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.9375rem] text-white/70 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/saved" className="text-[0.9375rem] text-white/70 transition hover:text-white">
                  Saved Homes
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-champagne">
              Services
            </h2>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-[0.9375rem] text-white/70 transition hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h2 className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-champagne">
              Office
            </h2>
            <ul className="mt-5 space-y-4 text-[0.9375rem] text-white/70">
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 text-champagne" />
                <a href={`tel:${OFFICE_PHONE.replace(/[^\d]/g, '')}`} className="transition hover:text-white">
                  {OFFICE_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 text-champagne" />
                <a href={`mailto:${OFFICE_EMAIL}`} className="transition hover:text-white">
                  {OFFICE_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 text-champagne" />
                <address className="not-italic">{OFFICE_ADDRESS}</address>
              </li>
            </ul>

            <form className="mt-8" onSubmit={onSubscribe}>
              <label className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-champagne" htmlFor="newsletter-email">
                Private listings letter
              </label>
              {newsletter === 'sent' ? (
                <p className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] text-white/80">
                  <Check size={18} className="text-champagne" />
                  You are on the list. New residences arrive monthly.
                </p>
              ) : (
                <>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <input
                      id="newsletter-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="field border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    />
                    <button
                      type="submit"
                      disabled={newsletter === 'sending'}
                      className="btn btn-champagne btn-sm shrink-0"
                    >
                      {newsletter === 'sending' ? 'Joining…' : 'Subscribe'}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  {newsletter === 'error' ? (
                    <p role="alert" className="mt-3 text-xs text-champagne-200">
                      We could not add you just now — please try again.
                    </p>
                  ) : null}
                </>
              )}
            </form>
          </div>
        </div>

        <div className="hairline hairline--light mt-14" />

        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[0.6875rem] tracking-[0.18em] text-white/40 uppercase">
            © {new Date().getFullYear()} Horizon Properties. All rights reserved.
          </p>
          <p className="font-display text-[0.6875rem] tracking-[0.18em] text-white/40 uppercase">
            Austin · Malibu · Beverly Hills · Scottsdale
          </p>
        </div>
      </div>
    </footer>
  )
}
