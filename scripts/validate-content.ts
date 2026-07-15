/**
 * Content validation gate — docs/MASTER_SPECIFICATION.md section 12.2 and 15.3.
 * Runs every content file through its Zod schema and enforces cross-file invariants
 * (unique slugs, no alias collisions). Exits non-zero on any failure so CI blocks the build.
 */
import { getPublicProjects } from "../src/lib/content/projects";
import { getPublicArticles } from "../src/lib/content/articles";
import { getAllFaqEntries } from "../src/lib/content/faq";

function fail(message: string): never {
  console.error(`❌  ${message}`);
  process.exitCode = 1;
  return process.exit(1);
}

function main() {
  const errors: string[] = [];

  let projects: ReturnType<typeof getPublicProjects> = [];
  try {
    projects = getPublicProjects();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }

  const slugs = new Set<string>();
  for (const project of projects) {
    if (slugs.has(project.slug)) errors.push(`Slug de projet dupliqué: ${project.slug}`);
    slugs.add(project.slug);
    for (const alias of project.aliases) {
      if (slugs.has(alias)) errors.push(`Alias en collision avec un slug existant: ${alias}`);
    }
  }

  try {
    getPublicArticles();
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  try {
    getAllFaqEntries();
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`❌  ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`✅  Contenu valide — ${projects.length} projet(s) public(s).`);
}

main();
