import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface OtherSiteCharacteristicsState {
  uniqueFeatures: string;
  topography: string;
  primaryVoltageService: string;
  primaryVoltageServiceCustomValue?: string;
  primaryVoltageFacility: string;
  primaryVoltageFacilityCustomValue?: string;
  secondaryVoltageService: string;
  secondaryVoltageServiceCustomValue?: string;
}

interface OtherSiteCharacteristicsContextType {
  otherCharacteristicsState: OtherSiteCharacteristicsState;
  updateField: (field: keyof OtherSiteCharacteristicsState, value: string) => void;
}

const OtherSiteCharacteristicsContext = createContext<OtherSiteCharacteristicsContextType | undefined>(undefined);

export const useOtherSiteCharacteristics = () => {
  const context = useContext(OtherSiteCharacteristicsContext);
  if (!context) {
    throw new Error('useOtherSiteCharacteristics must be used within a OtherSiteCharacteristicsProvider');
  }
  return context;
};

const defaultState: OtherSiteCharacteristicsState = {
  uniqueFeatures: '',
  topography: 'Option 1',
  primaryVoltageService: 'Option 0',
  primaryVoltageServiceCustomValue: '',
  primaryVoltageFacility: 'Option 0',
  primaryVoltageFacilityCustomValue: '',
  secondaryVoltageService: 'Option 0',
  secondaryVoltageServiceCustomValue: '',
};

export const OtherSiteCharacteristicsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [otherCharacteristicsState, setOtherCharacteristicsState] = useState<OtherSiteCharacteristicsState>(() => {
    const savedState = localStorage.getItem('otherCharacteristicsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('otherCharacteristicsState', JSON.stringify(otherCharacteristicsState));
  }, [otherCharacteristicsState]);

  const updateField = (field: keyof OtherSiteCharacteristicsState, value: string) => {
    setOtherCharacteristicsState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <OtherSiteCharacteristicsContext.Provider value={{ otherCharacteristicsState, updateField }}>
      {children}
    </OtherSiteCharacteristicsContext.Provider>
  );
};