# Moadowa

This repository is the source of truth for https://gaeunl3e.github.io/moadowa/.

- Edit the buildless site in `public/`. Keep relative asset URLs so it works below `/moadowa/`.
- `app.js`: routes, savings simulation, animal content and motion. `camera.js`: camera/compositor and IndexedDB photo records. `style.css`: visual design.
- Preserve supplied SVG shapes and cream/brown brand colors. Reuse existing artwork.
- No actual financial transactions. Records and ordinary photos stay in the visitor browser. The explicit desktop home QR option encrypts a photo in-browser and temporarily uploads ciphertext to the supplementary photo service; decryption keys stay in the receiving link fragment.
- The main site stays on GitHub Pages. QR transfers use `../moadowa-photo-service` (Sites project appgprj_6af9c70310088191975d3270437aad6b), with 10-minute access expiry and automatic cleanup. Keep the optional service independent from the main hosting. The old news endpoint remains unused.
- For JS edits run syntax checks; preview mobile UI when layout/interaction changes. Cache versions in index.html must change whenever public JS/CSS changes.
- Push authorized completed changes to main, then verify the GitHub Actions Pages workflow succeeds. `.github/workflows/pages.yml` deploys `public/` automatically.
- Do not commit credentials, browser storage, local photos, or machine-specific authentication files.
