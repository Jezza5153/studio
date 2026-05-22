import type { MenuItem } from "@/content/menu";
import { Badge } from "@/components/ui/badge";
import {
    ALLERGEN_CONFIG,
    TAG_CONFIG,
    formatPriceNoCurrency,
} from "./utils";

/**
 * Single menu row — name + price, dietary + allergen dots inline, optional
 * description, optional small badge (e.g. "Vanaf 2 personen").
 *
 * Plain function component, no state — works in both lunch and diner sections.
 */
export function MenuRow({ item }: { item: MenuItem }) {
    const hasTags = (item.tags?.length ?? 0) > 0;
    const hasAllergens = (item.allergens?.length ?? 0) > 0;

    return (
        <div className="min-w-0">
            {/* Name + Price + Icons row */}
            <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0 flex-wrap">
                    <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
                    {item.badge && (
                        <Badge variant="outline" className="text-[10px] font-normal uppercase tracking-wide">
                            {item.badge}
                        </Badge>
                    )}
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
