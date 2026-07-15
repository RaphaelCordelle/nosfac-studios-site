import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/content/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { ProjectTypeSchema, type ProjectType } from "@/domain/project";

export const metadata: Metadata = {
  title: "Projets",
  description: "Jeux, applications et expérimentations construits sous Nosfac Studios.",
};

const TYPE_LABELS: Record<ProjectType, string> = {
  game: "Jeux",
  application: "Applications",
  experiment: "Expérimentations",
  tool: "Outils",
};

export default async function ProjectsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = ProjectTypeSchema.safeParse(type).success ? (type as ProjectType) : undefined;

  const allProjects = getPublicProjects();
  const projects = activeType ? allProjects.filter((p) => p.type === activeType) : allProjects;
  const featured = !activeType ? projects.find((p) => p.featured) : undefined;
  const rest = projects.filter((p) => p.slug !== featured?.slug);

  const availableTypes = Array.from(new Set(allProjects.map((p) => p.type)));

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Projets</h1>
        <p className="mt-4 text-foreground-muted">
          Jeux, applications et expérimentations construits sous Nosfac Studios —{" "}
          {allProjects.length} projet{allProjects.length > 1 ? "s" : ""} publié
          {allProjects.length > 1 ? "s" : ""}.
        </p>
      </header>

      {availableTypes.length > 1 ? (
        <nav aria-label="Filtrer les projets" className="mt-8 flex gap-2 overflow-x-auto pb-2">
          <FilterChip href="/projects" active={!activeType}>
            Tous
          </FilterChip>
          {availableTypes.map((t) => (
            <FilterChip key={t} href={`/projects?type=${t}`} active={activeType === t}>
              {TYPE_LABELS[t]}
            </FilterChip>
          ))}
        </nav>
      ) : null}

      <div className="mt-10">
        {projects.length === 0 ? (
          <EmptyState
            title="Aucun projet ne correspond à ces filtres."
            action={<FilterChip href="/projects" active>Réinitialiser</FilterChip>}
          />
        ) : (
          <div className="flex flex-col gap-6">
            {featured ? <ProjectCard project={featured} variant="featured" /> : null}
            <div className="grid gap-6 md:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
