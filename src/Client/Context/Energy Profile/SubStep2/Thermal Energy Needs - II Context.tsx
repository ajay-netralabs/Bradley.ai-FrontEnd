import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface ThermalEnergyNeedsIIState {
  showHotWaterHVAC: boolean;
  showHotWaterBoilers: boolean;
  showSteam2HWDomestic: boolean;
  showSteam2HWAHU: boolean;
  showSteam4Washdowns: boolean;
  hotWaterUsage: string;
  hotWaterTemperature: string;
  hotWaterUsageTypeAmount: string;
  hotWaterUsageTypeReason: string;
  preheatForSteam: string;
  foodWashdowns: string;
  otherUsage: string;
  boilerCapacity: string;
  boilerBHP: string;
  boilerType: string;
  boilerModulation: string;
  boilerCount: string;
  bhpBoilerCount: string;
}

interface ThermalEnergyNeedsIIContextType {
  thermalNeedsIIState: ThermalEnergyNeedsIIState;
  updateField: (field: keyof ThermalEnergyNeedsIIState, value: string | boolean) => void;
}

const ThermalEnergyNeedsIIContext = createContext<ThermalEnergyNeedsIIContextType | undefined>(undefined);

export const useThermalEnergyNeedsII = () => {
  const context = useContext(ThermalEnergyNeedsIIContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsII must be used within a ThermalEnergyNeedsIIProvider');
  }
  return context;
};

const defaultState: ThermalEnergyNeedsIIState = {
  showHotWaterHVAC: false,
  showHotWaterBoilers: false,
  showSteam2HWDomestic: false,
  showSteam2HWAHU: false,
  showSteam4Washdowns: false,
  hotWaterUsage: '',
  hotWaterTemperature: '',
  hotWaterUsageTypeAmount: '',
  hotWaterUsageTypeReason: '',
  preheatForSteam: '',
  foodWashdowns: '',
  otherUsage: '',
  boilerCapacity: '',
  boilerBHP: '',
  boilerType: 'Select Boiler Type',
  boilerModulation: 'Select',
  boilerCount: '',
  bhpBoilerCount: '',
};

export const ThermalEnergyNeedsIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thermalNeedsIIState, setThermalNeedsIState] = useState<ThermalEnergyNeedsIIState>(() => {
    const savedState = localStorage.getItem('thermalEnergyNeedsIIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('thermalEnergyNeedsIIState', JSON.stringify(thermalNeedsIIState));
  }, [thermalNeedsIIState]);

  const updateField = (field: keyof ThermalEnergyNeedsIIState, value: string | boolean) => {
    setThermalNeedsIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <ThermalEnergyNeedsIIContext.Provider value={{ thermalNeedsIIState, updateField }}>
      {children}
    </ThermalEnergyNeedsIIContext.Provider>
  );
};