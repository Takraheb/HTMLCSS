import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '../lib/format'
import { ArrowRight } from './Icons'

type Variant = 'navy' | 'outline-dark' | 'outline-light' | 'champagne'
type Size = 'md' | 'sm'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  withArrow?: boolean
}

interface ButtonAsLink extends CommonProps {
  to: string
  href?: never
  onClick?: never
  type?: never
  disabled?: never
}

interface ButtonAsAnchor extends CommonProps {
  href: string
  to?: never
  onClick?: never
  type?: never
  disabled?: never
}

interface ButtonAsButton extends CommonProps {
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  to?: never
  href?: never
}

type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton

const variantClass: Record<Variant, string> = {
  navy: 'btn-navy',
  'outline-dark': 'btn-outline-dark',
  'outline-light': 'btn-outline-light',
  champagne: 'btn-champagne',
}

/**
 * One button for the whole site: renders a router link, an external anchor or a
 * real <button> so no control is ever a non-interactive lookalike.
 */
export function Button(props: ButtonProps) {
  const { children, variant = 'navy', size = 'md', className, withArrow = false } = props
  const classes = cx('btn', variantClass[variant], size === 'sm' && 'btn-sm', className)
  const body = (
    <>
      {children}
      {withArrow ? <ArrowRight size={16} /> : null}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {body}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes}>
        {body}
      </a>
    )
  }

  const { onClick, type = 'button', disabled } = props as ButtonAsButton

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {body}
    </button>
  )
}
