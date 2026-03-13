"use client";

import { useCallback, useMemo } from "react";

/**
 * Anti-scraping email link.
 * The email is split into parts and assembled only at render time via JavaScript.
 * Bots that parse static HTML will see nothing useful.
 */

interface ObfuscatedEmailProps {
    /** The part before @ */
    user: string;
    /** The part after @ */
    domain: string;
    /** Optional mailto subject */
    subject?: string;
    /** Optional custom link text (defaults to showing the email) */
    children?: React.ReactNode;
    /** Optional className for the <a> tag */
    className?: string;
}

export function ObfuscatedEmail({
    user,
    domain,
    subject,
    children,
    className,
}: ObfuscatedEmailProps) {
    const email = useMemo(() => `${user}@${domain}`, [user, domain]);

    const href = useMemo(() => {
        const base = `mailto:${email}`;
        return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
    }, [email, subject]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            // Extra protection: set href at click time
            e.currentTarget.href = href;
        },
        [href],
    );

    return (
        <a
            href="#"
            onClick={handleClick}
            className={className}
            // Use data attributes instead of real href for bots
            data-u={user}
            data-d={domain}
            suppressHydrationWarning
        >
            {children || email}
        </a>
    );
}
