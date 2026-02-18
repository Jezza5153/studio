"use client";

import { useRef, useEffect, useState } from "react";
import type { ParsedArticle } from "@/lib/article-utils";

interface ArticleBodyProps {
    article: ParsedArticle;
}

/** Ink-reveal wrapper: fades in section headers when entering viewport */
function InkReveal({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 280ms ease, transform 280ms ease",
            }}
        >
            {children}
        </div>
    );
}

export function ArticleBody({ article }: ArticleBodyProps) {
    const { intro, sections, pullQuote } = article;

    // Insert pull quote ~30% through (only if enough sections)
    const pullQuoteIndex = sections.length >= 3
        ? Math.floor(sections.length * 0.3)
        : -1;

    return (
        <div className="max-w-[70ch] leading-7 text-foreground/90">
            {/* Intro with drop cap */}
            {intro && (
                <p className="mb-6 text-lg leading-[1.8] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[3.5rem] first-letter:font-bold first-letter:leading-none first-letter:text-primary first-letter:font-headline">
                    {intro}
                </p>
            )}

            {sections.map((section, i) => (
                <div key={section.id} id={section.id}>
                    {/* Pull quote insertion point */}
                    {i === pullQuoteIndex && pullQuote && (
                        <blockquote className="my-8 border-l-4 border-primary/60 pl-6 py-2">
                            <p className="text-xl font-headline italic leading-relaxed text-foreground/80">
                                &ldquo;{pullQuote}&rdquo;
                            </p>
                        </blockquote>
                    )}

                    {/* Section heading with ink reveal */}
                    {section.title && (
                        <InkReveal className="mt-8 mb-3">
                            <h2 className="font-headline text-xl font-bold text-foreground">
                                {section.title}
                            </h2>
                        </InkReveal>
                    )}

                    {/* Q&A block — lighter style: left border, no card */}
                    {section.isQA ? (
                        <div className="my-5 border-l-2 border-foreground/10 pl-5 py-1">
                            <p className="text-[15px] font-semibold text-foreground/90 leading-relaxed">
                                {section.question}
                            </p>
                            <p className="mt-2 text-[15px] leading-[1.75] text-foreground/75">
                                {section.answer}
                            </p>
                        </div>
                    ) : (
                        /* Regular paragraph */
                        <p className="mb-5 leading-[1.8]">
                            {section.body}
                        </p>
                    )}
                </div>
            ))}

            {/* Tail-end pull quote */}
            {pullQuoteIndex === -1 && pullQuote && sections.length > 0 && (
                <blockquote className="my-8 border-l-4 border-primary/60 pl-6 py-2">
                    <p className="text-xl font-headline italic leading-relaxed text-foreground/80">
                        &ldquo;{pullQuote}&rdquo;
                    </p>
                </blockquote>
            )}
        </div>
    );
}
