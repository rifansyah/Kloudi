export interface ShadowToken {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeTokens {
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primarySurface: string;
    secondary: string;
    secondaryLight: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    text: string;
    textSecondary: string;
    textDisabled: string;
    error: string;
    errorLight: string;
    success: string;
    warning: string;
    border: string;
    borderLight: string;
    tabBarActive: string;
    tabBarInactive: string;
    statusBar: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  typography: {
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    weights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    };
    families: {
      regular: string;
      medium: string;
      bold: string;
      heading: string;
    };
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: ShadowToken;
    md: ShadowToken;
    lg: ShadowToken;
  };
}
