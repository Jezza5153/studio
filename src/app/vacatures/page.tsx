import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactDetails } from "@/content/site-content";
import { vacatures, vacatureFaqs, waaromTafelaar, type Vacature } from "@/content/vacatures";

export const dynamic = "force-static";

const SITE_URL = "https://www.tafelaaramersfoort.nl";

export const metadata: Metadata = {
  title: "Vacatures De Tafelaar | Werken in de horeca in Amersfoort",
  description:
    "Werken bij De Tafelaar, shared dining restaurant op de Kamp in Amersfoort centrum. Vacatures voor bediening, kok en keukenhulp, plus open sollicitatie. Open wo t/m zo, maandag en dinsdag vrij.",
  alternates: { canonical: "/vacatures" },
  openGraph: {
    title: "Vacatures De Tafelaar | Werken in Amersfoort centrum",
    description:
      "Werken in een klein, hecht team met lokale producten en een seizoenskaart. Bekijk onze vacatures of stuur een open sollicitatie.",
  },
  keywords: [
    "vacature horeca amersfoort",
    "werken bij restaurant amersfoort",
    "vacature bediening amersfoort",
    "vacature kok amersfoort",
    "bijbaan horeca amersfoort",
    "de tafelaar vacatures",
  ],
};

function mailtoSollicitatie(functie: string) {
  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(`Sollicitatie: ${functie}`)}`;
}

function jobPostingJsonLd(v: Vacature) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.titel,
    description: `<p>${v.intro}</p><p>Wat je doet: ${v.doen.join("; ")}.</p><p>Wat we zoeken: ${v.zoeken.join("; ")}.</p><p>Wat we bieden: ${v.bieden.join("; ")}.</p>`,
    datePosted: v.datePosted,
    validThrough: `${v.validThrough}T23:59:59+02:00`,
    employmentType: v.employmentType,
    directApply: true,
    hiringOrganization: {
      "@type": "Restaurant",
      name: "De Tafelaar",
      sameAs: SITE_URL,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kamp 8",
        postalCode: "3811 AR",
        addressLocality: "Amersfoort",
        addressRegion: "Utrecht",
        addressCountry: "NL",
      },
    },
    url: `${SITE_URL}/vacatures#${v.slug}`,
  };
}

function faqJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vacatureFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  });
}

function Lijst({ kop, items }: { kop: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{kop}</h3>
      <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VacaturesPage() {
  const telHref = `tel:${contactDetails.phone.replace(/\s+/g, "")}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      {vacatures.map((v) => (
        <script key={v.slug} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(v)) }} />
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
            Shared dining op de Kamp, met een klein team en producten van makers uit de regio. We zoeken mensen
            die van eten, van gasten en van samenwerken houden. Open van woensdag t/m zondag, maandag en dinsdag
            vrij.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="#vacatures">Bekijk de vacatures</a>
            </Button>
            <Button asChild variant="outline">
              <a href={mailtoSollicitatie("Open sollicitatie")}>Open sollicitatie</a>
            </Button>
          </div>
        </header>

        {/* Waarom */}
        <section className="mx-auto mb-12 max-w-5xl" aria-labelledby="waarom-title">
          <h2 id="waarom-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Waarom werken bij De Tafelaar
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

        {/* Vacatures */}
        <section id="vacatures" className="mx-auto mb-12 max-w-4xl scroll-mt-24" aria-labelledby="vacatures-title">
          <h2 id="vacatures-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Openstaande vacatures
          </h2>

          {vacatures.length === 0 ? (
            <Card className="border-2 border-foreground p-6 text-center text-muted-foreground">
              Op dit moment hebben we geen openstaande vacature. Een open sollicitatie is altijd welkom.
            </Card>
          ) : (
            <div className="space-y-6">
              {vacatures.map((v) => (
                <article key={v.slug} id={v.slug} className="scroll-mt-24">
                  <Card className="border-2 border-foreground">
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-2xl">{v.titel}</CardTitle>
                          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-primary" aria-hidden />
                              {v.dienstverband}, {v.uren}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-primary" aria-hidden />
                              Kamp 8, Amersfoort
                            </span>
                          </p>
                        </div>
                        <Button asChild size="sm">
                          <a href={mailtoSollicitatie(v.titel)}>Solliciteer</a>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-base text-foreground">{v.intro}</p>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Lijst kop="Wat je doet" items={v.doen} />
                        <Lijst kop="Wat we zoeken" items={v.zoeken} />
                        <Lijst kop="Wat we bieden" items={v.bieden} />
                      </div>
                    </CardContent>
                  </Card>
                </article>
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
                  <a href={telHref}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden />
                    {contactDetails.phone}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Zo werkt het */}
        <section className="mx-auto mb-12 max-w-4xl" aria-labelledby="stappen-title">
          <h2 id="stappen-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Zo werkt solliciteren bij ons
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { titel: "Mail, bel of loop binnen", tekst: `Een korte mail naar ${contactDetails.email} is genoeg. Bellen of even langskomen op de Kamp 8 (wo t/m zo) mag ook.` },
              { titel: "Koffie op de Kamp", tekst: "We drinken een kop koffie, laten de zaak zien en vertellen hoe wij werken. Jij vertelt wat je zoekt." },
              { titel: "Proefdienst", tekst: "Je draait een dienst mee, zodat we allebei weten of het klikt. Daarna maken we afspraken over uren en start." },
            ].map((stap, i) => (
              <Card key={stap.titel} className="border-2 border-foreground">
                <CardHeader className="pb-2">
                  <p className="font-headline text-3xl font-black text-primary">{i + 1}</p>
                  <CardTitle className="text-lg">{stap.titel}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{stap.tekst}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto mb-12 max-w-3xl" aria-labelledby="faq-title">
          <h2 id="faq-title" className="mb-6 text-center font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
            Veelgestelde vragen
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
