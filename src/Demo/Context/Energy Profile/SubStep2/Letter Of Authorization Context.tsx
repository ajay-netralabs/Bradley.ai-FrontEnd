import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface LOATextFields {
  day: string;
  month: string;
  contactName: string;
}

interface LOAContactDetails {
  serviceAddress: string;
  phoneNo: string;
  serviceAccountNo: string;
}

interface LOAState {
  utilityCompanyName: string;
  textFields: LOATextFields;
  contactDetails: LOAContactDetails;
  signature: string;
  agreed: boolean;
}

interface LOAContextType {
  loaState: LOAState;
  updateField: (field: keyof LOAState, value: string | boolean) => void;
  updateNestedField: <K extends 'textFields' | 'contactDetails'>(
    section: K,
    field: keyof LOAState[K],
    value: string
  ) => void;
}

const LOAContext = createContext<LOAContextType | undefined>(undefined);

export const useLOA = () => {
  const context = useContext(LOAContext);
  if (!context) { throw new Error('useLOA must be used within an LOAProvider'); }
  return context;
};

const defaultState: LOAState = {
  utilityCompanyName: '',
  textFields: { day: '', month: '', contactName: '' },
  contactDetails: { serviceAddress: '', phoneNo: '', serviceAccountNo: '' },
  signature: '',
  agreed: false,
};

export const LOAProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loaState, setLoaState] = useState<LOAState>(() => {
    const savedState = Cookies.get('loaState');
    return savedState ? { ...defaultState, ...JSON.parse(savedState) } : defaultState;
  });

  useEffect(() => {
    Cookies.set('loaState', JSON.stringify(loaState));
  }, [loaState]);

  const updateField = (field: keyof LOAState, value: string | boolean) => {
    setLoaState(prevState => ({ ...prevState, [field]: value }));
  };
  
  const updateNestedField = <K extends 'textFields' | 'contactDetails'>(
    section: K,
    field: keyof LOAState[K],
    value: string
  ) => {
    setLoaState(prevState => ({
      ...prevState,
      [section]: { ...prevState[section] as object, [field]: value },
    }));
  };

  return (
    <LOAContext.Provider value={{ loaState, updateField, updateNestedField }}>
      {children}
    </LOAContext.Provider>
  );
};