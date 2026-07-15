import type { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/content/projects";
import { getPublicArticles } from "@/lib/content/articles";
import { SITE } from "@/config/site";

/** Generated from published content only — docs/MASTER_SPECIFICATION.md section 13.1. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/projects", "/about", "/support/faq", "/support/contact", "/press"].map(
    (path) => ({ url: `${SITE.url}${path}`, lastModified: new Date() }),
  );

  const projectRoutes = getPublicProjects().map((project) => ({
    url: `${SITE.url}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
  }));

  const articleRoutes = getPublicArticles().map((article) => ({
    url: `${SITE.url}/journal/${article.frontmatter.slug}`,
    lastModified: new Date(article.frontmatter.updatedAt ?? article.frontmatter.publishedAt),
  }));

  const journalIndex = articleRoutes.length > 0 ? [{ url: `${SITE.url}/journal`, lastModified: new Date() }] : [];

  return [...staticRoutes, ...journalIndex, ...projectRoutes, ...articleRoutes];
}
