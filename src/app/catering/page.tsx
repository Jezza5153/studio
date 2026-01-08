
// app/catering/page.tsx
export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ChefHat,
  Leaf,
  MessageSquare,
  Package,
  PartyPopper,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const CATEGORY_IMAGES = {
  sandwiches: "/pics/cat2.png",
  bowls: "/pics/cat3.png",
  wraps: "/pics/cat4.png",
  boxes: "/pics/cat1.png",
};

const PRICES = {
  sandwiches: 7.5,
  bowls: 10.5,
  wraps: 7.5,
};

const officeLunch = {
  sandwiches: [
    {
      name: "Vitello Tonnato Sandwich",
      description: "Biologisch kalfsvlees · tonijnmayonaise · kappertjes · rucola",
      allergens: ["gluten", "vis", "eieren"],
      tags: [],
    },
    {
      name: "Carpaccio Truffel",
      description: "Rundercarpaccio · truffelmayonaise · Parmezaan · rucola",
      allergens: ["gluten", "lactose", "eieren"],
      tags: [],
    },
    {
      name: "Gerookte Zalm & Dille",
      description: "Gerookte zalm · citroen · dille · komkommer",
      allergens: ["gluten", "vis"],
      tags: [],
    },
    {
      name: "Inari Bao-Style Sandwich",
      description: "Inari · sriracha-mayonaise · knapperige groente",
      allergens: ["gluten", "soja", "eieren"],
      tags: ["V"],
    },
  ],
  bowls: [
    {
      name: "Carpaccio Salad Bowl",
      description: "Carpaccio · Parmezaan · truffelmayonaise · tomaat · rucola",
      allergens: ["lactose", "eieren"],
      tags: [],
    },
    {
      name: "Zalm & Komkommer Bowl",
      description: "Gerookte zalm · citroen · dille · komkommer · groene salade",
      allergens: ["vis"],
      tags: [],
    },
    {
      name: "Bieten & Geitenkaas Bowl",
      description: "Bietencarpaccio · geitenkaas · walnoot · honing",
      allergens: ["lactose", "noten"],
      tags: ["V"],
    },
    {
      name: "Inari Power Bowl",
      description: "Inari · sesam · frisse groenten · Sriracha Mayonaise",
      allergens: ["soja", "sesam"],
      tags: ["V"],
    },
  ],
  wraps: [
    {
      name: "Pulled Pork Wrap",
      description: "Pulled pork · sriracha-mayonaise · frisse koolsla",
      allergens: ["gluten", "eieren", "soja"],
      tags: [],
    },
    {
      name: "Veggie Meatball Wrap",
      description: "Vegetarische balletjes · tomatensaus · rucola",
      allergens: ["gluten", "soja"],
      tags: ["V"],
    },
    {
      name: "Zalm Wrap",
      description: "Gerookte zalm · dille · citroen · komkommer",
      allergens: ["gluten", "vis"],
      tags: [],
    },
  ],
  boxes: [
    {
      name: "Office Lunch Box – Classic",
      description:
        "Vitello Tonnato sandwich · kleine carpaccio salade · gevuld eitje · zoete bite",
      price: 14.5,
      tags: [],
      allergens: ["gluten", "vis", "eieren", "lactose"],
    },
    {
      name: "Office Lunch Box – Veggie",
      description:
        "Inari bao-style sandwich · bieten & geitenkaas bowl · peppadew met roomkaas · zoete bite",
      price: 13.5,
      tags: ["V"],
      allergens: ["gluten", "soja", "eieren", "lactose", "noten"],
    },
    {
      name: "Office Lunch Box – Premium",
      description: "Wrap (keuze) · salad bowl · charcuterie of kaas · dessert",
      price: 18.5,
      tags: [],
      allergens: ["gluten", "lactose", "eieren", "noten", "vis", "soja"],
    },
  ],
};

function TagBadges({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Badge key={t} variant="secondary" className="rounded-full">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function AllergensLine({ allergens }: { allergens: string[] }) {
  if (!allergens?.length) return null;
  return (
    <p className="text-xs text-muted-foreground">
      Allergenen: {allergens.join(" · ")}
    </p>
  );
}

function PricePill({ value }: { value: number }) {
  return (
    <div className="shrink-0 rounded-full border border-border bg-background/60 px-3 py-1 text-sm font-medium">
      € {value.toFixed(2)}
    </div>
  );
}

export default function CateringPage() {
  return (
    <div className="relative bg-background">
      {/* light vignette */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] hidden sm:block"
        style={{ backgroundImage: "url(/noise.png)" }}
      />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            Office Lunch Catering
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            De Tafelaar op kantoor
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Broodjes, bowls, wraps en lunchpakketten — strak verpakt, makkelijk uit te delen en
            gemaakt met onze vertrouwde smaken.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-foreground/80">
              <Briefcase className="mr-2 h-3.5 w-3.5" />
              Bedrijven & Teams
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              <Package className="mr-2 h-3.5 w-3.5" />
              Transport-proof
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              <Leaf className="mr-2 h-3.5 w-3.5" />
              Vriendelijke vega opties
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              <UtensilsCrossed className="mr-2 h-3.5 w-3.5" />
              Klaar om te serveren
            </Badge>
          </div>
        </header>

        {/* Intro + hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
              Lunch die werkt op kantoor
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Geen gedoe, wel kwaliteit. Onze office lunch is ontworpen om netjes te eten, makkelijk te
              verdelen en consistent te leveren — perfect voor vergaderlunches, teamdagen en events.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Alles is opgebouwd uit herkenbare De Tafelaar-componenten (sauzen, proteïnes, garnituren),
              waardoor we snel kunnen opschalen zonder concessies te doen.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="#menu" prefetch={false}>
                <Button className="rounded-xl">
                  Bekijk het office lunch menu
                </Button>
              </Link>
              <Link href="/contact" prefetch={false}>
                <Button variant="outline" className="rounded-xl">
                  Offerte aanvragen
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 overflow-hidden rounded-2xl border border-border bg-muted/20">
            <Image
              src={CATEGORY_IMAGES.boxes}
              alt="Office lunch catering van De Tafelaar"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint="office lunch catering"
            />
          </div>
        </section>

        {/* Key cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <ChefHat className="h-5 w-5" />
                <CardTitle className="text-lg">Strak & Betrouwbaar</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Vaste samenstellingen, duidelijke allergenen en consistente kwaliteit — ideaal voor teams.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Package className="h-5 w-5" />
                <CardTitle className="text-lg">Makkelijk uit te delen</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Individueel of per box geleverd. Klaar om neer te zetten en direct te serveren.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <PartyPopper className="h-5 w-5" />
                <CardTitle className="text-lg">Voor elk moment</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Van vergaderlunch tot teamdag: we denken mee met aantallen, timing en opzet.
            </CardContent>
          </Card>
        </section>

        {/* MENU */}
        <section id="menu" className="scroll-mt-24 mb-14">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-primary/80 mb-2">
                Menu
              </p>
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                Office Lunch Assortiment
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                Vaste prijzen, duidelijke keuzes. 
              </p>
            </div>
          </div>

          {/* Categories grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sandwiches */}
            <Card className="rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={CATEGORY_IMAGES.sandwiches}
                  alt="Office lunch broodjes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="gourmet sandwiches"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl">
                    Broodjes
                  </CardTitle>
                  <PricePill value={PRICES.sandwiches} />
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {officeLunch.sandwiches.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium leading-snug">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <TagBadges tags={item.tags} />
                      <AllergensLine allergens={item.allergens} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bowls */}
            <Card className="rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={CATEGORY_IMAGES.bowls}
                  alt="Office lunch bowls"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="salad bowls"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl">
                    Bowls
                  </CardTitle>
                  <PricePill value={PRICES.bowls} />
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {officeLunch.bowls.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <TagBadges tags={item.tags} />
                      <AllergensLine allergens={item.allergens} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Wraps */}
            <Card className="rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={CATEGORY_IMAGES.wraps}
                  alt="Office lunch wraps"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="wraps"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl">
                    Wraps
                  </CardTitle>
                  <PricePill value={PRICES.wraps} />
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {officeLunch.wraps.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <TagBadges tags={item.tags} />
                      <AllergensLine allergens={item.allergens} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Lunch boxes */}
            <Card className="rounded-2xl border border-border overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={CATEGORY_IMAGES.boxes}
                  alt="Office lunchpakketten"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint="lunch boxes"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-lg sm:text-xl">
                    Lunchpakketten
                  </CardTitle>
                  <Badge variant="secondary" className="rounded-full">
                    Meest gekozen
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {officeLunch.boxes.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="font-medium leading-snug">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      {"price" in item && item.price ? (
                        <PricePill value={item.price} />
                      ) : null}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <TagBadges tags={(item as any).tags || []} />
                      <AllergensLine allergens={(item as any).allergens || []} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Build your own lunch */}
        <section className="mb-12">
          <Card className="rounded-2xl border border-border overflow-hidden bg-muted/20">
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <h2 className="font-headline text-2xl sm:text-3xl">
                    Build your own lunch (bedrijven)
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">
                    Maak het makkelijk voor je team: kies per persoon{" "}
                    <span className="text-foreground font-medium">
                      1 basis (broodje / wrap / bowl)
                    </span>{" "}
                    +{" "}
                    <span className="text-foreground font-medium">
                      1 side (borrel / kaas / charcu)
                    </span>{" "}
                    +{" "}
                    <span className="text-foreground font-medium">
                      1 sweet
                    </span>
                    . Wij leveren het overzichtelijk en klaar om neer te zetten.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-foreground/80">
                      Basis: € 7,50 / € 10,50
                    </Badge>
                    <Badge variant="outline" className="text-foreground/80">
                      Flexibel per dieet
                    </Badge>
                    <Badge variant="outline" className="text-foreground/80">
                      Handig voor 10–150+ personen
                    </Badge>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link href="/contact" prefetch={false}>
                      <Button className="rounded-xl">
                        Offerte aanvragen
                      </Button>
                    </Link>
                    <Link href="#contact" prefetch={false}>
                      <Button variant="outline" className="rounded-xl">
                        Vragen? Contact opties
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-24">
          <Card className="rounded-2xl border border-border overflow-hidden">
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                  Bespreek de mogelijkheden
                </h2>
                <p className="text-base sm:text-lg text-foreground/90 mt-2">
                  Vertel ons datum, locatie en aantal personen — dan maken we een voorstel dat past.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" prefetch={false}>
                  <Button className="rounded-xl">Contact opnemen</Button>
                </Link>
                <Link href="mailto:reserveren@tafelaaramersfoort.nl">
                  <Button variant="outline" className="rounded-xl">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Mail ons direct
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
