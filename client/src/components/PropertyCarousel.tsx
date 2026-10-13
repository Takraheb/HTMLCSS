import { useCallback, useEffect, useRef, useState } from 'react'
import { cx } from '../lib/format'
import type { Property } from '../lib/types'
import { PropertyCard } from './PropertyCard'
import { ChevronLeft, ChevronRight } from './Icons'

interface PropertyCarouselProps {
  properties: Property[]
  label: string
  /** Card width per breakpoint, expressed with the design system's rhythm. */
  itemClassName?: string
  emphasisFirst?: boolean
}

/**
 * Scroll-snap rail with three ways in: drag with a pointer, the arrow controls,
 * and arrow keys when the region has focus. Cards stay real anchors, so the
 * whole set is reachable by keyboard and by search engines.
 */
export function PropertyCarousel({
  properties,
  label,
  itemClassName = 'w-[76vw] sm:w-[54vw] md:w-[40vw] lg:w-[27vw] xl:w-[23rem]',
  emphasisFirst = false,
}: PropertyCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)

  const sync = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    setAtStart(rail.scrollLeft <= 8)
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8)
  }, [])

  useEffect(() => {
    sync()
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      rail.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const rail = railRef.current
      if (!rail) return
      const first = rail.firstElementChild as HTMLElement | null
      const styles = window.getComputedStyle(rail)
      const gap = Number.parseFloat(styles.columnGap || styles.gap || '16') || 16
      const step = (first?.offsetWidth ?? 320) + gap

      const nearEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - step * 0.6
      const nearStart = rail.scrollLeft <= step * 0.6

      if (direction === 1 && nearEnd) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }
      if (direction === -1 && nearStart) {
        rail.scrollTo({ left: rail.scrollWidth, behavior: 'smooth' })
        return
      }

      rail.scrollBy({ left: step * direction, behavior: 'smooth' })
    },
    [],
  )

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return
    const rail = railRef.current
    if (!rail) return
    dragState.current = { active: true, startX: event.clientX, startScroll: rail.scrollLeft, moved: 0 }
    setDragging(true)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current
    if (!rail || !dragState.current.active) return
    const delta = event.clientX - dragState.current.startX
    dragState.current.moved = Math.abs(delta)
    rail.scrollLeft = dragState.current.startScroll - delta
  }

  const endDrag = () => {
    if (!dragState.current.active) return
    dragState.current.active = false
    setDragging(false)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div
        ref={railRef}
        className={cx('rail', dragging && 'is-dragging')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (dragState.current.moved > 6) {
            event.preventDefault()
            event.stopPropagation()
          }
        }}
      >
        {properties.map((property, index) => (
          <div key={property.id} className={itemClassName}>
            <PropertyCard property={property} emphasis={emphasisFirst && index === 0} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous properties"
          className="icon-circle"
          disabled={atStart && atEnd}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Next properties"
          className="icon-circle"
          disabled={atStart && atEnd}
        >
          <ChevronRight size={20} />
        </button>
        <span className="ml-2 font-display text-[0.6875rem] tracking-[0.22em] text-slate-soft uppercase">
          Drag or use arrow keys
        </span>
      </div>
    </div>
  )
}
