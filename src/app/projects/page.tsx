import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { getPublicProjects } from "@/lib/content/projects";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { ProjectTypeSchema, type ProjectType, STATUS_LABELS } from "@/domain/project";

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
      <section className="relative overflow-hidden bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-12 md:px-8 md:pt-20 md:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-[12px] font-medium text-accent-700">
            Catalogue · {allProjects.length} projet{allProjects.length > 1 ? "s" : ""}
          </span>
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-8">
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
        <div className="border-b border-border-subtle bg-surface">
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

      {/* Grid */}
      <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-8 md:py-16">
        {projects.length === 0 ? (
          <EmptyState
            title="Aucun projet ne correspond à ces filtres."
            action={<FilterChip href="/projects" active>Réinitialiser</FilterChip>}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project) => (
              <NextLink
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated card-lift"
                data-testid={`project-card-${project.slug}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream-100">
                  {project.heroMedia?.type === "image" && project.heroMedia.src ? (
                    <Image
                      src={project.heroMedia.src}
                      alt={project.heroMedia.alt}
                      fill
                      className="object-cover transition-transform duration-(--duration-expressive) group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-foreground-subtle text-sm">
                      Aperçu à venir
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-[12px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-2.5 py-0.5 text-foreground-muted">
                      <span
                        className={
                          "size-1.5 rounded-full " +
                          (project.status === "development" || project.status === "public-beta" || project.status === "private-beta"
                            ? "bg-accent-500"
                            : project.status === "released"
                              ? "bg-success-500"
                              : "bg-stone-400")
                        }
                      />
                      {STATUS_LABELS[project.status].label}
                    </span>
                    {project.platforms.length > 0 && (
                      <span className="text-foreground-subtle">
                        · {project.platforms.map((p) => p.label).join(", ")}
                      </span>
                    )}
                  </div>

                  <h2 className="text-[24px] font-semibold tracking-tight leading-tight group-hover:text-accent-600 transition-colors">
                    {project.name}
                    {project.provisionalName && (
                      <span className="ml-2 text-[14px] font-normal text-foreground-subtle">
                        (nom provisoire)
                      </span>
                    )}
                  </h2>

                  <p className="flex-1 text-[15px] leading-[1.6] text-foreground-muted">
                    {project.summary}
                  </p>

                  <span className="mt-2 text-[14px] font-medium text-accent-600">
                    En savoir plus →
                  </span>
                </div>
              </NextLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
