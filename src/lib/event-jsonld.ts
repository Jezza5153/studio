/**
 * schema.org Event JSON-LD voor evenementen uit de Courant (FeedItem, categorie "events").
 *
 * FeedItem heeft geen eigen datumvelden. Evenementen krijgen in de tekst een blok
 * "PRAKTISCHE INFORMATIE" met regels als:
 *
 *   📅 Datum: maandag 11 mei 2026
 *   🕕 Vanaf: 18:00
 *   🕛 Sittings: 12:00 of 14:00
 *   💰 Prijs: €37,50 per persoon
 *
 * Alleen die gelabelde regels tellen. Zonder een volledige datum (met jaartal) en een
 * expliciete tijd komt er geen Event: niets wordt geraden of uit lopende tekst gehaald.
 * Een eindtijd en een Offer verschijnen alleen als ze er letterlijk staan. Na afloop
 * verdwijnt de markup vanzelf, zodat Google geen "EventScheduled" in het verleden ziet.
 *
 * Richtlijnen: https://developers.google.com/search/docs/appearance/structured-data/event
 */

import { SITE_NAME, SITE_URL } from "@/lib/site-metadata";
import { extractMetaDescription } from "@/lib/article-utils";

const TIME_ZONE = "Europe/Amsterdam";
const FALLBACK_IMAGE = "/pics/hero-gasten.jpg";

const MAANDEN = [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december",
];
// Index = Date#getUTCDay()
const WEEKDAGEN = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

const DATE_LABEL = /^datum$/i;
// "Inloop" bewust niet: dat is de deur, niet de start van het evenement.
const TIME_LABEL = /^(tijd|aanvang|vanaf|start|begin|begint)$/i;
const SITTINGS_LABEL = /^(sittings?|tijden|tijdsloten|tijdslots?)$/i;
const PRICE_LABEL = /^(prijs|kosten|entree|entreeprijs|toegang|tickets?|ticketprijs)(\s+p\.?\s?p\.?)?$/i;

const SLOT_RE = /(\d{1,2})[:.](\d{2})(?:\s*(?:uur\s*)?(?:-|–|—|tot en met|tot|t\/m)\s*(\d{1,2})[:.](\d{2}))?/g;
const PRICE_RE = /€\s*(\d{1,4})(?:[,.](\d{2}|-{1,2}))?(?!\d)/g;

type DateParts = { y: number; mo: number; d: number };
type Clock = { h: number; mi: number };
type Slot = { start: Clock; end?: Clock };

export interface ParsedEventDetails {
    date: DateParts;
    slots: Slot[];
    /** Prijs als "37.50", alleen als er precies een bedrag (of "gratis") staat */
    price?: string;
}

export interface EventSource {
    slug: string;
    title: string;
    body: string | null;
    media: string | null;
    category: string;
    type: string;
}

/* ----------------------------- parsing ----------------------------- */

/** Gelabelde regels ("Datum: ...") uit de tekst, labels in kleine letters. */
function labeledLines(body: string): Array<{ label: string; value: string }> {
    const out: Array<{ label: string; value: string }> = [];
    for (const raw of body.split(/\r?\n/)) {
        // emoji en opsommingstekens voor het label weghalen
        const line = raw.replace(/^[^A-Za-z0-9]+/, "").trim();
        const m = line.match(/^([A-Za-z][A-Za-z ./]{1,30}?)\s*:\s*(.+)$/);
        if (m) out.push({ label: m[1].trim().toLowerCase(), value: m[2].trim() });
    }
    return out;
}

function isValidDate({ y, mo, d }: DateParts): boolean {
    if (y < 2000 || y > 2100 || mo < 1 || mo > 12 || d < 1) return false;
    return d <= new Date(Date.UTC(y, mo, 0)).getUTCDate();
}

function clock(h: string, mi: string): Clock | null {
    const c = { h: Number(h), mi: Number(mi) };
    return c.h <= 23 && c.mi <= 59 ? c : null;
}

/**
 * "maandag 11 mei 2026", "11 mei 2026", "11-05-2026", "11/05/2026" of "2026-05-11".
 * Geeft ook de rest van de regel terug (bijv. ", 18:00 uur"). Een weekdag die niet bij
 * de datum past maakt de datum ongeldig: liever geen Event dan een verkeerd Event.
 */
function parseDate(value: string): { date: DateParts; rest: string } | null {
    const v = value.trim().toLowerCase();
    let date: DateParts | null = null;
    let weekday: string | undefined;
    let rest = "";

    const named = v.match(
        /^(?:(maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)\s+)?(\d{1,2})\s+(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)\s+(\d{4})\b(.*)$/,
    );
    const numeric = v.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})\b(.*)$/);
    const iso = v.match(/^(\d{4})-(\d{2})-(\d{2})\b(.*)$/);

    if (named) {
        weekday = named[1];
        date = { y: Number(named[4]), mo: MAANDEN.indexOf(named[3]) + 1, d: Number(named[2]) };
        rest = named[5];
    } else if (numeric) {
        date = { y: Number(numeric[3]), mo: Number(numeric[2]), d: Number(numeric[1]) };
        rest = numeric[4];
    } else if (iso) {
        date = { y: Number(iso[1]), mo: Number(iso[2]), d: Number(iso[3]) };
        rest = iso[4];
    }

    if (!date || !isValidDate(date)) return null;
    if (weekday && WEEKDAGEN[new Date(Date.UTC(date.y, date.mo - 1, date.d)).getUTCDay()] !== weekday) return null;
    // Na de datum mag alleen een tijd staan; een tweede datum ("t/m 16 november") of iets
    // anders met cijfers betekent een meerdaags of onduidelijk evenement.
    if (/\d/.test(rest.replace(SLOT_RE, ""))) return null;
    return { date, rest: rest.trim() };
}

/** Alle tijden of tijdvakken in een waarde ("12:00 of 14:00", "18:00 - 22:00 uur"). */
function parseSlots(value: string): Slot[] | null {
    const slots: Slot[] = [];
    for (const m of value.matchAll(SLOT_RE)) {
        const start = clock(m[1], m[2]);
        if (!start) return null;
        if (m[3] !== undefined) {
            const end = clock(m[3], m[4]);
            if (!end) return null;
            slots.push({ start, end });
        } else {
            slots.push({ start });
        }
    }
    return slots;
}

function parsePrice(value: string): string | undefined {
    if (/\bgratis\b/i.test(value) && !value.includes("€")) return "0";
    if (/€\s*\d{1,3}\.\d{3}/.test(value)) return undefined; // duizendtallen: niet ons soort prijs
    const amounts = [...value.matchAll(PRICE_RE)];
    if (amounts.length !== 1) return undefined; // geen of meerdere bedragen: niet gokken welke
    const [, euros, cents] = amounts[0];
    return `${Number(euros)}.${cents && /^\d{2}$/.test(cents) ? cents : "00"}`;
}

/**
 * Leest datum, tijd(en) en prijs uit de gelabelde regels van een evenement.
 * Geeft null als datum of tijd ontbreekt of niet eenduidig is.
 */
export function parseEventDetails(body: string | null): ParsedEventDetails | null {
    if (!body) return null;
    const lines = labeledLines(body);

    const dateLines = lines.filter((l) => DATE_LABEL.test(l.label));
    if (dateLines.length !== 1) return null;
    const parsedDate = parseDate(dateLines[0].value);
    if (!parsedDate) return null;

    // Tijd mag op de datumregel staan ("Datum: 14 november 2026, 18:00 uur") ...
    let slots: Slot[] = [];
    if (parsedDate.rest) {
        const fromDateLine = parseSlots(parsedDate.rest);
        if (fromDateLine === null || fromDateLine.length > 1) return null;
        slots = fromDateLine;
    }

    // ... of op een eigen regel. Een gewone tijdregel moet precies een tijd(vak) hebben;
    // meerdere starttijden alleen onder een label als "Sittings".
    for (const l of lines) {
        const isTime = TIME_LABEL.test(l.label);
        const isSittings = SITTINGS_LABEL.test(l.label);
        if (!isTime && !isSittings) continue;
        if (slots.length > 0) return null; // tweede tijdopgave: niet eenduidig
        const found = parseSlots(l.value);
        if (!found || found.length === 0) return null;
        if (isTime && found.length !== 1) return null;
        slots = found;
    }
    if (slots.length === 0) return null;

    const priceLines = lines.filter((l) => PRICE_LABEL.test(l.label));
    const price = priceLines.length === 1 ? parsePrice(priceLines[0].value) : undefined;

    return { date: parsedDate.date, slots, ...(price !== undefined ? { price } : {}) };
}

/* ------------------------ tijdzone (Amsterdam) ------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

/** Verschil in minuten tussen Amsterdamse wandkloktijd en UTC op een moment. */
function amsterdamOffsetMinutes(instantMs: number): number {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: TIME_ZONE,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).formatToParts(new Date(instantMs));
    const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
    const wallAsUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
    return Math.round((wallAsUtc - Math.floor(instantMs / 60000) * 60000) / 60000);
}

/** Amsterdamse wandkloktijd naar ISO 8601 met offset, bijv. 2026-05-11T18:00:00+02:00. */
function amsterdamDateTime(date: DateParts, time: Clock, addDays = 0): { iso: string; ms: number } {
    const day = new Date(Date.UTC(date.y, date.mo - 1, date.d + addDays));
    const y = day.getUTCFullYear();
    const mo = day.getUTCMonth() + 1;
    const d = day.getUTCDate();
    const wall = Date.UTC(y, mo - 1, d, time.h, time.mi);
    let offset = amsterdamOffsetMinutes(wall);
    offset = amsterdamOffsetMinutes(wall - offset * 60000);
    const sign = offset >= 0 ? "+" : "-";
    const abs = Math.abs(offset);
    return {
        iso: `${y}-${pad(mo)}-${pad(d)}T${pad(time.h)}:${pad(time.mi)}:00${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`,
        ms: wall - offset * 60000,
    };
}

/* ------------------------------ JSON-LD ------------------------------ */

function absoluteUrl(url: string): string {
    return url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** Eerste foto uit het media-veld (JSON), anders de vaste agenda-foto. */
function eventImage(media: string | null): string {
    let items: Array<{ url?: string; thumbUrl?: string; kind?: string }> = [];
    try {
        const parsed = media ? JSON.parse(media) : [];
        if (Array.isArray(parsed)) items = parsed;
    } catch {
        // ongeldige JSON: val terug op de vaste foto
    }
    const image = items.find((m) => m.kind === "image")?.url || items[0]?.thumbUrl;
    return absoluteUrl(image || FALLBACK_IMAGE);
}

/**
 * Event-nodes (zonder @context, voor in een @graph) voor een Courant-item. Leeg als het
 * geen evenement is, als datum of tijd niet expliciet in de tekst staat, of als het
 * evenement voorbij is. Meerdere sittings worden elk een eigen Event.
 */
export function buildEventJsonLd(item: EventSource, now: Date = new Date()): Record<string, unknown>[] {
    if (item.category !== "events" || item.type !== "MANUAL") return [];
    const details = parseEventDetails(item.body);
    if (!details) return [];

    const url = `${SITE_URL}/updates/${item.slug}`;
    const description = extractMetaDescription(item.body) || undefined;
    const image = eventImage(item.media);
    const multiple = details.slots.length > 1;

    return details.slots.flatMap((slot) => {
        const start = amsterdamDateTime(details.date, slot.start);
        const end = slot.end
            ? amsterdamDateTime(
                  details.date,
                  slot.end,
                  slot.end.h * 60 + slot.end.mi <= slot.start.h * 60 + slot.start.mi ? 1 : 0,
              )
            : undefined;
        // Zonder eindtijd geldt het evenement tot het eind van de dag.
        const until = end?.ms ?? amsterdamDateTime(details.date, { h: 23, mi: 59 }).ms;
        if (now.getTime() > until) return [];

        const time = `${pad(slot.start.h)}${pad(slot.start.mi)}`;
        return [
            {
                "@type": "Event",
                "@id": `${url}#event${multiple ? `-${time}` : ""}`,
                name: item.title,
                ...(description ? { description } : {}),
                url,
                image: [image],
                startDate: start.iso,
                ...(end ? { endDate: end.iso } : {}),
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                location: {
                    "@type": "Place",
                    name: SITE_NAME,
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "Kamp 8",
                        postalCode: "3811 AR",
                        addressLocality: "Amersfoort",
                        addressCountry: "NL",
                    },
                },
                organizer: {
                    "@type": "Organization",
                    name: SITE_NAME,
                    url: SITE_URL,
                },
                ...(details.price !== undefined
                    ? {
                          offers: {
                              "@type": "Offer",
                              price: details.price,
                              priceCurrency: "EUR",
                              url,
                          },
                      }
                    : {}),
            },
        ];
    });
}

/** Event-nodes voor een lijst items (bijv. de agenda), elk evenement maar een keer. */
export function buildEventsJsonLd(items: EventSource[], now: Date = new Date()): Record<string, unknown>[] {
    const seen = new Set<string>();
    const out: Record<string, unknown>[] = [];
    for (const item of items) {
        if (seen.has(item.slug)) continue;
        seen.add(item.slug);
        out.push(...buildEventJsonLd(item, now));
    }
    return out;
}
