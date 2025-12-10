'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { type Maker, makersIntro } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Leaf,
  Wine,
  Coffee,
  MapPin,
  ExternalLink,
  Beer,
  BadgeHelp,
  Search,
} from "lucide-react";

// Dynamically import the detail panel to reduce initial bundle size
const MakerDetail = dynamic(() => import('./MakerDetail'), { ssr: false });

const catIcon: Record<Maker["category"], any> = {
  Brouwerij: Beer,
  Koffie: Coffee,
  Wijn: Wine,
  Vlees: Leaf,
  Overig: BadgeHelp,
};

const categories: Maker["category"][] = ["Brouwerij", "Koffie", "Wijn", "Vlees", "Overig"];

type MakersClientProps = {
  makers: Maker[];
};

export default function MakersClient({ makers }: MakersClientProps) {
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
  }, [q, filter, makers]);

  return (
    <div className="relative bg-background">
      {/* soft vignette + optimized grain */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-gradient-to-b from-primary/5 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] hidden sm:block"
        style={{ backgroundImage: "url(/noise.png)" }}
      />

      <div className="relative container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        {/* header */}
        <header className="text-center mb-8 sm:mb-10">
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
        </header>

        {/* controls */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
        </div>

        {/* marquee of names */}
        <div className="mb-8">
          <div className="relative overflow-hidden rounded-xl border border-border">
            <div className="flex gap-8 py-4 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
              {[...makers, ...makers].map((m, i) => (
                <span key={i} className="whitespace-nowrap text-sm sm:text-base text-foreground/80">
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* grid */}
        <section
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
                          prefetch={false}
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
        </section>
      </div>

      {/* Render the dynamically imported detail panel when a maker is active */}
      {active && (
        <MakerDetail maker={active} onClose={() => setActive(null)} />
      )}

      {/* marquee keyframes */}
      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_28s_linear_infinite\\] { 
            animation: none !important; 
          }
        }
      `}</style>
    </div>
  );
}
