import type { Property, PropertyType } from './types'
import { fullLocation } from './format'

/**
 * The listing catalogue. Shaped like a database table (stable `id`/`slug`,
 * denormalised `agentId`) so it can be served by an API later without touching
 * any component that consumes it.
 */
export const properties: Property[] = [
  {
    id: 'HP-101',
    slug: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 2350000,
    type: 'Villa',
    beds: 5,
    baths: 4,
    sqft: 4850,
    lot: '0.62 acres',
    yearBuilt: 2021,
    status: 'For Sale',
    featured: true,
    tagline: 'A glass pavilion resting on the water line.',
    description:
      'Set directly on the shoreline, Lakeside Modern Villa opens through twelve-foot sliding walls onto a limestone terrace and infinity edge pool. Interiors are composed in pale oak and honed stone, with a double-height living hall that frames the lake from every seat. A private dock, guest pavilion and climate-controlled wine room complete the estate.',
    features: [
      'Three-hundred-foot private shoreline',
      'Twelve-foot sliding glass walls',
      'Infinity edge pool and spa',
      'Private dock with boat lift',
      'Climate-controlled wine room',
      'Primary suite with lake terrace',
    ],
    amenities: ['Heated pool', 'Home cinema', 'Gym', 'Smart home system', 'Three-car garage', 'Guest pavilion'],
    images: [
      { photo: '1580587771525-78b9dba3b914', alt: 'Lakeside Modern Villa seen from the water at blue hour' },
      { photo: '1600607687920-4e2a09cf159d', alt: 'Double-height living hall with pale oak floors' },
      { photo: '1600585154340-be6161a56a0c', alt: 'Terrace and infinity pool overlooking the lake' },
      { photo: '1600573472550-8090b5e0745e', alt: 'Open-plan kitchen in honed stone and oak' },
      { photo: '1600210492486-724fe5c67fb0', alt: 'Primary suite opening onto a private terrace' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'HP-102',
    slug: 'pacific-glass-house',
    name: 'Pacific Glass House',
    city: 'Malibu',
    state: 'California',
    country: 'USA',
    price: 4800000,
    type: 'Residence',
    beds: 4,
    baths: 5,
    sqft: 5200,
    lot: '0.4 acres',
    yearBuilt: 2019,
    status: 'Exclusive',
    featured: true,
    tagline: 'Cantilevered glass above the Pacific.',
    description:
      'A cantilevered composition of blackened steel and structural glass, Pacific Glass House frames the ocean from every principal room. The main level is a single continuous volume — kitchen, dining and living — that opens fully to a heated terrace. Below, a spa level opens to the cliff-side garden.',
    features: [
      'Full-height oceanside glazing',
      'Cantilevered living volume',
      'Heated terrace and plunge pool',
      'Ocean-view primary suite',
      'Spa with steam and sauna',
      'Direct beach access path',
    ],
    amenities: ['Plunge pool', 'Spa', 'Wine cellar', 'Elevator', 'Solar array', 'Guest suite'],
    images: [
      { photo: '1613490493576-7fde63acd811', alt: 'Pacific Glass House with glass facade above the ocean' },
      { photo: '1616486338812-3dadae4b4ace', alt: 'Kitchen in blackened steel and white marble' },
      { photo: '1564013799919-ab600027ffc6', alt: 'Heated terrace facing the Pacific' },
      { photo: '1586023492125-27b2c045efd7', alt: 'Living volume with full-height glazing' },
      { photo: '1560448204-e02f11c3d0e2', alt: 'Primary suite with ocean outlook' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'HP-103',
    slug: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    city: 'Scottsdale',
    state: 'Arizona',
    country: 'USA',
    price: 3150000,
    type: 'Estate',
    beds: 5,
    baths: 6,
    sqft: 6100,
    lot: '2.1 acres',
    yearBuilt: 2020,
    status: 'For Sale',
    featured: true,
    tagline: 'Low-slung architecture against the Sonoran sky.',
    description:
      'A single-storey estate organised around a central courtyard, Desert Horizon Estate layers rammed earth, bronze and glass against the mountain silhouette. Each wing opens to the courtyard pool, and the western terrace was positioned for the evening light.',
    features: [
      'Central courtyard with reflecting pool',
      'Rammed earth and bronze detailing',
      'Western sunset terrace',
      'Five en-suite bedrooms',
      'Detached casita',
      'Desert botanical garden',
    ],
    amenities: ['Courtyard pool', 'Casita', 'Outdoor kitchen', 'Fire lounge', 'Four-car garage', 'Owned solar'],
    images: [
      { photo: '1600596542815-ffad4c1539a9', alt: 'Desert Horizon Estate with courtyard pool in afternoon light' },
      { photo: '1600607688969-a5bfcd646154', alt: 'Courtyard living room with rammed earth walls' },
      { photo: '1570129477492-45c003edd2be', alt: 'Western terrace set for evening' },
      { photo: '1600121848594-d8644e57abab', alt: 'Kitchen with bronze and stone finishes' },
      { photo: '1567496898669-ee935f5f647a', alt: 'Primary suite opening to the courtyard' },
    ],
    agentId: 'sophia-bennett',
  },
  {
    id: 'HP-104',
    slug: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    city: 'Miami',
    state: 'Florida',
    country: 'USA',
    price: 5200000,
    type: 'Residence',
    beds: 6,
    baths: 7,
    sqft: 7400,
    lot: '0.55 acres',
    yearBuilt: 2022,
    status: 'New',
    featured: true,
    tagline: 'Water on two sides, glass on three.',
    description:
      'Positioned on a private peninsula, Oceanfront Residence holds water views from the entrance hall through to the upper terrace. A floating stair connects three levels, and the ground floor dissolves into a shaded loggia, pool deck and summer kitchen.',
    features: [
      'Triple-aspect water views',
      'Floating sculptural staircase',
      'Shaded loggia and summer kitchen',
      'Rooftop terrace with spa',
      'Six en-suite bedrooms',
      'Deep-water dockage',
    ],
    amenities: ['Infinity pool', 'Rooftop spa', 'Boat dock', 'Home gym', 'Staff quarters', 'Generator'],
    images: [
      { photo: '1583608205776-bfd35f0d9f83', alt: 'Oceanfront Residence with pool at twilight' },
      { photo: '1522708323590-d24dbb6b0267', alt: 'Living room opening to the water' },
      { photo: '1523217582562-09d0def993a6', alt: 'Pool deck and loggia at dusk' },
      { photo: '1502672260266-1c1ef2d93688', alt: 'Floating staircase in the entrance hall' },
      { photo: '1567767292278-a4f21aa2d36e', alt: 'Upper terrace with water views' },
    ],
    agentId: 'olivia-carter',
  },
  {
    id: 'HP-105',
    slug: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    city: 'Los Angeles',
    state: 'California',
    country: 'USA',
    price: 3750000,
    type: 'Retreat',
    beds: 4,
    baths: 4,
    sqft: 4300,
    lot: '0.78 acres',
    yearBuilt: 2018,
    status: 'For Sale',
    featured: true,
    tagline: 'Terraced volumes stepping down the canyon.',
    description:
      'Terraced into the hillside, this retreat steps down the canyon in four volumes, each opening to its own garden terrace. Board-formed concrete and cedar screens give privacy from the street while the rear elevation is almost entirely glass.',
    features: [
      'Four terraced garden levels',
      'Board-formed concrete and cedar',
      'Canyon-view infinity pool',
      'Outdoor shower and plunge',
      'Studio or guest wing',
      'Gated motor court',
    ],
    amenities: ['Infinity pool', 'Plunge spa', 'Yoga studio', 'Fire pit', 'Green roof', 'Two-car garage'],
    images: [
      { photo: '1512917774080-9991f1c4c750', alt: 'Modern Hillside Retreat lit at dusk' },
      { photo: '1600566753190-17f0baa2a6c3', alt: 'Living room with canyon views' },
      { photo: '1600047509807-ba8f99d2cdde', alt: 'Terraced garden and pool' },
      { photo: '1600573472592-401b489a3cdc', alt: 'Kitchen with cedar ceiling' },
      { photo: '1600585153490-76fb20a32601', alt: 'Bedroom opening to a garden terrace' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'HP-106',
    slug: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    city: 'Beverly Hills',
    state: 'California',
    country: 'USA',
    price: 6400000,
    type: 'Estate',
    beds: 6,
    baths: 8,
    sqft: 8200,
    lot: '1.3 acres',
    yearBuilt: 2017,
    status: 'Exclusive',
    featured: true,
    tagline: 'A walled garden estate behind mature palms.',
    description:
      'Behind mature palms and a private gate, Palm Garden Residence arranges 8,200 square feet around a walled garden and pool court. A panelled library, screening room and full wellness suite anchor a house designed for long residential stays.',
    features: [
      'Walled garden and pool court',
      'Panelled library',
      'Screening room',
      'Wellness suite with lap pool',
      'Formal and family dining',
      'Motor court for six cars',
    ],
    amenities: ['Lap pool', 'Screening room', 'Sauna', 'Gym', 'Wine cellar', 'Guest house'],
    images: [
      { photo: '1600047509358-9dc75507daeb', alt: 'Palm Garden Residence with manicured gardens' },
      { photo: '1600585154084-4e5fe7c39198', alt: 'Panelled library with garden outlook' },
      { photo: '1600585152220-90363fe7e115', alt: 'Pool court framed by palms' },
      { photo: '1600607686527-6fb886090705', alt: 'Formal dining room' },
      { photo: '1493809842364-78817add7ffb', alt: 'Primary bedroom with garden views' },
    ],
    agentId: 'sophia-bennett',
  },
  {
    id: 'HP-107',
    slug: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    city: 'Lake Tahoe',
    state: 'Nevada',
    country: 'USA',
    price: 2950000,
    type: 'Lake House',
    beds: 4,
    baths: 3,
    sqft: 3900,
    lot: '0.9 acres',
    yearBuilt: 2020,
    status: 'For Sale',
    featured: true,
    tagline: 'Timber, stone and an alpine waterline.',
    description:
      'A contemporary reading of the alpine cabin: cross-laminated timber, local granite and a double-sided hearth. The great room opens to a lake-facing deck, and a bunk room makes the house work for long family seasons.',
    features: [
      'Cross-laminated timber structure',
      'Double-sided stone hearth',
      'Lake-facing entertaining deck',
      'Bunk room sleeping six',
      'Ski and board room',
      'Heated driveway',
    ],
    amenities: ['Hot tub', 'Ski room', 'Boot room', 'Wine fridge', 'Two-car garage', 'Generator'],
    images: [
      { photo: '1449844908441-8829872d2607', alt: 'Contemporary Lake House among pines' },
      { photo: '1600607687939-ce8a6c25118c', alt: 'Great room with double-sided hearth' },
      { photo: '1512918728675-ed5a9ecdebfd', alt: 'Deck overlooking the lake' },
      { photo: '1600566753086-00f18fb6b3ea', alt: 'Kitchen in timber and granite' },
      { photo: '1497366811353-6870744d04b2', alt: 'Reading nook by the hearth' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'HP-108',
    slug: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    city: 'Austin',
    state: 'Texas',
    country: 'USA',
    price: 1850000,
    type: 'Penthouse',
    beds: 3,
    baths: 3,
    sqft: 2750,
    lot: '—',
    yearBuilt: 2023,
    status: 'New',
    featured: false,
    tagline: 'A double-height volume above the skyline.',
    description:
      'Occupying the upper floor of a landmark tower, the penthouse holds a double-height living volume and a 900-square-foot wrap terrace. Interiors were specified by an award-winning studio in oak, brass and limestone.',
    features: [
      'Double-height living volume',
      'Two-hundred-degree skyline terrace',
      'Private lift access',
      'Chef kitchen with pantry',
      'Primary suite with dressing room',
      'Concierge and valet',
    ],
    amenities: ['Wrap terrace', 'Concierge', 'Residents gym', 'Private lift', 'Two parking bays', 'Storage'],
    images: [
      { photo: '1600585154526-990dced4db0d', alt: 'Penthouse terrace above the skyline' },
      { photo: '1600210492486-724fe5c67fb0', alt: 'Double-height living volume' },
      { photo: '1600566752355-35792bedcfea', alt: 'Chef kitchen with brass detailing' },
      { photo: '1600566753190-17f0baa2a6c3', alt: 'Dining area with skyline outlook' },
      { photo: '1613977257363-707ba9348227', alt: 'Primary suite with dressing room' },
    ],
    agentId: 'james-wilson',
  },
  {
    id: 'HP-109',
    slug: 'cypress-canyon-villa',
    name: 'Cypress Canyon Villa',
    city: 'Sonoma',
    state: 'California',
    country: 'USA',
    price: 4350000,
    type: 'Villa',
    beds: 5,
    baths: 5,
    sqft: 5600,
    lot: '6.4 acres',
    yearBuilt: 2019,
    status: 'For Sale',
    featured: false,
    tagline: 'Vineyard estate in stone and glass.',
    description:
      'A vineyard estate of 6.4 planted acres, Cypress Canyon Villa pairs a stone base with a glazed upper volume that floats above the rows. A tasting room, olive grove and guest cottage support a full agricultural programme.',
    features: [
      '6.4 acres of planted vineyard',
      'Floating glazed upper volume',
      'Tasting room and cellar',
      'Olive grove and orchard',
      'Detached guest cottage',
      'Equipment barn',
    ],
    amenities: ['Vineyard', 'Wine cellar', 'Pool', 'Guest cottage', 'Barn', 'Well and irrigation'],
    images: [
      { photo: '1554435493-93422e8220c8', alt: 'Cypress Canyon Villa above the vineyard' },
      { photo: '1560448204-e02f11c3d0e2', alt: 'Floating living volume over the vines' },
      { photo: '1502005229762-cf1b2da7c5d6', alt: 'Stone terrace facing the vineyard' },
      { photo: '1567496898669-ee935f5f647a', alt: 'Tasting room with barrel cellar beyond' },
      { photo: '1613490900233-141c5560d75d', alt: 'Bedroom in the glazed upper volume' },
    ],
    agentId: 'daniel-morgan',
  },
  {
    id: 'HP-110',
    slug: 'skyline-terrace-penthouse',
    name: 'Skyline Terrace Penthouse',
    city: 'Seattle',
    state: 'Washington',
    country: 'USA',
    price: 2600000,
    type: 'Penthouse',
    beds: 3,
    baths: 4,
    sqft: 3100,
    lot: '—',
    yearBuilt: 2022,
    status: 'For Sale',
    featured: false,
    tagline: 'Sound and city, held in one frame.',
    description:
      'A corner penthouse with water on one side and the city on the other. Full-height glazing wraps the living volume, and a landscaped terrace with outdoor hearth extends the season well into autumn.',
    features: [
      'Corner position with water and city views',
      'Full-height wrapping glazing',
      'Landscaped terrace with hearth',
      'Home office with library wall',
      'Motorised blinds throughout',
      'Two deeded parking bays',
    ],
    amenities: ['Terrace hearth', 'Concierge', 'Gym and pool', 'EV charging', 'Storage', 'Guest suite'],
    images: [
      { photo: '1615873968403-89e068629265', alt: 'Skyline Terrace Penthouse at dusk' },
      { photo: '1616486338812-3dadae4b4ace', alt: 'Kitchen with city outlook' },
      { photo: '1449158743715-0a90ebb6d2d8', alt: 'Living volume wrapping the corner' },
      { photo: '1560184897-ae75f418493e', alt: 'Landscaped terrace with hearth' },
      { photo: '1497366811353-6870744d04b2', alt: 'Home office with library wall' },
    ],
    agentId: 'olivia-carter',
  },
]

export const propertyTypes: PropertyType[] = ['Villa', 'Estate', 'Penthouse', 'Residence', 'Retreat', 'Lake House']

export const locations = Array.from(new Set(properties.map((property) => property.city))).sort()

export const priceBounds = {
  min: Math.min(...properties.map((property) => property.price)),
  max: Math.max(...properties.map((property) => property.price)),
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug)
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((property) => property.id === id)
}

export function featuredProperties(): Property[] {
  return properties.filter((property) => property.featured)
}

/** Same type first, then closest price — a simple, sensible relevance order. */
export function similarProperties(property: Property, limit = 3): Property[] {
  return properties
    .filter((candidate) => candidate.id !== property.id)
    .sort((a, b) => {
      const typeScore = (item: Property) => (item.type === property.type ? 0 : 1)
      const byType = typeScore(a) - typeScore(b)
      if (byType !== 0) return byType
      return Math.abs(a.price - property.price) - Math.abs(b.price - property.price)
    })
    .slice(0, limit)
}

export { fullLocation }
