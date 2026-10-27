# Tax Professionals concepts, round 2: the "wow" standard

The owner's verdict on round 1: "boring, no wow factor, animations missing, no modern effects, looks like old-style websites apart from one or two". The ones he liked: **05 Studio, 11 Reveal, 12 Story** (photo-led, cinematic, scroll-driven). Every concept is now rebuilt to beat those.

## What changes from the house rules (owner approved for this project)
ALLOWED now, and expected:
- **GSAP + ScrollTrigger pinned scroll scenes**: sections that pin while text, images and shapes animate through them; horizontal scrolling galleries; scrubbed timelines. (`assets/vendor/gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js`, `Flip.min.js`, `Observer.min.js`; GSAP 3.13, all plugins free.)
- **Lenis smooth scroll** on laptops (`assets/vendor/lenis.min.js`), synced to ScrollTrigger via `gsap.ticker`. Page/section transitions (curtains, morphs, wipes).
- **3D / WebGL**: shader heroes (liquid image distortion, brand-colour gradient mesh, noise), or three.js scenes (`assets/vendor/three.module.min.js`, ES module, ~690 KB: load with dynamic `import()` after first paint, only on capable devices). Prefer a hand-written WebGL fragment shader when it is enough (tiny).
- **Cursor and hover effects** on fine pointers: custom cursor, image-reveal-on-hover lists, magnetic elements, image trails.
- SplitText character/word/line reveals, masks, clip-path wipes, scale/zoom-out reveals, parallax depth, velocity-skew marquees.
STILL REQUIRED (non-negotiable):
- Real content only, from BRIEF.md sections "VERIFIED content from the live site", "BRAND AND PHOTOS", "OWNER DIRECTION" (no paper metaphors). Real logo, brand blue #04649F / deep #033F66 / green #4CA442 / dark green #1B8F25 (green text), real photos (`assets/img/*`, real sizes in BRIEF).
- Phones: everything must work and stay smooth. Lighter motion on `(pointer:coarse)` or `hardwareConcurrency<=4`: no WebGL there (use the photo / a CSS fallback), pins allowed only if short and smooth; no Lenis on touch.
- `prefers-reduced-motion`: no pins, no smooth scroll, no WebGL motion; content shown statically and complete.
- Content visible if scripts fail (hide only under `html.js`). No layout shift. Hero fits the first screen at 1280×720 and 390×844. No horizontal page overflow (pin spacers and 3D must not widen the page).
- Copy rules: NZ English, no em dashes, no exclamation marks, no hype words. Centre-aligned section headings unless the composition is deliberately asymmetric. Accessible: skip link, labelled navs, menu button aria-expanded/aria-controls, 44px targets, focus visible, alt text, form honeypot + aria-live.
- Plumbing: `<html lang="en-NZ" data-concept="NN-slug">`, noindex, JSON-LD AccountingService, phone quick bar as `<nav aria-label="Quick contact">` hidden while the hero shows, partner logos as a plain `<ul>` of `assets/logo/partner-NN.png` (a shared script makes it a carousel), and before `</body>`: vendor scripts (defer) → your inline script → `<script src="../../assets/motion.js" defer></script>` → `<script src="../../assets/concepts.js" defer></script>`.
- Performance: HTML < 150 KB; first load on a phone < 1.5 MB; LCP < 2.5 s; WebGL/three only after load.

## The bar
Think Awwwards Site of the Day for a professional firm: one unforgettable signature scene, choreographed hero intro, at least three distinct scroll scenes, crafted hover states, a transition between sections. Every concept must look like a different studio made it. Do NOT reuse the hero composition or signature of another concept.

## Deliverable per concept
- `designs/NN-slug/index.html` (replace the round-1 file at the same path; keep the slug).
- `designs/NN-slug/meta.json`: {"name","type","style","motion","insp","desc","tags":[3],"fx":[4-6 plain-English effects],"sw":[3 hex]} (the coordinator merges it into the gallery; do NOT edit assets/concepts.js yourself).

## Owner addendum: ultra-HD and real variety
**Ultra-HD / 4K feel**
- Every graphic that we draw must be resolution-independent and razor sharp on 4K and Retina: SVG, CSS, WebGL/canvas rendered at `devicePixelRatio` (cap at 2 for performance), variable/web fonts. No raster icons, no blurry shadows faked with images, no upscaled bitmaps.
- Photos are limited (portraits 500px, community 960px, office 1920px). Never display a photo larger than its native pixels × 1 on a 2x screen budget: portraits max ~320 CSS px wide, community max ~640, office photos can go full-bleed only behind a duotone/gradient/blur treatment or as a background with overlaid type. Prefer cropping, masks, duotone and colour grading over enlarging.
- Premium detail: fine 1px hairlines, subtle noise/grain via SVG feTurbulence or shader (not images), crisp glassmorphism only where the page is calm (no live backdrop-blur on phones), high-contrast type at large sizes, smooth 60fps motion, sub-pixel-accurate alignment, generous whitespace.

**Each concept a different flavour.** Assigned design languages (do not drift into another's):
01 Partners: luxe editorial portraiture: ivory and deep blue, high-contrast serif display, big portrait crops, slow parallax depth.
02 Tax Year: precise Swiss-tech product UI: crisp grid, mono numerals, split-flap digits, brand blue panels, data-viz feel.
03 Manukau Road: warm spatial / cartographic: 3D map, soft daylight colours, rounded friendly sans, depth and perspective.
04 Structures: dark 3D tech: deep blue #033F66 space, WebGL low-poly nodes, thin green light-lines, futuristic yet calm.
05 Studio: cinematic film: full-bleed photography, letterbox framing, title-sequence type, slow crossfades and zoom-outs.
06 Private Client: liquid luxury: WebGL liquid distortion on images, serif + fine sans, deep blue and cream, slow and silky.
07 Toolkit: playful product bento: tiles that assemble with Flip, rounded geometry built from the brand squares, springy micro-interactions.
08 Kinetic: brutalist kinetic type: oversized condensed type, velocity-skew marquees, scroll-scaled words, high contrast.
09 Packages: glass and gradient SaaS: brand-colour gradient mesh (WebGL), glass cards, 3D card flips, crisp product pricing feel.
10 Capability: corporate data room: dark dashboard aesthetic, animated charts and lines drawing (real dates only, no invented numbers), precise tables.
11 Reveal: theatrical: book/door panels that open, stage lighting gradients, dramatic reveals.
12 Story: long-form scrollytelling: huge type, sticky photos, chapter transitions, magazine pacing.

## 4K brand renders (owner approved, abstract brand art only)
Rendered in-house with three.js at true 4K in the exact brand colours. Decorative only: never present them as photos of the firm.
| file (in assets/img) | sizes | what |
|---|---|---|
| brand-cubes-dark-{3840,1920,960}.webp | 3840×2160 | glossy rounded blue/green/white/glass cubes floating on a deep-blue gradient; left 40% kept clear for a headline |
| brand-cubes-light-{3840,1920,960}.webp | 3840×2160 | the same cubes on an ivory-to-mist gradient; left side clear |
| brand-tiles-iso-{2400,1200,600}.webp | 2400×2400 | isometric arrangement of the brand's overlapping squares as glossy tiles, light background |
| brand-cubes-dark-portrait-{1440,720}.webp | 1440×2560 | phone version of the dark cubes |
Use with srcset/sizes (e.g. `sizes="100vw"`), width/height, `fetchpriority="high"` when it is the hero LCP. Parallax layers or a slow Ken-Burns-free drift are fine; never stretch above native size.
Suggested homes (not mandatory): 07 Toolkit (iso tiles), 09 Packages (light cubes behind glass cards), 11 Reveal (dark cubes behind the opening panels), 10 Capability (dark cubes in the header band).
