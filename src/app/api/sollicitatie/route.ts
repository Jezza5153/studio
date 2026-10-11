import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getVacature } from "@/content/vacatures";
import { contactDetails } from "@/content/site-content";
import { valideerSollicitatie } from "@/lib/sollicitatie";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { escHtml, mailNaarRestaurant } from "@/lib/resend-mail";

// Sollicitatieformulier op /vacatures/[slug].
// - JSON (fetch vanuit het formulier) krijgt JSON terug.
// - Een gewone formulierpost (JavaScript nog niet geladen of uit) krijgt een
//   303 terug naar de vacature met ?sollicitatie=<uitkomst>, zodat er nooit
//   persoonsgegevens in een URL belanden.
// Foutmeldingen zijn vaste zinnen: de invoer gaat nooit terug naar de browser
// en ook niet naar de logs.

export const dynamic = "force-dynamic";

const MAX_BYTES = 16_000;
const LIMIET = { max: 5, vensterMs: 15 * 60_000 };
const HONEYPOT = "website";
const NO_STORE = { "Cache-Control": "no-store" };

const MELDING = {
  velden: "Niet alle velden zijn goed ingevuld. Kijk de gemarkeerde velden even na.",
  vacature: "Deze vacature staat niet meer open. Kijk op de vacaturepagina welke functies er nu zijn.",
  teVaak: `Je hebt het formulier al een paar keer verstuurd. Probeer het over een kwartier opnieuw, of bel ons op ${contactDetails.phone}.`,
  teGroot: "Je bericht is te lang. Maak het wat korter en probeer het opnieuw.",
  formaat: "Er ging iets mis met het formulier. Ververs de pagina en probeer het opnieuw.",
  mislukt: `Het versturen is niet gelukt. Probeer het later nog eens, of mail naar ${contactDetails.email} of bel ${contactDetails.phone}.`,
} as const;

type Uitkomst = "verstuurd" | "velden" | "te-vaak" | "mislukt";

// Alleen foutklasse, Prisma-code en meta: Prisma-meldingen kunnen de
// ingevulde waarden bevatten.
function foutInfo(err: unknown) {
  if (!(err instanceof Error)) return { name: "unknown" };
  const { code, meta } = err as { code?: unknown; meta?: unknown };
  return { name: err.name, code: typeof code === "string" ? code : undefined, meta };
}

async function leesInvoer(request: Request): Promise<{ invoer: Record<string, unknown>; formulierPost: boolean } | "te-groot" | "formaat"> {
  const lengte = Number(request.headers.get("content-length") ?? 0);
  if (lengte > MAX_BYTES) return "te-groot";

  const type = request.headers.get("content-type") ?? "";
  try {
    if (type.includes("multipart/form-data")) {
      const fd = await request.formData();
      const invoer: Record<string, unknown> = {};
      for (const [k, v] of fd) if (typeof v === "string") invoer[k] = v;
      return { invoer, formulierPost: true };
    }
    const tekst = await request.text();
    if (tekst.length > MAX_BYTES) return "te-groot";
    if (type.includes("application/x-www-form-urlencoded")) {
      return { invoer: Object.fromEntries(new URLSearchParams(tekst)), formulierPost: true };
    }
    const json: unknown = JSON.parse(tekst);
    if (!json || typeof json !== "object" || Array.isArray(json)) return "formaat";
    return { invoer: json as Record<string, unknown>, formulierPost: false };
  } catch {
    return "formaat";
  }
}

export async function POST(request: Request) {
  const gelezen = await leesInvoer(request);
  if (gelezen === "te-groot") {
    return NextResponse.json({ ok: false, melding: MELDING.teGroot }, { status: 413, headers: NO_STORE });
  }
  if (gelezen === "formaat") {
    return NextResponse.json({ ok: false, melding: MELDING.formaat }, { status: 400, headers: NO_STORE });
  }
  const { invoer, formulierPost } = gelezen;

  const slug = typeof invoer.vacature === "string" ? invoer.vacature : "";
  const vacature = getVacature(slug);

  // Zonder JavaScript: terug naar de vacature (alleen een bekende slug, dus
  // geen open redirect) met de uitkomst in de URL.
  const antwoord = (uitkomst: Uitkomst, json: Record<string, unknown>, status: number) => {
    if (formulierPost) {
      const pad = vacature ? `/vacatures/${vacature.slug}?sollicitatie=${uitkomst}#solliciteren` : "/vacatures";
      const url = new URL(pad, request.url);
      return NextResponse.redirect(url, { status: 303, headers: NO_STORE });
    }
    return NextResponse.json(json, { status, headers: NO_STORE });
  };

  if (!vacature) {
    return antwoord("mislukt", { ok: false, melding: MELDING.vacature }, 400);
  }

  const ip = clientIp(request);

  // Honeypot: mensen zien dit veld niet. Gevuld = bot. Doe alsof het gelukt is,
  // maar sla niets op.
  const honing = invoer[HONEYPOT];
  if (typeof honing === "string" && honing.trim() !== "") {
    rateLimit("sollicitatie", ip, LIMIET);
    return antwoord("verstuurd", { ok: true }, 201);
  }

  const resultaat = valideerSollicitatie(invoer);
  if (!resultaat.ok) {
    return antwoord("velden", { ok: false, melding: MELDING.velden, fouten: resultaat.fouten }, 422);
  }

  if (!rateLimit("sollicitatie", ip, LIMIET)) {
    return antwoord("te-vaak", { ok: false, melding: MELDING.teVaak }, 429);
  }

  try {
    await prisma.sollicitatie.create({
      data: { vacatureSlug: vacature.slug, ...resultaat.data },
    });
  } catch (err) {
    console.error("[sollicitatie] opslaan mislukt", foutInfo(err));
    return antwoord("mislukt", { ok: false, melding: MELDING.mislukt }, 503);
  }

  console.info(`[sollicitatie] nieuwe sollicitatie voor ${vacature.slug}`);

  // Melding naar de restaurantmailbox. Opslaan is al gelukt; mislukt de mail, dan staat de
  // sollicitatie gewoon in /admin.
  const d = resultaat.data;
  const regels = [
    `Vacature: ${vacature.titel}`,
    `Naam: ${d.naam}`,
    `Telefoon: ${d.telefoon}`,
    `E-mail: ${d.email ?? "niet opgegeven"}`,
    `Beschikbaarheid: ${d.beschikbaarheid || "niet ingevuld"}`,
  ];
  const overzicht = "https://www.tafelaaramersfoort.nl/admin";
  await mailNaarRestaurant({
    subject: `Nieuwe sollicitatie: ${vacature.titel}, ${d.naam}`,
    replyTo: d.email,
    text: `Nieuwe sollicitatie via de website\n\n${regels.join("\n")}\n\nOver zichzelf:\n${d.bericht ?? "niets ingevuld"}\n\nAlle sollicitaties staan in ${overzicht}. Verwijder gegevens uiterlijk 4 weken na de procedure, ook uit deze mailbox.`,
    html: `<p>Nieuwe sollicitatie via de website</p><p>${regels.map(escHtml).join("<br>")}</p><p><strong>Over zichzelf:</strong><br><span style="white-space:pre-wrap">${escHtml(d.bericht ?? "niets ingevuld")}</span></p><p>Alle sollicitaties staan in <a href="${overzicht}">het beheerpaneel</a>. Verwijder gegevens uiterlijk 4 weken na de procedure, ook uit deze mailbox.</p>`,
  });

  return antwoord("verstuurd", { ok: true }, 201);
}
