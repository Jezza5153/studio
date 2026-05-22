import Link from "next/link";

interface StickyNavLink {
    href: string;
    label: string;
}

interface MenuStickyNavProps {
    links: StickyNavLink[];
}

/**
 * In-page sticky anchor nav. Calm helper — not a second header.
 * Text-only pills, restrained color, horizontally scrollable on mobile.
 *
 * No active-state highlighting in v1: the page has a tiny number of anchors
 * and adding scroll-spy would force a client component for no real UX win.
 */
export function MenuStickyNav({ links }: MenuStickyNavProps) {
    return (
        <nav
            aria-label="Snel naar"
            className="sticky top-16 z-30 -mx-4 sm:-mx-6 md:-mx-8 mb-8 sm:mb-10 backdrop-blur-md bg-background/85 border-y"
        >
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <ul className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 sm:py-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                    {links.map((l) => (
                        <li key={l.href} className="shrink-0">
                            <Link
                                href={l.href}
                                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
