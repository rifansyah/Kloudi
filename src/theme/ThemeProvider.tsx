import type { IStorageService } from "@services/storage";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Appearance } from "react-native";
import { darkTheme, lightTheme } from "./palettes";
import type { ThemeTokens } from "./tokens";

export type ThemeMode = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
}

type ThemeAction =
  | { type: "SET_MODE"; payload: ThemeMode }
  | { type: "SET_RESOLVED_THEME"; payload: ResolvedTheme };

interface ThemeContextValue {
  theme: ThemeTokens;
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  colors: ThemeTokens["colors"];
  setMode: (mode: ThemeMode) => void;
}

const STORAGE_KEY = "theme_mode";

function getSystemTheme(): ResolvedTheme {
  return Appearance.getColorScheme() === "dark" ? "dark" : "light";
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === "system" ? getSystemTheme() : mode;
}

function reducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_MODE": {
      const resolvedTheme = resolveTheme(action.payload);
      return { mode: action.payload, resolvedTheme };
    }
    case "SET_RESOLVED_THEME":
      return { ...state, resolvedTheme: action.payload };
    default:
      return state;
  }
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  storage: IStorageService;
}

export function ThemeProvider({ children, storage }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(reducer, null, (): ThemeState => {
    const savedMode = storage.getString(STORAGE_KEY) as ThemeMode | undefined;
    const mode: ThemeMode =
      savedMode === "light" || savedMode === "dark" || savedMode === "system"
        ? savedMode
        : "system";
    return { mode, resolvedTheme: resolveTheme(mode) };
  });

  useEffect(() => {
    if (state.mode !== "system") {
      return;
    }
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch({
        type: "SET_RESOLVED_THEME",
        payload: colorScheme === "dark" ? "dark" : "light",
      });
    });
    return () => subscription.remove();
  }, [state.mode]);

  const setMode = useCallback(
    (mode: ThemeMode) => {
      storage.setString(STORAGE_KEY, mode);
      dispatch({ type: "SET_MODE", payload: mode });
    },
    [storage]
  );

  const theme = state.resolvedTheme === "dark" ? darkTheme : lightTheme;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode: state.mode,
      resolvedTheme: state.resolvedTheme,
      colors: theme.colors,
      setMode,
    }),
    [theme, state.mode, state.resolvedTheme, setMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
