import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


interface User {
  role: 'client' | 'analyst' | 'demo';
  email: string;
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
}

const defaultCredentials = {
  client: { email: 'client@gmail.com', password: 'client@gmail.com' },
  analyst: { email: 'analyst@gmail.com', password: 'analyst@gmail.com' },
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
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, steps, appPrefix }) => {
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

  const login = (user: User) => {
    setUser(user);
    Cookies.set(`${appPrefix}_user`, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(`${appPrefix}_user`);
    Cookies.remove('global_user');
    window.location.href = '/login';
  };

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
