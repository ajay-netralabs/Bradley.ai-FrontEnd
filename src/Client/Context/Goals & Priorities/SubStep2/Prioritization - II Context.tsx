import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface Target {
  value: string;
  unit: string;
  date: string;
}

export interface PrioritizationIIState {
  resiliencyIncrease: number;
  scope2Reduction: number;
  costReduction: number;
  renewableGeneration: number; 
  blackStartCapability: string;
  islandModeCapability: string;
  gridIndependentDuration: string;
  backupPowerDuration: string;
  renewableSystemSize: string;
  decarbonizationTarget1: Target;
  decarbonizationTarget2: Target;
  energySavingsTarget: Target;
}

interface PrioritizationIIContextType {
  prioritizationIIState: PrioritizationIIState;
  updateField: (field: keyof PrioritizationIIState, value: string | number) => void;
  updateTargetField: (target: 'decarbonizationTarget1' | 'decarbonizationTarget2' | 'energySavingsTarget', field: keyof Target, value: string) => void;
}

const PrioritizationIIContext = createContext<PrioritizationIIContextType | undefined>(undefined);

export const usePrioritizationII = () => {
  const context = useContext(PrioritizationIIContext);
  if (!context) {
    throw new Error('usePrioritizationII must be used within a PrioritizationIIProvider');
  }
  return context;
};

const defaultState: PrioritizationIIState = {
  resiliencyIncrease: 50,
  scope2Reduction: 50,
  costReduction: 50,
  renewableGeneration: 50,
  blackStartCapability: '',
  islandModeCapability: '',
  gridIndependentDuration: '',
  backupPowerDuration: '',
  renewableSystemSize: '',
  decarbonizationTarget1: { value: '', unit: '%', date: '' },
  decarbonizationTarget2: { value: '', unit: '%', date: '' },
  energySavingsTarget: { value: '', unit: '%', date: '' },
};

export const PrioritizationIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prioritizationIIState, setPrioritizationIIState] = useState<PrioritizationIIState>(() => {
    const savedState = localStorage.getItem('prioritizationIIState');
    return savedState ? { ...defaultState, ...JSON.parse(savedState) } : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('prioritizationIIState', JSON.stringify(prioritizationIIState));
  }, [prioritizationIIState]);

  const updateField = (field: keyof PrioritizationIIState, value: string | number) => {
    setPrioritizationIIState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const updateTargetField = (
    target: 'decarbonizationTarget1' | 'decarbonizationTarget2' | 'energySavingsTarget',
    field: keyof Target,
    value: string
  ) => {
    setPrioritizationIIState(prevState => ({
      ...prevState,
      [target]: {
        ...prevState[target],
        [field]: value
      }
    }));
  };

  return (
    <PrioritizationIIContext.Provider value={{ prioritizationIIState, updateField, updateTargetField }}>
      {children}
    </PrioritizationIIContext.Provider>
  );
};