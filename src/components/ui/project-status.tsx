import { STATUS_LABELS, type ProjectStatus } from "@/domain/project";
import { cn } from "@/lib/utils";

const DOT_CLASS: Record<ProjectStatus, string> = {
  concept: "bg-foreground-muted",
  development: "bg-brand-500",
  "private-beta": "bg-brand-500",
  "public-beta": "bg-brand-500",
  released: "bg-success-500",
  paused: "bg-warning-500",
  archived: "bg-foreground-muted",
};

/**
 * Textual project status — never conveyed by color alone (section 7.2 acceptance criteria).
 */
export function ProjectStatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = STATUS_LABELS[status];
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm font-medium", className)}>
      <span className={cn("size-2 rounded-full", DOT_CLASS[status])} aria-hidden />
      {meta.label}
    </span>
  );
}
