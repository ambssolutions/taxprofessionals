# Services book (owner wants the MD Projects book-opening effect)

Reference implementation (AMBS's own site, mdprojectsnz.vercel.app), cloned at
/tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/mdprojects/index.html
- CSS: lines 583-640 (`.bk` laptop open book, `.pbk` phone single-page book), 1068 and 1207 (short screens), 1397 (dark).
- JS: lines 2473-2560 ("services: a real book").

How it works
- Laptop and tablet: an open book pinned with ScrollTrigger (scrub). Left page = a service's words, right page = its photo.
  Each scroll stretch turns the right leaf over the spine (rotationY 0 to -180, transform-origin left, preserve-3d,
  backface hidden). Its back face is the next service's words, landing on the left. The lifting page darkens, a cast
  shadow falls across the page below, the next photo settles from scale 1.1. A thin spine line and a page-edge stack behind.
- Phones: a single-page book (photo on top, words below) in a tall track with a CSS sticky stage (native scroll, no JS pin).
  Scroll position picks the target page; leaves turn one at a time (0.9s) until it shows the target. Prev/next arrows
  scroll to that page's stretch so arrows and scroll agree. Only the current leaf and the one under it are displayed;
  3D is switched on only while a page turns (smooth on phones).
- Reduced motion: no book, the plain service list.

Rules for Tax Professionals
- Content: the four real service areas from BRIEF.md (titles, one-line descriptions, the bullet points it lists, and links),
  with the real svc-* photos in /home/user/taxpro-concepts/assets/img/ (check sizes; no upscaling past native size).
- Translate the look into the concept's own design language and brand colours (#04649F blue, #4CA442 green, deep
  #033F66). No paper texture or skeuomorphic paper: clean flat pages, the 3D comes from the turn, shading and the spine.
- Page text: heading centred above the book; text on the pages left-aligned. Fits 1280x720 and 390x844 with the header.
- Keep the page's existing tiers (laptop / touch tablet / phone / reduced motion) and checks from DESIGN-PHONE.md.
