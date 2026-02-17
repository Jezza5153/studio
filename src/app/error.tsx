"use client";

import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
            <h1 className="font-headline text-4xl font-bold text-foreground">
                Oeps!
            </h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
                Er is iets misgegaan bij het laden van de pagina.
                Probeer het opnieuw of ga terug naar de homepage.
            </p>
            <div className="mt-6 flex gap-3">
                <button
                    onClick={reset}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                    Opnieuw proberen
                </button>
                <Link
                    href="/"
                    className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                    Naar homepage
                </Link>
            </div>
        </div>
    );
}
