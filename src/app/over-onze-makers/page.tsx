// app/(site)/makers/page.tsx
'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { makersIntro, makers, type Maker } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Leaf,
  Wine,
  Coffee,
  MapPin,
  ExternalLink,
  Beer,
  BadgeHelp,
  X,
  Search,
} from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.32, ease: "easeOut" },
};

const catIcon: Record<Maker["category"], any> = {
  Brouwerij: Beer,
  Koffie: Coffee,
  Wijn: Wine,
  Vlees: Leaf,
  Overig: BadgeHelp,
};

const categories: Maker["category"][] = ["Brouwerij", "Koffie", "Wijn", "Vlees", "Overig"];

export default function MakersPage() {
  const [active, setActive] = useState<Maker | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Maker["category"] | "Alle">("Alle");

  const items = useMemo(() => {
    let list = makers;
    if (filter !== "Alle") list = list.filter((m) => m.category === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(s) ||
          (m.location?.toLowerCase().includes(s) ?? false) ||
          m.blurb.toLowerCase().includes(s)
      );
    }
    return list;
  }, [q, filter]);

  return (
    <div className="relative bg-background">
      {/* soft vignette + grain */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.8'/></svg>\")",
        }}
      />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* header */}
        <motion.header {...fade} className="text-center mb-8 sm:mb-10">
          <p className="inline-block text-xs tracking-widest uppercase text-primary/80 mb-2">
            {makersIntro.kicker}
          </p>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">
            {makersIntro.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            {makersIntro.lead}
          </p>
          <p className="mt-2 max-w-2xl mx-auto text-sm sm:text-base text-foreground/80">
            {makersIntro.cta}
          </p>
        </motion.header>

        {/* controls */}
        <motion.div {...fade} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("Alle")}
              className={`rounded-full border px-3 py-1 text-sm ${filter === "Alle" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
            >
              Alle
            </button>
            {categories.map((c) => {
              const Icon = catIcon[c];
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-3 py-1 text-sm inline-flex items-center gap-1.5 ${active ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`}
                >
                  <Icon className="h-4 w-4" />
                  {c}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek maker, locatie of trefwoord…"
              className="w-full sm:w-80 rounded-xl border border-border bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </motion.div>

        {/* marquee of names */}
        <motion.div {...fade} className="mb-8">
          <div className="relative overflow-hidden rounded-xl border border-border">
            <div className="flex gap-8 py-4 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
              {[...makers, ...makers].map((m, i) => (
                <span key={i} className="whitespace-nowrap text-sm sm:text-base text-foreground/80">
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* grid */}
        <motion.section
          {...fade}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {items.map((m) => {
            const Icon = catIcon[m.category];
            const img = m.imageId
              ? PlaceHolderImages.find((p) => p.id === m.imageId)
              : null;

            return (
              <article
                key={m.slug}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10"
              >
                <div className="rounded-2xl bg-card overflow-hidden shadow-[0_1px_0_0_rgba(0,0,0,0.03)] flex flex-col">
                  {/* image */}
                  <div className="relative h-44 w-full">
                    {img ? (
                      <Image
                        src={img.imageUrl}
                        alt={img.description}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        data-ai-hint={img.imageHint}
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-muted to-muted/60" />
                    )}
                    {/* category pill */}
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur px-2 py-1 text-xs border border-border">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      {m.category}
                    </span>
                  </div>

                  {/* body */}
                  <div className="p-4 flex-1 flex flex-col gap-2">
                    <h3 className="font-headline text-lg">{m.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      {m.location && <>
                        <MapPin className="h-3.5 w-3.5" />
                        {m.location}
                      </>}
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {m.blurb}
                    </p>
                    <div className="mt-auto pt-2 flex gap-2">
                      <button
                        onClick={() => setActive(m)}
                        className="inline-flex items-center justify-center rounded-xl border border-border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
                        aria-label={`Lees verhaal van ${m.name}`}
                      >
                        Lees verhaal
                      </button>
                      {m.website && (
                        <Link
                          href={m.website}
                          target="_blank"
                          className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
                        >
                          Website <ExternalLink className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.section>
      </div>

      {/* detail panel (simple fixed bottom sheet) */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50"
          onClick={() => setActive(null)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          <div
            className="absolute inset-x-0 bottom-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:w-[720px] rounded-t-2xl sm:rounded-2xl border border-border bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-primary/80">
                    Maker
                  </p>
                  <h3 className="font-headline text-2xl">{active.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                    {active.location && (
                      <>
                        <MapPin className="h-3.5 w-3.5" />
                        {active.location}
                      </>
                    )}
                  </p>
                </div>
                <button
                  className="inline-flex rounded-xl border border-border p-1.5 hover:bg-muted"
                  onClick={() => setActive(null)}
                  aria-label="Sluiten"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-foreground/90">
                <p className="font-medium">{active.blurb}</p>
                {active.story?.map((para, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                {active.website && (
                  <Link
                    href={active.website}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Bezoek website <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </Link>
                )}
                <button
                  onClick={() => setActive(null)}
                  className="inline-flex items-center justify-center rounded-xl border border-border px-3 py-1.5 text-sm hover:bg-muted"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* marquee keyframes */}
      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
