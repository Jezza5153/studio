"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT_MAX, CONTACT_ONDERWERPEN, type ContactOnderwerp } from "@/lib/contact-form";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

function Veldfout({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-destructive">
      {children}
    </p>
  );
}

/** Contactformulier: verstuurt via /api/contact (Resend). Zonder e-mailadres op de pagina, dus minder spam. */
export function ContactForm({ telefoon }: { telefoon: string }) {
  const startedAt = useRef(0);
  const [onderwerp, setOnderwerp] = useState<ContactOnderwerp>("vraag");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    startedAt.current = Date.now();
    // /contact?onderwerp=catering#bericht zet het onderwerp alvast goed
    const gevraagd = new URLSearchParams(window.location.search).get("onderwerp");
    const match = CONTACT_ONDERWERPEN.find((o) => o.value === gevraagd);
    if (match) setOnderwerp(match.value);
  }, []);

  async function verstuur(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, onderwerp, t: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "ok" });
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        // Spring naar het eerste veld dat nog aandacht nodig heeft
        const eerste = ["naam", "email", "telefoon", "bericht"].find((k) => json.errors[k]);
        if (eerste) requestAnimationFrame(() => document.getElementById(`contact-${eerste}`)?.focus());
      }
      setStatus({ kind: "error", message: json.error ?? `Versturen lukte niet. Bel ons gerust op ${telefoon}.` });
    } catch {
      setStatus({ kind: "error", message: `Geen verbinding. Probeer het opnieuw of bel ons op ${telefoon}.` });
    }
  }

  if (status.kind === "ok") {
    return (
      <div role="status" className="border-2 border-foreground bg-background p-6">
        <p className="font-headline text-2xl font-extrabold tracking-tight">Bedankt, je bericht is verstuurd!</p>
        <p className="mt-2 text-muted-foreground">
          We nemen zo snel mogelijk contact met je op. Wil je vandaag nog een tafel? Bel ons dan even op {telefoon}.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={verstuur} noValidate className="space-y-5" aria-describedby="contact-privacy">
      {/* Verborgen veld tegen spam: mensen zien het niet, bots vullen het in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <Label htmlFor="contact-onderwerp">Waar gaat het over?</Label>
        <select
          id="contact-onderwerp"
          name="onderwerp"
          value={onderwerp}
          onChange={(e) => setOnderwerp(e.target.value as ContactOnderwerp)}
          className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
        >
          {CONTACT_ONDERWERPEN.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-naam">Naam</Label>
          <Input
            id="contact-naam"
            name="naam"
            autoComplete="name"
            required
            maxLength={CONTACT_MAX.naam}
            aria-invalid={Boolean(errors.naam)}
            aria-describedby={errors.naam ? "fout-naam" : undefined}
            className="mt-2"
          />
          <Veldfout id="fout-naam">{errors.naam}</Veldfout>
        </div>
        <div>
          <Label htmlFor="contact-email">E-mailadres</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={CONTACT_MAX.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "fout-email" : undefined}
            className="mt-2"
          />
          <Veldfout id="fout-email">{errors.email}</Veldfout>
        </div>
      </div>

      <div>
        <Label htmlFor="contact-telefoon">Telefoonnummer</Label>
        <Input
          id="contact-telefoon"
          name="telefoon"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          maxLength={CONTACT_MAX.telefoon}
          aria-invalid={Boolean(errors.telefoon)}
          aria-describedby={errors.telefoon ? "fout-telefoon" : undefined}
          className="mt-2"
        />
        <Veldfout id="fout-telefoon">{errors.telefoon}</Veldfout>
        <p className="mt-1.5 text-xs text-muted-foreground">Vul je e-mailadres of telefoonnummer in, een van de twee is genoeg.</p>
      </div>

      <div>
        <Label htmlFor="contact-bericht">Je bericht</Label>
        <Textarea
          id="contact-bericht"
          name="bericht"
          required
          rows={6}
          maxLength={CONTACT_MAX.bericht}
          placeholder={
            onderwerp === "groep" || onderwerp === "catering"
              ? "Welke datum heb je in gedachten, met hoeveel personen, en wat zoek je?"
              : onderwerp === "werken"
                ? "Vertel kort wie je bent, wat je zoekt en wanneer je kunt werken."
                : "Waar kunnen we je mee helpen?"
          }
          aria-invalid={Boolean(errors.bericht)}
          aria-describedby={errors.bericht ? "fout-bericht" : undefined}
          className="mt-2"
        />
        <Veldfout id="fout-bericht">{errors.bericht}</Veldfout>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="border-2 border-destructive bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {status.message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-privacy" className="text-xs text-muted-foreground">
          We gebruiken je gegevens alleen om je bericht te beantwoorden. Lees ook onze{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacyverklaring
          </Link>
          .
        </p>
        <Button type="submit" disabled={sending} className="sm:w-auto">
          {sending ? "Versturen..." : "Verstuur bericht"}
        </Button>
      </div>
    </form>
  );
}
