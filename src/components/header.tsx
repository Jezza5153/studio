
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "./ui/sheet";
import { Menu as MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/content/site-content";
import { ReserveerButton } from "./reserveer-button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const focusRing =
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const NavLinks = ({
    className,
    onItemClick,
  }: {
    className?: string;
    onItemClick?: () => void;
  }) => (
    <nav className={cn("flex flex-col items-start gap-2 text-lg", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <SheetClose asChild key={link.href}>
            <Link
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              onClick={onItemClick}
              className={cn(
                "relative text-lg font-medium transition-colors rounded-md py-2",
                focusRing,
                isActive ? "text-primary" : "text-muted-foreground",
                // underline indicator
                "after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full",
                isActive
                  ? "after:bg-primary"
                  : "after:bg-transparent hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          </SheetClose>
        );
      })}
    </nav>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur transition-shadow supports-[backdrop-filter]:bg-background/60",
        scrolled && "shadow-sm"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-8 flex items-center"
          aria-label="De Tafelaar – home"
        >
          <Image
            src="/logo.png"
            alt="De Tafelaar logo"
            width={288} // natural width of your logo file
            height={80} // natural height of your logo file
            className="h-8 md:h-10 w-auto" // ✅ scale by height only
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-end gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-[15px] font-medium transition-colors rounded-md",
                  focusRing,
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
                  // underline indicator with slide-in animation
                  "after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:transition-transform after:duration-300 after:origin-center",
                  isActive
                    ? "after:bg-primary after:scale-x-100"
                    : "after:bg-primary after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => window.eventsOpen?.()}
            className="ml-4 text-[15px] font-medium text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4"
          >
            Reserveer
          </button>
        </nav>

        {/* Mobile menu */}
        <div className="flex lg:hidden items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[80vw] sm:w-[50vw] p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="p-6 max-h-dvh overflow-auto">
                <Link href="/" className="mb-8 block">
                  <Image
                    src="/logo.png"
                    alt="De Tafelaar logo"
                    width={288}
                    height={80}
                    className="h-10 w-auto" // slightly bigger in drawer
                  />
                </Link>

                {/* Nav */}
                <NavLinks />

                {/* Divider + CTA */}
                <div className="mt-4 border-t pt-4">
                  <SheetClose asChild>
                    <ReserveerButton
                      size="sm"
                      className="w-full hover:opacity-90"
                      label="Reserveer nu"
                    />
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
