# Contactformulier (Resend)

Het formulier op /contact#bericht verstuurt berichten via [Resend](https://resend.com) naar de mailbox van het restaurant. Het staat pas op de site als `RESEND_API_KEY` in Vercel staat; tot die tijd blijft de oude "Mail ons"-knop staan.

## Aanzetten

1. Maak een Resend-account. Tip: gebruik reserveren@tafelaaramersfoort.nl, dan werkt het formulier meteen (zie stap 4).
2. Resend: **API Keys > Create API key**, rechten "Sending access". Kopieer de sleutel (begint met `re_`).
3. Vercel: project `studio` > **Settings > Environment Variables** > `RESEND_API_KEY` = de sleutel, alleen **Production**. Daarna een nieuwe deploy (Deployments > ... > Redeploy), anders ziet de site de sleutel niet.
4. Afzender:
   - Zonder domeinverificatie verstuurt het formulier vanaf `onboarding@resend.dev`. Resend levert dat alleen af bij het e-mailadres van het Resend-account. Zet dan `CONTACT_TO_EMAIL` op dat adres als het niet reserveren@tafelaaramersfoort.nl is.
   - Beter: Resend > **Domains > Add domain** > `tafelaaramersfoort.nl`, zet de DNS-records die Resend toont bij Strato (DKIM-TXT op `resend._domainkey`, MX en TXT op `send`), wacht op "Verified" en zet `CONTACT_FROM_EMAIL` = `De Tafelaar website <website@tafelaaramersfoort.nl>`. Het bestaande SPF-record op het hoofddomein en de MX van Strato blijven gewoon staan.

## Variabelen

| Naam | Verplicht | Standaard |
| --- | --- | --- |
| `RESEND_API_KEY` | ja | geen, formulier staat uit |
| `CONTACT_TO_EMAIL` | nee | reserveren@tafelaaramersfoort.nl |
| `CONTACT_FROM_EMAIL` | nee | De Tafelaar website <onboarding@resend.dev> |

## Spam

- Geen e-mailadres in de HTML van het formulier.
- Verborgen veld `website` (bots vullen het in) en een minimale invultijd van 3 seconden: zulke berichten krijgen "gelukt" terug maar worden niet verstuurd.
- Maximaal 5 berichten per IP-adres per uur, en berichten met meer dan 2 links worden geweigerd.
- Antwoorden gaat via "Beantwoorden": de mail heeft reply-to op het adres van de gast.
