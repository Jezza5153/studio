// app/catering/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ChefHat,
  Leaf,
  MapPin,
  MessageSquare,
  Package,
  PartyPopper,
  Phone,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from "lucide-react";

export const dynamic = "force-static";

const SITE_URL = "https://tafelaaramersfoort.nl";
const JEZZA_URL = "https://www.jezzacooks.com";

export const metadata: Metadata = {
  title: "Catering Amersfoort | Office Lunch & Zakelijk | Tafelaar × Jezza Cooks",
  description:
    "Catering in Amersfoort centrum: office lunch vanaf €7,50 p.p., walking dinners en events tot 150 personen. Tafelaar × Jezza Cooks — bereid in onze restaurantkeuken op Kamp 8. Bezorgd op kantoor.",
  alternates: { canonical: "/catering" },
  openGraph: {
    title: "Catering Amersfoort | Tafelaar × Jezza Cooks",
    description:
      "Office lunch, walking dinner en event catering uit onze restaurantkeuken op de Kamp. Vanaf €7,50 p.p., 10–150+ personen.",
  },
  keywords: [
    "catering amersfoort",
    "catering amersfoort centrum",
    "office lunch amersfoort",
    "zakelijke catering amersfoort",
    "bedrijfscatering amersfoort",
    "lunch bezorgen amersfoort",
    "kantoorlunch amersfoort",
    "walking dinner amersfoort",
    "event catering amersfoort",
    "bedrijfslunch bestellen amersfoort",
    "catering de hoef",
    "catering vathorst",
    "catering de wieken",
    "catering leusden",
    "catering soest",
  ],
};

// ===== FAQ =====
// Questions are phrased the way people actually type them (including long-tail
// like "cateren jullie op bedrijventerrein De Hoef"). FAQs are the single most
// AI-citable block on the page — each answer is self-contained and factual.
const faqs = [
  {
    question: "Wat kost office lunch catering in Amersfoort?",
    answer:
      "Broodjes en wraps vanaf €7,50 p.p., bowls vanaf €10,50 p.p. Lunchboxen: Classic €14,50, Veggie €13,50, Premium €18,50. Reken op €12–€18 p.p. voor een complete vergaderlunch, afhankelijk van aantal gerechten en dieetwensen.",
  },
  {
    question: "Vanaf hoeveel personen kan ik catering bestellen?",
    answer:
      "Onze office lunch catering start vanaf 10 personen. We schalen soepel op tot 150+ gasten voor events en walking dinners. Vanaf 7 personen is het Chef's Choice arrangement van De Tafelaar beschikbaar (€45 p.p.), met optioneel wijnarrangement (€28 p.p.).",
  },
  {
    question: "Bezorgen jullie op kantoor en op bedrijventerreinen als De Hoef of Vathorst?",
    answer:
      "Ja, we bezorgen in Amersfoort en omgeving. Alles wordt transport-proof verpakt en is klaar om te serveren. Standaard leverwindows: 11:30–12:30 voor lunch. Bedrijventerreinen De Hoef, De Wieken, De Brand, Vathorst en Calveen zitten op 10–15 minuten rijden vanuit onze keuken op Kamp 8. Levertijden en -kosten afhankelijk van postcode en aantal.",
  },
  {
    question: "Hoe ver van tevoren moet ik catering boeken?",
    answer:
      "Voor een standaard kantoorlunch (10–40 personen) raden we 3 werkdagen van tevoren aan. Grotere events, walking dinners of maatwerk: minimaal 2 weken vooruit. Spoedorders tot 48 uur van tevoren zijn vaak mogelijk voor lunchboxen — bel +31 6 341 279 32 om beschikbaarheid te checken.",
  },
  {
    question: "Hebben jullie vegetarische, vegan en glutenvrije opties?",
    answer:
      "Ja, elk onderdeel van onze cateringkaart heeft plantaardige en glutenvrije varianten. De Veggie Lunchbox (€13,50), Inari Bao-Style Sandwich, Bieten & Geitenkaas Bowl en Veggie Meatball Wrap zijn volledig vegetarisch. Vegan, glutenvrij en andere allergenen: geef het door bij de aanvraag, wij passen het menu aan.",
  },
  {
    question: "Wie bereidt de catering en waar komt het vandaan?",
    answer:
      "De catering is een samenwerking tussen restaurant De Tafelaar (Jan Molmans, Kamp 8) en Jezza Cooks (Jeremy Arrascaeta, chef-kok van De Tafelaar). Alles wordt bereid in de volwaardige restaurantkeuken op de Kamp, met ingrediënten van 14+ lokale makers zoals Farmfields, Boot Koffie en Rock City Brewing. Zelfde keuken, zelfde chef, zelfde kwaliteit als het restaurant — alleen dan op kantoor of op locatie.",
  },
  {
    question: "Is er een minimum bestelwaarde voor catering?",
    answer:
      "Voor lunch catering: minimaal 10 personen. Voor events en diner catering vanaf 15 personen. Voor maatwerk of kleinere groepen onder 10 is het Chef's Choice arrangement in het restaurant zelf vaak een betere optie — neem contact op en we adviseren de beste route.",
  },
];

function faqJsonLd() {
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

// Service + OfferCatalog JSON-LD specifically for catering, cross-linked to
// the main #restaurant entity in layout.tsx and to jezzacooks.com's
// #catering entity. This is the entity-resolution move that tells Google
// "Tafelaar × Jezza Cooks Catering is ONE service across two domains".
function cateringServiceJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/catering#service`,
    name: "Tafelaar × Jezza Cooks Catering",
    alternateName: "Office Lunch Catering Amersfoort",
    serviceType: "Catering Service",
    description:
      "Office lunch, walking dinner en event catering in Amersfoort en omgeving. Vanaf €7,50 p.p., 10–150+ personen, bereid in onze restaurantkeuken op Kamp 8.",
    provider: {
      "@id": `${SITE_URL}#restaurant`,
    },
    areaServed: [
      "Amersfoort",
      "Amersfoort Centrum",
      "De Hoef",
      "Vathorst",
      "De Wieken",
      "De Brand",
      "Calveen",
      "Isselt",
      "Nieuwland",
      "Hoogland",
      "Leusden",
      "Soest",
      "Baarn",
      "Nijkerk",
      "Bunschoten",
    ].map((name) => ({ "@type": "AdministrativeArea", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Office Lunch Catering Amersfoort",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Office Lunch Box — Classic",
          price: "14.50",
          priceCurrency: "EUR",
          description: "Vitello Tonnato sandwich, kleine carpaccio salade, gevuld eitje, zoete bite.",
          availability: "https://schema.org/InStock",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 10 },
        },
        {
          "@type": "Offer",
          name: "Office Lunch Box — Veggie",
          price: "13.50",
          priceCurrency: "EUR",
          description: "Inari bao-style sandwich, bieten & geitenkaas bowl, peppadew met roomkaas, zoete bite.",
          availability: "https://schema.org/InStock",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 10 },
        },
        {
          "@type": "Offer",
          name: "Office Lunch Box — Premium",
          price: "18.50",
          priceCurrency: "EUR",
          description: "Wrap (keuze), salad bowl, charcuterie of kaas, dessert.",
          availability: "https://schema.org/InStock",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 10 },
        },
        {
          "@type": "Offer",
          name: "Broodje of wrap (losse component)",
          price: "7.50",
          priceCurrency: "EUR",
          description: "Sandwiches en wraps — Vitello Tonnato, Carpaccio Truffel, Gerookte Zalm, Inari Bao-Style, Pulled Pork, Veggie Meatball.",
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Bowl (losse component)",
          price: "10.50",
          priceCurrency: "EUR",
          description: "Carpaccio, Zalm & Komkommer, Bieten & Geitenkaas, Inari Power Bowl.",
          availability: "https://schema.org/InStock",
        },
      ],
    },
    // Cross-link to the JV entity on jezzacooks.com — resolves "same service,
    // different domains" for AI answer engines.
    sameAs: [`${JEZZA_URL}/services/catering`, `${JEZZA_URL}/#catering`],
  });
}

// ===== Page content =====

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: cateringServiceJsonLd() }} />
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
              Tafelaar × Jezza Cooks Catering
            </p>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
              Catering Amersfoort — Office Lunch, Events & Walking Dinner
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
              Kantoorlunch vanaf €7,50 p.p., walking dinners en events tot 150 personen —
              bereid in onze restaurantkeuken op Kamp 8 in het centrum van Amersfoort, bezorgd
              op jouw kantoor of evenementlocatie.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-foreground/80">
                <Briefcase className="mr-2 h-3.5 w-3.5" />
                Bedrijven & Teams
              </Badge>
              <Badge variant="outline" className="text-foreground/80">
                <Truck className="mr-2 h-3.5 w-3.5" />
                Bezorgd op kantoor
              </Badge>
              <Badge variant="outline" className="text-foreground/80">
                <Leaf className="mr-2 h-3.5 w-3.5" />
                Vega & vegan opties
              </Badge>
              <Badge variant="outline" className="text-foreground/80">
                <UtensilsCrossed className="mr-2 h-3.5 w-3.5" />
                Klaar om te serveren
              </Badge>
            </div>
          </header>

          {/* Trust strip + NAP — above the fold, machine-readable */}
          <section className="mb-12 max-w-4xl mx-auto">
            <Card className="rounded-2xl border border-border bg-primary/5">
              <CardContent className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Kamp 8, 3811 AR Amersfoort</p>
                    <p className="text-muted-foreground">Restaurantkeuken in het centrum · 2 min van Flint · 5 min van station</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      <a href="tel:+31634127932" className="hover:underline">+31 6 341 279 32</a>
                    </p>
                    <p className="text-muted-foreground">Offertes en overleg · ma–vr 09:00–18:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">4.8 op Google · 95+ reviews</p>
                    <p className="text-muted-foreground">Zelfde keuken, zelfde chef als het restaurant</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* GEO H2: "Wat is catering bij De Tafelaar?" — self-contained passage */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
            <div className="space-y-4 order-2 md:order-1">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
                Lunch die werkt op kantoor
              </h2>
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                Geen gedoe, wel kwaliteit. Onze office lunch is ontworpen om netjes te eten, makkelijk te
                verdelen en consistent te leveren — perfect voor vergaderlunches, teamdagen en events in
                en rond Amersfoort.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Alles is opgebouwd uit herkenbare De Tafelaar-componenten (sauzen, proteïnes, garnituren)
                en wordt bereid in onze eigen restaurantkeuken aan de Kamp 8. We schalen van 10 tot 150+
                personen zonder concessies te doen aan smaak of presentatie.
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
                alt="Office lunch catering van Tafelaar × Jezza Cooks — Amersfoort"
                width={1200}
                height={800}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-ai-hint="office lunch catering amersfoort"
              />
            </div>
          </section>

          {/* GEO H2: "Wie maakt de catering?" — JV attribution block */}
          <section className="max-w-3xl mx-auto mb-12">
            <Card className="rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex items-center gap-2 text-primary mb-3">
                <ChefHat className="h-5 w-5" />
                <h2 className="font-headline text-xl sm:text-2xl tracking-tight">
                  Onze chef — Tafelaar × Jezza Cooks
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  Onze catering is een samenwerking tussen restaurant De Tafelaar (Jan Molmans,
                  eigenaar) en <Link href={JEZZA_URL} className="underline hover:text-foreground">Jezza Cooks</Link>{" "}
                  (Jeremy Arrascaeta, chef-kok van De Tafelaar). Dezelfde restaurantkeuken, dezelfde chef,
                  dezelfde kwaliteit — alleen dan op jouw kantoor of evenementlocatie.
                </p>
                <p>
                  Jeremy heeft ruim 10 jaar ervaring in high-end keukens in Nederland en Australië
                  (onder andere Restaurant Bougainville Amsterdam, finalist Euro-Toques Young Chef Award
                  2018, en dry-aging lead bij Angler Restaurant in Zuid-Australië). We werken met
                  ingrediënten van 14+ lokale makers zoals Farmfields, Boot Koffie en Rock City Brewing.
                </p>
                <div className="pt-2">
                  <Link href={`${JEZZA_URL}/services/catering`} className="text-sm underline text-primary hover:text-primary/80">
                    Meer over Tafelaar × Jezza Cooks Catering →
                  </Link>
                </div>
              </div>
            </Card>
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

          {/* GEO H2: "Op welke bedrijventerreinen bezorgen jullie?" — evidence-rich */}
          <section className="max-w-3xl mx-auto mb-12">
            <Card className="rounded-2xl border border-border p-6 sm:p-8">
              <h2 className="font-headline text-xl sm:text-2xl tracking-tight mb-3">
                Op welke bedrijventerreinen bezorgen we?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vanuit onze keuken op de Kamp bereiken we binnen 15 minuten rijden alle grote Amersfoortse
                bedrijventerreinen. Hieronder een overzicht van onze standaard leverwindows en reistijden.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="py-2 pr-4 font-semibold text-foreground">Bedrijventerrein</th>
                      <th className="py-2 pr-4 font-semibold text-foreground">Rijtijd</th>
                      <th className="py-2 font-semibold text-foreground">Kenmerk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">De Hoef</td><td className="py-2 pr-4">~10 min</td><td className="py-2">Grootste bedrijventerrein, 739 bedrijven, A1/A28</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">Vathorst</td><td className="py-2 pr-4">~12 min</td><td className="py-2">58 ha, 2.034 arbeidsplaatsen, IKEA + Loods 5</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">De Wieken</td><td className="py-2 pr-4">~10 min</td><td className="py-2">Modern kantorencomplex, A28/A1 aansluiting</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">De Brand</td><td className="py-2 pr-4">~8 min</td><td className="py-2">Retail, hotels en kantoorpanden</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">Calveen</td><td className="py-2 pr-4">~8 min</td><td className="py-2">Gemengd — retail, kantoor, horeca</td></tr>
                    <tr className="border-b border-border/50"><td className="py-2 pr-4">Isselt</td><td className="py-2 pr-4">~10 min</td><td className="py-2">Industrieel, west van Amersfoort</td></tr>
                    <tr><td className="py-2 pr-4">Amersfoort Centrum</td><td className="py-2 pr-4">~5 min</td><td className="py-2">Gratis in binnenstad/Kamp</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Ook Leusden, Soest, Baarn en Nijkerk zijn standaard leverbaar — vraag naar maatwerk en
                levertijden voor jouw postcode.
              </p>
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
                  Vaste prijzen, duidelijke keuzes. Vanaf 10 personen bezorgd in Amersfoort en omgeving.
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
                    alt="Office lunch broodjes Amersfoort — Tafelaar × Jezza Cooks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    data-ai-hint="gourmet sandwiches"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Broodjes</CardTitle>
                    <PricePill value={PRICES.sandwiches} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {officeLunch.sandwiches.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium leading-snug">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
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
                    alt="Office lunch bowls Amersfoort — Tafelaar × Jezza Cooks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    data-ai-hint="salad bowls"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Bowls</CardTitle>
                    <PricePill value={PRICES.bowls} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {officeLunch.bowls.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <p className="font-medium leading-snug">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
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
                    alt="Office lunch wraps Amersfoort — Tafelaar × Jezza Cooks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    data-ai-hint="wraps"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Wraps</CardTitle>
                    <PricePill value={PRICES.wraps} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  {officeLunch.wraps.map((item) => (
                    <div key={item.name} className="space-y-1">
                      <p className="font-medium leading-snug">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
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
                    alt="Office lunchpakketten Amersfoort — Tafelaar × Jezza Cooks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    data-ai-hint="lunch boxes"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-lg sm:text-xl">Lunchpakketten</CardTitle>
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
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        {"price" in item && item.price ? (
                          <PricePill value={item.price} />
                        ) : null}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <TagBadges tags={(item as { tags?: string[] }).tags ?? []} />
                        <AllergensLine allergens={(item as { allergens?: string[] }).allergens ?? []} />
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
                      <span className="text-foreground font-medium">1 sweet</span>. Wij leveren het
                      overzichtelijk en klaar om neer te zetten.
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
                        <Button className="rounded-xl">Offerte aanvragen</Button>
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
                  <Button asChild variant="outline" className="rounded-xl">
                    <ObfuscatedEmail user="reserveren" domain="tafelaaramersfoort.nl">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Mail ons direct
                    </ObfuscatedEmail>
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Visible FAQ */}
          <section className="mt-12">
            <h2 className="font-headline text-2xl sm:text-3xl tracking-tight mb-6 text-center">
              Veelgestelde vragen over onze catering
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <Card key={i} className="rounded-2xl border p-4 sm:p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="mt-12 text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/menu"><Button variant="outline" className="rounded-xl">Menu</Button></Link>
              <Link href="/verhuur-en-groepen"><Button variant="outline" className="rounded-xl">Verhuur & Groepen</Button></Link>
              <Link href="/bedrijfsdiner-amersfoort"><Button variant="outline" className="rounded-xl">Bedrijfsdiner</Button></Link>
              <Link href="/contact"><Button variant="outline" className="rounded-xl">Contact</Button></Link>
              <Link href="/duurzaam-restaurant-amersfoort"><Button variant="outline" className="rounded-xl">Duurzaam restaurant</Button></Link>
              <Link href={JEZZA_URL}><Button variant="outline" className="rounded-xl">Over Jezza Cooks →</Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
