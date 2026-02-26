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
                    {/* Pull quote insertion point — #10: stronger styling */}
                    {i === pullQuoteIndex && pullQuote && (
                        <blockquote className="my-10 border-l-[3px] border-primary pl-6 py-3 relative">
                            <span className="absolute -left-1 -top-4 text-5xl text-primary/20 font-headline leading-none select-none" aria-hidden="true">&ldquo;</span>
                            <p className="text-xl font-headline italic leading-relaxed text-foreground/85">
                                {pullQuote}
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

                    {/* #4: Q&A block — distinct styling for Q vs A */}
                    {section.isQA ? (
                        <div className="my-5 rounded-lg border border-foreground/[0.06] bg-foreground/[0.02] overflow-hidden">
                            {/* Question */}
                            <div className="flex items-start gap-3 px-5 py-3 border-b border-foreground/[0.06] bg-foreground/[0.03]">
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">V</span>
                                <p className="text-[15px] font-semibold text-foreground leading-relaxed">
                                    {section.question}
                                </p>
                            </div>
                            {/* Answer */}
                            <div className="flex items-start gap-3 px-5 py-3">
                                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-foreground/10 text-[10px] font-bold text-foreground/60">A</span>
                                <p className="text-[15px] leading-[1.8] text-foreground/80">
                                    {section.answer}
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Regular paragraph */
                        <p className="mb-5 leading-[1.8]">
                            {section.body}
                        </p>
                    )}
                </div>
            ))}

            {/* Tail-end pull quote — #10: stronger styling */}
            {pullQuoteIndex === -1 && pullQuote && sections.length > 0 && (
                <blockquote className="my-10 border-l-[3px] border-primary pl-6 py-3 relative">
                    <span className="absolute -left-1 -top-4 text-5xl text-primary/20 font-headline leading-none select-none" aria-hidden="true">&ldquo;</span>
                    <p className="text-xl font-headline italic leading-relaxed text-foreground/85">
                        {pullQuote}
                    </p>
                </blockquote>
            )}
        </div>
    );
}
