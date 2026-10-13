import { imageSrcSet, imageUrl } from '../lib/format'

const HERO_PHOTO = '1568605114967-8130f3a36994'

/**
 * "Blue Hour" hero: full-bleed architectural photography, headline set in two
 * rising lines, copy fading in beneath. The header sits inside the image's sky.
 */
export function Hero() {
  return (
    <section
      className="relative flex min-h-[92svh] items-start justify-center overflow-hidden bg-navy-950 pt-[132px] sm:pt-[168px]"
      aria-labelledby="hero-title"
    >
      <div className="hero-media">
        <img
          src={imageUrl(HERO_PHOTO, 1920)}
          srcSet={imageSrcSet(HERO_PHOTO, [960, 1440, 1920, 2560])}
          sizes="100vw"
          alt="Modern luxury villa at blue hour, floor-to-ceiling glass glowing with warm interior light beneath a deep evening sky"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 hero-scrim" />
      </div>

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="fade-in-up block font-display text-[0.6875rem] font-semibold uppercase tracking-[0.34em] text-champagne-200"
            style={{ animationDelay: '120ms' }}
          >
            Horizon Properties
          </span>

          <h1
            id="hero-title"
            className="h-display mt-6 text-white"
            style={{ fontSize: 'clamp(2.4rem, 6.2vw, 5.15rem)', lineHeight: 1.04 }}
          >
            <span className="hero-line">
              <span style={{ animationDelay: '200ms' }}>Discover Exceptional</span>
            </span>
            <span className="hero-line">
              <span style={{ animationDelay: '320ms' }}>Homes &amp; Investments</span>
            </span>
          </h1>

          <p
            className="fade-in-up mx-auto mt-7 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80 sm:text-[1.125rem]"
            style={{ animationDelay: '560ms' }}
          >
            Premium properties in prime locations. Find your dream home or the perfect investment with confidence.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-x pb-10">
          <div className="flex items-end justify-between gap-6">
            <p
              className="fade-in-up hidden font-display text-[0.6875rem] uppercase tracking-[0.24em] text-white/55 sm:block"
              style={{ animationDelay: '720ms' }}
            >
              Austin · Malibu · Beverly Hills
            </p>
            <div
              className="fade-in-up mx-auto flex flex-col items-center gap-3 sm:mx-0"
              style={{ animationDelay: '720ms' }}
            >
              <span className="font-display text-[0.625rem] uppercase tracking-[0.3em] text-white/60">Scroll</span>
              <span className="h-12 w-px bg-gradient-to-b from-champagne to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
