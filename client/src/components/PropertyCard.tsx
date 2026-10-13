import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, fullLocation, imageSrcSet, imageUrl } from '../lib/format'
import type { Property } from '../lib/types'
import { useFavorites } from '../lib/FavoritesContext'
import { Area, Bath, Bed, Heart, MapPin } from './Icons'

interface PropertyCardProps {
  property: Property
  /** Featured cards are larger and carry the status chip. */
  emphasis?: boolean
  priority?: boolean
  className?: string
}

export function PropertyCard({ property, emphasis = false, priority = false, className }: PropertyCardProps) {
  const { isFavorite, toggle } = useFavorites()
  const saved = isFavorite(property.id)
  const [imageLoaded, setImageLoaded] = useState(false)
  const hero = property.images[0]

  return (
    <article className={`group relative flex h-full flex-col ${className ?? ''}`}>
      <div
        className="media media-zoom relative"
        data-view-cursor=""
        style={{ aspectRatio: emphasis ? '4 / 5' : '3 / 4' }}
      >
        <img
          src={imageUrl(hero.photo, emphasis ? 960 : 720)}
          srcSet={imageSrcSet(hero.photo, emphasis ? [640, 960, 1280] : [480, 720, 960])}
          sizes={emphasis ? '(min-width: 1024px) 30vw, 78vw' : '(min-width: 1024px) 22vw, 62vw'}
          alt={hero.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={imageLoaded ? 'opacity-100' : 'opacity-0'}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/92 px-3 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy-900 backdrop-blur">
            {property.type}
          </span>
          {property.status !== 'For Sale' ? (
            <span className="rounded-full bg-champagne px-3 py-1 font-display text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy-950">
              {property.status}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggle(property.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${property.name} from saved homes` : `Save ${property.name}`}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-navy-950/35 text-white backdrop-blur transition hover:bg-white hover:text-navy-900"
        >
          <Heart size={17} filled={saved} />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <p className="font-display text-[1.0625rem] font-semibold tracking-[0.02em] text-white">
            {formatPrice(property.price)}
          </p>
          <span className="translate-y-2 font-display text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white">
            View →
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
          <Link to={`/properties/${property.slug}`} className="after:absolute after:inset-0">
            {property.name}
          </Link>
        </h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-soft">
          <MapPin size={15} className="text-champagne" />
          {fullLocation(property)}
        </p>

        <div className="mt-4 flex items-center gap-5 border-t border-line pt-4 font-display text-[0.75rem] tracking-[0.03em] text-slate-soft">
          <span className="inline-flex items-center gap-1.5">
            <Bed size={16} className="text-navy-900/40" />
            {property.beds} bd
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Bath size={16} className="text-navy-900/40" />
            {property.baths} ba
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Area size={16} className="text-navy-900/40" />
            {property.sqft.toLocaleString('en-US')} sq ft
          </span>
        </div>
      </div>
    </article>
  )
}
