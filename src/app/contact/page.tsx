// app/(site)/reserveren/page.tsx
export const dynamic = "force-static";

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

export default function ReserverenPage() {
  // Address + maps (no keys)
  const addressLines = (contactDetails.address || "").split("\n").filter(Boolean);
  const queryAddress = encodeURIComponent(addressLines.join(", "));
  const mapsEmbedSrc = `https://www.google.com/maps?&q=${queryAddress}&output=embed`;
  const googleWeb = `https://www.google.com/maps/search/?api=1&query=${queryAddress}`;
  const appleMaps = `https://maps.apple.com/?q=${queryAddress}`;
  const geoFallback = `geo:0,0?q=${queryAddress}`;
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");

  // --- FAQ override for "grote groep" ---
  const GROEP_ANTWOORD =
    "Vanaf 7 personen hebben wij een chef's choice arrangement. Reserveer hier eventueel meerdere tafels voor en bel/mail ons bij uitzonderingen, dieetwensen of andere bijzonderheden. Bij opmerkingen krijgen we niet meteen een melding namelijk en kunnen we er misschien geen rekening mee houden.";
  const modifiedFaq = reservationFaq.map((item) =>
    item.question?.toLowerCase().includes("grote groep reserveren")
      ? { ...item, answer: GROEP_ANTWOORD }
      : item
  );

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-20">
      {/* Hero */}
      <div className="text-center mb-12 md:mb-14">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Reserveer uw tafel
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          We kijken ernaar uit u te mogen verwelkomen.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Left column */}
        <div className="lg:col-span-2">
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="font-headline text-2xl sm:text-3xl tracking-tight">
                Kom je eten?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground leading-relaxed">
                Klik <strong>rechtsonder</strong> op de <strong>groene reserveren-knop</strong> om te boeken.
              </p>

              {/* Acties */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {hasDialablePhone && (
                  <Button asChild className="w-full">
                    <a href={`tel:${contactDetails.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Bel ons
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" className="w-full">
                  <a href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Reservering De Tafelaar")}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Mail ons
                  </a>
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

              {/* "Nep knop" uitleg */}
              <div className="mt-4">
                <button
                  type="button"
                  aria-disabled="true"
                  className="w-full rounded-xl border border-dashed border-border bg-muted/30 px-4 py-2 text-sm text-foreground/80 cursor-default"
                  title="Reserveer via de groene knop rechtsonder"
                >
                  Reserveer rechts onder via de groene knop
                </button>
              </div>

              {/* TIP (vervangen tekst) */}
              <div className="mt-6 rounded-xl bg-muted/40 p-4 border-l-4 border-primary/30">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    <strong>Tip:</strong> Vanaf 7 personen hebben wij een chef&apos;s choice arrangement. Reserveer hier eventueel meerdere tafels
                    voor en of bel/mail ons bij uitzonderingen, dieetwensen of andere bijzonderheden. Bij opmerkingen krijgen we niet meteen een melding.
                  </span>
                </p>
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
    </div>
  );
}
