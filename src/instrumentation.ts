// Polyfill: Node 22+ ships a broken localStorage global
// (the object exists but lacks getItem/setItem/removeItem).
// Patch it before any SSR code runs so client components don't crash.
if (
    typeof globalThis.localStorage !== "undefined" &&
    typeof globalThis.localStorage.getItem !== "function"
) {
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => {
            store[k] = v;
        },
        removeItem: (k: string) => {
            delete store[k];
        },
        clear: () => {
            for (const k in store) delete store[k];
        },
        get length() {
            return Object.keys(store).length;
        },
        key: (i: number) => Object.keys(store)[i] ?? null,
    };
}

export async function register() {
    // Instrumentation hook — polyfill applied above at module load time
}
