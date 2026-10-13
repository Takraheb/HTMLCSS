import { useEffect } from 'react'
import type { Property } from '../lib/types'
import { useScrollLock } from '../lib/hooks'
import { EnquiryForm } from './EnquiryForm'
import { Close } from './Icons'

type Mode = 'viewing' | 'contact'

interface InquiryDialogProps {
  open: boolean
  onClose: () => void
  mode: Mode
  property?: Property
}

const copy: Record<Mode, { eyebrow: string; title: string }> = {
  viewing: { eyebrow: 'Private viewing', title: 'Schedule a viewing' },
  contact: { eyebrow: 'Enquiry', title: 'Speak with an advisor' },
}

/** Modal wrapper around the shared enquiry form. */
export function InquiryDialog({ open, onClose, mode, property }: InquiryDialogProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const text = copy[mode]

  return (
    <div
      className="dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-panel">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h2 id="inquiry-title" className="h-display mt-3 text-2xl text-navy-900 sm:text-3xl">
              {text.title}
            </h2>
            {property ? (
              <p className="mt-2 text-sm text-slate-soft">
                {property.name} · {property.city}, {property.state}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-soft">
                Tell us what you are looking for and an advisor will reply within one business day.
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="inline-flex h-11 w-11 min-w-11 items-center justify-center rounded-full border border-line text-navy-900 transition hover:bg-navy-900 hover:text-white"
          >
            <Close size={18} />
          </button>
        </div>

        <div className="mt-7">
          <EnquiryForm
            mode={mode}
            property={property}
            onDismiss={onClose}
            resetKey={`${mode}-${property?.id ?? 'general'}-${String(open)}`}
          />
        </div>
      </div>
    </div>
  )
}
