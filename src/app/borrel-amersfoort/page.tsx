import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beer, Clock, MapPin, Music, Utensils, Wine } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Borrel in Amersfoort | Borrelen bij De Tafelaar op de Kamp",
    description:
        "Borrelen in Amersfoort centrum? De Tafelaar: Amersfoortse bieren, natuurwijnen, borrelplanken en kleine gerechten. Vrijdag en zaterdag open vanaf 15:00.",
    alternates: {
        canonical: "/borrel-amersfoort",
    },
    openGraph: {
        title: "Borrel Amersfoort | De Tafelaar",
        description: "Borrelen op de Kamp: craft bier, natuurwijnen en borrelgerechten. Vanaf 15:00 op vrijdag en zaterdag.",
    },
    keywords: [
        "borrel amersfoort",
        "borrelen amersfoort",
        "borrel amersfoort centrum",
        "vrijdagmiddagborrel amersfoort",
        "craft bier amersfoort",
        "borrelplank amersfoort",
        "wijn bar amersfoort",
        "gezellig borrelen amersfoort",
    ],
};

const faqs = [
    {
        question: "Wanneer kan ik borrelen bij De Tafelaar?",
        answer: "Op vrijdag en zaterdag zijn we open vanaf 15:00, perfect voor een middagborrel. Doordeweeks (wo-do) en zondag zijn we open vanaf 17:00.",
    },
    {
        question: "Moet ik reserveren voor de borrel?",
        answer: "Voor een borrel aan de bar of een klein tafeltje is reserveren niet nodig. Wil je met een groep komen of ook uitgebreid eten? Dan raden we aan om te reserveren.",
    },
    {
        question: "Welke bieren hebben jullie?",
        answer: "We schenken Amersfoortse craft bieren van Rock City Brewing, Stadsbrouwerij De Drie Ringen, Brouwerij 't Mirakel en Eem Bier. Daarnaast wisselende speciaalbieren op tap en fles.",
    },
    {
        question: "Hebben jullie ook wijn?",
        answer: "Ja, onze wijnkaart is samengesteld met Korte Garde, de biologische en natuurwijnwinkel op de Kamp. Puur, verantwoord en passend bij onze gerechten.",
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

export default function BorrelAmersfoortPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Vrijdag &amp; zaterdag vanaf 15:00
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Borrelen in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Amersfoorts craft bier, natuurwijnen en borrelgerechten van lokale makers.
                        De Tafelaar op de Kamp: de gezelligste borrel in het centrum.
                    </p>
                </header>

                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Beer className="h-5 w-5" />
                                    <CardTitle className="text-lg">Amersfoorts Bier</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Rock City, De Drie Ringen, &apos;t Mirakel en Eem Bier. Craft bier uit de stad, op tap en fles.
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
                                Biologische en natuurwijnen van Korte Garde, de wijnwinkel om de hoek op de Kamp.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Borrelgerechten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Borrelplanken met lokale kazen en charcuterie, peppadews, olijven, gerookte noten en meer.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Vanaf 15:00</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Op vrijdag en zaterdag open vanaf 15:00. Doordeweeks en zondag vanaf 17:00.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">De Kamp</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Kamp 8, hartje Amersfoort. Op loopafstand van Flint, Koppelpoort en het station.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Music className="h-5 w-5" />
                                    <CardTitle className="text-lg">Na Flint</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Na de voorstelling nog een borrel? We zijn open tot middernacht op vrijdag en zaterdag.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Voor alleen borrel is reserveren niet nodig
                        </p>
                    </div>
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
                        <Link href="/drank">
                            <Button variant="outline" className="rounded-xl">Drankenkaart</Button>
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
