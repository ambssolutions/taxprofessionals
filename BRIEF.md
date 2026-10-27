# Tax Professionals Ltd: website concepts brief

Ten homepage concepts for a redesign of https://www.taxprofessionals.co.nz/. Prepared by AMBS Solutions.

## Content truth (only these facts may appear)

The current site could not be scraped from the build sandbox (network policy). These facts come from web search
of the firm's own pages and directory listings (LinkedIn, Yellow, TMNZ, Crystal Payroll). Use nothing else.

- **Name:** Tax Professionals (company: Tax Professionals Ltd). Site title on current site: "Tax Professional Services".
- **Where:** 620 Manukau Road, Epsom, Auckland 1023. Map link: https://www.google.com/maps/search/?api=1&query=620+Manukau+Road+Epsom+Auckland+1023
- **Since:** 1998 ("working for the community since 1998"). Write "Since 1998", never compute a year count.
- **Phones:** 09 625 0035 (`tel:+6496250035`), 09 625 0025 (`tel:+6496250025`), mobile 021 141 9135 (`tel:+64211419135`).
- **Email:** info@taxprofessionals.co.nz
- **People:**
  - Ranjana Gupta, Director, Chartered Accountant (CA, NZ)
  - Vipul Koradia, Taxation Accountant
  - Deepti Nanda, Taxation Accountant
  - Mandeep Kaur, Taxation Accountant
  - Jigar Parikh, Taxation Accountant
  - No photos available: use initials monograms or hide the photo (`data-need="team photos"`). Never stock faces.
- **Services (their words):**
  - Tax compliance: income tax returns (individuals, companies, trusts, partnerships), GST returns, PAYE returns
  - Bookkeeping
  - Property: advice on property structures and managing property investors' affairs
  - Company formation
  - Trust administration
  - Business advisory
  - Employment law and HR advisory
  - Payroll services
- **Partners:** TMNZ Premium Accounting Partner (tax pooling). Crystal Payroll recommended partner. You may say "TMNZ Premium Accounting Partner" and "Crystal Payroll recommended partner". No logos of theirs.
- **Socials:** Facebook https://www.facebook.com/TaxProfessionalsNZ/ ; LinkedIn https://nz.linkedin.com/company/tax-professionals-limited
- **Reviews:** they have reviews online but we have no text or permission. No testimonials, no star ratings, no review counts. A `data-need="testimonials"` block that is hidden is fine.
- **Do NOT invent:** client counts, years-of-experience numbers, awards, prices, fees, "free consultation", response times, opening hours, memberships other than the CA credential above, staff numbers.

### Public NZ tax facts (true for every taxpayer; fine to use, state as general information)
Inland Revenue standard dates (31 March balance date):
- Income tax returns (IR3 etc.) due **7 July**; extended to **31 March** the following year for clients of a tax agent.
- Terminal tax due **7 February**; **7 April** for tax-agent clients with an extension of time.
- Provisional tax (standard method, 3 instalments): **28 August, 15 January, 7 May**.
- GST: due the **28th** of the month after the period ends, except periods ending November (due **15 January**) and March (due **7 May**).
- PAYE / employment information: payday filing within 2 working days of payday; PAYE paid by the 20th of the following month (small employers).
- NZ tax year runs 1 April to 31 March.
Add a small line near any dates: "General dates from Inland Revenue. Your own dates may differ; we will confirm them."

## Brand
- **Logo:** not supplied (could not download). Use a clean typographic wordmark "Tax Professionals" in the concept's display face, with a simple SVG mark if it suits the concept. It is a placeholder: the gallery says so. Keep it as an inline `<svg>` or text so it can be swapped.
- **Colours:** unknown. Each concept picks its own palette per its brief below. When the real logo arrives the accent is matched to it.
- **Photos:** none available, and stock hosts are blocked. Every section still needs a visual anchor: use real data (dates, services), SVG illustration, CSS-built objects (ledger, calendar, forms, receipts, a map of Manukau Road), typographic composition. No stock photo placeholders, no grey boxes.

## Audience
Individuals and families (IR3s, rental property), small business owners (GST, PAYE, payroll, bookkeeping, HR), property investors (structures, trusts), new companies. Epsom/Auckland community; many clients from Auckland's Indian community (it is listed in Indian business directories) but do not stereotype: no cultural clichés.

## Copy rules
NZ English (organise, programme, centre). Short plain sentences. No em dashes. No exclamation marks. No hype (seamless, unlock, revolutionise, leverage, cutting-edge, empower, elevate, journey, stress-free, peace of mind cliché).
Phone shown "09 625 0035", linked `tel:+6496250035`. Address links to Google Maps. Plain-label headings (e.g. "GST returns", "Dates to know", "Who you will work with"). Avoid "X. One Y." headings, triplets, an accent-coloured word in every heading, eyebrows on every section.

## Concept set (each is its own idea of the client)
| NN | slug | Name | Type · Style | Motion | Idea |
|---|---|---|---|---|---|
| 01 | 01-ledger | Ledger | Editorial · Accounting paper | Subtle motion | The firm as a well-kept ledger: cream paper, ruled lines, mono figures, hairline columns, ink and a deep bottle green. Services read like ledger entries with page numbers. Ruled lines draw in. |
| 02 | 02-calendar | Tax Year | Interactive · Calendar-led | Interactive | Organised around the NZ tax year. Hero is a live "next due date" card computed from today's date with a 12-month strip (April to March). Click a month to see what falls due and which service handles it. Bright, clean, blue + warm yellow. |
| 03 | 03-epsom | Manukau Road | Local · Warm neighbourhood | Animated | A neighbourhood practice on Manukau Road since 1998. Warm terracotta/sand, friendly serif, an illustrated SVG street map (Manukau Road, Epsom, near One Tree Hill / Maungakiekie, Greenlane) drawing in, the five people front and centre (monograms), "Visit us / Call us". |
| 04 | 04-property | Structures | Specialist · Dark navy and brass | Interactive | Lead with property investors. An interactive structure diagram (you → trust → company/LTC → properties) whose lines draw and nodes highlight as you choose "I own one rental / several / building a portfolio / setting up a trust". Then the other services. |
| 05 | 05-index | Index | Typographic · Swiss grid | Animated | A strict Swiss grid, huge Helvetica-like type (Inter Tight / Archivo), white with a signal red. The homepage is an index: 01 Income tax … 08 Payroll, with the tax-date table set like a timetable. Numbering is the design system. |
| 06 | 06-private | Private Client | Premium · Quiet luxury | Subtle motion | Quiet, premium private-office feel: deep forest green, cream, a refined serif. Native CSS sticky stacking service cards (opaque, each a different tone, big number) and slow 1.4s grid-template-rows folds for detail. Director-led message from Ranjana Gupta CA (written as an invitation, no invented quotes). |
| 07 | 07-bento | Toolkit | Small business · Bento tiles | Interactive | For small business owners. A bento grid of flat colour tiles (GST, PAYE, Payroll, Bookkeeping, HR, Company setup) plus a 3-question "What do you need help with?" chooser that recommends services and pre-fills the enquiry. Friendly, rounded, mint/ink/coral. |
| 08 | 08-kinetic | Kinetic | Bold · Kinetic type | Highly animated | High energy: near-black with an electric lime. Kinetic marquees of tax terms (GST · PAYE · IR3 · IR4 · FBT · RWT · Provisional tax), big split-letter hero, horizontal service scroller using CSS scroll-snap (no scroll-jacking), magnetic hover on the CTA, custom cursor only on fine pointers. |
| 09 | 09-paperwork | Paperwork | Playful · Form and stamp | Highly animated | The tax return as design: hero is a stylised return form (boxes, field labels) that fills itself in with a typewriter effect and gets a "Filed" stamp. Sections look like forms, receipts and folders. Pale blue paper, navy ink, red stamp. Still calm to read. |
| 10 | 10-capability | Capability | Corporate · Table-led | Subtle motion | Sober capability statement for companies, trusts and employers. Table-led: Service / What we prepare / How often / Due. A "What to bring" checklist, people listed with credentials, partners (TMNZ, Crystal Payroll). Slate, white, a steady teal. |

Recommended: 02 Tax Year (useful, brings clients back every month), 03 Manukau Road (human and local, matches a 1998 community practice), 06 Private Client (premium, uses the owner's favourite sticky stack and slow folds).

## Competitors (named by the owner): stand apart, never copy
- Grant Thornton NZ (grantthornton.co.nz) and BDO NZ (bdo.nz): big-firm corporate sites. Their look is large stock photos of people, a purple or red brand, and long menus. Tax Professionals should feel closer and more personal. Don't use purple or red as the main brand colour, so the sites don't get mixed up.
- Airwallex (airwallex.com): a fintech product site, very polished, with crisp UI panels and confident type. Concepts 02, 07 and 08 can match its level of polish (crisp UI-style panels, smooth micro-interactions) but must not look like a software product page.
- Aurora Financials (aurorafinancials.com): a modern small accounting practice. We need to look clearly more distinctive and more useful (real dates, real people, clear services).
Never copy their wording, layouts or colours.

## Proven AMBS patterns: use these (the owner asked for "the skills used on other AMBS sites")
The past AMBS sites are cloned read-only at /home/user/refs/: mikia (the quality benchmark), AMBS-Website (ambs.co.nz), thomasconsultants, teamkarl and jotpunia. Study the patterns. Take their craft, never their brand or words. Use grep with line numbers; the files are big.
- **Light sweep on the primary button:** AMBS-Website/assets/home.css, search `hero-sweep` and `btn--sun::before`. A soft diagonal shine every few seconds. The owner likes it.
- **Hero heading sheen:** AMBS-Website/assets/home.css, search `hero-sheen` and `tx-accent`. One gradient sheen passes over the accent word once after load. Use it at most once per page.
- **Sticky stacking cards:** AMBS-Website/assets/home.css, search `#how .step`, `--stack-top`, `--depth` and `#how .sec-head`. The heading sticks under the top bar, the cards stick at `top:calc(var(--stack-top) + var(--i)*72px)` so each one's number row stays visible, and they are fully opaque. A slight scale-down of buried cards (`--depth`) is fine.
- **Slow fold:** AMBS-Website/assets/home.css, search `wd-body`. `grid-template-rows:0fr→1fr` over 1.4s with `cubic-bezier(.45,.05,.25,1)`.
- **Story-progress carousel:** mikia/index.html and mikia/assets/css-index.css, search `car-tab`, `car-slide` and `sbar`. Tabs with progress bars that autoplay, pause on hover or focus, and have ticked points.
- **Header:** sticky, white at 94% with a 12px blur on laptops only (no live blur on phones), and a hairline bottom border.
- **Ticks lists, mono labels (`.mono`), CTA band and mobile quick bar:** see mikia/index.html.
- **thomasconsultants/designs/** has 10 concepts that went through 7 feedback rounds. Open 2 or 3 to see the finish level expected, then go further.
Remember: native motion only, nothing scroll-jacked. Phones come first and must stay smooth. Everything must fit at 1280×720.

## Content from their live site (added after launch of the gallery; use it in every concept)
Source: search-engine extracts of the firm's own pages (the sandbox cannot open the site). Facts only; wording below is paraphrased, so write it in the concept's own voice. Link to the live pages where noted.

### The four service pillars (use these exact names as the top-level services)
1. **Taxation & Accounting Compliance** (https://www.taxprofessionals.co.nz/taxation-accounting-compliance): bookkeeping, GST, PAYE and income tax returns, financial statements, tax planning, business structuring. Employment & HR Advisory can be added on to this package.
2. **Business Advisory & Planning** (https://www.taxprofessionals.co.nz/business-advisory-planning): business plans and strategic growth, performance and accountability, profit improvement and cashflow, systems and processes. Business Planning: the first meeting is free of charge (a workshop covering 3-month, 12-month and 3-year planning); a monthly coaching option exists. Say "First meeting free" only for Business Planning, since that is what their site says.
3. **Employment & HR Advisory** (https://www.taxprofessionals.co.nz/employment-hr-advisory): employment agreements and policies, employment legislation, employee policies and procedures, restructuring and redundancy, employer accreditations, audits and investigations, help preparing records for a Labour Inspector visit.
4. **Property Investment & Development** (https://www.taxprofessionals.co.nz/property-investment-development): investment strategy, structuring advice (personal, company or trust), tax returns, cash flow tools; the associated-persons rules can make a buy-and-hold property taxable when linked to development or trading. The director and partner have published on New Zealand's land tax regime and are active property investors.
Payroll services, company formation and trust administration stay as sub-services under pillar 1 (or 4 for trusts), not as separate pillars.

### People (additions)
- **Ranjana Gupta**, Director, Chartered Accountant. Also a senior lecturer in taxation at Auckland University of Technology and a published tax author (Thomson Reuters "New Zealand Taxation"). Write: "Director. Chartered Accountant, senior lecturer in taxation at AUT, and a published tax author."
- **Varun Gupta**, Business Advisor: holds a Business Advisor certification, member of the Institute of Advisors, and a registered partner of the Regional Business Partner Network. Add him to the people section (6 people now) with that line.
- The four taxation accountants stay as before.

### Award (true, from their About Us page)
"Accountant of the Year 2019–2020, Indian Newslink Indian Business Awards". You may show this once per page, plainly, no trophy icon needed.

### Hours and payment (from the Pay an Invoice page)
- Reception: 9:30am to 5:30pm (weekdays implied; write "Monday to Friday, 9:30am to 5:30pm").
- Pay an invoice: online by Visa or Mastercard, by phone, by direct debit, or by bank transfer quoting the invoice number. Link "Pay an invoice" to https://www.taxprofessionals.co.nz/pay-an-invoice (nav or footer; a small utility link, not a hero item).

### Client resources (https://www.taxprofessionals.co.nz/client-resources)
Tax payment due dates. When a due date falls on a weekend or public holiday it moves to the next working day. Add that sentence to every dates section. Link "Client resources" from the dates section or footer.

### Insights / News (https://www.taxprofessionals.co.nz/insights-/-news)
They publish regularly. Add an "Insights" section or strip to each concept (in the concept's own form: 3 to 4 items, titles linking to the live articles, no dates since we don't have them, no invented summaries beyond the title):
- "KiwiSaver Contribution Changes from 1 April 2026" https://www.taxprofessionals.co.nz/insights-/-news/kiwisaver-contribution-changes-from-1-april-2026
- "Inland Revenue's Crackdown: Is Your Business Ready for the New Wave of Tax Audits?" https://www.taxprofessionals.co.nz/insights-/-news/inland-revenues-crackdown-is-your-business-ready-for-the-new-wave-of-tax-audits
- "Buying a Business in 2026: What's Changed?" https://www.taxprofessionals.co.nz/insights-/-news/buying-a-business-in-2026-whats-changed
- "GST Tips for Small Businesses" https://www.taxprofessionals.co.nz/insights-/-news/gst-tips-for-small-businesses
- "Why Most Mortgage Structures in NZ Are Wrong" https://www.taxprofessionals.co.nz/insights-/-news/why-most-mortgage-structures-in-nz-are-wrong
- "Crypto Investors Urged to Get Tax Compliant" https://www.taxprofessionals.co.nz/insights-/-news/crypto-investors-urged-to-get-tax-compliant-ird-steps-up-enforcement
- "How to Prepare Your Business for Sale When You're Retiring" https://www.taxprofessionals.co.nz/insights-/-news/how-to-prepare-your-business-for-sale-when-youre-retiring
Pick the ones that suit the concept's audience (property ones for 04, small-business ones for 07, and so on). Link with target="_blank" rel="noopener".

### Navigation
Their site's sections: Home, About Us, the four services, Client Resources, Insights / News, Pay an Invoice, Contact Us. Each concept's nav keeps its own labels, but the footer "Explore" column should now include Client resources, Insights and Pay an invoice (linking to the live pages).
