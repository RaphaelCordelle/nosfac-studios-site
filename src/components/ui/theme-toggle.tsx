"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const ORDER: ThemePreference[] = ["system", "light", "dark"];
const ICONS: Record<ThemePreference, typeof Sun> = { system: Monitor, light: Sun, dark: Moon };
const LABELS: Record<ThemePreference, string> = {
  system: "Thème système",
  light: "Thème clair",
  dark: "Thème sombre",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const Icon = ICONS[theme];

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]!;
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        "flex size-11 items-center justify-center rounded-full text-foreground-muted transition-colors duration-(--duration-fast) hover:bg-surface-elevated hover:text-foreground",
        className,
      )}
      aria-label={`${LABELS[theme]}. Activer le thème suivant.`}
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}
