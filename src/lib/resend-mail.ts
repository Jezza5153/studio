// Kleine helper om een e-mail te versturen via de Resend API (zelfde instellingen als het contactformulier).
// Env (Vercel, Production): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.

const TO_DEFAULT = "info@tafelaaramersfoort.nl";
const FROM_DEFAULT = "De Tafelaar website <onboarding@resend.dev>";

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ESC[c]);

/** Verstuurt een mail naar de restaurantmailbox. Geeft false terug als het niet lukt; gooit nooit. */
export async function mailNaarRestaurant(opts: { subject: string; text: string; html: string; replyTo?: string | null }): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || FROM_DEFAULT,
        to: [process.env.CONTACT_TO_EMAIL || TO_DEFAULT],
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        subject: opts.subject.replace(/[\r\n]+/g, " "),
        text: opts.text,
        html: opts.html,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      // Alleen de status: de foutmelding van Resend kan ingevulde gegevens herhalen.
      console.error("[mail] Resend weigerde", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[mail] Resend niet bereikbaar", err instanceof Error ? err.name : "unknown");
    return false;
  }
}
