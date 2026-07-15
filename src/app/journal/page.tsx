import type { Metadata } from "next";
import NextLink from "next/link";
import { getPublicArticles } from "@/lib/content/articles";
import { getPublicProjects } from "@/lib/content/projects";
import { ArticleCard } from "@/components/content/article-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { CATEGORY_LABELS, ArticleCategorySchema, type ArticleCategory } from "@/domain/article";

export const metadata: Metadata = {
  title: "Journal",
  description: "Mises à jour, décisions de conception et notes de développement.",
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string; type?: string }>;
}) {
  const { project, type } = await searchParams;
  const activeCategory = ArticleCategorySchema.safeParse(type).success ? (type as ArticleCategory) : undefined;

  const allArticles = getPublicArticles();
  const projects = getPublicProjects();

  const filtered = allArticles.filter((article) => {
    if (project && article.frontmatter.projectSlug !== project) return false;
    if (activeCategory && article.frontmatter.category !== activeCategory) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Journal</h1>
        <p className="mt-4 text-foreground-muted">
          Mises à jour, décisions de conception et notes de développement — sans fréquence promise.
        </p>
      </header>

      {allArticles.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Aucune publication pour le moment."
            description="Les projets restent accessibles."
            action={
              <NextLink
                href="/projects"
                className="flex h-11 items-center rounded-full bg-brand-500 px-5 text-sm font-medium text-white"
              >
                Voir les projets
              </NextLink>
            }
          />
        </div>
      ) : (
        <>
          <nav aria-label="Filtrer le journal" className="mt-8 flex flex-wrap gap-2">
            <FilterChip href="/journal" active={!project && !activeCategory}>
              Tous
            </FilterChip>
            {projects.map((p) => (
              <FilterChip key={p.slug} href={`/journal?project=${p.slug}`} active={project === p.slug}>
                {p.name}
              </FilterChip>
            ))}
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <FilterChip key={key} href={`/journal?type=${key}`} active={activeCategory === key}>
                {label}
              </FilterChip>
            ))}
          </nav>

          <div className="mt-10">
            {filtered.length === 0 ? (
              <EmptyState
                title="Aucun article ne correspond à ces filtres."
                action={<FilterChip href="/journal" active>Réinitialiser</FilterChip>}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((article) => (
                  <ArticleCard key={article.frontmatter.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
