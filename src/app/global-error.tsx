"use client";

/**
 * GLOBAL error boundary.
 *
 * Why this file exists: `src/app/error.tsx` only catches errors thrown inside a
 * page/route segment. An error thrown in the ROOT LAYOUT (or in anything it
 * renders — Header, Footer, Toaster, analytics) is NOT caught by it, and Next.js
 * falls back to its bare built-in screen:
 *
 *     "Application error: a client-side exception has occurred"
 *
 * That fallback ships no <title> and no content, so when Googlebot rendered the
 * site during such a failure it indexed the homepage as "Geen titel" with that
 * error as the description. This component replaces that dead end with a real,
 * branded page that always has a title, useful copy and working links — so even
 * in the worst case a visitor (or a crawler) gets something sensible.
 *
 * global-error.tsx replaces the root layout entirely, so it must render its own
 * <html> and <body>.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="nl">
            <head>
                <title>De Tafelaar — Restaurant in Amersfoort centrum</title>
                <meta name="robots" content="noindex" />
            </head>
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem 1rem",
                    background: "#fbfaf5",
                    color: "#2b2320",
                    fontFamily:
                        "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    textAlign: "center",
                }}
            >
                <main style={{ maxWidth: "34rem" }}>
                    <p
                        style={{
                            margin: "0 0 0.75rem",
                            fontSize: "0.75rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#9a7b4f",
                        }}
                    >
                        De Tafelaar · Kamp 8, Amersfoort
                    </p>

                    <h1 style={{ margin: "0 0 1rem", fontSize: "1.9rem", lineHeight: 1.2 }}>
                        Er ging even iets mis
                    </h1>

                    <p style={{ margin: "0 0 1.5rem", lineHeight: 1.6, color: "#5b5350" }}>
                        Onze excuses — deze pagina kon niet goed geladen worden. Probeer het
                        opnieuw, of bel ons gerust; we helpen je graag verder. De Tafelaar is een
                        shared dining restaurant in het centrum van Amersfoort.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.75rem",
                            justifyContent: "center",
                            marginBottom: "2rem",
                        }}
                    >
                        <button
                            onClick={reset}
                            style={{
                                cursor: "pointer",
                                borderRadius: "9999px",
                                border: "none",
                                background: "#9a7b4f",
                                color: "#fff",
                                padding: "0.65rem 1.4rem",
                                fontSize: "0.9rem",
                                fontWeight: 600,
                            }}
                        >
                            Opnieuw proberen
                        </button>
                        <a
                            href="/"
                            style={{
                                borderRadius: "9999px",
                                border: "1px solid #d9d2c7",
                                padding: "0.65rem 1.4rem",
                                fontSize: "0.9rem",
                                color: "#2b2320",
                                textDecoration: "none",
                            }}
                        >
                            Naar de homepage
                        </a>
                        <a
                            href="tel:+31634127932"
                            style={{
                                borderRadius: "9999px",
                                border: "1px solid #d9d2c7",
                                padding: "0.65rem 1.4rem",
                                fontSize: "0.9rem",
                                color: "#2b2320",
                                textDecoration: "none",
                            }}
                        >
                            Bel +31 6 341 279 32
                        </a>
                    </div>

                    <nav
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1rem",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                        }}
                    >
                        <a href="/menu" style={{ color: "#9a7b4f" }}>Menukaart</a>
                        <a href="/lunch" style={{ color: "#9a7b4f" }}>Lunchkaart</a>
                        <a href="/drank" style={{ color: "#9a7b4f" }}>Drankenkaart</a>
                        <a href="/openingstijden" style={{ color: "#9a7b4f" }}>Openingstijden</a>
                        <a href="/contact" style={{ color: "#9a7b4f" }}>Contact</a>
                    </nav>

                    {error?.digest ? (
                        <p style={{ marginTop: "2rem", fontSize: "0.7rem", color: "#a49b95" }}>
                            Foutcode: {error.digest}
                        </p>
                    ) : null}
                </main>
            </body>
        </html>
    );
}
