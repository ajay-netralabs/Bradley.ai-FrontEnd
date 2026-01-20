import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface FinancialPreferencesState {
  taxAppetite: string;
  taxAppetiteReturnDate: string;
  depreciationMethod: string;
  taxRate: number;
}

interface FinancialPreferencesContextType {
  financialPreferencesState: FinancialPreferencesState;
  updateField: (field: keyof FinancialPreferencesState, value: string | number) => void;
}

const FinancialPreferencesContext = createContext<FinancialPreferencesContextType | undefined>(undefined);

export const useFinancialPreferences = () => {
  const context = useContext(FinancialPreferencesContext);
  if (!context) {
    throw new Error('useFinancialPreferences must be used within a FinancialPreferencesProvider');
  }
  return context;
};

const defaultState: FinancialPreferencesState = {
  taxAppetite: 'yes',
  taxAppetiteReturnDate: '',
  depreciationMethod: 'default',
  taxRate: 24,
};

export const FinancialPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financialPreferencesState, setFinancialPreferencesState] = useState<FinancialPreferencesState>(() => {
    const savedState = localStorage.getItem('financialPreferencesState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('financialPreferencesState', JSON.stringify(financialPreferencesState));
  }, [financialPreferencesState]);

  const updateField = (field: keyof FinancialPreferencesState, value: string | number) => {
    setFinancialPreferencesState(prevState => {
        const newState = { ...prevState, [field]: value };
        if (field === 'taxAppetite' && value === 'yes') {
            newState.taxAppetiteReturnDate = '';
        }
        return newState;
    });
  };

  return (
    <FinancialPreferencesContext.Provider value={{ financialPreferencesState, updateField }}>
      {children}
    </FinancialPreferencesContext.Provider>
  );
};