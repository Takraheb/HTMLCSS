/** Builds a responsive Unsplash URL for a photo id. */
export function imageUrl(photo: string, width: number, quality = 78): string {
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(width),
    q: String(quality),
  })
  return `https://images.unsplash.com/photo-${photo}?${params.toString()}`
}

/** srcSet across common breakpoints, so large architectural shots stay light. */
export function imageSrcSet(photo: string, widths: number[] = [640, 960, 1280, 1920]): string {
  return widths.map((w) => `${imageUrl(photo, w)} ${w}w`).join(', ')
}

export function formatPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    const rounded = Math.round(millions * 100) / 100
    return `$${rounded.toFixed(rounded % 1 === 0 ? 0 : 2)} Million`
  }
  return `$${value.toLocaleString('en-US')}`
}

export function formatCompactPrice(value: number): string {
  if (value >= 1_000_000) {
    const millions = Math.round((value / 1_000_000) * 100) / 100
    return `$${millions.toFixed(millions % 1 === 0 ? 0 : 1)}M`
  }
  return `$${Math.round(value / 1000)}K`
}

export function fullLocation(property: { city: string; state: string; country: string }): string {
  return `${property.city}, ${property.state}, ${property.country}`
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
