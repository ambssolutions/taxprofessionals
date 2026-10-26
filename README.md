# Tax Professionals: website concepts

Ten homepage concepts for a redesign of taxprofessionals.co.nz, prepared by AMBS Solutions.
Static HTML, no build step. Live at https://taxprofessionals.vercel.app (noindex).

## What is here
- `index.html`: the concept gallery (open each concept, shortlist, compare up to 3, send your pick)
- `preview.html`: laptop, tablet and phone device frames for every concept (`?c=03&d=tablet`)
- `designs/NN-slug/index.html`: one self-contained file per concept (inline CSS and JS, Google Fonts only)
- `designs/NN-slug/thumb.webp`: gallery thumbnail, made by `node tools/thumbs.mjs`
- `assets/concepts.js`: the single list of concepts (gallery, preview and switcher all read it) plus the floating concept switcher
- `BRIEF.md`: the facts allowed on the pages, copy rules and each concept's idea
- `CONTENT-NEEDED.md`: what the client still has to supply
- `vercel.json`: short links (`/tax-year`, `/manukau-road`...), noindex header, cache rules

## Preview locally
```
python3 -m http.server 8080
```
Then open http://localhost:8080/

## Checks
```
node tests/laptop.mjs   # 0 layout issues at 1280x720, 1366x768, 1440x900, 1536x864
node tests/tells.mjs    # no "AI template" tells, no headings repeated across concepts
node tests/e2e.mjs      # gallery, links, console, overflow, menus, forms
node tests/perf.mjs     # phone budget: LCP, CLS, TBT, weight
```

## Sending a pick
`index.html` has `FORM_ENDPOINT` (a JSON form service) and `SEND_TO` (fallback email). With no endpoint the
visitor's email app opens with the summary filled in.

## Things to finish when a concept is chosen
- Replace the placeholder wordmark with the real logo and match the accent colour to it
- Team and office photos (see CONTENT-NEEDED.md)
- Build the inner pages (services, people, dates, contact, privacy, 404) in the chosen concept's language
- Wire the enquiry form to an endpoint and send a real test enquiry
- Remove `noindex`, add sitemap, canonical, GA4 and the privacy page, then the launch checklist
