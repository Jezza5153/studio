import { contactDetails, navLinks, meerLinks, openingHours } from "@/content/site-content";
import Image from "next/image";
import Link from "next/link";
import { ObfuscatedEmail } from "./obfuscated-email";

export function Footer() {
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");
  const linkClass = "inline-block py-1 text-sm text-background/60 transition-colors hover:text-background";

  return (
    <footer className="border-t-[5px] border-foreground bg-foreground text-background/80">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-block" aria-label="De Tafelaar, home">
              <Image
                src="/logo.png"
                alt="De Tafelaar logo"
                width={160}
                height={40}
                className="h-9 w-auto object-contain brightness-[1.15]"
              />
            </Link>
            <p className="max-w-xs text-sm text-background/70">
              Samen aan tafel. Gerechten om te delen, grote gezelligheid.
            </p>
            <div className="flex gap-3 pt-1">
              <Link
                href={contactDetails.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-background/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-background/10"
              >
                Facebook
              </Link>
              <Link
                href={contactDetails.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-background/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-background/10"
              >
                Instagram
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.2em] text-secondary">Sitemap</h4>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.2em] text-secondary">Meer ontdekken</h4>
            <ul className="space-y-1">
              {meerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/catering" className={linkClass}>
                  Catering &amp; Office Lunch
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.2em] text-secondary">Openingstijden</h4>
            <div className="border border-background/20 text-[13.5px]">
              {openingHours.schedule.slice(2, 7).map((item, i) => (
                <div
                  key={item.day}
                  className={`flex justify-between px-3 py-2 ${i % 2 === 0 ? "bg-background/5" : ""}`}
                >
                  <span className="text-background/60">{item.day}</span>
                  <span className="font-semibold tabular-nums text-background">{item.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-background/50">{openingHours.footer}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-background/20 py-6 sm:flex-row">
          <address className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm not-italic text-background/70">
            <span>Kamp 8, 3811 AR Amersfoort</span>
            <span className="hidden text-background/30 sm:inline">·</span>
            {hasDialablePhone ? (
              <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-background">
                {contactDetails.phone}
              </a>
            ) : (
              <span>{contactDetails.phone}</span>
            )}
            <span className="hidden text-background/30 sm:inline">·</span>
            <ObfuscatedEmail user="reserveren" domain="tafelaaramersfoort.nl" className="transition-colors hover:text-background" />
          </address>

          <a
            href="https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-primary px-4 py-2 text-xs font-bold tracking-wide text-background transition-colors hover:bg-primary"
          >
            Bekijk op Google Maps
          </a>
        </div>

        <div className="border-t border-background/20 py-5 text-center text-xs text-background/50">
          &copy; {new Date().getFullYear()} De Tafelaar. Alle rechten voorbehouden.
        </div>
      </div>
    </footer>
  );
}
