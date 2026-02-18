/**
 * Auto-parse plain body text into structured article sections.
 * No schema changes needed — all structure is derived at render time.
 *
 * Guardrails:
 *   • Q&A only fires when 3+ consecutive question/answer pairs detected
 *   • Headings must be ALL-CAPS, 4-60 chars, no trailing punctuation
 *   • Pull quotes require 4+ sentences in body
 */

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

/**
 * Detect if a line looks like a section heading.
 * Strict rules: ALL-CAPS, 4-60 chars, no trailing period/question/comma.
 */
function isHeading(line: string): boolean {
    const trimmed = line.trim();
    if (trimmed.length < 4 || trimmed.length > 60) return false;
    if (/[.?!,;:]$/.test(trimmed)) return false;
    // Must be ALL-CAPS (with allowed spaces/digits/hyphens)
    if (trimmed !== trimmed.toUpperCase()) return false;
    // Must contain at least 2 letters (avoid "123" or "--")
    if ((trimmed.match(/[A-Z]/g) || []).length < 2) return false;
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
