import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAgent } from '../lib/team'
import { formatPrice, fullLocation, imageSrcSet, imageUrl } from '../lib/format'
import { getPropertyBySlug, similarProperties } from '../lib/properties'
import { useScrolled } from '../lib/hooks'
import { useFavorites } from '../lib/FavoritesContext'
import { PropertyGallery } from '../components/PropertyGallery'
import { PropertyCard } from '../components/PropertyCard'
import { InquiryDialog } from '../components/InquiryDialog'
import { Button } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { Area, Bath, Bed, Calendar, Check, Heart, Mail, MapPin, Phone } from '../components/Icons'
import NotFoundPage from './NotFoundPage'

export default function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const [dialog, setDialog] = useState<'viewing' | 'contact' | null>(null)
  const showSticky = useScrolled(560)
  const { isFavorite, toggle } = useFavorites()

  if (!property) return <NotFoundPage />

  const agent = getAgent(property.agentId)
  const saved = isFavorite(property.id)
  const similar = similarProperties(property)

  const specs = [
    { Icon: Bed, label: 'Bedrooms', value: String(property.beds) },
    { Icon: Bath, label: 'Bathrooms', value: String(property.baths) },
    { Icon: Area, label: 'Interior', value: `${property.sqft.toLocaleString('en-US')} sq ft` },
    { Icon: MapPin, label: 'Lot', value: property.lot },
    { Icon: Calendar, label: 'Built', value: String(property.yearBuilt) },
  ]

  const facts = [
    { label: 'Property type', value: property.type },
    { label: 'Status', value: property.status },
    { label: 'Reference', value: property.id },
    { label: 'Price', value: formatPrice(property.price) },
  ]

  return (
    <>
      <article>
        <header className="bg-navy-900 text-white">
          <div className="container-x pt-[124px] pb-12 sm:pt-[152px] sm:pb-16">
            <nav aria-label="Breadcrumb" className="font-display text-[0.6875rem] uppercase tracking-[0.2em] text-white/50">
              <Link to="/properties" className="transition hover:text-champagne">
                All properties
              </Link>
              <span className="mx-2 text-white/25">/</span>
              <span className="text-white/80">{property.name}</span>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <span className="eyebrow">
                  {property.status} · {property.type}
                </span>
                <h1 className="h-display mt-4 text-[clamp(2rem,4.4vw,3.5rem)] text-white">{property.name}</h1>
                <p className="mt-4 inline-flex items-center gap-2 text-[1.0625rem] text-white/70">
                  <MapPin size={18} className="text-champagne" />
                  {fullLocation(property)}
                </p>
                <p className="mt-4 max-w-xl font-display text-[1.0625rem] leading-relaxed text-white/60 italic">
                  {property.tagline}
                </p>
              </div>

              <div className="lg:col-span-4 lg:text-right">
                <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">Guide price</p>
                <p className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-champagne">
                  {formatPrice(property.price)}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 lg:justify-end">
                  <Button variant="champagne" size="sm" onClick={() => setDialog('viewing')}>
                    Schedule viewing
                  </Button>
                  <button
                    type="button"
                    onClick={() => toggle(property.id)}
                    aria-pressed={saved}
                    className="btn btn-sm btn-outline-light"
                  >
                    <Heart size={16} filled={saved} />
                    {saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-x py-[clamp(2.5rem,5vw,4.5rem)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-28">
                <PropertyGallery images={property.images} name={property.name} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3">
                  {specs.map(({ Icon, label, value }) => (
                    <div key={label}>
                      <dt className="inline-flex items-center gap-2 font-display text-[0.625rem] uppercase tracking-[0.2em] text-slate-soft">
                        <Icon size={16} className="text-champagne" />
                        {label}
                      </dt>
                      <dd className="mt-2 font-display text-lg font-semibold tracking-tight text-navy-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={60}>
                <div className="hairline mt-10" />
                <h2 className="h-display mt-8 text-xl text-navy-900">About this residence</h2>
                <p className="mt-4 leading-relaxed text-slate-soft">{property.description}</p>
              </Reveal>

              <Reveal delay={90}>
                <h2 className="h-display mt-10 text-xl text-navy-900">Key features</h2>
                <ul className="mt-5 grid gap-3">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[0.9375rem] text-slate-soft">
                      <Check size={18} className="mt-0.5 shrink-0 text-champagne" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <h2 className="h-display mt-10 text-xl text-navy-900">Amenities</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="rounded-full border border-line px-3.5 py-1.5 font-display text-[0.75rem] tracking-[0.04em] text-navy-900/80"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={140}>
                <div className="card-surface mt-10 p-6">
                  <div className="flex items-center gap-5">
                    <img
                      src={imageUrl(agent.photo, 200)}
                      srcSet={imageSrcSet(agent.photo, [120, 200, 320])}
                      sizes="72px"
                      alt={`Portrait of ${agent.name}`}
                      loading="lazy"
                      decoding="async"
                      className="h-[72px] w-[72px] rounded-full object-cover"
                    />
                    <div>
                      <p className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-champagne">
                        Listing advisor
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold tracking-tight text-navy-900">
                        {agent.name}
                      </p>
                      <p className="text-sm text-slate-soft">{agent.role}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 text-sm text-slate-soft">
                    <a
                      href={`tel:${agent.phone.replace(/[^\d]/g, '')}`}
                      className="inline-flex items-center gap-2 transition hover:text-navy-900"
                    >
                      <Phone size={16} className="text-champagne" />
                      {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex items-center gap-2 transition hover:text-navy-900"
                    >
                      <Mail size={16} className="text-champagne" />
                      {agent.email}
                    </a>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button variant="navy" className="w-full" onClick={() => setDialog('contact')}>
                      Contact agent
                    </Button>
                    <Button variant="outline-dark" className="w-full" onClick={() => setDialog('viewing')}>
                      Schedule a private viewing
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <dl className="mt-10 grid grid-cols-2 gap-y-5 border-t border-line pt-8">
                  {facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-slate-soft">
                        {fact.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-navy-900">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>

        <section className="bg-bone section-y" aria-labelledby="similar-title">
          <div className="container-x">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <Reveal>
                <span className="eyebrow">Curated for you</span>
                <h2 id="similar-title" className="h-display h-section mt-4 text-navy-900">
                  Similar Properties
                </h2>
              </Reveal>
              <Reveal delay={70}>
                <Link to="/properties" className="link-rule">
                  View all properties
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {similar.map((item, index) => (
                <Reveal key={item.id} delay={index * 70}>
                  <PropertyCard property={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </article>

      {/* Mobile enquiry bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur transition-transform duration-500 lg:hidden ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-[clamp(1.25rem,5vw,2rem)] py-3">
          <div>
            <p className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-slate-soft">Guide price</p>
            <p className="font-display text-base font-semibold text-navy-900">{formatPrice(property.price)}</p>
          </div>
          <Button variant="navy" size="sm" onClick={() => setDialog('viewing')}>
            Schedule viewing
          </Button>
        </div>
      </div>

      <InquiryDialog
        open={dialog === 'viewing'}
        onClose={() => setDialog(null)}
        mode="viewing"
        property={property}
      />
      <InquiryDialog
        open={dialog === 'contact'}
        onClose={() => setDialog(null)}
        mode="contact"
        property={property}
      />
    </>
  )
}
