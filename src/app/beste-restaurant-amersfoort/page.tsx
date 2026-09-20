import type { Metadata } from "next";
import { getGoogleRating, type GoogleRating } from "@/lib/google-rating";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, Leaf, MapPin } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";
export const revalidate = 3600; // Google rating/review count refresh hourly (synced by /api/cron/ingest-reviews)

export async function generateMetadata(): Promise<Metadata> {
    const g = await getGoogleRating();
    return {
        title: `Beste Restaurant Amersfoort | De Tafelaar, ${g.ratingText} op Google`,
        description:
            `Op zoek naar het beste restaurant in Amersfoort? De Tafelaar: ${g.ratingText} op Google, ${g.countText} reviews. Shared dining met lokale gerechten op de Kamp. Reserveer nu.`,
        alternates: {
            canonical: "/beste-restaurant-amersfoort",
        },
        openGraph: {
            title: `Beste Restaurant Amersfoort | De Tafelaar, ${g.ratingText} op Google`,
            description: `${g.ratingText} op Google, ${g.countText} reviews. Shared dining met lokale gerechten op de Kamp in Amersfoort.`,
        },
        keywords: [
            "beste restaurant amersfoort",
            "best beoordeelde restaurant amersfoort",
            "top restaurant amersfoort",
            "goed restaurant amersfoort",
            "restaurant amersfoort hoge beoordeling",
            "beste restaurants amersfoort centrum",
            "restaurant amersfoort reviews",
        ],
    };
}

function buildFaqs(g: GoogleRating) {
    return [
    {
        question: "Wat is het beste restaurant in Amersfoort?",
        answer: `De Tafelaar op de Kamp 8 is een van de best beoordeelde restaurants in Amersfoort met een ${g.ratingText} op Google en ${g.countText} reviews. Gasten waarderen het unieke shared dining concept, de lokale seizoensgerechten en de persoonlijke sfeer. We zijn geopend van woensdag t/m zondag.`,
    },
    {
        question: "Waarom wordt De Tafelaar zo hoog beoordeeld?",
        answer: "Gasten geven De Tafelaar hoge beoordelingen vanwege drie dingen: het shared dining concept waarbij je gerechten deelt, de verse ingrediënten van 14+ lokale producenten, en de warme, persoonlijke bediening. 90% van de reviews is 5 sterren.",
    },
    {
        question: "Hoeveel kost eten bij het best beoordeelde restaurant in Amersfoort?",
        answer: "Bij De Tafelaar reken je op EUR 25-35 per persoon voor een compleet shared dining diner. Gerechten variëren van EUR 3,50 tot EUR 15,50. Er is ook een Chef's Choice arrangement voor EUR 48 p.p., met optioneel wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Moet ik reserveren bij De Tafelaar?",
        answer: "Reserveren is aan te raden, vooral op vrijdag en zaterdag. Als een van de populairste restaurants in Amersfoort kan het druk zijn. Reserveer eenvoudig online via onze website of bel +31 6 341 279 32.",
    },
    ];
}

function faqJsonLd(faqs: { question: string; answer: string }[]) {
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

export default async function BesteRestaurantAmersfoortPage() {
    const g = await getGoogleRating();
    const faqs = buildFaqs(g);
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faqs) }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="mb-12 border-[5px] border-foreground bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
                <div className="inline-flex items-center gap-2 text-primary mb-3">
                    <Star className="h-5 w-5" />
                    <span className="text-xs tracking-widest uppercase">{g.ratingText} op Google, {g.countText} reviews</span>
                </div>
                <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
                    Beste Restaurant in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    De Tafelaar is een van de best beoordeelde restaurants in Amersfoort.
                    Shared dining met lokale seizoensgerechten op de Kamp, hartje centrum.
                    90% van onze Google reviews is 5 sterren.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Star className="h-5 w-5" />
                                <CardTitle className="text-lg">{g.ratingText} / 5</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Google-beoordeling op basis van {g.countText} authentieke gastreviews.
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Users className="h-5 w-5" />
                                <CardTitle className="text-lg">Shared Dining</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Gerechten om samen te delen. Proef van alles, geniet met je tafel.
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Leaf className="h-5 w-5" />
                                <CardTitle className="text-lg">14+ Lokale Makers</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Verse ingrediënten van producenten uit de regio. Van Farmfields tot Boot Koffie.
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-foreground">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Kamp 8</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Hartje centrum Amersfoort. 5 min lopen van de Flint; ~22 min lopen van het station (korter met bus/fiets).
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer nu" />
                </div>
            </section>

            {/* Content */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="border-2 border-foreground p-6 sm:p-8">
                    <h2 className="font-headline text-2xl font-extrabold sm:text-3xl tracking-tight mb-4">
                        Waarom De Tafelaar een van de beste restaurants in Amersfoort is
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            Met een {g.ratingText} op Google en {g.countText} reviews, waarvan 90% vijf sterren, is De Tafelaar een van de hoogst beoordeelde restaurants in Amersfoort.
                            Maar wat maakt ons bijzonder?
                        </p>
                        <p>
                            <strong className="text-foreground">Uniek concept:</strong> We serveren shared
                            dining. In plaats van een vast drie- of viergangenmenu bestel je gerechten
                            die je deelt aan tafel. Zo proef je van alles en is elke avond een ontdekking.
                        </p>
                        <p>
                            <strong className="text-foreground">Lokale kwaliteit:</strong> Onze keuken werkt
                            uitsluitend met seizoensgebonden producten van meer dan 14 lokale producenten
                            uit de regio Amersfoort. Van kaas en charcuterie tot groenten van Farmfields
                            en bier van Rock City Brewing.
                        </p>
                        <p>
                            <strong className="text-foreground">Persoonlijke sfeer:</strong> Op de Kamp 8
                            in het centrum, met een warm interieur en persoonlijke bediening. Of je nu
                            komt voor een date, verjaardagsdiner of borrel met vrienden, je voelt je
                            meteen thuis.
                        </p>
                        <p>
                            Gerechten variëren van EUR 3,50 tot EUR 15,50. Reken op EUR 25-35 per persoon
                            voor een compleet diner. Woensdag t/m zondag geopend.
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
                    <Link href="/impressie">
                        <Button variant="outline" className="">
                            Reviews & Impressie
                        </Button>
                    </Link>
                    <Link href="/restaurant-amersfoort-centrum">
                        <Button variant="outline" className="">
                            Restaurant in centrum
                        </Button>
                    </Link>
                    <Link href="/uit-eten-amersfoort">
                        <Button variant="outline" className="">
                            Uit eten in Amersfoort
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="outline" className="">
                            Contact & Reserveren
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
        </>
    );
}
