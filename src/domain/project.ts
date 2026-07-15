import { z } from "zod";
import { AccentSchema, MediaSchema, PlatformSchema, SeoSchema } from "./media";

/**
 * Canonical project schema — docs/MASTER_SPECIFICATION.md section 12.1.
 * Adding a project means adding a content file that satisfies this schema;
 * no component may hardcode a project name, slug, or copy string.
 */

export const ProjectTypeSchema = z.enum(["game", "application", "experiment", "tool"]);
export type ProjectType = z.infer<typeof ProjectTypeSchema>;

export const ProjectStatusSchema = z.enum([
  "concept",
  "development",
  "private-beta",
  "public-beta",
  "released",
  "paused",
  "archived",
]);
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;

export const ProjectLinkTypeSchema = z.enum([
  "store",
  "website",
  "repository",
  "video",
  "social",
  "other",
]);

export const ProjectLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
  type: ProjectLinkTypeSchema,
  platform: PlatformIdRef(),
  active: z.boolean().default(true),
});
export type ProjectLink = z.infer<typeof ProjectLinkSchema>;

// Local helper kept close to usage: a link's platform reference is optional and
// intentionally looser than PlatformSchema (it may reference a platform not yet listed).
function PlatformIdRef() {
  return z.string().optional();
}

export const FeatureSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
export type Feature = z.infer<typeof FeatureSchema>;

export const ProjectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  aliases: z.array(z.string()).default([]),
  name: z.string().min(1),
  provisionalName: z.boolean().default(false),
  type: ProjectTypeSchema,
  status: ProjectStatusSchema,
  featured: z.boolean().default(false),
  summary: z.string().max(180),
  role: z.array(z.string()).default([]),
  platforms: z.array(PlatformSchema).default([]),
  technologies: z.array(z.string()).default([]),
  startedAt: z.string().date().optional(),
  releasedAt: z.string().date().optional(),
  updatedAt: z.string().datetime(),
  accent: AccentSchema,
  heroMedia: MediaSchema.optional(),
  gallery: z.array(MediaSchema).default([]),
  features: z.array(FeatureSchema).default([]),
  links: z.array(ProjectLinkSchema).default([]),
  faqIds: z.array(z.string()).default([]),
  seo: SeoSchema,
  visibility: z.enum(["draft", "unlisted", "public"]),
});
export type ProjectFrontmatter = z.infer<typeof ProjectSchema>;

export const STATUS_LABELS: Record<ProjectStatus, { label: string; description: string }> = {
  concept: { label: "Concept", description: "Exploration initiale ; contenu susceptible d’évoluer." },
  development: { label: "En développement", description: "Production active, aucune date implicite." },
  "private-beta": { label: "Bêta privée", description: "Accès limité sur invitation." },
  "public-beta": { label: "Bêta publique", description: "Disponible pour test ; changements possibles." },
  released: { label: "Disponible", description: "Version publique accessible." },
  paused: { label: "En pause", description: "Développement temporairement suspendu." },
  archived: { label: "Archivé", description: "Projet conservé pour référence, non maintenu." },
};
