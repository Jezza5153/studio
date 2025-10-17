
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import { LanguageToggle } from "./language-toggle";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({
    className,
    onItemClick,
  }: {
    className?: string;
    onItemClick?: () => void;
  }) => (
    <nav className={cn("flex flex-col items-start gap-3 text-lg", className)}>
      {navLinks.map((link) => (
        <SheetClose asChild key={link.href}>
          <Link
            href={link.href}
            onClick={onItemClick}
            className={cn(
              "text-lg font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md py-2",
              pathname === link.href ? "text-primary" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        </SheetClose>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="/" className="mr-8 flex items-center" aria-label="De Tafelaar – home">
          <Image
            src="/logo.png"
            alt="De Tafelaar logo"
            width={160}
            height={40}
            className="object-contain w-28 md:w-36"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <Button asChild size="sm">
            <Link href="/reserveren">Reserveer nu</Link>
          </Button>
        </nav>

        {/* Mobile menu */}
        <div className="flex lg:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="md:opacity-100">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[50vw] p-0">
              <div className="p-6 max-h-dvh overflow-auto">
                <Link href="/" className="mb-8 block">
                  <Image
                    src="/logo.png"
                    alt="De Tafelaar logo"
                    width={160}
                    height={40}
                    className="object-contain w-36"
                  />
                </Link>
                <div className="flex flex-col space-y-2">
                  <NavLinks />
                  <div className="pt-4">
                    <LanguageToggle />
                  </div>
                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <SheetClose asChild>
                        <Link href="/reserveren">Reserveer nu</Link>
                      </SheetClose>
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
