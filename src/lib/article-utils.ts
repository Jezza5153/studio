/**
 * Auto-parse plain body text into structured article sections.
 * No schema changes needed — all structure is derived at render time.
 *
 * Guardrails:
 *   • Q&A only fires when 3+ consecutive question/answer pairs detected
 *   • Headings: HIGH (ALL-CAPS) + MEDIUM (Title Case) confidence
 *   • Pull quotes require 4+ sentences in body
 */

/**
 * Extract a clean meta description from article body.
 * Trims to nearest sentence end within 140-180 chars.
 * Falls back to last word boundary before 160.
 */
export function extractMetaDescription(body: string | null): string | null {
    if (!body) return null;
    const flat = body.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
    if (!flat) return null;

    // If the whole text fits in 180, use it
    if (flat.length <= 180) return flat;

    // Try to cut at a sentence boundary within 140-180 chars
    const sentences = flat.match(/[^.!?]+[.!?]+/g);
    if (sentences) {
        let result = "";
        for (const sentence of sentences) {
            const next = result + sentence;
            if (next.length > 180) break;
            result = next;
        }
        if (result.length >= 80) return result.trim();
    }

    // Fallback: trim to last space before 160
    const cut = flat.slice(0, 160);
    const lastSpace = cut.lastIndexOf(" ");
    return lastSpace > 100 ? cut.slice(0, lastSpace) + "…" : cut + "…";
}

export interface ArticleSection {
    id: string;
    title: string | null;
    body: string;
    isQA?: boolean;
    question?: string;
    answer?: string;
}

export interface ParsedArticle {
    intro: string;
    sections: ArticleSection[];
    pullQuote: string | null;
    readTime: string;
}

/** Estimate read time from word count (~200 wpm) */
export function estimateReadTime(body: string): string {
    const words = body.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min lezen`;
}

/** Detect if a line looks like a question (ends with ?) */
function isQuestion(line: string): boolean {
    return line.trim().endsWith("?");
}

const DUTCH_STOPWORDS = new Set([
    "de", "het", "een", "en", "van", "in", "is", "op", "dat", "die",
    "te", "aan", "met", "voor", "er", "om", "dan", "ook", "als", "maar",
    "bij", "nog", "uit", "was", "wat", "naar", "over", "door",
]);

/**
 * Detect if a line looks like a section heading.
 * Two tiers:
 *   HIGH confidence: ALL-CAPS, 4-60 chars, 2+ letters
 *   MEDIUM confidence: Title-case-ish, 2+ words, 8-70 chars,
 *     no trailing punctuation, ≤50% stopwords
 */
function isHeading(line: string): boolean {
    const trimmed = line.trim();
    if (/[.?!,;:]$/.test(trimmed)) return false;

    // HIGH: strict ALL-CAPS
    if (
        trimmed.length >= 4 &&
        trimmed.length <= 60 &&
        trimmed === trimmed.toUpperCase() &&
        (trimmed.match(/[A-Z]/g) || []).length >= 2
    ) {
        return true;
    }

    // MEDIUM: Title-case paragraph header
    const words = trimmed.split(/\s+/);
    if (words.length < 2 || trimmed.length < 8 || trimmed.length > 70) return false;
    // First word must start uppercase
    if (!/^[A-Z\u00C0-\u00DC]/.test(words[0])) return false;
    // Not too many stopwords (≤50%)
    const stopCount = words.filter((w) => DUTCH_STOPWORDS.has(w.toLowerCase())).length;
    if (stopCount / words.length > 0.5) return false;
    // At least 2 capitalised words (ignoring stopwords)
    const capWords = words.filter(
        (w) => /^[A-Z\u00C0-\u00DC]/.test(w) && !DUTCH_STOPWORDS.has(w.toLowerCase())
    ).length;
    if (capWords < 2) return false;

    return true;
}

/** Pick a pull quote — a compelling sentence around the 30% mark */
function extractPullQuote(body: string): string | null {
    const sentences = body.match(/[^.!?]+[.!?]+/g);
    if (!sentences || sentences.length < 4) return null;

    const targetIndex = Math.floor(sentences.length * 0.3);
    for (let offset = 0; offset < 3; offset++) {
        const idx = targetIndex + offset;
        if (idx >= sentences.length) break;
        const candidate = sentences[idx].trim();
        if (candidate.length >= 40 && candidate.length <= 160 && !candidate.includes("?")) {
            return candidate;
        }
    }
    const fallback = sentences[targetIndex]?.trim();
    if (fallback && fallback.length >= 20) return fallback;
    return null;
}

/**
 * Scan paragraphs for a consistent Q&A interview pattern.
 * Returns true only when ≥3 consecutive question→answer pairs detected.
 */
function detectQAPattern(paragraphs: string[]): boolean {
    let consecutivePairs = 0;
    for (let i = 0; i < paragraphs.length - 1; i++) {
        const para = paragraphs[i];
        const lines = para.split("\n").map(l => l.trim()).filter(Boolean);

        // Pattern A: single paragraph with question + answer lines
        if (lines.length >= 2 && isQuestion(lines[0])) {
            consecutivePairs++;
            if (consecutivePairs >= 3) return true;
            continue;
        }
        // Pattern B: question paragraph followed by answer paragraph
        if (isQuestion(para) && i + 1 < paragraphs.length && !isQuestion(paragraphs[i + 1])) {
            consecutivePairs++;
            if (consecutivePairs >= 3) return true;
            i++; // skip answer
            continue;
        }
        // Reset on non-QA paragraph
        consecutivePairs = 0;
    }
    return false;
}

/**
 * Parse body text into intro + structured sections.
 * Conservative approach: only creates Q&A structure when confident.
 */
export function parseArticleSections(body: string | null): ParsedArticle {
    if (!body || body.trim().length === 0) {
        return { intro: "", sections: [], pullQuote: null, readTime: "1 min lezen" };
    }

    const readTime = estimateReadTime(body);
    const pullQuote = extractPullQuote(body);

    const paragraphs = body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    if (paragraphs.length === 0) {
        return { intro: body.trim(), sections: [], pullQuote, readTime };
    }

    const intro = paragraphs[0];
    const sections: ArticleSection[] = [];
    const isInterview = detectQAPattern(paragraphs.slice(1));

    let sectionCount = 0;
    let i = 1;
    while (i < paragraphs.length) {
        const para = paragraphs[i];
        const lines = para.split("\n").map(l => l.trim()).filter(Boolean);

        // Q&A: only when interview pattern detected with confidence
        if (isInterview) {
            // Multi-line paragraph: question first line + answer rest
            if (lines.length >= 2 && isQuestion(lines[0])) {
                sectionCount++;
                sections.push({
                    id: `section-${sectionCount}`,
                    title: null,
                    body: lines.slice(1).join(" "),
                    isQA: true,
                    question: lines[0],
                    answer: lines.slice(1).join(" "),
                });
                i++;
                continue;
            }
            // Two paragraphs: question + answer
            if (isQuestion(para) && i + 1 < paragraphs.length) {
                sectionCount++;
                sections.push({
                    id: `section-${sectionCount}`,
                    title: null,
                    body: paragraphs[i + 1],
                    isQA: true,
                    question: para,
                    answer: paragraphs[i + 1],
                });
                i += 2;
                continue;
            }
        }

        // Section heading (strict ALL-CAPS rule)
        if (lines.length >= 2 && isHeading(lines[0])) {
            sectionCount++;
            sections.push({
                id: `section-${sectionCount}`,
                title: lines[0],
                body: lines.slice(1).join("\n"),
            });
            i++;
            continue;
        }

        // Regular paragraph
        sectionCount++;
        sections.push({
            id: `section-${sectionCount}`,
            title: null,
            body: para,
        });
        i++;
    }

    return { intro, sections, pullQuote, readTime };
}
