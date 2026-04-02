
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@/components/google-analytics";
import Script from "next/script";

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

const siteUrl = "https://tafelaaramersfoort.nl";
const siteName = "De Tafelaar";
const siteTitle = "De Tafelaar – Restaurant Amersfoort Centrum";
const siteDescription =
  "De Tafelaar: restaurant in Amersfoort centrum voor shared dining, borrel en diner. Kleine gerechten van lokale makers, vlakbij Flint. Wo–zo geopend.";

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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  category: "restaurant",
  // Google Search Console verification
  verification: {
    google: "UVHlF4UO1TyFsgBCuR3NAsPh4SzMqrFvVXDmOVwQV-w",
  },
};

function restaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${siteUrl}#restaurant`,
    name: "De Tafelaar",
    url: siteUrl,
    image: `${siteUrl}/og-image.jpg`,
    description: siteDescription,
    servesCuisine: ["Shared Dining", "Bourgondisch", "Nederlands", "Seizoensgebonden"],
    priceRange: "€€",
    acceptsReservations: true,
    hasMenu: `${siteUrl}/menu`,

    address: {
      "@type": "PostalAddress",
      streetAddress: "Kamp 8",
      postalCode: "3811 AR",
      addressLocality: "Amersfoort",
      addressRegion: "Utrecht",
      addressCountry: "NL",
    },

    // Geo coordinates for local search
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.1598363,
      longitude: 5.3918238,
    },

    telephone: "+31634127932",

    // Social media links
    sameAs: [
      "https://www.facebook.com/people/Tafelaar-Amersfoort",
      "https://instagram.com/tafelaaramersfoort",
    ],

    // Google Maps URL for local SEO
    hasMap: "https://maps.google.com/?q=De+Tafelaar+Kamp+8+Amersfoort",

    // Area served
    areaServed: {
      "@type": "City",
      name: "Amersfoort",
    },

    // Additional keywords for local search
    keywords: "restaurant amersfoort, restaurant amersfoort centrum, shared dining amersfoort, borrel amersfoort, diner amersfoort, uit eten amersfoort, restaurant vlakbij flint, gezellig restaurant amersfoort, lokaal eten amersfoort",

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Wednesday",
        opens: "17:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Thursday",
        opens: "17:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "15:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "15:00",
        closes: "00:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "17:00",
        closes: "23:00",
      },
    ],

    // Aggregate Rating - Update these values as you collect reviews
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "12",
      reviewCount: "12",
    },

    // Reserve action for AI engines and Google
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/contact`,
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

    // Logo
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/logo.png`,
    },

    // Payment
    paymentAccepted: "Cash, Credit Card, Debit Card, PIN",
    currenciesAccepted: "EUR",
  };

  return JSON.stringify(data);
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          dangerouslySetInnerHTML={{ __html: restaurantJsonLd() }}
        />
      </head>

      <body className={cn("font-body antialiased")}>
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-2 focus:left-2 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded-md"
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
          <a href="mailto:info@tafelaaramersfoort.nl" tabIndex={-1}>contact</a>
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

