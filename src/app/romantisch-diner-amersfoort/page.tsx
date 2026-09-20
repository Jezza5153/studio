import type { Metadata } from "next";
import { getGoogleRating } from "@/lib/google-rating";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Wine, Utensils } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";
export const revalidate = 3600; // Google rating/review count refresh hourly (synced by /api/cron/ingest-reviews)

export const metadata: Metadata = {
    title: "Romantisch Diner Amersfoort | Shared Dining voor Twee | De Tafelaar",
    description:
        "Romantisch uit eten in Amersfoort? De Tafelaar: intiem shared dining op de Kamp. Gerechten delen bij kaarslicht, lokale wijnen. Perfect voor een date.",
    alternates: {
        canonical: "/romantisch-diner-amersfoort",
    },
    openGraph: {
        title: "Romantisch Diner Amersfoort | Shared Dining voor Twee | De Tafelaar",
        description:
            "Romantisch uit eten in Amersfoort? Intiem shared dining op de Kamp. Gerechten delen, lokale wijnen. Perfect voor een date.",
    },
    keywords: [
        "romantisch diner amersfoort",
        "romantisch restaurant amersfoort",
        "date night amersfoort",
        "uit eten voor twee amersfoort",
        "intiem restaurant amersfoort",
        "valentijnsdiner amersfoort",
    ],
};

const faqs = [
    {
        question: "Is De Tafelaar geschikt voor een romantisch diner?",
        answer: "Absoluut. Shared dining is juist heel intiem: samen gerechten kiezen, proeven en ontdekken. De warme sfeer en gerechten maken het perfect voor een date.",
    },
    {
        question: "Kunnen we een tafel voor twee reserveren?",
        answer: "Ja, reserveer online of bel. Vermeld dat het een speciale gelegenheid is en we zorgen voor een fijne tafel.",
    },
    {
        question: "Hebben jullie een wijnarrangement?",
        answer: "Ja, bij het Chef's Choice arrangement (\u20AC45 p.p.) kun je een bijpassend wijnarrangement bestellen voor \u20AC28 p.p. met zorgvuldig geselecteerde biologische wijnen van Korte Garde.",
    },
    {
        question: "Wat is een goede avond voor een date?",
        answer: "Woensdag en donderdag zijn wat rustiger en dus extra intiem. Vrijdag en zaterdag zijn levendig en gezellig. Op alle avonden is de sfeer warm en uitnodigend.",
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

export default async function RomantischDinerAmersfoortPage() {
    const g = await getGoogleRating();
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="mb-12 border-[5px] border-foreground bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
                    <p className="mb-4 inline-block -rotate-[1.2deg] bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background">
                        Shared Dining voor Twee
                    </p>
                    <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                        Romantisch diner in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Samen gerechten kiezen, proeven en ontdekken. De Tafelaar is de
                        perfecte plek voor een date: intieme sfeer, gerechten om te
                        delen en biologische wijnen van Korte Garde.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className=" border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Heart className="h-5 w-5" />
                                    <CardTitle className="text-lg">Intieme sfeer</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Warme verlichting, gezellige tafels en een ontspannen
                                ambiance. Perfect voor een avond met z&apos;n twee&euml;n.
                            </CardContent>
                        </Card>

                        <Card className=" border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wine className="h-5 w-5" />
                                    <CardTitle className="text-lg">Biologische wijnen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Zorgvuldig geselecteerde biologische wijnen van Korte Garde.
                                Wijnarrangement bij het Chef&apos;s Choice voor &euro;28 p.p.
                            </CardContent>
                        </Card>

                        <Card className=" border-2 border-foreground">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Samen delen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Gerechten om samen te proeven en ontdekken. Shared
                                dining maakt een diner juist persoonlijk en verbindend.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Vermeld bij je reservering dat het een speciale gelegenheid is!
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className=" border-2 border-foreground p-6 sm:p-8">
                        <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-4">
                            Romantisch uit eten bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Shared dining is bij uitstek geschikt voor een romantisch diner.
                                Samen kiezen wat je bestelt, gerechten delen en elkaars reacties
                                zien bij een nieuwe smaak, dat verbindt. Geen strak
                                driega&shy;ngen&shy;menu, maar een ontspannen avond waarin je samen
                                op ontdekking gaat.
                            </p>
                            <p>
                                De sfeer bij De Tafelaar is warm en uitnodigend. Aan een tafel voor
                                twee geniet je van gerechten gemaakt met seizoensgebonden,
                                lokale producten. Van verse kazen en charcuterie tot warme gerechten
                                en seizoensspecials. Reken op{" "}
                                <strong className="text-foreground">&euro;25-35 p.p.</strong> of kies
                                het{" "}
                                <strong className="text-foreground">
                                    Chef&apos;s Choice arrangement (&euro;45 p.p.)
                                </strong>{" "}
                                en laat je verrassen.
                            </p>
                            <p>
                                Bij het Chef&apos;s Choice hoort een optioneel{" "}
                                <strong className="text-foreground">
                                    wijnarrangement (&euro;28 p.p.)
                                </strong>{" "}
                                met biologische wijnen van{" "}
                                <strong className="text-foreground">Korte Garde</strong>, de
                                wijnwinkel hier in de straat. Elk glas is zorgvuldig gematcht met de
                                gerechten. Perfect voor een verjaardag, jubileum, Valentijnsdag of
                                gewoon een avond waarop je even tijd maakt voor elkaar.
                            </p>
                            <p>
                                <strong className="text-foreground">Tip:</strong> woensdag en
                                donderdag zijn wat rustiger, ideaal als je extra intimiteit zoekt.
                                Vrijdag en zaterdag zijn levendiger en net zo gezellig. We zijn open
                                op woensdag en donderdag vanaf 17:00 en vrijdag t/m zondag vanaf 11:00.
                            </p>
                            <p>
                                De Tafelaar zit op Kamp 8, hartje centrum Amersfoort, op 5 minuten
                                lopen van Theater de Flint. Vanaf station Amersfoort Centraal is het
                                circa 22 minuten lopen, of korter met bus, fiets of taxi. Parkeergarage
                                Beestenmarkt is op 2 minuten loopafstand. Met een {g.ratingText} op Google en {g.countText} reviews
                                is De Tafelaar een van de best beoordeelde restaurants in Amersfoort
                                voor een romantische avond uit.
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <Card key={i} className=" border-2 border-foreground p-4 sm:p-6">
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
                            <Button variant="outline" className="">
                                Bekijk ons menu
                            </Button>
                        </Link>
                        <Link href="/drank">
                            <Button variant="outline" className="">
                                Drankenkaart
                            </Button>
                        </Link>
                        <Link href="/impressie">
                            <Button variant="outline" className="">
                                Reviews &amp; Impressie
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="">
                                Contact &amp; Reserveren
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
