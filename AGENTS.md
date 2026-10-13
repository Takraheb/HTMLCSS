# AGENTS.md — Horizon Properties

## What this repo is

The repository was imported as a folder of standalone Persian HTML exercises
(`cv_me.html`, `form1.html`, `form2.html.html`, `gallery mohammadlak.html`). Those
files are legacy and untouched — `docker-compose.base44.yml` ignores them
completely.

The Horizon Properties site is a new application in this same repository:

- `client/` — Vite + React 19 + TypeScript + Tailwind CSS v4 (single-page app, `react-router-dom`).
- `server/` — Express API that stores enquiries (contact, viewing requests, newsletter sign-ups).
- Root — `docker-compose.base44.yml` plus `.base44/environment.json` for the Base44 sandbox.

## Running it (Base44 sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Public entry point: **host port 3000** → the Vite dev server. The preview loads source modules
  from there, so edits appear through live reload.
- The API listens on `:8000` **inside the compose network only**. The browser never talks to it
  directly: Vite proxies `/api` to `http://api:8000`, so the whole app is one origin. This is why
  no CORS configuration exists anywhere — keep it that way unless a second public origin appears.
- Host check: the preview proxy sends `Host: <port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN`.
  Vite ≥ 6.1 reads the platform-provided `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` variable and
  appends it to `server.allowedHosts`, so no host list is hardcoded in `vite.config.ts`.
- `BASE44_PREVIEW_MODE` is passed through to both services. **No sandbox-only code override is
  currently required** — the same-origin proxy plus Vite's env hook cover the preview — so nothing
  reads it yet. Keep gating any future sandbox-only branch on `=== '1'`.

## Non-obvious constraints

1. **Dependencies live in named volumes** (`web_node_modules`, `api_node_modules`). Each service runs
   `npm ci` on start. If you change a `package.json`, regenerate its lockfile first or the container
   will refuse to boot:
   ```bash
   docker run --rm -v /app/client:/src -w /src node:22 npm install --package-lock-only
   ```
2. **Type-check before claiming a build is good:**
   ```bash
   docker run --rm -v /app/client:/src -v /src/node_modules -w /src node:22 \
     sh -c 'npm ci --no-audit --no-fund && npx tsc --noEmit'
   ```
3. **The image shutter reveal is fragile in two specific ways** (`src/components/Reveal.tsx`):
   - The `clip-path` must sit on an **inner** element, never on the observed one. A clipped target
     reports zero intersection in Chrome, so the shutter would never open. `<Reveal variant="image">`
     already does this — copy that pattern, do not hand-roll a `.reveal-img` on an observed node.
   - Images inside it need `loading="eager"`. While the container is clipped to zero height the
     browser never treats the image as visible, so a lazy image stays unloaded and the plate opens
     onto nothing. The affected images sit just below the hero, so eager loading costs little.
4. **All photography is hot-linked from `images.unsplash.com`** via `imageUrl()` / `imageSrcSet()`
   (no binary assets in the repo). Alt text is authored per image. Quick integrity check after a full
   page scroll: every `img` should report `naturalWidth > 0`.
5. **Data locations**
   - Listings: `client/src/lib/properties.ts` — static, deliberately table-shaped (`id`, `slug`,
     `agentId`) so an API/database can serve it later without touching components.
   - Enquiries: `server/data/inquiries.json` inside the `api_data` volume (not in git). The API is
     write-only by design — it exposes no read endpoint, so enquiries are never public.
   - Saved homes: browser `localStorage` (`horizon.favorites.v1`), shared through `FavoritesContext`.

## Verifying the app

Worth checking after changes (all of these passed on the last verified build):

- `/` renders hero → Who We Are → Featured → Services → Why Choose → Team → CTA → footer.
- Featured rail: arrow controls scroll it, pointer drag scrolls it, arrow keys work when focused.
- `/properties`: search and the location/type/price/bed/bath facets filter, results count updates,
  "Clear all" resets, and the filter state round-trips through the URL.
- Property detail: thumbnail rail swaps the hero plate, fullscreen viewer opens (Escape closes),
  "Save" toggles, similar properties render.
- Enquiries: submitting "Schedule a viewing" (or the contact page form, or the newsletter) returns
  201 from `POST /api/inquiries` and shows the confirmation state. The API rate-limits 20
  enquiries/minute per IP.
- No horizontal overflow at 375 px, 753 px and desktop; no console errors.

## Conventions

- Design tokens live in `client/src/styles/index.css` under `@theme`; component classes (`btn`,
  `eyebrow`, `media`, `hairline`, `rail`) are plain CSS there rather than repeated utility strings.
- Section-level building blocks go in `src/sections/`, routed pages in `src/pages/`, reusable pieces
  in `src/components/`. Anything rendered from both a page and a dialog belongs in `components/`
  (see `EnquiryForm`).
- Every control must do something real: no placeholder buttons. If a new CTA is added, wire it to a
  route, an enquiry type or an existing action.
