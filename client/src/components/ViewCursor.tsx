import { useEffect, useRef, useState } from 'react'

/**
 * Champagne "View" badge that trails the pointer over property imagery on
 * fine-pointer devices. Purely decorative: it never replaces the native cursor
 * and stays off for touch and reduced-motion users.
 */
export function ViewCursor({ label = 'View' }: { label?: string }) {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const badgeRef = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef<number>(0)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      target.current = { x: event.clientX, y: event.clientY }
      const element = event.target as HTMLElement | null
      setActive(Boolean(element?.closest('[data-view-cursor]')))
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18
      current.current.y += (target.current.y - current.current.y) * 0.18
      if (badgeRef.current) {
        badgeRef.current.style.left = `${current.current.x}px`
        badgeRef.current.style.top = `${current.current.y}px`
      }
      frame.current = window.requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame.current = window.requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={badgeRef} className={`view-badge${active ? ' is-active' : ''}`} aria-hidden="true">
      {label}
    </div>
  )
}
