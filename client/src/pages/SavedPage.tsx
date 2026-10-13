import { properties } from '../lib/properties'
import { useFavorites } from '../lib/FavoritesContext'
import { PageMasthead } from '../components/PageMasthead'
import { PropertyCard } from '../components/PropertyCard'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'

export default function SavedPage() {
  const { favorites } = useFavorites()
  const saved = properties.filter((property) => favorites.includes(property.id))

  return (
    <>
      <PageMasthead
        eyebrow="Your shortlist"
        title="Saved Homes"
        intro="Residences you have marked to revisit. Your shortlist is kept in this browser."
      />

      <section className="section-y" aria-labelledby="saved-grid-title">
        <div className="container-x">
          <h2 id="saved-grid-title" className="sr-only">
            Saved properties
          </h2>

          {saved.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-14">
              {saved.map((property, index) => (
                <Reveal key={property.id} delay={(index % 3) * 70}>
                  <PropertyCard property={property} priority={index < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="max-w-xl">
              <h3 className="h-display text-2xl text-navy-900">Your shortlist is empty</h3>
              <p className="lede mt-4">
                Use the heart on any residence to keep it here — we will remember it for this browser.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Button variant="navy" to="/properties" withArrow>
                  Browse properties
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
