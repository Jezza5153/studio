
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";
import { openingHours } from "@/content/site-content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Openingstijden De Tafelaar Amersfoort | Wanneer Open",
  description:
    "Openingstijden van De Tafelaar op de Kamp 8 in Amersfoort centrum. Wo\u2013do 17:00\u201323:00, vr 15:00\u201300:00, za 11:00\u201300:00, zo 11:00\u201315:00. Reserveer online of bel +31 6 341 279 32.",
  alternates: {
    canonical: "/openingstijden",
  },
  openGraph: {
    title: "Openingstijden De Tafelaar Amersfoort | Wanneer Open",
    description:
      "Openingstijden van De Tafelaar op de Kamp 8 in Amersfoort centrum. Wo\u2013do 17:00\u201323:00, vr 15:00\u201300:00, za 11:00\u201300:00, zo 11:00\u201315:00. Reserveer online of bel +31 6 341 279 32.",
  },
  keywords: [
    "openingstijden de tafelaar",
    "openingstijden restaurant amersfoort",
    "wanneer open de tafelaar",
    "restaurant open amersfoort",
  ],
};

const faqs = [
  {
    question: "Wanneer is De Tafelaar open?",
    answer:
      "De Tafelaar is geopend van woensdag t/m zondag. Woensdag en donderdag van 17:00 tot 23:00, vrijdag van 15:00 tot 00:00, zaterdag van 11:00 tot 00:00, en zondag van 11:00 tot 15:00. Op maandag en dinsdag zijn wij gesloten.",
  },
  {
    question: "Is De Tafelaar open op feestdagen?",
    answer:
      "Openingstijden kunnen afwijken op feestdagen zoals Kerst, Oud & Nieuw en Koningsdag. Check onze website of bel +31 6 341 279 32 voor de actuele situatie.",
  },
  {
    question: "Kan ik ook overdag langskomen?",
    answer:
      "Op vrijdag zijn we open vanaf 15:00, zaterdag al vanaf 11:00 en zondag van 11:00 tot 15:00. Woensdag en donderdag openen we om 17:00.",
  },
  {
    question: "Moet ik reserveren bij De Tafelaar?",
    answer:
      "Reserveren is niet verplicht maar wel aan te raden, vooral op vrijdag- en zaterdagavond. Je kunt eenvoudig online reserveren via onze website. Walk-ins zijn welkom als er plek is.",
  },
];

function faqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

export default function OpeningstijdenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            Openingstijden De Tafelaar Amersfoort
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Wanneer kunt u bij ons terecht voor shared dining, borrel of diner op de Kamp in
            Amersfoort centrum.
          </p>
        </div>

        {/* Entity paragraph */}
        <section className="max-w-2xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                De Tafelaar is een shared dining restaurant op de Kamp 8 in Amersfoort centrum. Wij serveren
                seizoensgebonden gerechten om te delen, met lokale producten van makers uit de regio. Kleine
                gerechten kosten €3,50–€15, een compleet diner gemiddeld €25–35 per persoon. Voor groepen
                vanaf 7 personen bieden we het Chef&apos;s Choice arrangement aan (€45 p.p.).
              </p>
              <p>
                We liggen op 2 minuten lopen van Theater de Flint en 5 minuten van station Amersfoort
                Centraal. Ideaal voor een borrel of diner voor of na een voorstelling.
              </p>
            </div>
          </Card>
        </section>

        {/* Hours card */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <ul className="divide-y divide-border">
                {openingHours.schedule.map((item) => (
                  <li key={item.day} className="flex justify-between items-center py-4">
                    <span className="font-semibold text-base sm:text-lg">{item.day}</span>
                    <div className="text-right">
                      <span className="text-base sm:text-lg text-muted-foreground">{item.time}</span>
                      {item.special && (
                        <p className="text-sm text-accent">{item.special}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 bg-muted/50 rounded-b-2xl">
              <p className="text-sm text-muted-foreground text-center w-full">{openingHours.footer}</p>
            </CardFooter>
          </Card>
        </div>

        {/* Location card */}
        <section className="max-w-2xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Locatie
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <span>Kamp 8, 3811 AR Amersfoort</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <a href="tel:+31634127932" className="underline hover:text-foreground">
                  +31 6 341 279 32
                </a>
              </p>
              <p className="text-sm">
                Op 2 minuten loopafstand van Theater de Flint en 5 minuten van station Amersfoort
                Centraal.
              </p>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <Card key={faq.question} className="rounded-2xl border p-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mb-12">
          <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
        </div>

        {/* Internal links */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button variant="outline" className="rounded-xl">
                Contact
              </Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="rounded-xl">
                Bekijk ons menu
              </Button>
            </Link>
            <Link href="/reserveren">
              <Button variant="outline" className="rounded-xl">
                Reserveren
              </Button>
            </Link>
            <Link href="/eten-voor-theater-de-flint">
              <Button variant="outline" className="rounded-xl">
                Eten voor de Flint
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
