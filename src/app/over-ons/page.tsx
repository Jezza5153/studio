// app/(site)/over-ons/page.tsx
'use client';

import { philosophyContent } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const containerFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { staggerChildren: 0.08, duration: 0.3, ease: "easeOut" },
};

const itemFade = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: "easeOut" },
};

export default function OverOnsPage() {
  const hero = PlaceHolderImages.find((img) => img.id === "philosophy-image");

  // Resolve optional gallery images from your placeholder lib
  const gallery =
    philosophyContent.gallery
      ?.map((g) => PlaceHolderImages.find((img) => img.id === g.id) ?? null)
      .filter(Boolean) ?? [];

  // Optional fun stats (tune values or remove entire block below)
  const statA = useCountUp(14);
  const statB = useCountUp(8);
  const statC = useCountUp(12);

  return (
    <div className="relative bg-background">
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.8'/></svg>\")",
        }}
      />

      <motion.div {...containerFade} className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* Header */}
        <motion.header {...itemFade} className="text-center mb-10 sm:mb-12">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            {philosophyContent.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            De gedachte achter onze gerechten en gastvrijheid.
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
        </motion.header>

        {/* Intro + Hero */}
        <motion.section
          {...itemFade}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12"
        >
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
            {hero && (
              <Image
                src={hero.imageUrl}
                alt={hero.description}
                width={800}
                height={600}
                className="object-cover w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                data-ai-hint={hero.imageHint}
              />
            )}
          </div>
        </motion.section>

        {/* Values grid 2.0 */}
        <motion.section {...itemFade} className="mb-12">
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

          {/* Optional fun stats; delete if you don't want numbers */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border px-4 py-3 text-center">
              <div className="text-2xl font-semibold">{statA}+</div>
              <div className="text-sm text-muted-foreground">Lokale producenten</div>
            </div>
            <div className="rounded-xl border border-border px-4 py-3 text-center">
              <div className="text-2xl font-semibold">{statB}+</div>
              <div className="text-sm text-muted-foreground">Seizoensgerechten</div>
            </div>
            <div className="rounded-xl border border-border px-4 py-3 text-center">
              <div className="text-2xl font-semibold">{statC}+</div>
              <div className="text-sm text-muted-foreground">Jaar ervaring</div>
            </div>
          </div>
        </motion.section>

        {/* Eten & drinken + Chef’s Choice card */}
        <motion.section {...itemFade} className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.etenEnDrinken.title}
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
            {philosophyContent.etenEnDrinken.text.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-border p-4 sm:p-5 bg-muted/30">
            <h4 className="font-headline text-lg mb-1">Chef’s Choice</h4>
            <p className="text-muted-foreground">
              Niet kiezen? Begin met een wisselende selectie van favorieten om te delen.
            </p>
          </div>
        </motion.section>

        {/* Optional photo collage */}
        {!!gallery.length && (
          <motion.section {...itemFade} className="mb-12">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {gallery.slice(0, 3).map((img: any, i: number) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl ${
                    i === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    width={i === 0 ? 1200 : 600}
                    height={i === 0 ? 900 : 600}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Origin as a mini timeline */}
        <motion.section {...itemFade} className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.origin.title}
          </h3>
          <ul className="relative pl-6 space-y-5 before:absolute before:left-[7px] before:top-0 before:h-full before:w-px before:bg-border">
            {philosophyContent.origin.text.map((step: string, i: number) => (
              <li key={i} className="relative pl-4">
                <span className="absolute left-[-11px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary/80 ring-2 ring-background" />
                <p className="text-muted-foreground">{step}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Producer marquee (edit names to your actual partners) */}
        <motion.section {...itemFade} className="mb-12">
          <div className="relative overflow-hidden rounded-xl border border-border">
            <div className="flex gap-8 py-4 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
              {["Wijnwinkel op de hoek", "Brouwerij Amersfoort", "Boer Jan", "Kaas affineurs", "Groenteteler Utrecht"].map((n, i) => (
                <span key={i} className="whitespace-nowrap text-sm sm:text-base text-foreground/80">{n}</span>
              ))}
              {["Wijnwinkel op de hoek", "Brouwerij Amersfoort", "Boer Jan", "Kaas affineurs", "Groenteteler Utrecht"].map((n, i) => (
                <span key={`dup-${i}`} className="whitespace-nowrap text-sm sm:text-base text-foreground/80">{n}</span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quote */}
        {philosophyContent.quote?.text && (
          <motion.section {...itemFade} className="mb-12">
            <figure className="rounded-2xl border border-border p-6 sm:p-8 bg-muted/30">
              <blockquote className="text-xl sm:text-2xl leading-relaxed tracking-tight">
                “{philosophyContent.quote.text}”
              </blockquote>
              {philosophyContent.quote.author && (
                <figcaption className="mt-4 flex items-center gap-3 text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span className="italic">— {philosophyContent.quote.author}</span>
                </figcaption>
              )}
            </figure>
          </motion.section>
        )}

        {/* Why */}
        <motion.section {...itemFade} className="mb-12">
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">
            {philosophyContent.why.title}
          </h3>
          <div className="space-y-2">
            {philosophyContent.why.text.map((line: string, i: number) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed text-base sm:text-lg"
              >
                {line}
              </p>
            ))}
          </div>
        </motion.section>

        {/* CTA card with soft glow */}
        <motion.section {...itemFade} aria-labelledby="kom-langs">
          <div className="relative rounded-2xl border border-border p-6 sm:p-8 overflow-hidden">
            <div className="pointer-events-none absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-2xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3
                  id="kom-langs"
                  className="font-headline text-2xl sm:text-3xl md:text-4xl"
                >
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
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Reserveer
                  </Link>
                )}
                {!!philosophyContent.ctaLinks?.menu && (
                  <Link
                    href={philosophyContent.ctaLinks.menu}
                    className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-2 hover:bg-muted transition-colors"
                  >
                    Bekijk menu
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>

      {/* Local keyframes for the marquee */}
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
