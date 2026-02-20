
// app/(site)/verhuur-en-groepen/page.tsx
// Server component for speed (no client JS needed)
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privé Diner & Groepsarrangementen Amersfoort | Huur De Tafelaar",
  description:
    "Zoekt u een locatie voor een feest, bedrijfsdiner of groepsuitje in Amersfoort? De Tafelaar biedt exclusieve verhuur tot 100 personen vlakbij Flint. Chef's Choice arrangement vanaf 7 personen.",
  alternates: {
    canonical: "/verhuur-en-groepen",
  },
  openGraph: {
    title: "Feestlocatie & Bedrijfsdiner Amersfoort | De Tafelaar",
    description: "Unieke locatie voor feesten, borrels en zakelijke diners tot 100 personen. Op loopafstand van Flint.",
  },
  keywords: [
    "feestlocatie amersfoort",
    "privé diner amersfoort",
    "bedrijfsdiner amersfoort",
    "groepsarrangement restaurant",
    "locatie huren amersfoort centrum",
    "zakelijk diner flint",
  ],
};


import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  CalendarDays,
  UtensilsCrossed,
  Sparkles,
  Wine,
  Beer,
  Coffee,
  MessageSquare,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function VerhuurEnGroepenPage() {
  return (
    <div className="relative bg-background">
      {/* light vignette, cheap to paint */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Verhuur &amp; Groepen
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            Verhuur en groepen bij De Tafelaar
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            De Tafelaar is te huur voor verschillende evenementen en groepsdiners tot{" "}
            <strong>±100 personen</strong>. Overdag of in de avond – in overleg is veel mogelijk.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-foreground/80">
              Tot 100 personen
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Overdag &amp; avond
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Chef&apos;s Choice vanaf 7 personen
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Shared dining
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Lokale drankkaart
            </Badge>
          </div>
        </header>

        {/* Hero + intro copy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
              Samen tafelen, alles geregeld
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              De Tafelaar is te huur voor verschillende evenementen en voor grote groepen tot{" "}
              <strong>100 personen</strong>. Overdag of in de avond – vrijwel alles is in overleg
              mogelijk. We denken graag mee over de invulling, zodat jullie alleen nog maar hoeven
              aan te schuiven.
            </p>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Voor groepen van <strong>7 personen of meer</strong> werken we met een{" "}
              <em>Chef&apos;s Choice</em>-arrangement. Dat houdt het werkbaar voor de keuken en geeft
              jullie rust aan tafel.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Denk aan borrelplanken, koude en warme gerechten, waarbij ieder gerecht een rijke en
              eigen smaak heeft. We stemmen graag af op jullie wensen en eventuele dieet- of
              allergie-informatie.
            </p>
          </div>

          {/* HERO IMAGE */}
          <div className="order-1 md:order-2 overflow-hidden rounded-2xl">
            <Image
              src="/pics/verhuur1.jpg"
              alt="De Tafelaar – verhuur en groepen"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </section>

        {/* Key cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* cards unchanged */}
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <UtensilsCrossed className="h-5 w-5" />
                <CardTitle className="text-lg">Chef&apos;s Choice</CardTitle>
              </div>
              <CardDescription>Vanaf 7 gasten</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Een rijk gevulde tafel met onder andere borrelplanken, koude en warme gerechten om te
              delen. Meld allergenen vooraf.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <CardTitle className="text-lg">Ruimte &amp; opstelling</CardTitle>
              </div>
              <CardDescription>Tot ±100 personen</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Feesten en partijen tot ongeveer 100 personen (staand).
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <CalendarDays className="h-5 w-5" />
                <CardTitle className="text-lg">Overdag &amp; avond</CardTitle>
              </div>
              <CardDescription>Zakelijk &amp; privé</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Van vergaderingen tot borrels – we plannen praktisch en duidelijk.
            </CardContent>
          </Card>
        </section>

        {/* Gallery */}
        <section className="mb-12">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              "/pics/verhuur2.jpg",
              "/pics/verhuur3.jpg",
              "/pics/verhuur4.jpg",
            ].map((src, i) => (
              <div
                key={src}
                className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
              >
                <Image
                  src={src}
                  alt="Sfeerimpressie De Tafelaar"
                  width={i === 0 ? 1200 : 600}
                  height={i === 0 ? 900 : 600}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA (unchanged) */}
        <section>
          <Card className="rounded-2xl border border-border overflow-hidden">
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                  Plan je groepsevent bij De Tafelaar
                </h2>
                <p className="text-base sm:text-lg text-foreground/90 mt-2">
                  Laat ons weten welke datum je in gedachten hebt en het aantal personen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" prefetch={false}>
                  <Button className="rounded-xl">Contactformulier</Button>
                </Link>
                <Link href="mailto:hallo@detafelaar.nl">
                  <Button variant="outline" className="rounded-xl">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mail ons
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
