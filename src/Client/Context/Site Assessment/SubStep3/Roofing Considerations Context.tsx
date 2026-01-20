import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface RoofingConsiderationsState {
  roofPenetration: string;
  roofWarrantyTerm: string;
  roofCondition: string;
  insuranceProvider: string;
  policyId: string;
}

interface RoofingConsiderationsContextType {
  roofingConsiderationsState: RoofingConsiderationsState;
  updateField: (field: keyof RoofingConsiderationsState, value: string) => void;
}

const RoofingConsiderationsContext = createContext<RoofingConsiderationsContextType | undefined>(undefined);

export const useRoofingConsiderations = () => {
  const context = useContext(RoofingConsiderationsContext);
  if (!context) {
    throw new Error('useRoofingConsiderations must be used within a RoofingConsiderationsProvider');
  }
  return context;
};

const defaultState: RoofingConsiderationsState = {
  roofPenetration: '',
  roofWarrantyTerm: '',
  roofCondition: '',
  insuranceProvider: '',
  policyId: '',
};

export const RoofingConsiderationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [roofingConsiderationsState, setRoofingConsiderationsState] = useState<RoofingConsiderationsState>(() => {
    const savedState = localStorage.getItem('roofingConsiderationsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('roofingConsiderationsState', JSON.stringify(roofingConsiderationsState));
  }, [roofingConsiderationsState]);

  const updateField = (field: keyof RoofingConsiderationsState, value: string) => {
    setRoofingConsiderationsState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <RoofingConsiderationsContext.Provider value={{ roofingConsiderationsState, updateField }}>
      {children}
    </RoofingConsiderationsContext.Provider>
  );
};