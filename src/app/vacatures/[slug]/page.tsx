import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contactDetails } from "@/content/site-content";
import { VACATURES_BIJGEWERKT, getVacature, sollicitatieStappen, vacatures } from "@/content/vacatures";
import { breadcrumbJsonLd, datumNl, jobPostingJsonLd, mailtoSollicitatie, telHref } from "@/lib/vacature-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return vacatures.map((v) => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVacature(slug);
  if (!v) return {};
  const titel = `Vacature ${v.titel.toLowerCase()} in Amersfoort`;
  return {
    title: titel,
    description: v.samenvatting,
    alternates: { canonical: `/vacatures/${v.slug}` },
    openGraph: {
      title: titel,
      description: v.samenvatting,
      images: [{ url: v.afbeelding.src }],
    },
  };
}

const KAART = "border-2 border-foreground bg-white shadow-[5px_5px_0_hsl(var(--foreground))]";

function Lijst({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-[15px] text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function VacaturePage({ params }: Props) {
  const { slug } = await params;
  const v = getVacature(slug);
  if (!v) notFound();

  const functie = v.titel.toLowerCase();
  const anderen = vacatures.filter((x) => x.slug !== v.slug);
  const feiten: [string, string][] = [
    ["Functie", v.titel],
    ["Dienstverband", v.dienstverband],
    ["Uren", v.uren],
    ["Dagen", v.dagen],
    ["Locatie", "Kamp 8, 3811 AR Amersfoort (centrum)"],
    ["Salaris", v.salaris?.tekst ?? "Volgens de horeca-cao"],
    ["Ervaring", v.zonderErvaring ? "Niet nodig, we leren je alles" : "Opleiding of een paar jaar ervaring"],
    ["Solliciteren", `Mail ${contactDetails.email} of bel ${contactDetails.phone}`],
  ];

  const ld = [
    jobPostingJsonLd(v),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Vacatures", path: "/vacatures" },
      { name: v.titel, path: `/vacatures/${v.slug}` },
    ]),
  ];

  return (
    <>
      {ld.map((blok, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blok) }} />
      ))}

      <div className="container mx-auto px-4 py-10 sm:px-6 md:px-8 sm:py-14 md:py-20">
        <nav aria-label="Kruimelpad" className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/vacatures" className="hover:text-primary">Vacatures</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{v.titel}</span>
        </nav>

        <article className="mx-auto max-w-4xl">
          {/* Kop */}
          <header className="mb-10 border-[5px] border-foreground bg-white px-6 py-9 sm:px-10">
            <p className="mb-4 inline-block bg-foreground px-3.5 py-[7px] text-[11px] font-bold uppercase tracking-[0.2em] text-background">
              Vacature · Amersfoort centrum
            </p>
            <h1 className="font-headline text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
              Vacature {functie} in Amersfoort
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              De Tafelaar, shared dining restaurant op de Kamp 8 in Amersfoort centrum, zoekt een {functie}:{" "}
              {v.dienstverband.toLowerCase()}, {v.uren}.{" "}
              {v.zonderErvaring ? "Ervaring is niet nodig, we leren je alles." : "Met een koksopleiding of een paar jaar keukenervaring."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={mailtoSollicitatie(v.titel)}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden />
                  Solliciteer per mail
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={telHref()}>
                  <Phone className="mr-2 h-4 w-4" aria-hidden />
                  Bel {contactDetails.phone}
                </a>
              </Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Geplaatst op {datumNl(v.datePosted)} · bijgewerkt op {datumNl(VACATURES_BIJGEWERKT)}
            </p>
          </header>

          {/* In het kort + foto */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_.9fr]">
            <section className={KAART} aria-labelledby="kort-title">
              <h2 id="kort-title" className="border-b-2 border-foreground bg-secondary px-6 py-4 font-headline text-[19px] font-extrabold">
                De vacature in het kort
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {feiten.map(([k, val]) => (
                    <tr key={k} className="border-b border-dashed border-border last:border-b-0">
                      <th scope="row" className="w-[34%] px-6 py-2.5 text-left align-top font-semibold text-foreground">
                        {k}
                      </th>
                      <td className="px-6 py-2.5 text-muted-foreground">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <div className="relative min-h-[260px] border-[5px] border-foreground">
              <Image src={v.afbeelding.src} alt={v.afbeelding.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>

          {/* Inhoud */}
          <div className="space-y-10">
            <section aria-labelledby="doen-title">
              <h2 id="doen-title" className="mb-3 font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
                Wat doet een {functie} bij De Tafelaar?
              </h2>
              <p className="mb-4 text-[15px] text-foreground">{v.intro}</p>
              <Lijst items={v.doen} />
            </section>

            <section aria-labelledby="zoeken-title">
              <h2 id="zoeken-title" className="mb-3 font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
                Wie zoeken we?
              </h2>
              <Lijst items={v.zoeken} />
            </section>

            <section aria-labelledby="bieden-title">
              <h2 id="bieden-title" className="mb-3 font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
                Wat bieden we?
              </h2>
              <Lijst items={v.bieden} />
            </section>

            <section aria-labelledby="over-title" className={`${KAART} p-6 sm:p-8`}>
              <h2 id="over-title" className="mb-3 font-headline text-2xl font-extrabold tracking-tight">
                Over De Tafelaar
              </h2>
              <p className="text-[15px] text-muted-foreground">
                De Tafelaar is een shared dining restaurant op de Kamp 8 in Amersfoort centrum, op 5 minuten lopen van
                Theater de Flint. Gasten bestellen samen een paar gerechten en delen ze aan tafel: kazen, charcuterie,
                warme seizoensgerechten en desserts, gemaakt met producten van makers uit de regio. We zijn open op donderdag van 17:00 tot 23:00, op vrijdag en zaterdag van 15:00 tot 00:00 en op zondag van 15:00 tot 23:00; maandag, dinsdag en woensdag is de zaak dicht. Je werkt in een klein team met de eigenaren Jan en Sabine en chef Jeremy.
              </p>
            </section>

            <section aria-labelledby="sollic-title">
              <h2 id="sollic-title" className="mb-4 font-headline text-2xl font-extrabold tracking-tight sm:text-3xl">
                Hoe solliciteer je als {functie}?
              </h2>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {sollicitatieStappen.map((stap, i) => (
                  <li key={stap.titel} className={`${KAART} p-5`}>
                    <p className="font-headline text-3xl font-black text-primary">{i + 1}</p>
                    <p className="mt-1 font-bold text-foreground">{stap.titel}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stap.tekst}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild>
                  <a href={mailtoSollicitatie(v.titel)}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden />
                    Mail naar {contactDetails.email}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={telHref()}>
                    <Phone className="mr-2 h-4 w-4" aria-hidden />
                    {contactDetails.phone}
                  </a>
                </Button>
              </div>
            </section>

            {anderen.length > 0 && (
              <section aria-labelledby="andere-title" className="border-t-[5px] border-foreground pt-8">
                <h2 id="andere-title" className="mb-4 font-headline text-xl font-extrabold">
                  Andere vacatures bij De Tafelaar
                </h2>
                <div className="flex flex-wrap gap-3">
                  {anderen.map((a) => (
                    <Button key={a.slug} asChild variant="outline">
                      <Link href={`/vacatures/${a.slug}`}>{a.titel}</Link>
                    </Button>
                  ))}
                  <Button asChild variant="secondary">
                    <Link href="/vacatures">Alle vacatures</Link>
                  </Button>
                </div>
              </section>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
