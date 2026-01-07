import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface FacilityOperationState {
  checked: {
    twoPipeSystem: boolean;
    fourPipeSystem: boolean;
    autoLightSensors: boolean;
    waterTreatment: boolean;
    setbackTemperature: boolean;
    freeCooling: boolean;
  };
  description: {
    twoPipeSystem: string;
    fourPipeSystem: string;
    autoLightSensors: string;
    waterTreatment: string[];
    freeCooling: string;
  };
  operationalHours: {
    startUpTime: string;
    setBackTime: string;
  };
  typicalHours: {
    startUpTime: string;
    setBackTime: string;
  };
  setbackTemperature: {
    summer: string;
    winter: string;
  };
  facilityTenantTemperature: string;
}

interface FacilityOperationContextType {
  facilityOperation: FacilityOperationState;
  updateFacilityOperation: (newState: Partial<FacilityOperationState>) => void;
}

const FacilityOperationContext = createContext<FacilityOperationContextType | undefined>(undefined);

export const useFacilityOperation = () => {
  const context = useContext(FacilityOperationContext);
  if (!context) {
    throw new Error('useFacilityOperation must be used within a FacilityOperationProvider');
  }
  return context;
};

interface FacilityOperationProviderProps {
  children: ReactNode;
}

const defaultState: FacilityOperationState = {
  checked: {
    twoPipeSystem: false,
    fourPipeSystem: false,
    autoLightSensors: false,
    waterTreatment: false,
    setbackTemperature: false,
    freeCooling: false,
  },
  description: {
    twoPipeSystem: '',
    fourPipeSystem: '',
    autoLightSensors: '',
    waterTreatment: [],
    freeCooling: '',
  },
  operationalHours: {
    startUpTime: '',
    setBackTime: '',
  },
  typicalHours: {
    startUpTime: '',
    setBackTime: '',
  },
  setbackTemperature: {
    summer: '',
    winter: '',
  },
  facilityTenantTemperature: '',
};

export const FacilityOperationProvider: React.FC<FacilityOperationProviderProps> = ({ children }) => {
  const [facilityOperation, setFacilityOperation] = useState<FacilityOperationState>(() => {
    const savedState = Cookies.get('facilityOperationState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('facilityOperationState', JSON.stringify(facilityOperation));
  }, [facilityOperation]);

  const updateFacilityOperation = (newState: Partial<FacilityOperationState>) => {
    setFacilityOperation((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <FacilityOperationContext.Provider value={{ facilityOperation, updateFacilityOperation }}>
      {children}
    </FacilityOperationContext.Provider>
  );
};