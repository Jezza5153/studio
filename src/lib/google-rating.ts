import { getSettings } from "@/lib/queries/feed";

// Single source of truth for the Google rating shown across the site.
// The owners maintain the score and review count in the admin panel
// (Settings.googleRating / googleReviewCount); every page reads them through
// here so visible copy and JSON-LD can never drift apart. FALLBACK is only
// shown while Settings is empty or the database is unreachable at build time.
const FALLBACK = { rating: 4.9, count: 110 };

export type GoogleRating = {
  rating: number;
  count: number;
  /** "4.8" — one decimal with a dot, as Google displays it */
  ratingText: string;
  /** "90+" — floored to the nearest ten so the copy stays true as reviews come in */
  countText: string;
  live: boolean;
};

// Round half up to one decimal, like Google Maps does. Number#toFixed would
// turn 4.85 into "4.8" because 4.85 is stored as 4.8499999… in binary.
export function formatRating(rating: number): string {
  const tenths = Math.round(Number((rating * 10).toFixed(6)));
  return (tenths / 10).toFixed(1);
}

export function formatCountPlus(count: number): string {
  return count < 10 ? String(count) : `${Math.floor(count / 10) * 10}+`;
}

export async function getGoogleRating(): Promise<GoogleRating> {
  try {
    const settings = await getSettings();
    if (settings && settings.googleRating > 0 && settings.googleReviewCount > 0) {
      return {
        rating: settings.googleRating,
        count: settings.googleReviewCount,
        ratingText: formatRating(settings.googleRating),
        countText: formatCountPlus(settings.googleReviewCount),
        live: true,
      };
    }
  } catch (err) {
    console.error("google-rating: settings lookup failed, using fallback", err);
  }
  return {
    ...FALLBACK,
    ratingText: formatRating(FALLBACK.rating),
    countText: formatCountPlus(FALLBACK.count),
    live: false,
  };
}
