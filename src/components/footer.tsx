import { contactDetails, navLinks, openingHours } from "@/lib/data";
import { Utensils, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Utensils className="h-6 w-6 text-primary" />
              <span className="font-headline text-lg font-semibold">
                Tafelaar Amersfoort
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Samen aan tafel. Kleine gerechten, grote gezelligheid.
            </p>
            <div className="flex gap-4 mt-4">
                <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
                <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
                <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"/></Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg mb-4">Sitemap</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline text-lg mb-4">Openingstijden</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
                {openingHours.schedule.slice(2).map(item => (
                    <div key={item.day} className="flex justify-between">
                        <span>{item.day}</span>
                        <span>{item.time}</span>
                    </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline text-lg mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>{contactDetails.address}</p>
              <p><a href={`tel:${contactDetails.phone}`} className="hover:text-primary transition-colors">{contactDetails.phone}</a></p>
              <p><a href={`mailto:${contactDetails.email}`} className="hover:text-primary transition-colors">{contactDetails.email}</a></p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {contactDetails.domain}. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
