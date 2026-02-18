"use client";

import { useEffect, useState, useRef } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Respect prefers-reduced-motion
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
            className="fixed top-0 left-0 z-[60] h-[2px] bg-primary/80 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Leesindicator"
        />
    );
}
