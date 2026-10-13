# Horizon Properties

A premium real estate website: luxury listings, an editorial homepage, a filterable
property collection, full property dossiers and working enquiry flows.

> The original Persian HTML exercises (`cv_me.html`, `form1.html`, `form2.html.html`,
> `gallery mohammadlak.html`) are left in place as repository history and are not part
> of the application.

## Stack

| Part | Technology |
| --- | --- |
| `client/` | Vite, React 19, TypeScript, Tailwind CSS v4, React Router |
| `server/` | Node.js, Express — stores enquiries in a JSON file |

## Run the app

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

Open <http://localhost:3000>. Host port 3000 is the only public port: the Vite dev
server serves the site and proxies `/api` to the internal API service, so the browser
always stays on one origin.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, Who We Are, Featured Properties, Services, Why Choose Horizon, Team, CTA, footer |
| `/properties` | Search plus location, type, price, bedroom and bathroom filters, sorting — all reflected in the URL |
| `/properties/:slug` | Gallery with fullscreen viewer, specifications, features, amenities, listing advisor, similar homes |
| `/about` | Company story, principles and the markets we work in |
| `/services` | The six services and a four-step engagement |
| `/team` | The four advisors, with direct contact links |
| `/contact` | Office details and a working enquiry form |
| `/saved` | Shortlist saved from any property card |

## Where the data lives

- **Listings** — `client/src/lib/properties.ts`, shaped like database rows (`id`, `slug`,
  `agentId`) so a backend can serve them later without component changes.
- **Enquiries** — `POST /api/inquiries` writes to `server/data/inquiries.json` (a compose
  volume in development). This covers contact messages, viewing requests and the footer
  newsletter sign-up.
- **Saved homes** — kept in the browser (`localStorage`), shared across the app through
  `FavoritesContext`.

## Development notes

- Photography is loaded from Unsplash with responsive `srcSet` sizes and lazy loading
  below the fold; there are no image binaries in the repository.
- `npm run typecheck` (in `client/`) type-checks the app.
- See `AGENTS.md` for the compose setup, its constraints and the verification checklist.
