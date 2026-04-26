import type { IStorageService } from '@services/storage';
import { MockAuthService } from '@services/auth/mockAuthService';
import ReactTestRenderer from 'react-test-renderer';
import { AuthProvider, useAuth } from '../AuthContext';

jest.mock('@utils/async', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

function createMockStorage() {
  const store: Record<string, string> = {};
  return {
    getString: jest.fn((key: string) => store[key]),
    setString: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    getJSON: jest.fn(<T,>(_key: string): T | undefined => {
      const val = store[_key];
      if (val) return JSON.parse(val) as T;
      return undefined;
    }),
    setJSON: jest.fn(<T,>(key: string, value: T) => {
      store[key] = JSON.stringify(value);
    }),
    delete: jest.fn((key: string) => {
      delete store[key];
    }),
    clearAll: jest.fn(() => {
      for (const k of Object.keys(store)) {
        delete store[k];
      }
    }),
    contains: jest.fn((key: string) => key in store),
  } as unknown as IStorageService;
}

interface ConsumerState {
  user: { id: string; name: string; email: string } | null;
  isLoading: boolean;
  isSubmitting: boolean;
}

function Consumer({ onState }: { onState: (state: ConsumerState) => void }) {
  const auth = useAuth();
  onState(auth);
  return null;
}

// No-op: each test creates fresh storage and authService instances
function _resetUsersDB() {}

describe('AuthContext', () => {
  afterEach(() => {
    _resetUsersDB();
  });

  it('starts with isLoading true then resolves to false', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    const states: ConsumerState[] = [];

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer onState={(s) => states.push(s)} />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const first = states[0]!;
    expect(first.isLoading).toBe(true);
    expect(first.user).toBeNull();

    const last = states[states.length - 1]!;
    expect(last.isLoading).toBe(false);
  });

  it('signup creates user and persists', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    const authRef = { current: null as ConsumerState | null };

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authRef.current = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    await ReactTestRenderer.act(async () => {
      await (
        authRef.current as unknown as { signup: (n: string, e: string, p: string) => Promise<void> }
      ).signup('John', 'john@example.com', 'password123');
    });

    expect(authRef.current?.user).not.toBeNull();
    expect(authRef.current?.user?.name).toBe('John');
    expect(authRef.current?.user?.email).toBe('john@example.com');
    expect(storage.setJSON).toHaveBeenCalled();
  });

  it('signup throws if email already exists', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    let authValue: ConsumerState | null = null;

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authValue = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const ctx = authValue as unknown as {
      signup: (n: string, e: string, p: string) => Promise<void>;
    };
    await ReactTestRenderer.act(async () => {
      await ctx.signup('John', 'john@example.com', 'password123');
    });

    await expect(ctx.signup('Jane', 'john@example.com', 'otherpass')).rejects.toThrow(
      'Email already registered',
    );
  });

  it('login authenticates with correct credentials', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    const authRef = { current: null as ConsumerState | null };

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authRef.current = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const ctx = authRef.current as unknown as {
      signup: (n: string, e: string, p: string) => Promise<void>;
      login: (e: string, p: string) => Promise<void>;
    };

    await ReactTestRenderer.act(async () => {
      await ctx.signup('John', 'john@example.com', 'password123');
    });

    await ReactTestRenderer.act(async () => {
      await ctx.login('john@example.com', 'password123');
    });

    expect(authRef.current?.user?.email).toBe('john@example.com');
  });

  it('login throws with wrong password', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    let authValue: ConsumerState | null = null;

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authValue = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const ctx = authValue as unknown as {
      signup: (n: string, e: string, p: string) => Promise<void>;
      login: (e: string, p: string) => Promise<void>;
    };

    await ReactTestRenderer.act(async () => {
      await ctx.signup('John', 'john@example.com', 'password123');
    });

    await expect(ctx.login('john@example.com', 'wrongpass')).rejects.toThrow(
      'Invalid email or password',
    );
  });

  it('login throws if user not found', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    let authValue: ConsumerState | null = null;

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authValue = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const ctx = authValue as unknown as { login: (e: string, p: string) => Promise<void> };

    await expect(ctx.login('nobody@example.com', 'password123')).rejects.toThrow(
      'Invalid email or password',
    );
  });

  it('logout clears user and storage', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    const authRef = { current: null as ConsumerState | null };

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authRef.current = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    const ctx = authRef.current as unknown as {
      signup: (n: string, e: string, p: string) => Promise<void>;
      logout: () => Promise<void>;
    };

    await ReactTestRenderer.act(async () => {
      await ctx.signup('John', 'john@example.com', 'password123');
    });

    expect(authRef.current?.user).not.toBeNull();

    await ReactTestRenderer.act(async () => {
      await ctx.logout();
    });

    expect(authRef.current?.user).toBeNull();
    expect(storage.delete).toHaveBeenCalled();
  });

  it('hydrates user from storage on mount', async () => {
    const storage = createMockStorage();
    const authService = new MockAuthService(storage);
    const savedUser = { id: '1', name: 'Saved', email: 'saved@test.com' };
    (storage.getJSON as jest.Mock) = jest.fn(() => savedUser);

    const authRef = { current: null as ConsumerState | null };

    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(
        <AuthProvider storage={storage} authService={authService}>
          <Consumer
            onState={(s) => {
              authRef.current = s;
            }}
          />
        </AuthProvider>,
      );
      await new Promise<void>((r) => {
        setTimeout(r, 100);
      });
    });

    expect(authRef.current?.user).not.toBeNull();
    expect(authRef.current?.user?.email).toBe('saved@test.com');
  });

  it('throws when useAuth is used outside provider', () => {
    expect(() => useAuth()).toThrow();
  });
});
