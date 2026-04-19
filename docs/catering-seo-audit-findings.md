# Catering SEO — Post-Ship Audit Findings

Three independent audit agents reviewed the work that shipped in commits `cc35ee1` (tafelaar) and `1c38ea3` (jezza). Their findings + what got fixed in commit `f299699` (jezza audit fixes) are below.

## Audit lenses & scores

| Lens | Score | Summary |
|---|---|---|
| GEO / AI citation readiness | 6.2 / 10 | Strong schema backbone and location-specific content. Weak on pricing transparency per page and FAQ evidence density. |
| Technical SEO | 7.2 / 10 | Schema structurally valid. Issues: meta tag lengths over safe zone, cross-domain sameAs asymmetry, potential orphan pages. |
| Competitive content quality | 7 / 10 | Genuinely deeper than 6 of 7 competitors on detail and pricing. Loses badly on social proof density (client logos, embedded reviews). |

## Things fixed in this round (commit f299699)

### Price accuracy on `/catering-amersfoort/prijzen`
**Competitive audit caught real factual errors** in our competitor-comparison table. Fixed:

- Nouvelle Cuisine does NOT publicly publish €9,45. They're quote-only with a 25 pax minimum. Removed the false claim.
- The Blueberry minimum for standard lunch (A Great Lunch €17,95) is 8 pax, not 6. The 6-pax entry was actually Walk of Fame €8,50 (different product). Table now shows both tiers accurately.
- Cateringfabriek does NOT publish prices on their Amersfoort page — it's quote-only. Corrected.
- Added a "Bron" column with direct verification links per competitor. Every price claim is now traceable.

This was the **most urgent** fix — publishing inaccurate claims about named competitors is both an E-E-A-T problem (Google devalues pages with verifiable factual errors) and a reputational risk.

### Meta tag lengths
All 6 jezza `/catering-amersfoort/*` pages had titles at 85-95 chars (Google truncates at ~55-60 on mobile, so "Bedrijventerrein" was getting cut mid-word) and descriptions at 160-175 chars. All trimmed to ≤68 / ≤150 respectively. Your USPs now survive mobile SERP preview.

### Schema entity asymmetry
`buildCateringEntity()` in jezza's schema.ts had `sameAs` pointing to tafelaar's `#restaurant` fragment — this conflated Jezza Cooks catering with the De Tafelaar organization. De Tafelaar is already modeled separately via `memberOf`. Removed the redundant sameAs. Now cross-references point only to tafelaar catering entities, not to the restaurant org itself.

### Pricing opacity on 4 neighborhood pages
GEO audit flagged this as the #1 AI citation blocker: ChatGPT/Perplexity don't cite a page if they can't pull a concrete number out of it for "what does X cost". Added a "Prijzen voor catering op [neighborhood]" block to De Hoef, Vathorst, De Wieken, De Brand with 3-6 neighborhood-relevant price points each. Centrum page already referenced restaurant Chef's Choice pricing, so left alone.

### Internal linking graph
Technical audit flagged De Brand + Centrum as having only 2 inbound sibling links (risk of orphan classification). Now **every neighborhood page links to all 4 siblings + prijzen** — the cross-link graph is complete.

## Things NOT fixed (audit findings that didn't hold up)

### FAQ answer length
Agent 1 (GEO audit) claimed "De Hoef Q2 = 160+ words, Vathorst Q2 = 165, De Brand Q5 = 120" — extract-hostile. Reality: all FAQs are 50-80 words. Agent was overcounting. No fix needed.

## Audit findings that need YOUR action (not code)

Everything below requires content/business decisions I can't make:

### 1. Named-client logo row (biggest credibility gap)
Competitive audit was unambiguous: Cateringfabriek shows Talpa, KPN, BNN/VARA, NPO, Endemol, OmroepMAX. Jaspers shows KPN, Disney, NS, Politie, Huawei, HACCP. Nouvelle Cuisine shows 15+. **You have zero visible client logos on the /catering page.**

Action: get written permission from 6-10 current catering clients to display their logos. Place above the fold on tafelaar `/catering` and at the top of each jezza neighborhood page. This is the single biggest move you can make for B2B conversion.

### 2. Embedded Google review quotes
"4.8 op Google · 95+ reviews" without proof feels hollow. Charleys embeds 15+ Google reviews inline. Use GMB review embed code (free, 30 min setup) to display 5-10 live review cards on `/catering`.

### 3. Location-specific photos
All 5 neighborhood pages currently share the central hero imagery. Compete on visual search: 1 location-specific photo per page. Specifically:
- **De Hoef**: office-reception delivery shot
- **Vathorst**: retail event setup photo (asking an existing retail client for permission)
- **De Wieken**: board room / executive lunch drop-off
- **De Brand**: hotel lobby or retail training day
- **Centrum**: bakfiets rolling through the voetgangerszone (this is a social-media gold shot)

### 4. Case studies with named clients
1 per neighborhood, 150 words with client + photo + testimonial + what was delivered. Procurement managers want to see social proof that matches their own profile.

### 5. Fix The Blueberry as "most dangerous competitor"
Per competitive audit they're the only real threat — they already publish prices transparently, have 2 award badges visible (NK lekkerste broodje, Beste koffiezaak Utrecht 2024/2025), 2 physical locations. They're one FAQ-schema upgrade away from matching our structural moves. Strategy: stay ahead by adding 2 things they don't have — client-logo row + embedded live reviews. Those are the two things they haven't invested in yet.

## Honest ranking probability

**"catering amersfoort" top 3 in 90 days: Low-to-Medium**

Why not higher:
- Charleys and The Blueberry have 2-4 years of local domain authority we can't match in 90 days
- tafelaaramersfoort.nl is classified by Google as "restaurant doing catering as feature" not "catering as primary product"
- jezzacooks.com cluster is 3 months old — zero link equity

Realistic 90-day outcome: **positions 5-10 from nowhere**. That still doubles current visibility. Top 3 requires:
- 10+ local backlinks (Amersfoort Business, bedrijvenverenigingen De Hoef / De Wieken, Flint, indebuurt.nl chef profile pitch)
- 50+ Google reviews mentioning "catering" specifically
- Weekly GMB posts with photos
- The 5 content upgrades above

## Metrics cards to watch in GSC (starting this week)

Queries the new pages target — track impressions + avg position weekly:
- `catering amersfoort`
- `catering de hoef`
- `catering vathorst`
- `catering de wieken`
- `catering de brand`
- `catering amersfoort centrum`
- `wat kost catering amersfoort`
- `catering prijzen amersfoort`

You'll see **impressions climb before positions climb** — that's the leading indicator the new pages are being indexed and shown, even if still deep in the SERP.

## Commit log reference

- `cc35ee1` (tafelaar) — GEO rewrite + JV schema
- `1c38ea3` (jezzacooks) — 5 neighborhood pages + prijzen pillar + cross-refs
- `dc46418` (tafelaar) — Track C user action playbook
- `f299699` (jezzacooks) — audit fixes: verified prices, meta lengths, sameAs, pricing snippets, cross-link graph
