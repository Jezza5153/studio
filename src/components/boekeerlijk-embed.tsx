"use client";

import { useEffect } from "react";

const SRC = "https://www.boekeerlijk.nl/embed.js";

/**
 * Laadt de BoekEerlijk-reserveerknop (embed.js) na de hydratatie, net als
 * next/script met strategy="afterInteractive". Het verschil: next/script zet dan ook een
 * <link rel="preload" as="script"> in de <head>, waardoor de browser meteen een
 * verbinding met boekeerlijk.nl opent en het script met hoge prioriteit ophaalt, tegelijk
 * met de hero-foto. Lighthouse rekent zo'n preload als render-blocking. Hier start het
 * ophalen pas na de hydratatie, de knop werkt dus een fractie later dan met preload maar
 * nog steeds direct na het laden van de pagina.
 * embed.js leest data-restaurant-id via document.currentScript, dat werkt ook voor een
 * dynamisch toegevoegd script.
 */
export function BoekEerlijkEmbed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.setAttribute("data-restaurant-id", "de-tafelaar-30fcc6");
    document.body.appendChild(script);
  }, []);

  return null;
}
