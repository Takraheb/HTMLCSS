import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { PageMasthead } from '../components/PageMasthead'

export default function NotFoundPage() {
  return (
    <>
      <PageMasthead
        eyebrow="Off the market"
        title="This page could not be found"
        intro="The residence or page you were looking for may have been sold, renamed or moved."
      />
      <section className="section-y">
        <div className="container-x flex flex-wrap gap-4">
          <Button variant="navy" to="/properties" withArrow>
            Browse properties
          </Button>
          <Button variant="outline-dark" to="/">
            Back to home
          </Button>
          <Link to="/contact" className="link-rule self-center">
            Contact an advisor
          </Link>
        </div>
      </section>
    </>
  )
}
