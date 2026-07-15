/**
 * Site-wide constants. Centralized so no component hardcodes brand copy or the
 * contact address — docs/MASTER_SPECIFICATION.md sections 2.4 and 10.1.
 */
export const SITE = {
  name: "Nosfac Studios",
  tagline: "Studio indépendant de jeux et logiciels",
  headline: "Nous construisons des expériences simples à comprendre, difficiles à oublier.",
  description:
    "Nosfac Studios développe des jeux et applications avec une attention particulière portée au rythme, à la clarté et à la qualité d’exécution.",
  contactEmail: "nosfac.studios@gmail.com",
  url: process.env.SITE_URL ?? "http://localhost:3000",
  originStory:
    "Nosfac est un surnom devenu un nom de studio - un rappel discret des personnes qui ont accompagné les premiers projets.",
} as const;

/** Legal identity is not yet established. Every field here is an explicit, typed placeholder — never rendered as fact. */
export const LEGAL_PLACEHOLDERS = {
  legalForm: null as string | null,
  registrationNumber: null as string | null,
  postalAddress: null as string | null,
  publicationDirector: null as string | null,
  hostingProvider: "Vercel Inc. (hébergement de production prévu — à confirmer avant lancement commercial)",
} as const;
