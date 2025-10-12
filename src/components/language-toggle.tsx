"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useState } from "react";
import { DutchFlag, BritishFlag } from "./icons";

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("NL");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          {currentLang === "NL" ? <DutchFlag className="h-4 w-4" /> : <BritishFlag className="h-4 w-4" />}
          {currentLang}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCurrentLang("NL")} className="gap-2">
          <DutchFlag className="h-4 w-4" />
          <span>Nederlands</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrentLang("EN")} className="gap-2">
          <BritishFlag className="h-4 w-4" />
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
