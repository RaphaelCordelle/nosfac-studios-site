import { z } from "zod";

export const FaqCategorySchema = z.enum([
  "getting-started",
  "account",
  "saves",
  "purchases",
  "bugs",
  "privacy",
  "platforms",
]);
export type FaqCategory = z.infer<typeof FaqCategorySchema>;

export const CATEGORY_LABELS: Record<FaqCategory, string> = {
  "getting-started": "Démarrage",
  account: "Compte",
  saves: "Sauvegarde",
  purchases: "Achats",
  bugs: "Bugs",
  privacy: "Confidentialité",
  platforms: "Plateformes",
};

export const FaqEntrySchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  category: FaqCategorySchema,
  projectSlug: z.string().optional(),
  updatedAt: z.string().date().optional(),
  visibility: z.enum(["draft", "public"]).default("public"),
});
export type FaqEntry = z.infer<typeof FaqEntrySchema>;
