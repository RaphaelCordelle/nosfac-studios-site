import { cn } from "@/lib/utils";

export interface TagProps {
  children: React.ReactNode;
  variant?: "neutral" | "project-color";
  accentHex?: string;
  className?: string;
}

/** Non-interactive category label — docs/MASTER_SPECIFICATION.md section 9. */
export function Tag({ children, variant = "neutral", accentHex, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        variant === "neutral" && "border-border-subtle text-foreground-muted",
        className,
      )}
      style={
        variant === "project-color" && accentHex
          ? { borderColor: accentHex, color: accentHex }
          : undefined
      }
    >
      {children}
    </span>
  );
}
