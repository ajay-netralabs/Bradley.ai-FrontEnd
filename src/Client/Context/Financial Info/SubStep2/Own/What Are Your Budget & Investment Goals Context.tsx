import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface BudgetGoalsState {
  yearBudget: string[];
  availableFunds: string;
  simplePayback: string;
}

interface BudgetGoalsContextType {
  budgetGoalsState: BudgetGoalsState;
  updateField: (field: keyof Omit<BudgetGoalsState, 'yearBudget'>, value: string) => void;
  updateYearBudget: (index: number, value: string) => void;
  addYearBudget: () => void;
  removeYearBudget: (index: number) => void;
}

const BudgetGoalsContext = createContext<BudgetGoalsContextType | undefined>(undefined);

export const useBudgetGoals = () => {
  const context = useContext(BudgetGoalsContext);
  if (!context) {
    throw new Error('useBudgetGoals must be used within a BudgetGoalsProvider');
  }
  return context;
};

const defaultState: BudgetGoalsState = {
  yearBudget: ['', '', ''],
  availableFunds: 'no',
  simplePayback: 'default',
};

export const BudgetGoalsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [budgetGoalsState, setBudgetGoalsState] = useState<BudgetGoalsState>(() => {
    const savedState = Cookies.get('budgetGoalsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('budgetGoalsState', JSON.stringify(budgetGoalsState));
  }, [budgetGoalsState]);

  const updateField = (field: keyof Omit<BudgetGoalsState, 'yearBudget'>, value: string) => {
    setBudgetGoalsState(prevState => {
      const newState = {...prevState, [field]: value};
      if (field === 'availableFunds' && value === 'no') {
        newState.yearBudget = defaultState.yearBudget; // Reset budget fields if 'No' is selected
      }
      return newState;
    });
  };

  const updateYearBudget = (index: number, value: string) => {
    setBudgetGoalsState(prevState => {
      const newBudgets = [...prevState.yearBudget];
      newBudgets[index] = value;
      return { ...prevState, yearBudget: newBudgets };
    });
  };

  const addYearBudget = () => {
    setBudgetGoalsState(prevState => ({
      ...prevState,
      yearBudget: [...prevState.yearBudget, ''],
    }));
  };

  const removeYearBudget = (index: number) => {
    setBudgetGoalsState(prevState => ({
      ...prevState,
      yearBudget: prevState.yearBudget.filter((_, i) => i !== index),
    }));
  };

  return (
    <BudgetGoalsContext.Provider value={{ budgetGoalsState, updateField, addYearBudget, removeYearBudget, updateYearBudget }}>
      {children}
    </BudgetGoalsContext.Provider>
  );
};