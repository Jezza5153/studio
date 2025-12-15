"use client";

import { useMemo, useState, useCallback, Fragment } from "react";
import { MENU, type MenuItem, type MenuCategory } from "@/content/menu";
import { Badge } from "@/components/ui/badge";
import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // ✅ added

// ===== Helpers =====
function formatPriceNoCurrency(price: number | null) {
  if (price == null) return "";
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

const TAG_LABELS: Record<string, string> = {
  V: "Vegetarisch",
  VG: "Vegan",
  GF: "Glutenvrij",
};

function slugify(input: string) {
  return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}
function capitalize(s: string) {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

// ===== Page =====
export default function MenuPage() {
  const categories: (MenuCategory & { id: string })[] = useMemo(
    () => MENU.categories.map((c) => ({ ...c, id: slugify(c.name) })),
    []
  );

  // Share button
  const [copied, setCopied] = useState(false);
  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = "De Tafelaar – Menu";
    const text = "Ons menu bekijken?";

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Header */}
      <header className="mb-8 sm:mb-10 md:mb-12">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                Ons Menu
              </h1>
              <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
                Shared dining met liefde voor seizoen, lokaal en gezelligheid. Kies je favoriete
                gerechtjes — of laat de chef je verrassen.
              </p>

              {/* ✅ Menu switch: Eten (active) / Dranken */}
              <nav className="mt-4" aria-label="Menu switch">
                <div className="inline-flex items-center gap-2">
                  <Button asChild size="sm" aria-current="page">
                    <Link href="/menu">Eten</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/drank">Dranken</Link>
                  </Button>
                </div>
              </nav>
            </div>

            <Button
              variant="outline"
              className="hidden sm:inline-flex gap-2"
              onClick={share}
              aria-label="Deel deze menupagina"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Link Gekopieerd" : "Deel"}
            </Button>
          </div>
        </div>
      </header>

      {/* MOBILE + DESKTOP LAYOUT MERGED */}
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="rounded-2xl border bg-card/90 p-6 md:p-8"
              aria-labelledby={`${category.id}-title`}
            >
              <div className="mb-5">
                <h2
                  id={`${category.id}-title`}
                  className="font-headline text-2xl md:text-3xl tracking-tight"
                >
                  {category.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.items.length} {category.items.length === 1 ? "gerecht" : "gerechten"}
                </p>
              </div>

              <ul className="divide-y divide-border/70">
                {category.items.map((item) => (
                  <li key={item.name} className="py-4 first:pt-0 last:pb-0">
                    <MenuRow item={item} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-10 md:mt-14 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Heeft u een allergie? Laat het ons weten — we denken graag mee.
        </p>
      </footer>
    </div>
  );
}

/* ===== Combined Menu Row (for mobile and desktop) ===== */
function MenuRow({ item }: { item: MenuItem }) {
  const showMeta = (item.tags?.length ?? 0) > 0 || (item.allergens?.length ?? 0) > 0;

  return (
    <div className="min-w-0">
      {/* Naam + prijs */}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight truncate">{item.name}</h3>
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatPriceNoCurrency(item.price)}
        </p>
      </div>

      {/* Beschrijving */}
      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      )}

      {/* Subtiele meta */}
      {showMeta && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {/* Tags – outline, neutraal */}
          {item.tags?.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-border text-foreground/70 bg-transparent text-[11px] px-2.5 py-1 rounded-full"
              title={TAG_LABELS[t] ?? t}
            >
              {TAG_LABELS[t] ?? t}
            </Badge>
          ))}

          {/* Allergenen – ook outline/neutral */}
          {item.allergens?.length ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-foreground/60 mr-1">Allergenen:</span>
              {item.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-transparent px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                >
                  {capitalize(a)}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
