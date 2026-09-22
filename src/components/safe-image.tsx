"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Afbeelding uit de database (Instagram via Behold, uploads). Gaat niet door de
 * Vercel-optimizer (die weigert een deel van de Behold-urls) en toont bij een
 * dode url een rustig zandvlak in plaats van een kapotte tegel.
 */
export function SafeImage({ className, alt, ...props }: ImageProps) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-secondary text-foreground/40",
          props.fill && "absolute inset-0",
          className,
        )}
      >
        <Instagram className="h-6 w-6" aria-hidden />
      </div>
    );
  }

  return <Image {...props} alt={alt} className={className} unoptimized onError={() => setBroken(true)} />;
}
