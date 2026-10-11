import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactDetails } from "@/content/site-content";
import { VACATURES_BIJGEWERKT, sollicitatieStappen, vacatures, vacatureFaqs, waaromTafelaar } from "@/content/vacatures";
import { SITE_URL, breadcrumbJsonLd, datumNl, mailtoSollicitatie, telHref } from "@/lib/vacature-schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "Vacatures Amersfoort: werken bij restaurant De Tafelaar" },
  description:
    "Werken in de horeca in Amersfoort centrum? De Tafelaar zoekt bediening, een kok en een afwasser/keukenhulp. Ook zonder ervaring welkom. Bekijk de vacatures.",
  alternates: { canonical: "/vacatures" },
  openGraph: {
    images: [{ url: "/pics/gasten-bar.jpg", width: 846, height: 460 }],
    title: "Vacatures De Tafelaar | Werken in Amersfoort centrum",
    description:
      "Bediening, kok en afwasser/keukenhulp gezocht in een klein, hecht team met lokale producten en een seizoenskaart. Ook open sollicitaties welkom.",
  },
  keywords: [
    "vacature horeca amersfoort",
    "vacatures amersfoort centrum",
    "werken bij restaurant amersfoort",
    "vacature bediening amersfoort",
    "vacature kok amersfoort",
    "afwasser amersfoort",
    "bijbaan horeca amersfoort",
    "bijbaan amersfoort 16 jaar",
    "de tafelaar vacatures",
  ],
};

function jsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: vacatureFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Vacatures bij De Tafelaar in Amersfoort",
      itemListElement: vacatures.map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: v.titel,
        url: `${SITE_URL}/vacatures/${v.slug}`,
      })),
    },
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Vacatures", path: "/vacatures" },
    ]),
  ];
}

export default function VacaturesPage() {
  return (
    <>
      {jsonLd().map((blok, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blok) }} />
      ))}

      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Hero */}
        <header className="mb-12 border-[5px] border-foreground bg-white px-6 py-10 text-center sm:px-10 sm:py-12">
          <p className="mb-4 inline-block bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background">
            Werken bij De Tafelaar
          </p>
          <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Vacatures bij De Tafelaar in Amersfoort
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            De Tafelaar, het shared dining restaurant op de Kamp 8 in Amersfoort centrum, zoekt collega&apos;s voor de
            bediening en de keuken. Een klein team, producten van makers uit de regio en vaste vrije dagen: we zijn
            open op maandagavond en van vrijdag t/m zondag.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="#vacatures">Bekijk de vacatures</a>
            </Button>
            <Button asChild variant="outline">
              <a href={mailtoSollicitatie("Open sollicitatie")}>Open sollicitatie</a>
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Bijgewerkt op {datumNl(VACATURES_BIJGEWERKT)}</p>
        </header>

        {/* Openstaande vacatures */}
        <section id="vacatures" className="mx-auto mb-14 max-w-4xl scroll-mt-24" aria-labelledby="vacatures-title">
          <h2 id="vacatures-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Openstaande vacatures
          </h2>

          {vacatures.length === 0 ? (
            <Card className="border-2 border-foreground p-6 text-center text-muted-foreground">
              Op dit moment hebben we geen openstaande vacature. Een open sollicitatie is altijd welkom.
            </Card>
          ) : (
            <div className="space-y-5">
              {vacatures.map((v) => (
                <Card key={v.slug} className="border-2 border-foreground">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-2xl">
                      <Link href={`/vacatures/${v.slug}`} className="hover:text-primary">
                        {v.titel}
                      </Link>
                    </CardTitle>
                    <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" aria-hidden />
                        {v.dienstverband}, {v.uren}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-primary" aria-hidden />
                        Kamp 8, Amersfoort centrum
                      </span>
                      {v.zonderErvaring && (
                        <span className="border border-foreground bg-secondary px-2 py-0.5 text-xs font-bold text-foreground">
                          Geen ervaring nodig
                        </span>
                      )}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{v.samenvatting}</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button asChild size="sm">
                        <Link href={`/vacatures/${v.slug}`}>
                          Lees de vacature <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden />
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={mailtoSollicitatie(v.titel)}>Direct solliciteren</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Open sollicitatie */}
          <Card className="mt-6 border-2 border-foreground bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Open sollicitatie</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              <p>
                Staat jouw functie er niet bij, maar denk je dat je bij ons past? Vertel in een paar zinnen wie je
                bent, wat je zoekt en wanneer je kunt. We lezen elke mail en reageren altijd.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href={mailtoSollicitatie("Open sollicitatie")}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden />
                    Mail je sollicitatie
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={telHref()}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden />
                    {contactDetails.phone}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Waarom */}
        <section className="mx-auto mb-14 max-w-5xl" aria-labelledby="waarom-title">
          <h2 id="waarom-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Waarom werken bij De Tafelaar?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {waaromTafelaar.map((w) => (
              <Card key={w.titel} className="border-2 border-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{w.titel}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{w.tekst}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Werken in Amersfoort centrum */}
        <section className="mx-auto mb-14 max-w-3xl" aria-labelledby="werken-title">
          <Card className="border-2 border-foreground p-6 sm:p-8">
            <h2 id="werken-title" className="mb-4 font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
              Werken in de horeca in Amersfoort centrum
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                De Tafelaar is een shared dining restaurant op de Kamp 8, midden in de binnenstad van Amersfoort en op
                5 minuten lopen van Theater de Flint. Gasten bestellen een paar gerechten en delen ze samen aan tafel:
                kazen, charcuterie, warme seizoensgerechten en desserts, gemaakt met producten van makers uit de regio
                zoals Rock City Brewing, De Drie Ringen en Farmfields.
              </p>
              <p>
                We zijn open op maandag van 17:00 tot 22:00 en op vrijdag, zaterdag en zondag van 15:00 tot 00:00. Op
                dinsdag, woensdag en donderdag is de zaak dicht. Daardoor is werken bij ons goed te combineren met
                studie, school of een tweede baan. De zaak is vanaf station Amersfoort Centraal in circa 22 minuten
                lopend bereikbaar, en sneller met de fiets of de bus.
              </p>
            </div>
          </Card>
        </section>

        {/* Zo werkt het */}
        <section className="mx-auto mb-14 max-w-4xl" aria-labelledby="stappen-title">
          <h2 id="stappen-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Hoe werkt solliciteren bij De Tafelaar?
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sollicitatieStappen.map((stap, i) => (
              <Card key={stap.titel} className="border-2 border-foreground">
                <CardHeader className="pb-2">
                  <p className="font-headline text-3xl font-black text-primary">{i + 1}</p>
                  <CardTitle className="text-lg">{stap.titel}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{stap.tekst}</CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Mail naar{" "}
            <a href={mailtoSollicitatie("Open sollicitatie")} className="font-semibold text-primary underline underline-offset-4">
              {contactDetails.email}
            </a>{" "}
            of bel{" "}
            <a href={telHref()} className="font-semibold text-primary underline underline-offset-4">
              {contactDetails.phone}
            </a>
            .
          </p>
        </section>

        {/* FAQ */}
        <section className="mx-auto mb-12 max-w-3xl" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Veelgestelde vragen over werken bij De Tafelaar
          </h2>
          <div className="space-y-4">
            {vacatureFaqs.map((faq) => (
              <Card key={faq.question} className="border-2 border-foreground p-4 sm:p-6">
                <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Verder lezen */}
        <section className="mx-auto max-w-2xl text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/over-ons">
              <Button variant="outline">Over De Tafelaar</Button>
            </Link>
            <Link href="/over-onze-makers">
              <Button variant="outline">Wij en onze makers</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">Contact</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
