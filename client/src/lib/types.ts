export type PropertyType = 'Villa' | 'Estate' | 'Penthouse' | 'Residence' | 'Retreat' | 'Lake House'

export interface PropertyImage {
  /** Unsplash photo id — resolved to sized URLs by `imageUrl()`. */
  photo: string
  alt: string
}

export interface Property {
  id: string
  slug: string
  name: string
  city: string
  state: string
  country: string
  price: number
  type: PropertyType
  beds: number
  baths: number
  sqft: number
  lot: string
  yearBuilt: number
  status: 'For Sale' | 'New' | 'Exclusive'
  featured: boolean
  tagline: string
  description: string
  features: string[]
  amenities: string[]
  images: PropertyImage[]
  agentId: string
}
