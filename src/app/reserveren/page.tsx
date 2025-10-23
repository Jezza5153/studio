import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contactDetails, reservationFaq } from "@/content/site-content";
import { Phone } from "lucide-react";

export default function ReserverenPage() {
  // ---- small helpers ----
  const hasDialablePhone = /\d/.test(contactDetails.phone || "");
  const mapsQuery = encodeURIComponent(`De Tafelaar, ${contactDetails.address}`);
  // Simple, no-API-key embed + an external link
  const mapsEmbedSrc = `https://www.google.com/maps?&q=${mapsQuery}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">Reserveer uw tafel</h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          We kijken ernaar uit u te mogen verwelkomen.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl sm:text-3xl">Online reserveren</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder block – replace with widget later */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Reserverings-widget volgt binnenkort</p>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Lukt het online niet of heeft u speciale wensen? Neem dan contact met ons op:
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {hasDialablePhone ? (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={`tel:${contactDetails.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Bel ons
                    </a>
                  </Button>
                ) : (
                  <Button asChild className="w-full sm:w-auto">
                    <a href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Reservering De Tafelaar")}`}>
                      Mail ons
                    </a>
                  </Button>
                )}

                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={`mailto:${contactDetails.email}?subject=${encodeURIComponent("Reservering De Tafelaar")}`}>
                    Stuur een e-mail
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="font-headline text-2xl sm:text-3xl">Veelgestelde Vragen</h2>
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
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <h2 className="font-headline text-2xl sm:text-3xl mb-8 text-center">Waar u ons kunt vinden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Adres</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <address className="not-italic text-muted-foreground text-base sm:text-lg">
                <p>De Tafelaar</p>
                <p>{contactDetails.address}</p>
              </address>

              <div>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-full">
              {/* Google Maps embed: no API key required */}
              <iframe
                title="Locatie De Tafelaar op Google Maps"
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full h-[300px] md:h-full aspect-[4/3] md:aspect-video"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
