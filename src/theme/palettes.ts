import type { ShadowToken, ThemeTokens } from "./tokens";

const baseShadow = (
  color: string,
  opacity: number,
  radius: number,
  elevation: number
): ShadowToken => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});

export const lightTheme: ThemeTokens = {
  colors: {
    primary: "#4F46E5",
    primaryLight: "#818CF8",
    primaryDark: "#3730A3",
    primarySurface: "#EEF2FF",
    secondary: "#7C3AED",
    secondaryLight: "#EDE9FE",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceVariant: "#F1F5F9",
    text: "#1E293B",
    textSecondary: "#64748B",
    textDisabled: "#94A3B8",
    error: "#EF4444",
    errorLight: "#FEF2F2",
    success: "#10B981",
    warning: "#F59E0B",
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    tabBarActive: "#4F46E5",
    tabBarInactive: "#94A3B8",
    statusBar: "#F8FAFC",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  typography: {
    sizes: { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 28 },
    weights: { regular: "400", medium: "500", semibold: "600", bold: "700" },
    families: {
      regular: "Inter",
      medium: "Inter",
      bold: "Inter",
      heading: "Manrope",
    },
  },
  radii: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  shadows: {
    sm: baseShadow("#000000", 0.05, 2, 1),
    md: baseShadow("#000000", 0.08, 4, 2),
    lg: baseShadow("#000000", 0.12, 8, 4),
  },
};

export const darkTheme: ThemeTokens = {
  colors: {
    primary: "#c3c0ff",
    primaryLight: "#4f46e5",
    primaryDark: "#4d44e3",
    primarySurface: "#1c2b3c",
    secondary: "#A78BFA",
    secondaryLight: "#3B1F6E",
    background: "#051424",
    surface: "#122131",
    surfaceVariant: "#273647",
    text: "#d4e4fa",
    textSecondary: "#c7c4d8",
    textDisabled: "#918fa1",
    error: "#ffb4ab",
    errorLight: "#93000a",
    success: "#4ADE80",
    warning: "#ffb695",
    border: "#273647",
    borderLight: "#464555",
    tabBarActive: "#c3c0ff",
    tabBarInactive: "#918fa1",
    statusBar: "#051424",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  typography: {
    sizes: { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 28 },
    weights: { regular: "400", medium: "500", semibold: "600", bold: "700" },
    families: {
      regular: "Inter",
      medium: "Inter",
      bold: "Inter",
      heading: "Manrope",
    },
  },
  radii: { sm: 4, md: 8, lg: 12, xl: 16, full: 9999 },
  shadows: {
    sm: baseShadow("#000000", 0.2, 2, 1),
    md: baseShadow("#000000", 0.3, 4, 2),
    lg: baseShadow("#000000", 0.4, 8, 4),
  },
};
