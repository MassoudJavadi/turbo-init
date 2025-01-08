"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { lightColors, darkColors } from "../../../../config/src/theme/colors.js";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors | typeof darkColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [colors, setColors] = useState(lightColors);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    setColors(initialTheme === "dark" ? darkColors : lightColors);

    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setColors(newTheme === "dark" ? darkColors : lightColors);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>{children}</ThemeContext.Provider>
  );
};
