import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Leaf, MapPin } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Beste Restaurant Amersfoort | De Tafelaar — 4.8 op Google",
    description:
        "Op zoek naar het beste restaurant in Amersfoort? De Tafelaar: 4.8 op Google, 90+ reviews. Shared dining met lokale gerechten op de Kamp. Reserveer nu.",
    alternates: {
        canonical: "/beste-restaurant-amersfoort",
    },
    openGraph: {
        title: "Beste Restaurant Amersfoort | De Tafelaar — 4.8 op Google",
        description: "4.8 op Google, 90+ reviews. Shared dining met lokale gerechten op de Kamp in Amersfoort.",
    },
    keywords: [
        "beste restaurant amersfoort",
        "best beoordeelde restaurant amersfoort",
        "top restaurant amersfoort",
        "goed restaurant amersfoort",
        "restaurant amersfoort hoge beoordeling",
        "beste restaurants amersfoort centrum",
        "restaurant amersfoort reviews",
    ],
};

const faqs = [
    {
        question: "Wat is het beste restaurant in Amersfoort?",
        answer: "De Tafelaar op de Kamp 8 is een van de best beoordeelde restaurants in Amersfoort met een 4.8 op Google en 90+ reviews. Gasten waarderen het unieke shared dining concept, de lokale seizoensgerechten en de persoonlijke sfeer. We zijn geopend van woensdag t/m zondag.",
    },
    {
        question: "Waarom wordt De Tafelaar zo hoog beoordeeld?",
        answer: "Gasten geven De Tafelaar hoge beoordelingen vanwege drie dingen: het shared dining concept waarbij je kleine gerechten deelt, de verse ingrediënten van 14+ lokale producenten, en de warme, persoonlijke bediening. 90% van de reviews is 5 sterren.",
    },
    {
        question: "Hoeveel kost eten bij het best beoordeelde restaurant in Amersfoort?",
        answer: "Bij De Tafelaar reken je op EUR 25-35 per persoon voor een compleet shared dining diner. Gerechten variëren van EUR 3,50 tot EUR 15. Er is ook een Chef's Choice arrangement voor EUR 45 p.p., met optioneel wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Moet ik reserveren bij De Tafelaar?",
        answer: "Reserveren is aan te raden, vooral op vrijdag en zaterdag. Als een van de populairste restaurants in Amersfoort kan het druk zijn. Reserveer eenvoudig online via onze website of bel +31 6 341 279 32.",
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

export default function BesteRestaurantAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-primary mb-3">
                    <Star className="h-5 w-5" />
                    <span className="text-xs tracking-widest uppercase">4.8 op Google — 90+ reviews</span>
                </div>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Beste Restaurant in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    De Tafelaar is een van de best beoordeelde restaurants in Amersfoort.
                    Shared dining met lokale seizoensgerechten op de Kamp, hartje centrum.
                    90% van onze Google reviews is 5 sterren.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Star className="h-5 w-5" />
                                <CardTitle className="text-lg">4.8 / 5</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Google-beoordeling op basis van 90+ authentieke gastreviews.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Users className="h-5 w-5" />
                                <CardTitle className="text-lg">Shared Dining</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kleine gerechten om samen te delen. Proef van alles, geniet met je tafel.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Leaf className="h-5 w-5" />
                                <CardTitle className="text-lg">14+ Lokale Makers</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Verse ingrediënten van producenten uit de regio. Van Farmfields tot Boot Koffie.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Kamp 8</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Hartje centrum Amersfoort. 2 min van Flint, 5 min van het station.
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="rounded-2xl border p-6 sm:p-8">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                        Waarom De Tafelaar een van de beste restaurants in Amersfoort is
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            Met een 4.8 op Google en meer dan 90 reviews — waarvan 90% vijf sterren —
                            is De Tafelaar een van de hoogst beoordeelde restaurants in Amersfoort.
                            Maar wat maakt ons bijzonder?
                        </p>
                        <p>
                            <strong className="text-foreground">Uniek concept:</strong> We serveren shared
                            dining. In plaats van een vast drie- of viergangenmenu bestel je kleine gerechten
                            die je deelt aan tafel. Zo proef je van alles en is elke avond een ontdekking.
                        </p>
                        <p>
                            <strong className="text-foreground">Lokale kwaliteit:</strong> Onze keuken werkt
                            uitsluitend met seizoensgebonden producten van meer dan 14 lokale producenten
                            uit de regio Amersfoort. Van kaas en charcuterie tot groenten van Farmfields
                            en bier van Rock City Brewing.
                        </p>
                        <p>
                            <strong className="text-foreground">Persoonlijke sfeer:</strong> Op de Kamp 8
                            in het centrum, met een warm interieur en persoonlijke bediening. Of je nu
                            komt voor een date, verjaardagsdiner of borrel met vrienden — je voelt je
                            meteen thuis.
                        </p>
                        <p>
                            Gerechten variëren van EUR 3,50 tot EUR 15. Reken op EUR 25-35 per persoon
                            voor een compleet diner. Woensdag t/m zondag geopend.
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

            {/* Links */}
            <section className="max-w-2xl mx-auto text-center">
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-xl">
                            Bekijk ons menu
                        </Button>
                    </Link>
                    <Link href="/impressie">
                        <Button variant="outline" className="rounded-xl">
                            Reviews & Impressie
                        </Button>
                    </Link>
                    <Link href="/restaurant-amersfoort-centrum">
                        <Button variant="outline" className="rounded-xl">
                            Restaurant in centrum
                        </Button>
                    </Link>
                    <Link href="/uit-eten-amersfoort">
                        <Button variant="outline" className="rounded-xl">
                            Uit eten in Amersfoort
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="rounded-xl">
                            Contact & Reserveren
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}
