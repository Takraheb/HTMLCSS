import { useCallback, useEffect, useState } from 'react'
import { cx, imageSrcSet, imageUrl } from '../lib/format'
import type { PropertyImage } from '../lib/types'
import { useScrollLock } from '../lib/hooks'
import { ChevronLeft, ChevronRight, Close, Expand } from './Icons'

interface PropertyGalleryProps {
  images: PropertyImage[]
  name: string
}

/**
 * Hero image with a thumbnail rail and a fullscreen viewer. Arrow keys, Escape
 * and the on-screen controls all work; the viewer traps nothing it shouldn't.
 */
export function PropertyGallery({ images, name }: PropertyGalleryProps) {
  const [index, setIndex] = useState(0)
  const [viewer, setViewer] = useState(false)
  const active = images[index]
  const total = images.length

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + total) % total)
    },
    [total],
  )

  useScrollLock(viewer)

  useEffect(() => {
    if (!viewer) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setViewer(false)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewer, step])

  return (
    <div>
      <div className="media media-zoom group relative" style={{ aspectRatio: '4 / 3' }}>
        <img
          key={active.photo}
          src={imageUrl(active.photo, 1280)}
          srcSet={imageSrcSet(active.photo, [640, 960, 1280, 1920])}
          sizes="(min-width: 1024px) 58vw, 92vw"
          alt={active.alt}
          className="anim-fade-up"
          loading="eager"
          decoding="async"
        />

        <button
          type="button"
          onClick={() => setViewer(true)}
          className="icon-circle icon-circle--light absolute right-4 top-4"
          aria-label={`Open fullscreen gallery (${index + 1} of ${total})`}
        >
          <Expand size={19} />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            className="icon-circle icon-circle--light"
            aria-label="Previous image"
          >
            <ChevronLeft size={19} />
          </button>
          <span
            className="rounded-full bg-navy-950/60 px-3 py-1 font-display text-[0.625rem] tracking-[0.2em] text-white backdrop-blur"
            aria-live="polite"
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            className="icon-circle icon-circle--light"
            aria-label="Next image"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {images.map((image, thumbIndex) => (
          <button
            key={image.photo + thumbIndex}
            type="button"
            onClick={() => setIndex(thumbIndex)}
            aria-label={`Show image ${thumbIndex + 1}: ${image.alt}`}
            aria-current={thumbIndex === index}
            className={cx(
              'media block transition',
              thumbIndex === index
                ? 'ring-2 ring-champagne ring-offset-2 ring-offset-white'
                : 'opacity-65 hover:opacity-100',
            )}
            style={{ aspectRatio: '4 / 3' }}
          >
            <img
              src={imageUrl(image.photo, 320)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {viewer ? (
        <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-label={`${name} — image gallery`}>
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p className="font-display text-[0.6875rem] tracking-[0.24em] text-white/70 uppercase">
              {name} · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={() => setViewer(false)}
              className="icon-circle icon-circle--light"
              aria-label="Close fullscreen gallery"
            >
              <Close size={19} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 overflow-hidden px-3 pb-4 sm:gap-6 sm:px-8">
            <button
              type="button"
              onClick={() => step(-1)}
              className="icon-circle icon-circle--light"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <img
              key={active.photo}
              src={imageUrl(active.photo, 1920)}
              alt={active.alt}
              className="anim-fade-up max-h-full w-auto max-w-full rounded-[6px] object-contain"
            />
            <button
              type="button"
              onClick={() => step(1)}
              className="icon-circle icon-circle--light"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <p className="px-6 pb-6 text-center text-sm text-white/60">{active.alt}</p>
        </div>
      ) : null}
      <span className="sr-only">Use the arrow keys to move through the gallery.</span>
    </div>
  )
}
