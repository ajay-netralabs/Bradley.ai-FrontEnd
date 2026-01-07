import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* =====================
   Types
===================== */

type User = {
  id?: string;
  name?: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

/* =====================
   Small fetch helpers
===================== */

type ApiErrorBody = {
  detail?: string;
  message?: string;
};

class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function extractErrorMessage(body: unknown, fallback: string) {
  if (typeof body === "string" && body.trim()) return body;
  if (body && typeof body === "object") {
    const b = body as ApiErrorBody;
    return b.detail || b.message || fallback;
  }
  return fallback;
}

async function request<T>(
  path: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
  }
): Promise<T> {
  const method = options?.method ?? "GET";
  const hasBody = options?.body !== undefined;

  const res = await fetch(path, {
    method,
    credentials: "include",
    headers: hasBody ? { "Content-Type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const body = await parseJsonSafe(res);
    const msg = extractErrorMessage(body, `Request failed (${res.status})`);
    throw new ApiError(msg, res.status, body);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

/* =====================
   Context
===================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =====================
   Provider
===================== */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await request<{ user: User }>("/auth/status");
        setUser(response.user);
      } catch {
        // Not logged in / session expired
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // your backend sets cookie here (credentials included)
      await request("/auth/login", {
        method: "POST",
        body: { email, password },
      });

      const status = await request<{ user: User }>("/auth/session");
      setUser(status.user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Login failed";

      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const role = "admin";

    try {
      const response = await request<{ user: User }>("/auth/register", {
        method: "POST",
        body: { name, email, password, role },
      });

      setUser(response.user);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Register failed";

      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await request("/auth/logout", { method: "POST", body: {} });
      setUser(null);
      setError(null);
    } catch {
      throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

/* =====================
   Hook
===================== */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
