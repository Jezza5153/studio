import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Leaf, MapPin, Sparkles, Utensils, Users } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Uit Eten in Amersfoort | Shared Dining bij De Tafelaar",
    description:
        "Uit eten in Amersfoort? De Tafelaar: shared dining met kleine gerechten van lokale makers. Gezellig, duurzaam en in het centrum. Reserveer direct.",
    alternates: {
        canonical: "/uit-eten-amersfoort",
    },
    openGraph: {
        title: "Uit Eten Amersfoort | De Tafelaar",
        description: "Lekker uit eten in Amersfoort centrum. Shared dining met lokale, seizoensgebonden gerechten.",
    },
    keywords: [
        "uit eten amersfoort",
        "lekker eten amersfoort",
        "uit eten amersfoort centrum",
        "eten amersfoort",
        "gezellig uit eten amersfoort",
        "lekker uit eten in amersfoort",
        "restaurant tip amersfoort",
        "beste plek om te eten amersfoort",
    ],
};

const faqs = [
    {
        question: "Wat maakt De Tafelaar bijzonder voor uit eten in Amersfoort?",
        answer: "De Tafelaar is een shared-dining restaurant: je bestelt kleine gerechten om samen te delen. Alles is gemaakt met lokale, seizoensgebonden producten van Amersfoortse makers. Het is een ontspannen, gezellige manier van uit eten.",
    },
    {
        question: "Hoeveel kost uit eten bij De Tafelaar?",
        answer: "De gerechten varieren van EUR 3,50 tot EUR 15. Reken op gemiddeld EUR 25-35 per persoon voor eten, of kies het Chef's Choice arrangement voor EUR 45 p.p. inclusief een selectie van de chef.",
    },
    {
        question: "Is De Tafelaar geschikt voor een date of romantisch diner?",
        answer: "Zeker. De warme sfeer en het samen delen van gerechten maken het perfect voor een date. Op doordeweekse avonden is het rustig en intiem.",
    },
    {
        question: "Kan ik met kinderen uit eten bij De Tafelaar?",
        answer: "Kinderen zijn welkom. Het shared-dining concept is juist leuk voor kinderen: ze kunnen van alles proeven. Vraag het team naar kindvriendelijke suggesties.",
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

export default function UitEtenAmersfoortPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Shared Dining &middot; Kamp 8 &middot; Amersfoort
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Uit eten in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een fijne plek om uit eten te gaan in Amersfoort? Bij De Tafelaar deel
                        je kleine gerechten aan tafel, gemaakt met ingredienten van lokale producenten.
                        Ontspannen, gezellig en in het centrum.
                    </p>
                </header>

                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Kleine Gerechten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Geen vaste menu&apos;s maar een tafel vol gerechten om samen te ontdekken en te delen.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Leaf className="h-5 w-5" />
                                    <CardTitle className="text-lg">Lokale Producten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Biologisch vlees, ambachtelijk bier, natuurwijnen en seizoensgroenten uit de regio.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Heart className="h-5 w-5" />
                                    <CardTitle className="text-lg">Gezellige Sfeer</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Warm interieur, ontspannen vibe. Kom als stel, groep of alleen &mdash; schuif aan.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sparkles className="h-5 w-5" />
                                    <CardTitle className="text-lg">Chef&apos;s Choice</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Laat de chef kiezen: een uitgebalanceerd arrangement van de beste gerechten van het moment.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                    <CardTitle className="text-lg">Voor Iedereen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Vegetarisch, vegan en glutenvrij? Meerdere opties op de kaart. We denken graag mee.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Centrum & Flint</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kamp 8, midden in Amersfoort. Op 2 minuten van Flint, vlakbij Koppelpoort.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                    </div>
                </section>

                <section className="max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <dl className="space-y-6">
                            {faqs.map((faq, i) => (
                                <div key={i}>
                                    <dt className="font-semibold text-base">{faq.question}</dt>
                                    <dd className="mt-1 text-sm text-muted-foreground">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </Card>
                </section>

                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">Bekijk ons menu</Button>
                        </Link>
                        <Link href="/borrel-amersfoort">
                            <Button variant="outline" className="rounded-xl">Borrelen</Button>
                        </Link>
                        <Link href="/bourgondisch-eten-amersfoort">
                            <Button variant="outline" className="rounded-xl">Bourgondisch Eten</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">Contact & Reserveren</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
