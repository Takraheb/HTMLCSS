import { useEffect, useRef, useState } from 'react'
import { submitInquiry } from '../lib/api'
import type { Property } from '../lib/types'
import { Button } from './Button'
import { Check } from './Icons'

type Mode = 'viewing' | 'contact'

interface EnquiryFormProps {
  mode: Mode
  property?: Property
  /** Provided when the form sits in a dialog so the success state can close it. */
  onDismiss?: () => void
  /** Dialog re-mounts on open, so it needs the fields reset keyed to `open`. */
  resetKey?: string
}

const ctaLabel: Record<Mode, string> = {
  viewing: 'Request viewing',
  contact: 'Send enquiry',
}

/**
 * The single enquiry form used by the dialog (from cards and detail pages) and
 * by the contact page. Posts to the API — nothing here is a dead control.
 */
export function EnquiryForm({ mode, property, onDismiss, resetKey }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)
  const firstFieldRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setStatus('idle')
    setError(null)
    formRef.current?.reset()
  }, [resetKey])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setStatus('sending')
    setError(null)

    const result = await submitInquiry({
      type: mode,
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      message: String(data.get('message') ?? ''),
      preferredDate: String(data.get('preferredDate') ?? ''),
      propertyId: property?.id,
      propertyName: property?.name,
    })

    if (result.ok) {
      setStatus('sent')
      return
    }

    setStatus('idle')
    setError(result.error ?? 'Something went wrong. Please try again.')
  }

  if (status === 'sent') {
    return (
      <div className="py-4 text-center">
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-champagne-100 text-champagne">
          <Check size={24} />
        </span>
        <h3 className="h-display mt-5 text-xl text-navy-900">Request received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-soft">
          Thank you — your enquiry is with our team.
          {property
            ? ` We will confirm a private viewing of ${property.name} shortly.`
            : ' An advisor will reply within one business day.'}
        </p>
        {onDismiss ? (
          <Button variant="outline-dark" className="mt-6" onClick={onDismiss}>
            Close
          </Button>
        ) : (
          <Button variant="outline-dark" className="mt-6" to="/properties">
            Browse more homes
          </Button>
        )}
      </div>
    )
  }

  return (
    <form ref={formRef} className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={`${mode}-name`}>
            Full name
          </label>
          <input
            id={`${mode}-name`}
            name="name"
            ref={firstFieldRef}
            required
            autoComplete="name"
            className="field"
            placeholder="Alex Rivera"
          />
        </div>
        <div>
          <label className="field-label" htmlFor={`${mode}-phone`}>
            Phone
          </label>
          <input
            id={`${mode}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field"
            placeholder="(555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={`${mode}-email`}>
          Email
        </label>
        <input
          id={`${mode}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field"
          placeholder="you@example.com"
        />
      </div>

      {mode === 'viewing' ? (
        <div>
          <label className="field-label" htmlFor={`${mode}-date`}>
            Preferred date
          </label>
          <input id={`${mode}-date`} name="preferredDate" type="date" className="field" />
        </div>
      ) : null}

      <div>
        <label className="field-label" htmlFor={`${mode}-message`}>
          {mode === 'viewing' ? 'Anything we should know?' : 'How can we help?'}
        </label>
        <textarea
          id={`${mode}-message`}
          name="message"
          rows={4}
          className="field resize-y"
          placeholder={
            mode === 'viewing' ? 'We would like an evening viewing.' : 'We are relocating to Austin this spring.'
          }
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" variant="navy" disabled={status === 'sending'} withArrow>
          {status === 'sending' ? 'Sending…' : ctaLabel[mode]}
        </Button>
        <p className="text-xs text-slate-soft">No obligation. We reply within one business day.</p>
      </div>
    </form>
  )
}
