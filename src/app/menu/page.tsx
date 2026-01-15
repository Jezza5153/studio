
"use client";

import { useMemo, useState, useCallback, Fragment } from "react";
import { MENU, type MenuItem, type MenuCategory } from "@/content/menu";
import { Badge } from "@/components/ui/badge";
import { Info, Share2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ===== Helpers =====
function formatPriceNoCurrency(price: number | null) {
  if (price == null) return "";
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// Dietary tag icons and colors
const TAG_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  V: { label: "Vegetarisch", color: "bg-green-500", icon: "🌿" },
  VG: { label: "Vegan", color: "bg-emerald-600", icon: "🌱" },
  GF: { label: "Glutenvrij", color: "bg-amber-500", icon: "🌾" },
};

// Allergen icons - subtle colored circles (only relevant ones)
const ALLERGEN_CONFIG: Record<string, { label: string; color: string }> = {
  lactose: { label: "Lactose", color: "bg-blue-400" },
  gluten: { label: "Gluten", color: "bg-amber-400" },
  noten: { label: "Noten", color: "bg-yellow-600" },
  selderij: { label: "Selderij", color: "bg-lime-500" },
  sesam: { label: "Sesam", color: "bg-stone-400" },
  sulfiet: { label: "Sulfiet", color: "bg-purple-400" },
  pinda: { label: "Pinda", color: "bg-orange-600" },
};

function slugify(input: string) {
  return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
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
    } catch { }
  }, []);

  // Collect all allergens used in the menu for the legend
  const usedAllergens = useMemo(() => {
    const allergenSet = new Set<string>();
    MENU.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        item.allergens?.forEach((a) => allergenSet.add(a.toLowerCase()));
      });
    });
    return Array.from(allergenSet).sort();
  }, []);

  // Collect all tags used
  const usedTags = useMemo(() => {
    const tagSet = new Set<string>();
    MENU.categories.forEach((cat) => {
      cat.items.forEach((item) => {
        item.tags?.forEach((t) => tagSet.add(t));
      });
    });
    return Array.from(tagSet);
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

              {/* Menu switch: Eten (active) / Dranken */}
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

      {/* ===== LEGEND SECTION (at top to prevent confusion) ===== */}
      <section className="mb-8 sm:mb-10 md:mb-12">
        <div className="rounded-2xl border bg-card/80 p-4 md:p-6">
          <div className="flex flex-wrap items-start gap-6 md:gap-10">
            {/* Dietary Tags Legend */}
            {usedTags.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-green-600" />
                  Dieet:
                </span>
                <div className="flex flex-wrap gap-3">
                  {usedTags.map((tag) => {
                    const config = TAG_CONFIG[tag];
                    if (!config) return null;
                    return (
                      <div key={tag} className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${config.color} ring-1 ring-white/50`} />
                        <span className="text-sm text-muted-foreground">{config.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Allergen Legend */}
            {usedAllergens.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 pt-0.5">
                  <Info className="h-3.5 w-3.5 text-amber-600" />
                  Allergenen:
                </span>
                <div className="flex flex-wrap gap-2">
                  {usedAllergens.map((allergen) => {
                    const config = ALLERGEN_CONFIG[allergen];
                    const color = config?.color ?? "bg-gray-400";
                    const label = config?.label ?? allergen;
                    return (
                      <div key={allergen} className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${color} ring-1 ring-white/30`} />
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
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

      {/* Simple footer with allergen note */}
      <footer className="mt-10 md:mt-14 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Heeft u een allergie? Laat het ons weten — we denken graag mee.
        </p>
      </footer>
    </div>
  );
}

/* ===== Menu Row with Icon System ===== */
function MenuRow({ item }: { item: MenuItem }) {
  const hasTags = (item.tags?.length ?? 0) > 0;
  const hasAllergens = (item.allergens?.length ?? 0) > 0;

  return (
    <div className="min-w-0">
      {/* Name + Price + Icons row */}
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <h3 className="text-lg font-semibold leading-tight truncate">{item.name}</h3>
          {/* Tag icons inline with name */}
          {hasTags && (
            <div className="flex items-center gap-1 shrink-0">
              {item.tags?.map((tag) => {
                const config = TAG_CONFIG[tag];
                if (!config) return null;
                return (
                  <span
                    key={tag}
                    className={`w-3 h-3 rounded-full ${config.color} ring-1 ring-white/50`}
                    title={config.label}
                  />
                );
              })}
            </div>
          )}
          {/* Allergen icons inline */}
          {hasAllergens && (
            <div className="flex items-center gap-1 shrink-0">
              {item.allergens?.map((allergen) => {
                const a = allergen.toLowerCase();
                const config = ALLERGEN_CONFIG[a];
                const color = config?.color ?? "bg-gray-400";
                return (
                  <span
                    key={a}
                    className={`w-2.5 h-2.5 rounded-full ${color} ring-1 ring-white/30`}
                    title={config?.label ?? allergen}
                  />
                );
              })}
            </div>
          )}
        </div>
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatPriceNoCurrency(item.price)}
        </p>
      </div>

      {/* Description */}
      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      )}
    </div>
  );
}

