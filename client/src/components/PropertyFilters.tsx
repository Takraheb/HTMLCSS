import { formatCompactPrice } from '../lib/format'
import {
  bedOptions,
  countActiveFilters,
  defaultFilters,
  filterFacets,
  sortOptions,
  type FilterState,
} from '../lib/filters'
import { Search, Sliders } from './Icons'

interface PropertyFiltersProps {
  filters: FilterState
  onChange: (next: FilterState) => void
  resultCount: number
}

/** Search, facet selectors and sort, wired straight to the listing query. */
export function PropertyFilters({ filters, onChange, resultCount }: PropertyFiltersProps) {
  const activeCount = countActiveFilters(filters)
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) => onChange({ ...filters, [key]: value })

  return (
    <section aria-labelledby="filters-heading" className="border-y border-line bg-bone">
      <div className="container-x py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="filters-heading"
            className="inline-flex items-center gap-3 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-navy-900"
          >
            <Sliders size={16} className="text-champagne" />
            Refine the collection
            {activeCount > 0 ? (
              <span className="rounded-full bg-champagne px-2 py-0.5 font-display text-[0.625rem] text-navy-950">
                {activeCount} active
              </span>
            ) : null}
          </h2>

          <div className="flex items-center gap-5">
            <p className="font-display text-[0.75rem] tracking-[0.14em] text-slate-soft uppercase" aria-live="polite">
              {resultCount} {resultCount === 1 ? 'residence' : 'residences'}
            </p>
            {activeCount > 0 || filters.query ? (
              <button
                type="button"
                onClick={() => onChange({ ...defaultFilters })}
                className="link-rule text-navy-900"
              >
                Clear all
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <label className="field-label" htmlFor="filter-search">
              Search
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-soft">
                <Search size={17} />
              </span>
              <input
                id="filter-search"
                type="search"
                value={filters.query}
                onChange={(event) => set('query', event.target.value)}
                className="field pl-11"
                placeholder="Villa, city, keyword…"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="field-label" htmlFor="filter-location">
              Location
            </label>
            <select
              id="filter-location"
              value={filters.location}
              onChange={(event) => set('location', event.target.value)}
              className="field"
            >
              {filterFacets.locations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="field-label" htmlFor="filter-type">
              Property type
            </label>
            <select
              id="filter-type"
              value={filters.type}
              onChange={(event) => set('type', event.target.value)}
              className="field"
            >
              {filterFacets.types.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="field-label" htmlFor="filter-beds">
              Bedrooms
            </label>
            <select
              id="filter-beds"
              value={filters.beds}
              onChange={(event) => set('beds', Number(event.target.value))}
              className="field"
            >
              <option value={0}>Any</option>
              {bedOptions.map((count) => (
                <option key={count} value={count}>
                  {count}+
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="field-label" htmlFor="filter-baths">
              Bathrooms
            </label>
            <select
              id="filter-baths"
              value={filters.baths}
              onChange={(event) => set('baths', Number(event.target.value))}
              className="field"
            >
              <option value={0}>Any</option>
              {bedOptions.map((count) => (
                <option key={count} value={count}>
                  {count}+
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-7">
            <label className="field-label" htmlFor="filter-price">
              Maximum price · {formatCompactPrice(filters.maxPrice)}
            </label>
            <input
              id="filter-price"
              type="range"
              min={filterFacets.priceMin}
              max={filterFacets.priceMax}
              step={50000}
              value={filters.maxPrice}
              onChange={(event) => set('maxPrice', Number(event.target.value))}
              className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-navy-900/15 accent-navy-900"
            />
            <div className="mt-2 flex justify-between font-display text-[0.6875rem] tracking-[0.14em] text-slate-soft uppercase">
              <span>{formatCompactPrice(filterFacets.priceMin)}</span>
              <span>No maximum</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <label className="field-label" htmlFor="filter-sort">
              Sort by
            </label>
            <select
              id="filter-sort"
              value={filters.sort}
              onChange={(event) => set('sort', event.target.value as FilterState['sort'])}
              className="field"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  )
}
