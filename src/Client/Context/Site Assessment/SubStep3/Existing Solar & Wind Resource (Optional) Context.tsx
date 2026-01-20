import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface ExistingAssetsState {
  existingSolar: string;
  existingWind: string;
  considerWind: string;
}

interface ExistingAssetsContextType {
  existingAssetsState: ExistingAssetsState;
  updateField: (field: keyof ExistingAssetsState, value: string) => void;
}

const ExistingAssetsContext = createContext<ExistingAssetsContextType | undefined>(undefined);

export const useExistingAssets = () => {
  const context = useContext(ExistingAssetsContext);
  if (!context) {
    throw new Error('useExistingAssets must be used within a ExistingAssetsProvider');
  }
  return context;
};

const defaultState: ExistingAssetsState = {
  existingSolar: '',
  existingWind: '',
  considerWind: '',
};

export const ExistingAssetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [existingAssetsState, setExistingAssetsState] = useState<ExistingAssetsState>(() => {
    const savedState = localStorage.getItem('existingAssetsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('existingAssetsState', JSON.stringify(existingAssetsState));
  }, [existingAssetsState]);

  const updateField = (field: keyof ExistingAssetsState, value: string) => {
    setExistingAssetsState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ExistingAssetsContext.Provider value={{ existingAssetsState, updateField }}>
      {children}
    </ExistingAssetsContext.Provider>
  );
};