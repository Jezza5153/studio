import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Leaf, Heart } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Uit Eten in Amersfoort | Shared Dining De Tafelaar",
    description:
        "Uit eten in Amersfoort? De Tafelaar: shared dining met lokale gerechten op de Kamp. Gezellig samen aan tafel, kleine gerechten om te delen. Reserveer nu.",
    alternates: {
        canonical: "/uit-eten-amersfoort",
    },
    openGraph: {
        title: "Uit Eten in Amersfoort | De Tafelaar",
        description: "Shared dining met lokale gerechten. Gezellig uit eten op de Kamp.",
    },
    keywords: [
        "uit eten amersfoort",
        "eten in amersfoort",
        "lekker eten amersfoort",
        "eten amersfoort",
        "gezellig eten amersfoort",
        "waar eten in amersfoort",
        "lekker uit eten amersfoort",
        "restaurant tip amersfoort",
    ],
};

const faqs = [
    {
        question: "Waar kan ik lekker eten in Amersfoort?",
        answer: "De Tafelaar op de Kamp 8 is een aanrader als je lekker wilt eten in Amersfoort. Je deelt kleine gerechten aan tafel — van borrelplanken en charcuterie tot warme seizoensgerechten. Gemaakt met lokale producten, gezellige sfeer, en een 4.8 op Google. Open woensdag t/m zondag.",
    },
    {
        question: "Hoeveel kost uit eten bij De Tafelaar?",
        answer: "Reken op EUR 25-35 per persoon. Voor een complete avond is er het Chef's Choice arrangement voor EUR 45 p.p., eventueel met een bijpassend wijnarrangement voor EUR 28 p.p.",
    },
    {
        question: "Moet ik reserveren bij De Tafelaar?",
        answer: "Reserveren is aanbevolen, vooral op vrijdag en zaterdag. Je kunt eenvoudig online reserveren via onze website of telefonisch contact opnemen.",
    },
    {
        question: "Is De Tafelaar geschikt voor een date of groep?",
        answer: "Absoluut. Of je nu met z'n twee\u00ebn komt voor een romantisch diner of met een grotere groep: shared dining past altijd. Vanaf 7 personen bieden we een Chef's Choice arrangement aan. We kunnen tot circa 100 gasten ontvangen.",
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

export default function UitEtenAmersfoortPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
            <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                    Shared Dining in Amersfoort
                </p>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Uit eten in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Op zoek naar een gezellige plek om uit eten te gaan in Amersfoort? Bij De Tafelaar
                    deel je kleine gerechten aan tafel. Lokaal, seizoensgebonden en gemaakt met liefde.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Users className="h-5 w-5" />
                                <CardTitle className="text-lg">Samen Delen</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Bestel kleine gerechten en deel alles aan tafel. Proef meer, geniet samen.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Leaf className="h-5 w-5" />
                                <CardTitle className="text-lg">Lokale Makers</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Ingredi\u00ebnten van 14+ regionale producenten. Van Farmfields groenten tot Boot Koffie.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Heart className="h-5 w-5" />
                                <CardTitle className="text-lg">Gezellige Sfeer</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Warm interieur op de Kamp in hartje Amersfoort. Van date-night tot groepsdiner.
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
                        Uit eten in Amersfoort bij De Tafelaar
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            Uit eten gaan moet een beleving zijn. Bij De Tafelaar draait het om samen
                            genieten: je bestelt kleine gerechten die je deelt aan tafel. Zo proef je
                            veel meer dan bij een traditioneel driegangendiner.
                        </p>
                        <p>
                            Onze keuken werkt uitsluitend met seizoensgebonden producten van lokale
                            producenten. De kaart wisselt regelmatig, dus er is altijd iets nieuws te
                            ontdekken. Van vegetarisch en vegan tot gerechten met vlees of vis — voor
                            iedereen is er iets lekkers.
                        </p>
                        <p>
                            Of je nu komt voor een spontane avond uit, een verjaardagsdiner of een
                            gezellig etentje met vrienden: shared dining maakt elke avond bijzonder.
                            We zijn geopend van woensdag t/m zondag en zitten op de Kamp, midden in
                            het centrum van Amersfoort.
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
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-xl">
                            Bekijk ons menu
                        </Button>
                    </Link>
                    <Link href="/bourgondisch-eten-amersfoort">
                        <Button variant="outline" className="rounded-xl">
                            Bourgondisch eten
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
