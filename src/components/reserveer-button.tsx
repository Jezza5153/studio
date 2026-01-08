
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
        // Mini delay zodat menu/sheet eerst kan sluiten
        window.setTimeout(() => {
          window.taplaOpen?.();
        }, 0);
      }}
      type="button"
    >
      {label}
    </Button>
  );
}
