import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface FinancingPreferencesState {
  selectedOption: string;
  otherText: string;
}

interface FinancingPreferencesContextType {
  financingPreferencesState: FinancingPreferencesState;
  updateField: (field: keyof FinancingPreferencesState, value: string) => void;
}

const FinancingPreferencesContext = createContext<FinancingPreferencesContextType | undefined>(undefined);

export const useFinancingPreferences = () => {
  const context = useContext(FinancingPreferencesContext);
  if (!context) {
    throw new Error('useFinancingPreferences must be used within a FinancingPreferencesProvider');
  }
  return context;
};

const defaultState: FinancingPreferencesState = {
  selectedOption: '',
  otherText: '',
};

export const FinancingPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financingPreferencesState, setFinancingPreferencesState] = useState<FinancingPreferencesState>(() => {
    const savedState = localStorage.getItem('financingPreferencesState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('financingPreferencesState', JSON.stringify(financingPreferencesState));
  }, [financingPreferencesState]);

  const updateField = (field: keyof FinancingPreferencesState, value: string) => {
    setFinancingPreferencesState(prevState => {
      const newState = { ...prevState, [field]: value };
      if (field === 'selectedOption' && value !== 'other') {
        newState.otherText = '';
      }
      return newState;
    });
  };

  return (
    <FinancingPreferencesContext.Provider value={{ financingPreferencesState, updateField }}>
      {children}
    </FinancingPreferencesContext.Provider>
  );
};