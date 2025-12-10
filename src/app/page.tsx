import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homeContent } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, UtensilsCrossed, Users, Leaf, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero");
  const highlightsIcons = {
    "Shared dining": UtensilsCrossed,
    "Lokale makers": Users,
    Duurzaam: Leaf,
    "Centrale locatie": MapPin,
  };

  return (
    <div className="flex flex-col space-y-10 sm:space-y-16 md:space-y-24">
      {/* Hero */}
      <section className="relative h-[65svh] md:h-[70vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
            sizes="(max-width: 640px) 100vw, 100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-8">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide max-w-4xl">
            {homeContent.hero.headline}
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-white/90">
            {homeContent.hero.subhead}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <Button asChild size="lg" className="min-h-11">
              <Link href="/reserveren" prefetch={true}>contact ons</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-black min-h-11"
            >
              <Link href="/menu" prefetch={false}>
                Bekijk menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {homeContent.highlights.map((highlight, index) => {
            const Icon =
              highlightsIcons[highlight.title as keyof typeof highlightsIcons] ||
              UtensilsCrossed;
            return (
              <Card
                key={index}
                className="text-center border-0 shadow-lg rounded-2xl bg-card hover:shadow-2xl transition-shadow duration-300 h-full min-h-[220px]"
              >
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
        <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
          {homeContent.howItWorks.title}
        </h2>
        <p className="max-w-prose mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          {homeContent.howItWorks.description}
        </p>
      </section>

      {/* Announcement / Catch phrase (vervangt de seizoens-teaser) */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="rounded-2xl text-center shadow-lg ring-1 ring-border bg-primary/5 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <h3 className="font-headline text-2xl md:text-3xl text-foreground">
            {homeContent.seasonalTeaser.title}
          </h3>
          <p className="mt-3 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            {homeContent.seasonalTeaser.description}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/reserveren" prefetch={true}>Contacteer ons</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/menu" prefetch={false}>
                Bekijk menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
