/**
 * Auto-parse plain body text into structured article sections.
 * No schema changes needed — all structure is derived at render time.
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

/** Detect if a line looks like a question (ends with ?, starts with Q-word, etc.) */
function isQuestion(line: string): boolean {
    const trimmed = line.trim();
    if (trimmed.endsWith("?")) return true;
    if (/^(wat|wie|waar|wanneer|waarom|hoe|welk|is|kun|kan|mag|moet|hebben|heeft|was|wordt|do|did|what|who|where|when|why|how|which|are|is|can|could|would|should)\b/i.test(trimmed)) return true;
    return false;
}

/** Detect if a line looks like a section heading */
function isHeading(line: string): boolean {
    const trimmed = line.trim();
    // Short line (< 80 chars), no period at end, not a question
    if (trimmed.length > 80) return false;
    if (trimmed.endsWith(".")) return false;
    if (trimmed.endsWith("?")) return false;
    // All caps or Title Case (rough heuristic)
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && trimmed.length < 60) return true;
    return false;
}

/** Pick a pull quote — a compelling sentence around the 30% mark */
function extractPullQuote(body: string): string | null {
    const sentences = body.match(/[^.!?]+[.!?]+/g);
    if (!sentences || sentences.length < 4) return null;

    // Target ~30% through the text
    const targetIndex = Math.floor(sentences.length * 0.3);
    // Look for a "good" quote in a window around the target
    for (let offset = 0; offset < 3; offset++) {
        const idx = targetIndex + offset;
        if (idx >= sentences.length) break;
        const candidate = sentences[idx].trim();
        // Good quotes: 40-160 chars, no question marks, has some substance
        if (candidate.length >= 40 && candidate.length <= 160 && !candidate.includes("?")) {
            return candidate;
        }
    }
    // Fallback: just use the target
    const fallback = sentences[targetIndex]?.trim();
    if (fallback && fallback.length >= 20) return fallback;
    return null;
}

/**
 * Parse body text into intro + structured sections.
 * Splits on double newlines, detects Q&A patterns, inserts section headers.
 */
export function parseArticleSections(body: string | null): ParsedArticle {
    if (!body || body.trim().length === 0) {
        return { intro: "", sections: [], pullQuote: null, readTime: "1 min lezen" };
    }

    const readTime = estimateReadTime(body);
    const pullQuote = extractPullQuote(body);

    // Split by double newlines (paragraph breaks)
    const paragraphs = body.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

    if (paragraphs.length === 0) {
        return { intro: body.trim(), sections: [], pullQuote, readTime };
    }

    // First paragraph is always the intro
    const intro = paragraphs[0];
    const sections: ArticleSection[] = [];

    let sectionCount = 0;
    let i = 1;
    while (i < paragraphs.length) {
        const para = paragraphs[i];
        const lines = para.split("\n").map(l => l.trim()).filter(Boolean);

        // Check for Q&A pattern: question line followed by answer
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

        // Check if first line is a heading
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

        // Check consecutive paragraphs: question paragraph + answer paragraph
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

        // Regular paragraph section
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
