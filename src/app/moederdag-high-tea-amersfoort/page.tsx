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
        "Moederdag vieren in Amersfoort? High tea bij De Tafelaar: shared dining met hartige hapjes, zoete lekkernijen en lokale thee. Zondag 10 mei. Reserveer nu.",
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
        answer: "Zondag 10 mei 2026. We werken met twee sittings: 12:00 en 14:00. Elke sitting duurt ongeveer 2,5 uur. Kies de tijd die past en reserveer op tijd — het aantal plaatsen is beperkt.",
    },
    {
        question: "Wat kost de Moederdag high tea?",
        answer: "€37,50 per persoon, inclusief thee, koffie van Boot Koffie en een glas bubbels voor mama. Kinderen tot en met 12 jaar betalen een gereduceerd tarief.",
    },
    {
        question: "Wat wordt er geserveerd?",
        answer: "Een bourgondische shared dining high tea om samen te delen. Op tafel: verse croissants, een variatie aan vers brood, beenham, jonge kaas, huisgemaakte eiersalade, diverse jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Daarbij thee, koffie van Boot Koffie en een glas bubbels voor mama.",
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
    // Two sittings as two separate Event nodes wrapped in @graph so Google
    // rich results show two bookable time slots on the same day.
    const sharedLocation = {
        "@type": "Place",
        name: "De Tafelaar",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Kamp 8",
            addressLocality: "Amersfoort",
            postalCode: "3811 AR",
            addressCountry: "NL",
        },
    };
    const sharedOffer = {
        "@type": "Offer",
        price: "37.50",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort",
    };
    const sharedOrganizer = {
        "@type": "Organization",
        name: "De Tafelaar",
        url: "https://tafelaaramersfoort.nl",
    };
    const sharedDescription =
        "Bourgondische shared dining high tea bij De Tafelaar in Amersfoort op Moederdag. Verse croissants, vers brood, beenham, jonge kaas, huisgemaakte eiersalade, jammetjes, zalm met nori mayo, gegrilde ribeye en bladerdeeghapjes met asperges. Inclusief thee, koffie van Boot Koffie en een glas bubbels voor mama.";
    const sharedImage = "https://tafelaaramersfoort.nl/pics/homepage.png";

    return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Event",
                "@id": "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort#sitting-12",
                name: "Moederdag High Tea 2026 — Sitting 12:00",
                startDate: "2026-05-10T12:00",
                endDate: "2026-05-10T14:30",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: sharedLocation,
                offers: sharedOffer,
                description: sharedDescription,
                image: sharedImage,
                organizer: sharedOrganizer,
            },
            {
                "@type": "Event",
                "@id": "https://tafelaaramersfoort.nl/moederdag-high-tea-amersfoort#sitting-14",
                name: "Moederdag High Tea 2026 — Sitting 14:00",
                startDate: "2026-05-10T14:00",
                endDate: "2026-05-10T16:30",
                eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: sharedLocation,
                offers: sharedOffer,
                description: sharedDescription,
                image: sharedImage,
                organizer: sharedOrganizer,
            },
        ],
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
                        Zondag 10 mei 2026
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Moederdag High Tea in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Speciaal voor de allerliefste. Geniet van een bourgondische high tea met een
                        selectie van hartige en zoete lekkernijen, perfect om samen te delen op Moederdag.
                        Twee sittings: <strong className="text-foreground">12:00</strong> en{" "}
                        <strong className="text-foreground">14:00</strong>.
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
                                <p className="font-medium text-foreground">Zondag 10 mei 2026</p>
                                <p>Sitting 1: 12:00</p>
                                <p>Sitting 2: 14:00</p>
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
                                <p>Parkeergarage Kamp 1 min lopen</p>
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
                                Onze Moederdag high tea is een <strong className="text-foreground">bourgondische shared dining</strong> —
                                een rijk gevulde tafel met hartige en zoete lekkernijen om samen te delen.
                                Speciaal voor de allerliefste, perfect om te delen op Moederdag.
                            </p>
                            <p className="font-medium text-foreground">
                                Wat er allemaal op tafel komt:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pl-4 list-disc marker:text-primary">
                                <li>Verse croissants</li>
                                <li>Een variatie aan vers brood</li>
                                <li>Beenham</li>
                                <li>Jonge kaas</li>
                                <li>Huisgemaakte eiersalade</li>
                                <li>Diverse jammetjes</li>
                                <li>Zalm met nori mayo</li>
                                <li>Gegrilde ribeye</li>
                                <li>Bladerdeeghapjes met asperges</li>
                            </ul>
                            <p>
                                Daarbij thee, koffie van <strong className="text-foreground">Boot Koffie</strong> en
                                een <strong className="text-foreground">glas bubbels voor mama</strong>. Twee sittings
                                op zondag 10 mei: <strong className="text-foreground">12:00</strong> en{" "}
                                <strong className="text-foreground">14:00</strong> — kies de tijd die past.
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
