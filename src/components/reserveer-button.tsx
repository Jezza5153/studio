
"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  label?: string;
};

export function ReserveerButton({ label = "Reserveer nu", onClick, ...props }: Props) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        // De window.eventsOpen functie is globaal beschikbaar gemaakt door unified-widgets.tsx
        // Het opent de reserveringswidget (Events booking).
        window.setTimeout(() => {
          window.eventsOpen?.();
        }, 0);
      }}
      type="button"
    >
      {label}
    </Button>
  );
}


