import { STATUS_LABELS, type ProjectStatus } from "@/domain/project";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<
  ProjectStatus,
  { dot: string; label: string; pulse?: boolean }
> = {
  concept:         { dot: "bg-foreground-muted",   label: "text-foreground-muted" },
  development:     { dot: "bg-accent-500",         label: "text-foreground",       pulse: true },
  "private-beta":  { dot: "bg-accent-500",         label: "text-foreground",       pulse: true },
  "public-beta":   { dot: "bg-accent-500",         label: "text-foreground",       pulse: true },
  released:        { dot: "bg-success-500",        label: "text-foreground" },
  paused:          { dot: "bg-warning-500",        label: "text-foreground-muted" },
  archived:        { dot: "bg-foreground-subtle",  label: "text-foreground-subtle" },
};

/**
 * Textual project status — never conveyed by color alone.
 * Active development statuses show a subtle pulsing dot for a sense of "alive" work.
 */
export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const meta = STATUS_LABELS[status];
  const style = STATUS_STYLES[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase",
        style.label,
        className,
      )}
      data-testid={`status-${status}`}
    >
      <span className="relative flex size-1.5 items-center justify-center">
        <span className={cn("absolute inset-0 rounded-full", style.dot)} aria-hidden />
        {style.pulse && (
          <span
            className={cn("absolute inset-0 rounded-full", style.dot, "animate-ping opacity-60")}
            aria-hidden
          />
        )}
      </span>
      {meta.label}
    </span>
  );
}
