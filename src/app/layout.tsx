
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { formatRating } from "@/lib/google-rating";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/google-analytics";
import Script from "next/script";
import { getSettings } from "@/lib/queries/feed";
import { persJsonLd } from "@/content/pers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const siteUrl = "https://www.tafelaaramersfoort.nl";
const siteName = "De Tafelaar";
const siteTitle = "De Tafelaar, Restaurant Amersfoort Centrum";
const siteDescription =
  "De Tafelaar: restaurant in Amersfoort centrum voor borrel en diner. Shared dining met gerechten van lokale makers, samengesteld om te delen, vlakbij de Flint. Open ma en do t/m zo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | De Tafelaar",
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "nl_NL",
    images: [{ url: "/pics/terras-kamp.jpg", width: 1800, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/pics/terras-kamp.jpg"],
  },
  robots: { index: true, follow: true },
  category: "restaurant",
  // Google Search Console verification
  verification: {
    google: "UVHlF4UO1TyFsgBCuR3NAsPh4SzMqrFvVXDmOVwQV-w",
  },
};

function restaurantJsonLd(rating?: number, reviewCount?: number) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}#restaurant`,
    name: "De Tafelaar",
    alternateName: "De Tafelaar Amersfoort",
    url: siteUrl,
    image: [
      `${siteUrl}/pics/terras-kamp.jpg`,
      `${siteUrl}/pics/hero-gasten.jpg`,
      `${siteUrl}/pics/huiskamer-vol.jpg`,
    ],
    description: siteDescription,
    slogan: "Shared dining met lokale makers op de Kamp",
    servesCuisine: [
      "Shared Dining",
      "Bourgondisch",
      "Nederlands",
      "Europees",
      "Seizoensgebonden",
      "Vegetarisch",
    ],
    priceRange: "€€",
    acceptsReservations: true,
    hasMenu: `${siteUrl}/menu`,
    foundingDate: "2025-11",
    disambiguatingDescription:
      "Shared dining restaurant op de Kamp 8 in Amersfoort centrum, geopend in november 2025, op 5 minuten lopen van Theater de Flint.",
    founder: { "@type": "Person", name: "Jan Molmans" },
    employee: { "@type": "Person", name: "Jeremy Arrascaeta", jobTitle: "Chef-kok" },
    keywords:
      "restaurant amersfoort, shared dining, lokaal, seizoensgebonden, vlakbij flint, borrel amersfoort, afhalen amersfoort",
    smokingAllowed: false,
    publicAccess: true,

    address: {
      "@type": "PostalAddress",
      streetAddress: "Kamp 8",
      postalCode: "3811 AR",
      addressLocality: "Amersfoort",
      addressRegion: "Utrecht",
      addressCountry: "NL",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.1573757,
      longitude: 5.3933828,
    },

    telephone: "+31 6 341 279 32",
    email: "info@tafelaaramersfoort.nl",

    sameAs: [
      "https://www.facebook.com/people/Tafelaar-Amersfoort/61575109492128/",
      "https://www.instagram.com/tafelaaramersfoort",
      "https://www.tripadvisor.nl/Restaurant_Review-g188613-d34027809-Reviews-De_Tafelaar-Amersfoort.html",
      "https://www.youtube.com/@DeTafelaarAmersfoort",
    ],

    subjectOf: persJsonLd(),

    hasMap: "https://maps.google.com/?cid=9272578467641654802",

    areaServed: [
      { "@type": "City", name: "Amersfoort" },
      { "@type": "AdministrativeArea", name: "Utrecht" },
    ],

    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Thursday"], opens: "17:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "15:00", closes: "00:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "15:00", closes: "23:00" },
    ],

    makesOffer: [
      {
        "@type": "Offer",
        name: "Chef's Choice arrangement",
        description:
          "Rijkgevulde tafel met borrelplanken, koude en warme gerechten en dessert. Vanaf 7 personen.",
        price: "48",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        name: "Bijpassend wijnarrangement",
        description: "Wijnen afgestemd op het Chef's Choice arrangement.",
        price: "28",
        priceCurrency: "EUR",
      },
    ],

    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/reserveren`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "Reservation",
        name: "Tafel reserveren bij De Tafelaar",
      },
    },

    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },

    paymentAccepted: "Cash, Credit Card, Debit Card, PIN",
    currenciesAccepted: "EUR",
  };

  // Live aggregateRating from Google reviews, synced via /api/cron/ingest-reviews
  if (rating && rating > 0 && reviewCount && reviewCount > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: formatRating(rating),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviewCount,
    };
  }

  return JSON.stringify(data);
}



export const revalidate = 3600; // Refresh live rating data every hour

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const googleRating = settings?.googleRating || 0;
  const googleReviewCount = settings?.googleReviewCount || 0;

  return (
    <html lang="nl" className={cn(inter.variable, playfairDisplay.variable)}>
      <head>
        {/* Preconnect for webfonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: restaurantJsonLd(googleRating, googleReviewCount) }}
        />
      </head>

      <body className={cn("font-body antialiased")}>
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 "
        >
          Naar inhoud springen
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        {/* Honeypot: hidden fake email to trap scraping bots.
            Any email sent to this address = confirmed bot.
            aria-hidden + tabIndex -1 makes it invisible to real users & screen readers. */}
        <div
          aria-hidden="true"
          tabIndex={-1}
          style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 0, height: 0, overflow: "hidden", opacity: 0 }}
        >
          <a href="mailto:crawler-trap@tafelaaramersfoort.nl" tabIndex={-1}>contact</a>
        </div>
        <Toaster />

        {/* Google Analytics */}
        <GoogleAnalytics />

        {/* BoekEerlijk Reserveerknop */}
        <Script
          src="https://www.boekeerlijk.nl/embed.js"
          data-restaurant-id="de-tafelaar-30fcc6"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

