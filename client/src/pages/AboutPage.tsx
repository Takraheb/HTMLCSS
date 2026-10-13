import { Link } from 'react-router-dom'
import { properties } from '../lib/properties'
import { team } from '../lib/team'
import { imageSrcSet, imageUrl } from '../lib/format'
import { PageMasthead } from '../components/PageMasthead'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { CtaSection } from '../sections/CtaSection'
import { Check } from '../components/Icons'

const ABOUT_IMAGE = '1512915922686-57c11dde9b6b'
const ABOUT_DETAIL = '1503174971373-b1f69850bded'

const principles = [
  {
    title: 'Integrity first',
    body: 'Honest valuations, complete disclosure and advice that protects your position, not our commission.',
  },
  {
    title: 'Architectural fluency',
    body: 'We represent buildings we understand — materials, provenance, and the architects behind them.',
  },
  {
    title: 'One point of contact',
    body: 'A senior advisor stays with your mandate from first conversation through to completion.',
  },
  {
    title: 'Discretion',
    body: 'Off-market introductions for owners who would rather their residence was not published.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageMasthead
        eyebrow="About Horizon Properties"
        title="Homes with a point of view"
        intro="Founded in Austin and now advising across the United States, Horizon Properties was built on a simple belief: exceptional architecture deserves representation of the same standard."
      />

      <section className="section-y" aria-labelledby="about-story-title">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="media media-zoom" data-view-cursor="" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src={imageUrl(ABOUT_IMAGE, 1100)}
                    srcSet={imageSrcSet(ABOUT_IMAGE, [640, 960, 1280])}
                    sizes="(min-width: 1024px) 48vw, 92vw"
                    alt="Contemporary residence with clean horizontal lines"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </Reveal>
              <Reveal variant="image" delay={120}>
                <div className="media mt-6 ml-auto max-w-md" data-view-cursor="" style={{ aspectRatio: '16 / 10' }}>
                  <img
                    src={imageUrl(ABOUT_DETAIL, 900)}
                    srcSet={imageSrcSet(ABOUT_DETAIL, [560, 900])}
                    sizes="(min-width: 1024px) 34vw, 78vw"
                    alt="Detail of stone and glass on a luxury residence"
                    /* eager: a clipped container (see .reveal-img) never triggers lazy loading */
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <span className="eyebrow">Our story</span>
                <h2 id="about-story-title" className="h-display h-section mt-4 text-navy-900">
                  Eighteen years, one standard
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <div className="mt-6 space-y-5 leading-relaxed text-slate-soft">
                  <p>
                    Horizon Properties began with a single lakeside commission and a conviction that luxury real estate
                    had become transactional. We chose the opposite path: fewer mandates, deeper involvement, and a
                    representation strategy built around the architecture itself.
                  </p>
                  <p>
                    Today we advise private owners, families and investors across {properties.length} active residences
                    in seven markets, with a team of {team.length} specialists covering sales, investment, valuation and
                    relocation.
                  </p>
                  <p>
                    Every relationship starts the same way — a conversation about the building, the land and what you
                    actually want from it.
                  </p>
                </div>
              </Reveal>

              <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <Reveal as="li" key={principle.title} delay={index * 70}>
                    <h3 className="inline-flex items-center gap-2 font-display text-[1.0625rem] font-semibold tracking-tight text-navy-900">
                      <Check size={18} className="text-champagne" />
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-soft">{principle.body}</p>
                  </Reveal>
                ))}
              </ul>

              <Reveal delay={200}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button variant="navy" to="/properties" withArrow>
                    View the collection
                  </Button>
                  <Button variant="outline-dark" to="/contact">
                    Arrange a consultation
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone section-y" aria-labelledby="about-markets-title">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Where we work</span>
            <h2 id="about-markets-title" className="h-display h-section mt-4 text-navy-900">
              Seven markets, one advisory standard
            </h2>
          </Reveal>

          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from(new Set(properties.map((property) => `${property.city}, ${property.state}`))).map((market) => (
              <Reveal as="li" key={market} className="border-t border-line pt-5">
                <span className="font-display text-[0.9375rem] font-medium tracking-tight text-navy-900">{market}</span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <p className="mt-10 text-[0.9375rem] text-slate-soft">
              Looking elsewhere?{' '}
              <Link to="/contact" className="link-rule">
                Ask about off-market availability
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
