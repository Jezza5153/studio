// app/(site)/verhuur-en-groepen/page.tsx
// Server component for speed (no client JS needed)
export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  const hero = PlaceHolderImages.find((i) => i.id === "venue-hero");

  const gallery = PlaceHolderImages.filter((i) =>
    ["venue-1", "venue-2", "venue-3"].includes(i.id)
  );

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
              jullie rust aan tafel. De Chef&apos;s Choice bevat een uitgebreid assortiment aan
              gerechten zoals De Tafelaar-filosofie het graag ziet: lekker tafelen en je laten
              verrassen.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Denk aan borrelplanken, koude en warme gerechten, waarbij ieder gerecht een rijke en
              eigen smaak heeft. We stemmen graag af op jullie wensen en eventuele dieet- of
              allergie-informatie.
            </p>
          </div>

          <div className="order-1 md:order-2 overflow-hidden rounded-2xl">
            {hero && (
              <Image
                src={hero.imageUrl}
                alt={hero.description}
                width={1200}
                height={800}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-ai-hint={hero.imageHint}
                placeholder={(hero as any).blurDataURL ? "blur" : undefined}
                blurDataURL={(hero as any).blurDataURL}
              />
            )}
          </div>
        </section>

        {/* Key cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
              delen. Zo kan de keuken doorwerken en hebben jullie alle tijd om te tafelen. Meld
              allergenen vooraf, dan passen we het waar mogelijk aan.
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
              Feesten en partijen tot ongeveer 100 personen (staand). Zittend in tafelopstelling in
              overleg. De ruimte kan deels of volledig exclusief worden geboekt, afhankelijk van
              datum en tijd.
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
              Of het nu gaat om een rustige vergadering overdag of een borrel in de avond: we
              plannen praktisch en duidelijk, zodat jullie onbezorgd kunnen genieten.
            </CardContent>
          </Card>
        </section>

        {/* For which events */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-3">
            Feesten en partijen tot 100 personen
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-4 max-w-2xl">
            De Tafelaar leent zich voor allerlei soorten momenten. Kleinschalig of groots, informeel
            of juist wat zakelijker – we kijken samen wat past.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              "Verjaardag",
              "Jubileum",
              "(Zakelijke) borrel",
              "Trouwerij",
              "Scheiding",
              "Vergadering",
              "Heisessie",
              "Training",
            ].map((t) => (
              <Badge key={t} variant="outline" className="text-foreground/80">
                {t}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Bij De Tafelaar staan we overal voor open. Bel, mail of – als het echt moet – stuur een
            postduif. Samen kijken we wat voor jullie gezelschap het beste werkt.
          </p>
        </section>

        {/* Drinks / sfeer */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Wine className="h-5 w-5" />
                <CardTitle className="text-lg">Wijn</CardTitle>
              </div>
              <CardDescription>Biologisch &amp; natuur</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Een zorgvuldig samengestelde kaart met biologische en natuurwijnen. We adviseren graag
              welke wijnen aansluiten bij jullie gezelschap en het menu.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Beer className="h-5 w-5" />
                <CardTitle className="text-lg">Bier</CardTitle>
              </div>
              <CardDescription>Lokaal assortiment</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Van vertrouwde klassiekers tot verrassende specials – met een duidelijke link naar de
              regio Amersfoort.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Coffee className="h-5 w-5" />
                <CardTitle className="text-lg">Koffie &amp; thee</CardTitle>              </div>
              <CardDescription>Ambachtelijk &amp; biologisch</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Afsluiten met goede koffie of thee? Natuurlijk. Met zorg gebrand en gezet, precies
              zoals bij De Tafelaar past.
            </CardContent>
          </Card>
        </section>

        {/* Gallery (optional) */}
        {gallery.length > 0 && (
          <section className="mb-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {gallery.slice(0, 3).map((img: any, i: number) => (
                <div
                  key={img.id}
                  className={`overflow-hidden rounded-xl ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    width={i === 0 ? 1200 : 600}
                    height={i === 0 ? 900 : 600}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={img.imageHint}
                    placeholder={img.blurDataURL ? "blur" : undefined}
                    blurDataURL={img.blurDataURL}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            Veelgestelde vragen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="rounded-2xl border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" /> Allergenen &amp; dieetwensen
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Laat ons allergenen en dieetwensen vooraf weten. Binnen het Chef&apos;s
                Choice-arrangement houden we daar zo veel mogelijk rekening mee en denken we mee
                over alternatieven.
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Tijden &amp; planning
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Overdag en avond zijn mogelijk. Begin- en eindtijden spreken we samen af, afhankelijk
                van bezetting en de wens voor (gedeeltelijke) exclusiviteit.
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Capaciteit
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Tot ongeveer 100 personen staand; zittend afhankelijk van de opstelling. We adviseren
                graag wat voor jullie groep prettig werkt.
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Eigen invulling
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Aankleding, muziek of speciale wensen? Bespreek het met ons team – we kijken wat past
                binnen de locatie, het tijdstip en jullie budget.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section>
          <Card className="rounded-2xl border border-border overflow-hidden">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-2xl" />
              <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                    Plan je groepsevent bij De Tafelaar
                  </h2>
                  <p className="text-base sm:text-lg text-foreground/90 mt-2">
                    Laat ons weten welke datum je in gedachten hebt, het geschatte aantal personen
                    en het type gelegenheid. We reageren snel met de mogelijkheden.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    En echt: bel, mail of stuur een postduif – we denken graag met je mee.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" prefetch={false}>
                    <Button className="rounded-xl">Contactformulier</Button>
                  </Link>
                  <Link href="mailto:hallo@detafelaar.nl" prefetch={false}>
                    <Button variant="outline" className="rounded-xl">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Mail ons
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
