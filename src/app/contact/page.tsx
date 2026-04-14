
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact De Tafelaar | Reserveren & Bereikbaarheid Amersfoort",
  description:
    "Neem contact op met De Tafelaar op de Kamp 8 in Amersfoort centrum. Reserveer online, bel +31 6 341 279 32 of mail. Op 2 min van Flint, 5 min van station.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "contact de tafelaar",
    "reserveren amersfoort",
    "restaurant bereikbaarheid amersfoort",
    "de tafelaar telefoon",
    "de tafelaar adres",
  ],
  openGraph: {
    title: "Contact De Tafelaar | Reserveren & Bereikbaarheid Amersfoort",
    description:
      "Neem contact op met De Tafelaar in Amersfoort. Reserveer online, bel of mail. Op 2 min van Flint, 5 min van station.",
  },
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactDetails, reservationFaq, openingHours } from "@/content/site-content";
import { Phone, Info, MapPin, Mail } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";
import { ObfuscatedEmail } from "@/components/obfuscated-email";

// --- FAQ override for "grote groep" (module-level for JSON-LD) ---
const GROEP_ANTWOORD =
  "Vanaf 7 personen hebben wij een chef's choice arrangement. Reserveer hier eventueel meerdere tafels voor en bel/mail ons bij uitzonderingen, dieetwensen of andere bijzonderheden. Bij opmerkingen krijgen we niet meteen een melding namelijk en kunnen we er misschien geen rekening mee houden.";

const modifiedFaq = reservationFaq.map((item) =>
  item.question?.toLowerCase().includes("grote groep reserveren")
    ? { ...item, answer: GROEP_ANTWOORD }
    : item
);

function contactFaqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: modifiedFaq.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

export default function ReserverenPage() {
  // Address + maps (no keys)
  const addressLines = (contactDetails.address || "").split("\n").filter(Boolean);
  const queryAddress = encodeURIComponent(addressLines.join(", "));
  const mapsEmbedSrc = `https://www.google.com/maps?&q=${queryAddress}&output=embed`;
  const googleWeb = `https://www.google.com/maps/search/?api=1&query=${queryAddress}`;
  const appleMaps = `https://maps.apple.com/?q=${queryAddress}`;
  const geoFallback = `geo:0,0?q=${queryAddress}`;

  const rawPhone = contactDetails.phone || "";
  const dialPhone = rawPhone.replace(/[^\d+]/g, "");
  const hasDialablePhone = /\d/.test(dialPhone);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: contactFaqJsonLd() }} />
      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-20">
      {/* Hero */}
      <div className="text-center mb-12 md:mb-14">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Contact De Tafelaar Amersfoort
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          Reserveer online, bel of mail. We zitten op de Kamp 8, op 2 minuten lopen van Theater de Flint.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Left column */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="font-headline text-2xl sm:text-3xl tracking-tight">
                Reserveer uw tafel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed">
                Klik op de knop hieronder om direct een tafel te boeken. Voor vragen zijn we bereikbaar via de andere opties.
              </p>

              {/* Acties */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* ✅ CTA: opent Tapla */}
                <ReserveerButton label="Direct online reserveren" className="md:col-span-2" />

                {hasDialablePhone && (
                  <Button asChild className="w-full">
                    <a href={`tel:${dialPhone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Bel ons
                    </a>
                  </Button>
                )}

                <Button asChild variant="outline" className="w-full">
                  <ObfuscatedEmail
                    user="reserveren"
                    domain="tafelaaramersfoort.nl"
                    subject="Vraag over reservering"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Mail ons
                  </ObfuscatedEmail>
                </Button>

                <Button asChild variant="secondary" className="w-full">
                  <a href={googleWeb} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    Open Google Maps
                  </a>
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <a href={appleMaps} target="_blank" rel="noopener noreferrer">
                    Open Apple Maps
                  </a>
                </Button>

                <Button asChild variant="ghost" className="w-full md:hidden">
                  <a href={geoFallback}>Open in Maps (telefoon)</a>
                </Button>
              </div>

              {/* Knop naar Verhuur & Groepen */}
              <div className="mt-4">
                <Link href="/verhuur-en-groepen" prefetch={false}>
                  <Button variant="outline" className="rounded-xl">Naar “Verhuur & Groepen”</Button>
                </Link>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right column: FAQ + tijden */}
        <div className="space-y-8">
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="font-headline text-2xl sm:text-3xl tracking-tight">
                Veelgestelde Vragen
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="single" collapsible className="w-full">
                {modifiedFaq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b">
                    <AccordionTrigger className="font-semibold text-left text-base sm:text-lg data-[state=open]:text-foreground">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border bg-card">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="font-headline text-xl tracking-tight">Openingstijden</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="text-sm text-muted-foreground divide-y">
                {openingHours.schedule.map((s) => (
                  <li key={s.day} className="flex justify-between py-2">
                    <span className="font-medium text-foreground">{s.day}</span>
                    <span className="tabular-nums">{s.time}</span>
                  </li>
                ))}
              </ul>
              {openingHours.footer && (
                <p className="text-xs text-muted-foreground mt-3">{openingHours.footer}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Bereikbaarheid */}
      <section className="max-w-3xl mx-auto mt-12">
        <Card className="rounded-2xl border p-6 sm:p-8">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
            Bereikbaarheid
          </h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              De Tafelaar ligt op de Kamp 8, midden in het centrum van Amersfoort. Vanaf station
              Amersfoort Centraal loop je in 5 minuten naar ons restaurant. Theater de Flint is
              op 2 minuten loopafstand — ideaal voor een diner voor of na een voorstelling.
            </p>
            <p>
              Parkeren kan bij parkeergarage Kamp/Flint (ingang Stadsring) of Hoef (5 min lopen).
              Met het openbaar vervoer is De Tafelaar uitstekend bereikbaar via station Amersfoort
              Centraal (bus en trein).
            </p>
          </div>
        </Card>
      </section>

      {/* Internal links */}
      <section className="max-w-2xl mx-auto mt-12 mb-4 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/openingstijden">
            <Button variant="outline" className="rounded-xl">Openingstijden</Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" className="rounded-xl">Menukaart</Button>
          </Link>
          <Link href="/reserveren">
            <Button variant="outline" className="rounded-xl">Reserveren</Button>
          </Link>
          <Link href="/eten-voor-theater-de-flint">
            <Button variant="outline" className="rounded-xl">Eten voor de Flint</Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

