// Shared helpers and config for the /menu page family.
// Importable from both server and client components — no React, no state.

import type { MenuData } from "@/content/menu";

export function formatPriceNoCurrency(price: number | null) {
    if (price == null) return "";
    return new Intl.NumberFormat("nl-NL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

export function slugify(input: string) {
    return input.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/(^-|-$)/g, "");
}

// Dietary tag icons and colors.
export const TAG_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    V: { label: "Vegetarisch", color: "bg-green-500", icon: "🌿" },
    VG: { label: "Vegan", color: "bg-emerald-600", icon: "🌱" },
    GF: { label: "Glutenvrij", color: "bg-amber-500", icon: "🌾" },
};

// Allergen icons - subtle colored circles.
export const ALLERGEN_CONFIG: Record<string, { label: string; color: string }> = {
    lactose: { label: "Lactose", color: "bg-blue-400" },
    gluten: { label: "Gluten", color: "bg-amber-400" },
    noten: { label: "Noten", color: "bg-yellow-600" },
    selderij: { label: "Selderij", color: "bg-lime-500" },
    sesam: { label: "Sesam", color: "bg-stone-400" },
    sulfiet: { label: "Sulfiet", color: "bg-purple-400" },
    pinda: { label: "Pinda", color: "bg-orange-600" },
    vis: { label: "Vis", color: "bg-sky-500" },
    ei: { label: "Ei", color: "bg-yellow-400" },
    soja: { label: "Soja", color: "bg-green-700" },
    mosterd: { label: "Mosterd", color: "bg-yellow-700" },
    ui: { label: "Ui", color: "bg-purple-300" },
};

/**
 * Collect every dietary tag actually used across one or more menus.
 * Used to build the page-level legend.
 */
export function collectUsedTags(menus: MenuData[]): string[] {
    const tagSet = new Set<string>();
    for (const menu of menus) {
        for (const cat of menu.categories) {
            for (const item of cat.items) {
                item.tags?.forEach((t) => tagSet.add(t));
            }
        }
    }
    return Array.from(tagSet);
}

/**
 * Collect every allergen actually used across one or more menus.
 * Used to build the page-level legend.
 */
export function collectUsedAllergens(menus: MenuData[]): string[] {
    const allergenSet = new Set<string>();
    for (const menu of menus) {
        for (const cat of menu.categories) {
            for (const item of cat.items) {
                item.allergens?.forEach((a) => allergenSet.add(a.toLowerCase()));
            }
        }
    }
    return Array.from(allergenSet).sort();
}
