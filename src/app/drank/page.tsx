"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DRINKS, type DrinkItem, type DrinkCategory, type DrinkSection } from "@/content/drinks";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// ===== Helpers =====
function formatPriceNoCurrency(price: number | null | undefined) {
  if (price == null) return "";
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function buildSecondaryPriceLine(item: DrinkItem) {
  const parts: string[] = [];
  if (item.priceGlass != null) parts.push(`Glas ${formatPriceNoCurrency(item.priceGlass)}`);
  if (item.priceBottle != null) parts.push(`Fles ${formatPriceNoCurrency(item.priceBottle)}`);
  if (item.priceSmall != null) parts.push(`Klein ${formatPriceNoCurrency(item.priceSmall)}`);
  if (item.priceLarge != null) parts.push(`Groot ${formatPriceNoCurrency(item.priceLarge)}`);
  // If item has only a single “price”, no need for a secondary line
  return parts.length > 1 ? parts.join(" • ") : parts.length === 1 && item.price == null ? parts[0] : "";
}

export default function DrankPage() {
  const sections: (DrinkSection & { id: string })[] = useMemo(
    () =>
      DRINKS.sections.map((s: DrinkSection) => ({
        ...s,
        id: s.name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-"),
      })),
    []
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Header */}
      <header className="mb-8 sm:mb-10 md:mb-12">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">Dranken</h1>
              <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
                Van mooie wijnen en bieren tot cocktails, fris en koffie — kies iets wat past bij je gerechtjes.
              </p>

              {/* Switch: Eten / Dranken */}
              <nav className="mt-4" aria-label="Menu switch">
                <div className="inline-flex items-center gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/menu">Eten</Link>
                  </Button>
                  <Button asChild size="sm" aria-current="page">
                    <Link href="/drank">Dranken</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Sections grid (1 col mobile, 2 col desktop) */}
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-2xl border bg-card/90 p-6 md:p-8"
              aria-labelledby={`${section.id}-title`}
            >
              <div className="mb-5">
                <h2 id={`${section.id}-title`} className="font-headline text-2xl md:text-3xl tracking-tight">
                  {section.name}
                </h2>
                {section.intro ? (
                  <p className="text-sm text-muted-foreground mt-1">{section.intro}</p>
                ) : null}
              </div>

              {/* Each category within the section */}
              <div className="space-y-6">
                {section.categories.map((cat: DrinkCategory) => (
                  <div key={cat.name}>
                    <h3 className="text-lg font-semibold mb-2">{cat.name}</h3>
                    <ul className="divide-y divide-border/70">
                      {cat.items.map((item) => (
                        <li key={item.name} className="py-4 first:pt-0 last:pb-0">
                          <DrinkRow item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="mt-10 md:mt-14 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Drink met mate, geniet samen. Vraag ons team voor een passende wijn- of bierkeuze.
        </p>
      </footer>
    </div>
  );
}

function DrinkRow({ item }: { item: DrinkItem }) {
  // Primary price to show on the right
  const primary =
    item.price ?? item.priceGlass ?? item.priceSmall ?? item.priceBottle ?? item.priceLarge ?? null;

  const secondary = buildSecondaryPriceLine(item);

  return (
    <div className="min-w-0">
      {/* Naam + primaire prijs */}
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-lg font-semibold leading-tight truncate">{item.name}</h4>
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatPriceNoCurrency(primary)}
        </p>
      </div>

      {/* Beschrijving */}
      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      )}

      {/* Secundaire prijslijn (glas/fles/klein/groot) */}
      {secondary && (
        <p className="mt-1 text-xs text-muted-foreground tabular-nums">{secondary}</p>
      )}
    </div>
  );
}
