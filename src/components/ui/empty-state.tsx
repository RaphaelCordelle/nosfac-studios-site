import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border-subtle p-12 text-center",
        className,
      )}
    >
      <p className="font-medium">{title}</p>
      {description ? <p className="max-w-prose text-sm text-foreground-muted">{description}</p> : null}
      {action}
    </div>
  );
}
