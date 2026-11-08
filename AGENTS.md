# Moadowa

This repository is the source of truth for https://gaeunl3e.github.io/moadowa/.

- Edit the buildless site in `public/`. Keep relative asset URLs so it works below `/moadowa/`.
- `app.js`: routes, savings simulation, animal content and motion. `camera.js`: camera/compositor and IndexedDB photo records. `style.css`: visual design.
- Preserve supplied SVG shapes and cream/brown brand colors. Reuse existing artwork.
- No actual financial transactions. Records and photos stay in the visitor browser.
- No backend is required. The old news endpoint is unused and omitted.
- For JS edits run syntax checks; preview mobile UI when layout/interaction changes. Cache versions in index.html must change whenever public JS/CSS changes.
- Push authorized completed changes to main, then verify the GitHub Actions Pages workflow succeeds. `.github/workflows/pages.yml` deploys `public/` automatically.
- Do not commit credentials, browser storage, local photos, or machine-specific authentication files.
