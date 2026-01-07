import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AdditionalPPAPreferencesState {
  preferencesText: string;
}

interface AdditionalPPAPreferencesContextType {
  additionalPPAPreferencesState: AdditionalPPAPreferencesState;
  updateField: (field: keyof AdditionalPPAPreferencesState, value: string) => void;
}

const AdditionalPPAPreferencesContext = createContext<AdditionalPPAPreferencesContextType | undefined>(undefined);

export const useAdditionalPPAPreferences = () => {
  const context = useContext(AdditionalPPAPreferencesContext);
  if (!context) {
    throw new Error('useAdditionalPPAPreferences must be used within an AdditionalPPAPreferencesProvider');
  }
  return context;
};

const defaultState: AdditionalPPAPreferencesState = {
  preferencesText: '',
};

export const AdditionalPPAPreferencesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [additionalPPAPreferencesState, setAdditionalPPAPreferencesState] = useState<AdditionalPPAPreferencesState>(() => {
    const savedState = Cookies.get('additionalPPAPreferencesState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('additionalPPAPreferencesState', JSON.stringify(additionalPPAPreferencesState));
  }, [additionalPPAPreferencesState]);

  const updateField = (field: keyof AdditionalPPAPreferencesState, value: string) => {
    setAdditionalPPAPreferencesState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <AdditionalPPAPreferencesContext.Provider value={{ additionalPPAPreferencesState, updateField }}>
      {children}
    </AdditionalPPAPreferencesContext.Provider>
  );
};