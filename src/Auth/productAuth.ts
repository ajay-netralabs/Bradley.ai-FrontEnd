export type ProductKey = "bradley" | "emissioncheckiq" | string;

export type SessionUser = {
  email: string;
  role: string; // backend decides; for now emissioncheckiq probably returns "demo" or similar
};

export type ProductAuthConfig = {
  key: ProductKey;
  baseUrl: string; // can be "" if same origin, or "https://api.xyz.com"
  endpoints: {
    login: string;
    logout: string;
    sessionCheck: string;
  };
  cookieAuth?: boolean; // true if session cookie based
};

export const PRODUCT_AUTH: Record<ProductKey, ProductAuthConfig> = {
  emissioncheckiq: {
    key: "emissioncheckiq",
    baseUrl: "", // same origin; change if needed
    endpoints: {
      login: "/auth/login",
      logout: "/auth/logout",
      sessionCheck: "/auth/session",
    },
    cookieAuth: true,
  },

  // Bradley remains your current local credential auth for now
  bradley: {
    key: "bradley",
    baseUrl: "",
    endpoints: {
      login: "", // not used
      logout: "",
      sessionCheck: "",
    },
  },
};
