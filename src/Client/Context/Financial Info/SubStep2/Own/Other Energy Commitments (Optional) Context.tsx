import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface OtherEnergyCommitmentsState {
  commitmentsText: string;
}

interface OtherEnergyCommitmentsContextType {
  otherEnergyCommitmentsState: OtherEnergyCommitmentsState;
  updateField: (field: keyof OtherEnergyCommitmentsState, value: string) => void;
}

const OtherEnergyCommitmentsContext = createContext<OtherEnergyCommitmentsContextType | undefined>(undefined);

export const useOtherEnergyCommitments = () => {
  const context = useContext(OtherEnergyCommitmentsContext);
  if (!context) {
    throw new Error('useOtherEnergyCommitments must be used within an OtherEnergyCommitmentsProvider');
  }
  return context;
};

const defaultState: OtherEnergyCommitmentsState = {
  commitmentsText: '',
};

export const OtherEnergyCommitmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [otherEnergyCommitmentsState, setOtherEnergyCommitmentsState] = useState<OtherEnergyCommitmentsState>(() => {
    const savedState = Cookies.get('otherEnergyCommitmentsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('otherEnergyCommitmentsState', JSON.stringify(otherEnergyCommitmentsState));
  }, [otherEnergyCommitmentsState]);

  const updateField = (field: keyof OtherEnergyCommitmentsState, value: string) => {
    setOtherEnergyCommitmentsState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <OtherEnergyCommitmentsContext.Provider value={{ otherEnergyCommitmentsState, updateField }}>
      {children}
    </OtherEnergyCommitmentsContext.Provider>
  );
};