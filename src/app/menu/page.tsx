"use client";

import { useMemo } from "react";
import { MENU, type MenuItem, type MenuCategory } from "@/content/menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Leaf, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

// ===== Helpers =====
function formatCurrency(price: number | null, currency: string) {
  if (price === null) return "";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

const TAG_LABELS: Record<string, string> = {
  V: "Vegetarisch",
  VG: "Vegan",
  GF: "Glutenvrij",
};

const TAG_ICON: Record<string, React.ComponentType<any>> = {
  V: Leaf,
  VG: Leaf,
  GF: ShieldCheck,
};

const PDF_URL = "/menu/tafelaar-menu.pdf";

// Make a clean anchor id from a category name
function slugify(input: string) {
  return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}

// ===== Page =====
export default function MenuPage() {
  const categories: (MenuCategory & { id: string })[] = useMemo(
    () => MENU.categories.map((c) => ({ ...c, id: slugify(c.name) })),
    []
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      {/* Header / intro */}
      <header className="mb-8 sm:mb-10 md:mb-12 flex flex-col gap-6">
        <div className="rounded-2xl border bg-gradient-to-br from-accent/10 to-transparent p-6 sm:p-8">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
            {MENU.title}
          </h1>
          <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
            Shared dining met liefde voor seizoen, lokaal en gezelligheid. Kies je favoriete
            gerechtjes om te delen — of laat de chef je verrassen.
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
            <p className="text-xs text-muted-foreground sm:ml-3">
              Prijzen in {MENU.currency}. Wijzigingen voorbehouden.
            </p>
          </div>
        </div>

        {/* Sticky category nav */}
        <nav className="sticky top-16 z-40 -mx-1 overflow-x-auto py-1">
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

      {/* Sections */}
      <main className="space-y-10 sm:space-y-12">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="rounded-2xl border bg-card/60 p-5 sm:p-6 shadow-sm"
          >
            <h2 className="font-headline text-2xl sm:text-3xl mb-4 sm:mb-6 tracking-tight">
              {category.name}
            </h2>

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

      {/* Footer note */}
      <footer className="mt-12 sm:mt-16 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Heeft u een allergie? Laat het ons weten — we denken graag mee.
        </p>
      </footer>
    </div>
  );
}

// ===== Row component (name • dotted leader • price), description, tags, allergens =====
function MenuRow({ item }: { item: MenuItem }) {
  const hasMeta = (item.tags?.length ?? 0) > 0 || (item.allergens?.length ?? 0) > 0;

  return (
    <div className="grid grid-cols-1 gap-2">
      {/* Top line: name • dots • price */}
      <div className="flex items-baseline gap-3">
        <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>

        {/* dotted leader */}
        <span className="mx-1 flex-1 border-b border-dotted border-muted-foreground/40 translate-y-[6px]" />

        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatCurrency(item.price, MENU.currency)}
        </p>
      </div>

      {/* Description */}
      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      )}

      {/* Tags + Allergens */}
      {hasMeta && (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          {item.tags?.map((t) => (
            <TagBadge key={t} tag={t} />
          ))}
          {item.allergens?.length ? (
            <span className="text-[11px] text-muted-foreground/80">
              <span className="font-medium">Allergenen:</span> {item.allergens.join(", ")}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}

function TagBadge({ tag }: { tag: string }) {
  const label = TAG_LABELS[tag] ?? tag;
  const Icon = TAG_ICON[tag];

  return (
    <Badge variant="outline" className="border-accent text-accent-foreground gap-1.5">
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {label}
    </Badge>
  );
}
