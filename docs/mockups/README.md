# De Tafelaar — homepage design mockups

Ten standalone design directions for the De Tafelaar homepage
(tafelaaramersfoort.nl), built as self-contained HTML so you can review
them on any computer.

## How to open

**No server needed.** Just open `index.html` in any browser
(double-click it, or drag it into a browser window). From there, click any
card to view a mockup. Every mockup has a switcher in the bottom corner to
jump between all ten and back to the overview.

> Needs an internet connection the first time, only to load the Google Fonts
> from the CDN. The photos are bundled locally in `pics/`.

Optional: to serve them over `http://localhost:4173` instead, run from the
project root:

```bash
python3 -m http.server 4173 --directory docs/mockups
# then visit http://localhost:4173
```

## The ten directions

**Round 1 — refined (safer, restaurant-classic)**

1. **Warm Editorial** — magazine-style, cream + bronze, closest to the current brand.
2. **Avond & Intiem** — dark green + brass, arched photos, candlelit mood.
3. **Fris & Licht** — light Scandinavian, sage green, floating nav + bento grid.
4. **Karakter & Bold** — big bold type, paprika/mustard, USP ticker.
5. **Tafel App** — conversion-first: quick-action card, **live open/closed status**, sticky mobile bar.

**Round 2 — bolder (more distinctive)**

6. **De Courant** — the page as a newspaper front page; live dateline.
7. **De Proeverij** — full-screen scroll-story laid out as a menu *in gangen* (courses).
8. **Zonzij '70s** — retro supergraphics, sunburst arcs, arched photos.
9. **De Huiskamer** — scrapbook/pinboard: polaroids, tape, sticky notes, handwriting.
10. **Puur** — radical Swiss typography, mostly type, one fire-orange accent.

## What every mockup keeps

All existing content and SEO/GEO structure is preserved in each variant:

- One H1 with "Shared Dining Restaurant in Amersfoort"; H2s as questions/topics.
- Hero copy, the 4 USPs, Buurtgids block, the "Restaurant in Amersfoort centrum"
  SEO text with all 10 internal links, the story, opening hours, and all 8 FAQs.
- Consistent NAP (Kamp 8, 3811 AR, +31 6 341 279 32) in body text and footer.
- Restaurant + FAQPage schema (JSON-LD) with opening hours and the 4.8 / 90+ rating.
- Descriptive alt text on every photo.

## Notes

- These are **static mockups**. Internal nav links (Menu, Reserveer, etc.) show a
  small "this is a mockup" toast instead of navigating — the pages they point to
  already exist on the real site.
- Nothing here is wired into the live Next.js app yet. Pick a favorite and it can
  be built into the real site.
