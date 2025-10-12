"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { LanguageToggle } from "./language-toggle";

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-semibold">
            Tafelaar Amersfoort
          </span>
        </Link>
        <div className="hidden md:flex flex-1 items-center justify-between">
          <NavLinks />
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/reserveren">Reserveer nu</Link>
            </Button>
          </div>
        </div>
        <div className="flex md:hidden flex-1 justify-end items-center gap-4">
          <LanguageToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-8 pt-8">
                <Link href="/" className="flex items-center gap-2">
                  <Utensils className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-semibold">
                    Tafelaar
                  </span>
                </Link>
                <NavLinks className="flex-col items-start gap-6" />
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/reserveren">Reserveer nu</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
