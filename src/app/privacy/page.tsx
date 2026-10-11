import type { Metadata } from "next";
import Link from "next/link";
import { sharedOpenGraph } from "@/lib/site-metadata";
import { contactDetails } from "@/content/site-content";

export const dynamic = "force-static";

const BIJGEWERKT = "11 oktober 2026";

export const metadata: Metadata = {
  title: { absolute: "Privacyverklaring | De Tafelaar Amersfoort" },
  description:
    "Hoe De Tafelaar in Amersfoort omgaat met je gegevens: reserveren, het contactformulier, sollicitaties, websitestatistieken en je rechten.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    ...sharedOpenGraph,
    title: "Privacyverklaring De Tafelaar",
    description: "Hoe De Tafelaar omgaat met je gegevens.",
  },
};

function Blok({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-headline text-2xl font-extrabold tracking-tight">{titel}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
        Privacyverklaring
      </h1>
      <p className="mt-4 text-muted-foreground">Laatst bijgewerkt: {BIJGEWERKT}</p>

      <p className="mt-6 leading-relaxed">
        De Tafelaar, Kamp 8, 3811 AR Amersfoort, gaat zorgvuldig om met je gegevens. In deze verklaring lees je welke
        gegevens we gebruiken, waarvoor, en welke rechten je hebt. Vragen? Stuur ons een bericht via het{" "}
        <Link href="/contact#bericht" className="underline underline-offset-2">contactformulier</Link> of bel{" "}
        {contactDetails.phone}.
      </p>

      <Blok titel="Reserveren">
        <p>
          Als je online reserveert, vul je je naam, contactgegevens, de datum, het aantal personen en eventuele
          opmerkingen in. Die gebruiken we om je reservering te verwerken en je te bereiken als er iets verandert. Het
          reserveren verloopt via BoekEerlijk, dat de gegevens namens ons verwerkt.
        </p>
      </Blok>

      <Blok titel="Contactformulier">
        <p>
          Via het <Link href="/contact#bericht" className="underline underline-offset-2">contactformulier</Link> stuur je
          ons je naam, e-mailadres, eventueel je telefoonnummer en je bericht. Dat gebruiken we alleen om je bericht te
          beantwoorden. Het bericht komt als e-mail binnen in onze mailbox; het versturen loopt via de e-maildienst Resend.
          We bewaren je bericht zolang dat nodig is om je vraag af te handelen.
        </p>
      </Blok>

      <Blok titel="Solliciteren">
        <p>
          Solliciteer je via de <Link href="/vacatures" className="underline underline-offset-2">vacaturepagina</Link>, dan
          bewaren we je naam, telefoonnummer, e-mailadres, beschikbaarheid en wat je over jezelf vertelt. Die gegevens
          gebruiken we alleen voor de sollicitatie. We verwijderen ze uiterlijk 4 weken na het einde van de procedure.
        </p>
      </Blok>

      <Blok titel="Websitestatistieken en cookies">
        <p>
          We gebruiken Google Analytics om te zien hoe bezoekers de website gebruiken, bijvoorbeeld welke pagina's het
          meest bekeken worden. Google Analytics plaatst daarvoor cookies. Volgens Google slaat Analytics geen
          IP-adressen op.
        </p>
        <p>
          Op sommige pagina's staan diensten van anderen, zoals de kaart van Google Maps op de contactpagina en het
          reserveringsvenster van BoekEerlijk. Die diensten kunnen ook cookies plaatsen. Je kunt cookies altijd
          verwijderen of blokkeren in de instellingen van je browser.
        </p>
      </Blok>

      <Blok titel="Waar je gegevens staan">
        <p>
          Onze website draait bij Vercel en gebruikt een database van Neon. Met de partijen die gegevens voor ons
          verwerken (onder meer BoekEerlijk, Resend, Vercel, Neon en Google) delen we alleen wat nodig is om de website,
          reserveringen en e-mail te laten werken. We verkopen je gegevens nooit.
        </p>
      </Blok>

      <Blok titel="Je rechten">
        <p>
          Je mag altijd vragen welke gegevens we van je hebben, en ze laten aanpassen of verwijderen. Je kunt ook bezwaar
          maken tegen het gebruik ervan. Stuur daarvoor een bericht via het{" "}
          <Link href="/contact#bericht" className="underline underline-offset-2">contactformulier</Link>; we reageren
          binnen een maand.
        </p>
        <p>
          Ben je het niet eens met hoe we met je gegevens omgaan? Laat het ons eerst weten, dan zoeken we samen een
          oplossing. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
        </p>
      </Blok>
    </div>
  );
}
