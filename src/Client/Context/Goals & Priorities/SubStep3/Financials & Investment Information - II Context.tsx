import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FinancialsIIState {
  investmentAmounts: string[];
  financeOption: string;
  financeDetails: string;
  desiredCostReduction: string;
  preferredTerm: string;
}

interface FinancialsIIContextType {
  financialsIIState: FinancialsIIState;
  updateField: (field: keyof Omit<FinancialsIIState, 'investmentAmounts'>, value: string) => void;
  updateInvestmentAmount: (index: number, value: string) => void;
  addInvestmentAmount: () => void;
  removeInvestmentAmount: (index: number) => void;
}

const FinancialsIIContext = createContext<FinancialsIIContextType | undefined>(undefined);

export const useFinancialsII = () => {
  const context = useContext(FinancialsIIContext);
  if (!context) {
    throw new Error('useFinancialsII must be used within a FinancialsIIProvider');
  }
  return context;
};

const defaultState: FinancialsIIState = {
  investmentAmounts: ['', '', ''],
  financeOption: 'default',
  financeDetails: '',
  desiredCostReduction: '',
  preferredTerm: '',
};

export const FinancialsIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [financialsIIState, setFinancialsIIState] = useState<FinancialsIIState>(() => {
    const savedState = Cookies.get('financialsIIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('financialsIIState', JSON.stringify(financialsIIState));
  }, [financialsIIState]);

  const updateField = (field: keyof Omit<FinancialsIIState, 'investmentAmounts'>, value: string) => {
    setFinancialsIIState(prevState => ({ ...prevState, [field]: value }));
  };

  const updateInvestmentAmount = (index: number, value: string) => {
    setFinancialsIIState(prevState => {
      const newAmounts = [...prevState.investmentAmounts];
      newAmounts[index] = value;
      return { ...prevState, investmentAmounts: newAmounts };
    });
  };

  const addInvestmentAmount = () => {
    setFinancialsIIState(prevState => ({
      ...prevState,
      investmentAmounts: [...prevState.investmentAmounts, ''],
    }));
  };

  const removeInvestmentAmount = (index: number) => {
    setFinancialsIIState(prevState => ({
      ...prevState,
      investmentAmounts: prevState.investmentAmounts.filter((_, i) => i !== index),
    }));
  };

  return (
    <FinancialsIIContext.Provider value={{ financialsIIState, updateField, addInvestmentAmount, removeInvestmentAmount, updateInvestmentAmount }}>
      {children}
    </FinancialsIIContext.Provider>
  );
};