// Leest score en aantal reviews van de openbare Google Maps-pagina van De Tafelaar (geen Google API)
// en stuurt ze naar /api/cron/google-rating. Draait elke maandag via .github/workflows/google-rating.yml.
// Lokaal testen zonder iets op te slaan: DRY_RUN=1 node sync.mjs
import { chromium } from "playwright";

// Drie adressen voor dezelfde Maps-pagina. Google toont servers (zoals die van GitHub) soms een
// "beperkte weergave" zonder het aantal reviews; elke poging probeert dan het volgende adres.
const PLACE_URLS = process.env.PLACE_URL
  ? [process.env.PLACE_URL]
  : [
      "https://www.google.com/maps/place/De+Tafelaar+Amersfoort/@52.1574136,5.3933799,17z/data=!4m6!3m5!1s0x47c64724fab86e49:0x80aed0fcf3b77e12!8m2!3d52.1574136!4d5.3933799!16s%2Fg%2F11xnp1zw13?hl=nl",
      "https://www.google.com/maps?cid=9272578467641654802&hl=nl",
      "https://www.google.com/maps/search/?api=1&query=De%20Tafelaar%20Amersfoort&query_place_id=ChIJSW64-iRHxkcREn638_zQroA&hl=nl",
    ];
const POGINGEN = 6;
const SITE_URL = (process.env.SITE_URL || "https://www.tafelaaramersfoort.nl").replace(/\/$/, "");
const DRY_RUN = process.env.DRY_RUN === "1";

function parseNumber(text) {
  return Number(String(text).replace(/[^\d]/g, ""));
}

async function readRating(placeUrl) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "nl-NL",
    timezoneId: "Europe/Amsterdam",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  try {
    await page.goto(placeUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });

    // Cookiescherm (EU): altijd "Alles afwijzen"
    if (page.url().includes("consent.")) {
      await page.getByRole("button", { name: /alles afwijzen|reject all/i }).first().click();
      await page.waitForURL(/google\.[a-z.]+\/maps/, { timeout: 30_000 });
    }

    // De score verschijnt eerder dan het aantal reviews: wacht tot ook het aantal er staat.
    await page.waitForFunction(
      () => {
        // Beperkte weergave: het aantal reviews komt niet, dus niet 45 seconden wachten
        if (/beperkte weergave|limited view/i.test(document.body?.innerText ?? "")) return true;
        const summary = document.querySelector("div.F7nice")?.innerText ?? "";
        if (/\(\s*[\d.\s]+\s*\)/.test(summary)) return true;
        return [...document.querySelectorAll("[aria-label]")].some((e) =>
          /^[\d.\s]+\s+reviews?$/i.test(e.getAttribute("aria-label").trim()),
        );
      },
      null,
      { timeout: 45_000 },
    ).catch(async (err) => {
      // Laat zien wat Google wel toonde (in de GitHub-log en als screenshot-artifact)
      const body = (await page.evaluate(() => document.body?.innerText ?? "").catch(() => "")).replace(/\s+/g, " ");
      await page.screenshot({ path: "debug.png", fullPage: false }).catch(() => {});
      throw new Error(`${err.message} | url=${page.url()} | titel=${await page.title().catch(() => "?")} | tekst=${body.slice(0, 700)}`);
    });
    const found = await page.evaluate(() => {
      const labels = [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label").trim());
      const summary = document.querySelector("div.F7nice")?.innerText ?? "";
      const beperkt = /beperkte weergave|limited view/i.test(document.body?.innerText ?? "");
      return { labels, summary, beperkt };
    });

    // Samenvatting bovenaan de pagina, bijv. "4,8\n(174)"
    let rating = null;
    let count = null;
    const m = found.summary.match(/([1-5][.,]\d)\s*\(\s*([\d.\s]+)\s*\)/);
    if (m) {
      rating = Number(m[1].replace(",", "."));
      count = parseNumber(m[2]);
    }
    // Reserve: aria-labels "4,8 sterren" en "174 reviews" (niet de verdeling "5 sterren,158 reviews")
    if (!rating) {
      const r = found.labels.find((l) => /^[1-5][.,]\d\s+(sterren|stars)$/i.test(l));
      if (r) rating = Number(r.replace(",", ".").match(/[1-5]\.\d/)[0]);
    }
    if (!count) {
      const c = found.labels.find((l) => /^[\d.\s]+\s+reviews?$/i.test(l));
      if (c) count = parseNumber(c);
    }
    if ((!rating || !count) && found.beperkt) {
      throw new Error("Google toonde een beperkte weergave zonder aantal reviews");
    }
    if (!rating || !count) {
      throw new Error(`Score of aantal niet gevonden. Samenvatting: ${JSON.stringify(found.summary)}; labels: ${JSON.stringify(found.labels.slice(0, 15))}`);
    }
    return { rating, count };
  } finally {
    await browser.close();
  }
}

let result;
for (let poging = 1; poging <= POGINGEN && !result; poging++) {
  const url = PLACE_URLS[(poging - 1) % PLACE_URLS.length];
  try {
    result = await readRating(url);
  } catch (err) {
    console.warn(`Poging ${poging} mislukt: ${err.message}`);
    if (poging === POGINGEN) throw err;
    await new Promise((r) => setTimeout(r, 15_000));
  }
}
const { rating, count } = result;
console.log(`Google: ${rating} sterren, ${count} reviews`);

if (DRY_RUN) {
  console.log("DRY_RUN: niets opgeslagen");
  process.exit(0);
}

const secret = process.env.RATING_SYNC_SECRET;
if (!secret) throw new Error("RATING_SYNC_SECRET ontbreekt");

const res = await fetch(`${SITE_URL}/api/cron/google-rating`, {
  method: "POST",
  headers: { "content-type": "application/json", authorization: `Bearer ${secret}` },
  body: JSON.stringify({ rating, count }),
});
const text = await res.text();
console.log(`Site: ${res.status} ${text}`);
if (!res.ok) process.exit(1);
