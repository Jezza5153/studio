"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Respect prefers-reduced-motion entirely
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mq.matches) return;

        const handleScroll = () => {
            const article = document.querySelector("article");
            if (!article) return;

            const rect = article.getBoundingClientRect();
            const articleTop = window.scrollY + rect.top;
            const articleHeight = rect.height;
            const scrolled = window.scrollY - articleTop;
            const windowHeight = window.innerHeight;

            const pct = Math.min(100, Math.max(0,
                (scrolled / (articleHeight - windowHeight)) * 100
            ));
            setProgress(pct);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (progress <= 0) return null;

    return (
        <div
            // sits under sticky nav, uses CSS var for header height
            className="fixed left-0 z-[55] h-[2px] bg-primary transition-[width] duration-120 ease-out"
            style={{ width: `${progress}%`, top: 'var(--header-h, 4rem)' }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Leesindicator"
        />
    );
}
