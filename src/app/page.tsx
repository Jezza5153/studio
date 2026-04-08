
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
  Theater,
  Map,
} from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "De Tafelaar | Restaurant Amersfoort Centrum",
  description:
    "De Tafelaar: shared dining, borrel & diner in Amersfoort centrum. Kleine gerechten van lokale makers, vlakbij Flint. Wo-zo geopend.",
  openGraph: {
    title: "De Tafelaar | Restaurant Amersfoort",
    description:
      "Shared dining, borrel & diner in Amersfoort centrum. Lokale gerechten, vlakbij Flint.",
    images: [{ url: "/pics/homepage.png" }],
  },
  keywords: [
    "restaurant amersfoort",
    "restaurant amersfoort centrum",
    "shared dining amersfoort",
    "uit eten amersfoort",
    "borrel amersfoort",
    "diner amersfoort",
    "gezellig restaurant amersfoort",
    "restaurant vlakbij flint",
    "kleine gerechten amersfoort",
    "lokaal eten amersfoort",
    "duurzaam restaurant amersfoort",
    "beste restaurant amersfoort",
  ],
};

const HIGHLIGHT_ICONS = {
  sharedDining: UtensilsCrossed,
  makers: Users,
  sustainable: Leaf,
  location: MapPin,
} as const;

type HighlightIconKey = keyof typeof HIGHLIGHT_ICONS;

function homeFaqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Wat is shared dining bij De Tafelaar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shared dining betekent dat je kleine gerechten bestelt om samen te delen aan tafel. Bij De Tafelaar kies je uit kazen, charcuterie, koude en warme gerechten en desserts — allemaal gemaakt met verse, lokale ingrediënten uit de regio Amersfoort.",
        },
      },
      {
        "@type": "Question",
        name: "Waar zit De Tafelaar in Amersfoort?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "De Tafelaar zit op de Kamp 8 in het centrum van Amersfoort, op 400 meter (2 minuten lopen) van Theater de Flint.",
        },
      },
      {
        "@type": "Question",
        name: "Hoe kan ik reserveren bij De Tafelaar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reserveer via de widget op onze website of bel +31 6 341 279 32. Voor groepen vanaf 7 personen bieden we een Chef's Choice arrangement aan.",
        },
      },
      {
        "@type": "Question",
        name: "Wat zijn de openingstijden van De Tafelaar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Woensdag en donderdag 17:00-23:00, vrijdag en zaterdag 15:00-00:00, zondag 17:00-23:00. Maandag en dinsdag gesloten.",
        },
      },
      {
        "@type": "Question",
        name: "Heeft De Tafelaar vegetarische en vegan opties?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, meerdere vegetarische en vegan gerechten op de kaart: carpaccio van bieten, Japanse curry, Bao Bun Inari en een vegan Snicker als dessert.",
        },
      },
      {
        "@type": "Question",
        name: "Kan ik De Tafelaar huren voor een feest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, beschikbaar voor feesten en bedrijfsdiners tot circa 100 personen. Chef's Choice arrangement EUR 45 p.p., optioneel met wijnarrangement.",
        },
      },
      {
        "@type": "Question",
        name: "Biedt De Tafelaar catering aan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, catering voor kantoorlunches, zakelijke events en walking dinners in de regio Amersfoort.",
        },
      },
    ],
  });
}

function homeBreadcrumbJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tafelaaramersfoort.nl" },
    ],
  });
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeFaqJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeBreadcrumbJsonLd() }} />
      <div className="flex flex-col">
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

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center text-white">
          {homeContent.hero.kicker ? (
            <p className="mb-2 text-xs uppercase tracking-[0.25em] text-white/80 sm:text-sm">
              {homeContent.hero.kicker}
            </p>
          ) : null}

          <h1
            id="home-hero-title"
            className="font-headline text-3xl leading-tight tracking-wide sm:text-4xl md:text-6xl lg:text-7xl max-w-4xl"
          >
            {homeContent.hero.headline}
          </h1>

          <p className="mt-3 max-w-xl text-base text-white/90 sm:text-lg">
            {homeContent.hero.subhead}
          </p>

          {/* Explicit entity definition: subtle but visible for AI/SEO */}
          <p className="mt-2 max-w-2xl text-sm text-white/75">
            {homeContent.hero.entityDefinition}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:gap-4">
            {/* Primary CTA */}
            <ReserveerButton size="lg" className="min-h-11" label={homeContent.ctas.primaryLabel} />

            {/* Secondary CTA – always visible */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-11 border border-white/60 bg-white/10 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
                {homeContent.ctas.secondaryLabel}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-11 border border-white/60 bg-white/10 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <Link href="/agenda" prefetch={false}>
                Agenda
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= MOEDERDAG HIGH TEA BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-fuchsia-950/30">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <Link
            href="/updates/moederdag-high-tea-amersfoort-2026"
            className="group flex items-center justify-center gap-3 text-center transition-transform hover:scale-[1.01]"
          >
            <span className="text-2xl" role="img" aria-label="Bloemen">💐</span>
            <span className="font-headline text-sm font-semibold tracking-wide text-pink-900 dark:text-pink-200 sm:text-base">
              Moederdag High Tea — zondag 11 mei
            </span>
            <span className="text-xs font-medium text-pink-700 dark:text-pink-400 sm:text-sm">
              → Reserveer nu
            </span>
            <span className="text-2xl" role="img" aria-label="Theepot">🫖</span>
          </Link>
        </div>
      </section>

      <div className="space-y-12 py-12 sm:space-y-16 sm:py-16 md:space-y-24 md:py-24">
        {/* ================= HIGHLIGHTS ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="sr-only">
            Hoogtepunten
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {homeContent.highlights.map((highlight: { iconKey: string; title: string; description: string; }, index: number) => {
              const key = highlight.iconKey as HighlightIconKey;
              const Icon = HIGHLIGHT_ICONS[key] ?? UtensilsCrossed;

              return (
                <Card
                  key={`${highlight.iconKey}-${index}`}
                  className="rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex h-full min-h-[220px] flex-col text-center">
                    <CardHeader className="pb-2">
                      <div className="mx-auto w-fit rounded-full bg-primary/10 p-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="pt-4 font-headline text-xl">
                        {highlight.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1">
                      <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
                        {highlight.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ================= BUURTGIDS CTA ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="buurtgids-title">
          <div className="rounded-2xl bg-secondary/20 px-6 py-8 ring-1 ring-border sm:px-8 sm:py-10 md:px-10 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h2 id="buurtgids-title" className="font-headline text-2xl text-foreground md:text-3xl">
                  Op weg naar Flint of het centrum?
                </h2>
                <p className="mt-2 text-muted-foreground max-w-prose">
                  Onze Buurtgids helpt je de beste plekken te vinden voor en na je theaterbezoek, of om de leukste hotspots op de Kamp te ontdekken.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Theater className="h-4 w-4 text-primary" />
                    <span>Dichtbij Flint</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Hotspots in de straat Kamp</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-start md:justify-end">
                <Button asChild size="lg">
                  <Link href="/buurtgids">
                    Open Buurtgids
                    <Map className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>


        {/* ================= DISCOVER MORE ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="discover-title">
          <h2 id="discover-title" className="font-headline text-2xl text-foreground md:text-3xl mb-6 text-center">
            Restaurant in Amersfoort centrum
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground text-center mb-8">
            De Tafelaar is een shared dining restaurant op de Kamp in het hart van Amersfoort.
            Op loopafstand van station Amersfoort (5 min), Theater de Flint (2 min) en de Koppelpoort.
            Woensdag t/m zondag geopend voor borrel, diner en groepen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { href: "/bourgondisch-eten-amersfoort", label: "Bourgondisch eten" },
              { href: "/eten-voor-theater-de-flint", label: "Eten bij Flint" },
              { href: "/borrel-amersfoort", label: "Borrelen" },
              { href: "/romantisch-diner-amersfoort", label: "Romantisch diner" },
              { href: "/vegetarisch-amersfoort", label: "Vegetarisch" },
              { href: "/duurzaam-restaurant-amersfoort", label: "Duurzaam eten" },
              { href: "/feestlocatie-amersfoort", label: "Feestlocatie" },
              { href: "/catering", label: "Catering" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border bg-card px-3 py-2.5 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8 text-center" aria-labelledby="how-title">
          <h2 id="how-title" className="mb-4 font-headline text-2xl sm:text-3xl md:text-4xl">
            {homeContent.howItWorks.title}
          </h2>
          <p className="mx-auto max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
            {homeContent.howItWorks.description}
          </p>
        </section>

        {/* ================= STORY / CTA ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="story-title">
          <div className="rounded-2xl bg-primary/5 px-6 py-8 ring-1 ring-border sm:px-8 sm:py-10 md:px-10 md:py-12">
            <div className="text-center">
              <h2 id="story-title" className="font-headline text-2xl text-foreground md:text-3xl">
                {homeContent.story.title}
              </h2>
            </div>

            <div className="mx-auto mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {homeContent.story.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ReserveerButton size="lg" label={homeContent.ctas.primaryLabel} />
              <Button asChild size="lg" variant="outline">
                <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
                  {homeContent.ctas.secondaryLabel}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

