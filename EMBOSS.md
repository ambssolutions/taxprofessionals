# Embossed style (owner request for 07 Toolkit and 09 Packages)

Reference: AMBS's MD Projects site, cloned at
/tmp/claude-0/-home-user-taxprofessionals/57a6ea05-06aa-58b8-9de9-8d26dcd3a61c/scratchpad/mdprojects/index.html
(search "Embossed surfaces" near line 421, "buttons: embossed gradients", "numbers house: an embossed slab").

The look: soft raised surfaces that seem pressed up out of the same background (one light source, top left).
- Tokens on :root, e.g. --emb (raised card), --emb-sm (buttons, chips), --emb-in (pressed / inset), --emb-photo.
  A deep soft shadow bottom-right in a blue-grey taken from the brand (#033F66 at low alpha), plus a highlight top-left.
- House rule: no white outer glow. Keep the highlight subtle: small offset, low blur, ~.6-.7 alpha on a light
  background (never a visible white halo), or use a 1px inner top highlight (inset 0 1px 0 rgba(255,255,255,.7)) instead.
- Surfaces sit on the same tinted background as the page (embossing only reads when card and page share a colour).
- Buttons: raised by default, pressed (--emb-in, translateY(1px)) on :active and while tapped; primary buttons keep the
  brand blue/green fill with a gentle top-to-bottom gradient and a soft coloured shadow, no glow.
- Icons, numbers, avatars and small badges can be debossed (--emb-in).
- Motion: tiles "press in" on tap and settle back (transition ~.25s), and rise out of the surface as they enter
  (shadow grows from none to --emb while translateY settles). No tilt.
- Dark mode, if the page has one: darker tokens, no white highlight at all.
- Text contrast: still WCAG AA on the embossed surfaces.
- Phones: box-shadow is cheap enough, but don't animate box-shadow on scroll for many elements at once; animate
  opacity of a pseudo-element that carries the shadow instead.
