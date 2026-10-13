import { services } from '../lib/services'
import { imageSrcSet, imageUrl } from '../lib/format'
import { PageMasthead } from '../components/PageMasthead'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { Check } from '../components/Icons'
import { CtaSection } from '../sections/CtaSection'

const SERVICE_IMAGES = [
  '1524758631624-e2822e304c36',
  '1545324418-cc1a3fa10c00',
  '1598928506311-c55ded91a20c',
  '1523575708161-ad0fc2a9b951',
  '1487958449943-2429e8be8625',
  '1470071459604-3b5ec3a7fe05',
]

const process = [
  { step: '01', title: 'Brief', body: 'A conversation about the building, the land and your objectives.' },
  { step: '02', title: 'Position', body: 'Valuation, comparables and a representation strategy in writing.' },
  { step: '03', title: 'Introduce', body: 'Curated introductions from our private and off-market lists.' },
  { step: '04', title: 'Complete', body: 'Negotiation, due diligence and handover, managed end to end.' },
]

export default function ServicesPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Services"
        title="Advisory, end to end"
        intro="Six disciplines delivered by one senior team, from first valuation through to the day you collect the keys."
      />

      <section className="section-y" aria-labelledby="service-list-title">
        <div className="container-x">
          <h2 id="service-list-title" className="sr-only">
            Our services
          </h2>

          <ul className="space-y-16 sm:space-y-24">
            {services.map((service, index) => {
              const reversed = index % 2 === 1
              return (
                <Reveal as="li" key={service.id}>
                  <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : ''}`}>
                      <div className="media media-zoom" data-view-cursor="" style={{ aspectRatio: '4 / 3' }}>
                        <img
                          src={imageUrl(SERVICE_IMAGES[index], 960)}
                          srcSet={imageSrcSet(SERVICE_IMAGES[index], [640, 960, 1280])}
                          sizes="(min-width: 1024px) 46vw, 92vw"
                          alt={`${service.title} — architectural photography`}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : ''}`}>
                      <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em] text-champagne">
                        {service.index}
                      </span>
                      <h3 className="h-display mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] text-navy-900">
                        {service.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-slate-soft">{service.detail}</p>

                      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-soft">
                            <Check size={17} className="mt-0.5 shrink-0 text-champagne" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <Button variant="outline-dark" className="mt-7" to="/contact" withArrow>
                        Discuss {service.title.toLowerCase()}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-bone section-y" aria-labelledby="process-title">
        <div className="container-x">
          <Reveal className="max-w-xl">
            <span className="eyebrow">How we work</span>
            <h2 id="process-title" className="h-display h-section mt-4 text-navy-900">
              A four step engagement
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((item, index) => (
              <Reveal as="li" key={item.step} delay={index * 70} className="border-t border-line pt-6">
                <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em] text-champagne">
                  {item.step}
                </span>
                <h3 className="font-display mt-3 text-lg font-semibold tracking-tight text-navy-900">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-soft">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
