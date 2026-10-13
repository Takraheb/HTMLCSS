import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { ArrowRight, KeyMark } from '../components/Icons'

export function CtaSection() {
  return (
    <section className="bg-mist" aria-labelledby="cta-title">
      <div className="container-x py-[clamp(3rem,6vw,4.75rem)]">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
          <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy-900 text-champagne">
            <KeyMark size={28} />
          </span>

          <div className="flex-1">
            <h2 id="cta-title" className="h-display text-[clamp(1.5rem,2.6vw,2.25rem)] text-navy-900">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-slate-soft">
              Let our experts guide you to the right home or investment.
            </p>
          </div>

          <Link to="/contact" className="btn btn-navy shrink-0">
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
