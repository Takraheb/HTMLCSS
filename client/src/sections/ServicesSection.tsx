import { Link } from 'react-router-dom'
import { services } from '../lib/services'
import { imageSrcSet, imageUrl } from '../lib/format'
import { Reveal } from '../components/Reveal'
import { ArrowUpRight } from '../components/Icons'

const SERVICES_IMAGE = '1524758631624-e2822e304c36'

/** Numbered editorial list beside one tall architectural plate. */
export function ServicesSection() {
  return (
    <section className="section-y bg-white" aria-labelledby="services-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <span className="eyebrow">Services</span>
              <h2 id="services-title" className="h-display h-section mt-4 text-navy-900">
                A full service, from valuation to keys
              </h2>
              <p className="lede mt-6">
                Six disciplines, one team. Each engagement is led by a senior advisor who stays with you from first
                conversation to completion.
              </p>

              <div className="mt-8 media media-zoom" data-view-cursor="" style={{ aspectRatio: '3 / 4' }}>
                <img
                  src={imageUrl(SERVICES_IMAGE, 900)}
                  srcSet={imageSrcSet(SERVICES_IMAGE, [640, 900, 1280])}
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  alt="Architectural detail of a contemporary residence with stone and glass"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul>
              {services.map((service, index) => (
                <Reveal as="li" key={service.id} delay={index * 60} className="border-t border-line last:border-b">
                  <Link
                    to="/services"
                    className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-7 transition-colors sm:gap-8 sm:py-8"
                  >
                    <span className="font-display text-[0.6875rem] font-semibold tracking-[0.2em] text-champagne">
                      {service.index}
                    </span>
                    <span className="block">
                      <span className="block font-display text-xl font-semibold tracking-tight text-navy-900 sm:text-2xl">
                        {service.title}
                      </span>
                      <span className="mt-2 block max-w-lg text-[0.9375rem] leading-relaxed text-slate-soft">
                        {service.summary}
                      </span>
                      <span className="mt-3 hidden max-w-xl text-[0.9375rem] leading-relaxed text-slate-soft/80 sm:block">
                        {service.detail}
                      </span>
                    </span>
                    <span className="mt-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-navy-950">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
