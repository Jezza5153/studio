"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MENU, type MenuItem, type MenuCategory } from "@/content/menu";
import { Badge } from "@/components/ui/badge";
import { Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  // Active chip highlight while scrolling
  const [active, setActive] = useState<string>(categories[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.target.id) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [categories]);

  // Smooth scroll handler
  const onChipClick = useCallback((slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${slug}`);
  }, []);

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
    } catch {
      // cancelled: do nothing
    }
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

        {/* Sticky category nav */}
        <nav
          className="sticky top-16 z-40 -mx-1 overflow-x-auto py-3"
          aria-label="Categorieën"
        >
          <ul className="flex items-center gap-2">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onChipClick(c.id);
                    }}
                    className={[
                      "inline-flex whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors",
                      isActive ? "bg-muted text-foreground" : "bg-background hover:bg-accent/20",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
                    ].join(" ")}
                  >
                    {c.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* MOBILE: accordion */}
      <section className="sm:hidden">
        <Accordion type="single" collapsible className="w-full space-y-3">
          {categories.map((category) => (
            <div key={category.id}>
              <AccordionItem value={category.id} className="border rounded-xl">
                <AccordionTrigger className="px-4 py-3 text-left font-headline text-lg">
                  <div className="flex w-full items-baseline justify-between gap-3">
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.items.length}{" "}
                      {category.items.length === 1 ? "gerecht" : "gerechten"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <ul className="divide-y">
                    {category.items.map((item) => (
                      <li key={item.name} className="py-3">
                        <MenuRow item={item} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            className="inline-flex gap-2"
            onClick={share}
            aria-label="Deel deze menupagina"
          >
            <Share2 className="h-4 w-4" />
            {copied ? "Link Gekopieerd" : "Deel"}
          </Button>
        </div>
      </section>

      {/* DESKTOP/TABLET */}
      <main className="hidden sm:block space-y-8 md:space-y-10">
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="rounded-2xl border bg-card p-5 sm:p-6 scroll-mt-28"
            aria-labelledby={`${category.id}-title`}
          >
            <div className="mb-4 sm:mb-5">
              <h2
                id={`${category.id}-title`}
                className="font-headline text-2xl sm:text-3xl tracking-tight"
              >
                {category.name}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                {category.items.length}{" "}
                {category.items.length === 1 ? "gerecht" : "gerechten"}
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

      <footer className="mt-10 md:mt-14 border-t pt-6 text-center text-sm text-muted-foreground">
        <p className="inline-flex items-center justify-center gap-2">
          <Info className="h-4 w-4" />
          Heeft u een allergie? Laat het ons weten — we denken graag mee.
        </p>
      </footer>
    </div>
  );
}

// ===== Menu Row =====
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
              <span className="text-[11px] font-medium text-foreground/80 mr-1">
                Allergenen:
              </span>
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
