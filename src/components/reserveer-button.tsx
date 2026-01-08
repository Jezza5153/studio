"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReserveerButton({
  label = "Reserveer nu",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <Button
      type="button"
      className={cn("w-full", className)}
      onClick={() => window.taplaOpen?.()}
    >
      <CalendarDays className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
