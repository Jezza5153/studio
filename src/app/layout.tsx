
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Tapla from "./tapla"; // ✅ added per Tapla instructions
import { TAPLA_IFRAME_SRC } from "@/lib/tapla";

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
const siteTitle = "De Tafelaar – Shared Dining in Amersfoort";
const siteDescription =
  "Samen aan tafel: kleine gerechten, grote gezelligheid. Duurzaam, lokaal en met liefde voor borrel & bites.";
  
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
    // languages: { "nl-NL": siteUrl, "en-US": `${siteUrl}/en` },
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
    servesCuisine: ["Shared Dining", "Nederlands", "Seizoensgebonden"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "—",
      addressLocality: "Amersfoort",
      postalCode: "—",
      addressCountry: "NL",
    },
    telephone: "—",
    priceRange: "€€",
    acceptsReservations: true,
    sameAs: [],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "17:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "12:00",
        closes: "23:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "21:00" },
      // Tip: align with your real hours later.
    ],
    hasMenu: `${siteUrl}/menu`,
  };
  return JSON.stringify(data);
}

function faqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Bieden jullie shared dining aan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, ons menu is gericht op kleine gerechten om te delen: samen proeven en genieten.",
        },
      },
      {
        "@type": "Question",
        name: "Werken jullie met lokale en duurzame producten?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zeker. We focussen op lokale makers en seizoensgebonden ingrediënten, met aandacht voor duurzaamheid.",
        },
      },
      {
        "@type": "Question",
        name: "Hoe kan ik reserveren?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Reserveer eenvoudig via de reserveringswidget rechtsonder op onze website.",
        },
      },
    ],
  };
  return JSON.stringify(data);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={cn(inter.variable, playfairDisplay.variable)}>
      <head>
        {/* Preconnect for webfonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: restaurantJsonLd() }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd() }} />
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
        <Toaster />

        {/* ✅ Required by Tapla: place just before </body> */}
        <Tapla />
      </body>
    </html>
  );
}
