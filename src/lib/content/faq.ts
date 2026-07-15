import fs from "node:fs";
import path from "node:path";
import { FaqEntrySchema, type FaqEntry } from "@/domain/faq";

const FAQ_DIR = path.join(process.cwd(), "content", "faq");

function listFaqFiles(): string[] {
  if (!fs.existsSync(FAQ_DIR)) return [];
  return fs.readdirSync(FAQ_DIR).filter((file) => file.endsWith(".json"));
}

export function getAllFaqEntries(): FaqEntry[] {
  const entries: FaqEntry[] = [];

  for (const file of listFaqFiles()) {
    const raw = fs.readFileSync(path.join(FAQ_DIR, file), "utf-8");
    const parsed: unknown = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : [parsed];

    for (const item of list) {
      const result = FaqEntrySchema.safeParse(item);
      if (!result.success) {
        throw new Error(
          `Entrée FAQ invalide dans ${file}: ${result.error.issues
            .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
            .join("; ")}`,
        );
      }
      entries.push(result.data);
    }
  }

  return entries.filter((entry) => entry.visibility === "public");
}

export function getFaqEntriesForProject(projectSlug: string | undefined): FaqEntry[] {
  const all = getAllFaqEntries();
  if (!projectSlug) return all;
  return all.filter((entry) => !entry.projectSlug || entry.projectSlug === projectSlug);
}
