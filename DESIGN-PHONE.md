# Phone and tablet motion tier (round 2b)

The owner reviews on a phone and says the designs have "no wow, animations missing". The reason: every concept
gates its GSAP effects on `(pointer:fine) and (min-width:1024px)` and >4 cores, so phones, tablets and the gallery's
Mobile/Tablet frames get a plain fallback. Fix: give touch and narrow screens their own real motion tier.

## The rule
- GSAP + ScrollTrigger run on phones and tablets too. Only these stay laptop-only: Lenis, custom cursors,
  pointer-follow / magnetic / tilt effects, heavy WebGL (more than one live canvas or shader that runs every frame).
- Gate the phone tier on `!reduce` only (not on cores, not on pointer). `?fx` still forces the laptop tier.
- Reduced motion: keep the current static fallback.
- Native scroll on touch (no Lenis, no scroll-jacking). Pins are fine with ScrollTrigger `pin:true` and
  `anticipatePin:1`, but keep each phone pin short (≤150% of the viewport height) and set
  `ScrollTrigger.config({ignoreMobileResize:true})` so the address bar does not cause jumps.
- Transform, opacity and clip-path only. No filter/blur animations, no backdrop-filter.
- Use `ScrollTrigger.matchMedia` / `gsap.matchMedia()` with separate laptop and phone setups so nothing leaks.

## What the phone tier must show (each concept: at least 5 visible moments in its own design language)
Translate the concept's laptop scenes to portrait rather than dropping them, for example:
- the hero entrance (line or letter mask rises, photo clip-path opening, or the concept's own signature)
- one pinned scene in portrait (e.g. sideways strip scrubbed by vertical scroll, stacking cards, a chapter swap)
- image reveals with clip-path wipes and a slow inner scale (1.15 → 1)
- headings that rise through line masks as they arrive (SplitText, lines, `autoSplit`/revert on resize)
- scrubbed text lighting (words go from .35 to 1 opacity) or a word-by-word quote
- small touch-native extras: tap ripples, a progress bar, a sticky chapter label, swipeable rows with snap
The laptop tier must stay exactly as it is.

## Non-negotiables (same as DESIGN-V2.md)
Real content only, no overflow at 390 px, hero fits 390×844, no console errors, copy rules (NZ English,
no em dashes, no exclamation marks, no hype). Phone reading text ≥15 px body / ≥14 px small, line-height ≥1.45.
Smooth: no layout thrash in onUpdate, `will-change` only while animating, images already sized.

## Check before you finish
1. `node tests/laptop.mjs NN` still 0 issues (laptop tier unchanged).
2. Playwright at 390×844 with `isMobile:true, hasTouch:true`: scroll the page in steps and take 4 screenshots at
   different points mid-animation to prove the motion is there. Look at them. No overflow, no console errors.
3. axe at 390: 0 serious or critical.
Report in five short lines: what moves on phones, checks, screenshot paths.

## Tablets get the full wow, not a cut-down version (owner, round 2b)
- Touch tablets (768 px and wider, coarse pointer: iPad portrait 820×1180, landscape 1180×820, iPad Pro 1024×1366)
  run the laptop scenes adapted for touch: the same pinned scenes, 3D or WebGL hero (one canvas, capped at
  devicePixelRatio 1.5), sideways strips and stacking. Leave out only Lenis, the custom cursor and hover-only effects
  (give hover reveals a tap or scroll trigger instead).
- Phones (under 768 px) get the portrait versions described above, still with at least 5 visible moments.
- Extra check: Playwright with `isMobile:true, hasTouch:true` at 820×1180 and 1180×820 too: screenshots mid-scroll,
  no overflow, no console errors, hero fits the first screen.

## Centre alignment (owner, again)
The owner asked twice for centred layouts. Laptop round-2 builds slipped back into split layouts with headings and intros
on the left. On every screen size: the hero copy, each section heading, the intro paragraph under it, the award text,
the director/feature text and the footer sit on the centre line (text-align:center, block centred with margin-inline:auto,
intros max 62ch). Photos go above or below centred copy, or full-bleed behind it, not beside left-aligned copy.
Keep left-aligned: tick lists, FAQs, timelines, tables, forms, card body text. A two-column layout is fine for cards
or a photo grid, but the heading above them is centred.
Check with /tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/audit/align.mjs NN
(prints headings and intros that are off-centre at 1440 and 390; aim for 0).

## Photos are centred too (owner, angry: "told you 100 times")
Centring covers PHOTOS, not only text. On every screen size:
- Team and people cards: portrait centred at the top of the card, name, title and credentials centred under it.
  No avatar-left / text-right rows. A list of names without photos may stay left-aligned.
- Single photos (award, office, meeting, service photos, the director): centred on the column, above or below
  centred copy. Never a photo pushed to one side beside text, on laptops either.
- A row of several photos is fine if the row as a group is centred.
- Full-bleed photos are fine.
Check: node /tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/audit/photos.mjs NN
(must print 0 for both 1440 and 390), plus align.mjs NN at 0.

## No text over background components (owner)
Text must never sit on top of decorative shapes, cubes, big outline numbers, 3D canvases, SVG art, photos or other
text, at any moment of the scroll, on phone, tablet or laptop. Allowed only: text on a full-bleed backdrop that fills
its section (a hero photo with a scrim), and text inside its own opaque chip or card. Decorative numbers and shapes go
beside, above or below the text, or are clipped so they never reach it; in pinned scenes the text and the art each
keep their own box.
Check: node /tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/audit/overlap.mjs NN
(390, 820 and 1440; aim for 0, and look at any flagged frame).
