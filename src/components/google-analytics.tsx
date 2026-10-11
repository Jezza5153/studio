"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID = "G-Q34YL1E4PZ";

// gtag.js (~180 KB) laadt pas als de pagina klaar is (lazyOnload). Met afterInteractive zette
// next/script er een <link rel="preload"> voor in de <head>, die op mobiel bandbreedte afsnoepte
// van de hero-foto. De dataLayer en gtag() hieronder bestaan wel direct na de hydratatie,
// dus pageview en events komen in de wachtrij en gaan mee zodra gtag.js er is.
export function GoogleAnalytics() {
    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
            </Script>
        </>
    );
}
