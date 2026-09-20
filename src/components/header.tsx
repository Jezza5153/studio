"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "./ui/sheet";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, meerLinks } from "@/content/site-content";
import { ReserveerButton } from "./reserveer-button";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

function MeerDropdown({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-md text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary",
          focusRing,
        )}
      >
        Meer
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+18px)] z-50 grid min-w-[560px] grid-cols-2 gap-x-2 border-2 border-foreground bg-white p-2 shadow-[6px_6px_0_hsl(var(--foreground))]"
        >
          {meerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              role="menuitem"
              className={cn(
                "block px-4 py-2 text-[13.5px] font-semibold text-foreground transition-colors hover:bg-secondary",
                pathname === link.href && "bg-secondary",
                focusRing,
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b-[5px] border-foreground bg-background">
      <div className="container mx-auto flex h-[72px] items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="mr-6 flex items-center" aria-label="De Tafelaar, home">
          <Image
            src="/logo.png"
            alt="De Tafelaar logo"
            width={288}
            height={80}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop */}
        <nav className="hidden flex-1 items-center justify-end gap-5 whitespace-nowrap xl:flex" aria-label="Hoofdmenu">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md text-[15px] font-medium transition-colors",
                  "after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5",
                  isActive ? "text-primary after:bg-primary" : "text-muted-foreground after:bg-transparent hover:text-primary",
                  focusRing,
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <MeerDropdown pathname={pathname} />
          <ReserveerButton size="sm" className="ml-3" label="Reserveer nu" />
        </nav>

        {/* Mobile */}
        <div className="flex items-center xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Menu openen"
                className="h-11 w-11 border-2 border-foreground shadow-[3px_3px_0_hsl(var(--foreground))]"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[86vw] border-l-[5px] border-foreground bg-background p-0 sm:w-[420px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="max-h-dvh overflow-auto p-6">
                <SheetClose asChild>
                  <Link href="/" className="mb-6 block">
                    <Image src="/logo.png" alt="De Tafelaar logo" width={288} height={80} className="h-10 w-auto" />
                  </Link>
                </SheetClose>

                <nav className="flex flex-col" aria-label="Menu">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className={cn(
                          "border-b border-dashed border-border py-3 text-base font-semibold",
                          pathname === link.href ? "text-primary" : "text-foreground",
                          focusRing,
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <p className="mt-5 mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Meer</p>
                <nav className="flex flex-col" aria-label="Meer pagina's">
                  {meerLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn("py-2 text-[15px] font-medium text-muted-foreground hover:text-foreground", focusRing)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-5 border-t-2 border-foreground pt-5">
                  <SheetClose asChild>
                    <ReserveerButton size="lg" className="w-full" label="Reserveer nu" />
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
