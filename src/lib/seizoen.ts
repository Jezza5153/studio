// Season label for the "Nu op tafel" block. Uses Amsterdam time so the label
// flips on the right day regardless of where the server runs.
export const MAANDEN = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"] as const;

export function huidigeMaandIndex(d: Date = new Date()): number {
  const maand = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Amsterdam", month: "numeric" }).format(d);
  return Number(maand) - 1;
}

export function seizoenLabel(d: Date = new Date()): string {
  const m = huidigeMaandIndex(d);
  if (m <= 1) return "winter";
  if (m <= 4) return "lente";
  if (m <= 7) return "zomer";
  if (m === 8) return "nazomer";
  if (m <= 10) return "herfst";
  return "winter";
}
