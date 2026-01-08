/**
 * Tiny Google Maps JS loader (no extra deps).
 *
 * Why this exists:
 * - Next.js App Router renders server-side by default.
 * - Google Maps depends on `window` and must load in the browser.
 * - We also want to avoid injecting the script multiple times.
 */

export type LoadGoogleMapsOptions = {
  apiKey: string;
  libraries?: string[];
  language?: string;
  region?: string;
};

declare global {
  interface Window {
    google?: any;
    __googleMapsScriptLoadingPromise?: Promise<any>;
  }
}

export function loadGoogleMaps(options: LoadGoogleMapsOptions): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps can only be loaded in the browser."));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google);
  }

  // Reuse in-flight promise so we don't inject multiple scripts.
  if (window.__googleMapsScriptLoadingPromise) {
    return window.__googleMapsScriptLoadingPromise;
  }

  const { apiKey, libraries = ["places", "geometry"], language, region } = options;
  if (!apiKey) {
    return Promise.reject(
      new Error(
        "Missing Google Maps API key. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local"
      )
    );
  }

  const params = new URLSearchParams({
    key: apiKey,
    libraries: libraries.join(","),
    v: "quarterly",
  });
  if (language) params.set("language", language);
  if (region) params.set("region", region);

  const src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;

  window.__googleMapsScriptLoadingPromise = new Promise((resolve, reject) => {
    // If another script tag already exists, wait for it.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src^="https://maps.googleapis.com/maps/api/js?"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Maps")));
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });

  return window.__googleMapsScriptLoadingPromise;
}
