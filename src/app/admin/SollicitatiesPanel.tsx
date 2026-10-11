"use client";

import { useCallback, useEffect, useState } from "react";
import { telLink } from "@/lib/sollicitatie";

interface Sollicitatie {
    id: string;
    createdAt: string;
    vacatureSlug: string;
    vacatureTitel: string;
    naam: string;
    telefoon: string;
    email: string | null;
    beschikbaarheid: string;
    bericht: string | null;
    status: string;
}

const BEWAARTERMIJN_DAGEN = 28;

function datumTijd(iso: string) {
    return new Date(iso).toLocaleString("nl-NL", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function dagenGeleden(iso: string) {
    return Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
}

// ─── Sollicitaties (formulier op /vacatures/[slug]) ───
export default function SollicitatiesPanel({
    authHeaders,
    toast,
}: {
    authHeaders: () => HeadersInit;
    toast: (msg: string, type?: "success" | "error" | "info") => void;
}) {
    const [items, setItems] = useState<Sollicitatie[]>([]);
    const [nieuw, setNieuw] = useState(0);
    const [laden, setLaden] = useState(true);
    const [fout, setFout] = useState(false);
    const [open, setOpen] = useState(false);
    const [bezigMet, setBezigMet] = useState<string | null>(null);

    const ophalen = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/sollicitaties", { headers: authHeaders(), cache: "no-store" });
            if (!res.ok) throw new Error(String(res.status));
            const data = await res.json();
            setItems(data.items);
            setNieuw(data.nieuw);
            setFout(false);
            return data.nieuw as number;
        } catch {
            setFout(true);
            return 0;
        } finally {
            setLaden(false);
        }
    }, [authHeaders]);

    // Bij het laden openklappen als er nieuwe sollicitaties zijn.
    useEffect(() => {
        ophalen().then((n) => { if (n > 0) setOpen(true); });
    }, [ophalen]);

    const zetStatus = async (s: Sollicitatie, status: "nieuw" | "afgehandeld") => {
        setBezigMet(s.id);
        const res = await fetch(`/api/admin/sollicitaties/${s.id}`, {
            method: "PATCH",
            headers: authHeaders(),
            body: JSON.stringify({ status }),
        }).catch(() => null);
        if (res?.ok) toast(status === "afgehandeld" ? "Gemarkeerd als afgehandeld" : "Teruggezet op nieuw");
        else toast("Opslaan mislukt", "error");
        await ophalen();
        setBezigMet(null);
    };

    const verwijder = async (s: Sollicitatie) => {
        if (!confirm(`Sollicitatie van ${s.naam} definitief verwijderen? Dit kan niet ongedaan worden gemaakt.`)) return;
        setBezigMet(s.id);
        const res = await fetch(`/api/admin/sollicitaties/${s.id}`, {
            method: "DELETE",
            headers: authHeaders(),
        }).catch(() => null);
        if (res?.ok) toast("Sollicitatie verwijderd");
        else toast("Verwijderen mislukt", "error");
        await ophalen();
        setBezigMet(null);
    };

    const teOud = items.filter((s) => s.status === "afgehandeld" && dagenGeleden(s.createdAt) > BEWAARTERMIJN_DAGEN).length;

    return (
        <section className="mt-6 rounded-xl border border-border/50 bg-background p-4 sm:p-5 shadow-sm" aria-labelledby="sollicitaties-titel">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="sollicitaties-lijst"
                className="flex w-full items-center justify-between gap-3 text-left"
            >
                <h2 id="sollicitaties-titel" className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    📋 Sollicitaties
                </h2>
                <span className="flex items-center gap-2">
                    {nieuw > 0 && (
                        <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                            {nieuw} nieuw
                        </span>
                    )}
                    {!laden && !fout && (
                        <span className="text-xs text-muted-foreground">{items.length} totaal</span>
                    )}
                    <span className="text-xs text-muted-foreground" aria-hidden>{open ? "▲" : "▼"}</span>
                </span>
            </button>

            {open && (
                <div id="sollicitaties-lijst" className="mt-4 space-y-3">
                    <p className="text-[11px] text-muted-foreground/80">
                        Nieuwste eerst. AVG: verwijder een sollicitatie uiterlijk 4 weken na de procedure (dat beloven we op het formulier).
                    </p>
                    {teOud > 0 && (
                        <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-800">
                            {teOud} afgehandelde {teOud === 1 ? "sollicitatie is" : "sollicitaties zijn"} ouder dan 4 weken. Verwijder ze als de procedure klaar is.
                        </p>
                    )}

                    {laden ? (
                        <div className="h-16 animate-pulse rounded-lg bg-muted" />
                    ) : fout ? (
                        <p className="py-4 text-sm text-red-600">
                            Sollicitaties laden mislukt. Ververs de pagina of probeer het later opnieuw.
                        </p>
                    ) : items.length === 0 ? (
                        <p className="py-6 text-center text-sm text-muted-foreground">Nog geen sollicitaties.</p>
                    ) : (
                        items.map((s) => {
                            const isNieuw = s.status === "nieuw";
                            const bezig = bezigMet === s.id;
                            return (
                                <article
                                    key={s.id}
                                    className={`rounded-lg border p-3 sm:p-4 text-sm transition ${isNieuw ? "border-primary/50 bg-primary/5" : "border-border/30 bg-background opacity-75"}`}
                                >
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${isNieuw ? "bg-primary text-primary-foreground" : "bg-emerald-500/10 text-emerald-700"}`}>
                                            {isNieuw ? "Nieuw" : "Afgehandeld"}
                                        </span>
                                        <span className="font-semibold text-foreground">{s.vacatureTitel}</span>
                                        <time dateTime={s.createdAt} className="text-xs text-muted-foreground">
                                            {datumTijd(s.createdAt)}
                                        </time>
                                    </div>

                                    <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-[9rem_1fr]">
                                        <dt className="text-xs font-medium text-muted-foreground">Naam</dt>
                                        <dd className="font-medium text-foreground break-words">{s.naam}</dd>
                                        <dt className="text-xs font-medium text-muted-foreground">Telefoon</dt>
                                        <dd>
                                            <a href={telLink(s.telefoon)} className="font-medium text-primary underline underline-offset-2">
                                                {s.telefoon}
                                            </a>
                                        </dd>
                                        <dt className="text-xs font-medium text-muted-foreground">E-mail</dt>
                                        <dd className="break-all">
                                            {s.email ? (
                                                <a href={`mailto:${s.email}`} className="text-primary underline underline-offset-2">
                                                    {s.email}
                                                </a>
                                            ) : (
                                                <span className="text-muted-foreground">niet ingevuld</span>
                                            )}
                                        </dd>
                                        <dt className="text-xs font-medium text-muted-foreground">Beschikbaarheid</dt>
                                        <dd className="whitespace-pre-wrap break-words text-foreground">{s.beschikbaarheid || "Niet ingevuld"}</dd>
                                        <dt className="text-xs font-medium text-muted-foreground">Bericht</dt>
                                        <dd className="whitespace-pre-wrap break-words text-foreground">
                                            {s.bericht || <span className="text-muted-foreground">geen bericht</span>}
                                        </dd>
                                    </dl>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {isNieuw ? (
                                            <button
                                                type="button"
                                                onClick={() => zetStatus(s, "afgehandeld")}
                                                disabled={bezig}
                                                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                                            >
                                                ✓ Markeer als afgehandeld
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => zetStatus(s, "nieuw")}
                                                disabled={bezig}
                                                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
                                            >
                                                Terugzetten op nieuw
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => verwijder(s)}
                                            disabled={bezig}
                                            className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-500/10 disabled:opacity-50"
                                        >
                                            🗑️ Verwijderen
                                        </button>
                                    </div>
                                </article>
                            );
                        })
                    )}
                </div>
            )}
        </section>
    );
}
