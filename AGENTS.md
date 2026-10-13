# AGENTS.md

## What this repo is

A set of plain, hand-written static HTML pages (Persian, RTL). There is no package
manager, no build step, no backend, no database and no tests — the files are served
as-is. Nothing here talks to an external service, so no credentials are required.

Pages:

- `index.html` — page index added for the Base44 preview (the repo had no entry page)
- `cv_me.html` — résumé / landing page built on the "Meyawo" Bootstrap template
- `form1.html` — cooperation request form (self-styled, inline CSS)
- `form2.html.html` — fragment with form fields (no `<html>`/`<body>` wrapper)
- `gallery mohammadlak.html` — image gallery (self-styled, inline CSS)

## Running it here

```sh
docker compose -f docker-compose.base44.yml up -d --build   # -> http://localhost:3000/
```

Notes that are not obvious from the compose file:

- `nginx:alpine` serves the checkout bind-mounted at `/usr/share/nginx/html`.
  Files are read from disk on each request, so editing any `.html` is visible
  immediately — there is no dev server to reload and no rebuild is needed. Use
  `reload_preview` only if the browser is still showing a cached copy.
- nginx workers run as root (`nginx.base44.conf`) because the sandbox mounts the
  repository directory at mode 700 owned by root. With the image's default
  `nginx` worker user every request returns 403.
- The container healthcheck probes `127.0.0.1`, not `localhost`: inside this image
  `localhost` resolves to `::1` first while nginx only listens on IPv4, so the
  check failed with no output.
- `.base44/` and `.git/` are denied by nginx because the document root is the whole
  checkout.
- Every file here is UTF-8, but only `cv_me.html` carries its own `<meta charset>`.
  Without the `charset utf-8;` directive in `nginx.base44.conf` the server sent no
  charset, the browser guessed Windows-1252 and the Persian text on `form1.html` and
  the gallery rendered as mojibake. Changing that directive breaks those pages again.

## Known content gaps (not environment problems)

The repo references files it never contained. No setup or configuration change can
fix these; they need the original assets:

- `cv_me.html` links `assets/css/meyawo.css`, `assets/vendors/...`, `assets/js/meyawo.js`
  (the Meyawo Bootstrap template). The `assets/` directory exists neither in the
  working tree nor in the repo's git history, so the page renders unstyled.
- Every `<img>` in `cv_me.html` and `gallery mohammadlak.html` points at an absolute
  Windows path (`file:///C:/Users/aa/...`), so all images show as broken.
