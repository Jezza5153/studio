// Leest score en aantal reviews van de openbare Google Maps-pagina van De Tafelaar (geen Google API)
// en stuurt ze naar /api/cron/google-rating. Draait elke maandag via .github/workflows/google-rating.yml.
// Lokaal testen zonder iets op te slaan: DRY_RUN=1 node sync.mjs
import { chromium } from "playwright";

const PLACE_URL =
  process.env.PLACE_URL ||
  "https://www.google.com/maps/place/De+Tafelaar+Amersfoort/@52.1574136,5.3933799,17z/data=!4m6!3m5!1s0x47c64724fab86e49:0x80aed0fcf3b77e12!8m2!3d52.1574136!4d5.3933799!16s%2Fg%2F11xnp1zw13?hl=nl";
const SITE_URL = (process.env.SITE_URL || "https://www.tafelaaramersfoort.nl").replace(/\/$/, "");
const DRY_RUN = process.env.DRY_RUN === "1";

function parseNumber(text) {
  return Number(String(text).replace(/[^\d]/g, ""));
}

async function readRating() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    locale: "nl-NL",
    timezoneId: "Europe/Amsterdam",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  try {
    await page.goto(PLACE_URL, { waitUntil: "domcontentloaded", timeout: 60_000 });

    // Cookiescherm (EU): altijd "Alles afwijzen"
    if (page.url().includes("consent.")) {
      await page.getByRole("button", { name: /alles afwijzen|reject all/i }).first().click();
      await page.waitForURL(/google\.[a-z.]+\/maps/, { timeout: 30_000 });
    }

    await page.waitForSelector('[aria-label$="reviews"], [aria-label$="review"], div.F7nice', { timeout: 45_000 });
    const found = await page.evaluate(() => {
      const labels = [...document.querySelectorAll("[aria-label]")].map((e) => e.getAttribute("aria-label").trim());
      const summary = document.querySelector("div.F7nice")?.innerText ?? "";
      return { labels, summary };
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
    if (!rating || !count) {
      throw new Error(`Score of aantal niet gevonden. Samenvatting: ${JSON.stringify(found.summary)}; labels: ${JSON.stringify(found.labels.slice(0, 15))}`);
    }
    return { rating, count };
  } finally {
    await browser.close();
  }
}

const { rating, count } = await readRating();
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
