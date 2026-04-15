import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, UtensilsCrossed, Coffee } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Lunch Amersfoort Centrum | Zaterdag & Zondag | De Tafelaar",
    description:
        "Lunchen in Amersfoort centrum? De Tafelaar is op zaterdag open vanaf 11:00 en op zondag van 11:00 tot 15:00. Shared dining met kleine gerechten op de Kamp.",
    alternates: {
        canonical: "/lunch-amersfoort",
    },
    openGraph: {
        title: "Lunch Amersfoort Centrum | Zaterdag & Zondag | De Tafelaar",
        description:
            "Lunchen in Amersfoort centrum? Shared dining op de Kamp, zaterdag vanaf 11:00 en zondag 11:00-15:00.",
    },
    keywords: [
        "lunch amersfoort",
        "lunchen amersfoort",
        "lunch amersfoort centrum",
        "brunch amersfoort",
        "zondag lunch amersfoort",
        "zaterdag lunch amersfoort",
        "lunchadres amersfoort",
        "lunch kamp amersfoort",
    ],
};

const faqs = [
    {
        question: "Kan ik lunchen bij De Tafelaar in Amersfoort?",
        answer: "Ja, op zaterdag zijn we open vanaf 11:00 en op zondag van 11:00 tot 15:00 — ideaal voor een lunch in Amersfoort centrum. Op vrijdag openen we om 15:00 voor een late lunch of borrel. Woensdag en donderdag starten we om 17:00.",
    },
    {
        question: "Wat voor lunch serveert De Tafelaar?",
        answer: "Shared dining: kleine gerechten om te delen. Denk aan borrelplanken met kazen en charcuterie, carpaccio van bieten, gevulde eitjes, bruschetta en seizoensgebonden warme gerechten. Perfect voor een lichte lunch of uitgebreide brunch.",
    },
    {
        question: "Wat kost lunchen bij De Tafelaar?",
        answer: "Kleine gerechten kosten EUR 3,50 tot EUR 15. Voor een lichte lunch reken je op 2 tot 3 gerechten per persoon (EUR 15-25 p.p.). Voor een uitgebreide brunch 3 tot 4 gerechten (EUR 25-35 p.p.).",
    },
    {
        question: "Kan ik zondag lunchen in Amersfoort bij De Tafelaar?",
        answer: "Ja, op zondag zijn we open van 11:00 tot 15:00 — exclusief voor lunch en brunch. Reserveren wordt aangeraden, vooral bij mooi weer en in het weekend.",
    },
    {
        question: "Is lunchen zonder reservering mogelijk?",
        answer: "Walk-ins zijn welkom als er plek is, maar op zaterdag en zondag kan het druk zijn. Reserveer eenvoudig online of bel +31 6 341 279 32.",
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

export default function LunchAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Lunch op de Kamp
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Lunch in Amersfoort Centrum
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Lunchen bij De Tafelaar: shared dining op de Kamp 8, zaterdag vanaf 11:00 en
                        zondag van 11:00 tot 15:00. Midden in het centrum van Amersfoort, op 2 minuten
                        van Theater de Flint.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sun className="h-5 w-5" />
                                    <CardTitle className="text-lg">Za &amp; zo open overdag</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Zaterdag vanaf 11:00 en zondag 11:00-15:00. Perfect voor een relaxte
                                lunch of late brunch.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <UtensilsCrossed className="h-5 w-5" />
                                    <CardTitle className="text-lg">Shared dining lunch</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kleine gerechten om te delen. 2-3 plates voor een lichte lunch of 3-4
                                voor een uitgebreide brunch.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Coffee className="h-5 w-5" />
                                    <CardTitle className="text-lg">Koffie van Boot</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Lokale koffie van Boot Koffie uit Amersfoort en seizoensgebonden ingredienten
                                van 14+ regionale makers.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer je lunch" />
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Lunchen bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Op zoek naar een lunchadres in Amersfoort centrum? De Tafelaar op de Kamp
                                is op zaterdag open vanaf 11:00 en op zondag exclusief voor lunch van
                                11:00 tot 15:00. Ons shared dining concept past perfect bij lunchen:
                                je bestelt kleine gerechten om te delen, waardoor je van alles kunt proeven
                                zonder overvol op tafel.
                            </p>
                            <p>
                                Voor een lichte lunch raden we 2 tot 3 gerechten per persoon aan (EUR 15-25
                                p.p.). Wil je er wat uitgebreider voor gaan zitten — een zondagsbrunch met
                                vrienden bijvoorbeeld — kies dan 3 tot 4 gerechten (EUR 25-35 p.p.).
                                Gerechten variëren van EUR 3,50 tot EUR 15.
                            </p>
                            <p>
                                De kaart is seizoensgebonden en wisselt mee met wat de lokale producenten
                                aanleveren. Denk aan borrelplanken met kazen van de Boerenbrink en charcuterie
                                uit de regio, carpaccio van rode bieten, gevulde eitjes met aioli, bruschetta
                                en warme seizoensgerechten. Koffie komt van Boot Koffie, onze Amersfoortse
                                stadsbrander.
                            </p>
                            <p>
                                De Tafelaar zit op Kamp 8, hartje centrum Amersfoort — op 2 minuten van
                                Theater de Flint, 5 minuten van station Amersfoort en 1 minuut van
                                parkeergarage Kamp. Ideaal voor een lunch tussen het winkelen of shoppen
                                in de binnenstad, of als rustpunt op een dagje uit in Amersfoort. Met een
                                4.8 op Google en 90+ reviews zijn we een van de best beoordeelde
                                restaurants in Amersfoort centrum.
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
                                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
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
                        <Link href="/openingstijden">
                            <Button variant="outline" className="rounded-xl">
                                Openingstijden
                            </Button>
                        </Link>
                        <Link href="/restaurant-amersfoort-centrum">
                            <Button variant="outline" className="rounded-xl">
                                Restaurant centrum
                            </Button>
                        </Link>
                        <Link href="/borrel-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Borrelen
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
