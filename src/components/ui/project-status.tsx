import { STATUS_LABELS, type ProjectStatus } from "@/domain/project";
import { cn } from "@/lib/utils";

/**
 * Textual project status — sobre, sans dot pulsant.
 * L'information passe par le texte, pas par une animation.
 */
export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const meta = STATUS_LABELS[status];
  return (
    <span
      className={cn("text-[12px] text-foreground-subtle tabular", className)}
      data-testid={`status-${status}`}
    >
      {meta.label}
    </span>
  );
}
