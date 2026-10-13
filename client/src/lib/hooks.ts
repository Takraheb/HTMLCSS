import { useEffect, useRef, useState } from 'react'

/**
 * Adds `is-visible` to an element the first time it enters the viewport, so CSS
 * can drive the fade/rise and clip-path reveals.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number
  rootMargin?: string
}): { ref: React.RefObject<T | null>; visible: boolean } {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -60px 0px',
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [options?.threshold, options?.rootMargin])

  return { ref, visible }
}

/** True once the window has scrolled past `offset` pixels. */
export function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** Locks body scroll while a modal or viewer is open. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
