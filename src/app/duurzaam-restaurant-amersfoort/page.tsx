import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Wine } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Duurzaam Restaurant Amersfoort | Lokaal & Seizoensgebonden | De Tafelaar",
    description:
        "Duurzaam uit eten in Amersfoort? De Tafelaar werkt met 14+ lokale producenten, seizoensgebonden ingrediënten en biologische dranken. Shared dining op de Kamp.",
    alternates: {
        canonical: "/duurzaam-restaurant-amersfoort",
    },
    openGraph: {
        title: "Duurzaam Restaurant Amersfoort | Lokaal & Seizoensgebonden | De Tafelaar",
        description:
            "Duurzaam uit eten in Amersfoort? De Tafelaar werkt met 14+ lokale producenten, seizoensgebonden ingrediënten en biologische dranken.",
    },
    keywords: [
        "duurzaam restaurant amersfoort",
        "duurzaam eten amersfoort",
        "biologisch restaurant amersfoort",
        "lokaal restaurant amersfoort",
        "seizoensgebonden restaurant amersfoort",
        "farm to table amersfoort",
    ],
};

const faqs = [
    {
        question: "Wat maakt De Tafelaar duurzaam?",
        answer: "We werken met 14+ lokale producenten: biologisch rundvlees van Farmfields (Beter Leven 4-sterren), biologische koffie van Boot Koffie, biologische wijnen via Korte Garde, en bieren van 4 Amersfoortse brouwerijen.",
    },
    {
        question: "Zijn jullie ingrediënten biologisch?",
        answer: "Waar mogelijk werken we biologisch. Ons vlees is Beter Leven 4-sterren gecertificeerd, onze koffie en wijnen zijn biologisch. We kiezen altijd voor de meest verantwoorde optie.",
    },
    {
        question: "Hoe werkt seizoensgebonden koken?",
        answer: "Ons menu wisselt regelmatig mee met de seizoenen. We gebruiken wat op dat moment het versst en lekkerst is. Zo minimaliseren we voedselverspilling en serveren we producten op hun best.",
    },
    {
        question: "Met welke lokale makers werken jullie?",
        answer: "Farmfields (vlees), Boot Koffie (Baarn), Rock City Brewing (Amersfoort), De Drie Ringen (Amersfoort), 't Mirakel (Amersfoort), Eem Bier (regio), en Korte Garde (biologische wijnen, Amersfoort).",
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

export default function DuurzaamRestaurantAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
                {/* Hero */}
                <header className="text-center mb-12">
                    <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                        Lokaal &amp; Seizoensgebonden
                    </p>
                    <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                        Duurzaam restaurant in Amersfoort
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                        Bij De Tafelaar werken we met 14+ lokale producenten, seizoensgebonden
                        ingrediënten en biologische dranken. Geen greenwashing, maar echte
                        partnerships met makers uit de regio.
                    </p>
                </header>

                {/* USPs */}
                <section className="max-w-4xl mx-auto mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Leaf className="h-5 w-5" />
                                    <CardTitle className="text-lg">Lokale producenten</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                14+ makers uit de regio. Van Farmfields rundvlees tot Boot Koffie en Amersfoortse brouwerijen.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Recycle className="h-5 w-5" />
                                    <CardTitle className="text-lg">Seizoensgebonden</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Ons menu wisselt mee met het seizoen. Altijd de verste producten, minimale voedselverspilling.
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2 text-primary">
                                    <Wine className="h-5 w-5" />
                                    <CardTitle className="text-lg">Biologische dranken</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
                                Biologische koffie van Boot, biologische wijnen via Korte Garde en lokaal bier van 4 brouwerijen.
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
                            Duurzaam eten bij De Tafelaar
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>
                                Duurzaamheid begint bij korte ketens. Ons rundvlees komt van{" "}
                                <strong className="text-foreground">Farmfields</strong>, met het
                                Beter Leven 4-sterren keurmerk voor maximaal dierenwelzijn. De koffie
                                is biologisch en komt van{" "}
                                <strong className="text-foreground">Boot Koffie</strong> uit Baarn.
                                Onze wijnen zijn biologisch en geselecteerd samen met{" "}
                                <strong className="text-foreground">Korte Garde</strong>, de
                                wijnwinkel hier in de straat.
                            </p>
                            <p>
                                Aan de tap vind je bier van vier Amersfoortse brouwerijen:{" "}
                                <strong className="text-foreground">Rock City Brewing</strong>,{" "}
                                <strong className="text-foreground">Stadsbrouwerij De Drie Ringen</strong>,{" "}
                                <strong className="text-foreground">Brouwerij &apos;t Mirakel</strong> en{" "}
                                <strong className="text-foreground">Eem Bier</strong>. Elke
                                leverancier kennen we persoonlijk — dat is geen marketingverhaal,
                                maar de basis van onze keuken.
                            </p>
                            <p>
                                Ons menu wisselt regelmatig mee met de seizoenen. Wat nu op de kaart
                                staat, is op dit moment op z&apos;n best. Zo houden we de keten kort,
                                minimaliseren we verspilling en serveren we producten wanneer ze het
                                lekkerst zijn. Reken op{" "}
                                <strong className="text-foreground">&euro;25-35 p.p.</strong> of kies
                                het Chef&apos;s Choice arrangement voor{" "}
                                <strong className="text-foreground">&euro;45 p.p.</strong> met
                                optioneel wijnarrangement (&euro;28 p.p.).
                            </p>
                        </div>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen
                    </h2>
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <dl className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index}>
                                    <dt className="font-semibold text-base mb-1">{faq.question}</dt>
                                    <dd className="text-sm text-muted-foreground">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                    </Card>
                </section>

                {/* Links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/over-onze-makers">
                            <Button variant="outline" className="rounded-xl">
                                Onze makers
                            </Button>
                        </Link>
                        <Link href="/menu">
                            <Button variant="outline" className="rounded-xl">
                                Bekijk ons menu
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="rounded-xl">
                                Contact
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
