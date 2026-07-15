import type { Metadata } from "next";
import NextLink from "next/link";
import Image from "next/image";
import { getPublicProjects } from "@/lib/content/projects";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { ProjectTypeSchema, type ProjectType, STATUS_LABELS } from "@/domain/project";

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
  const availableTypes = Array.from(new Set(allProjects.map((p) => p.type)));
  const total = allProjects.length;

  return (
    <div>
      {/* Masthead */}
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-[1200px] px-5 pt-10 pb-10 md:px-8 md:pt-14 md:pb-14">
          <div className="flex items-baseline justify-between gap-6 text-[12px] text-foreground-subtle">
            <span>Catalogue</span>
            <span className="tabular">{String(total).padStart(2, "0")} projets</span>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
            <h1 className="md:col-span-7 text-[clamp(2rem,3vw+1rem,3rem)] leading-[1.05] tracking-[-0.02em] font-medium">
              Projets
            </h1>
            <p className="md:col-span-5 text-[15px] leading-[1.6] text-foreground-muted md:pt-3">
              Chaque projet est présenté au stade où il en est. Aucun date de sortie n&apos;est
              affichée avant qu&apos;elle ne soit tenue.
            </p>
          </div>
        </div>
      </section>

      {/* Filters — inline discrets */}
      {availableTypes.length > 1 && (
        <div className="border-b border-border-subtle">
          <nav
            aria-label="Filtrer les projets"
            className="mx-auto flex max-w-[1200px] items-center gap-3 overflow-x-auto px-5 py-3 md:px-8"
          >
            <span className="text-[11px] uppercase tracking-[0.14em] text-foreground-subtle whitespace-nowrap">
              Filtres
            </span>
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

      {/* Grid — full editorial list, no cards. Each project = article. */}
      <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8 md:py-16">
        {projects.length === 0 ? (
          <EmptyState
            title="Aucun projet ne correspond à ces filtres."
            action={<FilterChip href="/projects" active>Réinitialiser</FilterChip>}
          />
        ) : (
          <ol className="divide-y divide-border-subtle">
            {projects.map((project, i) => (
              <li key={project.slug}>
                <NextLink
                  href={`/projects/${project.slug}`}
                  className="group grid gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14"
                >
                  <div className="tabular text-[13px] text-foreground-subtle md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="md:col-span-4">
                    {project.heroMedia?.type === "image" && project.heroMedia.src ? (
                      <div className="relative overflow-hidden bg-surface-elevated">
                        <Image
                          src={project.heroMedia.src}
                          alt={project.heroMedia.alt}
                          width={project.heroMedia.width ?? 800}
                          height={project.heroMedia.height ?? 600}
                          className="h-auto w-full transition-opacity duration-(--duration-standard) group-hover:opacity-90"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-surface-elevated" aria-hidden />
                    )}
                  </div>

                  <div className="md:col-span-7 md:pl-4">
                    <p className="text-[12px] text-foreground-subtle tabular">
                      {STATUS_LABELS[project.status].label}
                      {project.platforms.length > 0 && (
                        <> · {project.platforms.map((p) => p.label).join(", ")}</>
                      )}
                    </p>
                    <h2 className="mt-2 text-[26px] leading-[1.1] tracking-[-0.015em] font-medium md:text-[32px] group-hover:text-accent-600 transition-colors">
                      {project.name}
                      {project.provisionalName && (
                        <span className="ml-2 text-[15px] font-normal text-foreground-subtle">
                          (nom provisoire)
                        </span>
                      )}
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.6] text-foreground-muted max-w-lg">
                      {project.summary}
                    </p>
                    <span className="mt-4 inline-flex items-baseline gap-1.5 text-[14px] font-medium link-underline">
                      Fiche projet
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </NextLink>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
