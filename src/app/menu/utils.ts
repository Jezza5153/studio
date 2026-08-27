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

// Dietary markers — these mirror the legend printed on the physical kaart:
//   groen = vegetarisch · geel = glutenvrij · wit = lactosevrij ·
//   paars = glutenvrij brood mogelijk (+€1,50)
//
// `color` carries the full dot styling (including its ring) because the
// "Lactosevrij" dot is white and needs a darker ring to stay visible on the
// light card background — a shared `ring-white/50` would make it disappear.
export const TAG_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    V: { label: "Vegetarisch", color: "bg-green-600 ring-1 ring-black/15", icon: "🌿" },
    GF: { label: "Glutenvrij", color: "bg-amber-400 ring-1 ring-black/15", icon: "🌾" },
    LF: { label: "Lactosevrij", color: "bg-white ring-1 ring-neutral-400", icon: "🥛" },
    GFB: { label: "Glutenvrij brood (+€1,50)", color: "bg-purple-500 ring-1 ring-black/15", icon: "🍞" },
    // Vegan is no longer printed on the lunch/dinerkaart, but the ophalenkaart
    // still uses it.
    VG: { label: "Vegan", color: "bg-emerald-600 ring-1 ring-black/15", icon: "🌱" },
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
