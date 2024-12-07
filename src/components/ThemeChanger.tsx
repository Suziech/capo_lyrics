"use client";

import { useCallback } from "react";

export default function ThemeChanger() {
  const handleThemeChange = useCallback(() => {
    const theme = document.cookie.includes("theme=light") ? "dark" : "light";
    document.cookie = `theme=${theme}; path=/`;
    document.body.classList.toggle("dark");
  }, []);

  return <button onClick={handleThemeChange}>Change Theme</button>;
}
