import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface FacilityUsageState {
  facilityUsage: string[];
  facilityDetails: string;
  daysOfOperation: string[];
  operatingHours: { [key: string]: string };
}

interface FacilityUsageContextType {
  facilityUsageState: FacilityUsageState;
  updateMultiSelect: (field: 'facilityUsage' | 'daysOfOperation', value: string[]) => void;
  updateField: (field: 'facilityDetails', value: string) => void;
  updateOperatingHour: (day: string, timeRange: string) => void;
}

const FacilityUsageContext = createContext<FacilityUsageContextType | undefined>(undefined);

export const useFacilityUsage = () => {
  const context = useContext(FacilityUsageContext);
  if (!context) { throw new Error('useFacilityUsage must be used within a FacilityUsageProvider'); }
  return context;
};

const defaultState: FacilityUsageState = {
  facilityUsage: [],
  facilityDetails: '',
  daysOfOperation: [],
  operatingHours: {},
};

export const FacilityUsageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [facilityUsageState, setFacilityUsageState] = useState<FacilityUsageState>(() => {
    const savedState = localStorage.getItem('facilityUsageState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('facilityUsageState', JSON.stringify(facilityUsageState));
  }, [facilityUsageState]);

  const updateMultiSelect = (field: 'facilityUsage' | 'daysOfOperation', value: string[]) => {
    setFacilityUsageState(prevState => ({ ...prevState, [field]: value }));
  };

  const updateField = (field: 'facilityDetails', value: string) => {
    setFacilityUsageState(prevState => ({ ...prevState, [field]: value }));
  };

  const updateOperatingHour = (day: string, timeRange: string) => {
    setFacilityUsageState(prevState => ({
      ...prevState,
      operatingHours: {
        ...prevState.operatingHours,
        [day]: timeRange,
      }
    }));
  };

  return (
    <FacilityUsageContext.Provider value={{ facilityUsageState, updateMultiSelect, updateField, updateOperatingHour }}>
      {children}
    </FacilityUsageContext.Provider>
  );
};