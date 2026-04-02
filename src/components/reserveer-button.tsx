
"use client";

import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

declare global {
  interface Window {
    boekeerlijk?: {
      open: () => void;
      close: () => void;
      isOpen: () => boolean;
    };
  }
}

type Props = ComponentProps<typeof Button> & {
  label?: string;
};

export function ReserveerButton({ label = "Reserveer nu", onClick, ...props }: Props) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        window.boekeerlijk?.open();
      }}
      type="button"
    >
      {label}
    </Button>
  );
}


