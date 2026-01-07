import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FinancialsIState {
  acceptableIRR: string;
  minimumROI: string;
  paybackPeriod: string;
}

interface FinancialsIContextType {
  financialsIState: FinancialsIState;
  updateField: (field: keyof FinancialsIState, value: string) => void;
}

const FinancialsIContext = createContext<FinancialsIContextType | undefined>(undefined);

export const useFinancialsI = () => {
  const context = useContext(FinancialsIContext);
  if (!context) {
    throw new Error('useFinancialsI must be used within a FinancialsIProvider');
  }
  return context;
};

const defaultState: FinancialsIState = {
  acceptableIRR: '10', // Set default to 10 as in the original component
  minimumROI: '',
  paybackPeriod: '',
};

export const FinancialsIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financialsIState, setFinancialsIState] = useState<FinancialsIState>(() => {
    const savedState = Cookies.get('financialsIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('financialsIState', JSON.stringify(financialsIState));
  }, [financialsIState]);

  const updateField = (field: keyof FinancialsIState, value: string) => {
    setFinancialsIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <FinancialsIContext.Provider value={{ financialsIState, updateField }}>
      {children}
    </FinancialsIContext.Provider>
  );
};