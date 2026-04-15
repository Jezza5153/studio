
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
  Clock,
  Phone,
} from "lucide-react";
import { ReserveerButton } from "@/components/reserveer-button";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "De Tafelaar | Restaurant Amersfoort — Lekker Eten & Shared Dining",
  description:
    "Restaurant in Amersfoort: De Tafelaar op de Kamp. Shared dining voor lunch, borrel en diner met lokale seizoensgerechten. 4.8 op Google. Op 2 min van Flint. Wo–zo open.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "De Tafelaar | Restaurant Amersfoort — Lekker Eten & Shared Dining",
    description:
      "Restaurant in Amersfoort: shared dining voor lunch, borrel en diner met lokale seizoensgerechten op de Kamp. 4.8 op Google. Op 2 min van Flint.",
    images: [{ url: "/pics/homepage.png" }],
  },
  keywords: [
    "restaurant amersfoort",
    "restaurants amersfoort",
    "eten in amersfoort",
    "lekker eten amersfoort",
    "uit eten amersfoort",
    "restaurant amersfoort centrum",
    "shared dining amersfoort",
    "gezellig eten amersfoort",
    "goed restaurant amersfoort",
    "waar eten in amersfoort",
    "borrel amersfoort",
    "beste restaurant amersfoort",
    "lunch amersfoort",
    "brunch amersfoort",
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
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

const homeFaqs = [
  {
    question: "Waar kan ik lekker eten in Amersfoort?",
    answer: "De Tafelaar op de Kamp 8 is een van de best beoordeelde restaurants in Amersfoort (4.8 op Google). We serveren shared dining: kleine gerechten om te delen, gemaakt met seizoensgebonden producten van lokale makers. Van €3,50 tot €15 per gerecht, gemiddeld €25–35 p.p. Open woensdag t/m zondag.",
  },
  {
    question: "Wat is shared dining bij De Tafelaar?",
    answer: "Shared dining betekent dat je kleine gerechten bestelt om samen te delen aan tafel. Kies uit kazen, charcuterie, koude en warme gerechten en desserts — gemaakt met verse, lokale ingrediënten uit de regio Amersfoort. We adviseren 3 tot 5 gerechten per persoon.",
  },
  {
    question: "Waar zit De Tafelaar in Amersfoort?",
    answer: "De Tafelaar zit op de Kamp 8 in het centrum van Amersfoort, op 2 minuten lopen van Theater de Flint en 5 minuten van station Amersfoort Centraal. Parkeergarage Koestraat is op 1 minuut loopafstand.",
  },
  {
    question: "Hoe kan ik reserveren bij De Tafelaar?",
    answer: "Reserveer via de widget op onze website of bel +31 6 341 279 32. Reserveren is aan te raden, vooral op vrijdag en zaterdag. Walk-ins zijn welkom als er plek is.",
  },
  {
    question: "Wat zijn de openingstijden van De Tafelaar?",
    answer: "Woensdag en donderdag 17:00-23:00, vrijdag 15:00-00:00, zaterdag 11:00-00:00, zondag 11:00-15:00. Maandag en dinsdag gesloten.",
  },
  {
    question: "Kan ik De Tafelaar huren voor een feest?",
    answer: "Ja, beschikbaar voor feesten en bedrijfsdiners tot circa 100 personen. Chef's Choice arrangement EUR 45 p.p., optioneel met wijnarrangement.",
  },
  {
    question: "Biedt De Tafelaar catering aan?",
    answer: "Ja, catering voor kantoorlunches, zakelijke events en walking dinners in de regio Amersfoort.",
  },
  {
    question: "Is De Tafelaar het beste restaurant in Amersfoort?",
    answer: "Met een 4.8 op Google en 90+ reviews is De Tafelaar een van de best beoordeelde restaurants in Amersfoort. Gasten waarderen het unieke shared dining concept, de lokale ingrediënten en de persoonlijke sfeer. Bekijk onze reviews op Google of op onze impressie-pagina.",
  },
  {
    question: "Kan ik bij De Tafelaar lunchen in Amersfoort?",
    answer: "Ja, op zaterdag zijn we open vanaf 11:00 en op zondag van 11:00 tot 15:00 — ideaal voor een lunch of late brunch in Amersfoort centrum. Shared dining werkt uitstekend voor lunch: 2-3 kleine gerechten per persoon (EUR 15-25 p.p.) of uitgebreider voor een brunch (EUR 25-35 p.p.).",
  },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeFaqJsonLd() }} />
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
            className="font-headline text-2xl leading-tight tracking-wide sm:text-3xl md:text-5xl lg:text-6xl max-w-4xl"
          >
            {homeContent.hero.headline}
          </h1>

          <p className="mt-3 max-w-xl font-headline text-lg text-white/95 sm:text-xl md:text-2xl">
            {homeContent.hero.tagline}
          </p>

          <p className="mt-3 max-w-2xl text-base text-white/85 sm:text-lg">
            {homeContent.hero.subhead}
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
            href="/moederdag-high-tea-amersfoort"
            className="group flex items-center justify-center gap-3 text-center transition-transform hover:scale-[1.01]"
          >
            <span className="text-2xl" role="img" aria-label="Bloemen">💐</span>
            <span className="font-headline text-sm font-semibold tracking-wide text-pink-900 dark:text-pink-200 sm:text-base">
              Moederdag High Tea — zondag 10 mei
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
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground text-center mb-8 space-y-3">
            <p>
              De Tafelaar is een shared dining restaurant op de Kamp in het hart van Amersfoort centrum.
              Op zoek naar een plek om lekker te eten in Amersfoort? We serveren kleine gerechten
              van lokale makers — van kazen en charcuterie tot warme seizoensgerechten en desserts. Alles om
              gezellig samen te delen aan tafel. Op loopafstand van station Amersfoort (5 min), Theater de Flint
              (2 min) en de Koppelpoort.
            </p>
            <p>
              Gerechten variëren van €3,50 tot €15. Reken op €25–35 per persoon voor een compleet diner,
              of kom lunchen op zaterdag (vanaf 11:00) of zondag (11:00–15:00). Het Chef&apos;s Choice
              arrangement (€45 p.p.) laat de keuken verrassen. Woensdag t/m zondag open voor lunch,
              borrel en diner.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { href: "/beste-restaurant-amersfoort", label: "Beste restaurant" },
              { href: "/lunch-amersfoort", label: "Lunch" },
              { href: "/borrel-amersfoort", label: "Borrelen" },
              { href: "/romantisch-diner-amersfoort", label: "Romantisch diner" },
              { href: "/bourgondisch-eten-amersfoort", label: "Bourgondisch eten" },
              { href: "/vegetarisch-amersfoort", label: "Vegetarisch" },
              { href: "/duurzaam-restaurant-amersfoort", label: "Duurzaam eten" },
              { href: "/eten-voor-theater-de-flint", label: "Eten bij Flint" },
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

        {/* ================= OPENING HOURS & LOCATION ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="info-title">
          <h2 id="info-title" className="font-headline text-2xl text-foreground md:text-3xl mb-6 text-center">
            Openingstijden &amp; locatie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="rounded-2xl border p-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Clock className="h-5 w-5" />
                <CardTitle className="text-lg">Openingstijden</CardTitle>
              </div>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between"><dt>Maandag – dinsdag</dt><dd className="text-muted-foreground">Gesloten</dd></div>
                <div className="flex justify-between"><dt>Woensdag – donderdag</dt><dd className="text-muted-foreground">17:00 – 23:00</dd></div>
                <div className="flex justify-between"><dt>Vrijdag</dt><dd className="text-muted-foreground">15:00 – 00:00</dd></div>
                <div className="flex justify-between"><dt>Zaterdag</dt><dd className="text-muted-foreground">11:00 – 00:00</dd></div>
                <div className="flex justify-between"><dt>Zondag</dt><dd className="text-muted-foreground">11:00 – 15:00</dd></div>
              </dl>
            </Card>
            <Card className="rounded-2xl border p-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <MapPin className="h-5 w-5" />
                <CardTitle className="text-lg">Locatie</CardTitle>
              </div>
              <address className="not-italic text-sm space-y-2">
                <p className="font-medium">De Tafelaar</p>
                <p className="text-muted-foreground">Kamp 8, 3811 AR Amersfoort</p>
                <p className="text-muted-foreground">2 min lopen van Theater de Flint</p>
                <p className="text-muted-foreground">5 min lopen van Station Amersfoort</p>
              </address>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+31634127932" className="text-muted-foreground hover:text-foreground">+31 6 341 279 32</a>
              </div>
            </Card>
          </div>
        </section>

        {/* ================= FAQ (visible) ================= */}
        <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-labelledby="faq-title">
          <h2 id="faq-title" className="font-headline text-2xl text-foreground md:text-3xl mb-6 text-center">
            Veelgestelde vragen over De Tafelaar
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {homeFaqs.map((faq, i) => (
              <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

