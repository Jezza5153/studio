"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CourantMasthead() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const height = useTransform(scrollY, [0, 200], [1, 0.85]);
    const opacity = useTransform(scrollY, [0, 150], [1, 0.9]);

    // Compute date inside the component — never stale in production
    const dateStr = new Date().toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <motion.div
            ref={ref}
            style={{ scaleY: height, opacity }}
            className="relative z-20 origin-top border-b border-foreground/15 bg-background px-4 py-3 text-center sm:py-4"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Top rule line */}
                <div className="mx-auto mb-2 h-[1px] w-24 bg-foreground/20 sm:w-36" />

                {/* Masthead */}
                <h1 className="font-headline text-2xl font-black uppercase tracking-[0.15em] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                    De Tafelaar Courant
                </h1>

                {/* Date + edition line */}
                <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 font-serif text-[10px] uppercase tracking-widest text-muted-foreground/70 sm:gap-3 sm:text-[11px]">
                    <time dateTime={new Date().toISOString().slice(0, 10)}>
                        {dateStr}
                    </time>
                    <span className="hidden sm:inline text-muted-foreground/40">·</span>
                    <span>Editie: De Flint</span>
                    <span className="hidden sm:inline text-muted-foreground/40">·</span>
                    <span>Kamp 8, Amersfoort</span>
                </div>

                {/* Bottom rule line */}
                <div className="mx-auto mt-2 h-[1px] w-36 bg-foreground/15 sm:w-48" />
            </motion.div>
        </motion.div>
    );
}
