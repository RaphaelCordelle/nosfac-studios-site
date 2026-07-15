import { z } from "zod";

/**
 * Shared primitives used across the content domain (projects, articles, press kit).
 * These schemas are the single source of truth for what a valid content entry looks like;
 * `scripts/validate-content.ts` runs them against every file in `content/` before a build
 * is considered publishable (see docs/MASTER_SPECIFICATION.md section 12).
 */

export const MediaTypeSchema = z.enum(["image", "video", "placeholder"]);
export type MediaType = z.infer<typeof MediaTypeSchema>;

export const MediaSchema = z.object({
  type: MediaTypeSchema,
  src: z.string().min(1).optional(),
  poster: z.string().min(1).optional(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  rightsOwner: z.string().optional(),
  rightsSource: z.string().optional(),
});
export type Media = z.infer<typeof MediaSchema>;

export const PlatformIdSchema = z.enum([
  "ios",
  "android",
  "web",
  "windows",
  "macos",
  "linux",
  "steam",
  "playstation",
  "xbox",
  "nintendo-switch",
]);
export type PlatformId = z.infer<typeof PlatformIdSchema>;

export const PlatformSchema = z.object({
  id: PlatformIdSchema,
  label: z.string().min(1),
  confirmed: z.boolean().default(false),
  href: z.string().url().optional(),
});
export type Platform = z.infer<typeof PlatformSchema>;

export const AccentSchema = z.object({
  /** CSS color value derived from the project's own assets; the brand nav/footer stay dominant. */
  hex: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "L'accent doit être une couleur hexadécimale à 6 chiffres"),
  name: z.string().min(1),
});
export type Accent = z.infer<typeof AccentSchema>;

export const SeoSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(160),
  ogImage: z.string().optional(),
  noindex: z.boolean().default(false),
});
export type Seo = z.infer<typeof SeoSchema>;

/** A field whose real value is not confirmed yet. Rendered as an explicit, visible placeholder — never invented. */
export interface Placeholder {
  readonly isPlaceholder: true;
  readonly reason: string;
}

export function isPlaceholder(value: unknown): value is Placeholder {
  return (
    typeof value === "object" &&
    value !== null &&
    "isPlaceholder" in value &&
    (value as Placeholder).isPlaceholder === true
  );
}
