# Eten met Peter — Admin Actions

Code is shipped (commit `968f580`). Vercel is deploying. Three things need to happen by hand to finish the rollout. Estimated total time: ~10 minutes.

## 1. Save the press photo (BLOCKING — page is missing the hero image until done)

The photo Jan sent (team in front of De Tafelaar with kitchenware "armor") needs to be saved as:

```
/Users/jezza/Documents/Projects/studio/public/pics/eten-met-peter.jpg
```

Steps:
1. Right-click the photo (or download it from wherever Jan sent it — De Stad Amersfoort article likely has the same one)
2. "Save Image As…" → navigate to `/Users/jezza/Documents/Projects/studio/public/pics/`
3. Filename: `eten-met-peter.jpg`
4. Format: JPEG (so the page's Image component finds it)
5. Commit the file:
   ```bash
   cd /Users/jezza/Documents/Projects/studio
   git add public/pics/eten-met-peter.jpg
   git commit -m "feat(eten-met-peter): add press photo for hero"
   git push
   ```

The page already references this path. As soon as the file is in place and Vercel redeploys, the hero image appears.

If you'd rather use a different filename, tell me and I'll swap the reference in `src/app/eten-met-peter/page.tsx` (one constant: `HERO_IMAGE_SRC`).

## 2. Add Eten met Peter to the bewegende nieuwslijn (BreakingTicker)

The ticker on /agenda auto-shows pinned FeedItems. Create + pin a FeedItem via admin:

1. Open `https://tafelaaramersfoort.nl/admin` (or wherever the admin lives) → Items
2. Click "New Item"
3. Fill:
   - **Type**: ARTICLE (or EVENT if your admin distinguishes — whichever the Paasbrunch entry uses)
   - **Title**: `Eten met Peter — actie voor de Hersenstichting · 11 mei`
   - **Slug**: `eten-met-peter-hersenstichting-2026`
   - **Body / Intro**: paste the announcement from `destadamersfoort.nl/lokaal/zakelijk/1271395`
   - **Cover image**: upload the press photo (same file as above)
   - **Pinned**: ✓ YES (this puts it in the ticker)
   - **Published**: ✓ YES
   - **Published at**: today's date
4. Save

Repeat for Moederdag if it's not already pinned:
   - **Title**: `Moederdag High Tea — zondag 10 mei`
   - **Slug**: `moederdag-high-tea-amersfoort-2026` (this slug already has SEO override — see `src/lib/seo-overrides.ts`)
   - Same fields, **Pinned**: ✓ YES

Result: the ticker on /agenda will show "📌 Eten met Peter — actie voor de Hersenstichting · 11 mei" and "📌 Moederdag High Tea — zondag 10 mei" as scrolling items.

## 3. Add 2 articles to the Courant (kranten artikelen)

Same admin flow but creates the Courant entries Jan asked about ("AGENDA 2 stukjes opnemen"):

### Article 1: Moederdag High Tea
- **Type**: ARTICLE
- **Slug**: `moederdag-high-tea-amersfoort-2026` ← MUST match this exactly so the SEO override in `src/lib/seo-overrides.ts` applies (handles the FAQ + 2-sitting Event JSON-LD on the article page)
- **Title**: `Moederdag High Tea bij De Tafelaar — zondag 10 mei`
- **Cover image**: e.g. `/pics/homepage.png` or a high-tea photo if you have one
- **Body** (intro paragraph for the Courant card):
  > Verras je moeder met een bourgondische high tea bij De Tafelaar in het centrum van Amersfoort. Twee sittings op zondag 10 mei: 12:00 en 14:00. €37,50 p.p., inclusief glas bubbels voor mama. Reserveer op tijd — beperkt aantal plaatsen.
- **Pinned**: ✓ YES (already done in step 2 if you did it there)
- **Category** (if your admin has it): EVENTS

### Article 2: Eten met Peter
- **Type**: ARTICLE
- **Slug**: `eten-met-peter-hersenstichting-2026`
- **Title**: `Eten met Peter — De Tafelaar in actie voor de Hersenstichting`
- **Cover image**: `/pics/eten-met-peter.jpg`
- **Body** (intro paragraph for the Courant card):
  > Op maandag 11 mei verzorgen gastkok Peter van den Heuvel en chef Jeremy Arrascaeta een speciale charity-avond bij De Tafelaar. Een vriendendiner uit Peters bundel 'Ik heb een heel klein gaatje gedicht', uitsluitend biologische producten. De volledige opbrengst gaat naar de actie van Peter voor de Hersenstichting. Reserveer via BoekEerlijk.
- **Pinned**: ✓ YES (already done in step 2)
- **Category**: EVENTS

These will then show up in:
- The Courant masthead (lead/feed)
- The /agenda page front-page grid
- The bewegende nieuwslijn ticker
- The /updates list
- Each as their own article page at `/updates/{slug}`

## 4. Optional but recommended — add an SEO override for the new Eten met Peter article slug

If you want the `/updates/eten-met-peter-hersenstichting-2026` article page (the Courant article version) to carry the same Event JSON-LD + FAQ that the dedicated `/eten-met-peter` landing page has, add an entry to `src/lib/seo-overrides.ts` matching the slug. I can do this in a follow-up commit — just say the word.

## What's NOT needed

- No new sitemap entry for the article slugs — they're auto-included via the dynamic article loop in `src/app/sitemap.ts` (`prisma.feedItem.findMany`).
- No code change to the BreakingTicker — it already supports pinned items, just need the records in the DB.
- No homepage code change beyond what shipped — banners are stacked, both visible.

## Quick checklist

- [ ] Save photo as `/public/pics/eten-met-peter.jpg` and push to git
- [ ] Create + pin FeedItem for Moederdag (slug: `moederdag-high-tea-amersfoort-2026`)
- [ ] Create + pin FeedItem for Eten met Peter (slug: `eten-met-peter-hersenstichting-2026`)
- [ ] Verify ticker on `/agenda` shows both
- [ ] Verify Courant front page shows both as articles
- [ ] (Optional) Ask Claude to add SEO override for Eten met Peter article slug
- [ ] (Optional) Submit updated sitemap to Google Search Console once Vercel redeploys
