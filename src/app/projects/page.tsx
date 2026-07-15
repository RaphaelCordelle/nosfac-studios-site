import type { Metadata } from "next";
import { getPublicProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/content/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterChip } from "@/components/ui/filter-chip";
import { ProjectTypeSchema, type ProjectType } from "@/domain/project";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedHeading } from "@/components/motion/animated-heading";

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
  const total = allProjects.length;

  return (
    <div className="relative">
      {/* Hero header */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-[-8%] h-[500px] w-[500px] rounded-full bg-accent-500/8 blur-[110px]"
        />
        <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 md:px-8 md:pt-24 md:pb-14">
          <div className="mb-8 flex items-center gap-2 font-mono text-[11px] tracking-wider text-foreground-subtle uppercase md:mb-12">
            <span>Catalogue</span>
            <span className="text-foreground-subtle/40" aria-hidden>·</span>
            <span>{String(total).padStart(2, "0")} projet{total > 1 ? "s" : ""} publié{total > 1 ? "s" : ""}</span>
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <AnimatedHeading
                as="h1"
                className="text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
              >
                Ce que nous
              </AnimatedHeading>
              <h1
                aria-hidden
                className="mt-1 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em]"
              >
                <span className="font-display italic text-accent-500">construisons</span>.
              </h1>
            </div>
            <div className="md:col-span-4">
              <p className="max-w-md text-base leading-relaxed text-foreground-muted md:text-lg">
                Jeux, applications et expérimentations. Chaque projet a sa propre ambiance ; tous
                partagent la même exigence d&apos;exécution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
          {availableTypes.length > 1 ? (
            <nav
              aria-label="Filtrer les projets"
              className="mb-10 flex gap-2 overflow-x-auto pb-2"
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
          ) : null}

          {projects.length === 0 ? (
            <EmptyState
              title="Aucun projet ne correspond à ces filtres."
              action={
                <FilterChip href="/projects" active>
                  Réinitialiser
                </FilterChip>
              }
            />
          ) : (
            <div className="flex flex-col gap-6 md:gap-8">
              {featured ? (
                <Reveal>
                  <ProjectCard project={featured} variant="featured" />
                </Reveal>
              ) : null}
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                {rest.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 0.06}>
                    <ProjectCard project={project} index={i + (featured ? 1 : 0)} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
