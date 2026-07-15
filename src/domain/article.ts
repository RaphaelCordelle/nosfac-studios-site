import { z } from "zod";
import { MediaSchema, SeoSchema } from "./media";

export const ArticleCategorySchema = z.enum(["announcement", "devlog", "patch-notes", "editorial"]);
export type ArticleCategory = z.infer<typeof ArticleCategorySchema>;

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  announcement: "Annonce",
  devlog: "Journal de développement",
  "patch-notes": "Notes de mise à jour",
  editorial: "Article de fond",
};

export const ArticleFrontmatterSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1).max(220),
  category: ArticleCategorySchema,
  projectSlug: z.string().optional(),
  author: z.string().default("Nosfac Studios"),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  updateReason: z.string().optional(),
  tags: z.array(z.string()).max(6).default([]),
  cover: MediaSchema.optional(),
  seo: SeoSchema,
  visibility: z.enum(["draft", "unlisted", "public"]),
  featured: z.boolean().default(false),
});
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;
