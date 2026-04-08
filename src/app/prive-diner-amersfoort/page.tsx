import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, ChefHat, Wine } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Prive Diner Amersfoort | Private Dining bij De Tafelaar",
    description:
        "Prive diner in Amersfoort? De Tafelaar biedt private dining met shared dining concept. Exclusief tafelen voor groepen, op de Kamp in het centrum.",
    alternates: {
        canonical: "/prive-diner-amersfoort",
    },
    openGraph: {
        title: "Prive Diner Amersfoort | Private Dining bij De Tafelaar",
        description:
            "Private dining met shared dining concept. Exclusief tafelen voor groepen bij De Tafelaar op de Kamp.",
    },
    keywords: [
        "prive diner amersfoort",
        "private dining amersfoort",
        "exclusief diner amersfoort",
        "intiem groepsdiner amersfoort",
        "private dining locatie amersfoort",
    ],
};

const faqs = [
    {
        question: "Kan ik De Tafelaar exclusief afhuren?",
        answer: "Ja, voor prive diners kun je (een deel van) het restaurant exclusief afhuren. Neem contact op voor mogelijkheden en beschikbaarheid.",
    },
    {
        question: "Hoeveel gasten voor een prive diner?",
        answer: "Vanaf 7 personen werken we met Chef's Choice. Voor exclusieve afsluitingen is het restaurant geschikt tot ~100 personen.",
    },
    {
        question: "Hoe werkt private dining met shared dining?",
        answer: "Jullie krijgen een volledig verzorgde tafel met een selectie van onze beste gerechten. Het Chef's Choice arrangement (EUR 45 p.p.) bevat borrelplanken, koude en warme gerechten en dessert.",
    },
    {
        question: "Kunnen we een eigen menusamenstelling?",
        answer: "Bij grotere groepen stemmen we graag af op jullie wensen, allergieen en dieetwensen. Neem contact op voor de mogelijkheden.",
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

export default function PriveDinerAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Private Dining in Amersfoort
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Prive diner bij De Tafelaar
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Op zoek naar een prive diner in Amersfoort? De Tafelaar biedt private dining
                        met ons shared dining concept. Exclusief tafelen voor groepen, midden in het
                        centrum op de Kamp.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Lock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Exclusieve afsluitingen</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Huur (een deel van) het restaurant exclusief af voor jouw groep.
                                Volledige privacy en persoonlijke bediening.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <ChefHat className="h-5 w-5" />
                                    <CardTitle className="text-lg">Chef&apos;s Choice op maat</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Vanaf 7 personen: een rijkgevulde tafel afgestemd op jullie wensen,
                                allergieen en dieetwensen. EUR 45 p.p.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wine className="h-5 w-5" />
                                    <CardTitle className="text-lg">Bijpassend wijnarrangement</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Voeg een wijnarrangement toe (EUR 28 p.p.) voor een complete
                                private dining ervaring.
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton size="lg" className="shadow-sm" label="Reserveer je prive diner" />
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-3xl mx-auto mb-12">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                            Private dining bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Een prive diner bij De Tafelaar is intiem tafelen in het hart van
                                Amersfoort. Op de Kamp, een van de mooiste plekken van de stad,
                                bieden wij private dining met ons unieke shared dining concept.
                            </p>
                            <p>
                                Jullie krijgen een volledig verzorgde avond. Het Chef&apos;s Choice
                                arrangement (EUR 45 p.p.) bevat borrelplanken, koude en warme gerechten
                                en dessert — allemaal samengesteld door onze chef. Bij grotere groepen
                                stemmen we graag af op jullie wensen.
                            </p>
                            <p>
                                Of je nu een verjaardagsdiner plant, een jubileum viert of gewoon een
                                bijzondere avond met vrienden of familie wilt — De Tafelaar biedt de
                                persoonlijke aandacht en flexibiliteit die bij private dining hoort.
                                Neem contact op en we bespreken samen de mogelijkheden.
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
                        <Link href="/bedrijfsdiner-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Bedrijfsdiner
                            </Button>
                        </Link>
                        <Link href="/romantisch-diner-amersfoort">
                            <Button variant="outline" className="rounded-xl">
                                Romantisch diner
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
