import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { producers } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MapPin, Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProducentenPage() {
    const producerImage = PlaceHolderImages.find((img) => img.id === "producer-farm");
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">Onze Producenten</h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
          De helden achter onze smaken. We zijn trots op onze samenwerking met deze gepassioneerde, lokale makers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {producers.map((producer, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
            {producerImage && (
                <div className="relative h-48 w-full">
                    <Image
                        src={producerImage.imageUrl.replace('farm', `farm-${index}`)}
                        alt={`Image for ${producer.name}`}
                        fill
                        className="object-cover"
                        data-ai-hint={producerImage.imageHint}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline text-xl">{producer.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {producer.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm leading-relaxed">{producer.description}</p>
            </CardContent>
            <CardContent>
                <Link href="#" className="text-sm font-semibold text-primary hover:underline flex items-center gap-2">
                    Bezoek website <LinkIcon className="h-4 w-4" />
                </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
