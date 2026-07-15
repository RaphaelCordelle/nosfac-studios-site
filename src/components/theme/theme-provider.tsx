"use client";

import * as React from "react";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeContextValue {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "nosfac-theme";

function isThemePreference(value: string | null): value is ThemePreference {
  return value === "system" || value === "light" || value === "dark";
}

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;
  if (theme === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): ThemePreference {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isThemePreference(stored) ? stored : "system";
}

function getServerSnapshot(): ThemePreference {
  return "system";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storedTheme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [override, setOverride] = React.useState<ThemePreference | null>(null);
  const theme = override ?? storedTheme;

  const setTheme = React.useCallback((next: ThemePreference) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    setOverride(next);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
