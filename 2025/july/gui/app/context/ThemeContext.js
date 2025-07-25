import { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    colors: {
      // Background colors
      background: isDark ? "#0f172a" : "#f8fafc",
      surface: isDark ? "#1e293b" : "#ffffff",
      surfaceSecondary: isDark ? "#334155" : "#f1f5f9",

      // Text colors
      text: isDark ? "#f1f5f9" : "#1f2937",
      textSecondary: isDark ? "#94a3b8" : "#6b7280",
      textTertiary: isDark ? "#64748b" : "#9ca3af",

      // UI colors
      primary: "#22c55e",
      border: isDark ? "#334155" : "#e5e7eb",
      borderLight: isDark
        ? "rgba(148, 163, 184, 0.1)"
        : "rgba(255, 255, 255, 0.2)",

      // Tab bar colors
      tabBarBackground: isDark
        ? "rgba(30, 41, 59, 0.85)"
        : "rgba(255, 255, 255, 0.85)",
      tabBarInactive: isDark ? "#64748b" : "#71717a",

      // Card shadows
      shadowColor: isDark ? "#000000" : "#000000",
    },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
