import { Link } from 'react-router-dom'
import { team } from '../lib/team'
import { TeamCard } from '../components/TeamCard'
import { Reveal } from '../components/Reveal'
import { ArrowRight } from '../components/Icons'

export function TeamSection() {
  return (
    <section className="section-y bg-bone" aria-labelledby="team-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-xl">
            <span className="eyebrow">Team</span>
            <h2 id="team-title" className="h-display h-section mt-4 text-navy-900">
              The people behind the keys
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link to="/team" className="link-rule">
              Meet the full team
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {team.map((member, index) => (
            <Reveal key={member.id} delay={index * 80}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
