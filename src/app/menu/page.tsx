"use client";

import { useMemo, useState, useCallback, Fragment, CSSProperties } from "react";
import { MENU, type MenuItem, type MenuCategory } from "@/content/menu";
import { Badge } from "@/components/ui/badge";
import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      {/* MOBILE: 2-column per category (no accordion) */}
      <section className="sm:hidden space-y-8">
        {categories.map((category) => (
          <Fragment key={category.id}>
            <h2 className="font-headline text-xl mb-3">{category.name}</h2>
            <div className="grid grid-cols-2 gap-3">
              {category.items.map((item) => (
                <MenuCardMobile key={item.name} item={item} />
              ))}
            </div>
          </Fragment>
        ))}
      </section>

      {/* DESKTOP/TABLET – no internal scroll; items flow into columns inside each tile */}
      <main className="hidden sm:block">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              className="h-full scroll-mt-28 rounded-[14px] border-2 border-border bg-card p-5 sm:p-6 md:p-8"
              aria-labelledby={`${category.id}-title`}
            >
              <div className="mb-4 sm:mb-5">
                <h2
                  id={`${category.id}-title`}
                  className="font-headline text-2xl sm:text-3xl tracking-tight text-balance"
                >
                  {category.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.items.length} {category.items.length === 1 ? "gerecht" : "gerechten"}
                </p>
              </div>

              {/* Key: columns! */}
              <ul className="columns-2 xl:columns-3 gap-x-8 [column-fill:_balance]">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="mb-5 inline-block w-full align-top"
                    style={{ breakInside: "avoid" } as CSSProperties}
                  >
                    <MenuRowColumn item={item} />
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

/* ===== Desktop/Tablet row variant tuned for column layout ===== */
function MenuRowColumn({ item }: { item: MenuItem }) {
  const showMeta = (item.tags?.length ?? 0) > 0 || (item.allergens?.length ?? 0) > 0;

  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg">
      {/* Top line: name — dotted leader — price */}
      <div className="flex items-baseline gap-3">
        <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
        <div aria-hidden className="flex-1 mx-3 border-t border-dotted border-foreground/30 translate-y-1" />
        <p className="shrink-0 text-lg font-semibold tabular-nums">
          {formatPriceNoCurrency(item.price)}
        </p>
      </div>

      {item.description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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

/* ===== Mobile card (2-col grid) ===== */
function MenuCardMobile({ item }: { item: MenuItem }) {
  return (
    <div className="rounded-xl border p-3 bg-background/60">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
        <span className="text-base font-semibold tabular-nums">
          {formatPriceNoCurrency(item.price)}
        </span>
      </div>

      {item.description && (
        <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
      )}

      <div className="mt-2 flex flex-wrap gap-1.5">
        {item.tags?.map((t) => (
          <Badge
            key={t}
            variant="outline"
            className="border-emerald-300 bg-emerald-100/80 text-emerald-900 text-[10px] px-2 py-0.5"
            title={TAG_LABELS[t] ?? t}
          >
            {TAG_LABELS[t] ?? t}
          </Badge>
        ))}
      </div>
    </div>
  );
}
