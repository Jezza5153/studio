import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, MapPin, Utensils, Truck, Award, Sprout } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Duurzaam Restaurant in Amersfoort | De Tafelaar",
    description:
        "Duurzaam uit eten in Amersfoort? De Tafelaar werkt met lokale producenten, seizoensgebonden ingredienten en biologisch vlees. Shared dining op de Kamp.",
    alternates: {
        canonical: "/duurzaam-restaurant-amersfoort",
    },
    openGraph: {
        title: "Duurzaam Restaurant Amersfoort | De Tafelaar",
        description: "Lokale producenten, seizoensgebonden menu en biologisch vlees. Duurzaam shared dining op de Kamp.",
    },
    keywords: [
        "duurzaam restaurant amersfoort",
        "duurzaam eten amersfoort",
        "lokaal eten amersfoort",
        "biologisch restaurant amersfoort",
        "seizoensgebonden restaurant amersfoort",
        "farm to table amersfoort",
        "vegetarisch restaurant amersfoort",
        "vegan restaurant amersfoort",
    ],
};

const makers = [
    { name: "Farmfields", what: "Biologisch rundvlees, Beter Leven 4-sterren", link: "/over-onze-makers" },
    { name: "Boot Koffie", what: "Biologische, ambachtelijke koffie uit Baarn", link: "/over-onze-makers" },
    { name: "Rock City Brewing", what: "Amersfoorts craft bier", link: "/over-onze-makers" },
    { name: "De Drie Ringen", what: "Historische stadsbrouwerij Amersfoort", link: "/over-onze-makers" },
    { name: "Korte Garde", what: "Biologische en natuurwijnen, Kamp Amersfoort", link: "/over-onze-makers" },
    { name: "Brouwerij 't Mirakel", what: "Kleine batches, Amersfoortse speciaalbieren", link: "/over-onze-makers" },
];

const faqs = [
    {
        question: "Hoe duurzaam is De Tafelaar?",
        answer: "We werken met lokale producenten uit de regio Amersfoort, gebruiken seizoensgebonden ingredienten en serveren biologisch vlees met Beter Leven 4-sterren keurmerk. Onze bieren komen uit Amersfoort, onze wijnen van de biologische wijnwinkel om de hoek.",
    },
    {
        question: "Welke lokale producenten werken met De Tafelaar?",
        answer: "Farmfields (biologisch vlees), Boot Koffie (Baarn), Rock City Brewing, Stadsbrouwerij De Drie Ringen, Brouwerij 't Mirakel, Eem Bier en Korte Garde (biologische wijnen). Allemaal uit Amersfoort of directe omgeving.",
    },
    {
        question: "Zijn er vegetarische en vegan opties?",
        answer: "Ja, ons menu heeft meerdere vegetarische (V) en vegan (VG) gerechten: carpaccio van bieten, bruschetta, Japanse curry, Bao Bun Inari en een vegan Snicker als dessert. We kunnen ook gerechten aanpassen aan dieetwensen.",
    },
    {
        question: "Wisselt het menu met de seizoenen?",
        answer: "Ja, onze kaart wisselt regelmatig mee met het seizoen. We gebruiken wat op zijn best is en werken met producten die dichtbij zijn geoogst of geproduceerd.",
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

export default function DuurzaamRestaurantAmersfoortPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Lokaal &middot; Seizoensgebonden &middot; Biologisch
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Duurzaam restaurant in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Bij De Tafelaar kiezen we bewust voor lokale producenten, seizoensgebonden ingredienten
                        en eerlijke producten. Duurzaam eten hoeft niet ingewikkeld te zijn &mdash; het begint met goede keuzes.
                    </p>
                </header>

                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Truck className="h-5 w-5" />
                                    <CardTitle className="text-lg">Lokale Producenten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Amersfoortse brouwers, biologische koffie uit Baarn, natuurwijnen van de Kamp. Korte ketens, verse producten.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Sprout className="h-5 w-5" />
                                    <CardTitle className="text-lg">Seizoensgebonden</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Ons menu wisselt mee met het seizoen. Wat op zijn best is, komt op de kaart.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Award className="h-5 w-5" />
                                    <CardTitle className="text-lg">Biologisch Vlees</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Rundvlees van Farmfields met Beter Leven 4-sterren. Transparantie en dierenwelzijn voorop.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Leaf className="h-5 w-5" />
                                    <CardTitle className="text-lg">Vega &amp; Vegan</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Meerdere vegetarische en vegan gerechten op de kaart. Duurzaam eten voor iedereen.
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
                                Kleine gerechten om te delen. Minder voedselverspilling, meer variatie op tafel.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Op de Kamp</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kamp 8, Amersfoort centrum. Vlakbij Flint en op loopafstand van het station.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                    </div>
                </section>

                {/* Onze Makers */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Onze lokale makers
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Bij De Tafelaar werken we het liefst met mensen en producten van dichtbij.
                            Dit zijn de makers achter wat je bij ons proeft en drinkt:
                        </p>
                        <dl className="space-y-4">
                            {makers.map((maker) => (
                                <div key={maker.name} className="flex items-start gap-3">
                                    <Leaf className="h-4 w-4 text-primary mt-1 shrink-0" />
                                    <div>
                                        <dt className="font-semibold">{maker.name}</dt>
                                        <dd className="text-sm text-muted-foreground">{maker.what}</dd>
                                    </div>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-6">
                            <Link href="/over-onze-makers">
                                <Button variant="outline" className="rounded-xl">
                                    Leer onze makers kennen
                                </Button>
                            </Link>
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

                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">Bekijk ons menu</Button>
                        </Link>
                        <Link href="/over-onze-makers">
                            <Button variant="outline" className="rounded-xl">Onze Makers</Button>
                        </Link>
                        <Link href="/restaurant-amersfoort-centrum">
                            <Button variant="outline" className="rounded-xl">Over het Restaurant</Button>
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
