"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import NextLink from "next/link";
import { useState } from "react";
import { STATUS_LABELS, type ProjectFrontmatter } from "@/domain/project";

type ProjectRow = Pick<
  ProjectFrontmatter,
  "slug" | "name" | "provisionalName" | "summary" | "status" | "platforms"
>;

/**
 * Editorial project list — no cards, no thumbnails.
 * Numbered rows separated by rules. Hover reveals an accent underline.
 * Tap triggers a small "bump" for dopamine feedback before navigation.
 */
export function ProjectsList({ projects }: { projects: ProjectRow[] }) {
  return (
    <ol className="border-t border-border-strong">
      {projects.map((project, i) => (
        <ProjectRowItem key={project.slug} project={project} index={i} />
      ))}
    </ol>
  );
}

function ProjectRowItem({ project, index }: { project: ProjectRow; index: number }) {
  const reducedMotion = useReducedMotion();
  const [pulse, setPulse] = useState(0);

  const statusColor =
    project.status === "development" ||
    project.status === "public-beta" ||
    project.status === "private-beta"
      ? "bg-accent-500"
      : project.status === "released"
        ? "bg-success-500"
        : "bg-stone-400";

  return (
    <m.li
      className="group border-b border-border-strong"
      whileTap={reducedMotion ? undefined : { scale: 0.998 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      data-testid={`project-row-${project.slug}`}
    >
      <NextLink
        href={`/projects/${project.slug}`}
        onClick={() => setPulse((n) => n + 1)}
        className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 py-8 md:grid-cols-[80px_1fr_auto] md:gap-x-10 md:py-10"
      >
        <m.span
          key={`num-${pulse}`}
          initial={reducedMotion ? false : { y: 0 }}
          animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="tabular text-[13px] font-medium tracking-widest text-foreground-subtle group-hover:text-accent-600 transition-colors"
        >
          {String(index + 1).padStart(2, "0")}
        </m.span>

        <div className="col-span-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4">
            <h2 className="relative text-[26px] font-semibold tracking-tight leading-tight md:text-[34px]">
              {project.name}
              {project.provisionalName && (
                <span className="ml-2 text-[14px] font-normal text-foreground-subtle">
                  (nom provisoire)
                </span>
              )}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-0 bg-accent-600 transition-[width] duration-500 ease-out group-hover:w-full"
              />
              <m.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px bg-foreground"
                initial={{ width: 0 }}
                animate={{ width: pulse > 0 ? "100%" : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </h2>
          </div>

          <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-foreground-muted md:text-[16px]">
            {project.summary}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-foreground-subtle">
            <span className="inline-flex items-center gap-2">
              <span className={"size-1.5 rounded-full " + statusColor} />
              {STATUS_LABELS[project.status].label}
            </span>
            {project.platforms.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span>{project.platforms.map((p) => p.label).join(", ")}</span>
              </>
            )}
          </div>
        </div>

        <span className="col-span-2 -mt-1 justify-self-start text-[13px] font-medium text-foreground-muted transition-colors group-hover:text-accent-600 md:col-span-1 md:justify-self-end md:self-center md:text-[14px]">
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">
            Ouvrir la fiche →
          </span>
        </span>
      </NextLink>
    </m.li>
  );
}
