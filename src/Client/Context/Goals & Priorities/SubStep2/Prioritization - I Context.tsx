import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface PrioritizationIState {
  selectedRanks: { [key: number]: string };
  descriptions: { [key: number]: string };
}

interface PrioritizationIContextType {
  prioritizationIState: PrioritizationIState;
  updateRank: (rank: number, value: string) => void;
  updateDescription: (rank: number, value: string) => void;
  clearAllPriorities: () => void;
}

const PrioritizationIContext = createContext<PrioritizationIContextType | undefined>(undefined);

export const usePrioritizationI = () => {
  const context = useContext(PrioritizationIContext);
  if (!context) {
    throw new Error('usePrioritizationI must be used within a PrioritizationIProvider');
  }
  return context;
};

const defaultState: PrioritizationIState = {
  selectedRanks: { 1: "Select one", 2: "Select one", 3: "Select one", 4: "Select one" },
  descriptions: { 1: "", 2: "", 3: "", 4: "" },
};

export const PrioritizationIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prioritizationIState, setPrioritizationIState] = useState<PrioritizationIState>(() => {
    const savedState = localStorage.getItem('prioritizationIState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('prioritizationIState', JSON.stringify(prioritizationIState));
  }, [prioritizationIState]);

  const updateRank = (rank: number, value: string) => {
    setPrioritizationIState(prevState => {
      const newRanks = { ...prevState.selectedRanks };
      if (newRanks[rank] === value) {
        newRanks[rank] = "Select one";
      } else {
        const existingRankKey = Object.keys(newRanks).find(
          (key) => newRanks[Number(key)] === value
        );
        if (existingRankKey) {
          newRanks[Number(existingRankKey)] = "Select one";
        }
        newRanks[rank] = value;
      }
      return { ...prevState, selectedRanks: newRanks };
    });
  };

  const updateDescription = (rank: number, value: string) => {
    setPrioritizationIState(prevState => ({
        ...prevState,
        descriptions: { ...prevState.descriptions, [rank]: value }
    }));
  };

  const clearAllPriorities = () => {
    setPrioritizationIState(defaultState);
  };

  return (
    <PrioritizationIContext.Provider value={{ prioritizationIState, updateRank, updateDescription, clearAllPriorities }}>
      {children}
    </PrioritizationIContext.Provider>
  );
};