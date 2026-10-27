# 05 Studio becomes the flagship (owner: "merge all effects in the Studio version, it will be the recommended one")

Keep Studio's film language (dark cinematic, letterbox, title cards, credits, grain) as the frame, and bring the best
effects from the other eleven concepts into it, each re-dressed in that language. One idea per section; no section
gets two competing effects. Keep everything that already works: title sequence, zoom-out slideshow hero, letterbox
promise title cards, credits roll, shutter award, subtitle quote, Play/Pause cursor, the phone and tablet tiers,
the chat bot (`<!--chat-->` block near the end: leave it exactly as it is), the shared font switcher.

## Effects to merge in (source concept in brackets)
1. **Services book** (01 / 12, MD Projects): replace the pinned services wipe with the 3D page-turn book. Study the
   finished implementations in designs/12-story/index.html and designs/01-partners/index.html and BOOK-EFFECT.md.
   Dress it as a dark "production book": deep blue pages, ivory text, the photo on the right page. Laptop/tablet:
   pinned open book. Phone: sticky single page with arrows. Screen readers: book aria-hidden, plain list sr-only.
2. **Live IRD countdown on split-flap digits** (02): in the dates section, styled like a cinema departures/title board.
3. **Tax-year timeline that draws itself** (10 / 12): the dates section's months on a pinned sideways reel (film strip
   frames, sprocket edge), today marked, drawn as you scroll.
4. **Sideways portrait reel for the three leaders** (01): Ranjana, Varun, Eshan as a pinned sideways film strip
   with names and credentials rising through masks, before the credits roll of the wider team.
5. **Theatre curtain / 3D panels** (11): one transition only, the curtain parting onto the award (before the shutter),
   CSS 3D on phones, the existing approach on laptop.
6. **Kinetic type** (08): the tax terms strip (GST, PAYE, IR3, IR4, provisional tax, FBT, tax pooling) streams past
   and leans with scroll speed, between two sections, like end-credit type.
7. **Word-by-word scroll lighting** (12): the welcome paragraph (the subtitle quote stays as it is).
8. **Embossed controls** (07 / 09, EMBOSS.md): buttons, chips, tabs, the countdown digits and the book arrows get the
   dark-mode embossed treatment (no white highlight on dark: a soft deep shadow plus a 1px inner top light).
9. **Map pin drop** (03): in the contact section, a small illustrated map of Manukau Road whose pin drops onto 620
   when it arrives (no flyover; static SVG + one animation).
10. **Partner logo marquee** stays (shared motion.js).

Leave out (they clash with the film language or would overload the page): 06's liquid ripple, 09's gradient mesh,
07's bento pile, 04's 3D structure scene.

## Non-negotiables (all in DESIGN-PHONE.md and DESIGN-V2.md)
Real content only (BRIEF.md). Phones get every effect in a portrait form that stays smooth (transform/opacity/clip only,
one WebGL canvas at most, DPR <= 1.5). Tablets get the laptop scenes on native scroll. Reduced motion: static.
Centre alignment of headings, intros, photos and person cards; no text over background components; hero fits
1280x720 and 390x844; no overflow; no console errors. Pins short on phones (<= 150% each) and the total page must not
feel endless: if a merged scene makes the page longer than about 2.2x the current length on phones, shorten pins.

## Checks before reporting (all must be 0 / clean)
- node /home/user/taxpro-concepts/tests/laptop.mjs 05 (and a ?fx copy; this machine has 4 cores)
- audit/align.mjs 05, audit/photos.mjs 05, audit/overlap.mjs 05 (390, 820, 1440)
- Playwright isMobile+hasTouch at 390x844, 820x1180, 1180x820: no overflow, no console errors, hero fits
- axe 0 serious/critical at 390 and 1440
- chat still works: node <skill>/scripts/try_questions.js http://127.0.0.1:8765/designs/05-studio/ "is the first consultation free"
- every font option (audit/fonts.mjs 05) clean
Audit scripts live in /tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/audit/.
Update designs/05-studio/meta.json: "fx" list (one plain sentence per effect, NZ English, no em dashes), "desc",
"tags", and "rec" (why it is the recommended design).
