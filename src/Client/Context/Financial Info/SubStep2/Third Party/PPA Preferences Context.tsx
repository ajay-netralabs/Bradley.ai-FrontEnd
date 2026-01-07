import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface PPAPreferencesState {
  electricityRate: string;
  thermalRate: string;
  ppaTerm: number;
  escalationRate: number;
}

interface PPAPreferencesContextType {
  ppaPreferencesState: PPAPreferencesState;
  updateField: (field: keyof PPAPreferencesState, value: string | number) => void;
}

const PPAPreferencesContext = createContext<PPAPreferencesContextType | undefined>(undefined);

export const usePPAPreferences = () => {
  const context = useContext(PPAPreferencesContext);
  if (!context) {
    throw new Error('usePPAPreferences must be used within a PPAPreferencesProvider');
  }
  return context;
};

const defaultState: PPAPreferencesState = {
  electricityRate: '',
  thermalRate: '',
  ppaTerm: 10,
  escalationRate: 0.5,
};

export const PPAPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ppaPreferencesState, setPPAPreferencesState] = useState<PPAPreferencesState>(() => {
    const savedState = Cookies.get('ppaPreferencesState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('ppaPreferencesState', JSON.stringify(ppaPreferencesState));
  }, [ppaPreferencesState]);

  const updateField = (field: keyof PPAPreferencesState, value: string | number) => {
    setPPAPreferencesState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <PPAPreferencesContext.Provider value={{ ppaPreferencesState, updateField }}>
      {children}
    </PPAPreferencesContext.Provider>
  );
};