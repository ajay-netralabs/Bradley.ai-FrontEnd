import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface SolarAssetsState {
  roofSections: string[];
  roofLoadCapacity: string;
  buildingClassification: string;
}

interface SolarAssetsContextType {
  solarAssetsState: SolarAssetsState;
  updateField: (field: keyof Omit<SolarAssetsState, 'roofSections'>, value: string) => void;
  updateRoofSection: (index: number, value: string) => void;
  addRoofSection: () => void;
  removeRoofSection: (index: number) => void;
}

const SolarAssetsContext = createContext<SolarAssetsContextType | undefined>(undefined);

export const useSolarAssets = () => {
  const context = useContext(SolarAssetsContext);
  if (!context) {
    throw new Error('useSolarAssets must be used within a SolarAssetsProvider');
  }
  return context;
};

const defaultState: SolarAssetsState = {
  roofSections: ['', '', ''],
  roofLoadCapacity: '',
  buildingClassification: 'default',
};

export const SolarAssetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [solarAssetsState, setSolarAssetsState] = useState<SolarAssetsState>(() => {
    const savedState = localStorage.getItem('solarAssetsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('solarAssetsState', JSON.stringify(solarAssetsState));
  }, [solarAssetsState]);

  const updateField = (field: keyof Omit<SolarAssetsState, 'roofSections'>, value: string) => {
    setSolarAssetsState(prevState => ({ ...prevState, [field]: value }));
  };

  const updateRoofSection = (index: number, value: string) => {
    setSolarAssetsState(prevState => {
      const newSections = [...prevState.roofSections];
      newSections[index] = value;
      return { ...prevState, roofSections: newSections };
    });
  };

  const addRoofSection = () => {
    setSolarAssetsState(prevState => ({
      ...prevState,
      roofSections: [...prevState.roofSections, ''],
    }));
  };

  const removeRoofSection = (index: number) => {
    setSolarAssetsState(prevState => ({
      ...prevState,
      roofSections: prevState.roofSections.filter((_, i) => i !== index),
    }));
  };

  return (
    <SolarAssetsContext.Provider value={{ solarAssetsState, updateField, addRoofSection, removeRoofSection, updateRoofSection }}>
      {children}
    </SolarAssetsContext.Provider>
  );
};