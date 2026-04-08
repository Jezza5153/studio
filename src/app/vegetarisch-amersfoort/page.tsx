import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sprout, Heart } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Vegetarisch Restaurant Amersfoort | Vegan & Veggie bij De Tafelaar",
    description:
        "Vegetarisch uit eten in Amersfoort? De Tafelaar: ruim aanbod vegetarische en vegan gerechten. Shared dining met seizoensgebonden groenten en lokale producten.",
    alternates: {
        canonical: "/vegetarisch-amersfoort",
    },
    openGraph: {
        title: "Vegetarisch Restaurant Amersfoort | Vegan & Veggie bij De Tafelaar",
        description:
            "Ruim aanbod vegetarische en vegan gerechten. Shared dining met seizoensgebonden groenten bij De Tafelaar.",
    },
    keywords: [
        "vegetarisch restaurant amersfoort",
        "vegan restaurant amersfoort",
        "vegetarisch eten amersfoort",
        "vegan eten amersfoort",
        "plantaardig eten amersfoort",
        "vegetarisch uit eten amersfoort",
    ],
};

const faqs = [
    {
        question: "Heeft De Tafelaar vegetarische opties?",
        answer: "Ja, een groot deel van ons menu is vegetarisch (V) of vegan (VG). Elk seizoen staan er meerdere plantaardige gerechten op de kaart.",
    },
    {
        question: "Is De Tafelaar volledig vegetarisch?",
        answer: "Nee, maar we bieden altijd een ruime selectie vegetarische en vegan gerechten. Op onze menukaart staan V (vegetarisch), VG (vegan) en GF (glutenvrij) duidelijk aangegeven.",
    },
    {
        question: "Kunnen jullie rekening houden met allergieen?",
        answer: "Ja, we werken met verse producten en kunnen vrijwel altijd aanpassen. Allergenen staan op de menukaart vermeld. Geef je wensen door bij reservering.",
    },
    {
        question: "Hoe werkt vegetarisch shared dining?",
        answer: "Net als bij ons reguliere menu: je kiest meerdere kleine vegetarische gerechten om te delen. Wij adviseren 2-3 gerechten per persoon.",
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

export default function VegetarischAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Vegetarisch &amp; Vegan in Amersfoort
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Vegetarisch eten bij De Tafelaar
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een vegetarisch restaurant in Amersfoort? De Tafelaar biedt een
                        ruim aanbod vegetarische en vegan gerechten. Shared dining met
                        seizoensgebonden groenten en lokale producten.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Leaf className="h-5 w-5" />
                                    <CardTitle className="text-lg">Vegetarisch &amp; Vegan</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Altijd meerdere vegetarische (V) en vegan (VG) gerechten op de kaart.
                                Duidelijk aangegeven op het menu.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sprout className="h-5 w-5" />
                                    <CardTitle className="text-lg">Seizoensgroenten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Onze groenten komen van lokale producenten en staan op de kaart wanneer
                                ze op hun best zijn.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Heart className="h-5 w-5" />
                                    <CardTitle className="text-lg">Dieetwensen welkom</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Glutenvrij (GF), lactosevrij of andere allergieen? Geef het door en wij
                                passen aan.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Vegetarisch eten bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Shared dining is ideaal als je vegetarisch of vegan eet. Je kiest
                                meerdere kleine gerechten om te delen, waardoor je van alles kunt
                                proeven. Op onze kaart staan altijd meerdere plantaardige opties —
                                duidelijk gemarkeerd met V (vegetarisch), VG (vegan) en GF (glutenvrij).
                            </p>
                            <p>
                                Onze keuken werkt met seizoensgebonden groenten van lokale producenten.
                                Dat betekent dat de groenten op de kaart op hun best zijn: op smaak,
                                op kleur en op voedingswaarde. Het menu wisselt regelmatig mee met
                                het seizoen.
                            </p>
                            <p>
                                Of je nu helemaal plantaardig eet of gewoon graag meer groenten op
                                tafel hebt — bij De Tafelaar ben je welkom. We adviseren 2 tot 3
                                gerechten per persoon, en onze bediening helpt je graag bij het samenstellen
                                van een mooie vegetarische selectie.
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
                        <Link href="/over-onze-makers">
                            <Button variant="outline" className="rounded-xl">
                                Over onze makers
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">
                                Contact &amp; Reserveren
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
