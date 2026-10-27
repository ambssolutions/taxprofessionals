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

## VERIFIED content from the live site (scraped 27 Oct 2026; this section OVERRIDES everything above where they differ)

### Corrections to earlier sections
- **Varun Gupta is PARTNER**, not "Business Advisor". Credentials: Master of Business Administration (MBA), Chartered Accountant (NZ), Certified Business Advisor. Their site: "an avid property investor and developer with first-hand experience of the pitfalls and challenges". Also: Business Advisor certification, member of the Institute of Advisors, registered Regional Business Partner.
- **Ranjana Gupta, DIRECTOR.** Credentials as listed on their site: Ph.D, Master of Philosophy, Master of Business (Taxation), Master of Commerce. She "has published commentary, articles and chapters on New Zealand's land tax regime in various accounting and tax textbooks and journals" and is a senior lecturer in taxation at AUT. Do NOT call her a Chartered Accountant (their site does not).
- Write her line as: "Director. PhD, MPhil, MBus (Taxation), MCom. Published author on New Zealand's land tax regime." Varun's: "Partner. MBA, Chartered Accountant (NZ), Certified Business Advisor."
- **"First consultation free"** applies to all matters ("First consultation free on all matters"), not only Business Planning. Business Planning additionally says "First meeting free of charge".
- **Office hours:** Mon to Fri 9:30am to 5:30pm, **Sat 11:30am to 3:00pm**, Sun closed. "Centrally located with abundant free on-site parking."
- Company name in footer: "© 2026 Tax Professionals". Site title: "Tax Professional Services". CTA label they use: "Book a chat".

### The full team (12 people, in this order; titles exactly as on their site, in sentence case)
1. Ranjana Gupta, Director
2. Varun Gupta, Partner
3. Eshan Gupta, Associate Partner. BCom/LLB, admitted Barrister and Solicitor (NZ). Writes the Insights articles.
4. Hemant Kumar, Senior Taxation Accountant
5. Rizwan Sheikh, Senior Taxation Accountant
6. Vipul Koradia, Taxation Accountant
7. Deepti Nanda, Taxation Accountant
8. Mandeep Kaur, Taxation Accountant
9. Jigar Parikh, Taxation Accountant
10. Syed Shafi, Junior Accountant
11. Reeti Patel, Accounts Administrator
Each has an email first-name@taxprofessionals.co.nz and the office extension on 09 625 0025. Show the three leaders large and the rest as a list or small grid. Photos exist for Ranjana, Varun, Hemant and Rizwan (not downloadable yet, CDN blocked); keep `data-need="team photos"` slots so they can drop in.

### Their own words (use these; they are the client's copy)
- Home welcome: "We understand how important it is for business owners to know how profitable they are at any given instance. The traditional ways of annual accounting and compliance are clearly inappropriate in today's business environment."
- About: "Working for the community since 1998." "At Tax Professionals we believe in quality customer service and explaining things in your language. Things can get tricky when it comes to tax so our dedicated team members are there to help and get things done thoroughly and professionally with a smile."
- "Why Tax Professionals?" (five promises, use as a list or a sticky stack):
  1. First consultation free on all matters
  2. Tax experts with over 20 years of experience
  3. Specialists in property development and structuring
  4. Fixed fee services. No more shock bills
  5. Tailored support and service packages based on your needs
- Services one-liners: Taxation & Accounting Compliance: "Tax compliance and practical consulting services." Business Advisory & Planning: "Create a profitable, thriving and valuable business." Employment & HR Advisory: "Your employment law and HR partner." Property Investment & Development: "Practical advice on optimal structuring of your property investments and developments to keep up with the ever-changing property taxation laws and regulations."
- Award: "Accountant of the Year 2019-2020, Twelfth Annual Indian Newslink Indian Business Awards (25 November 2019, SkyCity). Also a finalist, Small Business of the Year."
- Testimonial (published on their About page, attributed): "We have been dealing with Varun Gupta at Tax Professionals for over a year now. The advice we have received from Varun and his team has been on point, on time and meaningful. We truly work as partners that has helped our business navigate through some turbulent times. Cannot recommend them enough." — Infinity Flowers. Use at most once per page; write the attribution as "Infinity Flowers, client".

### Service detail (verified)
**Taxation & Accounting Compliance**
- Individuals / rental property / LTCs (monthly fee, enquire): IR3 returns, rental property annual returns, partner or joint-holder returns, Inland Revenue liaison. Fees vary with the property portfolio.
- Businesses (sole traders, partnerships, companies, trusts; MYOB and Xero): 2- or 6-monthly GST returns, IR4 company returns and up to two shareholders' IR3s, annual imputation credit return (IR4J), end-of-year financial statements, quarterly meeting on business performance, Inland Revenue liaison, free training and ongoing support on accounting software. Add-ons: full PAYE and payroll; Employment & HR Advisory.
- Other tax services: trust formation and management, standalone PAYE and payroll, company formation and Companies Office records, business planning and forecasts, annual budgeting, management reports, FBT returns, tax pooling.
- **IRD disputes and resolutions / tax debt:** help with compliance reviews, IRD audits and liaison; negotiating arrears (GST, PAYE, income tax); responding to letters of demand. Tone on the page: "Whatever the tax position, talk to us."
- **Tax pooling** through Tax Management NZ (TMNZ): pay provisional tax when it suits you.
**Business Advisory & Planning:** Business Planning (first meeting free; a one-on-one workshop for the next 3 months, 12 months and 3 years, covering business and personal goals), Cashflow Forecasting, Monthly Coaching. Benefits list on their page: "You'll know where you are heading and what the goals are. You'll have a solid plan and an implementation timetable…"
**Employment & HR Advisory:** Employment relations and policies; Employer accreditation ("mandatory from 2021"); Restructure and redundancy; Personal grievances and disputes; Audit and investigations (Labour Inspector readiness). "The most valuable asset in your business is your staff."
**Property Investment & Development:** strategy, structuring (personal, look-through company, trust), returns and financial statements, cash-flow tools (hold and trade), introductions to alliance partners and mentoring programmes. Investor questions they list: "How should I own my investment property?", "Should I use a look-through company or invest individually or use a trust?", "How do I break associated person rules…", "How do I keep growing my investing activities safely?" Strategies: buy and hold, trading and flips, development, lease options, rent by the room, land banking, GST implications. **Family Trust Management & Advisory**: about 500,000 trusts in NZ; trained staff in trust and estate management.

### Client resources (verified)
"Tax payments must be made on or before the due date. Where the due date falls on a weekend or a public holiday, the payment is due on the next working day. GST is an exception and will always be payable on the last working day of the taxable period. Depending on your individual circumstances the due dates that apply to you may be different." Links they give: IRD, Working for Families calculator, PAYE/KiwiSaver calculator, income tax calculator, tax code declaration form, tax credit claim form, GST filing frequency, student loan calculators.

### Pay an invoice (verified)
Online by Visa or Mastercard; direct deposit to Tax Professionals Limited at ANZ (quote the invoice number); by phone 9:30am to 5:30pm on 09 625 0025 or 09 625 0035, press 0 for reception; direct debit set-up. Do NOT print the bank account number on the concepts.

### Insights / News (verified; author Eshan Gupta; newest first)
- Repairs vs Improvements: What Can You Deduct? (16 Oct 2026)
- KiwiSaver Employer Contributions: Are You Getting It Right? (9 Oct 2026)
- Closing or Winding Up Your Business (28 Sep 2026)
- Planning Your Next Equipment Purchase (25 Sep 2026)
- When Should You Buy a Brand-New Vehicle for Your Business? (24 Sep 2026)
- How to Empower Your Employees to Make Decisions and Grow Your Business (16 Sep 2026)
- How to Boost Your Sales Growth: Practical Strategies for Business Owners (8 Sep 2026)
- Bogus Expense Claims: Inland Revenue Warns Taxpayers of Serious Consequences (27 Aug 2026)
- Smart Ways to Take Money Out of Your Company (24 Jul 2026)
- MBIE Labour Inspectorate Increasing Payroll Audits: Is Your Business Ready? (21 Jul 2026)
- IRD Is Now Deducting Tax Debt Directly From Bank Accounts (7 Jul 2026)
Article URLs follow https://www.taxprofessionals.co.nz/insights-/-news/<slug> (slug = lower-case title with hyphens, e.g. .../repairs-vs-improvements-what-can-you-deduct); the earlier list's URLs remain valid. Show "By Eshan Gupta" and the date where the concept shows dates.

### Technology partners
Their site shows nine partner logos (names not readable from the scrape). Known from other sources: TMNZ (tax pooling), Crystal Payroll, SmartPayroll, Xero, MYOB. Use TMNZ, Crystal Payroll, Xero and MYOB in text only until the logos are confirmed.

### Still missing (keep data-need): the logo file and brand colours (CDN blocked), photos, the nine partner logos.
