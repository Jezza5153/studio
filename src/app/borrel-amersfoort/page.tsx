import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Beer, UtensilsCrossed, Clock } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Borrelen in Amersfoort | Borrelplanken & Lokaal Bier De Tafelaar",
    description:
        "Borrelen in Amersfoort? De Tafelaar: borrelplanken, lokale bieren van Rock City & De Drie Ringen, en kleine gerechten. Zaterdag open vanaf 11:00, vrijdag vanaf 15:00.",
    alternates: {
        canonical: "/borrel-amersfoort",
    },
    openGraph: {
        title: "Borrelen in Amersfoort | De Tafelaar",
        description: "Borrelplanken en lokaal bier op de Kamp. Zaterdag open vanaf 11:00, vrijdag vanaf 15:00.",
    },
    keywords: [
        "borrel amersfoort",
        "borrelen amersfoort",
        "borrelplanken amersfoort",
        "vrijdagmiddagborrel amersfoort",
        "lokaal bier amersfoort",
        "terras borrel amersfoort centrum",
    ],
};

const faqs = [
    {
        question: "Kan ik bij De Tafelaar alleen borrelen?",
        answer: "Ja, je hoeft niet te dineren. Op zaterdag zijn we open vanaf 11:00 en op vrijdag vanaf 15:00, dus je kunt prima langskomen voor alleen een borrel met hapjes.",
    },
    {
        question: "Wat voor bier hebben jullie?",
        answer: "We schenken lokale bieren van Rock City Brewing, De Drie Ringen, 't Mirakel en Eem Bier. Daarnaast hebben we biologische wijnen van Korte Garde en een uitgebreide drankenkaart.",
    },
    {
        question: "Hebben jullie borrelplanken?",
        answer: "Ja, we hebben borrelplanken met kaas, charcuterie en seizoensgebonden hapjes. Perfect om te delen met een groep. Daarnaast kun je alle kleine gerechten van de kaart bestellen.",
    },
    {
        question: "Kan ik met een groep borrelen?",
        answer: "Absoluut, we kunnen tot circa 100 personen ontvangen. Vanaf 7 personen bieden we een Chef's Choice borrel-arrangement aan. Neem contact op voor de mogelijkheden.",
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                    Borrelplanken & Lokaal Bier
                </p>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Borrelen in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Borrelplanken, lokale bieren van vier Amersfoortse brouwerijen en kleine
                    gerechten om te delen. Zaterdag open vanaf 11:00, vrijdag vanaf 15:00.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Beer className="h-5 w-5" />
                                <CardTitle className="text-lg">Lokaal Bier</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Bieren van 4 Amersfoortse brouwerijen: Rock City, De Drie Ringen, 't Mirakel en Eem Bier.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <UtensilsCrossed className="h-5 w-5" />
                                <CardTitle className="text-lg">Borrelplanken</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kaas, charcuterie en seizoensgebonden hapjes. Samengesteld om te delen.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Clock className="h-5 w-5" />
                                <CardTitle className="text-lg">Open Vanaf 15:00</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Zaterdag open vanaf 11:00, vrijdag vanaf 15:00. Ideaal voor een borrel.
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="rounded-2xl border p-6 sm:p-8">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                        Borrelen bij De Tafelaar
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            De Tafelaar is meer dan een restaurant. Op zaterdag openen we al om
                            11:00 en op vrijdag vanaf 15:00, zodat je rustig kunt binnenlopen
                            voor een borrel. Geen reservering nodig — gewoon langskomen.
                        </p>
                        <p>
                            We zijn trots op ons aanbod van lokale bieren. Rock City Brewing, De Drie
                            Ringen, 't Mirakel en Eem Bier: vier Amersfoortse brouwerijen op onze kaart.
                            Daarnaast schenken we biologische wijnen van Korte Garde en een selectie
                            cocktails en alcoholvrije dranken.
                        </p>
                        <p>
                            Bij de borrel serveren we borrelplanken met kaas en charcuterie, of je
                            bestelt een paar kleine gerechten van de kaart om te delen. Gerechten
                            variëren van EUR 3,50 tot EUR 15. Kom je met een grotere groep? Vanaf 7
                            personen stellen we een Chef&apos;s Choice borrel-arrangement samen
                            (EUR 45 p.p.). We hebben ruimte voor tot circa 100 gasten.
                        </p>
                        <p>
                            De Tafelaar zit op Kamp 8 in het centrum van Amersfoort, op 2 minuten
                            van Theater de Flint en 5 minuten van station Amersfoort. Parkeergarage
                            Kamp is op 1 minuut loopafstand. Met een 4.8 op Google en 90+ reviews
                            zijn we een van de best beoordeelde restaurants in Amersfoort. Naast
                            zaterdag (open vanaf 11:00) en vrijdag (open vanaf 15:00) zijn we
                            ook geopend op woensdag en donderdag vanaf 17:00, en zondag van
                            11:00 tot 15:00.
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
                            <h3 className="font-semibold mb-2">{faq.question}</h3>
                            <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Links */}
            <section className="max-w-2xl mx-auto text-center">
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/drank">
                        <Button variant="outline" className="rounded-xl">
                            Bekijk de drankenkaart
                        </Button>
                    </Link>
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-xl">
                            Bekijk ons menu
                        </Button>
                    </Link>
                    <Link href="/beste-restaurant-amersfoort">
                        <Button variant="outline" className="rounded-xl">
                            Beste restaurant
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="rounded-xl">
                            Contact & Reserveren
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}
