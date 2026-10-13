/**
 * Thin client for the Horizon Properties API. Every request is same-origin
 * (`/api/...`), proxied by the Vite dev server to the API service, so there is
 * no host or CORS configuration to keep in sync.
 */
export interface InquiryPayload {
  type: 'viewing' | 'contact' | 'newsletter'
  name?: string
  email: string
  phone?: string
  message?: string
  propertyId?: string
  propertyName?: string
  preferredDate?: string
}

export interface InquiryResult {
  ok: boolean
  id?: string
  error?: string
}

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = (await response.json().catch(() => null)) as InquiryResult | null

    if (!response.ok) {
      return { ok: false, error: data?.error ?? 'Something went wrong. Please try again.' }
    }

    return { ok: true, id: data?.id }
  } catch {
    return { ok: false, error: 'We could not reach the office. Please try again in a moment.' }
  }
}
