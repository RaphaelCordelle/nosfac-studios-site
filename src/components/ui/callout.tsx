import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  info: { icon: Info, className: "border-brand-500/40 text-foreground" },
  success: { icon: CheckCircle2, className: "border-success-500/40 text-foreground" },
  warning: { icon: AlertTriangle, className: "border-warning-500/40 text-foreground" },
  danger: { icon: OctagonAlert, className: "border-danger-500/40 text-foreground" },
} as const;

export interface CalloutProps {
  variant?: keyof typeof VARIANTS;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ variant = "info", title, children, className }: CalloutProps) {
  const { icon: Icon, className: variantClass } = VARIANTS[variant];
  return (
    <div
      role={variant === "danger" || variant === "warning" ? "alert" : undefined}
      className={cn("flex gap-3 rounded-2xl border bg-surface-elevated p-4", variantClass, className)}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="text-sm">
        {title ? <p className="mb-1 font-medium">{title}</p> : null}
        <div className="text-foreground-muted">{children}</div>
      </div>
    </div>
  );
}
