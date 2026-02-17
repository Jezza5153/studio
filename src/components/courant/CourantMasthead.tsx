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
            className="relative z-20 origin-top border-b-2 border-foreground/20 bg-background px-4 py-4 text-center sm:py-6"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Top rule line */}
                <div className="mx-auto mb-3 h-[2px] w-32 bg-foreground/30 sm:w-48" />

                {/* Masthead */}
                <h1 className="font-headline text-3xl font-black uppercase tracking-[0.15em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                    De Tafelaar Courant
                </h1>

                {/* Date + edition line */}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-2 font-serif text-[11px] uppercase tracking-widest text-muted-foreground sm:gap-4 sm:text-xs">
                    <time dateTime={new Date().toISOString().slice(0, 10)}>
                        {dateStr}
                    </time>
                    <span className="hidden sm:inline">·</span>
                    <span>Editie: De Flint</span>
                    <span className="hidden sm:inline">·</span>
                    <span>Kamp 8, Amersfoort</span>
                </div>

                {/* Bottom rule line */}
                <div className="mx-auto mt-3 h-[1px] w-48 bg-foreground/20 sm:w-64" />
            </motion.div>
        </motion.div>
    );
}
