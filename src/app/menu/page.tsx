
"use client";

import { useMemo, useState, useCallback } from "react";
import {
    LUNCH_MENU,
    DINNER_MENU,
    type MenuCategory,
} from "@/content/menu";
import { Info, Share2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ReserveerButton } from "@/components/reserveer-button";
import { MenuRow } from "./MenuRow";
import { MenuChoiceCard } from "./MenuChoiceCard";
import { MenuStickyNav } from "./MenuStickyNav";
import {
    ALLERGEN_CONFIG,
    TAG_CONFIG,
    collectUsedAllergens,
    collectUsedTags,
    slugify,
} from "./utils";

// Anchors used by both the sticky nav and the choice cards.
const ANCHORS = {
    lunch: "lunchkaart",
    dinner: "dinerkaart",
    drinks: "dranken",
    allergens: "allergenen",
} as const;

// Helper — prepend a stable, prefixed slug per menu so anchors don't collide
// across the page (lunch "Desserts" and diner "Dessert" would otherwise clash).
function withIds(prefix: string, categories: MenuCategory[]): (MenuCategory & { id: string })[] {
    return categories.map((c) => ({ ...c, id: `${prefix}-${slugify(c.name)}` }));
}

export default function MenuPage() {
    const lunchCategories = useMemo(() => withIds("lunch", LUNCH_MENU.categories), []);
    const dinnerCategories = useMemo(() => withIds("diner", DINNER_MENU.categories), []);

    // Legend reflects every tag / allergen used across BOTH menus combined.
    const usedTags = useMemo(() => collectUsedTags([LUNCH_MENU, DINNER_MENU]), []);
    const usedAllergens = useMemo(() => collectUsedAllergens([LUNCH_MENU, DINNER_MENU]), []);

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

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
            {/* ===== HERO ===== */}
            <header className="mb-8 sm:mb-10">
                <Card className="rounded-2xl border bg-card p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                                Lunch &amp; diner bij De Tafelaar
                            </h1>
                            <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
                                Overdag gezellig lunchen in Amersfoort centrum. &lsquo;s Avonds shared dining met
                                kleine gerechten om samen te delen, lokale producten en Chef&apos;s Choice.
                            </p>

                            {/* Hero CTAs */}
                            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                                <Button asChild size="sm" className="rounded-xl">
                                    <Link href={`#${ANCHORS.lunch}`}>Bekijk lunchkaart</Link>
                                </Button>
                                <Button asChild size="sm" variant="outline" className="rounded-xl">
                                    <Link href={`#${ANCHORS.dinner}`}>Bekijk dinerkaart</Link>
                                </Button>
                                <ReserveerButton size="sm" label="Reserveer tafel" />
                            </div>

                            {/* Eten / Dranken toggle (existing) */}
                            <nav className="mt-4" aria-label="Menu switch">
                                <div className="inline-flex items-center gap-2">
                                    <Button asChild size="sm" variant="secondary" aria-current="page">
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
                            className="hidden sm:inline-flex gap-2 shrink-0"
                            onClick={share}
                            aria-label="Deel deze menupagina"
                        >
                            <Share2 className="h-4 w-4" />
                            {copied ? "Link Gekopieerd" : "Deel"}
                        </Button>
                    </div>
                </Card>
            </header>

            {/* ===== CHOICE CARDS ===== */}
            <section className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" aria-label="Kies een kaart">
                <MenuChoiceCard
                    title="Lunchkaart"
                    blurb="Voor een ontspannen lunch, borrel of iets kleins overdag. Broodjes, salades en gerechten om samen te delen."
                    highlight="Populair: Bao Buns & De Klassiekelaar"
                    href={`#${ANCHORS.lunch}`}
                    cta="Naar lunchkaart"
                    tone="soft"
                />
                <MenuChoiceCard
                    title="Dinerkaart"
                    blurb="Shared dining in Amersfoort: kazen, charcuterie, warme gerechten, desserts en Chef's Choice."
                    highlight="Populair: Chef's Choice & shared dining"
                    href={`#${ANCHORS.dinner}`}
                    cta="Naar dinerkaart"
                />
            </section>

            {/* ===== STICKY ANCHOR NAV ===== */}
            <MenuStickyNav
                links={[
                    { href: `#${ANCHORS.lunch}`, label: "Lunchkaart" },
                    { href: `#${ANCHORS.dinner}`, label: "Dinerkaart" },
                    { href: `#${ANCHORS.drinks}`, label: "Dranken" },
                    { href: `#${ANCHORS.allergens}`, label: "Allergenen" },
                ]}
            />

            {/* ===== LUNCHKAART ===== */}
            <section
                id={ANCHORS.lunch}
                aria-labelledby="lunchkaart-title"
                className="scroll-mt-28 mb-12 sm:mb-16"
            >
                <div className="mb-6 sm:mb-8 max-w-prose">
                    <h2 id="lunchkaart-title" className="font-headline text-3xl sm:text-4xl tracking-tight">
                        Lunchkaart
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Kom langs voor een rustige lunch, iets kleins overdag of een gezellige middag aan
                        tafel. Onze lunchkaart is compact, vers en seizoensgebonden.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
                    {lunchCategories.map((category) => (
                        <section
                            key={category.id}
                            id={category.id}
                            className="rounded-2xl border bg-card/60 p-6 md:p-7"
                            aria-labelledby={`${category.id}-title`}
                        >
                            <div className="mb-5">
                                <h3
                                    id={`${category.id}-title`}
                                    className="font-headline text-xl md:text-2xl tracking-tight"
                                >
                                    {category.name}
                                </h3>
                                {category.note && (
                                    <p className="mt-1 text-xs sm:text-sm italic text-muted-foreground">
                                        {category.note}
                                    </p>
                                )}
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
            </section>

            {/* ===== DINERKAART ===== */}
            <section
                id={ANCHORS.dinner}
                aria-labelledby="dinerkaart-title"
                className="scroll-mt-28 mb-12 sm:mb-16"
            >
                <div className="mb-6 sm:mb-8 max-w-prose">
                    <h2 id="dinerkaart-title" className="font-headline text-3xl sm:text-4xl tracking-tight">
                        Dinerkaart
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        &lsquo;s Avonds draait De Tafelaar om shared dining: kleine gerechten, kazen,
                        charcuterie, warme seizoensgerechten en Chef&apos;s Choice om samen van te genieten.
                        Gerechten van €3,50 tot €15, of kies het Chef&apos;s Choice (€45 p.p.).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {dinnerCategories.map((category) => (
                        <section
                            key={category.id}
                            id={category.id}
                            className="rounded-2xl border bg-card/90 p-6 md:p-8"
                            aria-labelledby={`${category.id}-title`}
                        >
                            <div className="mb-5">
                                <h3
                                    id={`${category.id}-title`}
                                    className="font-headline text-2xl md:text-3xl tracking-tight"
                                >
                                    {category.name}
                                </h3>
                                {category.note && (
                                    <p className="mt-1 text-xs sm:text-sm italic text-muted-foreground">
                                        {category.note}
                                    </p>
                                )}
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
            </section>

            {/* ===== DRANKEN TEASER ===== */}
            <section
                id={ANCHORS.drinks}
                aria-labelledby="dranken-title"
                className="scroll-mt-28 mb-12 sm:mb-16"
            >
                <Card className="rounded-2xl border bg-card/80 p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="max-w-prose">
                            <h2 id="dranken-title" className="font-headline text-2xl sm:text-3xl tracking-tight">
                                Drankenkaart
                            </h2>
                            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Bij elk gerecht past een goed glas. Van natuurlijke wijnen en lokale bieren
                                tot koffie van Boot Koffie en alcoholvrije opties.
                            </p>
                        </div>
                        <Button asChild className="rounded-xl shrink-0">
                            <Link href="/drank">Bekijk de drankenkaart</Link>
                        </Button>
                    </div>
                </Card>
            </section>

            {/* ===== ALLERGENEN / DIEET LEGEND ===== */}
            <section
                id={ANCHORS.allergens}
                aria-labelledby="allergenen-title"
                className="scroll-mt-28 mb-10 sm:mb-12"
            >
                <Card className="rounded-2xl border bg-card/80 p-4 md:p-6">
                    <h2 id="allergenen-title" className="font-headline text-xl sm:text-2xl tracking-tight mb-4">
                        Allergenen &amp; dieet
                    </h2>
                    <div className="flex flex-wrap items-start gap-6 md:gap-10">
                        {usedTags.length > 0 && (
                            <div className="flex items-start gap-3">
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 pt-0.5">
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
                </Card>
            </section>

            {/* Simple footer with allergen note */}
            <footer className="mt-2 border-t pt-6 text-center text-sm text-muted-foreground">
                <p className="inline-flex items-center justify-center gap-2">
                    <Info className="h-4 w-4" />
                    Heeft u een allergie? Laat het ons weten — we denken graag mee.
                </p>
            </footer>
        </div>
    );
}
