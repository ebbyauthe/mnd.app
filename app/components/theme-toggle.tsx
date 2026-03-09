"use client";

import { useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "lerna-theme";

export default function ThemeToggle() {
  function getCurrentTheme(): Theme {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return "light";
    }

    const attrTheme = document.documentElement.getAttribute("data-theme");
    if (attrTheme === "dark" || attrTheme === "light") return attrTheme;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const [theme, setTheme] = useState<Theme>(getCurrentTheme);

  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const nextTheme: Theme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const nextLabel = theme === "light" ? "🌙 Dark" : "☀️ Light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border px-3 py-1.5 text-xs font-medium transition"
      style={{
        borderColor: "color-mix(in srgb, var(--app-border) 75%, transparent)",
        color: "var(--app-fg)",
        backgroundColor: "color-mix(in srgb, var(--app-card) 85%, transparent)",
      }}
      aria-label="Toggle theme"
    >
      {nextLabel}
    </button>
  );
}
