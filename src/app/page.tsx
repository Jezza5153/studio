// app/page.tsx: homepage in "De Tafelaar Compositie" (mockup 21)
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";
import { Kicker, SectionLabel, Chip, Sticker, Ticker } from "@/components/compositie";
import { getGoogleRating, type GoogleRating } from "@/lib/google-rating";
import { MAANDEN, huidigeMaandIndex, seizoenLabel } from "@/lib/seizoen";
import { homeContent, makers, makersIntro, contactDetails, openingHours } from "@/content/site-content";

export const dynamic = "force-static";
export const revalidate = 3600; // score/aantal uit het admin-paneel en het seizoenslabel verversen elk uur

export async function generateMetadata(): Promise<Metadata> {
  const g = await getGoogleRating();
  return {
    title: "De Tafelaar | Restaurant Amersfoort, Lekker Eten & Shared Dining",
    description: `Restaurant in Amersfoort: De Tafelaar op de Kamp. Shared dining voor lunch, borrel en diner met lokale seizoensgerechten. Ook Tafelaar Thuis (ophalen). ${g.ratingText} op Google. Op 5 min van de Flint. Wo t/m zo open.`,
    alternates: { canonical: "/" },
    openGraph: {
      title: "De Tafelaar | Restaurant Amersfoort, Lekker Eten & Shared Dining",
      description: `Restaurant in Amersfoort: shared dining voor lunch, borrel en diner met lokale seizoensgerechten op de Kamp. Ook Tafelaar Thuis (ophalen). ${g.ratingText} op Google. Op 5 min van de Flint.`,
      images: [{ url: "/pics/terras-kamp.jpg" }],
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
      "afhalen amersfoort",
    ],
  };
}

function buildHomeFaqs(g: GoogleRating) {
  return [
    {
      question: "Waar kan ik lekker eten in Amersfoort?",
      answer: `De Tafelaar op de Kamp 8 is een van de best beoordeelde restaurants in Amersfoort (${g.ratingText} op Google). We serveren shared dining: gerechten die zo zijn samengesteld dat je ze makkelijk deelt, gemaakt met seizoensgebonden producten van lokale makers. Van €3,50 tot €15,50 per gerecht, gemiddeld €25-35 p.p. Open woensdag t/m zondag.`,
    },
    {
      question: "Wat is shared dining bij De Tafelaar?",
      answer: "Shared dining betekent dat je meerdere gerechten bestelt om samen te delen aan tafel; ze zijn samengesteld om makkelijk te delen. Kies uit kazen, charcuterie, koude en warme gerechten en desserts, gemaakt met verse, lokale ingrediënten uit de regio Amersfoort. We adviseren 2 à 3 gerechten per persoon.",
    },
    {
      question: "Waar zit De Tafelaar in Amersfoort?",
      answer: "De Tafelaar zit op de Kamp 8 in het centrum van Amersfoort, op 5 minuten lopen van Theater de Flint. Vanaf station Amersfoort Centraal is het ongeveer 22 minuten lopen, of korter met bus of fiets. Parkeergarage Beestenmarkt is op 2 minuten loopafstand.",
    },
    {
      question: "Hoe kan ik reserveren bij De Tafelaar?",
      answer: "Reserveer via de widget op onze website of bel +31 6 341 279 32. Reserveren is aan te raden, vooral op vrijdag en zaterdag. Walk-ins zijn welkom als er plek is.",
    },
    {
      question: "Wat zijn de openingstijden van De Tafelaar?",
      answer: "Woensdag en donderdag 17:00-23:00, vrijdag en zaterdag 11:00-00:00, zondag 11:00-23:00. Maandag en dinsdag gesloten. Lunch op vrijdag, zaterdag en zondag.",
    },
    {
      question: "Kan ik De Tafelaar huren voor een feest?",
      answer: "Ja, beschikbaar voor feesten en bedrijfsdiners tot circa 100 personen. Chef's Choice arrangement €48 p.p., optioneel met wijnarrangement.",
    },
    {
      question: "Biedt De Tafelaar catering aan?",
      answer: "Ja, catering voor kantoorlunches, zakelijke events en walking dinners in de regio Amersfoort.",
    },
    {
      question: "Is De Tafelaar het beste restaurant in Amersfoort?",
      answer: `Met een ${g.ratingText} op Google en ${g.countText} reviews is De Tafelaar een van de best beoordeelde restaurants in Amersfoort. Gasten waarderen het unieke shared dining concept, de lokale ingrediënten en de persoonlijke sfeer. Bekijk onze reviews op Google of op onze impressie-pagina.`,
    },
  ];
}

function homeFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

const TICKER = ["Shared dining", "Lokale makers", "Seizoensgebonden", "Lunch, borrel & diner", "Tafelaar Thuis: ophalen", "Kamp 8 Amersfoort"];

const CHIPS = [
  { href: "/beste-restaurant-amersfoort", label: "Beste restaurant" },
  { href: "/ophalen", label: "Tafelaar Thuis (ophalen)" },
  { href: "/borrel-amersfoort", label: "Borrelen" },
  { href: "/romantisch-diner-amersfoort", label: "Romantisch diner" },
  { href: "/bourgondisch-eten-amersfoort", label: "Bourgondisch eten" },
  { href: "/vegetarisch-amersfoort", label: "Vegetarisch" },
  { href: "/duurzaam-restaurant-amersfoort", label: "Duurzaam eten" },
  { href: "/eten-voor-theater-de-flint", label: "Eten bij de Flint" },
  { href: "/feestlocatie-amersfoort", label: "Feestlocatie" },
  { href: "/catering", label: "Catering" },
];

const OOK = [
  {
    href: "/catering",
    title: "Catering",
    text: "Catering voor kantoorlunches, zakelijke events en walking dinners in de regio Amersfoort.",
    cta: "Meer over catering →",
  },
  {
    href: "/verhuur-en-groepen",
    title: "Ruimte verhuur",
    text: "Beschikbaar voor feesten en bedrijfsdiners tot circa 100 personen. Op andere dagen in overleg.",
    cta: "Verhuur & groepen →",
  },
  {
    href: "/feestlocatie-amersfoort",
    title: "Feest of borrel met een grote groep",
    text: "Vanaf 7 personen bieden we het Chef's Choice arrangement aan (€48 p.p.), optioneel met wijnarrangement (€28 p.p.).",
    cta: "Feestlocatie Amersfoort →",
  },
];

const VAK = "border-b-[5px] border-foreground";
const KAART = "border-2 border-foreground bg-white shadow-[5px_5px_0_hsl(var(--foreground))]";

export default async function Home() {
  const g = await getGoogleRating();
  const homeFaqs = buildHomeFaqs(g);
  const maandNu = huidigeMaandIndex();
  const seizoen = seizoenLabel();

  const headlineWords = homeContent.hero.headline.split(" ");
  const headlineLast = headlineWords.pop();
  const headlineStart = headlineWords.join(" ");
  const [tagStart, ...tagRest] = homeContent.hero.tagline.split(". ");
  const tagEnd = tagRest.join(". ");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeFaqJsonLd(homeFaqs) }} />

      {/* ================= HERO: vier vlakken ================= */}
      <section className="border-b-[5px] border-foreground" aria-labelledby="home-hero-title">
        <div className="grid grid-cols-1 md:min-h-[76svh] md:grid-cols-[1.3fr_.7fr] md:grid-rows-[auto_auto]">
          <div className={`${VAK} flex flex-col justify-center bg-background px-6 py-9 md:border-r-[5px] md:px-10 md:py-12`}>
            <div>
              <Kicker>{homeContent.hero.kicker}</Kicker>
            </div>
            <h1
              id="home-hero-title"
              className="my-5 max-w-[15ch] font-headline text-[clamp(36px,5.4vw,72px)] font-black leading-[1.05] tracking-tight"
            >
              {headlineStart} <em className="font-bold italic text-primary">{headlineLast}</em>
            </h1>
            <p className="text-[clamp(17px,2vw,22px)] font-medium text-muted-foreground">
              {tagStart}.{" "}
              {tagEnd ? <b className="inline-block bg-secondary px-2 py-0.5 text-foreground">{tagEnd}</b> : null}
            </p>
          </div>

          <div className={`${VAK} relative min-h-[280px] bg-secondary md:min-h-[300px]`}>
            <Sticker rating={g.ratingText} count={g.countText} className="absolute right-4 top-4 z-10 md:right-6 md:top-6" />
            <Image
              src="/pics/terras-kamp.jpg"
              alt="Het terras van De Tafelaar op de Kamp in Amersfoort, in de zon"
              fill
              priority
              sizes="(min-width: 768px) 35vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className={`${VAK} flex flex-col justify-center bg-white px-6 py-9 md:border-b-0 md:border-r-[5px] md:px-10 md:py-12`}>
            <p className="max-w-[52ch] text-[15.5px] text-muted-foreground">{homeContent.hero.subhead}</p>
            <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <ReserveerButton size="lg" className="w-full sm:w-auto" label={homeContent.ctas.primaryLabel} />
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
                  {homeContent.ctas.secondaryLabel} →
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/agenda" prefetch={false}>
                  Agenda →
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-accent px-6 py-8 text-background md:px-9">
            <h3 className="flex items-center gap-2.5 font-headline text-[21px] font-extrabold">
              <span aria-hidden className="text-[12px] text-primary">●</span>
              Nu op tafel: {seizoen}
            </h3>
            <p className="mt-2 max-w-[38ch] text-sm text-background/90">
              De kaart beweegt mee met het seizoen: wat de makers deze weken oogsten, proef je op tafel.
            </p>
            <div className="mt-4 flex flex-wrap gap-1" aria-label="Seizoenskalender">
              {MAANDEN.map((m, i) => (
                <span
                  key={m}
                  className={
                    i === maandNu
                      ? "border-[1.5px] border-background bg-background px-2 py-1 text-[10.5px] font-bold tracking-wide text-foreground"
                      : "border-[1.5px] border-background/45 px-2 py-1 text-[10.5px] font-bold tracking-wide"
                  }
                >
                  {m}
                </span>
              ))}
            </div>
            <Link href="/menu" className="mt-4 inline-block self-start border-b-2 border-primary pb-0.5 text-[13px] font-bold">
              Bekijk de seizoenskaart →
            </Link>
          </div>
        </div>
      </section>

      <Ticker items={TICKER} />

      {/* ================= USPs ================= */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:px-8" aria-labelledby="usp-title">
        <SectionLabel id="usp-title">Eten zoals het bedoeld is: samen</SectionLabel>
        <div className="grid grid-cols-1 gap-[5px] border-[5px] border-foreground bg-foreground sm:grid-cols-2 lg:grid-cols-4">
          {homeContent.highlights.map((h, i) => (
            <div key={h.title} className={`p-7 transition-colors hover:bg-secondary ${i === 1 ? "bg-secondary" : "bg-white"}`}>
              <h3 className="font-headline text-[17px] font-extrabold">{h.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LOKALE MAKERS ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="makers-title">
        <SectionLabel id="makers-title" balk="salie">Onze lokale makers</SectionLabel>
        <p className="-mt-3 mb-8 max-w-[70ch] text-[15.5px] text-muted-foreground">{makersIntro.lead}</p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {makers.map((m) => (
            <Link
              key={m.slug}
              href={`/over-onze-makers#${m.slug}`}
              className={`${KAART} relative block p-6 transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--foreground))]`}
            >
              <span
                aria-hidden
                className="absolute right-3 top-3 border-2 border-foreground bg-primary px-2.5 py-1 text-[9.5px] font-extrabold tracking-[0.16em] text-white"
              >
                LOKAAL
              </span>
              <h3 className="pr-16 font-headline text-[19px] font-extrabold">{m.name}</h3>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                {m.category}
                {m.location ? ` · ${m.location}` : ""}
              </p>
              <p className="mt-2.5 text-[13.5px] text-muted-foreground">{m.blurb}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/over-onze-makers">Leer hun verhaal kennen →</Link>
          </Button>
        </div>
      </section>

      {/* ================= FOTO-COMPOSITIE ================= */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8" aria-label="Impressie van De Tafelaar">
        <div className="grid grid-cols-1 gap-[5px] border-[5px] border-foreground bg-foreground md:grid-cols-[2fr_1fr] md:grid-rows-[240px_240px]">
          <figure className="relative h-[220px] md:row-span-2 md:h-auto">
            <Image src="/pics/huiskamer-vol.jpg" alt="De volle huiskamer van De Tafelaar op de Kamp 8, gasten aan tafel" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-foreground px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-background">De huiskamer</figcaption>
          </figure>
          <figure className="relative h-[220px] md:h-auto">
            <Image src="/pics/gerecht-boven.jpg" alt="Gerecht om te delen bij De Tafelaar met lokale seizoensproducten" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
            <figcaption className="absolute bottom-0 left-0 bg-foreground px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-background">Van de kaart</figcaption>
          </figure>
          <div className="grid h-[160px] place-items-center bg-primary p-5 text-center font-headline text-[22px] font-extrabold leading-tight text-white md:h-auto">
            <span>
              Proef.
              <br />
              Deel.
              <br />
              Geniet.
            </span>
          </div>
        </div>
      </section>

      {/* ================= BUURTGIDS ================= */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:px-8" aria-labelledby="buurtgids-title">
        <div className="grid grid-cols-[14px_1fr] border-[5px] border-foreground bg-white shadow-[8px_8px_0_hsl(var(--foreground))] md:grid-cols-[14px_1.6fr_1fr]">
          <div aria-hidden className="bg-primary" />
          <div className="px-7 py-10 md:px-10">
            <h2 id="buurtgids-title" className="font-headline text-[clamp(26px,3.8vw,46px)] font-extrabold leading-none tracking-tight">
              Op weg naar de Flint of het centrum?
            </h2>
            <p className="mt-3 max-w-[52ch] text-muted-foreground">
              Onze Buurtgids helpt je de beste plekken te vinden voor en na je theaterbezoek, of om de leukste hotspots op de Kamp te ontdekken.
            </p>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              <li>
                <span className="text-primary">→ </span>Dichtbij de Flint
              </li>
              <li>
                <span className="text-primary">→ </span>Hotspots in de straat Kamp
              </li>
            </ul>
          </div>
          <div className="col-span-2 grid place-items-center border-t-[5px] border-foreground bg-secondary p-8 md:col-span-1 md:border-l-[5px] md:border-t-0">
            <Button asChild variant="outline">
              <Link href="/buurtgids">Open Buurtgids →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= RESTAURANT IN AMERSFOORT CENTRUM ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="seo-title">
        <SectionLabel id="seo-title">Restaurant in Amersfoort centrum</SectionLabel>
        <div className="max-w-[760px] space-y-4 text-[15.5px] text-muted-foreground">
          <p>
            De Tafelaar is een shared dining restaurant op de Kamp in het hart van Amersfoort centrum. Op zoek naar een plek om lekker te eten in Amersfoort? We serveren gerechten van lokale makers, samengesteld om te delen: van kazen en charcuterie tot warme seizoensgerechten en desserts. Alles om gezellig samen te delen aan tafel. Op loopafstand van Theater de Flint (5 min) en op een steenworp afstand van de Kamperbinnenpoort. Vanaf station Amersfoort Centraal ben je in circa 22 minuten lopend bij ons, of korter met bus of fiets.
          </p>
          <p>
            Gerechten variëren van €3,50 tot €15,50. Reken op €25-35 per persoon voor een compleet diner. Kies je het Chef&apos;s Choice arrangement (€48 p.p.), dan laat je je verrassen door de keuken. Woensdag t/m zondag open voor borrel en diner, vrijdag t/m zondag ook voor lunch. Liever thuis genieten? Bekijk de kaart van{" "}
            <Link href="/ophalen" className="font-bold text-primary underline underline-offset-4">Tafelaar Thuis</Link>, onze ophaalservice.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-3">
          {OOK.map((k) => (
            <Link
              key={k.href}
              href={k.href}
              className={`${KAART} block p-6 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_hsl(var(--foreground))]`}
            >
              <h3 className="font-headline text-[18px] font-extrabold">{k.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{k.text}</p>
              <span className="mt-3 inline-block text-[13px] font-bold text-primary">{k.cta}</span>
            </Link>
          ))}
        </div>

        <nav className="mt-9 flex flex-wrap gap-3" aria-label="Ontdek meer pagina's">
          {CHIPS.map((c) => (
            <Chip key={c.href} href={c.href}>
              {c.label}
            </Chip>
          ))}
        </nav>
      </section>

      {/* ================= ZO WERKT HET ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="how-title">
        <div className="grid grid-cols-1 border-[5px] border-foreground bg-white md:grid-cols-2">
          <div className="relative min-h-[280px] border-b-[5px] border-foreground md:min-h-[380px] md:border-b-0 md:border-r-[5px]">
            <Image src="/pics/gasten-bar.jpg" alt="Gasten aan de bar van De Tafelaar, de keuken op de achtergrond" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-7 py-9 md:px-12 md:py-12">
            <Kicker>Zo werkt het</Kicker>
            <h2 id="how-title" className="mt-4 font-headline text-[clamp(24px,3vw,36px)] font-extrabold leading-tight">
              {homeContent.howItWorks.title}
            </h2>
            <p className="mt-4 text-[15px] text-muted-foreground">{homeContent.howItWorks.description}</p>
          </div>
        </div>
      </section>

      {/* ================= ONS VERHAAL ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="story-title">
        <div className="grid grid-cols-1 border-[5px] border-foreground bg-white md:grid-cols-2">
          <div className="relative order-first min-h-[280px] border-b-[5px] border-foreground md:order-last md:min-h-[420px] md:border-b-0 md:border-l-[5px]">
            <Image src="/pics/borrelplank.jpg" alt="Borrelplank met kaas, charcuterie en een glas wijn bij De Tafelaar" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="px-7 py-9 md:px-12 md:py-12">
            <Kicker>Ons verhaal</Kicker>
            <h2 id="story-title" className="mt-4 font-headline text-[clamp(24px,3vw,36px)] font-extrabold leading-tight">
              {homeContent.story.title}
            </h2>
            <div className="mt-4 space-y-3.5 text-[15px] text-muted-foreground">
              {homeContent.story.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "font-headline text-[18px] font-bold italic text-foreground" : undefined}>
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <ReserveerButton className="w-full sm:w-auto" label={homeContent.ctas.primaryLabel} />
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={homeContent.ctas.secondaryHref} prefetch={false}>
                  {homeContent.ctas.secondaryLabel} →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OPENINGSTIJDEN & LOCATIE ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="info-title">
        <SectionLabel id="info-title" balk="zand">Openingstijden &amp; locatie</SectionLabel>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className={KAART}>
            <div className="border-b-2 border-foreground bg-secondary px-6 py-4 font-headline text-[17px] font-extrabold">Openingstijden</div>
            <table className="w-full text-sm">
              <tbody>
                {openingHours.schedule.map((row) => (
                  <tr key={row.day} className="border-b border-dashed border-border last:border-b-0">
                    <td className="px-6 py-2.5">{row.day}</td>
                    <td className={`px-6 py-2.5 text-right font-semibold tabular-nums ${row.time === "Gesloten" ? "text-primary" : ""}`}>{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={KAART}>
            <div className="border-b-2 border-foreground bg-accent px-6 py-4 font-headline text-[17px] font-extrabold text-background">Locatie</div>
            <address className="space-y-2 px-6 py-5 text-sm not-italic text-muted-foreground">
              <p className="text-base font-bold text-foreground">De Tafelaar</p>
              <p>Kamp 8, 3811 AR Amersfoort</p>
              <p>5 min lopen van Theater de Flint</p>
              <p>~22 min lopen van Station Amersfoort (korter met bus/fiets)</p>
              <p className="pt-2">
                <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="font-bold text-primary">
                  {contactDetails.phone}
                </a>
              </p>
            </address>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 md:px-8" aria-labelledby="faq-title">
        <SectionLabel id="faq-title">Veelgestelde vragen over De Tafelaar</SectionLabel>
        <div className="mx-auto max-w-[780px]">
          {homeFaqs.map((faq, i) => (
            <details key={faq.question} open={i === 0} className="group -mb-0.5 border-2 border-foreground bg-white open:bg-background">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-[15.5px] font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="font-semibold">{faq.question}</h3>
                <span aria-hidden className="shrink-0 font-headline text-2xl font-black text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] px-6 pb-6 text-[14.5px] text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
