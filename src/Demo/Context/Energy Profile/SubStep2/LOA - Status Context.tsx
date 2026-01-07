import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

type LoaStatusType = 'Awaiting Approval' | 'Approved' | 'Declined' | 'LOA Not Signed';

interface LOAStatusState {
  status: LoaStatusType;
  details: string;
}

interface LOAStatusContextType {
  loaStatusState: LOAStatusState;
  updateLOAStatus: (status: LoaStatusType, details?: string) => void;
}

const LOAStatusContext = createContext<LOAStatusContextType | undefined>(undefined);

export const useLOAStatus = () => {
  const context = useContext(LOAStatusContext);
  if (!context) {
    throw new Error('useLOAStatus must be used within a LOAStatusProvider');
  }
  return context;
};

const defaultState: LOAStatusState = {
  status: 'LOA Not Signed',
  details: '',
};

export const LOAStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loaStatusState, setLOAStatusState] = useState<LOAStatusState>(() => {
    const savedState = Cookies.get('loaStatusState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('loaStatusState', JSON.stringify(loaStatusState));
  }, [loaStatusState]);

  const updateLOAStatus = (status: LoaStatusType, details?: string) => {
    setLOAStatusState(prevState => ({
      ...prevState,
      status,
      details: details || prevState.details,
    }));
  };

  return (
    <LOAStatusContext.Provider value={{ loaStatusState, updateLOAStatus }}>
      {children}
    </LOAStatusContext.Provider>
  );
};