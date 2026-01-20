import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface BoilerCogenerationSource {
  type: string;
  capacity: string;
  fuelSource: string;
  efficiency: string;
  age: string;
  operatingPressure: string;
  history: string;
  utilization: string;
  volume: string;
  wasteHeatCaptured: string;
}

interface BoilerCogenerationState {
  sources: BoilerCogenerationSource[];
}

interface BoilerCogenerationContextType {
  boilerCogenerationState: BoilerCogenerationState;
  addSource: () => void;
  removeSource: (index: number) => void;
  updateSourceField: (index: number, field: keyof BoilerCogenerationSource, value: string) => void;
}

const BoilerCogenerationContext = createContext<BoilerCogenerationContextType | undefined>(undefined);

export const useBoilerCogeneration = () => {
  const context = useContext(BoilerCogenerationContext);
  if (!context) {
    throw new Error('useBoilerCogeneration must be used within a BoilerCogenerationProvider');
  }
  return context;
};

const defaultState: BoilerCogenerationState = {
  sources: [{ type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '', wasteHeatCaptured: '' }],
};

export const BoilerCogenerationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [boilerCogenerationState, setBoilerCogenerationState] = useState<BoilerCogenerationState>(() => {
    const savedState = localStorage.getItem('boilerCogenerationState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('boilerCogenerationState', JSON.stringify(boilerCogenerationState));
  }, [boilerCogenerationState]);

  const addSource = () => {
    setBoilerCogenerationState(prevState => ({
      ...prevState,
      sources: [...prevState.sources, { type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '', wasteHeatCaptured: '' }],
    }));
  };

  const removeSource = (index: number) => {
    setBoilerCogenerationState(prevState => ({
      ...prevState,
      sources: prevState.sources.filter((_, i) => i !== index),
    }));
  };

  const updateSourceField = (index: number, field: keyof BoilerCogenerationSource, value: string) => {
    setBoilerCogenerationState(prevState => ({
      ...prevState,
      sources: prevState.sources.map((source, i) =>
        i === index ? { ...source, [field]: value } : source
      ),
    }));
  };

  return (
    <BoilerCogenerationContext.Provider value={{ boilerCogenerationState, addSource, removeSource, updateSourceField }}>
      {children}
    </BoilerCogenerationContext.Provider>
  );
};