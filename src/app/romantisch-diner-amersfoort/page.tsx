import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Wine, Utensils, MapPin, Sparkles, Clock } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Romantisch Diner in Amersfoort | De Tafelaar op de Kamp",
    description:
        "Romantisch uit eten in Amersfoort? De Tafelaar: kleine gerechten delen bij kaarslicht, natuurwijnen en een warme sfeer. Ideaal voor een date in het centrum.",
    alternates: {
        canonical: "/romantisch-diner-amersfoort",
    },
    openGraph: {
        title: "Romantisch Diner Amersfoort | De Tafelaar",
        description: "Samen gerechten delen bij kaarslicht. Natuurwijnen, lokale producten en een warme sfeer op de Kamp.",
    },
    keywords: [
        "romantisch diner amersfoort",
        "romantisch restaurant amersfoort",
        "date restaurant amersfoort",
        "romantisch uit eten amersfoort",
        "intiem restaurant amersfoort",
        "diner voor twee amersfoort",
        "kaarslicht diner amersfoort",
    ],
};

const faqs = [
    {
        question: "Is De Tafelaar geschikt voor een romantisch diner?",
        answer: "Absoluut. De warme sfeer, het intieme interieur en het concept van samen gerechten delen maken De Tafelaar ideaal voor een date of romantische avond. Vooral doordeweeks (wo-do) is de sfeer rustig en intiem.",
    },
    {
        question: "Kunnen jullie iets speciaals regelen voor een verjaardag of jubileum?",
        answer: "Neem even contact met ons op via telefoon of e-mail. We denken graag mee over een speciaal arrangement, wijnarrangement of verrassingsdessert.",
    },
    {
        question: "Welke wijnen passen bij een romantisch diner?",
        answer: "Onze wijnkaart is samengesteld met Korte Garde, de biologische wijnwinkel op de Kamp. Vraag ons team om een wijnarrangement dat past bij jullie gerechten — of kies het bijpassend wijnarrangement bij de Chef's Choice (EUR 28 p.p.).",
    },
    {
        question: "Wat is de beste avond voor een rustig diner?",
        answer: "Woensdag en donderdag zijn de rustigste avonden. Ideaal als je een intieme sfeer zoekt. Op vrijdag en zaterdag is het gezellig drukker.",
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

export default function RomantischDinerAmersfoortPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Samen genieten &middot; Kamp 8
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Romantisch diner in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Samen gerechten delen, natuurwijnen proeven en genieten van een warme sfeer.
                        De Tafelaar op de Kamp is de plek voor een romantische avond in Amersfoort.
                    </p>
                </header>

                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Heart className="h-5 w-5" />
                                    <CardTitle className="text-lg">Intieme Sfeer</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Warm interieur, gedimde verlichting en een ontspannen vibe. Geen haast, wel aandacht.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Samen Delen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kleine gerechten om samen te proeven. Van kazen en carpaccio tot warme classics en desserts.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wine className="h-5 w-5" />
                                    <CardTitle className="text-lg">Natuurwijnen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Biologische wijnen van Korte Garde. Vraag om het wijnarrangement bij de Chef&apos;s Choice.
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
                                Uitgebreid genieten zonder te kiezen. De chef stelt een selectie samen voor jullie avond.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Rustige Avonden</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Woensdag en donderdag zijn het meest intiem. Reserveer voor de beste plek.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Centrum Amersfoort</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kamp 8. Na het diner een wandeling langs de Koppelpoort of over de Hof.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
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
                        <Link href="/drank">
                            <Button variant="outline" className="rounded-xl">Drankenkaart</Button>
                        </Link>
                        <Link href="/bourgondisch-eten-amersfoort">
                            <Button variant="outline" className="rounded-xl">Bourgondisch Eten</Button>
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
