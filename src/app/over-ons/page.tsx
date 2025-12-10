import { philosophyContent } from "@/content/site-content";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function OverOnsPage() {
    const philosophyImage = PlaceHolderImages.find((img) => img.id === "philosophy-image");

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 sm:py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl">{philosophyContent.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            De gedachte achter onze gerechten en gastvrijheid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-8 md:order-2">
                <div>
                    <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">{philosophyContent.mission.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                        {philosophyContent.mission.text}
                    </p>
                </div>
                <div>
                    <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl mb-4">{philosophyContent.whySharedDining.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                        {philosophyContent.whySharedDining.text}
                    </p>
                </div>
            </div>
            <div className="md:order-1 overflow-hidden rounded-2xl">
                {philosophyImage && (
                <Image
                    src={philosophyImage.imageUrl}
                    alt={philosophyImage.description}
                    width={800}
                    height={600}
                    className="object-cover w-full h-auto"
                    data-ai-hint={philosophyImage.imageHint}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
