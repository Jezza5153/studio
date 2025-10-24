import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { contactDetails, reservationFaq, openingHours } from "@/content/site-content";
import { Phone, Info, MapPin, Mail } from "lucide-react";

export default function ReserverenPage() {
  // ---- helpers (no API keys) ----
  const label = "De Tafelaar";
  const addressLines = (contactDetails.address || "").split("\n").filter(Boolean);
  const prettyAddress = [label, ...addressLines]; // voor weergave
  const queryAddress = encodeURIComponent(prettyAddress.join(", ")); // voor maps

  // Public, keyless embed:
  const mapsEmbedSrc = `https://www.google.com/maps?&q=${queryAddress}&output=embed`;

  // Open externally:
  const googleWeb = `https://www.google.com/maps/search/?api=1&query=${queryAddress}`;
  const appleMaps = `https://maps.apple.com/?q=${queryAddress}`;
  const geoFallback = `geo:0,0?q=${queryAddress}`; // many Android devices open default maps app

  const hasDialablePhone = /\d/.test(contactDetails.phone || "");

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">Reserveer uw tafel</h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          We kijken ernaar uit u te mogen verwelkomen.
        </p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Left: Booking / Actions card (vult de plaats van de toekomstige widget) */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl sm:text-3xl">
                Kom je eten?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border p-5 sm:p-6 bg-card/50">
                <p className="text-muted-foreground leading-relaxed">
                  Onze online reserveringswidget komt binnenkort beschikbaar. Tot die tijd helpen we je
                  graag via telefoon of e-mail. Liever direct navigeren? Open ons adres in je
                  favoriete kaartapp.
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hasDialablePhone && (
                    <Button asChild className="w-full">
                      <a href={`tel:${contactDetails.phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Bel ons
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="outline" className="w-full">
                    <a
                      href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Reservering De Tafelaar")}`}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Stuur een e-mail
                    </a>
                  </Button>

                  <Button asChild variant="secondary" className="w-full">
                    <a href={googleWeb} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" />
                      Open in Google Maps
                    </a>
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <a href={appleMaps} target="_blank" rel="noopener noreferrer">
                      Open in Apple Maps
                    </a>
                  </Button>

                  {/* mobiel-specifieke deep link */}
                  <Button asChild variant="ghost" className="w-full sm:col-span-2 lg:col-span-1 md:hidden">
                    <a href={geoFallback}>Open in Maps (telefoon)</a>
                  </Button>
                </div>

                <div className="mt-5 rounded-xl border p-4 bg-background/70">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5" />
                    <span>
                      <strong>Tip:</strong> voor groepen &gt; 8 personen graag even mailen. Vermeld
                      ook eventuele <em>allergieën of dieetwensen</em>. Tijden kunnen afwijken op feestdagen.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: FAQ + Opening hours */}
        <div className="space-y-6">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl sm:text-3xl">Veelgestelde Vragen</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {reservationFaq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="font-semibold text-left text-base sm:text-lg">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Opening hours – compact list */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Openingstijden</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                {openingHours.schedule.map((s) => (
                  <li key={s.day} className="flex justify-between">
                    <span>{s.day}</span>
                    <span>{s.time}</span>
                  </li>
                ))}
              </ul>
              {openingHours.footer ? (
                <p className="text-xs text-muted-foreground mt-3">{openingHours.footer}</p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map & address */}
      <div className="mt-16 sm:mt-24">
        <h2 className="font-headline text-2xl sm:text-3xl mb-8 text-center">Waar u ons kunt vinden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Address + direct links */}
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Adres</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <address className="not-italic text-muted-foreground text-base sm:text-lg leading-relaxed">
                {prettyAddress.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </address>

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
                {hasDialablePhone && (
                  <Button asChild variant="ghost" className="w-full sm:w-auto">
                    <a href={`tel:${contactDetails.phone}`}>
                      Bel: {contactDetails.phone}
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map embed – altijd in kleur */}
          <Card className="shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="relative pt-8">
                {/* top padding om overlap met Google info-bubble te vermijden */}
                <iframe
                  title="Locatie De Tafelaar op Google Maps"
                  src={mapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full h-[300px] md:h-[420px] aspect-[4/3] md:aspect-video"
                  allowFullScreen
                />
                {/* Overlay label links-onder, rustig in beeld */}
                <div className="pointer-events-none absolute left-4 bottom-4 rounded-full bg-background/90 px-3 py-1 shadow">
                  <span className="text-sm">📍 {label}</span>
                </div>
                {/* Subtle top fade om het drukke hoekje te verzachten */}
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
