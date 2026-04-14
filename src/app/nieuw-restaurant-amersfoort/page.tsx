import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Calendar, MapPin, Utensils } from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
    title: "Ontdek De Tafelaar | Shared Dining Restaurant Amersfoort",
    description:
        "Ken je De Tafelaar al? Shared dining restaurant op de Kamp in Amersfoort. Lokale gerechten om te delen, seizoensgebonden menu, gezellige sfeer. Wo–zo geopend.",
    alternates: {
        canonical: "/nieuw-restaurant-amersfoort",
    },
    openGraph: {
        title: "Ontdek De Tafelaar | Shared Dining Amersfoort",
        description: "Shared dining met lokale gerechten op de Kamp in Amersfoort. Ontdek De Tafelaar.",
    },
    keywords: [
        "restaurant ontdekken amersfoort",
        "shared dining restaurant amersfoort",
        "restaurant tip amersfoort",
        "restaurant de kamp amersfoort",
        "gezellig restaurant amersfoort centrum",
    ],
};

export default function NieuwRestaurantAmersfoortPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <div className="inline-flex items-center gap-2 text-primary mb-3">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-xs tracking-widest uppercase">Shared Dining op de Kamp</span>
                </div>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Ontdek De Tafelaar in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Op zoek naar een restaurant in Amersfoort dat net even anders is? Bij De Tafelaar
                    deel je kleine gerechten aan tafel — gemaakt met lokale ingrediënten, in een
                    ongedwongen sfeer op de Kamp.
                </p>
            </header>

            {/* Info Cards */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Locatie</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">Kamp 8, Amersfoort</p>
                            <p>Midden in het centrum, op loopafstand van Flint, Koppelpoort en het station.</p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Calendar className="h-5 w-5" />
                                <CardTitle className="text-lg">Openingstijden</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            <p>Woensdag t/m zondag</p>
                            <p>Keuken open vanaf 17:00</p>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="mt-8 text-center">
                    <ReserveerButton size="lg" className="shadow-sm" label="Reserveer een tafel" />
                    <p className="mt-3 text-sm text-muted-foreground">
                        Kom kennismaken met De Tafelaar!
                    </p>
                </div>
            </section>

            {/* Wat maakt ons bijzonder? */}
            <section className="max-w-3xl mx-auto mb-12">
                <Card className="rounded-2xl border p-6 sm:p-8">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
                        Wat maakt De Tafelaar uniek?
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                        <p>
                            <strong className="text-foreground">Shared dining concept:</strong> Onze keuken
                            maakt kleine gerechten die je deelt met tafelgenoten. Zo proef je van alles en
                            is het een echte gezamenlijke ervaring.
                        </p>
                        <p>
                            <strong className="text-foreground">Lokale makers:</strong> We werken samen met
                            producenten uit de regio. Van kaas tot bier, van groenten tot vleeswaren —
                            alles komt van dichtbij.
                        </p>
                        <p>
                            <strong className="text-foreground">Seizoensgebonden menu:</strong> Ons menu
                            wisselt regelmatig mee met het seizoen. Wat nu op de kaart staat, is op dit
                            moment op z'n best.
                        </p>
                    </div>
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
                    <Link href="/over-ons">
                        <Button variant="outline" className="rounded-xl">
                            Over De Tafelaar
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
    );
}
