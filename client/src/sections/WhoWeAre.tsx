import { Link } from 'react-router-dom'
import { imageSrcSet, imageUrl } from '../lib/format'
import { Reveal } from '../components/Reveal'
import { ArrowRight } from '../components/Icons'

const ABOUT_MAIN = '1600585154340-be6161a56a0c'
const ABOUT_DETAIL = '1616486338812-3dadae4b4ace'

/** Asymmetric editorial pairing: text in the negative space of two images. */
export function WhoWeAre() {
  return (
    <section className="section-y bg-white" aria-labelledby="who-we-are-title">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">About Us</span>
              <h2 id="who-we-are-title" className="h-display h-section mt-5 text-navy-900">
                Who We Are
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="lede mt-6 max-w-xl">
                At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity,
                transparency, and client satisfaction are at the heart of everything we do.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap items-center gap-8">
                <Link to="/about" className="btn btn-navy">
                  Learn More
                  <ArrowRight size={16} />
                </Link>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-navy-900">18</span>
                  <span className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-slate-soft">
                    Years advising
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="relative grid grid-cols-12 gap-4 sm:gap-6">
              <Reveal variant="image" className="col-span-8">
                <div className="media media-zoom" data-view-cursor="" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src={imageUrl(ABOUT_MAIN, 960)}
                    srcSet={imageSrcSet(ABOUT_MAIN, [640, 960, 1280])}
                    sizes="(min-width: 1024px) 45vw, 62vw"
                    alt="Modern luxury home with a swimming pool and clean architectural lines"
                    /* eager: a clipped container (see .reveal-img) never triggers lazy loading */
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </Reveal>

              <Reveal variant="image" delay={140} className="col-span-4">
                <div
                  className="media media-zoom h-full translate-y-6 sm:translate-y-10"
                  data-view-cursor=""
                  style={{ minHeight: '100%' }}
                >
                  <img
                    src={imageUrl(ABOUT_DETAIL, 640)}
                    srcSet={imageSrcSet(ABOUT_DETAIL, [400, 640, 900])}
                    sizes="(min-width: 1024px) 22vw, 32vw"
                    alt="Interior detail of a luxury home with marble surfaces and natural light"
                    loading="eager"
                    decoding="async"
                    className="h-full"
                  />
                </div>
              </Reveal>

              <Link
                to="/properties"
                aria-label="Browse our properties"
                className="icon-circle icon-circle--lg absolute left-[calc(66%-31px)] top-1/2 z-10 hidden -translate-y-1/2 border-transparent bg-white shadow-[var(--shadow-soft)] sm:inline-flex"
              >
                <ArrowRight size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
