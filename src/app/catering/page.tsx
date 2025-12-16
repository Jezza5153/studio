// app/catering/page.tsx
export const dynamic = "force-static";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  PartyPopper,
  Quote,
  MessageSquare,
  UtensilsCrossed,
  Leaf,
} from "lucide-react";

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
            Catering Service
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            De Tafelaar bij u op locatie
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Geniet van onze shared dining ervaring, sfeer en lokale smaken op uw eigen evenement, feest of bijeenkomst.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-foreground/80">
              Shared Dining Concept
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Zakelijk & Particulier
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Verse, Lokale Producten
            </Badge>
            <Badge variant="outline" className="text-foreground/80">
              Op Maat Gemaakt
            </Badge>
          </div>
        </header>

        {/* Hero + intro copy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
              Dezelfde smaak, uw eigen plek
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              Of het nu gaat om een intiem diner thuis, een bedrijfsborrel of een feestelijke gelegenheid, wij brengen de essentie van De Tafelaar naar u toe. Ons team zorgt voor een culinaire invulling die past bij uw wensen, met dezelfde aandacht voor kwaliteit en detail als in ons restaurant.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We specialiseren ons in walking dinners, uitgebreide borrelplanken en buffetten in shared-dining stijl. Alles wordt bereid met de seizoensgebonden en lokale producten die u van ons gewend bent.
            </p>
          </div>

          <div className="order-1 md:order-2 overflow-hidden rounded-2xl">
            <Image
              src="https://picsum.photos/seed/catering1/1200/800"
              alt="Catering opstelling van De Tafelaar"
              width={1200}
              height={800}
              className="object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint="catering setup"
            />
          </div>
        </section>

        {/* Key cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <ChefHat className="h-5 w-5" />
                <CardTitle className="text-lg">Op Maat Gemaakt</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Elk evenement is uniek. We bespreken graag uw wensen om een menu samen te stellen dat perfect aansluit bij de gelegenheid.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <Leaf className="h-5 w-5" />
                <CardTitle className="text-lg">Lokaal & Seizoensgebonden</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Ook op locatie koken we met de seizoenen mee en gebruiken we de beste producten van onze vertrouwde, lokale makers.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary">
                <PartyPopper className="h-5 w-5" />
                <CardTitle className="text-lg">Volledig Ontzorgd</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed">
              Van voorbereiding tot presentatie, ons team kan alles uit handen nemen, zodat u kunt genieten van uw eigen evenement.
            </CardContent>
          </Card>
        </section>

        {/* Quote */}
        <section className="mb-12">
           <figure className="rounded-2xl border border-border p-6 sm:p-8 bg-muted/30">
              <blockquote className="text-xl sm:text-2xl leading-relaxed tracking-tight">
                “Dezelfde passie en smaak van ons restaurant, maar dan geserveerd op de plek die u kiest. Dat is onze belofte.”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-muted-foreground">
                <div className="h-px flex-1 bg-border" />
                <span className="italic">
                  — Jan Molmans, De Tafelaar
                </span>
              </figcaption>
            </figure>
        </section>

        {/* CTA */}
        <section>
          <Card className="rounded-2xl border border-border overflow-hidden">
            <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                  Bespreek de mogelijkheden
                </h2>
                <p className="text-base sm:text-lg text-foreground/90 mt-2">
                  Neem contact met ons op om uw wensen te bespreken en een vrijblijvende offerte te ontvangen.
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
