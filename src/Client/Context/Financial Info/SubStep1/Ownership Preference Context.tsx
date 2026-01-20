import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


type Preference = 'own' | 'third-party' | null;

interface OwnershipPreferenceState {
  preference: Preference;
}

interface OwnershipPreferenceContextType {
  ownershipPreference: OwnershipPreferenceState;
  setOwnershipPreference: (preference: Preference) => void;
}

const OwnershipPreferenceContext = createContext<OwnershipPreferenceContextType | undefined>(undefined);

export const useOwnershipPreference = () => {
  const context = useContext(OwnershipPreferenceContext);
  if (!context) {
    throw new Error('useOwnershipPreference must be used within an OwnershipPreferenceProvider');
  }
  return context;
};

const defaultState: OwnershipPreferenceState = {
  preference: null,
};

export const OwnershipPreferenceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ownershipPreference, setOwnershipPreferenceState] = useState<OwnershipPreferenceState>(() => {
    const savedState = localStorage.getItem('ownershipPreference');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem('ownershipPreference', JSON.stringify(ownershipPreference));
  }, [ownershipPreference]);

  const setOwnershipPreference = (preference: Preference) => {
    setOwnershipPreferenceState({ preference });
  };

  return (
    <OwnershipPreferenceContext.Provider value={{ ownershipPreference, setOwnershipPreference }}>
      {children}
    </OwnershipPreferenceContext.Provider>
  );
};