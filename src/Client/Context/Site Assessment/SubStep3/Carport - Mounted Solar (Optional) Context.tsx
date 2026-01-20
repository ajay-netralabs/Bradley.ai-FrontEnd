import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface CarportSolarState {
  roofPenetration: string;
  totalParkingSpots: string;
  parkingGarageWidth: string;
  parkingGarageLength: string;
  switchgearFloor: string;
  topFloorHeight: string;
}

interface CarportSolarContextType {
  carportSolarState: CarportSolarState;
  updateField: (field: keyof CarportSolarState, value: string) => void;
}

const CarportSolarContext = createContext<CarportSolarContextType | undefined>(undefined);

export const useCarportSolar = () => {
  const context = useContext(CarportSolarContext);
  if (!context) {
    throw new Error('useCarportSolar must be used within a CarportSolarProvider');
  }
  return context;
};

const defaultState: CarportSolarState = {
  roofPenetration: '',
  totalParkingSpots: '',
  parkingGarageWidth: '',
  parkingGarageLength: '',
  switchgearFloor: '',
  topFloorHeight: '',
};

export const CarportSolarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carportSolarState, setCarportSolarState] = useState<CarportSolarState>(() => {
    const savedState = localStorage.getItem('carportSolarState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('carportSolarState', JSON.stringify(carportSolarState));
  }, [carportSolarState]);

  const updateField = (field: keyof CarportSolarState, value: string) => {
    setCarportSolarState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <CarportSolarContext.Provider value={{ carportSolarState, updateField }}>
      {children}
    </CarportSolarContext.Provider>
  );
};