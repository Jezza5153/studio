# Catering SEO — Track C: User Actions

Code changes are shipped (cc35ee1 tafelaar + 1c38ea3 jezzacooks). These are the things Claude can't do — they need your login and real photos/reviews. Do them in the order listed.

## Week 1 — Indexation & visibility (do this first)

### 1. Submit both sitemaps to Google Search Console
- Tafelaar: https://search.google.com/search-console → tafelaaramersfoort.nl property → Sitemaps → submit `https://tafelaaramersfoort.nl/sitemap.xml`
- Jezza: same flow for www.jezzacooks.com → submit `https://www.jezzacooks.com/sitemap.xml`
- Also use **URL Inspection → Request Indexing** for each new page:
  - `https://tafelaaramersfoort.nl/catering` (rewritten)
  - `https://www.jezzacooks.com/catering-amersfoort/de-hoef`
  - `https://www.jezzacooks.com/catering-amersfoort/vathorst`
  - `https://www.jezzacooks.com/catering-amersfoort/de-wieken`
  - `https://www.jezzacooks.com/catering-amersfoort/de-brand`
  - `https://www.jezzacooks.com/catering-amersfoort/centrum`
  - `https://www.jezzacooks.com/catering-amersfoort/prijzen`

### 2. Validate schema
- Run each of the 7 URLs above through https://search.google.com/test/rich-results
- Check for errors/warnings on the FAQPage, Service, OfferCatalog, BreadcrumbList blocks
- If any errors appear: screenshot and send to me, I'll fix

### 3. Baseline rank tracking (do before Vercel deploys are live if possible, otherwise today)
Record current position for these queries in Chrome Incognito (be logged out of Google):
- catering amersfoort
- office lunch amersfoort (you're currently #2 — verify)
- bedrijfscatering amersfoort
- zakelijke catering amersfoort
- walking dinner amersfoort
- catering de hoef
- catering vathorst
- wat kost catering amersfoort

Save as a screenshot or a sheet — we'll compare in 30 days.

---

## Week 1-2 — Google Business Profile

GBP is the single biggest leverage point for local catering queries. The SERP has no Local Pack yet for catering queries in Amersfoort, but when it flips on, whoever has the best-populated GBP wins.

### 4. Tafelaar GBP (Kamp 8) — audit + expand
Already exists (you have the 4.8/95+ reviews). Check:
- **Primary category**: Restaurant — keep
- **Secondary categories**: add `Caterer` AND `Catering service` (both, if allowed)
- **Services**: add explicit items — "Office lunch catering", "Walking dinner catering", "Event catering", "Borrel catering". Each with a 1-line description + price indicator
- **Photos**: upload 10+ catering-specific photos — boxes, bowls, walking dinner setup, delivery van at office, team serving. Separate from restaurant dining photos
- **Business description**: mention catering explicitly. Current probably focuses on restaurant only

### 5. Jezza Cooks GBP (Nijkerkerstraat 3) — NEW profile
Probably doesn't exist yet. Create it:
- Go to https://business.google.com → Add business
- **Name**: `Jezza Cooks` (exact match to site)
- **Address**: Nijkerkerstraat 3, 3821 CD Amersfoort
- **Phone**: +31 6 34127992
- **Website**: https://www.jezzacooks.com
- **Primary category**: `Catering service` (not Restaurant — Jezza Cooks is a consultancy + catering service, not a restaurant)
- **Secondary category**: `Business consultant`
- **Hours**: Mon–Fri 09:00–18:00 (matches site-config)
- **Service area**: Amersfoort + Vathorst + De Hoef + De Wieken + De Brand + Leusden + Soest + Baarn + Nijkerk + Barneveld + Hilversum + Utrecht (matches schema areaServed)
- **Services**: "Office lunch catering Amersfoort" (€7,50+), "Walking dinner catering" (€45+), "BBQ catering" (€22,50+), "Event catering" (€25+), "Restaurant consulting" (€450+), "Menu engineering" (per pricing page)
- **Verification**: postcard to Nijkerkerstraat 3 (takes 5-14 days) OR video verification if offered

### 6. Cross-link the two GBPs
- Under Tafelaar GBP → add Jezza Cooks as a "Related business" if feature is available
- Under Jezza GBP → add Tafelaar same way
- This reinforces the JV entity model to Google

---

## Week 2+ — Review acquisition (ongoing)

### 7. Catering review request flow
Distinct from restaurant dining reviews. After each catering delivery or event:

**Day of delivery**: send a thank-you email with:
- "Thanks for choosing Tafelaar × Jezza Cooks for your [lunch/event] today"
- Short prompt: "If it was good — a 2-minute Google review helps us a lot"
- Direct link to the Google review form for the relevant profile (Tafelaar for venue events, Jezza for delivered catering) — generate shortlinks via Google's business dashboard
- Optional: suggest phrasing ("your review mentioning catering specifically really helps us")

**Day 2**: automated follow-up if no review (Tapla / any mail automation)

**Target**: 20 catering-specific reviews across both profiles in 90 days. Realistic pace: 2-3 per week if you do 2-3 catering jobs per week.

### 8. Trustoo — mirror Tafelaar setup for Jezza
- Tafelaar is already on Trustoo with 9.8/96
- Create Jezza Cooks profile on https://trustoo.nl — same NAP + service categories. Free tier is fine
- Link from jezzacooks.com footer (adds to sameAs trust signal)

---

## Week 2-4 — Earned media / directory listings (grows slowly but matters a lot)

### 9. Local business directory listings for Jezza Cooks
These each give a small boost and a citable NAP. Do the free ones, skip paid ones unless they clearly match your target:
- indebuurt.nl Amersfoort (you already appear there for De Tafelaar — ask the editor if Jezza Cooks catering is worth a separate listing)
- business.site (free Google microsite, auto from GBP)
- Yelp NL — free claim
- IENS / The Fork — only if you do restaurant catering takeout as a product
- localbusiness.nl, bedrijfspagina.nl — free but low quality, optional

Skip: Eet.nu, Iens, Tripadvisor restaurant sections (those are for restaurants, not catering)

### 10. Pitch a local press story (high leverage, low effort)
You have a great hook that no one's written yet: **"Chef from Michelin restaurants in Australia opens catering in Amersfoort"** — already covered by AD.nl, De Gelderlander, indebuurt for the restaurant. Now pitch the catering angle:
- Email: AD.nl Amersfoort + indebuurt.nl Amersfoort → "Tafelaar × Jezza Cooks catering — chef-led office catering from the Kamp"
- Angle: local chef brings restaurant-quality lunch to Amersfoort bedrijventerreinen
- Include: 2 photos (office lunch setup + Jeremy in kitchen), 1-paragraph pitch
- Even a small follow-up blurb adds a high-authority backlink

---

## Weekly (ongoing)

### 11. AI Overview monitoring
Every Monday, check these 7 queries in Chrome Incognito AND ChatGPT/Perplexity:
- catering amersfoort
- office lunch amersfoort
- bedrijfscatering amersfoort
- walking dinner amersfoort
- wat kost catering amersfoort
- catering de hoef
- catering vathorst

Log: is there an AI Overview? Is either of our domains cited? Which URLs?

If you see ANY AI Overview with one of our domains cited, screenshot it and let me know — we double-down on whatever pattern is working.

### 12. Add new catering job photos monthly
GBP rewards recency. Upload 3-5 new catering photos per month to both profiles. Caption with location ("Office lunch delivered to De Hoef", "Walking dinner on Vathorst").

---

## 30-day review

Book a call in 30 days (May 20) to:
1. Compare rank positions to baseline
2. Review GBP impressions + actions
3. Count new catering reviews
4. Decide next sprint: neighborhood expansion further (Leusden, Soest dedicated pages?), blog content on jezza (recipes? chef interviews?), or overlap-cleanup on tafelaar (merge /verhuur-en-groepen + /prive-diner)

---

## Quick reference — what's live after this sprint

**Tafelaar (tafelaaramersfoort.nl):**
- /catering — rewritten, GEO H2s, NAP, JV attribution, bedrijventerrein table, 7 FAQs, Service + OfferCatalog JSON-LD, sitemap priority 0.9
- Homepage discover blurb — JV mention + internal link
- Restaurant schema — sameAs jezzacooks.com/services/catering

**Jezza Cooks (jezzacooks.com):**
- /catering-amersfoort/de-hoef — 10 min, 739 bedrijven, recurring contracts
- /catering-amersfoort/vathorst — 12 min, retail events + office
- /catering-amersfoort/de-wieken — 10 min, corporate + board meetings
- /catering-amersfoort/de-brand — 8 min, retail training + hotels
- /catering-amersfoort/centrum — 5 min, bakfiets + historical buildings
- /catering-amersfoort/prijzen — pillar article, competitor price comparison (AI citation magnet)
- schema.ts `buildCateringEntity` — sameAs tafelaaramersfoort.nl catering entities
- Sitemap — 6 new routes at priority 0.85-0.9
