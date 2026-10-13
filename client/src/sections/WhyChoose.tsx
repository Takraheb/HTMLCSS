import { imageUrl } from '../lib/format'
import { Reveal } from '../components/Reveal'
import { Quote } from '../components/Icons'

const WHY_PHOTO = '1600585154526-990dced4db0d'

const proofPoints = [
  { value: '$1.2B', label: 'Closed residential volume' },
  { value: '480+', label: 'Homes placed with owners' },
  { value: '18', label: 'Years advising private clients' },
  { value: '96%', label: 'Of asking price achieved' },
]

const principles = [
  {
    title: 'Advised by one senior partner',
    body: 'No handovers between departments. The advisor you meet is the advisor who closes.',
  },
  {
    title: 'Discretion as standard',
    body: 'Off-market introductions for owners who prefer their residence not to be published.',
  },
  {
    title: 'Positioned, not just listed',
    body: 'Architectural photography, film and print placement designed around the building itself.',
  },
]

/** Navy interlude: numbers and principles, anchored by one architectural plate. */
export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white" aria-labelledby="why-title">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <img
          src={imageUrl(WHY_PHOTO, 1200)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/30" />
      </div>

      <div className="container-x relative py-[clamp(4.5rem,9vw,8.5rem)]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow text-champagne-200">Why Choose Horizon</span>
              <h2 id="why-title" className="h-display h-section mt-4 text-white">
                A quieter, more considered way to move.
              </h2>
            </Reveal>

            <Reveal delay={90}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/70">
                We take on a limited number of mandates each season so every residence is represented with the
                attention its architecture deserves.
              </p>
            </Reveal>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              {proofPoints.map((point, index) => (
                <Reveal key={point.label} delay={index * 70}>
                  <dt className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-white/50">
                    {point.label}
                  </dt>
                  <dd className="mt-3 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-champagne">
                    {point.value}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <ul className="space-y-0">
              {principles.map((principle, index) => (
                <Reveal as="li" key={principle.title} delay={index * 70} className="border-t border-white/15 py-7">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                    {principle.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/65">{principle.body}</p>
                </Reveal>
              ))}
              <Reveal as="li" delay={210} className="border-t border-white/15 pt-7">
                <blockquote className="flex gap-4">
                  <Quote size={26} className="mt-1 shrink-0 text-champagne" />
                  <p className="max-w-md font-display text-[1.0625rem] leading-relaxed text-white/85">
                    “They understood the house before they understood the market.”
                    <span className="mt-2 block font-sans text-[0.8125rem] uppercase tracking-[0.16em] text-white/45">
                      Private client, Beverly Hills
                    </span>
                  </p>
                </blockquote>
              </Reveal>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
