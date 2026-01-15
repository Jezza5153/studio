
import { contactDetails, navLinks, openingHours } from "@/content/site-content";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

export function Footer() {
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");

  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Logo + slogan + socials */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="De Tafelaar Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Samen aan tafel. Kleine gerechten, grote gezelligheid.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/people/Tafelaar-Amersfoort"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link
                href="https://instagram.com/tafelaaramersfoort"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Sitemap */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4">Sitemap</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm py-1.5 inline-block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zakelijk & Groepen - Revenue Streams */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4">Zakelijk & Groepen</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/verhuur-en-groepen"
                  className="text-sm py-1.5 inline-block text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  🎉 Feestlocatie huren
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="text-sm py-1.5 inline-block text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  🍽️ Catering & Office Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/eten-voor-theater-de-flint"
                  className="text-sm py-1.5 inline-block text-muted-foreground hover:text-primary transition-colors"
                >
                  🎭 Eten bij De Flint
                </Link>
              </li>
              <li>
                <Link
                  href="/bourgondisch-eten-amersfoort"
                  className="text-sm py-1.5 inline-block text-muted-foreground hover:text-primary transition-colors"
                >
                  🍷 Bourgondisch eten
                </Link>
              </li>
            </ul>
          </div>

          {/* Openingstijden */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4">Openingstijden</h4>
            <div className="space-y-2 text-sm text-muted-foreground max-w-xs mx-auto sm:max-w-none">
              {openingHours.schedule.slice(2, 7).map((item) => (
                <div key={item.day} className="flex justify-between py-0.5">
                  <span>{item.day}</span>
                  <span className="tabular-nums">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="sm:pt-2">
            <h4 className="font-headline text-lg mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-3">
              {/* Presenteer adres op meerdere regels */}
              <p className="whitespace-pre-line">{contactDetails.address}</p>

              {/* Telefoon */}
              <p>
                {hasDialablePhone ? (
                  <a
                    href={`tel:${contactDetails.phone}`}
                    className="hover:text-primary transition-colors py-1.5 inline-block"
                  >
                    {contactDetails.phone}
                  </a>
                ) : (
                  <span className="py-1.5 inline-block">{contactDetails.phone}</span>
                )}
              </p>

              {/* E-mail */}
              <p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="hover:text-primary transition-colors py-1.5 inline-block"
                >
                  {contactDetails.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} De Tafelaar. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
