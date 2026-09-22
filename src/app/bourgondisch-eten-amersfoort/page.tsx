import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Users, Leaf, MapPin, Clock, Wine } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Bourgondisch Eten in Amersfoort | Shared Dining De Tafelaar",
    description:
        "Op zoek naar bourgondisch eten in Amersfoort? De Tafelaar biedt shared dining met lokale, seizoensgebonden gerechten. Samen aan tafel in hartje Amersfoort.",
    alternates: {
        canonical: "/bourgondisch-eten-amersfoort",
    },
    openGraph: {
        images: [{ url: "/pics/terras-kamp.jpg", width: 1800, height: 1200 }],
        title: "Bourgondisch Eten Amersfoort | De Tafelaar",
        description: "Shared dining met lokale gerechten. Bourgondisch genieten op de Kamp.",
    },
    keywords: [
        "bourgondisch eten amersfoort",
        "bourgondisch restaurant amersfoort",
        "shared dining amersfoort",
        "gezellig eten amersfoort",
        "lokaal eten amersfoort",
    ],
};

const faqs = [
    {
        question: "Wat is bourgondisch eten bij De Tafelaar?",
        answer: "Bourgondisch eten betekent genieten zonder haast. Bij De Tafelaar deel je gerechten aan tafel: kazen, charcuterie, warme gerechten en desserts. Allemaal gemaakt met lokale, seizoensgebonden producten.",
    },
    {
        question: "Hoeveel kost bourgondisch uit eten bij De Tafelaar?",
        answer: "Gerechten varieren van EUR 3,50 tot EUR 15,50. Reken op EUR 25-35 per persoon, of kies het Chef's Choice arrangement voor EUR 48 p.p. inclusief bijpassend wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Is De Tafelaar geschikt voor een gezellig groepsdiner?",
        answer: "Zeker, shared dining is juist perfect voor groepen. Vanaf 7 personen bieden we een Chef's Choice arrangement. We kunnen tot circa 100 personen ontvangen.",
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

export default function BourgondischEtenAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="mb-12 border-[5px] border-foreground bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
                <p className="mb-4 inline-block bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background">
                    Shared Dining in Amersfoort
                </p>
                <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                    Bourgondisch eten in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Bij De Tafelaar draait alles om samen genieten. Gerechten om te delen,
                    gemaakt met lokale ingrediënten en liefde voor het vak. Echt bourgondisch.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Utensils className="h-5 w-5" />
                                <CardTitle className="text-lg">Shared Dining</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Gerechten om te delen. Proef van alles, geniet samen.
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Leaf className="h-5 w-5" />
                                <CardTitle className="text-lg">Lokaal & Seizoensgebonden</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Verse ingrediënten van lokale producenten, op hun best in het seizoen.
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Hartje Amersfoort</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kamp 8, midden in het centrum. Vlakbij Flint en de Kamperbinnenpoort.
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                </div>
            </section>

            {/* Wat is bourgondisch eten? */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="border-2 border-foreground p-6 sm:p-8">
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-4">
                        Wat maakt De Tafelaar bourgondisch?
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            Bourgondisch eten betekent genieten zonder haast. Bij De Tafelaar betekent dat:
                            samen aan tafel, gerechten die worden gedeeld, en de tijd nemen voor een goed glas wijn.
                        </p>
                        <p>
                            Onze keuken werkt met seizoensgebonden producten van lokale makers. Geen menu van
                            50 gerechten, maar een zorgvuldig samengestelde kaart die elke paar weken wisselt.
                        </p>
                        <p>
                            Of je nu met z'n tweeën komt of met een grotere groep, de sfeer is warm,
                            de gerechten zijn rijkelijk, en de avond vliegt voorbij.
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
                    {faqs.map((faq) => (
                        <Card key={faq.question} className="border-2 border-foreground p-6">
                            <h3 className="font-semibold mb-2">{faq.question}</h3>
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
                    <Link href="/uit-eten-amersfoort">
                        <Button variant="outline" className="">
                            Uit eten in Amersfoort
                        </Button>
                    </Link>
                    <Link href="/drank">
                        <Button variant="outline" className="">
                            Drankenkaart
                        </Button>
                    </Link>
                    <Link href="/reserveren">
                        <Button variant="outline" className="">
                            Reserveren
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}
