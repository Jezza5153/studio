import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Reserveren bij De Tafelaar | Tafel Boeken Amersfoort Centrum",
    description: "Reserveer online een tafel bij De Tafelaar in Amersfoort centrum. Shared dining voor 2–100 personen op de Kamp 8. Wo–zo geopend. Direct boeken of bel +31 6 341 279 32.",
    alternates: {
        canonical: "/reserveren",
    },
    openGraph: {
        title: "Reserveren bij De Tafelaar | Tafel Boeken Amersfoort Centrum",
        description: "Reserveer online een tafel bij De Tafelaar: shared dining voor 2–100 personen op de Kamp in Amersfoort. Wo–zo geopend.",
    },
    keywords: [
        "reserveren de tafelaar",
        "tafel boeken amersfoort",
        "restaurant reserveren amersfoort",
        "reservering amersfoort centrum",
        "shared dining reserveren",
    ],
};

const reserverenFaqs = [
    {
        question: "Hoe kan ik reserveren bij De Tafelaar?",
        answer: "Reserveer via de online module op deze pagina, of bel +31 6 341 279 32. Voor groepen vanaf 7 personen raden we aan telefonisch contact op te nemen.",
    },
    {
        question: "Kan ik ook zonder reservering langskomen?",
        answer: "Ja, walk-ins zijn welkom zolang er plek is. We raden reserveren aan op vrijdag- en zaterdagavond — die zijn het drukst.",
    },
    {
        question: "Hoe laat kan ik reserveren?",
        answer: "Woensdag en donderdag vanaf 17:00, vrijdag vanaf 15:00, zaterdag vanaf 11:00, zondag van 11:00 tot 15:00. Maandag en dinsdag zijn we gesloten.",
    },
    {
        question: "Kan ik reserveren voor een grote groep?",
        answer: "Ja, we ontvangen groepen tot circa 100 personen. Vanaf 7 personen bieden we het Chef's Choice arrangement aan (€45 p.p.), optioneel met wijnarrangement (€28 p.p.).",
    },
    {
        question: "Kan ik dieetwensen doorgeven bij de reservering?",
        answer: "Absoluut. Geef allergieën of dieetwensen aan bij de reservering of aan tafel. We hebben vegetarische, vegan en glutenvrije opties.",
    },
];

function reserverenFaqJsonLd() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: reserverenFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    });
}

export default function ReserverenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: reserverenFaqJsonLd() }}
            />
            {children}

            {/* SEO content (server component) */}
            <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24 space-y-12">
                {/* Practical info */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Praktische informatie
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card className="rounded-2xl border p-5">
                            <div className="flex items-center gap-2 text-primary mb-3">
                                <Clock className="h-5 w-5" />
                                <CardTitle className="text-lg">Openingstijden</CardTitle>
                            </div>
                            <dl className="space-y-1 text-sm">
                                <div className="flex justify-between"><dt>Wo – do</dt><dd className="text-muted-foreground">17:00 – 23:00</dd></div>
                                <div className="flex justify-between"><dt>Vrijdag</dt><dd className="text-muted-foreground">15:00 – 00:00</dd></div>
                                <div className="flex justify-between"><dt>Zaterdag</dt><dd className="text-muted-foreground">11:00 – 00:00</dd></div>
                                <div className="flex justify-between"><dt>Zondag</dt><dd className="text-muted-foreground">11:00 – 15:00</dd></div>
                                <div className="flex justify-between"><dt>Ma – di</dt><dd className="text-muted-foreground">Gesloten</dd></div>
                            </dl>
                        </Card>
                        <Card className="rounded-2xl border p-5">
                            <div className="flex items-center gap-2 text-primary mb-3">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Locatie</CardTitle>
                            </div>
                            <address className="not-italic text-sm space-y-1 text-muted-foreground">
                                <p className="font-medium text-foreground">De Tafelaar</p>
                                <p>Kamp 8, 3811 AR Amersfoort</p>
                                <p>2 min van Flint · 5 min van station</p>
                            </address>
                            <div className="mt-2 flex items-center gap-2 text-sm">
                                <Phone className="h-4 w-4 text-primary" />
                                <a href="tel:+31634127932" className="text-muted-foreground hover:text-foreground">+31 6 341 279 32</a>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Groups info */}
                <section className="max-w-3xl mx-auto">
                    <Card className="rounded-2xl border p-6 sm:p-8">
                        <div className="flex items-center gap-2 text-primary mb-3">
                            <Users className="h-5 w-5" />
                            <h2 className="font-headline text-xl">Groepsreserveringen</h2>
                        </div>
                        <p className="text-muted-foreground">
                            De Tafelaar is geschikt voor groepen tot circa 100 personen — van een
                            intiem diner tot een groot feest of bedrijfsdiner. Vanaf 7 personen bieden
                            we het Chef&apos;s Choice arrangement aan (€45 p.p.), optioneel aangevuld
                            met een wijnarrangement van Korte Garde (€28 p.p.). Neem telefonisch
                            contact op om de mogelijkheden te bespreken.
                        </p>
                    </Card>
                </section>

                {/* FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
                        Veelgestelde vragen over reserveren
                    </h2>
                    <div className="space-y-4">
                        {reserverenFaqs.map((faq, i) => (
                            <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                                <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Internal links */}
                <section className="max-w-2xl mx-auto text-center">
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/menu"><Button variant="outline" className="rounded-xl">Bekijk ons menu</Button></Link>
                        <Link href="/verhuur-en-groepen"><Button variant="outline" className="rounded-xl">Groepen &amp; verhuur</Button></Link>
                        <Link href="/openingstijden"><Button variant="outline" className="rounded-xl">Openingstijden</Button></Link>
                        <Link href="/contact"><Button variant="outline" className="rounded-xl">Contact</Button></Link>
                    </div>
                </section>
            </div>
        </>
    );
}
