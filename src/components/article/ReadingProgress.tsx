"use client";

import { useEffect, useState, useRef } from "react";

export function ReadingProgress() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

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

            // Show/hide based on scroll direction
            const currentY = window.scrollY;
            setVisible(currentY <= lastScrollY.current || currentY < 100);
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (progress <= 0) return null;

    return (
        <div
            // #11: Thicker progress bar (3px) for visibility
            className="fixed left-0 z-[55] h-[3px] bg-primary transition-all duration-150 ease-out"
            style={{
                width: `${progress}%`,
                top: 'var(--header-h, 4rem)',
                opacity: visible ? 1 : 0,
            }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Leesindicator"
        />
    );
}
