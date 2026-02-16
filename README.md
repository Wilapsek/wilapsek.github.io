# wilapsek.github.io

Simple JSON-driven personal site. Everything on the page is populated from `config.json` so you can edit copy, links, and project info without touching markup.

## How to use
- Update content in `config.json` (name, badge, summary, socials, projects, stack, timeline, contact links).
- Optional: point `site.resumeUrl` to a hosted PDF to show the resume button.
- Open `index.html` in a browser (or serve the folder with any static server). No build step required.

## Cloudflare Workers / Pages
- Local preview with Workers: `wrangler dev`
- Deploy as a Worker: `wrangler deploy`
- Deploy on Pages: create a Pages project pointing at this repo, set Build command to `none` and Output directory to `.`, and enable the `_worker.js` runtime. Static assets are served via `env.ASSETS` with a fallback to `index.html` for routes without file extensions.

## Files
- `index.html` – layout and placeholders.
- `styles.css` – trimmed dark theme reused from the old dashboard aesthetic.
- `script.js` – loads `config.json` and renders sections.
- `config.json` – the single source of truth for page content.
