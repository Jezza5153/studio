// Kerstdiner 2026. Alle feiten staan in src/content/kerstdiner.ts; na 25 december stuurt
// src/middleware.ts deze pagina tijdelijk door naar /agenda.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SITE_NAME, SITE_URL, sharedOpenGraph } from "@/lib/site-metadata";
import { Button } from "@/components/ui/button";
import { ReserveerButton } from "@/components/reserveer-button";
import { Kicker, SectionLabel } from "@/components/compositie";
import { FaqList } from "@/components/faq-list";
import { kerstdiner, KERSTDINER_PAD } from "@/content/kerstdiner";
import { contactDetails } from "@/content/site-content";

export const dynamic = "force-static";
export const revalidate = 3600; // Event-markup van tafels die voorbij zijn valt elk uur weg

const TITEL = `Kerstdiner Amersfoort ${kerstdiner.jaar} | Kerstavond & Eerste Kerstdag | De Tafelaar`;
const OMSCHRIJVING = `Kerstdiner bij De Tafelaar op de Kamp in Amersfoort: kerstavond 24 en eerste kerstdag 25 december. Kerstmenu €${kerstdiner.prijs} p.p., wijnarrangement €${kerstdiner.wijnarrangement} p.p. ${kerstdiner.wijnarrangementTekst}.`;

export const metadata: Metadata = {
  title: { absolute: TITEL },
  description: OMSCHRIJVING,
  alternates: { canonical: KERSTDINER_PAD },
  openGraph: {
    ...sharedOpenGraph,
    url: KERSTDINER_PAD,
    title: TITEL,
    description: OMSCHRIJVING,
    images: [{ url: kerstdiner.foto.src }],
  },
  keywords: [
    "kerstdiner amersfoort",
    "kerst restaurant amersfoort",
    "kerstavond uit eten amersfoort",
    "eerste kerstdag restaurant amersfoort",
    "kerstmenu amersfoort",
    "kerstdiner amersfoort centrum",
  ],
};

const faqs = [
  {
    question: "Wanneer is het kerstdiner bij De Tafelaar?",
    answer: `Op kerstavond, ${kerstdiner.dagen[0].datum}, en op eerste kerstdag, ${kerstdiner.dagen[1].datum} ${kerstdiner.jaar}. Er zijn twee tafels per avond: van ${kerstdiner.tafels[0].start} tot ${kerstdiner.tafels[0].eind}, of vanaf ${kerstdiner.tafels[1].start} zonder eindtijd.`,
  },
  {
    question: "Wat kost het kerstdiner?",
    answer: `Het kerstmenu kost €${kerstdiner.prijs} per persoon. Voor €${kerstdiner.wijnarrangement} per persoon komt daar een wijnarrangement bij, ${kerstdiner.wijnarrangementTekst}.`,
  },
  {
    question: "Kan ik op kerstavond of eerste kerstdag ook van de gewone kaart eten?",
    answer: "Nee, op 24 en 25 december serveren we alleen het kerstmenu, niet de gewone kaart.",
  },
  {
    question: "Hoe reserveer ik voor het kerstdiner?",
    answer: `Reserveer via de reserveerknop op deze pagina of bel ${contactDetails.phone}.`,
  },
  {
    question: "Waar zit De Tafelaar?",
    answer:
      "Op de Kamp 8 in het centrum van Amersfoort, op 5 minuten lopen van Theater de Flint. Parkeergarage Beestenmarkt ligt op 2 minuten lopen.",
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

/**
 * Een Event per avond per tafel, zoals bij de Courant-evenementen (src/lib/event-jsonld.ts).
 * December valt altijd in de wintertijd, dus de offset is vast +01:00. Tafels die voorbij
 * zijn vallen weg, zodat Google geen "EventScheduled" in het verleden ziet.
 */
function eventsJsonLd(now: Date) {
  const url = `${SITE_URL}${KERSTDINER_PAD}`;
  const events = kerstdiner.dagen.flatMap((dag) =>
    kerstdiner.tafels.flatMap((tafel) => {
      const startDate = `${dag.iso}T${tafel.start}:00+01:00`;
      const endDate = tafel.eind ? `${dag.iso}T${tafel.eind}:00+01:00` : undefined;
      if (now.getTime() > Date.parse(endDate ?? `${dag.iso}T23:59:00+01:00`)) return [];
      return [
        {
          "@type": "Event",
          "@id": `${url}#event-${dag.iso}-${tafel.start.replace(":", "")}`,
          name: `Kerstdiner op ${dag.naam.toLowerCase()} bij De Tafelaar`,
          description: OMSCHRIJVING,
          url,
          image: [`${SITE_URL}${kerstdiner.foto.src}`],
          startDate,
          ...(endDate ? { endDate } : {}),
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: SITE_NAME,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kamp 8",
              postalCode: "3811 AR",
              addressLocality: "Amersfoort",
              addressCountry: "NL",
            },
          },
          organizer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          offers: { "@type": "Offer", price: `${kerstdiner.prijs}.00`, priceCurrency: "EUR", url },
        },
      ];
    }),
  );
  return events.length > 0 ? JSON.stringify({ "@context": "https://schema.org", "@graph": events }) : null;
}

const KAART = "border-2 border-foreground bg-white shadow-[5px_5px_0_hsl(var(--foreground))]";

export default function KerstdinerPage() {
  const events = eventsJsonLd(new Date());

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
      {events ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: events }} /> : null}

      {/* ================= HERO ================= */}
      <section className="border-b-[5px] border-foreground" aria-labelledby="kerst-title">
        <div className="grid grid-cols-1 md:min-h-[60svh] md:grid-cols-[1.3fr_.7fr]">
          <div className="flex flex-col justify-center border-b-[5px] border-foreground bg-background px-6 py-9 md:border-b-0 md:border-r-[5px] md:px-10 md:py-12">
            <div>
              <Kicker>Kerst {kerstdiner.jaar}</Kicker>
            </div>
            <h1 id="kerst-title" className="my-5 max-w-[16ch] font-headline text-[clamp(36px,5.4vw,72px)] font-black leading-[1.05] tracking-tight">
              Kerstdiner in <em className="font-bold italic text-primary">Amersfoort</em>
            </h1>
            <p className="max-w-[52ch] text-[clamp(17px,2vw,21px)] font-medium text-muted-foreground">
              Op kerstavond en eerste kerstdag schuif je bij ons aan voor een speciaal kerstmenu, op de Kamp in het centrum van Amersfoort.
            </p>
            <p className="mt-4 text-[clamp(16px,1.8vw,19px)] font-semibold">{kerstdiner.datumsLang}</p>
            <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <ReserveerButton size="lg" className="w-full sm:w-auto" label="Reserveer je kersttafel" />
            </div>
          </div>
          <div className="relative min-h-[280px] bg-secondary">
            <Image src={kerstdiner.foto.src} alt={kerstdiner.foto.alt} fill priority sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* ================= DATUMS, TIJDEN & PRIJZEN ================= */}
      <section className="container mx-auto px-4 py-20 sm:px-6 md:px-8" aria-labelledby="praktisch-title">
        <SectionLabel id="praktisch-title">Datums, tijden &amp; prijzen</SectionLabel>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {kerstdiner.dagen.map((dag) => (
            <div key={dag.iso} className={KAART}>
              <div className="border-b-2 border-foreground bg-secondary px-6 py-4">
                <h3 className="font-headline text-[19px] font-extrabold">{dag.naam}</h3>
                <p className="text-sm font-semibold text-muted-foreground first-letter:uppercase">{dag.datum}</p>
              </div>
              <table className="w-full text-sm">
                <tbody>
                  {kerstdiner.tafels.map((tafel) => (
                    <tr key={tafel.start} className="border-b border-dashed border-border last:border-b-0">
                      <th scope="row" className="px-6 py-3 text-left font-normal">
                        {tafel.naam}
                      </th>
                      <td className="px-6 py-3 text-right font-semibold">{tafel.tekst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          <div className={KAART}>
            <div className="border-b-2 border-foreground bg-accent px-6 py-4 text-background">
              <h3 className="font-headline text-[19px] font-extrabold">Prijzen</h3>
              <p className="text-sm font-semibold text-background/90">per persoon</p>
            </div>
            <dl className="text-sm">
              <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-border px-6 py-3">
                <dt>Kerstmenu</dt>
                <dd className="font-headline text-[20px] font-extrabold">€{kerstdiner.prijs}</dd>
              </div>
              <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-6 py-3">
                <dt>Wijnarrangement</dt>
                <dd className="font-headline text-[20px] font-extrabold">€{kerstdiner.wijnarrangement}</dd>
                <dd className="col-span-2 mt-0.5 text-[13px] text-muted-foreground">{kerstdiner.wijnarrangementTekst}</dd>
              </div>
            </dl>
          </div>
        </div>
        <p className="mt-6 max-w-[70ch] text-[15px] font-semibold">{kerstdiner.alleenKerstmenu}</p>
      </section>

      {/* ================= HET KERSTMENU ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="menu-title">
        <SectionLabel id="menu-title" balk="salie">
          Het kerstmenu
        </SectionLabel>
        <div className="max-w-[760px] border-l-[10px] border-primary bg-white px-6 py-6 text-[15.5px] text-muted-foreground md:px-8">
          <p>{kerstdiner.menuVolgt}</p>
        </div>
      </section>

      {/* ================= RESERVEREN ================= */}
      <section className="container mx-auto px-4 pb-20 sm:px-6 md:px-8" aria-labelledby="reserveren-title">
        <div className="grid grid-cols-1 border-[5px] border-foreground bg-primary text-white shadow-[8px_8px_0_hsl(var(--foreground))] md:grid-cols-[1fr_auto] md:items-center">
          <div className="px-7 py-8 md:px-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Kerst bij De Tafelaar</p>
            <h2 id="reserveren-title" className="mt-2 font-headline text-[clamp(24px,3vw,34px)] font-extrabold leading-tight">
              Reserveer je kersttafel
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] text-white/90">
              Online via de reserveerknop of bel{" "}
              <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="font-bold underline underline-offset-4">
                {contactDetails.phone}
              </a>
              . Kamp 8, Amersfoort centrum, op 5 minuten lopen van Theater de Flint.
            </p>
          </div>
          <div className="border-t-[5px] border-foreground px-7 py-6 md:border-l-[5px] md:border-t-0 md:px-10">
            <ReserveerButton variant="outline" size="lg" className="w-full sm:w-auto" label="Reserveer nu" />
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="container mx-auto px-4 pb-24 sm:px-6 md:px-8" aria-labelledby="faq-title">
        <SectionLabel id="faq-title">Veelgestelde vragen over het kerstdiner</SectionLabel>
        <div className="mx-auto max-w-[780px]">
          <FaqList faqs={faqs} />
        </div>
        <div className="mx-auto mt-9 flex max-w-[780px] flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/agenda">Agenda →</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/drank">Drankenkaart →</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact →</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
