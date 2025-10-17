"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { LanguageToggle } from "./language-toggle";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

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
      <div className="container flex h-16 items-center px-4 sm:px-6 md:px-8">
        <Link href="/" className="mr-8 flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="De Tafelaar Logo" width={144} height={36} className="object-contain w-28 md:w-36" />
        </Link>
        
        <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
          <NavLinks />
          <LanguageToggle />
          <Button asChild>
            <Link href="/reserveren">Reserveer nu</Link>
          </Button>
        </div>

        <div className="flex lg:hidden flex-1 justify-end items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[50vw]">
                <div className="p-6">
                    <Link href="/" className="mb-8 block">
                        <Image src="/logo.png" alt="De Tafelaar Logo" width={144} height={36} className="object-contain w-36" />
                    </Link>
                    <div className="flex flex-col space-y-4">
                       <NavLinks className="flex-col items-start gap-0" onItemClick={() => document.getElementById('sheet-close')?.click()} />
                       <div className="border-t pt-4 mt-4 flex flex-col gap-4">
                           <LanguageToggle />
                           <Button asChild className="w-full" size="lg">
                               <SheetClose asChild>
                                <Link href="/reserveren">Reserveer nu</Link>
                               </SheetClose>
                          </Button>
                       </div>
                    </div>
                </div>
                 <SheetClose id="sheet-close" className="hidden" />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
