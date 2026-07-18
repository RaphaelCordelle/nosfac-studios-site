import { z } from "zod";

/**
 * Contact routing model — docs/MASTER_SPECIFICATION.md section 10.1 and 7.8.
 * One adaptive form, one Zod schema, validated identically on client and server
 * (the server re-validates regardless of what the client already checked — section 27.1).
 */

export const ContactReasonSchema = z.enum([
  "bug",
  "support",
  "privacy",
  "idea",
  "feedback",
  "business",
  "creator",
  "press",
  "legal",
  "career",
  "technical",
  "general",
]);
export type ContactReason = z.infer<typeof ContactReasonSchema>;

export const REASON_META: Record<
  ContactReason,
  { label: string; description: string; subjectPrefix: string; gmailLabel: string }
> = {
  bug: {
    label: "Signaler un bug",
    description: "Un problème technique dans un jeu ou une application Nosfac Studios.",
    subjectPrefix: "[BUG]",
    gmailLabel: "Support/Bugs",
  },
  support: {
    label: "Support utilisateur",
    description: "Une question sur un compte, une sauvegarde ou une plateforme.",
    subjectPrefix: "[SUPPORT]",
    gmailLabel: "Support/General",
  },
  privacy: {
    label: "Données personnelles",
    description: "Suppression de certaines données ou du compte complet.",
    subjectPrefix: "[PRIVACY]",
    gmailLabel: "Legal/Privacy",
  },
  idea: {
    label: "Suggérer une idée",
    description: "Une proposition d’amélioration ou de fonctionnalité.",
    subjectPrefix: "[IDEA]",
    gmailLabel: "Product/Ideas",
  },
  feedback: {
    label: "Donner un avis",
    description: "Un retour d’expérience général sur un projet.",
    subjectPrefix: "[FEEDBACK]",
    gmailLabel: "Product/Feedback",
  },
  business: {
    label: "Partenariat commercial",
    description: "Éditeur, plateforme, marque ou prestataire.",
    subjectPrefix: "[BUSINESS]",
    gmailLabel: "Business",
  },
  creator: {
    label: "Créateur de contenu",
    description: "Vidéo, stream ou couverture d’un projet.",
    subjectPrefix: "[CREATOR]",
    gmailLabel: "Press/Creators",
  },
  press: {
    label: "Presse",
    description: "Article, interview ou demande d’assets.",
    subjectPrefix: "[PRESS]",
    gmailLabel: "Press",
  },
  legal: {
    label: "Demande juridique",
    description: "Droit d’auteur, données personnelles ou toute demande formelle.",
    subjectPrefix: "[LEGAL]",
    gmailLabel: "Legal",
  },
  career: {
    label: "Candidature / collaboration",
    description: "Rejoindre ou collaborer avec le studio.",
    subjectPrefix: "[CAREER]",
    gmailLabel: "Career",
  },
  technical: {
    label: "Question technique",
    description: "Architecture, intégration ou question de développement.",
    subjectPrefix: "[TECH]",
    gmailLabel: "Support/Technical",
  },
  general: {
    label: "Autre demande",
    description: "Tout ce qui ne correspond pas aux autres motifs.",
    subjectPrefix: "[GENERAL]",
    gmailLabel: "Inbox",
  },
};

const baseFields = {
  reason: ContactReasonSchema,
  name: z.string().min(1, "Indiquez votre nom.").max(120),
  email: z.string().min(1, "Indiquez une adresse e-mail.").email("Saisissez une adresse e-mail valide."),
  projectSlug: z.string().optional(),
  sourceUrl: z.string().optional(),
  consent: z.literal(true, {
    error: "Vous devez accepter la politique de confidentialité pour envoyer ce message.",
  }),
  // Anti-abuse signals (section 10.3): never the sole protection, always checked server-side.
  honeypot: z.string().max(0, "").optional().default(""),
  formStartedAt: z.number().int().nonnegative(),
  turnstileToken: z.string().min(1, "La vérification de sécurité est requise.").optional(),
};

export const ContactFormSchema = z.object({
  ...baseFields,
  // Bug
  version: z.string().max(60).optional(),
  platform: z.string().max(60).optional(),
  steps: z.string().max(4000).optional(),
  expected: z.string().max(2000).optional(),
  actual: z.string().max(2000).optional(),
  frequency: z.string().max(60).optional(),
  // Support
  accountRef: z.string().max(200).optional(),
  // Idea / feedback
  problem: z.string().max(2000).optional(),
  proposal: z.string().max(2000).optional(),
  benefit: z.string().max(2000).optional(),
  // Business
  organization: z.string().max(200).optional(),
  role: z.string().max(120).optional(),
  timeline: z.string().max(200).optional(),
  budget: z.string().max(200).optional(),
  // Creator / press
  channel: z.string().max(200).optional(),
  link: z.string().max(300).optional(),
  audience: z.string().max(120).optional(),
  need: z.string().max(1000).optional(),
  deadline: z.string().max(120).optional(),
  media: z.string().max(200).optional(),
  angle: z.string().max(1000).optional(),
  assetsNeeded: z.string().max(1000).optional(),
  // Legal
  jurisdiction: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  reference: z.string().max(200).optional(),
  // Career
  profile: z.string().max(200).optional(),
  portfolioLink: z.string().max(300).optional(),
  availability: z.string().max(200).optional(),
  // Technical
  context: z.string().max(4000).optional(),
  environment: z.string().max(500).optional(),
  logs: z.string().max(4000).optional(),
  // General
  message: z.string().max(4000).optional(),
});
export type ContactFormValues = z.infer<typeof ContactFormSchema>;

/** Fields required per reason, beyond the shared base. Drives both UI and server validation. */
export const REQUIRED_FIELDS_BY_REASON: Record<ContactReason, (keyof ContactFormValues)[]> = {
  bug: ["projectSlug", "steps", "expected", "actual"],
  support: ["projectSlug", "platform"],
  privacy: ["projectSlug", "accountRef", "subject", "message"],
  idea: ["problem", "proposal"],
  feedback: ["message"],
  business: ["organization", "role", "proposal"],
  creator: ["channel", "link", "need"],
  press: ["media", "angle", "deadline"],
  legal: ["organization", "jurisdiction", "subject"],
  career: ["profile", "proposal"],
  technical: ["context"],
  general: ["subject", "message"],
};

export const ATTACHMENT_ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
  "text/plain",
] as const;

export const ATTACHMENT_MAX_BYTES = 8 * 1024 * 1024; // 8 MB per file
export const ATTACHMENT_MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20 MB cumulative
export const RATE_LIMIT_MAX_ATTEMPTS = 3;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const MIN_FORM_FILL_MS = 1500; // below this, treat as bot (section 10.3)
