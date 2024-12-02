import React, { createContext, useContext, useState } from 'react';
import { steps, TOTAL_STEPS } from './components/steps';

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
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
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

    return (
        <AppContext.Provider value={{
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
        }}>
            {children}
        </AppContext.Provider>
    );
};