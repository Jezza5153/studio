"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SOLLICITATIE_MAX, valideerSollicitatie, type SollicitatieVeld } from "@/lib/sollicitatie";

type Fase = "invullen" | "versturen" | "verstuurd";
type Fouten = Partial<Record<SollicitatieVeld, string>>;

const VELDEN: SollicitatieVeld[] = ["naam", "telefoon", "email", "beschikbaarheid", "bericht", "privacy"];

const MELDING_VELDEN = "Niet alle velden zijn goed ingevuld. Kijk de gemarkeerde velden even na.";
const MELDING_ALGEMEEN = "Het versturen is niet gelukt. Probeer het later nog eens, of mail of bel ons.";
const MELDING_GEEN_VERBINDING =
  "Er is geen verbinding met de website. Controleer je internet en probeer het opnieuw, of mail of bel ons.";

// Uitkomst na een gewone formulierpost (zonder JavaScript), zie /api/sollicitatie.
const MELDING_UIT_URL: Record<string, string> = {
  velden: "Niet alle velden waren goed ingevuld. Vul het formulier opnieuw in.",
  "te-vaak": "Je hebt het formulier al een paar keer verstuurd. Probeer het over een kwartier opnieuw, of mail of bel ons.",
  mislukt: MELDING_ALGEMEEN,
};

const VELD =
  "block w-full rounded-none border-2 border-foreground bg-white px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 aria-[invalid=true]:border-red-700 disabled:opacity-60";
const LABEL = "mb-1.5 block text-sm font-bold text-foreground";
const HINT = "mt-1 text-xs text-muted-foreground";
const FOUT = "mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700";

function Verplicht() {
  return (
    <span aria-hidden className="ml-0.5 text-primary">
      *
    </span>
  );
}

function Optioneel() {
  return <span className="ml-1 font-normal text-muted-foreground">(optioneel)</span>;
}

export function SollicitatieForm({ vacatureSlug, functie }: { vacatureSlug: string; functie: string }) {
  const [fase, setFase] = useState<Fase>("invullen");
  const [fouten, setFouten] = useState<Fouten>({});
  const [melding, setMelding] = useState<string | null>(null);
  // Zonder JavaScript doet de browser de validatie (required); met JavaScript
  // tonen we zelf leesbare foutmeldingen bij de velden.
  const [verbeterd, setVerbeterd] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const meldingRef = useRef<HTMLDivElement>(null);
  const bedanktRef = useRef<HTMLDivElement>(null);
  const [focusOp, setFocusOp] = useState<SollicitatieVeld | "melding" | null>(null);
  const uid = useId();
  const id = (veld: string) => `${uid}-${veld}`;

  useEffect(() => {
    setVerbeterd(true);
    const params = new URLSearchParams(window.location.search);
    const uitkomst = params.get("sollicitatie");
    if (!uitkomst) return;
    if (uitkomst === "verstuurd") setFase("verstuurd");
    else setMelding(MELDING_UIT_URL[uitkomst] ?? MELDING_ALGEMEEN);
    params.delete("sollicitatie");
    const rest = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${rest ? `?${rest}` : ""}${window.location.hash}`);
  }, []);

  useEffect(() => {
    if (fase !== "verstuurd" || !bedanktRef.current) return;
    // Het formulier is langer dan de bedankmelding: zonder scrollen valt de
    // melding onder de sticky header.
    bedanktRef.current.focus({ preventScroll: true });
    bedanktRef.current.scrollIntoView({ block: "center" });
  }, [fase]);

  // Focus pas na het renderen verplaatsen: tijdens het versturen staan de
  // velden op disabled en kunnen ze geen focus krijgen.
  useEffect(() => {
    if (!focusOp || fase !== "invullen") return;
    const el = focusOp === "melding" ? meldingRef.current : formRef.current?.elements.namedItem(focusOp);
    if (el instanceof HTMLElement) el.focus();
    setFocusOp(null);
  }, [focusOp, fase]);

  function toonFouten(nieuw: Fouten, tekst: string) {
    setFouten(nieuw);
    setMelding(tekst);
    setFocusOp(VELDEN.find((v) => nieuw[v]) ?? "melding");
  }

  function toonMelding(tekst: string) {
    setMelding(tekst);
    setFocusOp("melding");
  }

  function wisFout(e: FormEvent<HTMLFormElement>) {
    const naam = (e.target as HTMLInputElement).name as SollicitatieVeld;
    if (!fouten[naam]) return;
    setFouten((huidig) => {
      const rest = { ...huidig };
      delete rest[naam];
      return rest;
    });
  }

  async function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (fase === "versturen") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const tekst = (k: string) => {
      const v = fd.get(k);
      return typeof v === "string" ? v : "";
    };
    const invoer = {
      vacature: vacatureSlug,
      naam: tekst("naam"),
      telefoon: tekst("telefoon"),
      email: tekst("email"),
      beschikbaarheid: tekst("beschikbaarheid"),
      bericht: tekst("bericht"),
      privacy: fd.get("privacy") === "on",
      website: tekst("website"),
    };

    const check = valideerSollicitatie(invoer);
    if (!check.ok) {
      toonFouten(check.fouten, MELDING_VELDEN);
      return;
    }

    setFase("versturen");
    setFouten({});
    setMelding(null);
    try {
      const res = await fetch("/api/sollicitatie", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(invoer),
      });
      const data: { ok?: boolean; melding?: unknown; fouten?: Fouten } | null = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        form.reset();
        setFase("verstuurd");
        return;
      }
      setFase("invullen");
      const tekstVanServer = typeof data?.melding === "string" ? data.melding : MELDING_ALGEMEEN;
      if (data?.fouten && typeof data.fouten === "object") toonFouten(data.fouten, tekstVanServer);
      else toonMelding(tekstVanServer);
    } catch {
      setFase("invullen");
      toonMelding(MELDING_GEEN_VERBINDING);
    }
  }

  if (fase === "verstuurd") {
    return (
      <div
        ref={bedanktRef}
        tabIndex={-1}
        role="status"
        className="mt-5 border-2 border-foreground bg-secondary p-5 outline-none sm:p-6"
      >
        <p className="flex items-center gap-2 font-headline text-xl font-extrabold text-foreground">
          <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" aria-hidden />
          Bedankt, je sollicitatie is binnen!
        </p>
        <p className="mt-2 text-[15px] text-foreground/80">
          We hebben je sollicitatie als {functie.toLowerCase()} goed ontvangen. We nemen binnen een paar dagen contact met
          je op.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          We bewaren je gegevens tot uiterlijk 4 weken na de procedure.
        </p>
      </div>
    );
  }

  const bezig = fase === "versturen";
  const foutId = (veld: SollicitatieVeld) => (fouten[veld] ? id(`${veld}-fout`) : undefined);
  const beschrijving = (...ids: (string | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;
  const foutTekst = (veld: SollicitatieVeld) =>
    fouten[veld] ? (
      <p id={id(`${veld}-fout`)} className={FOUT}>
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        {fouten[veld]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      action="/api/sollicitatie"
      method="post"
      noValidate={verbeterd}
      onSubmit={verstuur}
      onChange={wisFout}
      aria-describedby={id("uitleg")}
      className="relative mt-5 space-y-5"
    >
      <p id={id("uitleg")} className="text-sm text-muted-foreground">
        Velden met een <span className="text-primary">*</span> zijn verplicht.
      </p>

      <input type="hidden" name="vacature" value={vacatureSlug} />

      {/* Honeypot voor bots: onzichtbaar voor bezoekers en screenreaders. */}
      <div aria-hidden="true" className="absolute left-[-10000px] top-0 h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Laat dit veld leeg</label>
        <input id={id("website")} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <label htmlFor={id("naam")} className={LABEL}>
          Naam
          <Verplicht />
        </label>
        <input
          id={id("naam")}
          name="naam"
          type="text"
          autoComplete="name"
          required
          maxLength={SOLLICITATIE_MAX.naam}
          disabled={bezig}
          aria-invalid={fouten.naam ? true : undefined}
          aria-describedby={foutId("naam")}
          className={VELD}
        />
        {foutTekst("naam")}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("telefoon")} className={LABEL}>
            Telefoonnummer
            <Verplicht />
          </label>
          <input
            id={id("telefoon")}
            name="telefoon"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={SOLLICITATIE_MAX.telefoon}
            placeholder="06 12345678"
            disabled={bezig}
            aria-invalid={fouten.telefoon ? true : undefined}
            aria-describedby={beschrijving(id("telefoon-hint"), foutId("telefoon"))}
            className={VELD}
          />
          <p id={id("telefoon-hint")} className={HINT}>
            Zo kunnen we je bellen of appen.
          </p>
          {foutTekst("telefoon")}
        </div>

        <div>
          <label htmlFor={id("email")} className={LABEL}>
            E-mail
            <Optioneel />
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={SOLLICITATIE_MAX.email}
            disabled={bezig}
            aria-invalid={fouten.email ? true : undefined}
            aria-describedby={foutId("email")}
            className={VELD}
          />
          {foutTekst("email")}
        </div>
      </div>

      <div>
        <label htmlFor={id("beschikbaarheid")} className={LABEL}>
          Wanneer kun je werken?
          <Verplicht />
        </label>
        <textarea
          id={id("beschikbaarheid")}
          name="beschikbaarheid"
          rows={3}
          required
          maxLength={SOLLICITATIE_MAX.beschikbaarheid}
          placeholder="Bijvoorbeeld: vrijdag- en zaterdagavond, vanaf november"
          disabled={bezig}
          aria-invalid={fouten.beschikbaarheid ? true : undefined}
          aria-describedby={beschrijving(id("beschikbaarheid-hint"), foutId("beschikbaarheid"))}
          className={`${VELD} min-h-[88px] resize-y`}
        />
        <p id={id("beschikbaarheid-hint")} className={HINT}>
          Welke dagen, hoeveel uur per week en vanaf wanneer.
        </p>
        {foutTekst("beschikbaarheid")}
      </div>

      <div>
        <label htmlFor={id("bericht")} className={LABEL}>
          Iets over jezelf of je ervaring
          <Optioneel />
        </label>
        <textarea
          id={id("bericht")}
          name="bericht"
          rows={5}
          maxLength={SOLLICITATIE_MAX.bericht}
          placeholder="Wie ben je, wat heb je eerder gedaan en waarom wil je bij De Tafelaar werken?"
          disabled={bezig}
          aria-invalid={fouten.bericht ? true : undefined}
          aria-describedby={foutId("bericht")}
          className={`${VELD} min-h-[132px] resize-y`}
        />
        {foutTekst("bericht")}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("privacy")}
            name="privacy"
            type="checkbox"
            required
            disabled={bezig}
            aria-invalid={fouten.privacy ? true : undefined}
            aria-describedby={foutId("privacy")}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          />
          <label htmlFor={id("privacy")} className="cursor-pointer text-sm text-foreground">
            Ik ga akkoord dat De Tafelaar mijn gegevens gebruikt voor deze sollicitatie
            <Verplicht />
          </label>
        </div>
        {foutTekst("privacy")}
      </div>

      {melding && (
        <div
          ref={meldingRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-2.5 border-2 border-red-700 bg-red-50 p-4 text-sm font-medium text-red-800 outline-none"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
          <p>{melding}</p>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={bezig} className="w-full sm:w-auto">
          {bezig ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Bezig met versturen...
            </>
          ) : (
            <>
              <Send aria-hidden />
              Verstuur sollicitatie
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground sm:max-w-xs">
          We nemen binnen een paar dagen contact met je op. We bewaren je gegevens tot uiterlijk 4 weken na de
          procedure.
        </p>
      </div>
    </form>
  );
}
