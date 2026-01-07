import { PRODUCT_AUTH, SessionUser } from "../../Auth/productAuth";

type LoginResponse = {
  authenticated: boolean;
  user: SessionUser;
};

export async function emissioncheckiqLogin(email: string, password: string): Promise<SessionUser> {
  const cfg = PRODUCT_AUTH.emissioncheckiq;

  const res = await fetch(cfg.baseUrl + cfg.endpoints.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // <-- crucial for cookie sessions
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || "Login failed");
  }

  const data = (await res.json()) as LoginResponse;
  if (!data.authenticated || !data.user) throw new Error("Invalid login response");

  return data.user;
}

export async function emissioncheckiqSessionCheck(): Promise<SessionUser | null> {
  const cfg = PRODUCT_AUTH.emissioncheckiq;
  const res = await fetch(cfg.baseUrl + cfg.endpoints.sessionCheck, {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) return null;
  if (!res.ok) return null;

  const data = (await res.json()) as { authenticated: boolean; user?: SessionUser };
  return data.authenticated && data.user ? data.user : null;
}

export async function emissioncheckiqLogout(): Promise<void> {
  const cfg = PRODUCT_AUTH.emissioncheckiq;

  await fetch(cfg.baseUrl + cfg.endpoints.logout, {
    method: "POST",
    credentials: "include",
  });
}

async function safeError(res: Response): Promise<string | null> {
  try {
    const data = await res.json();
    return data?.message || data?.error || null;
  } catch {
    return null;
  }
}

export type BootstrapResponse = {
  user: { user_id: string; email: string };
  organization: any | null;
  facilities: any[];
  emissions: any[];        // you said you want all entries
  hasData: boolean;
};

export async function emissioncheckiqBootstrap(): Promise<BootstrapResponse | null> {
  const cfg = PRODUCT_AUTH.emissioncheckiq;

  const res = await fetch(cfg.baseUrl + "/api/bootstrap", {
    method: "GET",
    credentials: "include",
  });

  if (res.status === 401) return null;
  if (!res.ok) return null;

  return (await res.json()) as BootstrapResponse;
}
