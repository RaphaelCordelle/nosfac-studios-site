import NextLink from "next/link";
import type { ProjectFrontmatter } from "@/domain/project";
import { MediaFrame } from "@/components/content/media-frame";
import { ProjectStatusBadge } from "@/components/ui/project-status";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: ProjectFrontmatter;
  variant?: "featured" | "standard" | "compact";
  index?: number;
  className?: string;
}

/**
 * ProjectCard — Refonte "Precision Editorial".
 *
 * Design goals:
 *  - Each project has a strong sense of identity (accent-colored border on hover, index number)
 *  - Layout differs between variants (featured is bigger, more editorial)
 *  - The whole card is a link target via the ::after stretched pseudo-element on the title
 *  - Hover: subtle border colour shift, arrow slides right, media scales imperceptibly
 */
export function ProjectCard({ project, variant = "standard", index, className }: ProjectCardProps) {
  const isArchived = project.status === "archived";
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  const accent = project.accent.hex;

  return (
    <article
      className={cn(
        "group relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl border border-border-subtle bg-surface-elevated/40 p-5 transition-all duration-(--duration-standard) ease-(--ease-standard)",
        "hover:border-border-strong hover:bg-surface-elevated/80",
        isFeatured && "md:flex-row md:items-stretch md:gap-8 md:p-7",
        isArchived && "opacity-70",
        className,
      )}
      data-testid={`project-card-${project.slug}`}
    >
      {/* Accent halo on hover — coloured to match the project */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full opacity-0 blur-3xl transition-opacity duration-(--duration-expressive) group-hover:opacity-25"
        style={{ backgroundColor: accent }}
      />

      {/* Index number — top-right for standard, gives editorial rhythm */}
      {typeof index === "number" && !isFeatured && (
        <div className="absolute top-4 right-5 z-10 font-mono text-[11px] tracking-wider text-foreground-subtle">
          {String(index + 1).padStart(2, "0")}
        </div>
      )}

      <MediaFrame
        media={project.heroMedia}
        accentHex={accent}
        className={cn(
          "relative overflow-hidden",
          isFeatured ? "md:w-1/2" : "w-full",
        )}
        ratioClassName={
          isFeatured
            ? "aspect-[16/10]"
            : isCompact
              ? "aspect-[4/3]"
              : "aspect-[16/10]"
        }
      />

      <div
        className={cn(
          "relative flex flex-1 flex-col gap-3",
          isFeatured && "md:justify-center md:py-2",
        )}
      >
        <div className="flex items-center gap-3">
          <ProjectStatusBadge status={project.status} />
          {project.platforms && project.platforms.length > 0 && (
            <span className="font-mono text-[11px] tracking-wider text-foreground-subtle uppercase">
              {project.platforms
                .slice(0, 3)
                .map((p) => p.label)
                .join(" · ")}
            </span>
          )}
        </div>

        <h3
          className={cn(
            "font-semibold tracking-tight",
            isFeatured ? "text-3xl md:text-4xl lg:text-5xl" : "text-xl md:text-2xl",
          )}
        >
          <NextLink
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-20 hover:text-accent-500 focus-visible:text-accent-500 transition-colors duration-(--duration-fast)"
            data-testid={`project-link-${project.slug}`}
          >
            {project.name}
            {project.provisionalName && (
              <span className="ml-2 font-serif text-base italic font-normal text-foreground-subtle">
                (nom provisoire)
              </span>
            )}
          </NextLink>
        </h3>

        <p
          className={cn(
            "text-foreground-muted leading-relaxed",
            isFeatured ? "text-base md:text-lg max-w-prose" : "text-sm",
          )}
        >
          {project.summary}
        </p>

        <div
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent-500 transition-transform duration-(--duration-standard) ease-(--ease-expressive)",
            isFeatured ? "text-base" : "text-sm",
          )}
        >
          <span className="link-editorial">Voir le projet</span>
          <span
            aria-hidden
            className="translate-x-0 transition-transform duration-(--duration-standard) ease-(--ease-expressive) group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}
