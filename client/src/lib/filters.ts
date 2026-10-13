import { properties, propertyTypes, locations, priceBounds } from './properties'
import type { Property } from './types'

export interface FilterState {
  query: string
  location: string
  type: string
  /** Upper price bound in USD; `priceBounds.max` means "no maximum". */
  maxPrice: number
  beds: number
  baths: number
  sort: SortKey
}

export type SortKey = 'featured' | 'price-desc' | 'price-asc' | 'beds-desc' | 'newest'

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured first' },
  { value: 'price-desc', label: 'Price · high to low' },
  { value: 'price-asc', label: 'Price · low to high' },
  { value: 'beds-desc', label: 'Most bedrooms' },
  { value: 'newest', label: 'Newest build' },
]

export const bedOptions = [1, 2, 3, 4, 5, 6]

export const defaultFilters: FilterState = {
  query: '',
  location: 'All locations',
  type: 'All types',
  maxPrice: priceBounds.max,
  beds: 0,
  baths: 0,
  sort: 'featured',
}

export const filterFacets = {
  locations: ['All locations', ...locations],
  types: ['All types', ...propertyTypes],
  priceMin: priceBounds.min,
  priceMax: priceBounds.max,
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  if (filters.location !== defaultFilters.location) count += 1
  if (filters.type !== defaultFilters.type) count += 1
  if (filters.maxPrice !== defaultFilters.maxPrice) count += 1
  if (filters.beds > 0) count += 1
  if (filters.baths > 0) count += 1
  return count
}

export function filterProperties(filters: FilterState): Property[] {
  const needle = filters.query.trim().toLowerCase()

  const matches = properties.filter((property) => {
    if (filters.location !== defaultFilters.location && property.city !== filters.location) return false
    if (filters.type !== defaultFilters.type && property.type !== filters.type) return false
    if (filters.maxPrice < filterFacets.priceMax && property.price > filters.maxPrice) return false
    if (filters.beds > 0 && property.beds < filters.beds) return false
    if (filters.baths > 0 && property.baths < filters.baths) return false

    if (!needle) return true

    const haystack = [
      property.name,
      property.city,
      property.state,
      property.country,
      property.type,
      property.tagline,
      String(property.beds),
    ]
      .join(' ')
      .toLowerCase()

    return haystack.includes(needle)
  })

  return sortProperties(matches, filters.sort)
}

export function sortProperties(list: Property[], sort: SortKey): Property[] {
  const copy = [...list]
  switch (sort) {
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'beds-desc':
      return copy.sort((a, b) => b.beds - a.beds || b.price - a.price)
    case 'newest':
      return copy.sort((a, b) => b.yearBuilt - a.yearBuilt)
    case 'featured':
    default:
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
  }
}
