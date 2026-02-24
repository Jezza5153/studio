
// app/(site)/over-onze-makers/page.tsx (server component)
import type { Metadata } from "next";
import { makers, philosophyContent } from "@/content/site-content";
import Image from "next/image";
import Link from "next/link";
import {
  Leaf,
  Users,
  Sparkles,
  Handshake,
  HeartHandshake,
  Sprout,
} from "lucide-react";
import MakersClient from "./MakersClient";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Wij en Onze Makers | De Tafelaar Amersfoort",
  description: "Leer De Tafelaar en onze lokale makers kennen. Shared dining met lokale producten, seizoensgebonden gerechten. Ons verhaal, onze filosofie en de makers achter onze gerechten.",
  alternates: {
    canonical: "/over-onze-makers",
  },
};

export default function WijEnOnzeMakersPage() {
  const hero = {
    src: "/pics/over ons 1 foto.jpg",
    alt: "Team van De Tafelaar in het restaurant",
  };

  const gallery = [
    { src: "/pics/over ons links.jpg", alt: "Over ons foto links bij De Tafelaar" },
    { src: "/pics/over ons rechts 1.jpg", alt: "Over ons foto rechts bij De Tafelaar" },
    { src: "/pics/over ons rechts 2.jpg", alt: "Over ons foto rechts De Tafelaar sfeer" },
  ];

  return (
    <div className="relative bg-background">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] hidden sm:block"
        style={{ backgroundImage: "url(/noise.png)" }}
      />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* ─── WIJ ─── */}
        <header className="text-center mb-10 sm:mb-12">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            Wij en Onze Makers
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            De gedachte achter onze gerechten, gastvrijheid en de makers die het mogelijk maken.
          </p>

          {!!philosophyContent.usps?.length && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {philosophyContent.usps.map((u: string, i: number) => (
                <span
                  key={i}
                  className="rounded-full border border-border px-3 py-1 text-xs sm:text-sm text-foreground/80"
                >
                  {u}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Intro + Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <div className="space-y-6 md:order-2">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl">
              {philosophyContent.intro.heading}
            </h2>
            <p className="text-base sm:text-lg text-foreground leading-relaxed">
              {philosophyContent.intro.lead}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {philosophyContent.intro.body}
            </p>
          </div>

          <div className="md:order-1 overflow-hidden rounded-2xl">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={800}
              height={600}
              className="object-cover w-full h-auto"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </section>

        {/* Values grid */}
        <section className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-2">
            {philosophyContent.values.title}
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            {philosophyContent.values.intro}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Leaf, text: "Lokaal & duurzaam" },
              { icon: Sprout, text: "Seizoensgebonden" },
              { icon: Handshake, text: "Samen met de buurt" },
              { icon: Users, text: "Ontspannen shared dining" },
              { icon: Sparkles, text: "Eerlijke ingrediënten" },
              { icon: HeartHandshake, text: "Aandacht voor gast & product" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
              >
                <div className="rounded-2xl bg-card p-4 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] transition-transform duration-200 group-hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary" />
                    <p className="text-foreground">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mt-6">
            {philosophyContent.values.outro}
          </p>
        </section>

        {/* Eten & drinken */}
        <section className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.etenEnDrinken.title}
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
            {philosophyContent.etenEnDrinken.text.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-border p-4 sm:p-5 bg-muted/30">
            <h4 className="font-headline text-lg mb-1">Chef&apos;s Choice</h4>
            <p className="text-muted-foreground">
              Niet kiezen? Begin met een wisselende selectie van favorieten om te delen.
            </p>
          </div>
        </section>

        {/* Photo collage */}
        {!!gallery.length && (
          <section className="mb-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {gallery.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={i === 0 ? 1200 : 600}
                    height={i === 0 ? 900 : 600}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Origin timeline */}
        <section className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.origin.title}
          </h3>
          <ul className="relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-0 before:h-full before:w-px before:bg-border">
            {philosophyContent.origin.text.map((step: string, i: number) => (
              <li key={i} className="relative pl-4">
                <span className="absolute left-[-9.5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary/80 ring-2 ring-background" />
                <p className="text-muted-foreground">{step}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Quote */}
        {philosophyContent.quote?.text && (
          <section className="mb-12">
            <figure className="rounded-2xl border border-border p-6 sm:p-8 bg-muted/30">
              <blockquote className="text-xl sm:text-2xl leading-relaxed tracking-tight">
                &ldquo;{philosophyContent.quote.text}&rdquo;
              </blockquote>
              {philosophyContent.quote.author && (
                <figcaption className="mt-4 flex items-center gap-3 text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span className="italic">
                    — {philosophyContent.quote.author}
                  </span>
                </figcaption>
              )}
            </figure>
          </section>
        )}

        {/* Why */}
        <section className="mb-16">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.why.title}
          </h3>
          <div className="space-y-2">
            {philosophyContent.why.text.map((line: string, i: number) => (
              <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                {line}
              </p>
            ))}
          </div>
        </section>

        {/* ─── ONZE MAKERS ─── */}
        <div className="border-t border-border pt-16">
          <MakersClient makers={makers} />
        </div>

        {/* CTA */}
        <section aria-labelledby="kom-langs" className="mt-12">
          <div className="relative rounded-2xl border border-border p-6 sm:p-8 overflow-hidden">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-2xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 id="kom-langs" className="font-headline text-2xl sm:text-3xl md:text-4xl">
                  {philosophyContent.cta.title}
                </h3>
                <p className="text-base sm:text-lg text-foreground/90 mt-2">
                  {philosophyContent.cta.text}
                </p>
              </div>
              <div className="flex gap-3">
                {!!philosophyContent.ctaLinks?.reserve && (
                  <Link
                    href={philosophyContent.ctaLinks.reserve}
                    prefetch={true}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Reserveer
                  </Link>
                )}
                {!!philosophyContent.ctaLinks?.menu && (
                  <Link
                    href={philosophyContent.ctaLinks.menu}
                    prefetch={false}
                    className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 hover:bg-muted transition-colors"
                  >
                    Bekijk menu
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
