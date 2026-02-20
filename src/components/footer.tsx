
import { contactDetails, navLinks, openingHours } from "@/content/site-content";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function Footer() {
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");

  return (
    <footer className="relative bg-[#1a1714] text-white/90 overflow-hidden">
      {/* Subtle warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-primary/5 pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
          {/* Logo + slogan + socials */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="De Tafelaar Logo"
                width={160}
                height={40}
                className="object-contain brightness-[1.15]"
              />
            </Link>
            <p className="text-white/60 text-sm max-w-xs">
              Samen aan tafel. Kleine gerechten, grote gezelligheid.
            </p>

            {/* Styled social icons */}
            <div className="flex gap-3 pt-1">
              <Link
                href="https://www.facebook.com/people/Tafelaar-Amersfoort"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
              >
                <Facebook className="h-4 w-4 text-white/80" />
              </Link>
              <Link
                href="https://instagram.com/tafelaaramersfoort"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-all hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]"
              >
                <Instagram className="h-4 w-4 text-white/80" />
              </Link>
            </div>
          </div>

          {/* Sitemap */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4 text-white">Sitemap</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm py-1.5 inline-block text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zakelijk & Groepen */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4 text-white">Zakelijk &amp; Groepen</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/verhuur-en-groepen"
                  className="text-sm py-1.5 inline-block text-white/50 hover:text-white transition-colors font-medium"
                >
                  🎉 Feestlocatie huren
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="text-sm py-1.5 inline-block text-white/50 hover:text-white transition-colors font-medium"
                >
                  🍽️ Catering &amp; Office Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/eten-voor-theater-de-flint"
                  className="text-sm py-1.5 inline-block text-white/50 hover:text-white transition-colors"
                >
                  🎭 Eten vlakbij Flint
                </Link>
              </li>
              <li>
                <Link
                  href="/bourgondisch-eten-amersfoort"
                  className="text-sm py-1.5 inline-block text-white/50 hover:text-white transition-colors"
                >
                  🍷 Bourgondisch eten
                </Link>
              </li>
            </ul>
          </div>

          {/* Openingstijden — striped table */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4 text-white">Openingstijden</h4>
            <div className="rounded-lg overflow-hidden border border-white/10">
              {openingHours.schedule.slice(2, 7).map((item, i) => (
                <div
                  key={item.day}
                  className={`flex justify-between px-3 py-2 text-sm ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                    }`}
                >
                  <span className="text-white/60">{item.day}</span>
                  <span className="tabular-nums text-white/80 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact row */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <address className="not-italic text-sm text-white/50 flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
              <span>Kamp 8, 3811 AR Amersfoort</span>
              <span className="hidden sm:inline text-white/20">·</span>
              {hasDialablePhone ? (
                <a href={`tel:${contactDetails.phone}`} className="hover:text-white transition-colors">
                  {contactDetails.phone}
                </a>
              ) : (
                <span>{contactDetails.phone}</span>
              )}
              <span className="hidden sm:inline text-white/20">·</span>
              <a href={`mailto:${contactDetails.email}`} className="hover:text-white transition-colors">
                {contactDetails.email}
              </a>
            </address>

            <a
              href="https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:bg-white/10 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Bekijk op Google Maps
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="text-center text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} De Tafelaar. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
