import type { Vacature } from "@/content/vacatures";
import { contactDetails } from "@/content/site-content";

export const SITE_URL = "https://www.tafelaaramersfoort.nl";

export function mailtoSollicitatie(functie: string) {
  return `mailto:${contactDetails.email}?subject=${encodeURIComponent(`Sollicitatie: ${functie}`)}`;
}

export function telHref() {
  return `tel:${contactDetails.phone.replace(/\s+/g, "")}`;
}

export function datumNl(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

const lijst = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

/** Google for Jobs: alleen op de detailpagina van de vacature, niet op de lijstpagina. */
export function jobPostingJsonLd(v: Vacature) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: v.titel,
    description:
      `<p>${v.intro}</p>` +
      `<p><strong>Wat je doet</strong></p>${lijst(v.doen)}` +
      `<p><strong>Wat we zoeken</strong></p>${lijst(v.zoeken)}` +
      `<p><strong>Wat we bieden</strong></p>${lijst(v.bieden)}` +
      `<p>Uren: ${v.uren}. Dagen: ${v.dagen}. Solliciteren: mail naar ${contactDetails.email} of bel ${contactDetails.phone}.</p>`,
    identifier: { "@type": "PropertyValue", name: "De Tafelaar", value: v.slug },
    datePosted: v.datePosted,
    validThrough: `${v.validThrough}T23:59:59+01:00`,
    employmentType: v.employmentType,
    workHours: `${v.uren}; ${v.dagen}`,
    industry: "Horeca",
    responsibilities: v.doen.join(". "),
    qualifications: v.zoeken.join(". "),
    jobBenefits: v.bieden.join(". "),
    ...(v.zonderErvaring
      ? { experienceRequirements: "no requirements", educationRequirements: "no requirements" }
      : {}),
    directApply: false,
    hiringOrganization: {
      "@type": "Organization",
      name: "De Tafelaar",
      sameAs: SITE_URL,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kamp 8",
        postalCode: "3811 AR",
        addressLocality: "Amersfoort",
        addressRegion: "Utrecht",
        addressCountry: "NL",
      },
    },
    image: `${SITE_URL}${v.afbeelding.src}`,
    url: `${SITE_URL}/vacatures/${v.slug}`,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
