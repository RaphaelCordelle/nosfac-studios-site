import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/content/projects";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { ProjectTypeSchema, type ProjectType } from "@/domain/project";
import { ProjectsList } from "@/components/motion/projects-list";

export const metadata: Metadata = {
  title: "Projets",
  description: "Jeux et projets développés par Nosfac Studios.",
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
  const availableTypes = Array.from(new Set(allProjects.map((p) => p.type)));

  return (
    <div>
      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-10 md:px-8 md:pt-24 md:pb-16">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-accent-600">
            Catalogue · {allProjects.length} projet{allProjects.length > 1 ? "s" : ""}
          </p>
          <div className="mt-3 grid gap-6 md:grid-cols-12 md:gap-10">
            <h1 className="md:col-span-7 text-[clamp(2rem,3vw+1rem,3rem)] leading-[1.05] tracking-[-0.02em] font-semibold">
              Ce que nous construisons
            </h1>
            <p className="md:col-span-5 md:pt-3 text-[16px] leading-[1.65] text-foreground-muted">
              Chaque projet est présenté au stade où il en est. Aucune date de sortie n&apos;est
              affichée avant qu&apos;elle ne soit tenue.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      {availableTypes.length > 1 && (
        <div className="border-t border-border-subtle">
          <nav
            aria-label="Filtrer les projets"
            className="mx-auto flex max-w-[1200px] items-center gap-2 overflow-x-auto px-5 py-4 md:px-8"
          >
            <FilterChip href="/projects" active={!activeType}>
              Tous · {allProjects.length}
            </FilterChip>
            {availableTypes.map((t) => {
              const count = allProjects.filter((p) => p.type === t).length;
              return (
                <FilterChip key={t} href={`/projects?type=${t}`} active={activeType === t}>
                  {TYPE_LABELS[t]} · {count}
                </FilterChip>
              );
            })}
          </nav>
        </div>
      )}

      {/* Editorial list */}
      <section>
        <div className="mx-auto max-w-[1200px] px-5 pb-16 md:px-8 md:pb-24">
          {projects.length === 0 ? (
            <EmptyState
              title="Aucun projet ne correspond à ces filtres."
              action={<FilterChip href="/projects" active>Réinitialiser</FilterChip>}
            />
          ) : (
            <ProjectsList projects={projects} />
          )}
        </div>
      </section>
    </div>
  );
}
