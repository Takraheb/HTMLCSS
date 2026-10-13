import { team } from '../lib/team'
import { PageMasthead } from '../components/PageMasthead'
import { TeamCard } from '../components/TeamCard'
import { Reveal } from '../components/Reveal'
import { CtaSection } from '../sections/CtaSection'

export default function TeamPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Team"
        title="Advisors, not agents"
        intro="Four specialists, each responsible for a small number of mandates at any time."
      />

      <section className="section-y" aria-labelledby="team-grid-title">
        <div className="container-x">
          <h2 id="team-grid-title" className="sr-only">
            Meet the team
          </h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {team.map((member, index) => (
              <Reveal key={member.id} delay={index * 80}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
