import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { emissioncheckiqLogin, emissioncheckiqLogout, emissioncheckiqSessionCheck, emissioncheckiqBootstrap } from "../Demo/components/Auth";

type ProductKey = "bradley" | "emissioncheckiq" | string;

interface User {
  role: 'client' | 'analyst' | 'demo' | string;
  email: string;
  product: ProductKey;
}

interface AppContextProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentSubStep: number;
  setCurrentSubStep: React.Dispatch<React.SetStateAction<number>>;
  currentFurtherSubStep: number;
  setCurrentFurtherSubStep: React.Dispatch<React.SetStateAction<number>>;
  visitedSteps: boolean[][];
  setVisitedSteps: React.Dispatch<React.SetStateAction<boolean[][]>>;
  completedSubSteps: boolean[][];
  setCompletedSubSteps: React.Dispatch<React.SetStateAction<boolean[][]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  credentials: { [key in User['role']]: { email: string; password: string } };
  login: (user: User) => void;
  logout: () => void;
  loginForProduct: (product: ProductKey, email: string, password: string) => Promise<User>;
  sessionCheckForProduct: (product: ProductKey) => Promise<User | null>;
  logoutForProduct: (product: ProductKey) => Promise<void>;
  authReady: boolean;
  bootstrap: any | null;
  setBootstrap: React.Dispatch<React.SetStateAction<any | null>>;
}

const defaultCredentials = {
  client: { email: 'client@gmail.com', password: 'client@gmail.com' },
  // analyst: { email: 'analyst@gmail.com', password: 'analyst@gmail.com' },
  demo: { email: '', password: '' }, // Demo user has no credentials
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
  steps: { label: string; subSteps: number; furtherSubSteps: number[] }[];
  appPrefix: string;
  initialBootstrap?: any | null;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, steps, appPrefix, initialBootstrap = null }) => {
  const [authReady, setAuthReady] = useState(false);
  const [bootstrap, setBootstrap] = useState<any | null>(initialBootstrap);

  const [currentStep, setCurrentStep] = useState(() => Number(Cookies.get(`${appPrefix}_currentStep`) || 0));
  const [currentSubStep, setCurrentSubStep] = useState(() => Number(Cookies.get(`${appPrefix}_currentSubStep`) || 0));
  const [currentFurtherSubStep, setCurrentFurtherSubStep] = useState(() => Number(Cookies.get(`${appPrefix}_currentFurtherSubStep`) || 0));

  const [visitedSteps, setVisitedSteps] = useState(() => {
    const savedVisitedSteps = Cookies.get(`${appPrefix}_visitedSteps`);
    return savedVisitedSteps
      ? JSON.parse(savedVisitedSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: steps[i].subSteps }, (_, j) => i === 0 && j === 0)
        );
  });

  const [completedSubSteps, setCompletedSubSteps] = useState(() => {
    const savedCompletedSubSteps = Cookies.get(`${appPrefix}_completedSubSteps`);
    return savedCompletedSubSteps
      ? JSON.parse(savedCompletedSubSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: steps[i].subSteps }, () => false)
        );
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = Cookies.get(`${appPrefix}_user`);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    Cookies.set(`${appPrefix}_currentStep`, currentStep.toString());
    Cookies.set(`${appPrefix}_currentSubStep`, currentSubStep.toString());
    Cookies.set(`${appPrefix}_currentFurtherSubStep`, currentFurtherSubStep.toString());
    Cookies.set(`${appPrefix}_visitedSteps`, JSON.stringify(visitedSteps));
    Cookies.set(`${appPrefix}_completedSubSteps`, JSON.stringify(completedSubSteps));
    if (user) {
      Cookies.set(`${appPrefix}_user`, JSON.stringify(user));
    } else {
      Cookies.remove(`${appPrefix}_user`);
    }
  }, [currentStep, currentSubStep, currentFurtherSubStep, visitedSteps, completedSubSteps, user, appPrefix]);

  useEffect(() => {
    if (initialBootstrap) {
      setBootstrap(initialBootstrap);
    }
  }, [initialBootstrap]);

  useEffect(() => {
  let alive = true;

  (async () => {
    try {
      const sessionUser = await emissioncheckiqSessionCheck();
      if (sessionUser && alive) {
        setUser({
          email: sessionUser.email,
          role: sessionUser.role || "demo",
          product: "emissioncheckiq",
        });
        const bootstrapData = await emissioncheckiqBootstrap();
        setBootstrap(bootstrapData);
      } else {
        if (alive) setUser(null);
      }
    } finally {
      if (alive) setAuthReady(true);
    }
  })();

  return () => { alive = false; };
  }, []);

  const login = (user: User) => {
    setUser(user);
    Cookies.set(`${appPrefix}_user`, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(`${appPrefix}_user`);
    Cookies.remove('global_user');
    if (appPrefix === 'emissioncheckiq') {
      window.location.href = '/login/emissioncheckiq';
    } else {
      window.location.href = '/login/bradley';
    }
  };

  const loginForProduct = React.useCallback(async (product: ProductKey, email: string, password: string): Promise<User> => {
    if (product === "bradley") {
      const client = defaultCredentials.client;
      // const analyst = defaultCredentials.analyst;

      if (email === client.email && password === client.password) {
        const u = { email, role: "client", product: "bradley" as const };
        setUser(u);
        return u;
      }
      // if (email === analyst.email && password === analyst.password) {
      //   const u = { email, role: "analyst", product: "bradley" as const };
      //   setUser(u);
      //   return u;
      // }
      throw new Error("Invalid email or password");
    }

    if (product === "emissioncheckiq") {
      const sessionUser = await emissioncheckiqLogin(email, password);
      const bootstrapData = await emissioncheckiqBootstrap();
      const u = { email: sessionUser.email, role: sessionUser.role || "demo", product: "emissioncheckiq" as const };
      setUser(u);
      setBootstrap(bootstrapData);
      return u;
    }

    throw new Error(`Unsupported product: ${product}`);
  }, [user]);

  const sessionCheckForProduct = React.useCallback(async (product: ProductKey): Promise<User | null> => {
    console.log("Session check for product:", product);
    if (product === "emissioncheckiq") {
      const sessionUser = await emissioncheckiqSessionCheck();
      if (!sessionUser) {
        setUser(null);
        setBootstrap(null);
        return null;
      } else {

      const u = { email: sessionUser.email, role: sessionUser.role || "demo", product: "emissioncheckiq" as const };
      console.log("Session check user:", u);
      setUser(u);
      const bootstrapData = await emissioncheckiqBootstrap();
      console.log("Bootstrap data:", bootstrapData);
      setBootstrap(bootstrapData);
      return u;
      };
    };

    if (product === "bradley") {
      console.log("Checking session for Bradley");
      return user?.product === "bradley" ? user : null;
    };

    return user;
  }, [user]);

  const logoutForProduct = React.useCallback(async (product: ProductKey): Promise<void> => {
    if (product === "emissioncheckiq") {
      await emissioncheckiqLogout();
    }
    setUser(null);
    Cookies.remove('global_user'); // if you adopt global auth cookie
    if (product === "emissioncheckiq") {
      window.location.href = "/login/emissioncheckiq";
    } else {
      window.location.href = "/login/bradley";
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
      currentStep,
      setCurrentStep,
      currentSubStep,
      setCurrentSubStep,
      currentFurtherSubStep,
      setCurrentFurtherSubStep,
      visitedSteps,
      setVisitedSteps,
      completedSubSteps,
      setCompletedSubSteps,
      user,
      setUser,
      credentials: defaultCredentials,
      login,
      logout,
      loginForProduct,
      sessionCheckForProduct,
      logoutForProduct,
      authReady,
      bootstrap,
      setBootstrap
    }}
    >
      {children}
    </AppContext.Provider>
  );
};