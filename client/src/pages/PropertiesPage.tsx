import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { defaultFilters, filterProperties, type FilterState, type SortKey } from '../lib/filters'
import { PropertyCard } from '../components/PropertyCard'
import { PropertyCarousel } from '../components/PropertyCarousel'
import { PropertyFilters } from '../components/PropertyFilters'
import { PageMasthead } from '../components/PageMasthead'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'
import { featuredProperties } from '../lib/properties'

/** Reads the filter state from the URL so any result set is shareable. */
function filtersFromParams(params: URLSearchParams): FilterState {
  const beds = Number(params.get('beds') ?? 0)
  const baths = Number(params.get('baths') ?? 0)
  const maxPrice = Number(params.get('maxPrice') ?? defaultFilters.maxPrice)

  return {
    query: params.get('q') ?? defaultFilters.query,
    location: params.get('location') ?? defaultFilters.location,
    type: params.get('type') ?? defaultFilters.type,
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : defaultFilters.maxPrice,
    beds: Number.isFinite(beds) ? beds : 0,
    baths: Number.isFinite(baths) ? baths : 0,
    sort: (params.get('sort') as SortKey | null) ?? defaultFilters.sort,
  }
}

function paramsFromFilters(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.query) params.set('q', filters.query)
  if (filters.location !== defaultFilters.location) params.set('location', filters.location)
  if (filters.type !== defaultFilters.type) params.set('type', filters.type)
  if (filters.maxPrice !== defaultFilters.maxPrice) params.set('maxPrice', String(filters.maxPrice))
  if (filters.beds > 0) params.set('beds', String(filters.beds))
  if (filters.baths > 0) params.set('baths', String(filters.baths))
  if (filters.sort !== defaultFilters.sort) params.set('sort', filters.sort)
  return params
}

export default function PropertiesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => filtersFromParams(searchParams), [searchParams])
  const results = useMemo(() => filterProperties(filters), [filters])

  const isPristine =
    JSON.stringify(paramsFromFilters(filters).toString()) === JSON.stringify(new URLSearchParams().toString())

  return (
    <>
      <PageMasthead
        eyebrow="The collection"
        title="Properties"
        intro="A curated portfolio of villas, estates, penthouses and waterfront residences across the United States."
      />

      <PropertyFilters
        filters={filters}
        onChange={(next) => setSearchParams(paramsFromFilters(next), { replace: true })}
        resultCount={results.length}
      />

      {isPristine ? (
        <section className="section-y pt-[clamp(3rem,6vw,5rem)]" aria-labelledby="properties-featured-title">
          <div className="container-x">
            <Reveal className="max-w-xl">
              <span className="eyebrow">Featured</span>
              <h2 id="properties-featured-title" className="h-display h-section mt-4 text-navy-900">
                Featured Properties
              </h2>
            </Reveal>
            <div className="mt-10">
              <PropertyCarousel properties={featuredProperties()} label="Featured properties" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-[clamp(4.5rem,9vw,8.5rem)] pt-[clamp(3rem,6vw,5rem)]" aria-labelledby="results-title">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="results-title" className="h-display text-[clamp(1.25rem,2vw,1.75rem)] text-navy-900">
              {isPristine ? 'All residences' : 'Search results'}
            </h2>
            <span className="font-display text-[0.6875rem] uppercase tracking-[0.2em] text-slate-soft">
              {results.length} {results.length === 1 ? 'home' : 'homes'}
            </span>
          </div>

          <div className="hairline mt-6" />

          {results.length > 0 ? (
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
              {results.map((property, index) => (
                <Reveal key={property.id} delay={(index % 3) * 70}>
                  <PropertyCard property={property} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-16 max-w-xl">
              <h3 className="h-display text-2xl text-navy-900">No residences match those filters</h3>
              <p className="lede mt-4">
                Try widening the price range or clearing a location. Our advisors can also source off-market homes on
                request.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button
                  variant="navy"
                  onClick={() => setSearchParams(new URLSearchParams(), { replace: true })}
                  withArrow
                >
                  Clear all filters
                </Button>
                <Button variant="outline-dark" to="/contact">
                  Ask an advisor
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
