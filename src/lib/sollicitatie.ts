// Validatie van het sollicitatieformulier op /vacatures/[slug].
// Wordt zowel in de browser (directe feedback) als in POST /api/sollicitatie
// gebruikt; de server is leidend. Foutteksten zijn vaste zinnen: we sturen de
// invoer van de sollicitant nooit terug.

export const SOLLICITATIE_MAX = {
  naam: 100,
  telefoon: 30,
  email: 254,
  beschikbaarheid: 1000,
  bericht: 3000,
} as const;

export const SOLLICITATIE_STATUSSEN = ["nieuw", "afgehandeld"] as const;
export type SollicitatieStatus = (typeof SOLLICITATIE_STATUSSEN)[number];

export type SollicitatieVeld = "naam" | "telefoon" | "email" | "beschikbaarheid" | "bericht" | "privacy";

export type SollicitatieInvoer = {
  naam: string;
  telefoon: string;
  email: string | null;
  beschikbaarheid: string;
  bericht: string | null;
};

export type SollicitatieValidatie =
  | { ok: true; data: SollicitatieInvoer }
  | { ok: false; fouten: Partial<Record<SollicitatieVeld, string>> };

// Stuurtekens weg (Postgres weigert \u0000), regeleinden en tabs blijven staan
// in de lange velden.
function schoon(waarde: unknown, meerdereRegels = false): string {
  if (typeof waarde !== "string") return "";
  const zonderStuurtekens = meerdereRegels
    ? waarde.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : waarde.replace(/[\u0000-\u001F\u007F]/g, " ");
  return zonderStuurtekens.trim();
}

/** Nederlands (06 12345678, 033 1234567) of internationaal (+32 470 12 34 56, 0049 ...). */
export function geldigTelefoonnummer(telefoon: string): boolean {
  if (!/^[+\d\s().-]+$/.test(telefoon)) return false;
  const cijfers = telefoon.replace(/[\s().-]/g, "");
  return /^0[1-9]\d{8}$/.test(cijfers) || /^(?:\+|00)[1-9]\d{7,14}$/.test(cijfers);
}

export function geldigEmailadres(email: string): boolean {
  return /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email);
}

/** Alleen cijfers en +, voor een tel:-link. */
export function telLink(telefoon: string): string {
  return `tel:${telefoon.replace(/[^\d+]/g, "")}`;
}

function akkoord(waarde: unknown): boolean {
  return waarde === true || waarde === "on" || waarde === "true" || waarde === "ja";
}

export function valideerSollicitatie(invoer: Record<string, unknown>): SollicitatieValidatie {
  const naam = schoon(invoer.naam);
  const telefoon = schoon(invoer.telefoon);
  const email = schoon(invoer.email);
  const beschikbaarheid = schoon(invoer.beschikbaarheid, true);
  const bericht = schoon(invoer.bericht, true);

  const fouten: Partial<Record<SollicitatieVeld, string>> = {};

  if (!naam) fouten.naam = "Vul je naam in.";
  else if (naam.length > SOLLICITATIE_MAX.naam) fouten.naam = `Je naam mag maximaal ${SOLLICITATIE_MAX.naam} tekens zijn.`;

  if (!telefoon) fouten.telefoon = "Vul je telefoonnummer in.";
  else if (telefoon.length > SOLLICITATIE_MAX.telefoon || !geldigTelefoonnummer(telefoon))
    fouten.telefoon = "Dit telefoonnummer klopt niet. Bijvoorbeeld: 06 12345678 of +32 470 12 34 56.";

  if (email && (email.length > SOLLICITATIE_MAX.email || !geldigEmailadres(email)))
    fouten.email = "Dit e-mailadres klopt niet. Laat het veld leeg als je liever gebeld wordt.";

  // Beschikbaarheid mag leeg blijven: liever een sollicitatie zonder dan geen sollicitatie.
  if (beschikbaarheid.length > SOLLICITATIE_MAX.beschikbaarheid)
    fouten.beschikbaarheid = `Maximaal ${SOLLICITATIE_MAX.beschikbaarheid} tekens.`;

  if (bericht.length > SOLLICITATIE_MAX.bericht) fouten.bericht = `Maximaal ${SOLLICITATIE_MAX.bericht} tekens.`;

  if (!akkoord(invoer.privacy)) fouten.privacy = "Zet een vinkje om akkoord te gaan, anders kunnen we je sollicitatie niet bewaren.";

  if (Object.keys(fouten).length > 0) return { ok: false, fouten };
  return {
    ok: true,
    data: { naam, telefoon, email: email || null, beschikbaarheid, bericht: bericht || null },
  };
}
