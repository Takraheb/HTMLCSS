import { Link } from 'react-router-dom'
import { featuredProperties } from '../lib/properties'
import { PropertyCarousel } from '../components/PropertyCarousel'
import { Reveal } from '../components/Reveal'
import { ArrowRight } from '../components/Icons'

export function FeaturedProperties() {
  const featured = featuredProperties()

  return (
    <section className="section-y bg-bone" aria-labelledby="featured-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <span className="eyebrow">Featured</span>
            <h2 id="featured-title" className="h-display h-section mt-4 text-navy-900">
              Featured Properties
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link to="/properties" className="link-rule">
              View all properties
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12">
          <PropertyCarousel properties={featured} label="Featured properties" emphasisFirst />
        </div>
      </div>
    </section>
  )
}
