"use client";

// Polyfill: Node 22+ ships a broken localStorage (exists but lacks getItem/setItem).
if (typeof globalThis.localStorage !== "undefined" && typeof globalThis.localStorage.getItem !== "function") {
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => { store[k] = v; },
        removeItem: (k: string) => { delete store[k]; },
        clear: () => { for (const k in store) delete store[k]; },
        get length() { return Object.keys(store).length; },
        key: (i: number) => Object.keys(store)[i] ?? null,
    };
}

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { TYPE_LABELS, CATEGORY_LABELS, TONIGHT_STATUS_CONFIG } from "@/lib/constants";

// ─── Types ───
interface FeedItem {
    id: string;
    type: string;
    category: string;
    title: string;
    slug: string;
    body: string | null;
    media: string | null;
    rating: number | null;
    authorName: string | null;
    sourceUrl: string | null;
    pinned: boolean;
    publishedAt: string;
    createdAt: string;
}

interface Settings {
    id: string;
    tonightStatus: string;
    tonightNote: string;
    ownerReplyMessage: string;
    googleRating: number;
    googleReviewCount: number;
}

// ─── Toast System ───
interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

let toastId = 0;

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg animate-[slideUp_0.3s_ease] ${t.type === "success" ? "bg-emerald-600 text-white" :
                        t.type === "error" ? "bg-red-600 text-white" :
                            "bg-foreground text-background"
                        }`}
                    onClick={() => onDismiss(t.id)}
                >
                    <span>{t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"}</span>
                    <span className="flex-1">{t.message}</span>
                    <button className="opacity-60 hover:opacity-100 text-xs ml-2">✕</button>
                </div>
            ))}
        </div>
    );
}

function useToasts() {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const addToast = useCallback((message: string, type: Toast["type"] = "success") => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
    }, []);
    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    return { toasts, addToast, dismiss };
}

// ─── Auth Helper ───
function getToken(): string {
    if (typeof globalThis.localStorage?.getItem !== "function") return "";
    try {
        return localStorage.getItem("courant-admin-token") || "";
    } catch {
        return "";
    }
}

function authHeaders(): HeadersInit {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
    };
}

// ─── Helper: get thumbnail URL from media JSON ───
function getThumbUrl(media: string | null): string | null {
    if (!media) return null;
    try {
        const parsed = JSON.parse(media);
        return parsed[0]?.thumbUrl || parsed[0]?.url || null;
    } catch {
        return null;
    }
}

// ─── Login Gate ───
function LoginGate({ onLogin }: { onLogin: (token: string) => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const token = btoa(`${username}:${password}`);
        const res = await fetch("/api/admin/settings", {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
            localStorage.setItem("courant-admin-token", token);
            onLogin(token);
        } else {
            setError(true);
        }
        setLoading(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-background to-muted/30">
            <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border/50 bg-background p-8 shadow-xl">
                <h1 className="font-headline text-2xl font-bold text-center text-foreground">
                    🗞️ Courant Admin
                </h1>
                <p className="text-center text-sm text-muted-foreground">
                    Voer je inloggegevens in
                </p>
                <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Gebruikersnaam</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(false); }}
                        onKeyDown={(e) => e.key === "Enter" && document.getElementById("admin-pass")?.focus()}
                        placeholder="Gebruikersnaam..."
                        autoComplete="username"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Wachtwoord</label>
                    <input
                        id="admin-pass"
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(false); }}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        placeholder="Wachtwoord..."
                        autoComplete="current-password"
                        className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                    />
                </div>
                {error && (
                    <p className="text-xs text-red-500 text-center">Ongeldige inloggegevens</p>
                )}
                <button
                    onClick={handleLogin}
                    disabled={!username || !password || loading}
                    className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                >
                    {loading ? "Bezig..." : "Inloggen"}
                </button>
            </div>
        </div>
    );
}

// ─── Dashboard Stats ───
function DashboardStats({ items }: { items: FeedItem[] }) {
    const stats = useMemo(() => {
        const byType: Record<string, number> = {};
        let pinned = 0;
        let withMedia = 0;
        for (const item of items) {
            byType[item.type] = (byType[item.type] || 0) + 1;
            if (item.pinned) pinned++;
            if (item.media) withMedia++;
        }
        const lastPublished = items.length > 0
            ? new Date(items[0].publishedAt).toLocaleDateString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
            : "—";
        return { byType, pinned, withMedia, lastPublished, total: items.length };
    }, [items]);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="rounded-xl border border-border/50 bg-background p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Totaal</p>
                <p className="text-xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">📌 Vastgepind</p>
                <p className="text-xl font-bold text-foreground">{stats.pinned}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">📷 Met foto</p>
                <p className="text-xl font-bold text-foreground">{stats.withMedia}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-background p-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Laatste post</p>
                <p className="text-sm font-semibold text-foreground truncate">{stats.lastPublished}</p>
            </div>
        </div>
    );
}

// ─── Tonight Status Panel ───
function TonightPanel({ settings, onUpdate, toast }: {
    settings: Settings;
    onUpdate: (s: Settings) => void;
    toast: (msg: string, type?: Toast["type"]) => void;
}) {
    const [status, setStatus] = useState(settings.tonightStatus);
    const [note, setNote] = useState(settings.tonightNote);
    const [ownerReply, setOwnerReply] = useState(settings.ownerReplyMessage || "");
    const [saving, setSaving] = useState(false);

    const save = async () => {
        setSaving(true);
        const res = await fetch("/api/admin/settings", {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ tonightStatus: status, tonightNote: note, ownerReplyMessage: ownerReply }),
        });
        if (res.ok) {
            const updated = await res.json();
            onUpdate(updated);
            toast("Status opgeslagen");
        } else {
            toast("Opslaan mislukt", "error");
        }
        setSaving(false);
    };

    return (
        <div className="rounded-xl border border-border/50 bg-background p-4 sm:p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                🔴 Vanavond Status
            </h2>
            <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(TONIGHT_STATUS_CONFIG).map(([key, cfg]) => (
                    <button
                        key={key}
                        onClick={() => setStatus(key)}
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${status === key
                            ? "bg-foreground text-background shadow"
                            : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                            }`}
                    >
                        <span>{cfg.emoji}</span>
                        {cfg.label}
                    </button>
                ))}
            </div>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Notitie voor vanavond (optioneel)..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 mb-3"
            />

            {/* Owner reply for reviews */}
            <div className="border-t border-border/30 pt-3 mt-1 mb-3">
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    💬 Reactie onder reviews (optioneel)
                </label>
                <input
                    type="text"
                    value={ownerReply}
                    onChange={(e) => setOwnerReply(e.target.value)}
                    placeholder="Bijv: Bedankt voor je bezoek! Hopelijk tot snel. — Het Tafelaar Team"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
                <p className="mt-1 text-[10px] text-muted-foreground/60">Dit bericht verschijnt onder elke review op de voorpagina</p>
            </div>

            {/* Google rating info (read-only) */}
            {settings.googleRating > 0 && (
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <span>⭐ Google: {settings.googleRating.toFixed(1)} ({settings.googleReviewCount} reviews)</span>
                </div>
            )}

            <button
                onClick={save}
                disabled={saving}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
                {saving ? "Opslaan..." : "Opslaan"}
            </button>
        </div>
    );
}

// ─── Rich Text Toolbar ───
function RichTextArea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const ref = useRef<HTMLTextAreaElement>(null);

    const wrap = (before: string, after: string) => {
        const ta = ref.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const selected = value.slice(start, end);
        const replacement = `${before}${selected || "tekst"}${after}`;
        const newValue = value.slice(0, start) + replacement + value.slice(end);
        onChange(newValue);
        setTimeout(() => {
            ta.focus();
            ta.setSelectionRange(start + before.length, start + before.length + (selected || "tekst").length);
        }, 0);
    };

    const insertAtCursor = (text: string) => {
        const ta = ref.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const newValue = value.slice(0, start) + text + value.slice(start);
        onChange(newValue);
        setTimeout(() => {
            ta.focus();
            ta.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    return (
        <div>
            <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                <button type="button" onClick={() => wrap("**", "**")} className="rounded px-2 py-1 text-xs font-bold bg-foreground/5 hover:bg-foreground/10 transition" title="Vet">B</button>
                <button type="button" onClick={() => wrap("*", "*")} className="rounded px-2 py-1 text-xs italic bg-foreground/5 hover:bg-foreground/10 transition" title="Cursief">I</button>
                <button type="button" onClick={() => wrap("[", "](https://)")} className="rounded px-2 py-1 text-xs bg-foreground/5 hover:bg-foreground/10 transition" title="Link">🔗</button>
                <button type="button" onClick={() => insertAtCursor("\n- ")} className="rounded px-2 py-1 text-xs bg-foreground/5 hover:bg-foreground/10 transition" title="Lijst">•</button>
                <button type="button" onClick={() => insertAtCursor("\n\n")} className="rounded px-2 py-1 text-xs bg-foreground/5 hover:bg-foreground/10 transition" title="Nieuwe alinea">¶</button>
                <span className="text-[9px] text-muted-foreground/50 ml-auto hidden sm:inline">Markdown ondersteund</span>
            </div>
            <textarea
                ref={ref}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 resize-y font-mono"
            />
        </div>
    );
}

// ─── Live Preview ───
function LivePreview({ form }: { form: { title: string; body: string; media: string; authorName: string; type: string; category: string } }) {
    const thumbUrl = getThumbUrl(form.media);
    return (
        <div className="rounded-xl border border-border/50 bg-muted/20 p-4 text-sm">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/50 mb-2">Voorbeeld</p>
            {thumbUrl && (
                <img src={thumbUrl} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="flex items-center gap-2 mb-1">
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase ${form.type === "INSTAGRAM" ? "bg-pink-500/10 text-pink-600" :
                    form.type === "GOOGLE_REVIEW" ? "bg-amber-500/10 text-amber-600" :
                        form.type === "PRESS" ? "bg-blue-500/10 text-blue-600" :
                            "bg-emerald-500/10 text-emerald-600"
                    }`}>{TYPE_LABELS[form.type] || form.type}</span>
                <span className="text-[9px] text-muted-foreground">{CATEGORY_LABELS[form.category] || form.category}</span>
            </div>
            <h3 className="font-headline font-bold text-foreground leading-tight mb-1">
                {form.title || "Titel..."}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                {form.body || "Tekst..."}
            </p>
            {form.authorName && (
                <p className="text-[10px] text-muted-foreground/60 mt-2">— {form.authorName}</p>
            )}
        </div>
    );
}

// ─── Item Editor Modal ───
function ItemEditor({
    item,
    onSave,
    onClose,
    toast,
}: {
    item?: FeedItem;
    onSave: (data: Partial<FeedItem>) => Promise<void>;
    onClose: () => void;
    toast: (msg: string, type?: Toast["type"]) => void;
}) {
    const [form, setForm] = useState({
        type: item?.type || "MANUAL",
        category: item?.category || "algemeen",
        title: item?.title || "",
        body: item?.body || "",
        media: item?.media || "",
        rating: item?.rating || null as number | null,
        authorName: item?.authorName || "",
        sourceUrl: item?.sourceUrl || "",
        pinned: item?.pinned || false,
        publishedAt: item?.publishedAt
            ? new Date(item.publishedAt).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16),
    });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const update = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

    const uploadFile = async (file: File) => {
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${getToken()}` },
                body: fd,
            });
            if (res.ok) {
                const data = await res.json();
                update("media", JSON.stringify([{
                    url: data.url,
                    thumbUrl: data.url,
                    width: data.width || 800,
                    height: data.height || 600,
                    kind: "image",
                }]));
                toast("Foto geüpload");
            } else {
                const err = await res.json().catch(() => ({ error: "Upload failed" }));
                toast(err.error || "Upload mislukt", "error");
            }
        } catch {
            toast("Upload mislukt — probeer het opnieuw", "error");
        }
        setUploading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        await onSave({
            ...form,
            rating: form.type === "GOOGLE_REVIEW" ? form.rating : null,
            authorName: form.authorName || null,
            sourceUrl: form.sourceUrl || null,
            media: form.media || null,
        });
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-4 overflow-y-auto" onClick={onClose}>
            <div
                className="w-full max-w-3xl my-4 rounded-2xl border border-border bg-background shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                    <h2 className="font-headline text-lg font-bold text-foreground">
                        {item ? "Bericht bewerken" : "Nieuw bericht"}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${showPreview ? "bg-primary/10 text-primary" : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"}`}
                        >
                            👁 Voorbeeld
                        </button>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl leading-none">
                            ✕
                        </button>
                    </div>
                </div>

                <div className={`flex ${showPreview ? "flex-col lg:flex-row" : ""}`}>
                    {/* Form */}
                    <div className={`p-6 space-y-4 ${showPreview ? "lg:w-3/5 lg:border-r lg:border-border/50" : "w-full"} overflow-y-auto max-h-[70vh]`}>
                        {/* Type + Category */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Type</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => update("type", e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                                >
                                    {Object.entries(TYPE_LABELS).map(([k, v]) => (
                                        <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Categorie</label>
                                <select
                                    value={form.category}
                                    onChange={(e) => update("category", e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                                >
                                    {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                                        <option key={k} value={k}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Titel</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => update("title", e.target.value)}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        {/* Body with Rich Text Toolbar */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Tekst</label>
                            <RichTextArea value={form.body} onChange={(v) => update("body", v)} />
                        </div>

                        {/* Photo Upload */}
                        <div>
                            <label className="mb-1 block text-xs font-medium text-muted-foreground">Foto</label>
                            {(() => {
                                const currentUrl = getThumbUrl(form.media);
                                return currentUrl ? (
                                    <div className="relative group/img">
                                        <img
                                            src={currentUrl}
                                            alt="Preview"
                                            className="w-full max-h-48 object-cover rounded-lg border border-border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => update("media", "")}
                                            className="absolute top-2 right-2 rounded-full bg-black/60 text-white w-7 h-7 flex items-center justify-center text-sm hover:bg-red-500 transition opacity-0 group-hover/img:opacity-100"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className="relative rounded-lg border-2 border-dashed border-border bg-foreground/[0.02] p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-foreground/[0.04] transition-all"
                                        onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-primary", "bg-primary/5"); }}
                                        onDragLeave={(e) => { e.currentTarget.classList.remove("border-primary", "bg-primary/5"); }}
                                        onDrop={async (e) => {
                                            e.preventDefault();
                                            e.currentTarget.classList.remove("border-primary", "bg-primary/5");
                                            const file = e.dataTransfer.files[0];
                                            if (file) await uploadFile(file);
                                        }}
                                        onClick={() => document.getElementById("photo-upload")?.click()}
                                    >
                                        {uploading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                <span className="text-xs text-muted-foreground">Uploaden...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-2xl">📷</span>
                                                <p className="mt-1 text-sm font-medium text-foreground">Klik of sleep foto hierheen</p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">JPG, PNG, WebP of GIF — max 10MB</p>
                                            </>
                                        )}
                                    </div>
                                );
                            })()}
                            <input
                                id="photo-upload"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) await uploadFile(file);
                                    e.target.value = "";
                                }}
                            />
                        </div>

                        {/* Rating */}
                        {form.type === "GOOGLE_REVIEW" && (
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Rating (1-5)</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => update("rating", n)}
                                            className={`text-xl transition ${(form.rating || 0) >= n ? "opacity-100" : "opacity-20"}`}
                                        >
                                            ⭐
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author + Source */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Auteur</label>
                                <input
                                    type="text"
                                    value={form.authorName}
                                    onChange={(e) => update("authorName", e.target.value)}
                                    placeholder="Optioneel..."
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Bron URL</label>
                                <input
                                    type="url"
                                    value={form.sourceUrl}
                                    onChange={(e) => update("sourceUrl", e.target.value)}
                                    placeholder="https://..."
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                                />
                            </div>
                        </div>

                        {/* Published at + Pinned */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                            <div className="flex-1">
                                <label className="mb-1 block text-xs font-medium text-muted-foreground">Publicatiedatum</label>
                                <input
                                    type="datetime-local"
                                    value={form.publishedAt}
                                    onChange={(e) => update("publishedAt", e.target.value)}
                                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
                                />
                            </div>
                            <label className="flex items-center gap-2 pb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.pinned}
                                    onChange={(e) => update("pinned", e.target.checked)}
                                    className="rounded"
                                />
                                <span className="text-sm font-medium text-foreground">📌 Vastpinnen</span>
                            </label>
                        </div>
                    </div>

                    {/* Live Preview Panel */}
                    {showPreview && (
                        <div className="lg:w-2/5 p-6 overflow-y-auto max-h-[70vh]">
                            <LivePreview form={form} />
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-border/50">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                        Annuleren
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !form.title}
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                    >
                        {saving ? "Opslaan..." : item ? "Bijwerken" : "Aanmaken"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Item Row (with thumbnail + selection) ───
function ItemRow({
    item,
    selected,
    onSelect,
    onEdit,
    onDelete,
    onTogglePin,
    dragging,
    onDragStart,
    onDragOver,
    onDrop,
}: {
    item: FeedItem;
    selected: boolean;
    onSelect: (checked: boolean) => void;
    onEdit: () => void;
    onDelete: () => void;
    onTogglePin: () => void;
    dragging?: boolean;
    onDragStart?: () => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDrop?: () => void;
}) {
    const thumb = getThumbUrl(item.media);

    return (
        <div
            className={`flex items-center gap-2 sm:gap-3 rounded-lg border p-2 sm:p-3 transition cursor-default ${selected ? "border-primary/50 bg-primary/5" :
                dragging ? "border-primary/30 bg-primary/5 opacity-60" :
                    "border-border/30 bg-background hover:border-border"
                }`}
            draggable={item.pinned}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {/* Checkbox for bulk select */}
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onSelect(e.target.checked)}
                className="rounded shrink-0"
            />

            {/* Drag handle (pinned items only) */}
            {item.pinned && (
                <span className="cursor-grab text-muted-foreground/40 hover:text-muted-foreground text-sm hidden sm:inline" title="Sleep om te ordenen">⋮⋮</span>
            )}

            {/* Thumbnail */}
            {thumb ? (
                <img src={thumb} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover shrink-0" />
            ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-muted/50 shrink-0 flex items-center justify-center text-muted-foreground/30 text-xs">
                    📷
                </div>
            )}

            {/* Pin indicator */}
            <button
                onClick={onTogglePin}
                className={`text-base sm:text-lg transition shrink-0 ${item.pinned ? "opacity-100" : "opacity-20 hover:opacity-60"}`}
                title={item.pinned ? "Losmaken" : "Vastpinnen"}
            >
                📌
            </button>

            {/* Type badge */}
            <span className={`hidden sm:inline shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${item.type === "INSTAGRAM" ? "bg-pink-500/10 text-pink-600" :
                item.type === "GOOGLE_REVIEW" ? "bg-amber-500/10 text-amber-600" :
                    item.type === "PRESS" ? "bg-blue-500/10 text-blue-600" :
                        "bg-emerald-500/10 text-emerald-600"
                }`}>
                {TYPE_LABELS[item.type] || item.type}
            </span>

            {/* Title + body preview */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground/70 truncate hidden sm:block">{item.body?.slice(0, 80)}</p>
            </div>

            {/* Date */}
            <time className="hidden shrink-0 text-xs text-muted-foreground/60 sm:block">
                {new Date(item.publishedAt).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}
            </time>

            {/* Actions */}
            <div className="flex shrink-0 gap-0.5 sm:gap-1">
                <button
                    onClick={onEdit}
                    className="rounded-lg p-1 sm:p-1.5 text-muted-foreground hover:bg-foreground/5 hover:text-foreground transition"
                    title="Bewerken"
                >
                    ✏️
                </button>
                <button
                    onClick={onDelete}
                    className="rounded-lg p-1 sm:p-1.5 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition"
                    title="Verwijderen"
                >
                    🗑️
                </button>
            </div>
        </div>
    );
}

// ─── Bulk Action Bar ───
function BulkActionBar({
    count,
    onPinAll,
    onUnpinAll,
    onDeleteAll,
    onClearSelection,
}: {
    count: number;
    onPinAll: () => void;
    onUnpinAll: () => void;
    onDeleteAll: () => void;
    onClearSelection: () => void;
}) {
    if (count === 0) return null;
    return (
        <div className="flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 mb-3 animate-[slideUp_0.2s_ease] flex-wrap">
            <span className="text-sm font-semibold">{count} geselecteerd</span>
            <div className="flex gap-1.5 ml-auto">
                <button onClick={onPinAll} className="rounded-lg bg-background/20 px-3 py-1 text-xs font-medium hover:bg-background/30 transition">📌 Pin</button>
                <button onClick={onUnpinAll} className="rounded-lg bg-background/20 px-3 py-1 text-xs font-medium hover:bg-background/30 transition">📌 Unpin</button>
                <button onClick={onDeleteAll} className="rounded-lg bg-red-500/80 px-3 py-1 text-xs font-medium hover:bg-red-500 transition">🗑️ Verwijderen</button>
                <button onClick={onClearSelection} className="rounded-lg bg-background/10 px-3 py-1 text-xs font-medium hover:bg-background/20 transition">✕</button>
            </div>
        </div>
    );
}

// ─── Main Admin Page ───
export default function AdminPage() {
    const [authed, setAuthed] = useState(false);
    const [items, setItems] = useState<FeedItem[]>([]);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [editingItem, setEditingItem] = useState<FeedItem | undefined>(undefined);
    const [showEditor, setShowEditor] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const { toasts, addToast, dismiss } = useToasts();

    // Check existing auth
    useEffect(() => {
        const token = getToken();
        if (token) {
            fetch("/api/admin/settings", { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    if (res.ok) setAuthed(true);
                    else setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch items
    const fetchItems = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), pageSize: "20" });
        if (filter !== "all") params.set("type", filter);
        if (search) params.set("q", search);

        const res = await fetch(`/api/admin/items?${params}`, { headers: authHeaders() });
        if (res.ok) {
            const data = await res.json();
            setItems(data.items);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        }
        setLoading(false);
    }, [page, filter, search]);

    // Fetch settings
    const fetchSettings = useCallback(async () => {
        const res = await fetch("/api/admin/settings", { headers: authHeaders() });
        if (res.ok) {
            setSettings(await res.json());
        }
    }, []);

    // Load data on auth
    useEffect(() => {
        if (authed) {
            fetchItems();
            fetchSettings();
        }
    }, [authed, fetchItems, fetchSettings]);

    // Handlers
    const handleSave = async (data: Partial<FeedItem>) => {
        if (editingItem) {
            await fetch(`/api/admin/items/${editingItem.id}`, {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify(data),
            });
            addToast("Bericht bijgewerkt");
        } else {
            await fetch("/api/admin/items", {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify(data),
            });
            addToast("Bericht aangemaakt");
        }
        setShowEditor(false);
        setEditingItem(undefined);
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;
        await fetch(`/api/admin/items/${id}`, { method: "DELETE", headers: authHeaders() });
        addToast("Bericht verwijderd");
        fetchItems();
    };

    const handleTogglePin = async (item: FeedItem) => {
        await fetch(`/api/admin/items/${item.id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ pinned: !item.pinned }),
        });
        addToast(item.pinned ? "Losgemaakt" : "Vastgepind");
        fetchItems();
    };

    // Bulk actions
    const handleBulkPin = async (pin: boolean) => {
        for (const id of selectedIds) {
            await fetch(`/api/admin/items/${id}`, {
                method: "PUT",
                headers: authHeaders(),
                body: JSON.stringify({ pinned: pin }),
            });
        }
        setSelectedIds(new Set());
        addToast(`${selectedIds.size} berichten ${pin ? "vastgepind" : "losgemaakt"}`);
        fetchItems();
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Weet je zeker dat je ${selectedIds.size} berichten wilt verwijderen?`)) return;
        for (const id of selectedIds) {
            await fetch(`/api/admin/items/${id}`, { method: "DELETE", headers: authHeaders() });
        }
        setSelectedIds(new Set());
        addToast(`${selectedIds.size} berichten verwijderd`);
        fetchItems();
    };

    // Drag to reorder (pinned only)
    const handleDrop = async (fromIdx: number, toIdx: number) => {
        if (fromIdx === toIdx) return;
        const pinnedItems = items.filter((i) => i.pinned);
        const moved = pinnedItems[fromIdx];
        if (!moved) return;
        // Simple: swap publishedAt dates to reorder
        const target = pinnedItems[toIdx];
        if (!target) return;
        await fetch(`/api/admin/items/${moved.id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ publishedAt: target.publishedAt }),
        });
        await fetch(`/api/admin/items/${target.id}`, {
            method: "PUT",
            headers: authHeaders(),
            body: JSON.stringify({ publishedAt: moved.publishedAt }),
        });
        addToast("Volgorde bijgewerkt");
        fetchItems();
        setDragIdx(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("courant-admin-token");
        setAuthed(false);
    };

    // Select all / none
    const toggleSelectAll = () => {
        if (selectedIds.size === items.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(items.map((i) => i.id)));
        }
    };

    // Login gate
    if (!authed) {
        return (
            <>
                <LoginGate onLogin={() => setAuthed(true)} />
                <ToastContainer toasts={toasts} onDismiss={dismiss} />
            </>
        );
    }

    return (
        <div className="container mx-auto max-w-4xl px-3 sm:px-4 py-6 sm:py-8">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="font-headline text-xl sm:text-2xl font-bold text-foreground">
                        🗞️ Courant Admin
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground">Beheer alle berichten en instellingen</p>
                </div>
                <div className="flex gap-2">
                    <a
                        href="/"
                        target="_blank"
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition"
                    >
                        Bekijk site →
                    </a>
                    <button
                        onClick={handleLogout}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 transition"
                    >
                        Uitloggen
                    </button>
                </div>
            </div>

            {/* Tonight Status */}
            {settings && (
                <TonightPanel settings={settings} onUpdate={setSettings} toast={addToast} />
            )}

            {/* Dashboard Stats */}
            <div className="mt-6">
                <DashboardStats items={items} />
            </div>

            {/* Action bar */}
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                    {total} berichten totaal
                </p>
                <button
                    onClick={() => { setEditingItem(undefined); setShowEditor(true); }}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 w-full sm:w-auto"
                >
                    + Nieuw bericht
                </button>
            </div>

            {/* Search + Filter */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="🔍 Zoeken..."
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex flex-wrap gap-1.5">
                    {[
                        { label: "Alles", value: "all" },
                        ...Object.entries(TYPE_LABELS).map(([k, v]) => ({ label: v, value: k })),
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => { setFilter(tab.value); setPage(1); }}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition ${filter === tab.value
                                ? "bg-foreground text-background"
                                : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bulk Action Bar */}
            <BulkActionBar
                count={selectedIds.size}
                onPinAll={() => handleBulkPin(true)}
                onUnpinAll={() => handleBulkPin(false)}
                onDeleteAll={handleBulkDelete}
                onClearSelection={() => setSelectedIds(new Set())}
            />

            {/* Select all toggle */}
            {items.length > 0 && (
                <div className="mb-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedIds.size === items.length && items.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                    />
                    <span className="text-xs text-muted-foreground">Alles selecteren</span>
                </div>
            )}

            {/* Items list */}
            <div className="space-y-2">
                {loading && items.length === 0 ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
                    ))
                ) : items.length === 0 ? (
                    <div className="py-12 text-center text-sm text-muted-foreground">
                        Geen berichten gevonden.
                    </div>
                ) : (
                    items.map((item, idx) => (
                        <ItemRow
                            key={item.id}
                            item={item}
                            selected={selectedIds.has(item.id)}
                            onSelect={(checked) => {
                                setSelectedIds((prev) => {
                                    const next = new Set(prev);
                                    if (checked) next.add(item.id);
                                    else next.delete(item.id);
                                    return next;
                                });
                            }}
                            onEdit={() => { setEditingItem(item); setShowEditor(true); }}
                            onDelete={() => handleDelete(item.id)}
                            onTogglePin={() => handleTogglePin(item)}
                            dragging={dragIdx === idx}
                            onDragStart={() => setDragIdx(idx)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = "move";
                            }}
                            onDrop={() => {
                                if (dragIdx !== null) handleDrop(dragIdx, idx);
                            }}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground disabled:opacity-30"
                    >
                        ←
                    </button>
                    <span className="text-xs text-muted-foreground">
                        {page} / {totalPages}
                    </span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground disabled:opacity-30"
                    >
                        →
                    </button>
                </div>
            )}

            {/* Editor modal */}
            {showEditor && (
                <ItemEditor
                    item={editingItem}
                    onSave={handleSave}
                    onClose={() => { setShowEditor(false); setEditingItem(undefined); }}
                    toast={addToast}
                />
            )}

            {/* Toast notifications */}
            <ToastContainer toasts={toasts} onDismiss={dismiss} />
        </div>
    );
}
