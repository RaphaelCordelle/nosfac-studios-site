"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title: string;
  description?: string;
  errorId?: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: "inline" | "section" | "page";
  className?: string;
}

/** Recoverable error surface — never shows a stack trace or internal identifier beyond errorId. */
export function ErrorState({
  title,
  description,
  errorId,
  onRetry,
  retryLabel = "Réessayer",
  variant = "section",
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-3 text-center",
        variant === "page" && "min-h-[50vh] justify-center",
        variant === "section" && "rounded-2xl border border-border-subtle p-12",
        variant === "inline" && "rounded-xl border border-border-subtle p-4",
        className,
      )}
    >
      <p className="font-medium">{title}</p>
      {description ? <p className="max-w-prose text-sm text-foreground-muted">{description}</p> : null}
      {onRetry ? (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
      {errorId ? (
        <p className="text-xs text-foreground-muted">Identifiant d’erreur : {errorId}</p>
      ) : null}
    </div>
  );
}
