import React, { createContext, useContext, useState, useEffect } from 'react';
import { steps, TOTAL_STEPS } from './components/steps';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [currentFurtherSubStep, setCurrentFurtherSubStep] = useState(0);

  const [visitedSteps, setVisitedSteps] = useState(
    Array.from({ length: TOTAL_STEPS }, (_, i) =>
      Array.from({ length: steps[i].subSteps }, (_, j) => i === 0 && j === 0)
    )
  );

  const [completedSubSteps, setCompletedSubSteps] = useState(
    Array.from({ length: TOTAL_STEPS }, (_, i) =>
      Array.from({ length: steps[i].subSteps }, () => false)
    )
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    // You can also store a token if needed, e.g., localStorage.setItem('token', 'your-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // You can also handle any token clearing or additional logout logic here
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
