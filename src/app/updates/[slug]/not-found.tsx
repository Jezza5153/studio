import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
            <h1 className="font-headline text-5xl font-bold text-foreground">
                404
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
                Dit artikel is niet gevonden in De Tafelaar Courant.
            </p>
            <Link
                href="/updates"
                className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
                Alle updates bekijken
            </Link>
        </div>
    );
}
