import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactDetails, openingHours } from "@/content/site-content";
import { Phone, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
  const addressLines = (contactDetails.address || "").split("\n").filter(Boolean);
  const prettyAddress = addressLines;
  const queryAddress = encodeURIComponent(prettyAddress.join(", "));
  const mapsEmbedSrc = `https://www.google.com/maps?&q=${queryAddress}&output=embed`;
  const googleWeb = `https://www.google.com/maps/search/?api=1&query=${queryAddress}`;
  const appleMaps = `https://maps.apple.com/?q=${queryAddress}`;
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-20">
      <div className="text-center mb-12 md:mb-14">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Contact & Reserveren
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          We kijken ernaar uit u te mogen verwelkomen. Reserveer uw tafel of neem contact op.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Card className="rounded-2xl border bg-card">
          <CardHeader className="pb-4 md:pb-6">
            <CardTitle className="font-headline text-2xl sm:text-3xl tracking-tight">
              Reserveer direct
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-muted-foreground leading-relaxed">
              Zin om aan te schuiven? Klik rechtsonder in het scherm op de reserveer-knop nu er nog een tafeltje voor je vrij is. Voor groepen of speciale verzoeken kunt u ons mailen of bellen.
            </p>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
              {hasDialablePhone && (
                <Button asChild className="w-full">
                  <a href={`tel:${contactDetails.phone}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Bel ons
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" className="w-full">
                <a href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Vraag / Reservering De Tafelaar")}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Mail ons
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border bg-card">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="font-headline text-xl tracking-tight">Openingstijden</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-muted-foreground divide-y">
              {openingHours.schedule.map((s) => (
                <li key={s.day} className="flex justify-between py-2">
                  <span className="font-medium text-foreground">{s.day}</span>
                  <span className="tabular-nums">{s.time}</span>
                </li>
              ))}
            </ul>
            {openingHours.footer && <p className="text-xs text-muted-foreground mt-3">{openingHours.footer}</p>}
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 md:mt-20">
        <h2 className="font-headline text-2xl sm:text-3xl mb-8 text-center tracking-tight">
          Waar u ons kunt vinden
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <Card className="rounded-2xl border bg-card">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="font-headline text-xl tracking-tight">Adres</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 flex flex-col gap-4">
              <address className="not-italic text-muted-foreground text-base sm:text-lg leading-relaxed">
                {prettyAddress.map((line, i) => <p key={i}>{line}</p>)}
              </address>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {hasDialablePhone && (
                  <a className="inline-flex items-center gap-2 hover:text-primary transition-colors" href={`tel:${contactDetails.phone}`}>
                    <Phone className="h-4 w-4" />
                    {contactDetails.phone}
                  </a>
                )}
                <a className="inline-flex items-center gap-2 hover:text-primary transition-colors" href={`mailto:${contactDetails.email}`}>
                  <Mail className="h-4 w-4" />
                  {contactDetails.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <a href={googleWeb} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={appleMaps} target="_blank" rel="noopener noreferrer">
                    Open in Apple Maps
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border bg-card overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="relative pt-6">
                <iframe
                  title="Locatie De Tafelaar op Google Maps"
                  src={mapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full h-64 md:h-[420px] aspect-[4/3] md:aspect-video"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-4 bottom-4 rounded-full bg-background/90 px-3 py-1 shadow">
                  <span className="text-sm">📍 De Tafelaar</span>
                </div>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background/50 to-transparent" />
              </div>
              <noscript>
                <div className="p-4">
                  <a href={googleWeb} target="_blank" rel="noopener noreferrer">
                    Bekijk kaart op Google Maps
                  </a>
                </div>
              </noscript>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
