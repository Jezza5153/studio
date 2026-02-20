import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, Clock, Users, Utensils, Phone } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Restaurant vlakbij Flint | Bourgondisch Shared Dining op 2 min lopen",
    description:
        "Op zoek naar een restaurant vlakbij Flint? De Tafelaar ligt op 400 meter (2 min lopen). Bourgondisch shared dining voor of na de voorstelling.",
    alternates: {
        canonical: "/eten-voor-theater-de-flint",
    },
    openGraph: {
        title: "Restaurant vlakbij Flint | De Tafelaar Amersfoort",
        description: "Bourgondisch shared dining op 2 minuten lopen van Flint. Perfect voor of na de voorstelling.",
    },
    keywords: [
        "restaurant vlakbij flint",
        "eten vlakbij flint amersfoort",
        "bourgondisch eten dicht bij flint",
        "restaurant bij theater amersfoort",
        "eten voor voorstelling amersfoort",
    ],
};

// FAQ data for schema and display
const faqs = [
    {
        question: "Hoe ver is De Tafelaar lopen naar Flint?",
        answer: "De Tafelaar ligt op ongeveer 400 meter van Flint, dat is circa 2 minuten lopen via de Kamp.",
    },
    {
        question: "Kunnen we op tijd eten voor de voorstelling?",
        answer: "Ja, wij adviseren om een tafel te boeken 2 uur voor aanvang van de show. Dan heeft u rustig de tijd om te genieten van shared dining en op tijd bij het theater te zijn.",
    },
    {
        question: "Kunnen we snel shared dining doen (60-75 minuten)?",
        answer: "Jazeker, laat bij uw reservering weten dat u naar Flint gaat en hoe laat de voorstelling begint. Wij stemmen het tempo van de gerechten daarop af.",
    },
    {
        question: "Is er ruimte voor groepen na een show?",
        answer: "Absoluut! We ontvangen graag groepen na de voorstelling. Vanaf 7 personen werken we met een Chef's Choice arrangement. Reserveer vooraf en vermeld dat het na Flint is.",
    },
    {
        question: "Hebben jullie rekening met dieetwensen en allergieën?",
        answer: "Wij werken met verse, lokale producten en kunnen vrijwel altijd rekening houden met allergieën en dieetwensen. Vermeld dit bij uw reservering of laat het weten bij aankomst.",
    },
];

// FAQ JSON-LD schema
function faqJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
    return JSON.stringify(data);
}

export default function EtenVoorDeFlintPage() {
    return (
        <>
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: faqJsonLd() }}
            />

            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Op 2 min lopen van Flint
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Bourgondisch eten vlakbij Flint
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        De Tafelaar is de ideale plek voor een heerlijk diner voor of na uw theaterbezoek.
                        Shared dining met lokale, seizoensgebonden gerechten — op steenworp afstand van Flint.
                    </p>
                </header>

                {/* Praktische info */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <MapPin className="h-5 w-5" />
                                    <CardTitle className="text-lg">Locatie</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Kamp 8, Amersfoort</p>
                                <p>400 meter van Flint</p>
                                <p>~2 minuten lopen</p>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Clock className="h-5 w-5" />
                                    <CardTitle className="text-lg">Timing tip</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Vóór de show?</p>
                                <p>Boek 2 uur voor aanvang van de show</p>
                                <p className="text-xs text-muted-foreground/70">(zo hebt u rustig de tijd)</p>
                                <p className="font-medium text-foreground mt-2">Na de show?</p>
                                <p>Reserveer vanaf 22:00</p>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Utensils className="h-5 w-5" />
                                    <CardTitle className="text-lg">Concept</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">Shared dining</p>
                                <p>Kleine gerechten om te delen</p>
                                <p>Lokaal & seizoensgebonden</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 text-center">
                        <ReserveerButton
                            size="lg"
                            className="shadow-sm"
                            label="Reserveer nu"
                        />
                        <p className="mt-3 text-sm text-muted-foreground">
                            Vermeld bij uw reservering dat u naar Flint gaat!
                        </p>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen
                    </h2>
                    <Card className="rounded-2xl border">
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                                        <AccordionTrigger className="font-semibold text-left text-base">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>

                {/* Links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">
                                Bekijk ons menu
                            </Button>
                        </Link>
                        <Link href="/buurtgids">
                            <Button variant="outline" className="rounded-xl">
                                Buurtgids Flint
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">
                                <Phone className="mr-2 h-4 w-4" />
                                Contact
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
