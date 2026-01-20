import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface ThermalEnergyNeedsIState {
  showSteam: boolean;
  annualSteamUsage: string;
  steamPressureRange: string;
  exactSteamPressure: string;
  steamUsageConsistency: string;
  condensateReturn: string;
  returnFLOW: string;
  returnCondensateTemperature: string;
  makeUpWater: string;
}

interface ThermalEnergyNeedsIContextType {
  thermalNeedsIState: ThermalEnergyNeedsIState;
  updateField: (field: keyof ThermalEnergyNeedsIState, value: string | boolean) => void;
}

const ThermalEnergyNeedsIContext = createContext<ThermalEnergyNeedsIContextType | undefined>(undefined);

export const useThermalEnergyNeedsI = () => {
  const context = useContext(ThermalEnergyNeedsIContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsI must be used within a ThermalEnergyNeedsIProvider');
  }
  return context;
};

const defaultState: ThermalEnergyNeedsIState = {
  showSteam: false,
  annualSteamUsage: '',
  steamPressureRange: '0.5-15',
  exactSteamPressure: '',
  steamUsageConsistency: 'select',
  condensateReturn: '',
  returnFLOW: '',
  returnCondensateTemperature: '',
  makeUpWater: '',
};

export const ThermalEnergyNeedsIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thermalNeedsIState, setThermalNeedsIState] = useState<ThermalEnergyNeedsIState>(() => {
    const savedState = localStorage.getItem('thermalEnergyNeedsIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('thermalEnergyNeedsIState', JSON.stringify(thermalNeedsIState));
  }, [thermalNeedsIState]);

  const updateField = (field: keyof ThermalEnergyNeedsIState, value: string | boolean) => {
    setThermalNeedsIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ThermalEnergyNeedsIContext.Provider value={{ thermalNeedsIState, updateField }}>
      {children}
    </ThermalEnergyNeedsIContext.Provider>
  );
};