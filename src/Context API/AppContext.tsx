import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { steps, TOTAL_STEPS } from '../components/steps';

interface User {
  role: 'client' | 'analyst';
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
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(() => Number(Cookies.get('currentStep') || 0));
  const [currentSubStep, setCurrentSubStep] = useState(() => Number(Cookies.get('currentSubStep') || 0));
  const [currentFurtherSubStep, setCurrentFurtherSubStep] = useState(() => Number(Cookies.get('currentFurtherSubStep') || 0));

  const [visitedSteps, setVisitedSteps] = useState(() => {
    const savedVisitedSteps = Cookies.get('visitedSteps');
    return savedVisitedSteps
      ? JSON.parse(savedVisitedSteps)
      : Array.from({ length: TOTAL_STEPS }, (_, i) =>
          Array.from({ length: steps[i].subSteps }, (_, j) => i === 0 && j === 0)
        );
  });

  const [completedSubSteps, setCompletedSubSteps] = useState(() => {
    const savedCompletedSubSteps = Cookies.get('completedSubSteps');
    return savedCompletedSubSteps
      ? JSON.parse(savedCompletedSubSteps)
      : Array.from({ length: TOTAL_STEPS }, (_, i) =>
          Array.from({ length: steps[i].subSteps }, () => false)
        );
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = Cookies.get('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    Cookies.set('currentStep', currentStep.toString());
    Cookies.set('currentSubStep', currentSubStep.toString());
    Cookies.set('currentFurtherSubStep', currentFurtherSubStep.toString());
    Cookies.set('visitedSteps', JSON.stringify(visitedSteps));
    Cookies.set('completedSubSteps', JSON.stringify(completedSubSteps));
    if (user) {
      Cookies.set('user', JSON.stringify(user));
    } else {
      Cookies.remove('user');
    }
  }, [currentStep, currentSubStep, currentFurtherSubStep, visitedSteps, completedSubSteps, user]);

  const login = (user: User) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
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
