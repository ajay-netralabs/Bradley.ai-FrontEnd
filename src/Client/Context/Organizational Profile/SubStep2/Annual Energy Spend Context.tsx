// src/Context/AnnualEnergySpendContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// 1. Expand the interface to include all form fields
interface AnnualEnergySpend {
  electricity: string;
  naturalGas: string;
  water: string;
  oil: string;
  propane: string;
  steam: string;
  chilledWater: string;
  other: string;
  otherLabel: string; // Add a field for the "Other" label
}

interface AnnualEnergySpendContextType {
  annualEnergySpend: AnnualEnergySpend;
  updateAnnualEnergySpend: (spend: Partial<AnnualEnergySpend>) => void;
}

const AnnualEnergySpendContext = createContext<AnnualEnergySpendContextType | undefined>(undefined);

export const useAnnualEnergySpend = () => {
  const context = useContext(AnnualEnergySpendContext);
  if (!context) {
    throw new Error('useAnnualEnergySpend must be used within an AnnualEnergySpendProvider');
  }
  return context;
};

interface AnnualEnergySpendProviderProps {
  children: ReactNode;
}

export const AnnualEnergySpendProvider: React.FC<AnnualEnergySpendProviderProps> = ({ children }) => {
  // 2. Initialize state from cookies with the new, expanded shape
  const [annualEnergySpend, setAnnualEnergySpend] = useState<AnnualEnergySpend>(() => {
    const savedSpend = localStorage.getItem('annualEnergySpend');
    return savedSpend ? JSON.parse(savedSpend) : {
      electricity: '',
      naturalGas: '',
      water: '',
      oil: '',
      propane: '',
      steam: '',
      chilledWater: '',
      other: '',
      otherLabel: '', // Initialize the new field
    };
  });

  // This useEffect will automatically save the expanded state to cookies
  useEffect(() => {
    localStorage.setItem('annualEnergySpend', JSON.stringify(annualEnergySpend));
  }, [annualEnergySpend]);

  const updateAnnualEnergySpend = (spend: Partial<AnnualEnergySpend>) => {
    setAnnualEnergySpend((prevSpend) => ({ ...prevSpend, ...spend }));
  };

  return (
    <AnnualEnergySpendContext.Provider value={{ annualEnergySpend, updateAnnualEnergySpend }}>
      {children}
    </AnnualEnergySpendContext.Provider>
  );
};