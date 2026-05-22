import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MenuChoiceCardProps {
    /** Card heading, e.g. "Lunchkaart". */
    title: string;
    /** Short blurb under the heading. */
    blurb: string;
    /** Subtle highlight line, e.g. "Populair: Bao Buns & De Klassiekelaar". */
    highlight?: string;
    /** Anchor URL on /menu, e.g. "#lunchkaart". */
    href: string;
    /** CTA label, e.g. "Naar lunchkaart". */
    cta: string;
    /** Optional softer background — used for the lunch card. */
    tone?: "default" | "soft";
}

/**
 * Decision card at the top of /menu — picks lunch or diner, scrolls to the
 * matching anchor section. Anchor navigation only; no JS gating.
 */
export function MenuChoiceCard({
    title,
    blurb,
    highlight,
    href,
    cta,
    tone = "default",
}: MenuChoiceCardProps) {
    const bg = tone === "soft" ? "bg-card/60" : "bg-card/90";
    return (
        <Card className={`rounded-2xl border p-6 sm:p-8 ${bg}`}>
            <div className="flex h-full flex-col">
                <h2 className="font-headline text-2xl sm:text-3xl tracking-tight">
                    {title}
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {blurb}
                </p>
                {highlight && (
                    <p className="mt-3 text-xs text-foreground/80 italic">
                        {highlight}
                    </p>
                )}
                <div className="mt-5 sm:mt-6">
                    <Button asChild variant="outline" className="rounded-xl">
                        <Link href={href}>
                            {cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
