import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { IAuthService } from "@services/auth/types";
import type { IStorageService } from "@services/storage";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
}

type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SUBMITTING"; payload: boolean };

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isSubmitting: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = "auth_state";

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isSubmitting: false,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
}

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
  storage: IStorageService;
  authService: IAuthService;
}

export function AuthProvider({
  children,
  storage,
  authService,
}: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = storage.getJSON<User>(STORAGE_KEY);
    if (saved) {
      dispatch({ type: "SET_USER", payload: saved });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, [storage]);

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<void> => {
      const normalizedEmail = email.trim().toLowerCase();
      dispatch({ type: "SET_SUBMITTING", payload: true });
      try {
        const user: User = {
          id: Date.now().toString(36),
          name: name.trim(),
          email: normalizedEmail,
        };
        await authService.signup(name, normalizedEmail, password);
        storage.setJSON(STORAGE_KEY, user);
        dispatch({ type: "SET_USER", payload: user });
      } finally {
        dispatch({ type: "SET_SUBMITTING", payload: false });
      }
    },
    [storage, authService]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      const normalizedEmail = email.trim().toLowerCase();
      dispatch({ type: "SET_SUBMITTING", payload: true });
      try {
        const stored = await authService.login(normalizedEmail, password);
        const user: User = {
          id: stored.id,
          name: stored.name,
          email: stored.email,
        };
        storage.setJSON(STORAGE_KEY, user);
        dispatch({ type: "SET_USER", payload: user });
      } finally {
        dispatch({ type: "SET_SUBMITTING", payload: false });
      }
    },
    [storage, authService]
  );

  const logout = useCallback(async (): Promise<void> => {
    storage.delete(STORAGE_KEY);
    dispatch({ type: "SET_USER", payload: null });
  }, [storage]);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, login, signup, logout }),
    [state, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
