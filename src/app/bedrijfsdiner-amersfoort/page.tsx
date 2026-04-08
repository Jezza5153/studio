import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Utensils } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Bedrijfsdiner Amersfoort | Zakelijk Dineren bij De Tafelaar",
    description:
        "Bedrijfsdiner in Amersfoort? De Tafelaar: shared dining voor teams en relaties. Chef's Choice vanaf 7 personen, tot 100 gasten. Centraal op de Kamp.",
    alternates: {
        canonical: "/bedrijfsdiner-amersfoort",
    },
    openGraph: {
        title: "Bedrijfsdiner Amersfoort | Zakelijk Dineren bij De Tafelaar",
        description:
            "Shared dining voor teams en relaties. Chef's Choice vanaf 7 personen, tot 100 gasten bij De Tafelaar.",
    },
    keywords: [
        "bedrijfsdiner amersfoort",
        "zakelijk diner amersfoort",
        "bedrijfsuitje eten amersfoort",
        "teamdiner amersfoort",
        "zakelijk restaurant amersfoort",
        "relatie-eten amersfoort",
    ],
};

const faqs = [
    {
        question: "Is De Tafelaar geschikt voor een bedrijfsdiner?",
        answer: "Ja, shared dining is ideaal voor zakelijke diners: het doorbreekt de formele sfeer en stimuleert gesprek. Vanaf 7 personen werken we met Chef's Choice.",
    },
    {
        question: "Kunnen we overdag een bedrijfslunch doen?",
        answer: "Ja, overdag is het restaurant beschikbaar voor zakelijke lunches, vergaderingen met eten, of teamdagen. Ook op maandag en dinsdag in overleg.",
    },
    {
        question: "Wat kost een bedrijfsdiner?",
        answer: "Chef's Choice arrangement is EUR 45 p.p. Met wijnarrangement EUR 28 p.p. extra. Maatwerk mogelijk voor grotere groepen.",
    },
    {
        question: "Zijn er presentatiemogelijkheden?",
        answer: "Neem contact op voor specifieke wensen. We denken mee over de opzet van jullie zakelijke bijeenkomst.",
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

export default function BedrijfsdinerAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Zakelijk Dineren in Amersfoort
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Bedrijfsdiner bij De Tafelaar
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een locatie voor een bedrijfsdiner in Amersfoort? De Tafelaar
                        biedt shared dining voor teams en relaties. Informeel, smaakvol en centraal
                        op de Kamp.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Briefcase className="h-5 w-5" />
                                    <CardTitle className="text-lg">Zakelijk &amp; informeel</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Shared dining doorbreekt de formele sfeer. Ideaal voor teambuilding,
                                relatie-evenementen en afdelingsetentjes.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Users className="h-5 w-5" />
                                    <CardTitle className="text-lg">Tot 100 gasten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Ruimte voor kleine teams en grote groepen. Flexibele opstelling voor
                                zittende diners of staande borrels.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Chef&apos;s Choice arrangement</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Vanaf 7 personen: een volledig verzorgd diner met borrelplanken, warme
                                en koude gerechten. EUR 45 p.p.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer voor je bedrijfsdiner" />
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Zakelijk dineren bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Een bedrijfsdiner hoeft niet stijf en formeel te zijn. Bij De Tafelaar
                                zit je samen aan tafel en deel je gerechten — dat doorbreekt het ijs en
                                zorgt voor echte gesprekken. Of het nu gaat om een teamdiner, een
                                relatie-etentje of een kick-off: shared dining past perfect bij een
                                zakelijke setting die toch ontspannen is.
                            </p>
                            <p>
                                Onze keuken werkt met seizoensgebonden producten van lokale makers. Het
                                Chef&apos;s Choice arrangement (EUR 45 p.p.) bevat borrelplanken, koude en warme
                                gerechten en dessert. Voeg daar een wijnarrangement aan toe (EUR 28 p.p.)
                                voor een complete avond.
                            </p>
                            <p>
                                Het restaurant is ook overdag beschikbaar voor zakelijke lunches,
                                vergaderingen met eten of teamdagen. Op maandag en dinsdag in overleg.
                                Wij denken mee over de invulling zodat jullie alleen nog maar hoeven
                                aan te schuiven.
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
                        <Link href="/feestlocatie-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Feestlocatie
                            </Button>
                        </Link>
                        <Link href="/prive-diner-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Privé diner
                            </Button>
                        </Link>
                        <Link href="/catering">
                            <Button variant="outline" className="rounded-xl">
                                Catering
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
