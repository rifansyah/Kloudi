import { I18nProvider } from "@i18n";
import type { IStorageService } from "@services/storage";
import { ThemeProvider } from "@theme";
import { type ComponentType, type ReactNode, useMemo } from "react";
import { AuthProvider } from "./AuthContext";
import { MockAuthService } from "@services/auth/mockAuthService";

type ProviderComponent = ComponentType<{ children: ReactNode }>;

function composeProviders(
  providers: ProviderComponent[]
): ComponentType<{ children: ReactNode }> {
  return providers.reduce(
    (Accumulated, Current) => {
      return ({ children }: { children: ReactNode }) => (
        <Accumulated>
          <Current>{children}</Current>
        </Accumulated>
      );
    },
    ({ children }: { children: ReactNode }) => <>{children}</>
  );
}

interface AppProviderProps {
  children: ReactNode;
  storage: IStorageService;
}

export function AppProvider({ children, storage }: AppProviderProps) {
  const authService = useMemo(() => new MockAuthService(storage), [storage]);

  const providers: ProviderComponent[] = useMemo(
    () => [
      ({ children }) => (
        <I18nProvider storage={storage}>{children}</I18nProvider>
      ),
      ({ children }) => (
        <ThemeProvider storage={storage}>{children}</ThemeProvider>
      ),
      ({ children }) => (
        <AuthProvider storage={storage} authService={authService}>
          {children}
        </AuthProvider>
      ),
    ],
    [authService, storage]
  );

  const Composed = composeProviders(providers);

  return <Composed>{children}</Composed>;
}
