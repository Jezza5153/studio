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

export default function BourgondischEtenAmersfoortPage() {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
            {/* Hero */}
            <header className="text-center mb-12">
                <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
                    Shared Dining in Amersfoort
                </p>
                <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                    Bourgondisch eten in Amersfoort
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Bij De Tafelaar draait alles om samen genieten. Kleine gerechten om te delen,
                    gemaakt met lokale ingrediënten en liefde voor het vak. Echt bourgondisch.
                </p>
            </header>

            {/* USPs */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <Utensils className="h-5 w-5" />
                                <CardTitle className="text-lg">Shared Dining</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kleine gerechten om te delen. Proef van alles, geniet samen.
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border">
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

                    <Card className="rounded-2xl border">
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" />
                                <CardTitle className="text-lg">Hartje Amersfoort</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Kamp 8, midden in het centrum. Vlakbij Flint en Koppelpoort.
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
                <Card className="rounded-2xl border p-6 sm:p-8">
                    <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-4">
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
                            Of je nu met z'n tweeën komt of met een grotere groep — de sfeer is warm,
                            de gerechten zijn rijkelijk, en de avond vliegt voorbij.
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
                    <Link href="/eten-voor-theater-de-flint">
                        <Button variant="outline" className="rounded-xl">
                            Eten vlakbij Flint
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
    );
}
