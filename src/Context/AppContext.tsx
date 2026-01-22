import React, { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
    setUser, 
    setBootstrap, 
    checkSession, 
    loginUser, 
    logoutUser,
    User,
    ProductKey
} from '../store/slices/authSlice';
import {
    setCurrentStep,
    setCurrentSubStep,
    setCurrentFurtherSubStep,
    setVisitedSteps,
    setCompletedSubSteps,
    setWorkflowState
} from '../store/slices/workflowSlice';

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
  credentials: { [key: string]: { email: string; password: string } };
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
  demo: { email: '', password: '' },
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
  steps: any[];
  appPrefix: string;
  initialBootstrap?: any | null;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, steps, appPrefix, initialBootstrap = null }) => {
  const dispatch = useAppDispatch();
  
  // Redux State Selectors
  const { user, authReady, bootstrap } = useAppSelector((state) => state.auth);
  const { 
      currentStep, 
      currentSubStep, 
      currentFurtherSubStep, 
      visitedSteps, 
      completedSubSteps 
  } = useAppSelector((state) => state.workflow);

  // Initialize workflow state from localStorage or defaults (One-time sync on mount)
  useEffect(() => {
    const getSubStepCount = (step: any) => Array.isArray(step.subSteps) ? step.subSteps.length : step.subSteps;
    
    // Check if we need to hydrate from localStorage
    // Note: In a full Redux app, you'd use redux-persist. 
    // Here we manually hydration to respect the existing logic pattern.
    const savedCurrentStep = Number(localStorage.getItem(`${appPrefix}_currentStep`) || 0);
    const savedCurrentSubStep = Number(localStorage.getItem(`${appPrefix}_currentSubStep`) || 0);
    const savedCurrentFurtherSubStep = Number(localStorage.getItem(`${appPrefix}_currentFurtherSubStep`) || 0);
    
    const savedVisitedSteps = localStorage.getItem(`${appPrefix}_visitedSteps`);
    const parsedVisitedSteps = savedVisitedSteps
      ? JSON.parse(savedVisitedSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: getSubStepCount(steps[i]) }, (_, j) => i === 0 && j === 0)
        );

    const savedCompletedSubSteps = localStorage.getItem(`${appPrefix}_completedSubSteps`);
    const parsedCompletedSubSteps = savedCompletedSubSteps
      ? JSON.parse(savedCompletedSubSteps)
      : Array.from({ length: steps.length }, (_, i) =>
          Array.from({ length: getSubStepCount(steps[i]) }, () => false)
        );

    dispatch(setWorkflowState({
        currentStep: savedCurrentStep,
        currentSubStep: savedCurrentSubStep,
        currentFurtherSubStep: savedCurrentFurtherSubStep,
        visitedSteps: parsedVisitedSteps,
        completedSubSteps: parsedCompletedSubSteps
    }));

  }, [dispatch, steps, appPrefix]);

  // Persist workflow changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${appPrefix}_currentStep`, currentStep.toString());
    localStorage.setItem(`${appPrefix}_currentSubStep`, currentSubStep.toString());
    localStorage.setItem(`${appPrefix}_currentFurtherSubStep`, currentFurtherSubStep.toString());
    localStorage.setItem(`${appPrefix}_visitedSteps`, JSON.stringify(visitedSteps));
    localStorage.setItem(`${appPrefix}_completedSubSteps`, JSON.stringify(completedSubSteps));
  }, [currentStep, currentSubStep, currentFurtherSubStep, visitedSteps, completedSubSteps, appPrefix]);

  // Auth / User Persistence
  useEffect(() => {
      if (user) {
          localStorage.setItem(`${appPrefix}_user`, JSON.stringify(user));
      } else {
          localStorage.removeItem(`${appPrefix}_user`);
      }
  }, [user, appPrefix]);

  // Initial Bootstrap
  useEffect(() => {
    if (initialBootstrap) {
      dispatch(setBootstrap(initialBootstrap));
    }
  }, [initialBootstrap, dispatch]);

  // Session Check
  useEffect(() => {
    dispatch(checkSession("emissioncheckiq")); 
  }, [dispatch]);

  // Wrappers for Context API compatibility
  // Note: These accept functional updates (setState style) because the original Context did.
  // We need to handle that if we want full compatibility.
  
  const handleSetUser = (value: React.SetStateAction<User | null>) => {
      const newUser = typeof value === 'function' ? value(user) : value;
      dispatch(setUser(newUser));
  };

  const handleSetBootstrap = (value: React.SetStateAction<any | null>) => {
      const newBootstrap = typeof value === 'function' ? value(bootstrap) : value;
      dispatch(setBootstrap(newBootstrap));
  };

  const handleSetCurrentStep = (value: React.SetStateAction<number>) => {
      const newVal = typeof value === 'function' ? value(currentStep) : value;
      dispatch(setCurrentStep(newVal));
  };

  const handleSetCurrentSubStep = (value: React.SetStateAction<number>) => {
      const newVal = typeof value === 'function' ? value(currentSubStep) : value;
      dispatch(setCurrentSubStep(newVal));
  };

  const handleSetCurrentFurtherSubStep = (value: React.SetStateAction<number>) => {
      const newVal = typeof value === 'function' ? value(currentFurtherSubStep) : value;
      dispatch(setCurrentFurtherSubStep(newVal));
  };
  
  const handleSetVisitedSteps = (value: React.SetStateAction<boolean[][]>) => {
      const newVal = typeof value === 'function' ? value(visitedSteps) : value;
      dispatch(setVisitedSteps(newVal));
  };

  const handleSetCompletedSubSteps = (value: React.SetStateAction<boolean[][]>) => {
      const newVal = typeof value === 'function' ? value(completedSubSteps) : value;
      dispatch(setCompletedSubSteps(newVal));
  };

  // Actions
  const login = (u: User) => {
    dispatch(setUser(u));
  };

  const logout = () => {
    // This assumes simple logout. For product specific, use logoutForProduct
    dispatch(logoutUser("bradley")); // Defaulting to bradley cleanup logic
    window.location.href = '/login/bradley';
  };

  const loginForProduct = async (product: ProductKey, email: string, password: string): Promise<User> => {
     const actionResult = await dispatch(loginUser({ product, email, password }));
     if (loginUser.fulfilled.match(actionResult)) {
         return actionResult.payload.user;
     } else {
         throw new Error(actionResult.payload as string || "Login failed");
     }
  };

  const sessionCheckForProduct = async (product: ProductKey): Promise<User | null> => {
      // We can reuse the thunk or just check state, but force a check here as requested
      const actionResult = await dispatch(checkSession(product));
       if (checkSession.fulfilled.match(actionResult)) {
           return actionResult.payload ? actionResult.payload.user : null;
       }
       return null;
  };

  const logoutForProduct = async (product: ProductKey): Promise<void> => {
      await dispatch(logoutUser(product));
      if (product === "emissioncheckiq") {
          window.location.href = "/login/emissioncheckiq";
      } else {
          window.location.href = "/login/bradley";
      }
  };

  return (
    <AppContext.Provider
      value={{
      currentStep,
      setCurrentStep: handleSetCurrentStep,
      currentSubStep,
      setCurrentSubStep: handleSetCurrentSubStep,
      currentFurtherSubStep,
      setCurrentFurtherSubStep: handleSetCurrentFurtherSubStep,
      visitedSteps,
      setVisitedSteps: handleSetVisitedSteps,
      completedSubSteps,
      setCompletedSubSteps: handleSetCompletedSubSteps,
      user,
      setUser: handleSetUser,
      credentials: defaultCredentials,
      login,
      logout,
      loginForProduct,
      sessionCheckForProduct,
      logoutForProduct,
      authReady,
      bootstrap,
      setBootstrap: handleSetBootstrap
    }}
    >
      {children}
    </AppContext.Provider>
  );
};