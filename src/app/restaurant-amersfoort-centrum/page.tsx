import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils, Leaf } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Restaurant Amersfoort Centrum | Shared Dining De Tafelaar",
    description:
        "Restaurant in Amersfoort centrum op de Kamp: De Tafelaar biedt shared dining met lokale gerechten. Vlakbij Flint, Koppelpoort en het station. Wo\u2013zo geopend.",
    alternates: {
        canonical: "/restaurant-amersfoort-centrum",
    },
    openGraph: {
        title: "Restaurant Amersfoort Centrum | De Tafelaar",
        description: "Shared dining met lokale gerechten op de Kamp. Hartje Amersfoort.",
    },
    keywords: [
        "restaurant amersfoort centrum",
        "restaurants amersfoort",
        "restaurant amersfoort",
        "goed restaurant amersfoort",
        "beste restaurants amersfoort",
        "restaurant kamp amersfoort",
        "eten in amersfoort centrum",
        "waar eten in amersfoort",
        "beste restaurant amersfoort",
    ],
};

const faqs = [
    {
        question: "Welke restaurants in Amersfoort centrum zijn een aanrader?",
        answer: "De Tafelaar op de Kamp 8 is een populair shared dining restaurant in Amersfoort centrum. Gasten waarderen de lokale gerechten, gezellige sfeer en de ligging vlakbij Theater de Flint. Met een 4.8 op Google is het een van de best beoordeelde restaurants in Amersfoort.",
    },
    {
        question: "Waar zit De Tafelaar precies?",
        answer: "De Tafelaar zit op Kamp 8, hartje centrum Amersfoort. Op 5 minuten lopen van station Amersfoort en 2 minuten van Theater de Flint. Parkeergarage Koestraat is op 1 minuut loopafstand.",
    },
    {
        question: "Wat voor restaurant is De Tafelaar?",
        answer: "De Tafelaar is een shared dining restaurant. Je bestelt kleine gerechten om te delen aan tafel, gemaakt met lokale en seizoensgebonden producten van meer dan 14 regionale producenten.",
    },
    {
        question: "Wat kost eten bij De Tafelaar?",
        answer: "Gerechten variëren van EUR 3,50 tot EUR 15. Reken op EUR 25-35 per persoon voor een compleet diner. Er is ook een Chef's Choice arrangement voor EUR 45 p.p. met optioneel wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Is De Tafelaar een van de beste restaurants in Amersfoort?",
        answer: "Met een 4.8 beoordeling op Google en 90+ reviews is De Tafelaar een van de best beoordeelde restaurants in Amersfoort centrum. Gasten waarderen het shared dining concept, de lokale seizoensgerechten en de persoonlijke bediening.",
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

export default function RestaurantAmersfoortCentrumPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                    Shared Dining op de Kamp
                </p>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Restaurant in Amersfoort Centrum
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    De Tafelaar op Kamp 8: shared dining met lokale gerechten in het hart van Amersfoort.
                    Op loopafstand van station, Flint en de Koppelpoort. Woensdag t/m zondag geopend.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Kamp 8, Hartje Centrum</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Midden in het centrum van Amersfoort. 5 min van het station, 2 min van Flint.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Utensils className="h-5 w-5" />
                                <CardTitle className="text-lg">Shared Dining</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kleine gerechten om te delen. Bestel samen, proef van alles, geniet met z'n allen.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Leaf className="h-5 w-5" />
                                <CardTitle className="text-lg">Lokaal & Seizoensgebonden</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Producten van 14+ lokale makers zoals Farmfields, Boot Koffie en Rock City Brewing.
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="rounded-2xl border p-6 sm:p-8">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                        Waarom De Tafelaar in het centrum?
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            De Kamp is een van de gezelligste plekken van Amersfoort. Ons restaurant
                            ligt op Kamp 8, midden in het centrum — op loopafstand van alles wat de
                            binnenstad te bieden heeft.
                        </p>
                        <p>
                            Kom je met de trein? Station Amersfoort is 5 minuten lopen. Met de auto?
                            Parkeergarage Kamp ligt op 1 minuut. En na het eten wandel je zo naar de
                            Koppelpoort of langs de grachten.
                        </p>
                        <p>
                            De Tafelaar is ook de ideale plek voor een hapje voor of na een voorstelling
                            in Theater de Flint — op slechts 400 meter, 2 minuten lopen. We zijn
                            geopend van woensdag t/m donderdag van 17:00 tot 23:00, vrijdag
                            van 15:00 tot 00:00, zaterdag van 11:00 tot 00:00 en zondag van 11:00 tot 15:00.
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
                    <Link href="/beste-restaurant-amersfoort">
                        <Button variant="outline" className="rounded-xl">
                            Beste restaurant
                        </Button>
                    </Link>
                    <Link href="/eten-voor-theater-de-flint">
                        <Button variant="outline" className="rounded-xl">
                            Eten vlakbij Flint
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="rounded-xl">
                            Contact & Route
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}
