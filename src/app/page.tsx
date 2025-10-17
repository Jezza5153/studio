import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homeContent } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight, UtensilsCrossed, Users, Leaf, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero");
  const highlightsIcons = {
    "Shared dining": UtensilsCrossed,
    "Lokale makers": Users,
    "Duurzaam": Leaf,
    "Centrale locatie": MapPin,
  };

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl !leading-tight tracking-wide max-w-4xl">
            {homeContent.hero.headline}
          </h1>
          <p className="mt-4 max-w-xl text-base md:text-lg text-primary-foreground/90">
            {homeContent.hero.subhead}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/reserveren">Reserveer nu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
              <Link href="/menu">Bekijk menu <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {homeContent.highlights.map((highlight, index) => {
              const Icon = highlightsIcons[highlight.title as keyof typeof highlightsIcons] || UtensilsCrossed;
              return (
              <Card key={index} className="text-center border-0 shadow-lg rounded-2xl bg-card hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl pt-4">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base">{highlight.description}</p>
                </CardContent>
              </Card>
            )})}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">{homeContent.howItWorks.title}</h2>
          <p className="max-w-prose mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            {homeContent.howItWorks.description}
          </p>
        </div>
      </section>
      
      <section className="py-16 sm:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-accent/20 border-l-4 border-accent text-accent-foreground p-6 md:p-10 rounded-2xl text-center shadow-lg">
             <h3 className="font-headline text-2xl md:text-3xl">{homeContent.seasonalTeaser.title}</h3>
             <p className="mt-2 text-base md:text-lg max-w-prose mx-auto leading-relaxed">{homeContent.seasonalTeaser.description}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
