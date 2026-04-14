import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper, UtensilsCrossed, Clock } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Feestlocatie Amersfoort Centrum | Tot 100 Personen | De Tafelaar",
    description:
        "Feestlocatie in Amersfoort centrum: De Tafelaar op de Kamp. Feest, verjaardag of borrel tot 100 personen. Shared dining, eigen bar, flexibele opstelling.",
    alternates: {
        canonical: "/feestlocatie-amersfoort",
    },
    openGraph: {
        title: "Feestlocatie Amersfoort Centrum | Tot 100 Personen | De Tafelaar",
        description:
            "Feestlocatie in Amersfoort centrum: feest, verjaardag of borrel tot 100 personen bij De Tafelaar op de Kamp.",
    },
    keywords: [
        "feestlocatie amersfoort",
        "feestlocatie amersfoort centrum",
        "feest vieren amersfoort",
        "verjaardag restaurant amersfoort",
        "locatie huren amersfoort",
        "feestzaal amersfoort centrum",
    ],
};

const faqs = [
    {
        question: "Hoeveel personen passen er in De Tafelaar?",
        answer: "Tot ~100 personen staand, 50-60 zittend. Flexibele opstelling afhankelijk van je wensen.",
    },
    {
        question: "Wat kost het om De Tafelaar te huren?",
        answer: "Afhankelijk van grootte, tijdstip en invulling. Neem contact op voor een offerte op maat. Chef's Choice arrangement vanaf EUR 45 p.p.",
    },
    {
        question: "Kan ik De Tafelaar ook overdag huren?",
        answer: "Ja, overdag en 's avonds. Zakelijk of prive — in overleg is veel mogelijk, ook op maandag en dinsdag.",
    },
    {
        question: "Wat voor feesten organiseren jullie?",
        answer: "Verjaardagen, jubilea, afstuderen, familiefeesten, borrels en meer. Wij denken mee over opzet, eten en drinken.",
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

export default function FeestlocatieAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Feestlocatie in Amersfoort Centrum
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Feest vieren bij De Tafelaar
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een feestlocatie in Amersfoort? De Tafelaar op de Kamp is de
                        ideale plek voor je verjaardag, borrel of familiefeest. Shared dining tot
                        100 personen, een eigen bar en een flexibele opstelling.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <PartyPopper className="h-5 w-5" />
                                    <CardTitle className="text-lg">Feesten tot 100 pers.</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Tot ~100 gasten staand of 50-60 zittend. Wij passen de opstelling aan
                                op jouw feest.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <UtensilsCrossed className="h-5 w-5" />
                                    <CardTitle className="text-lg">Chef&apos;s Choice arrangement</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Vanaf 7 personen: een rijkgevulde tafel met borrelplanken, warme en
                                koude gerechten en dessert. Vanaf EUR 45 p.p.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Overdag &amp; avond</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Ook op maandag en dinsdag in overleg. Zakelijk of prive — wij maken
                                het mogelijk.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer voor je feest" />
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Feest vieren bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                De Tafelaar is een unieke feestlocatie midden in het centrum van
                                Amersfoort. Op de Kamp, een van de gezelligste plekken van de stad,
                                vind je ons restaurant met eigen bar en een warm, ongedwongen karakter.
                            </p>
                            <p>
                                Ons shared dining concept werkt uitstekend voor feesten: gasten delen
                                gerechten aan tafel, waardoor er vanzelf gesprekken ontstaan en de sfeer
                                loskomt. Of het nu gaat om een verjaardag, jubileum, afstuderen of gewoon
                                een gezellige borrel — wij denken mee over de opzet, het eten en de dranken.
                            </p>
                            <p>
                                De ruimte is flexibel in te delen. Voor een staande borrel ontvangen we
                                tot circa 100 gasten, voor een zittend diner 50 tot 60 personen. We bieden
                                persoonlijke begeleiding en stemmen alles af op jouw wensen.
                            </p>
                            <p>
                                Kamp 8 ligt centraal in Amersfoort: op 5 minuten lopen van station
                                Amersfoort en 2 minuten van Theater de Flint. Parkeergarage Kamp is op
                                1 minuut loopafstand — ideaal voor gasten die met de auto komen. Met een
                                4.8 op Google en 90+ reviews weet je dat je feest in goede handen is.
                                Regulier geopend woensdag t/m zondag (za vanaf 11:00, zo 11:00–15:00);
                                op andere dagen in overleg.
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
                                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/bedrijfsdiner-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Bedrijfsdiner
                            </Button>
                        </Link>
                        <Link href="/prive-diner-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Privé diner
                            </Button>
                        </Link>
                        <Link href="/verhuur-en-groepen">
                            <Button variant="outline" className="rounded-xl">
                                Verhuur &amp; Groepen
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">
                                Neem contact op
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
