import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Utensils, Users, Leaf, Clock, Wine } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Restaurant Amersfoort Centrum | De Tafelaar op de Kamp",
    description:
        "Op zoek naar een restaurant in Amersfoort centrum? De Tafelaar op de Kamp: shared dining, borrel en diner met lokale gerechten. Vlakbij Flint, wo-zo geopend.",
    alternates: {
        canonical: "/restaurant-amersfoort-centrum",
    },
    openGraph: {
        title: "Restaurant Amersfoort Centrum | De Tafelaar",
        description: "Shared dining, borrel en diner op de Kamp in Amersfoort centrum. Lokale gerechten, vlakbij Flint.",
    },
    keywords: [
        "restaurant amersfoort centrum",
        "restaurant amersfoort",
        "uit eten amersfoort centrum",
        "restaurant de kamp amersfoort",
        "eten amersfoort centrum",
        "beste restaurant amersfoort centrum",
        "restaurant binnenstad amersfoort",
    ],
};

const faqs = [
    {
        question: "Waar zit De Tafelaar precies in Amersfoort centrum?",
        answer: "De Tafelaar zit op de Kamp 8, midden in het centrum van Amersfoort. Op 2 minuten lopen van Theater de Flint en vlakbij de Koppelpoort.",
    },
    {
        question: "Wat voor restaurant is De Tafelaar?",
        answer: "De Tafelaar is een shared-dining restaurant. Je bestelt kleine gerechten om te delen aan tafel: kazen, charcuterie, warme gerechten en desserts. Alles gemaakt met lokale, seizoensgebonden producten.",
    },
    {
        question: "Wanneer is De Tafelaar open?",
        answer: "Woensdag en donderdag 17:00-23:00, vrijdag en zaterdag 15:00-00:00, zondag 17:00-23:00. Maandag en dinsdag gesloten.",
    },
    {
        question: "Kan ik bij De Tafelaar ook borrelen?",
        answer: "Zeker, op vrijdag en zaterdag zijn we al vanaf 15:00 open voor borrel met Amersfoortse bieren, natuurwijnen en borrelgerechten. Reserveren is niet nodig voor de borrel.",
    },
    {
        question: "Is De Tafelaar geschikt voor groepen?",
        answer: "Ja, we ontvangen groepen tot circa 100 personen. Voor groepen vanaf 7 personen bieden we een Chef's Choice arrangement aan (EUR 45 p.p.). Neem contact op voor de mogelijkheden.",
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Kamp 8 &middot; Amersfoort Centrum
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Restaurant in Amersfoort centrum
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        De Tafelaar is het restaurant op de Kamp waar je terecht kunt voor shared dining, een uitgebreide borrel of een gezellig diner.
                        Lokale gerechten, Amersfoortse bieren en natuurwijnen &mdash; midden in het centrum, vlakbij Flint.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Shared Dining</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kleine gerechten om te delen. Proef van kazen, charcuterie, warme classics en desserts.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wine className="h-5 w-5" />
                                    <CardTitle className="text-lg">Borrel & Diner</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Vrijdag en zaterdag open vanaf 15:00 voor borrel. Doordeweeks vanaf 17:00 voor diner.
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
                                Ingredienten van lokale makers: Rock City Brewing, Boot Koffie, Korte Garde wijnen en meer.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Vlakbij Flint</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Op 400 meter van Theater de Flint. Ideaal voor een diner voor of na de voorstelling.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                    <CardTitle className="text-lg">Groepen & Feesten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Exclusieve verhuur tot 100 personen. Chef&apos;s Choice arrangement voor groepen vanaf 7.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Wo &ndash; Zo Open</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Woensdag t/m zondag geopend. Vrijdag en zaterdag al vanaf 15:00 voor borrel.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                    </div>
                </section>

                {/* Content block */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Waarom De Tafelaar?
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Amersfoort heeft geen gebrek aan goede restaurants, maar De Tafelaar doet het net anders.
                                Geen vaste driegangenmenu&apos;s maar een tafel vol kleine gerechten om samen te ontdekken.
                                Van huisgemaakte charcuterie en lokale kazen tot warme classics als ossobuco en bao buns.
                            </p>
                            <p>
                                Alles wat we serveren komt zo dicht mogelijk uit de buurt: biologisch rundvlees van Farmfields,
                                ambachtelijke koffie van Boot uit Baarn, craft bier van Rock City en De Drie Ringen,
                                en natuurwijnen geselecteerd met Korte Garde op de Kamp.
                            </p>
                            <p>
                                Of je nu langskomt voor een snelle borrel op vrijdagmiddag, een uitgebreid diner
                                op zaterdag, of een gezellige avond na Flint &mdash; bij De Tafelaar ben je welkom.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
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

                {/* Links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">Bekijk ons menu</Button>
                        </Link>
                        <Link href="/eten-voor-theater-de-flint">
                            <Button variant="outline" className="rounded-xl">Eten vlakbij Flint</Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="rounded-xl">Groepen & Verhuur</Button>
                        </Link>
                        <Link href="/over-onze-makers">
                            <Button variant="outline" className="rounded-xl">Onze Makers</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">Contact</Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
