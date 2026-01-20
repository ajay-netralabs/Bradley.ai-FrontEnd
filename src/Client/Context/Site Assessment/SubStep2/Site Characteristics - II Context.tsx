import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface SiteCharacteristicsIIState {
  shifts: string;
  humidification: string;
  hotColdSpots: string;
  outdoorAirSupply: string;
  hvacOperation: string;
}

interface SiteCharacteristicsIIContextType {
  siteCharacteristicsIIState: SiteCharacteristicsIIState;
  updateField: (field: keyof SiteCharacteristicsIIState, value: string) => void;
}

const SiteCharacteristicsIIContext = createContext<SiteCharacteristicsIIContextType | undefined>(undefined);

export const useSiteCharacteristicsII = () => {
  const context = useContext(SiteCharacteristicsIIContext);
  if (!context) {
    throw new Error('useSiteCharacteristicsII must be used within a SiteCharacteristicsIIProvider');
  }
  return context;
};

const defaultState: SiteCharacteristicsIIState = {
  shifts: '',
  humidification: '',
  hotColdSpots: '',
  outdoorAirSupply: '',
  hvacOperation: '',
};

export const SiteCharacteristicsIIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteCharacteristicsIIState, setSiteCharacteristicsIIState] = useState<SiteCharacteristicsIIState>(() => {
    const savedState = localStorage.getItem('siteCharacteristicsIIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('siteCharacteristicsIIState', JSON.stringify(siteCharacteristicsIIState));
  }, [siteCharacteristicsIIState]);

  const updateField = (field: keyof SiteCharacteristicsIIState, value: string) => {
    setSiteCharacteristicsIIState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <SiteCharacteristicsIIContext.Provider value={{ siteCharacteristicsIIState, updateField }}>
      {children}
    </SiteCharacteristicsIIContext.Provider>
  );
};