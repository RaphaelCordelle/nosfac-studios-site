import NextLink from "next/link";
import type { ProjectFrontmatter } from "@/domain/project";
import { MediaFrame } from "@/components/content/media-frame";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: ProjectFrontmatter;
  variant?: "featured" | "standard" | "compact";
  className?: string;
}

/** docs/MASTER_SPECIFICATION.md section 25.4. The title link is the primary click target. */
export function ProjectCard({ project, variant = "standard", className }: ProjectCardProps) {
  const isArchived = project.status === "archived";
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border border-border-subtle p-4 transition-colors duration-(--duration-standard) hover:border-brand-500/60",
        isFeatured && "md:flex-row md:items-center md:gap-8 md:p-6",
        isArchived && "opacity-80",
        className,
      )}
    >
      <MediaFrame
        media={project.heroMedia}
        accentHex={project.accent.hex}
        className={cn(isFeatured ? "md:w-1/2" : "w-full")}
        ratioClassName={variant === "compact" ? "aspect-[4/3]" : "aspect-video"}
      />
      <div className={cn("flex flex-1 flex-col gap-2", isFeatured && "md:py-4")}>
        <ProjectStatusBadge status={project.status} />
        <h3 className={cn("font-semibold tracking-tight", isFeatured ? "text-2xl md:text-3xl" : "text-lg")}>
          <NextLink href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
            {project.provisionalName ? (
              <span className="ml-2 text-xs font-normal text-foreground-muted">(nom provisoire)</span>
            ) : null}
          </NextLink>
        </h3>
        <p className="text-sm text-foreground-muted">{project.summary}</p>
      </div>
    </article>
  );
}
