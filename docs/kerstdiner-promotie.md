# Kerstdiner 2026: promotie

Alles wat buiten de code moet gebeuren om het kerstdiner te promoten, met teksten om te plakken.
De feiten komen uit `src/content/kerstdiner.ts`: do 24 & vr 25 december, kerstmenu €65 p.p.,
wijnarrangement €35 p.p. inclusief champagne bij ontvangst, tafels 17:30–20:00 of vanaf 20:15
(zonder eindtijd). Op die avonden alleen het kerstmenu.

## Links

| Waar | Link |
| --- | --- |
| Drukwerk, QR-code, Instagram-bio | `https://www.tafelaaramersfoort.nl/kerst` (korte link naar de kerstpagina) |
| Google Bedrijfsprofiel | `https://www.tafelaaramersfoort.nl/kerstdiner-amersfoort?utm_source=google&utm_medium=bedrijfsprofiel&utm_campaign=kerst2026` |
| Facebook | `https://www.tafelaaramersfoort.nl/kerstdiner-amersfoort?utm_source=facebook&utm_medium=social&utm_campaign=kerst2026` |
| Instagram-bio | `https://www.tafelaaramersfoort.nl/kerst?utm_source=instagram&utm_medium=social&utm_campaign=kerst2026` |

De `utm_`-stukjes laten in Google Analytics zien via welk kanaal mensen binnenkomen. Ze veranderen
niets aan de pagina.

- QR-code (naar `/kerst`, getest): `docs/kerstdiner-qr.png` (scherm, Word) en `docs/kerstdiner-qr.svg` (drukwerk, blijft scherp).
- Deelbeeld met datums en prijzen (1200×630): `public/pics/kerstdiner-delen.jpg`, online op
  `https://www.tafelaaramersfoort.nl/pics/kerstdiner-delen.jpg`. Ook bruikbaar als foto bij posts.

## Checklist

- [ ] **Google Bedrijfsprofiel: speciale openingstijden** voor 24 en 25 december (en 26 en 31 december
      en 1 januari als die afwijken). Google toont die in Maps en in de zoekresultaten.
- [ ] **Google Bedrijfsprofiel: post** met de tekst hieronder, foto en knop "Meer informatie" of
      "Reserveren" met de Google-link uit de tabel.
- [ ] **Search Console**: URL-inspectie op `https://www.tafelaaramersfoort.nl/kerstdiner-amersfoort`
      → "Indexering aanvragen". Dan staat de pagina meestal binnen een paar dagen in Google.
- [ ] **Instagram**: post (tekst hieronder) + link in bio. Eventueel een story met de linksticker.
- [ ] **Facebook**: zelfde post, met de Facebook-link.
- [ ] **Agenda-artikel** in het admin-paneel (zie hieronder). Vastgepind komt het in de nieuwslijn op `/agenda`.
- [ ] **De Stad Amersfoort**: mail hieronder, vanaf het mailadres van De Tafelaar.
- [ ] **In het restaurant**: QR-code op tafelkaartjes en bonnetjes, en laat het team het noemen bij het afrekenen.
- [ ] **Menu**: zodra het klaar is, toevoegen op de kerstpagina. Dan heeft Google (en AI-zoekmachines) iets concreets om te tonen.

## Google Bedrijfsprofiel: post

> Kerst bij De Tafelaar
>
> Op kerstavond (donderdag 24 december) en eerste kerstdag (vrijdag 25 december) serveren we een speciaal kerstmenu voor €65 p.p. Maak het compleet met ons wijnarrangement voor €35 p.p., inclusief champagne bij ontvangst.
>
> Twee tafels per avond: 17:30–20:00 of vanaf 20:15, zonder eindtijd. Op deze avonden serveren we alleen het kerstmenu.
>
> Kamp 8, Amersfoort centrum. Reserveer op tijd via onze website.

## Instagram

> Kerst aan tafel bij De Tafelaar 🎄
>
> Op kerstavond en eerste kerstdag schuif je bij ons aan voor een speciaal kerstmenu.
>
> 📅 Do 24 & vr 25 december
> 🕠 17:30–20:00 of vanaf 20:15
> 🍽️ Kerstmenu €65 p.p.
> 🥂 Wijnarrangement €35 p.p., incl. champagne bij ontvangst
>
> Reserveer via de link in onze bio.
> 📍 Kamp 8, Amersfoort
>
> #kerstdiner #kerstdineramersfoort #amersfoort #kerstinamersfoort #uiteteninamersfoort #detafelaar

## Facebook

> Kerst aan tafel bij De Tafelaar 🎄
>
> Op kerstavond (do 24 december) en eerste kerstdag (vr 25 december) serveren we een speciaal kerstmenu voor €65 p.p., met een wijnarrangement voor €35 p.p. inclusief champagne bij ontvangst. Twee tafels per avond: 17:30–20:00 of vanaf 20:15.
>
> Reserveer hier: [Facebook-link uit de tabel]

## Agenda-artikel (admin-paneel)

| Veld | Invullen |
| --- | --- |
| Type | Update |
| Categorie | Events |
| Titel | Kerstdiner bij De Tafelaar op 24 & 25 december |
| Foto | het deelbeeld (`kerstdiner-delen.jpg`) of een kerstfoto |
| Bron URL | `https://www.tafelaaramersfoort.nl/kerstdiner-amersfoort` |
| 📌 Vastpinnen | aan |

**Tekst:**

> Op kerstavond, donderdag 24 december, en eerste kerstdag, vrijdag 25 december, serveren we bij De Tafelaar een speciaal kerstmenu voor €65 per persoon. Maak het compleet met ons wijnarrangement voor €35 per persoon, inclusief champagne bij ontvangst.
>
> Er zijn twee tafels per avond: van 17:30 tot 20:00, of vanaf 20:15 zonder eindtijd. Op deze twee avonden serveren we alleen het kerstmenu.
>
> Alle details en reserveren: tafelaaramersfoort.nl/kerst

Bewust **geen** regels als `📅 Datum: ...` in de tekst: die maken van het artikel een tweede
"evenement" voor Google, naast de kerstpagina. Eén plek voor de evenementgegevens werkt beter.

Na kerst: het artikel losmaken (niet meer vastpinnen) of verwijderen.

## Mail aan De Stad Amersfoort

**Onderwerp:** Kerstdiner bij De Tafelaar op de Kamp (24 & 25 december)

> Beste redactie,
>
> Eerder schreven jullie over onze actie Eten met Peter voor de Hersenstichting. Deze keer een tip voor jullie kerstagenda: op kerstavond (donderdag 24 december) en eerste kerstdag (vrijdag 25 december) serveert De Tafelaar op de Kamp een speciaal kerstmenu.
>
> - Kerstmenu: €65 per persoon
> - Wijnarrangement: €35 per persoon, inclusief champagne bij ontvangst
> - Twee tafels per avond: 17:30–20:00 of vanaf 20:15
> - Kamp 8, Amersfoort centrum, op 5 minuten lopen van Theater de Flint
>
> Meer informatie: https://www.tafelaaramersfoort.nl/kerstdiner-amersfoort
>
> Foto's sturen we graag mee. Bel of mail gerust als jullie vragen hebben.
>
> Met vriendelijke groet,
>
> [naam]
> De Tafelaar, Kamp 8, Amersfoort
> +31 6 341 279 32

## Tafelkaartje of bonnetje

> **Kerst bij De Tafelaar**
> Kerstavond & eerste kerstdag · 24 & 25 december
> Kerstmenu €65 p.p. · wijnarrangement €35 p.p. incl. champagne
> Scan en reserveer: tafelaaramersfoort.nl/kerst
> [QR-code]

## Na kerst (gaat vanzelf)

- Vanaf 26 december verdwijnen de balk en het blok op de voorpagina, de links in de footer, op
  `/menu`, `/agenda` en `/openingstijden`, en de pagina uit de sitemap.
- `/kerstdiner-amersfoort` en `/kerst` sturen dan door naar `/agenda`.
- Wel zelf doen: Google-post en vastgepind agenda-artikel opruimen.
