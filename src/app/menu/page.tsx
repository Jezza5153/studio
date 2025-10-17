"use client";

import { useMemo } from "react";
import { MENU, type MenuItem, type MenuCategory, __MENU_DEBUG_SOURCE } from "@/content/menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Info } from "lucide-react";

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

const PDF_URL = "/menu/tafelaar-menu.pdf";

function slugify(input: string) {
  return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}

export default function MenuPage() {
  // DEBUG: verify correct data source at runtime
  console.log("[MENU DEBUG]", __MENU_DEBUG_SOURCE, MENU.title, MENU.categories.map(c => c.name));

  const categories: (MenuCategory & { id: string })[] = useMemo(
    () => MENU.categories.map((c) => ({ ...c, id: slugify(c.name) })),
    []
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <header className="mb-8 sm:mb-10 md:mb-12">
        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            Ons Menu
          </h1>
          <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
            Shared dining met liefde voor seizoen, lokaal en gezelligheid. Kies je favoriete
            gerechtjes — of laat de chef je verrassen.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Open PDF
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={PDF_URL} download="De-Tafelaar-Menu.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </div>
        </div>

        <nav className="sticky top-16 z-40 -mx-1 overflow-x-auto py-3">
          <ul className="flex items-center gap-2">
            {categories.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex whitespace-nowrap rounded-full border bg-background px-3 py-1.5 text-sm hover:bg-accent/20 transition-colors"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="space-y-8 sm:space-y-10">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="rounded-2xl border bg-card p-5 sm:p-6"
          >
            <div className="mb-4 sm:mb-5">
              <h2 className="font-headline text-2xl sm:text-3xl tracking-tight">{category.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {category.items.length} {category.items.length === 1 ? "gerecht" : "gerechten"}
              </p>
            </div>
            <ul className="divide-y">
              {category.items.map((item) => (
                <li key={item.name} className="py-4 first:pt-0 last:pb-0">
                  <MenuRow item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <footer className="mt-10 sm:mt-14 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Heeft u een allergie? Laat het ons weten — we denken graag mee.
        </p>
      </footer>
    </div>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const showMeta = (item.tags?.length ?? 0) > 0 || (item.allergens?.length ?? 0) > 0;
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatPriceNoCurrency(item.price)}
        </p>
      </div>
      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      )}
      {showMeta && (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {item.tags?.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-emerald-300 bg-emerald-100/80 text-emerald-900 text-[11px] px-2.5 py-1"
              title={TAG_LABELS[t] ?? t}
            >
              {TAG_LABELS[t] ?? t}
            </Badge>
          ))}
          {item.allergens?.length ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-medium text-foreground/80 mr-1">Allergenen:</span>
              {item.allergens.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-amber-400 bg-amber-200 px-2.5 py-1 text-[11px] font-semibold text-amber-950"
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

function capitalize(s: string) {
  return s.length ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
