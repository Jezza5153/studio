// app/(site)/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { homeContent } from "@/content/site-content";

import {
  ArrowRight,
  UtensilsCrossed,
  Users,
  Leaf,
  MapPin,
} from "lucide-react";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "De Tafelaar | Shared dining in Amersfoort",
  description:
    "De Tafelaar is een shared-dining restaurant in Amersfoort met lokale leveranciers en seizoensgerechten. Kleine gerechten om te delen — warm, ontspannen en in het seizoen.",
  openGraph: {
    title: "De Tafelaar | Shared dining in Amersfoort",
    description:
      "Kleine gerechten om te delen, lokale makers en seizoensgerechten — midden in Amersfoort.",
    images: [{ url: "/pics/homepage.png" }],
  },
};

const HIGHLIGHT_ICONS = {
  sharedDining: UtensilsCrossed,
  makers: Users,
  sustainable: Leaf,
  location: MapPin,
} as const;

type HighlightIconKey = keyof typeof HIGHLIGHT_ICONS;

export default function Home() {
  return (
    <main className="flex flex-col space-y-10 sm:space-y-16 md:space-y-24">
      {/* ================= HERO ================= */}
      <section className="relative h-[65svh] md:h-[70vh] w-full" aria-labelledby="home-hero-title">
        <Image
          src="/pics/homepage.png"
          alt="De Tafelaar – shared dining in Amersfoort"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[50%_40%]"
        />

    {/* calmer, more premium overlay */}
<div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 py-8">
  {homeContent.hero.kicker ? (
    <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-white/80 mb-2">
      {homeContent.hero.kicker}
    </p>
  ) : null}

  <h1
    id="home-hero-title"
    className="font-headline text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-wide max-w-4xl"
  >
    {homeContent.hero.headline}
  </h1>

  <p className="mt-3 max-w-xl text-base sm:text-lg text-white/90">
    {homeContent.hero.subhead}
  </p>

  {/* Explicit entity definition: subtle but visible for AI/SEO */}
  <p className="mt-2 max-w-2xl text-sm text-white/75">
    {homeContent.hero.entityDefinition}
  </p>

  {/* CTAs */}
  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
    {/* Primary CTA */}
    <Button asChild size="lg" className="min-h-11">
      <Link href={homeContent.ctas.primaryHref} prefetch={false}>
        {homeContent.ctas.primaryLabel}
      </Link>
    </Button>

    {/* Secondary CTA – always visible */}
    <Button
      asChild
      size="lg"
      className="min-h-11 bg-white/10 text-white border border-white/60 hover:bg-white hover:text-black hover:border-white transition-colors"
    >
      <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
        {homeContent.ctas.secondaryLabel}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </Button>
  </div>
</div>
</section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="highlights-title">
        <h2 id="highlights-title" className="sr-only">
          Hoogtepunten
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {homeContent.highlights.map((highlight, index) => {
            const key = highlight.iconKey as HighlightIconKey;
            const Icon = HIGHLIGHT_ICONS[key] ?? UtensilsCrossed;

            return (
              <Card
                key={`${highlight.iconKey}-${index}`}
                className="rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex h-full flex-col text-center min-h-[220px]">
                  <CardHeader className="pb-2">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl pt-4">
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                      {highlight.description}
                    </p>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 text-center" aria-labelledby="how-title">
        <h2 id="how-title" className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
          {homeContent.howItWorks.title}
        </h2>
        <p className="max-w-prose mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          {homeContent.howItWorks.description}
        </p>
      </section>

      {/* ================= STORY / CTA ================= */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-24" aria-labelledby="story-title">
        <div className="rounded-2xl ring-1 ring-border bg-primary/5 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
          <div className="text-center">
            <h2 id="story-title" className="font-headline text-2xl md:text-3xl text-foreground">
              {homeContent.story.title}
            </h2>
          </div>

          <div className="mt-4 space-y-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-muted-foreground">
            {homeContent.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href={homeContent.ctas.primaryHref} prefetch={false}>
                {homeContent.ctas.primaryLabel}
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
                {homeContent.ctas.secondaryLabel}{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
