
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NeighborhoodGuideClient } from "./neighborhood-guide-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Buurtgids Flint & Kamp | Eten vlakbij Flint Amersfoort",
  description:
    "Op zoek naar eten dichtbij Flint? De Tafelaar ligt op 2 minuten lopen. Ontdek de beste restaurants nabij Flint, parkeren en hotspots op de Kamp in Amersfoort.",
  alternates: {
    canonical: "/buurtgids",
  },
  openGraph: {
    title: "Buurtgids Flint - Eten & Restaurants vlakbij Flint",
    description: "De beste restaurants en eten dichtbij Flint Amersfoort. De Tafelaar ligt in de Kamp, op 2 min lopen.",
  },
  keywords: [
    "eten dichtbij flint",
    "eten naast flint",
    "restaurant vlakbij flint",
    "eten theater amersfoort",
    "restaurant naast theater amersfoort",
    "restaurant kamp amersfoort",
    "parkeren flint",
    "shared dining amersfoort",
  ],
};

const buurtgidsFaqs = [
  {
    question: "Welk restaurant ligt het dichtst bij Flint Amersfoort?",
    answer:
      "De Tafelaar op de Kamp 8 ligt op 2 minuten lopen van Theater de Flint. Ideaal voor een diner of borrel voor of na een voorstelling. We zijn open vanaf 15:00 op vrijdag en zaterdag, en vanaf 17:00 op woensdag, donderdag en zondag.",
  },
  {
    question: "Waar kan ik parkeren bij Theater de Flint?",
    answer:
      "De dichtstbijzijnde parkeergarages zijn Parkeergarage Koestraat en Parkeergarage Flintplein, beide op 2-3 minuten lopen van De Tafelaar en Theater de Flint. Ook Parkeergarage Stadhuisplein en Beestenmarkt zijn goede opties.",
  },
  {
    question: "Welke restaurants zitten er op de Kamp in Amersfoort?",
    answer:
      "De Kamp is een gezellige straat in Amersfoort centrum met diverse restaurants. Naast De Tafelaar (shared dining) vind je er onder andere De Aubergerie (Frans), Awazé (Ethiopisch), Indian Flavour en Anna's Smaakatelier.",
  },
  {
    question: "Kan ik voor een Flint-voorstelling eten bij De Tafelaar?",
    answer:
      "Zeker! We raden aan om rond 17:15 of 17:45 te reserveren als je voor een voorstelling wilt eten. Onze shared dining gerechten zijn snel te serveren zodat je op tijd in het theater zit. Kleine gerechten kosten €3,50–€15.",
  },
];

function buurtgidsFaqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: buurtgidsFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

export default function BuurtgidsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buurtgidsFaqJsonLd() }} />
      <NeighborhoodGuideClient />

      {/* Server-rendered SEO content below the interactive map */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
        {/* About section */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4 text-center">
            Eten vlakbij Theater de Flint
          </h2>
          <Card className="rounded-2xl border p-6 sm:p-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                De Tafelaar is een shared dining restaurant op de Kamp 8 in Amersfoort centrum, op
                slechts 2 minuten lopen van Theater de Flint. Wij serveren kleine gerechten om te
                delen — van borrelplanken en charcuterie tot warme seizoensgerechten. Ideaal voor
                een ontspannen diner of borrel voor of na een voorstelling.
              </p>
              <p>
                Op vrijdag en zaterdag zijn we al open vanaf 15:00, waardoor je ruim de tijd hebt
                voor een vroeg diner. Kleine gerechten kosten €3,50–€15, een compleet diner gemiddeld
                €25–35 per persoon. Reserveer online of bel +31 6 341 279 32.
              </p>
            </div>
          </Card>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
            Veelgestelde vragen
          </h2>
          <div className="space-y-4">
            {buurtgidsFaqs.map((faq, i) => (
              <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section className="max-w-2xl mx-auto text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/eten-voor-theater-de-flint">
              <Button variant="outline" className="rounded-xl">Eten voor de Flint</Button>
            </Link>
            <Link href="/reserveren">
              <Button variant="outline" className="rounded-xl">Reserveren</Button>
            </Link>
            <Link href="/openingstijden">
              <Button variant="outline" className="rounded-xl">Openingstijden</Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline" className="rounded-xl">Menukaart</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
