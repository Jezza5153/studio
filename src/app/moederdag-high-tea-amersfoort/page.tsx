import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Clock, Utensils, Gift, MapPin, Users } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Moederdag High Tea Amersfoort 2026 | De Tafelaar",
    description:
        "Moederdag vieren in Amersfoort? High tea bij De Tafelaar: shared dining met hartige hapjes, zoete lekkernijen en lokale thee. Zondag 11 mei. Reserveer nu.",
    alternates: {
        canonical: "/moederdag-high-tea-amersfoort",
    },
    openGraph: {
        title: "Moederdag High Tea Amersfoort 2026 | De Tafelaar",
        description:
            "Verras je moeder met een uitgebreide high tea bij De Tafelaar. Shared dining in hartje Amersfoort.",
    },
    keywords: [
        "moederdag amersfoort",
        "moederdag high tea amersfoort",
        "high tea amersfoort",
        "moederdag restaurant amersfoort",
        "moederdag 2026 amersfoort",
        "moederdag uit eten amersfoort",
        "high tea amersfoort centrum",
        "moederdag cadeau amersfoort",
    ],
};

const faqs = [
    {
        question: "Wanneer is de Moederdag high tea bij De Tafelaar?",
        answer: "Zondag 11 mei 2026, van 12:00 tot 17:00. We adviseren om rond 12:00 of 14:00 te reserveren voor een ontspannen middag.",
    },
    {
        question: "Wat kost de Moederdag high tea?",
        answer: "€37,50 per persoon, inclusief thee, koffie van Boot Koffie en een glas bubbels voor mama. Kinderen tot en met 12 jaar betalen een gereduceerd tarief.",
    },
    {
        question: "Wat wordt er geserveerd?",
        answer: "Een shared dining high tea met hartige hapjes (mini-sandwiches, quiche, kaasplanken), zoete lekkernijen (scones, taartjes, petit fours) en warme seizoensgerechten. Alles van lokale producenten.",
    },
    {
        question: "Moet ik reserveren?",
        answer: "Ja, reserveren is noodzakelijk. Moederdag is een populaire dag en het aantal plaatsen is beperkt. Boek via onze website of bel +31 6 341 279 32.",
    },
    {
        question: "Is het geschikt voor kinderen?",
        answer: "Ja, kinderen zijn van harte welkom. Er is een kindertarief en de gerechten zijn ook voor de kleinsten geschikt.",
    },
    {
        question: "Kan ik dieetwensen doorgeven?",
        answer: "Absoluut. Geef allergieën en dieetwensen door bij je reservering. We bieden vegetarische en vegan opties en werken met verse, lokale producten.",
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
        name: "Moederdag High Tea 2026 bij De Tafelaar",
        startDate: "2026-05-11T12:00",
        endDate: "2026-05-11T17:00",
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
            price: "37.50",
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            url: "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort",
        },
        description:
            "Vier Moederdag met een uitgebreide shared dining high tea bij De Tafelaar in Amersfoort. Hartige hapjes, zoete lekkernijen en lokale producten.",
        image: "https://tafelaaramersfoort.nl/pics/homepage.png",
        organizer: {
            "@type": "Organization",
            name: "De Tafelaar",
            url: "https://tafelaaramersfoort.nl",
        },
    });
}

export default function MoederdagHighTeaPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Zondag 11 mei 2026
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Moederdag High Tea in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Verras je moeder met een uitgebreide shared dining high tea bij De Tafelaar.
                        Hartige hapjes, zoete lekkernijen en een glas bubbels — midden in het centrum van Amersfoort.
                    </p>
                </header>

                {/* Praktische info */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Wanneer</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Zondag 11 mei 2026</p>
                                <p>12:00 – 17:00</p>
                                <p>Reserveer rond 12:00 of 14:00</p>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Gift className="h-5 w-5" />
                                    <CardTitle className="text-lg">Prijs</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">€37,50 per persoon</p>
                                <p>Kindertarief t/m 12 jaar</p>
                                <p>Inclusief glas bubbels voor mama</p>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Locatie</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Kamp 8, Amersfoort</p>
                                <p>Hartje centrum</p>
                                <p>5 min van station, 2 min van Flint</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer Moederdag High Tea" />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Beperkt aantal plaatsen — reserveer op tijd!
                        </p>
                    </div>
                </section>

                {/* Wat kun je verwachten */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Wat kun je verwachten?
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Onze Moederdag high tea is geen standaard etagère. Bij De Tafelaar serveren we het
                                als <strong className="text-foreground">shared dining</strong>: een rijk gevulde tafel
                                met hartige en zoete gerechten om samen te delen.
                            </p>
                            <p>
                                Denk aan <strong className="text-foreground">mini-sandwiches, quiche, kaasplanken</strong> van
                                lokale producenten, <strong className="text-foreground">scones met clotted cream, seizoenstaartjes
                                en petit fours</strong>. Daarbij biologische thee en koffie van Boot Koffie uit Baarn.
                            </p>
                            <p>
                                Mama krijgt er een <strong className="text-foreground">glas bubbels</strong> bij —
                                want dat verdient ze. De sfeer is warm, ontspannen en gezellig.
                                Neem de tijd, geniet samen en laat de rest aan ons over.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* Waarom De Tafelaar */}
                <section className="max-w-4xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Waarom Moederdag bij De Tafelaar?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Heart className="h-5 w-5" />
                                    <CardTitle className="text-lg">Persoonlijk & warm</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Geen massale zaal maar een intieme setting. Samen aan tafel, gerechten delen en genieten.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Lokale producten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Alles van producenten uit de regio: Boot Koffie, Korte Garde wijnen, kaas en charcuterie van lokale makers.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                    <CardTitle className="text-lg">Voor het hele gezin</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kinderen welkom met kindertarief. Gerechten die voor iedereen geschikt zijn. Van oma tot kleinkind.
                            </CardContent>
                        </Card>
                    </div>
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
                                <CardContent className="text-sm text-muted-foreground">
                                    {faq.answer}
                                </CardContent>
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
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">
                                Contact & Reserveren
                            </Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="rounded-xl">
                                Groepen & Feesten
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
