"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { LanguageToggle } from "./language-toggle";
import Image from "next/image";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const NavLinks = ({ className, onItemClick }: { className?: string; onItemClick?: () => void; }) => (
    <nav className={cn("flex items-center gap-4 lg:gap-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onItemClick}
          className={cn(
            "text-lg lg:text-sm font-medium transition-colors hover:text-primary",
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
        <Link href="/" className="mr-8 flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="De Tafelaar Logo" width={160} height={40} className="object-contain w-36 md:w-40" />
        </Link>
        
        <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
          <NavLinks />
          <LanguageToggle />
          <Button asChild>
            <Link href="/reserveren">Reserveer nu</Link>
          </Button>
        </div>

        <div className="flex lg:hidden flex-1 justify-end items-center">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[50vw]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <Link href="/" onClick={() => setIsSheetOpen(false)}>
                    <Image src="/logo.png" alt="De Tafelaar Logo" width={120} height={30} className="object-contain" />
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </div>
                <div className="flex flex-col gap-6 pt-8">
                  <NavLinks className="flex-col items-start gap-4" onItemClick={() => setIsSheetOpen(false)} />
                  <div className="border-t pt-6 flex flex-col gap-4">
                     <LanguageToggle />
                     <Button asChild className="w-full" size="lg">
                        <Link href="/reserveren" onClick={() => setIsSheetOpen(false)}>Reserveer nu</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
