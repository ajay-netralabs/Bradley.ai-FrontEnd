import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface WasteHeatSource {
  type: string;
  temperature: string;
  flowRate: string;
  utilization: string;
}

interface ThermalEnergyNeedsIVState {
  showWasteHeat: boolean;
  wasteHeatSources: WasteHeatSource[];
  benefitFromUtilization: string;
}

interface ThermalEnergyNeedsIVContextType {
  thermalNeedsIVState: ThermalEnergyNeedsIVState;
  updateField: (field: keyof ThermalEnergyNeedsIVState, value: string | boolean) => void;
  addWasteHeatSource: () => void;
  removeWasteHeatSource: (index: number) => void;
  updateWasteHeatSourceField: (index: number, field: keyof WasteHeatSource, value: string) => void;
}

const ThermalEnergyNeedsIVContext = createContext<ThermalEnergyNeedsIVContextType | undefined>(undefined);

export const useThermalEnergyNeedsIV = () => {
  const context = useContext(ThermalEnergyNeedsIVContext);
  if (!context) {
    throw new Error('useThermalEnergyNeedsIV must be used within a ThermalEnergyNeedsIVProvider');
  }
  return context;
};

const defaultState: ThermalEnergyNeedsIVState = {
  showWasteHeat: false,
  wasteHeatSources: [{ type: '', temperature: '', flowRate: '', utilization: '' }],
  benefitFromUtilization: 'Option 1',
};

export const ThermalEnergyNeedsIVProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [thermalNeedsIVState, setThermalNeedsIVState] = useState<ThermalEnergyNeedsIVState>(() => {
    const savedState = Cookies.get('thermalEnergyNeedsIVState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('thermalEnergyNeedsIVState', JSON.stringify(thermalNeedsIVState));
  }, [thermalNeedsIVState]);

  const updateField = (field: keyof ThermalEnergyNeedsIVState, value: string | boolean) => {
    setThermalNeedsIVState(prevState => ({ ...prevState, [field]: value }));
  };

  const addWasteHeatSource = () => {
    setThermalNeedsIVState(prevState => ({
      ...prevState,
      wasteHeatSources: [...prevState.wasteHeatSources, { type: '', temperature: '', flowRate: '', utilization: '' }],
    }));
  };

  const removeWasteHeatSource = (index: number) => {
    setThermalNeedsIVState(prevState => ({
      ...prevState,
      wasteHeatSources: prevState.wasteHeatSources.filter((_, i) => i !== index),
    }));
  };

  const updateWasteHeatSourceField = (index: number, field: keyof WasteHeatSource, value: string) => {
    setThermalNeedsIVState(prevState => ({
      ...prevState,
      wasteHeatSources: prevState.wasteHeatSources.map((source, i) =>
        i === index ? { ...source, [field]: value } : source
      ),
    }));
  };

  return (
    <ThermalEnergyNeedsIVContext.Provider value={{ thermalNeedsIVState, updateField, addWasteHeatSource, removeWasteHeatSource, updateWasteHeatSourceField }}>
      {children}
    </ThermalEnergyNeedsIVContext.Provider>
  );
};