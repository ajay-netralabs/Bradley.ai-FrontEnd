import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface SelectedArea {
  coordinates: [number, number][];
  area: number;
}

interface GroundMountSolarState {
  landArea: string;
  topography: string;
  address: string;
  showMap: boolean;
  selectedAreas: SelectedArea[];
}

interface GroundMountSolarContextType {
  groundMountState: GroundMountSolarState;
  updateField: (field: keyof Omit<GroundMountSolarState, 'selectedAreas' | 'landArea'>, value: string | boolean) => void;
  updateLandArea: (value: string) => void;
  updateSelectedAreas: (areas: SelectedArea[]) => void;
}

const GroundMountSolarContext = createContext<GroundMountSolarContextType | undefined>(undefined);

export const useGroundMountSolar = () => {
  const context = useContext(GroundMountSolarContext);
  if (!context) {
    throw new Error('useGroundMountSolar must be used within a GroundMountSolarProvider');
  }
  return context;
};

const defaultState: GroundMountSolarState = {
  landArea: '',
  topography: 'default',
  address: '',
  showMap: false,
  selectedAreas: [],
};

export const GroundMountSolarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groundMountState, setGroundMountState] = useState<GroundMountSolarState>(() => {
    const savedState = localStorage.getItem('groundMountSolarState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('groundMountSolarState', JSON.stringify(groundMountState));
  }, [groundMountState]);

  const updateField = (field: keyof Omit<GroundMountSolarState, 'selectedAreas' | 'landArea'>, value: string | boolean) => {
    setGroundMountState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const updateLandArea = (value: string) => {
    setGroundMountState(prevState => ({ ...prevState, landArea: value }));
  };

  const updateSelectedAreas = (areas: SelectedArea[]) => {
    setGroundMountState(prevState => ({ ...prevState, selectedAreas: areas }));
  };

  return (
    <GroundMountSolarContext.Provider value={{ groundMountState, updateField, updateSelectedAreas, updateLandArea }}>
      {children}
    </GroundMountSolarContext.Provider>
  );
};