# wilapsek.github.io

Simple JSON-driven personal site. Everything on the page is populated from `config.json` so you can edit copy, links, and project info without touching markup.

## How to use
- Update content in `config.json` (name, badge, summary, socials, projects, stack, timeline, contact links).
- Optional: point `site.resumeUrl` to a hosted PDF to show the resume button.
- Open `index.html` in a browser (or serve the folder with any static server). No build step required.

## Files
- `index.html` – layout and placeholders.
- `styles.css` – trimmed dark theme reused from the old dashboard aesthetic.
- `script.js` – loads `config.json` and renders sections.
- `config.json` – the single source of truth for page content.
