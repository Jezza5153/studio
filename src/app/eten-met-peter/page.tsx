// src/app/eten-met-peter/page.tsx
//
// Eten met Peter — gastchef avond op 11 mei 2026, charity dinner voor de
// Hersenstichting. Gastkok Peter van den Heuvel + chef Jeremy Arrascaeta in
// de keuken van De Tafelaar (Jan Molmans, Kamp 8, Amersfoort).
//
// Bron: destadamersfoort.nl 22-04-2026 — "De Tafelaar in actie voor de
// Hersenstichting".

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReserveerButton } from "@/components/reserveer-button";
import { Calendar, ChefHat, Heart, Leaf, MapPin, Users, Wine } from "lucide-react";

export const dynamic = "force-static";

const EVENT_DATE_LABEL = "Maandag 11 mei 2026 · vanaf 18:00";
const EVENT_START_ISO = "2026-05-11T18:00";
const EVENT_END_ISO = "2026-05-11T22:30";
const RESERVATION_URL = "https://www.boekeerlijk.nl/reserveer/de-tafelaar";
const SOURCE_URL =
  "https://www.destadamersfoort.nl/lokaal/zakelijk/1271395/de-tafelaar-in-actie-voor-de-hersenstichting";
const HERSENSTICHTING_URL = "https://www.hersenstichting.nl";
// Press photo: team van De Tafelaar voor de pui — gastkok Peter van den
// Heuvel (rechts, met whisk en bundel), chef Jeremy Arrascaeta, eigenaar Jan
// Molmans en team. Owner-supplied 29-04-2026.
const HERO_IMAGE_SRC = "/pics/eten-met-peter.jpg";
const HERO_IMAGE_ALT =
  "Het team van De Tafelaar voor het restaurant op Kamp 8 in Amersfoort. Vlnr: chef-kok, gastkok Peter van den Heuvel met zijn bundel 'Ik heb een heel klein gaatje gedicht', en team — gastchef-avond 11 mei 2026 voor de Hersenstichting.";

export const metadata: Metadata = {
  title: "Eten met Peter — Actie voor de Hersenstichting | 11 mei | De Tafelaar",
  description:
    "Maandag 11 mei 2026: gastkok Peter van den Heuvel en chef Jeremy Arrascaeta organiseren een charity-diner bij De Tafelaar in Amersfoort. Vriendendiner uit Peters bundel 'Ik heb een heel klein gaatje gedicht', biologische producten, opbrengst voor de Hersenstichting.",
  alternates: { canonical: "/eten-met-peter" },
  openGraph: {
    title: "Eten met Peter — Charity Diner voor de Hersenstichting",
    description:
      "11 mei 2026 bij De Tafelaar Amersfoort. Gastkok Peter van den Heuvel + chef Jeremy. Vriendendiner uit zijn bundel, biologische producten, opbrengst Hersenstichting.",
    images: [{ url: "/pics/eten-met-peter.jpg" }],
  },
  keywords: [
    "eten met peter",
    "peter van den heuvel",
    "gastchef de tafelaar",
    "charity diner amersfoort",
    "hersenstichting actie",
    "vriendendiner amersfoort",
    "ik heb een heel klein gaatje gedicht",
    "speciale avond restaurant amersfoort",
    "biologisch diner amersfoort",
  ],
};

const faqs = [
  {
    question: "Wat is 'Eten met Peter'?",
    answer:
      "Een speciale charity-avond bij restaurant De Tafelaar op maandag 11 mei 2026. Gastkok Peter van den Heuvel verzorgt zijn vriendendiner uit de bundel 'Ik heb een heel klein gaatje gedicht'. Onze chef Jeremy Arrascaeta staat naast hem in de keuken. De volledige opbrengst gaat naar de actie van Peter voor de Hersenstichting.",
  },
  {
    question: "Wie is Peter van den Heuvel?",
    answer:
      "Peter van den Heuvel is de auteur van 'Ik heb een heel klein gaatje gedicht' — een bundel waarin gedichten, fotografie en recepten samenkomen. Onder dezelfde titel voert hij actie om geld op te halen voor de Hersenstichting. Op 11 mei kookt hij als gastkok zijn signature vriendendiner bij De Tafelaar.",
  },
  {
    question: "Wat is het concept van het diner?",
    answer:
      "Een vriendendiner zoals omschreven in Peters bundel — gerechten die in zijn poëzie en fotografie verweven zijn. Voor deze avond werken we uitsluitend met biologische producten. Twee chefs in de keuken (Peter van den Heuvel en Jeremy Arrascaeta), één avond, één doel: aandacht voor de Hersenstichting.",
  },
  {
    question: "Hoe laat begint de avond en hoe lang duurt het?",
    answer:
      "Maandag 11 mei 2026, vanaf 18:00. Reken op een avond van circa 3 tot 4 uur — een vriendendiner met meerdere gangen, gesprekken, en aandacht voor het verhaal achter de bundel.",
  },
  {
    question: "Hoe reserveer ik?",
    answer:
      "Via onze reserveerflow op BoekEerlijk: boekeerlijk.nl/reserveer/de-tafelaar. Het aantal plaatsen is beperkt. Vermeld bij je reservering dat je voor 'Eten met Peter' komt.",
  },
  {
    question: "Wat is de Hersenstichting en waarom deze actie?",
    answer:
      "De Hersenstichting zet zich in voor gezonde hersenen voor iedereen — onderzoek, voorlichting en patiëntenondersteuning. Peter van den Heuvel voert onder de titel van zijn bundel actie voor deze stichting. De opbrengst van deze avond komt rechtstreeks ten goede aan zijn actie.",
  },
  {
    question: "Werkt iedereen vrijwillig mee?",
    answer:
      "Jan Molmans, eigenaar van De Tafelaar, stelt zijn restaurant open voor deze avond. Chef Jeremy Arrascaeta doneert zijn tijd en inzet. Peter van den Heuvel verzorgt het diner. De gehele opbrengst gaat naar de actie voor de Hersenstichting.",
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

function eventJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": "https://tafelaaramersfoort.nl/eten-met-peter#event",
    name: "Eten met Peter — Charity Diner voor de Hersenstichting",
    startDate: EVENT_START_ISO,
    endDate: EVENT_END_ISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "De Tafelaar",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kamp 8",
        addressLocality: "Amersfoort",
        postalCode: "3811 AR",
        addressCountry: "NL",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: RESERVATION_URL,
      // Price not yet published in source article — Offer omitted intentionally
      // until owner confirms. Add "price" + "priceCurrency" when known.
    },
    description:
      "Charity-avond bij De Tafelaar in Amersfoort op maandag 11 mei 2026. Gastkok Peter van den Heuvel verzorgt zijn vriendendiner uit de bundel 'Ik heb een heel klein gaatje gedicht'. Onze chef Jeremy Arrascaeta staat naast hem in de keuken. Uitsluitend biologische producten. Volledige opbrengst gaat naar de actie van Peter van den Heuvel voor de Hersenstichting.",
    image: `https://tafelaaramersfoort.nl${HERO_IMAGE_SRC}`,
    organizer: {
      "@type": "Organization",
      name: "De Tafelaar",
      url: "https://tafelaaramersfoort.nl",
    },
    performer: [
      {
        "@type": "Person",
        name: "Peter van den Heuvel",
        description:
          "Gastkok, auteur van 'Ik heb een heel klein gaatje gedicht' — bundel met gedichten, fotografie en recepten. Voert onder dezelfde titel actie voor de Hersenstichting.",
      },
      {
        "@type": "Person",
        name: "Jeremy Arrascaeta",
        description:
          "Chef-kok bij De Tafelaar. Doneert zijn tijd en inzet aan deze avond.",
      },
    ],
    sponsor: {
      "@type": "Restaurant",
      name: "De Tafelaar",
      "@id": "https://tafelaaramersfoort.nl#restaurant",
    },
  });
}

export default function EtenMetPeterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventJsonLd() }} />
      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Hero */}
        <header className="text-center mb-12">
          <p className="inline-block text-xs tracking-widest uppercase text-amber-700 dark:text-amber-400 mb-2">
            Charity-avond bij De Tafelaar · in actie voor de Hersenstichting
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Eten met Peter
          </h1>
          <div className="mt-6 max-w-3xl mx-auto rounded-2xl overflow-hidden border border-border shadow-sm">
            <Image
              src={HERO_IMAGE_SRC}
              alt={HERO_IMAGE_ALT}
              width={1200}
              height={1600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Gastkok <strong className="text-foreground">Peter van den Heuvel</strong> en onze chef{" "}
            <strong className="text-foreground">Jeremy Arrascaeta</strong> bundelen hun krachten
            voor één avond. Een vriendendiner uit Peters bundel{" "}
            <em>&apos;Ik heb een heel klein gaatje gedicht&apos;</em>, uitsluitend biologische
            producten — de volledige opbrengst gaat naar de Hersenstichting.
          </p>
          <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-300">
            {EVENT_DATE_LABEL}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ReserveerButton size="lg" className="rounded-xl shadow-sm" label="Reserveer voor 11 mei" />
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-xl">
                Vragen? Neem contact op
              </Button>
            </Link>
          </div>
        </header>

        {/* Praktische info */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="h-5 w-5" />
                  <CardTitle className="text-base">Wanneer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Maandag 11 mei 2026</p>
                <p>Vanaf 18:00</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Heart className="h-5 w-5" />
                  <CardTitle className="text-base">Voor wie</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">De Hersenstichting</p>
                <p>Volledige opbrengst</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Leaf className="h-5 w-5" />
                  <CardTitle className="text-base">Producten</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">100% biologisch</p>
                <p>Uitsluitend voor deze avond</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin className="h-5 w-5" />
                  <CardTitle className="text-base">Locatie</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Kamp 8, Amersfoort</p>
                <p>Hartje centrum</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Concept */}
        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
              Het verhaal achter de avond
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Peter van den Heuvel schreef de bundel{" "}
                <em className="text-foreground">&apos;Ik heb een heel klein gaatje gedicht&apos;</em>{" "}
                — een verzameling waarin gedichten, fotografie en recepten samenkomen. Onder
                dezelfde titel voert hij actie om geld op te halen voor de Hersenstichting.
              </p>
              <p>
                Op maandag 11 mei brengt hij die actie naar restaurant De Tafelaar in Amersfoort.
                Eigenaar <strong className="text-foreground">Jan Molmans</strong> stelt zijn zaak
                open voor de avond. Onze chef{" "}
                <strong className="text-foreground">Jeremy Arrascaeta</strong> doneert zijn tijd en
                inzet. Peter zelf staat als gastkok in de keuken om zijn signature vriendendiner
                te verzorgen — gerechten die je in zijn poëzie en fotografie terugleest, nu op tafel.
              </p>
              <p>
                Voor deze avond werken we{" "}
                <strong className="text-foreground">uitsluitend met biologische producten</strong>.
                Samen bundelen we onze krachten om iets neer te zetten dat draait om aandacht voor
                het doel van de Hersenstichting:{" "}
                <em className="text-foreground">iedereen gezonde hersenen</em>. De volledige
                opbrengst van de avond komt ten goede aan de actie van Peter.
              </p>
            </div>
          </Card>
        </section>

        {/* Charity highlight */}
        <section className="max-w-3xl mx-auto mb-12">
          <Card className="rounded-2xl border p-6 sm:p-8 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-3">
              <Heart className="h-6 w-6 text-amber-700 dark:text-amber-400 shrink-0 mt-1" />
              <div className="space-y-2">
                <h2 className="font-headline text-xl sm:text-2xl tracking-tight">
                  Voor de Hersenstichting
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  De Hersenstichting zet zich in voor gezonde hersenen voor iedereen — via
                  onderzoek, voorlichting en patiëntenondersteuning. De opbrengst van Eten met
                  Peter komt rechtstreeks ten goede aan Peter van den Heuvel&apos;s actie voor de
                  Hersenstichting.
                </p>
                <p className="text-sm">
                  <a
                    href={HERSENSTICHTING_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="underline text-amber-800 dark:text-amber-300 hover:text-foreground"
                  >
                    Meer over de Hersenstichting →
                  </a>
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Three highlights */}
        <section className="max-w-4xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Wat je deze avond kunt verwachten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <ChefHat className="h-5 w-5" />
                  <CardTitle className="text-lg">Twee chefs, één keuken</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Peter van den Heuvel als gastkok met zijn signature vriendendiner, samen met chef
                Jeremy Arrascaeta van De Tafelaar.
              </CardContent>
            </Card>

            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Leaf className="h-5 w-5" />
                  <CardTitle className="text-lg">Volledig biologisch</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uitsluitend biologische producten voor deze avond — afgestemd op het verhaal en
                het doel.
              </CardContent>
            </Card>

            <Card className="rounded-2xl border">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" />
                  <CardTitle className="text-lg">Beperkt aantal plaatsen</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Eerdere gastchef-avonden bij De Tafelaar waren snel volgeboekt. Reserveer op tijd
                via BoekEerlijk.
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <ReserveerButton size="lg" className="rounded-xl shadow-sm" label="Reserveer je plek — 11 mei" />
          </div>
        </section>

        {/* Press attribution */}
        <section className="max-w-3xl mx-auto mb-12">
          <p className="text-sm text-muted-foreground text-center">
            Aankondiging:{" "}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              De Stad Amersfoort — &quot;De Tafelaar in actie voor de Hersenstichting&quot; (22 april 2026)
            </a>
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="rounded-2xl border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{faq.answer}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/menu">
              <Button variant="outline" className="rounded-xl">
                Bekijk ons menu
              </Button>
            </Link>
            <Link href="/agenda">
              <Button variant="outline" className="rounded-xl">
                Agenda &amp; nieuws
              </Button>
            </Link>
            <Link href="/moederdag-high-tea-amersfoort">
              <Button variant="outline" className="rounded-xl">
                Moederdag High Tea
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="rounded-xl">
                Contact
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
