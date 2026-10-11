import { NextResponse } from "next/server";
import { CONTACT_MAX, CONTACT_ONDERWERPEN } from "@/lib/contact-form";
import { contactDetails } from "@/content/site-content";

// Contactformulier: verstuurt het bericht via Resend naar de mailbox van het restaurant.
// Env (Vercel, Production): RESEND_API_KEY (verplicht), CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TO_DEFAULT = "reserveren@tafelaaramersfoort.nl";
// onboarding@resend.dev werkt zonder domeinverificatie, maar alleen naar het e-mailadres van het Resend-account.
const FROM_DEFAULT = "De Tafelaar website <onboarding@resend.dev>";

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const MIN_FILL_MS = 3000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function teVaak(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  const blocked = recent.length >= RATE_MAX;
  if (!blocked) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (!times.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(key);
  }
  return blocked;
}

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);
const tekst = (v: unknown) => (typeof v === "string" ? v.replace(/\u0000/g, "").trim() : "");
const eenRegel = (s: string) => s.replace(/[\r\n\t]+/g, " ");

function fout(status: number, error: string, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, ...(errors ? { errors } : {}) }, { status });
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return fout(503, `Het formulier werkt even niet. Bel ons op ${contactDetails.phone}.`);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fout(400, "Ongeldig verzoek.");
  }

  // Spamvallen: een verborgen veld dat mensen niet zien, en de tijd tussen openen en versturen.
  // Bots krijgen "gelukt" terug, zodat ze niet gaan proberen hoe het wel lukt.
  const honeypot = tekst(body.website);
  const startedAt = Number(body.t);
  const elapsed = Date.now() - startedAt;
  if (honeypot || !Number.isFinite(startedAt) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "onbekend";
  if (teVaak(ip)) return fout(429, `Je hebt net al een paar berichten gestuurd. Probeer het later nog eens of bel ons op ${contactDetails.phone}.`);

  const naam = eenRegel(tekst(body.naam));
  const email = eenRegel(tekst(body.email));
  const telefoon = eenRegel(tekst(body.telefoon));
  const bericht = tekst(body.bericht);
  const onderwerp = CONTACT_ONDERWERPEN.find((o) => o.value === body.onderwerp) ?? CONTACT_ONDERWERPEN[0];

  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > CONTACT_MAX.naam) errors.naam = "Je naam is te lang.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > CONTACT_MAX.email) errors.email = "Vul een geldig e-mailadres in, dan kunnen we je antwoorden.";
  if (telefoon && !/^[+()\d\s.-]{6,30}$/.test(telefoon)) errors.telefoon = "Dit lijkt geen telefoonnummer.";
  if (bericht.length < 10) errors.bericht = "Schrijf iets meer in je bericht.";
  else if (bericht.length > CONTACT_MAX.bericht) errors.bericht = `Je bericht is te lang (maximaal ${CONTACT_MAX.bericht} tekens).`;
  else if ((bericht.match(/https?:\/\/|www\./gi) ?? []).length > 2) errors.bericht = "Haal de links uit je bericht, dan komt het zeker aan.";
  if (Object.keys(errors).length) return fout(400, "Controleer de velden hieronder.", errors);

  const to = process.env.CONTACT_TO_EMAIL || TO_DEFAULT;
  const from = process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT;
  const regels = [
    `Onderwerp: ${onderwerp.label}`,
    `Naam: ${naam}`,
    `E-mail: ${email}`,
    `Telefoon: ${telefoon || "niet opgegeven"}`,
  ];
  const text = `Nieuw bericht via tafelaaramersfoort.nl\n\n${regels.join("\n")}\n\n${bericht}\n\nMet "Beantwoorden" gaat je antwoord direct naar ${email}.`;
  const html = `<p>Nieuw bericht via tafelaaramersfoort.nl</p><p>${regels.map(esc).join("<br>")}</p><p style="white-space:pre-wrap">${esc(bericht)}</p><p style="color:#666">Met "Beantwoorden" gaat je antwoord direct naar ${esc(email)}.</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website: ${onderwerp.label}, van ${naam}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("contactformulier: Resend weigerde", res.status, (await res.text()).slice(0, 300));
      return fout(502, `Versturen lukte niet. Probeer het later nog eens of bel ons op ${contactDetails.phone}.`);
    }
  } catch (err) {
    console.error("contactformulier: Resend niet bereikbaar", err instanceof Error ? err.message : err);
    return fout(502, `Versturen lukte niet. Probeer het later nog eens of bel ons op ${contactDetails.phone}.`);
  }

  return NextResponse.json({ ok: true });
}
