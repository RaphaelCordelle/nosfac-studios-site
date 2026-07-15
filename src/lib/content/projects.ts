import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ProjectSchema, type ProjectFrontmatter } from "@/domain/project";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export interface ProjectContent {
  frontmatter: ProjectFrontmatter;
  /** Raw MDX body (case study / long description), rendered by the page via MDXRemote. */
  source: string;
}

function readProjectFile(filename: string): ProjectContent {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const result = ProjectSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      `Contenu projet invalide dans ${filename}: ${result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")}`,
    );
  }

  return { frontmatter: result.data, source: content };
}

function listProjectFiles(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs.readdirSync(PROJECTS_DIR).filter((file) => file.endsWith(".mdx"));
}

/** Every project whose visibility allows it to appear in production builds. */
export function getPublicProjects(): ProjectFrontmatter[] {
  const isProduction = process.env.NODE_ENV === "production";
  return listProjectFiles()
    .map((file) => readProjectFile(file).frontmatter)
    .filter((project) => (isProduction ? project.visibility === "public" : project.visibility !== "draft"))
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export function getProjectBySlug(slug: string): ProjectContent | null {
  const files = listProjectFiles();
  for (const file of files) {
    const content = readProjectFile(file);
    if (content.frontmatter.slug === slug || content.frontmatter.aliases.includes(slug)) {
      return content;
    }
  }
  return null;
}

export function getFeaturedProject(): ProjectFrontmatter | undefined {
  return getPublicProjects().find((project) => project.featured);
}

export function getAllProjectSlugsForStaticParams(): { slug: string }[] {
  return getPublicProjects().map((project) => ({ slug: project.slug }));
}
