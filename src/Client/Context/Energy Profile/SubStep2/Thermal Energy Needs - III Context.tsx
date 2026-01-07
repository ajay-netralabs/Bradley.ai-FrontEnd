import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface ThermalEnergyNeedsIIIState {
  showChilledWater: boolean;
  chilledCapacity: string;
  coolingTonHours: string;
  temperatureLeaving: string;
  additionalDemand: string;
  temperatureReturning: string;
  pumpHp: string;
  pumpCount: string;
}

interface ThermalEnergyNeedsIIIContextType {
  thermalNeedsIIIState: ThermalEnergyNeedsIIIState;
  updateField: (field: keyof ThermalEnergyNeedsIIIState, value: string | boolean) => void;
}

const ThermalEnergyNeedsIIIContext = createContext<ThermalEnergyNeedsIIIContextType | undefined>(undefined);

export const useThermalEnergyNeedsIII = () => {
  const context = useContext(ThermalEnergyNeedsIIIContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsIII must be used within a ThermalEnergyNeedsIIIProvider');
  }
  return context;
};

const defaultState: ThermalEnergyNeedsIIIState = {
  showChilledWater: false,
  chilledCapacity: "",
  coolingTonHours: "",
  temperatureLeaving: "",
  additionalDemand: "",
  temperatureReturning: "",
  pumpHp: "",
  pumpCount: "",
};

export const ThermalEnergyNeedsIIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thermalNeedsIIIState, setThermalNeedsIState] = useState<ThermalEnergyNeedsIIIState>(() => {
    const savedState = Cookies.get('thermalEnergyNeedsIIIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('thermalEnergyNeedsIIIState', JSON.stringify(thermalNeedsIIIState));
  }, [thermalNeedsIIIState]);

  const updateField = (field: keyof ThermalEnergyNeedsIIIState, value: string | boolean) => {
    setThermalNeedsIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ThermalEnergyNeedsIIIContext.Provider value={{ thermalNeedsIIIState, updateField }}>
      {children}
    </ThermalEnergyNeedsIIIContext.Provider>
  );
};