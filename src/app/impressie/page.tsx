import type { Metadata } from "next";
import { getSettings, getLatestReviews } from "@/lib/queries/feed";
import { ImpressieGallery } from "./ImpressieGallery";

export const metadata: Metadata = {
  title: "Impressie | De Tafelaar",
  description:
    "Sfeerimpressie van De Tafelaar — bekijk foto's van ons restaurant, de sfeer en wat onze gasten zeggen.",
  robots: { index: true, follow: true },
};

export const revalidate = 3600; // Re-fetch every hour

export default async function ImpressiePage() {
  const [settings, reviews] = await Promise.all([
    getSettings(),
    getLatestReviews(10),
  ]);

  const photosJson = settings?.googlePhotos || "[]";
  const googleRating = settings?.googleRating || 0;
  const reviewCount = settings?.googleReviewCount || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/50 bg-foreground/[0.02] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl tracking-tight">
            Impressie
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Krijg een gevoel bij de sfeer van De Tafelaar — door de ogen van
            onze gasten.
          </p>

          {/* Google rating badge */}
          {googleRating > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-5 py-2.5 shadow-sm">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-xl font-bold text-foreground">
                {googleRating.toFixed(1)}
              </span>
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-sm"
                    style={{
                      opacity: i < Math.round(googleRating) ? 1 : 0.25,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-muted-foreground">
                  ({reviewCount} reviews)
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Gallery */}
      <ImpressieGallery
        photosJson={photosJson}
        reviews={reviews.map((r) => ({
          body: r.body || "",
          authorName: r.authorName || "Gast",
          rating: r.rating || 5,
        }))}
      />

      {/* Footer CTA */}
      <section className="border-t border-border/50 bg-foreground/[0.02] py-12 text-center">
        <p className="text-sm text-muted-foreground">
          Benieuwd? Kom zelf ervaren.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/reserveren"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            Reserveer een tafel
          </a>
          <a
            href="https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            Meer op Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
