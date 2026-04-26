import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export { darkTheme, lightTheme } from "./palettes";
export type { ThemeMode, ThemeProviderProps } from "./ThemeProvider";
export { ThemeProvider } from "./ThemeProvider";
export type { ThemeTokens } from "./tokens";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
