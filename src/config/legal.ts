/**
 * Centralized legal configuration — all legal information in ONE place.
 * Never hardcode legal details in components. Every field is typed and validated.
 * 
 * CRITICAL: Update this file when legal status changes. All legal pages read from here.
 * See docs/LEGAL_BLOCKERS.md for fields that MUST be provided before commercial launch.
 */

export type LegalStatus = "individual-non-professional" | "sole-trader" | "company";

/**
 * Choose the correct status:
 * - "individual-non-professional": No registered business, personal project
 * - "sole-trader": Registered as entrepreneur individuel / micro-entrepreneur
 * - "company": Registered company (SARL, SAS, etc.)
 */
export const LEGAL_STATUS: LegalStatus = "individual-non-professional";

/** Public brand name (NOT a legal entity name unless it is) */
export const PUBLIC_BRAND_NAME = "Nosfac Studios";

/** Legal identity - ONLY fill what is true and verified */
export const LEGAL_IDENTITY = {
  /** Full legal name of the individual or company */
  legalName: null as string | null,
  
  /** Trading name if different from legal name */
  tradingName: null as string | null,
  
  /** Legal form (e.g., "SARL", "SAS", "Entrepreneur individuel") - ONLY if registered */
  legalForm: null as string | null,
  
  /** Postal address (required for registered businesses) */
  postalAddress: null as string | null,
  
  /** SIREN number (France) */
  siren: null as string | null,
  
  /** SIRET number (France) */
  siret: null as string | null,
  
  /** RNE registration (Registre national des entreprises) */
  rneRegistration: null as string | null,
  
  /** RCS registration (Registre du Commerce et des Sociétés) */
  rcsRegistration: null as string | null,
  
  /** VAT number (only if applicable) */
  vatNumber: null as string | null,
  
  /** Publication director (directeur de la publication) */
  publicationDirector: null as string | null,
  
  /** Professional phone (only if must be displayed) */
  phone: null as string | null,
} as const;

/** Contact information */
export const CONTACT = {
  /** Primary contact email */
  email: "nosfac.studios@gmail.com",
  
  /** Website URL (production) */
  websiteUrl: "https://nosfacstudios.com",
} as const;

/** Hosting provider */
export const HOSTING = {
  provider: "Vercel Inc.",
  address: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
  /** Leave null if not legally required or not easily available */
  phone: null as string | null,
} as const;

/** Important legal URLs */
export const LEGAL_URLS = {
  privacy: "/legal/privacy",
  legalNotice: "/legal/legal-notice",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  accountDeletion: "/suppression-compte",
} as const;

/** Last update dates - UPDATE THESE when you modify legal pages */
export const LAST_UPDATED = {
  legalNotice: "2026-07-13",
  privacy: "2026-07-15",
  terms: "2026-07-15",
  cookies: "2026-07-13",
  accountDeletion: "2026-07-15",
} as const;

/** Data retention periods - ONLY use verified, implemented durations */
export const RETENTION_PERIODS = {
  /** Contact form messages */
  contactMessages: "12 mois maximum, réévalué régulièrement selon la demande",
  
  /** Contact form attachments (if implemented) */
  contactAttachments: "Non implémenté actuellement",
  
  /** Chain user accounts - as long as account exists */
  chainAccounts: "Tant que le compte existe",
  
  /** Chain account data after deletion */
  chainAccountAfterDeletion: "Suppression immédiate des données personnelles ; certaines données anonymisées ou requises légalement peuvent subsister temporairement",
  
  /** Technical logs (Supabase, Vercel) */
  technicalLogs: "Selon la politique du prestataire (Supabase gratuit : 7 jours ; Vercel : varie selon l'offre)",
  
  /** Rate limiting records (IP hashes) */
  rateLimitRecords: "Conservés en mémoire uniquement pendant la durée de la limitation (15 minutes maximum)",
} as const;

/** External service processors */
export const PROCESSORS = {
  /** Email sending */
  email: {
    name: "Resend",
    purpose: "Envoi des messages du formulaire de contact",
    active: true,
  },
  
  /** Anti-bot protection */
  antiBot: {
    name: "Cloudflare Turnstile",
    purpose: "Protection anti-spam du formulaire de contact",
    active: true,
  },
  
  /** Hosting */
  hosting: {
    name: "Vercel Inc.",
    purpose: "Hébergement du site web",
    active: true,
  },
  
  /** Chain backend */
  chainBackend: {
    name: "Supabase",
    purpose: "Authentification et base de données de Chain",
    active: true,
  },
  
  /** Chain payments */
  chainPayments: {
    name: "Google Play Billing",
    purpose: "Traitement des achats intégrés dans Chain",
    active: true,
  },
  
  /** Chain attribution */
  chainAttribution: {
    name: "Google Play Install Referrer",
    purpose: "Mesure de l'origine d'installation (liens de parrainage)",
    active: true,
  },
  
  /** Error monitoring (optional) */
  errorMonitoring: {
    name: "Sentry",
    purpose: "Surveillance des erreurs et performances",
    active: false, // Not currently implemented
  },
} as const;

/** Age restrictions and minors policy */
export const AGE_POLICY = {
  /** Minimum recommended age - MUST align with Play Store classification */
  minimumAge: null as number | null,
  
  /** Policy description */
  description: "À définir en cohérence avec la classification IARC et le public cible déclaré dans la Play Console",
} as const;

/**
 * Validation helper - checks if required fields for current status are filled
 * This is used by the validation script
 */
export function validateLegalConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  if (LEGAL_STATUS === "sole-trader" || LEGAL_STATUS === "company") {
    if (!LEGAL_IDENTITY.legalName) missing.push("LEGAL_IDENTITY.legalName");
    if (!LEGAL_IDENTITY.postalAddress) missing.push("LEGAL_IDENTITY.postalAddress");
    if (!LEGAL_IDENTITY.siren) missing.push("LEGAL_IDENTITY.siren");
    if (!LEGAL_IDENTITY.siret) missing.push("LEGAL_IDENTITY.siret");
    if (!LEGAL_IDENTITY.publicationDirector) missing.push("LEGAL_IDENTITY.publicationDirector");
  }
  
  if (LEGAL_STATUS === "company") {
    if (!LEGAL_IDENTITY.legalForm) missing.push("LEGAL_IDENTITY.legalForm");
    if (!LEGAL_IDENTITY.rcsRegistration) missing.push("LEGAL_IDENTITY.rcsRegistration");
  }
  
  return {
    valid: missing.length === 0,
    missing,
  };
}
