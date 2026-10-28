# Simple, smooth scroll (owner: "scrolling experience is horrible", "simplify the scroll and smooth flow")

Measured on a 1440x900 laptop: 05 Studio was 28 screens long and pinned for 15.6 of them; 01 and 12 pinned for 12.2,
02 for 10.2. The page stood still for half the scroll. Smooth-scroll smoothing is now off on every design
(Lenis smoothWheel:false); keep it that way.

## Budget (laptop 1440x900 and 1280x720; tablets follow the laptop tier)
- Total pinned scroll at most 3 screens per design; each pinned scene at most 1 screen (the services book at most 1.5).
- Phones: total pinned at most 2 screens, each at most 1 screen.
- Laptop page length at most about 16 screens.
- No scrub lag above .4 (already capped). No pin that only "holds" a static frame.

## How to cut a scene that is over budget (keep the idea, drop the pin)
- Stacking promise / title cards: native CSS position:sticky stacking (opaque cards, each card's number and title
  showing), no ScrollTrigger pin.
- Sideways strips (leaders, timeline reel): a normal row that animates as it enters, or a short pin <= 1 screen.
- Reveals (curtain, shutter, wipes, zoom-outs): play on enter with a time-based tween (toggleActions), not scrubbed
  over a pin.
- A scene that is a pure pause: remove it.
Keep every real section, all content, the centring, the photo and text-over-art rules, the phone and tablet tiers and
reduced motion. Laptop and phone should both still have clear motion, just without holding the page still.

## Check
node /tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/audit/pins.mjs NN 1440
(prints page length and every pin) and again with 1280 and 390, within budget. Then laptop.mjs NN (a ?fx copy exists at
/tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/laptop-fx.mjs), align.mjs,
photos.mjs, overlap.mjs NN --sizes=390,1440, axe at 390 and 1440, no console errors or overflow at 390, 820x1180, 1440.
