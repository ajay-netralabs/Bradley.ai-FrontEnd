import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface ExistingContractsIState {
  hasThirdPartyContract: boolean;
  supplierName: string;
  contractEndDate: string;
  terminationFee: string;
  electricityTakeAmount: string;
}

interface ExistingContractsIContextType {
  existingContractsIState: ExistingContractsIState;
  updateField: (field: keyof ExistingContractsIState, value: string | boolean) => void;
}

const ExistingContractsIContext = createContext<ExistingContractsIContextType | undefined>(undefined);

export const useExistingContractsI = () => {
  const context = useContext(ExistingContractsIContext);
  if (!context) {
    throw new Error('useExistingContractsI must be used within an ExistingContractsIProvider');
  }
  return context;
};

const defaultState: ExistingContractsIState = {
  hasThirdPartyContract: false,
  supplierName: '',
  contractEndDate: '',
  terminationFee: '',
  electricityTakeAmount: '',
};

export const ExistingContractsIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [existingContractsIState, setExistingContractsIState] = useState<ExistingContractsIState>(() => {
    const savedState = Cookies.get('existingContractsIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('existingContractsIState', JSON.stringify(existingContractsIState));
  }, [existingContractsIState]);

  const updateField = (field: keyof ExistingContractsIState, value: string | boolean) => {
    setExistingContractsIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ExistingContractsIContext.Provider value={{ existingContractsIState, updateField }}>
      {children}
    </ExistingContractsIContext.Provider>
  );
};