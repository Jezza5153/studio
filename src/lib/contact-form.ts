// Gedeeld tussen het contactformulier (client) en /api/contact (server).

export const CONTACT_ONDERWERPEN = [
  { value: "vraag", label: "Vraag of reservering" },
  { value: "groep", label: "Groep, feest of verhuur" },
  { value: "catering", label: "Catering" },
  { value: "werken", label: "Werken bij De Tafelaar" },
  { value: "overig", label: "Iets anders" },
] as const;

export type ContactOnderwerp = (typeof CONTACT_ONDERWERPEN)[number]["value"];

export const CONTACT_MAX = { naam: 100, email: 200, telefoon: 30, bericht: 3000 } as const;

/**
 * Het formulier staat alleen op de site als de Resend-sleutel in Vercel staat.
 * Alleen aanroepen in servercode: de sleutel zelf komt nooit in de browser.
 */
export function contactFormulierAan(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
