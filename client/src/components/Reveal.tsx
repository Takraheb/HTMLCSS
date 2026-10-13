import type { ElementType, ReactNode } from 'react'
import { cx } from '../lib/format'
import { useReveal } from '../lib/hooks'

interface RevealProps {
  children: ReactNode
  className?: string
  /**
   * `image` runs the clip-path shutter reveal instead of the fade/rise.
   *
   * Images inside this variant must use `loading="eager"`: while the container
   * is clipped to zero height the browser never considers the image visible, so
   * a lazy image would stay unloaded and the plate would open onto nothing.
   * They sit just below the hero, so loading them eagerly is cheap.
   */
  variant?: 'fade' | 'image'
  delay?: number
  as?: ElementType
}

export function Reveal({ children, className, variant = 'fade', delay = 0, as }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const { ref, visible } = useReveal<HTMLDivElement>()

  if (variant === 'image') {
    // The clip lives on an inner element, never on the observed one: a clipped
    // target reports zero intersection in Chrome, so observing it directly would
    // leave the shutter permanently shut.
    return (
      <Tag ref={ref} className={className}>
        <div className={cx('reveal-img h-full', visible && 'is-visible')} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
          {children}
        </div>
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cx('reveal', visible && 'is-visible', className)}
    >
      {children}
    </Tag>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  intro?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <span className={cx('eyebrow', tone === 'light' && 'text-champagne-200')}>{eyebrow}</span>
        <h2
          id={id}
          className={cx('h-display h-section mt-4', tone === 'light' ? 'text-white' : 'text-navy-900')}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={80}>
          <p className={cx('lede mt-5', tone === 'light' && 'text-white/72')}>{intro}</p>
        </Reveal>
      ) : null}
    </div>
  )
}
