
"use client";

import { useMemo, useState, useCallback } from "react";
import { DINNER_MENU, type MenuCategory } from "@/content/menu";
import { Info, Share2, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ReserveerButton } from "@/components/reserveer-button";
import { MenuRow } from "./MenuRow";
import {
    ALLERGEN_CONFIG,
    TAG_CONFIG,
    collectUsedAllergens,
    collectUsedTags,
    slugify,
} from "./utils";

export default function MenuPage() {
    const categories: (MenuCategory & { id: string })[] = useMemo(
        () => DINNER_MENU.categories.map((c) => ({ ...c, id: slugify(c.name) })),
        []
    );

    const usedTags = useMemo(() => collectUsedTags([DINNER_MENU]), []);
    const usedAllergens = useMemo(() => collectUsedAllergens([DINNER_MENU]), []);

    const [copied, setCopied] = useState(false);
    const share = useCallback(async () => {
        const url = typeof window !== "undefined" ? window.location.href : "";
        try {
            if (navigator.share) {
                await navigator.share({ title: "De Tafelaar – Menu", text: "Ons menu bekijken?", url });
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
            <header className="mb-8 sm:mb-10 md:mb-12">
                <Card className="rounded-2xl border bg-card p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
                                Menukaart De Tafelaar
                            </h1>
                            <p className="mt-2 max-w-prose text-base sm:text-lg text-muted-foreground leading-relaxed">
                                Shared dining in Amersfoort centrum: kleine gerechten om samen te delen. Van kazen
                                en charcuterie tot warme seizoensgerechten en desserts — bereid met lokale producten
                                uit de regio. Gerechten van €3,50 tot €15, of kies het Chef&apos;s Choice (€45 p.p.).
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
                                <ReserveerButton size="sm" label="Reserveer tafel" />
                                <Button asChild size="sm" variant="outline" className="rounded-xl">
                                    <Link href="/lunch">Lunchkaart</Link>
                                </Button>
                                <Button asChild size="sm" variant="outline" className="rounded-xl">
                                    <Link href="/drank">Drankenkaart</Link>
                                </Button>
                                <Button asChild size="sm" variant="outline" className="rounded-xl">
                                    <Link href="/ophalen">Ophalen</Link>
                                </Button>
                            </div>

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

            {/* ===== LEGEND ===== */}
            <section className="mb-8 sm:mb-10 md:mb-12">
                <div className="rounded-2xl border bg-card/80 p-4 md:p-6">
                    <div className="flex flex-wrap items-start gap-6 md:gap-10">
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

            {/* ===== MENU GRID ===== */}
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
