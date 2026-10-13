import { PageMasthead } from '../components/PageMasthead'
import { EnquiryForm } from '../components/EnquiryForm'
import { Reveal } from '../components/Reveal'
import { imageSrcSet, imageUrl } from '../lib/format'
import { OFFICE_PHONE } from '../components/Header'
import { Mail, MapPin, Phone } from '../components/Icons'

const OFFICE_IMAGE = '1497366754035-f200968a6e72'

const offices = [
  { city: 'Austin', address: '410 W 2nd Street, Suite 900, TX 78701', phone: OFFICE_PHONE },
  { city: 'Malibu', address: '22800 Pacific Coast Highway, CA 90265', phone: '(555) 246-7894' },
  { city: 'Beverly Hills', address: '9601 Wilshire Boulevard, CA 90210', phone: '(555) 246-7895' },
]

export default function ContactPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Contact"
        title="Start a conversation"
        intro="Tell us what you are looking for — a home, an investment, or a valuation — and the right advisor will reply within one business day."
      />

      <section className="section-y" aria-labelledby="contact-form-title">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 id="contact-form-title" className="h-display h-section text-navy-900">
                  Talk to Horizon
                </h2>
                <p className="lede mt-5">
                  Prefer to speak directly? Call the office or email the team — we answer enquiries in the order they
                  arrive, with no call centre in between.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <ul className="mt-9 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-champagne">
                      <Phone size={18} />
                    </span>
                    <span>
                      <span className="block font-display text-[0.6875rem] uppercase tracking-[0.2em] text-slate-soft">
                        Telephone
                      </span>
                      <a
                        href={`tel:${OFFICE_PHONE.replace(/[^\d]/g, '')}`}
                        className="mt-1 block font-display text-lg font-semibold tracking-tight text-navy-900 transition hover:text-champagne"
                      >
                        {OFFICE_PHONE}
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-champagne">
                      <Mail size={18} />
                    </span>
                    <span>
                      <span className="block font-display text-[0.6875rem] uppercase tracking-[0.2em] text-slate-soft">
                        Email
                      </span>
                      <a
                        href="mailto:hello@horizonproperties.com"
                        className="mt-1 block font-display text-lg font-semibold tracking-tight text-navy-900 transition hover:text-champagne"
                      >
                        hello@horizonproperties.com
                      </a>
                    </span>
                  </li>
                </ul>
              </Reveal>

              <Reveal delay={140}>
                <div className="media mt-9" data-view-cursor="" style={{ aspectRatio: '16 / 10' }}>
                  <img
                    src={imageUrl(OFFICE_IMAGE, 900)}
                    srcSet={imageSrcSet(OFFICE_IMAGE, [640, 900, 1280])}
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    alt="Calm, architectural office interior used for client consultations"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </Reveal>

              <Reveal delay={180}>
                <ul className="mt-9 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
                  {offices.map((office) => (
                    <li key={office.city}>
                      <span className="inline-flex items-center gap-2 font-display text-[0.875rem] font-semibold tracking-tight text-navy-900">
                        <MapPin size={16} className="text-champagne" />
                        {office.city}
                      </span>
                      <address className="mt-2 text-[0.875rem] leading-relaxed text-slate-soft not-italic">
                        {office.address}
                      </address>
                      <a
                        href={`tel:${office.phone.replace(/[^\d]/g, '')}`}
                        className="mt-2 block text-[0.875rem] text-slate-soft transition hover:text-navy-900"
                      >
                        {office.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <div className="card-surface p-6 sm:p-9">
                  <span className="eyebrow">Enquiry</span>
                  <h3 className="h-display mt-3 text-2xl text-navy-900">Send us a message</h3>
                  <p className="mt-3 text-[0.9375rem] text-slate-soft">
                    Fields marked required help us route your enquiry to the right advisor.
                  </p>
                  <div className="mt-8">
                    <EnquiryForm mode="contact" />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={90}>
                <p className="mt-6 text-[0.8125rem] leading-relaxed text-slate-soft">
                  By sending an enquiry you agree to be contacted about your search. We never share your details with
                  third parties.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
