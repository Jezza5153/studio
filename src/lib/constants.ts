// ─── Feed Item Type Labels ───
export const TYPE_LABELS: Record<string, string> = {
    MANUAL: "Update",
    INSTAGRAM: "Instagram",
    GOOGLE_REVIEW: "Review",
    PRESS: "In de pers",
};

// ─── Feed Category Labels ───
export const CATEGORY_LABELS: Record<string, string> = {
    vanavond: "Vandaag",
    events: "Events",
    nieuwe_kaart: "Nieuwe kaart",
    krant: "In de krant",
    behind: "Achter de schermen",
    algemeen: "Algemeen",
};

// ─── Category Color Coding ───
export const CATEGORY_COLORS: Record<string, { text: string; bg: string; pill: string }> = {
    vanavond: { text: "text-rose-600", bg: "bg-rose-500/10", pill: "bg-rose-500/90" },
    events: { text: "text-indigo-600", bg: "bg-indigo-500/10", pill: "bg-indigo-500/90" },
    nieuwe_kaart: { text: "text-emerald-600", bg: "bg-emerald-500/10", pill: "bg-emerald-500/90" },
    krant: { text: "text-sky-600", bg: "bg-sky-500/10", pill: "bg-sky-500/90" },
    behind: { text: "text-amber-600", bg: "bg-amber-500/10", pill: "bg-amber-500/90" },
    algemeen: { text: "text-slate-600", bg: "bg-slate-500/10", pill: "bg-slate-500/90" },
};

// ─── Tonight Status Config ───
export const TONIGHT_STATUS_CONFIG: Record<
    string,
    { bg: string; glow: string; label: string; emoji: string; tickerLabel: string }
> = {
    OPEN: {
        bg: "bg-emerald-500/10 border-emerald-500/30",
        glow: "shadow-emerald-500/20",
        label: "Plek vrij",
        emoji: "🟢",
        tickerLabel: "🟢 Vanavond: plek vrij!",
    },
    FEW_LEFT: {
        bg: "bg-amber-500/10 border-amber-500/30",
        glow: "shadow-amber-500/20",
        label: "Nog enkele plekken",
        emoji: "🟡",
        tickerLabel: "🟡 Vanavond: nog enkele plekken",
    },
    FULL: {
        bg: "bg-red-500/10 border-red-500/30",
        glow: "shadow-red-500/20",
        label: "Helaas vol",
        emoji: "🔴",
        tickerLabel: "🔴 Vanavond: helaas vol",
    },
};

// ─── Filter Tab Configs ───
export const CATEGORY_PILLS = [
    { label: "Alles", value: "all" },
    { label: "Vandaag", value: "vanavond" },
    { label: "Events", value: "events" },
    { label: "Nieuwe kaart", value: "nieuwe_kaart" },
    { label: "In de krant", value: "krant" },
    { label: "Achter de schermen", value: "behind" },
];

export const FEED_TYPE_TABS = [
    { label: "Alles", value: "all" },
    { label: "Updates", value: "MANUAL" },
    { label: "Foto's", value: "INSTAGRAM" },
    { label: "Reviews", value: "GOOGLE_REVIEW" },
    { label: "Press", value: "PRESS" },
];
