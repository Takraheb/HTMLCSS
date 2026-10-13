import { imageSrcSet, imageUrl } from '../lib/format'
import type { TeamMember } from '../lib/team'
import { LinkedIn, Mail, Phone } from './Icons'

/** Portrait card with a champagne rule that draws in on hover. */
export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group">
      <div className="media media-zoom relative" data-view-cursor="" style={{ aspectRatio: '3 / 4' }}>
        <img
          src={imageUrl(member.photo, 640)}
          srcSet={imageSrcSet(member.photo, [400, 640, 900])}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 82vw"
          alt={`Portrait of ${member.name}, ${member.role} at Horizon Properties`}
          loading="lazy"
          decoding="async"
          className="media-zoom-img"
        />
      </div>

      <div className="pt-5">
        <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">{member.name}</h3>
        <p className="mt-1 font-display text-[0.6875rem] uppercase tracking-[0.2em] text-champagne">{member.role}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-soft">{member.bio}</p>

        <div className="mt-4 flex items-center gap-2">
          <a
            href={`mailto:${member.email}`}
            aria-label={`Email ${member.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <Mail size={16} />
          </a>
          <a
            href={`tel:${member.phone.replace(/[^\d]/g, '')}`}
            aria-label={`Call ${member.name}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900 transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
          >
            <Phone size={16} />
          </a>
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-navy-900/50" aria-hidden="true">
            <LinkedIn size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}
