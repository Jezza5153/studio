"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  active: "food" | "drink";
  className?: string;
};

export function MenuSwitcher({ active, className }: Props) {
  return (
    <div
      className={cn(
        "w-full rounded-xl border bg-card p-1 inline-flex items-center justify-center gap-1",
        className
      )}
      role="tablist"
      aria-label="Menu switch"
    >
      <Link
        href="/menu"
        role="tab"
        aria-selected={active === "food"}
        className={cn(
          "flex-1 text-center rounded-lg px-4 py-2 text-sm sm:text-base transition",
          active === "food"
            ? "bg-background font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Eten
      </Link>
      <Link
        href="/drank"
        role="tab"
        aria-selected={active === "drink"}
        className={cn(
          "flex-1 text-center rounded-lg px-4 py-2 text-sm sm:text-base transition",
          active === "drink"
            ? "bg-background font-semibold"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Drank
      </Link>
    </div>
  );
}
