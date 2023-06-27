import { useState, useEffect } from "react";

function useTheme() {
  const [theme, setTheme] = useState("dark");
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(nextTheme);
    root.classList.add(theme);
  }, [theme, nextTheme]);

  return [nextTheme, setTheme];
}

export default useTheme;
