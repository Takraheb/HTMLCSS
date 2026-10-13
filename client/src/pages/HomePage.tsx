import { Hero } from '../sections/Hero'
import { WhoWeAre } from '../sections/WhoWeAre'
import { FeaturedProperties } from '../sections/FeaturedProperties'
import { ServicesSection } from '../sections/ServicesSection'
import { WhyChoose } from '../sections/WhyChoose'
import { TeamSection } from '../sections/TeamSection'
import { CtaSection } from '../sections/CtaSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <ServicesSection />
      <WhyChoose />
      <TeamSection />
      <CtaSection />
    </>
  )
}
