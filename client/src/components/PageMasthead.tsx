import type { ReactNode } from 'react'

interface PageMastheadProps {
  eyebrow: string
  title: string
  intro?: string
  children?: ReactNode
}

/** Navy band that opens every interior page, clearing the fixed header. */
export function PageMasthead({ eyebrow, title, intro, children }: PageMastheadProps) {
  return (
    <section className="bg-navy-900 text-white">
      <div className="container-x pt-[128px] pb-14 sm:pt-[160px] sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="h-display h-page mt-4 text-white">{title}</h1>
          </div>
          {intro ? (
            <div className="lg:col-span-5">
              <div className="hairline hairline--champagne mb-5 hidden lg:block" />
              <p className="text-[1.0625rem] leading-relaxed text-white/70">{intro}</p>
            </div>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
