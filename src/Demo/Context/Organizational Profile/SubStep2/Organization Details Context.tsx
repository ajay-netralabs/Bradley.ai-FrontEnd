// src/Context/OrganizationDetailsContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface OrganizationDetails {
  organizationName: string;
  userName: string;
  userEmail: string;
  userTitle: string;
  organizationType: string;
  industry: string;
  irsCategory: string;
  employeeCount: string;
}

interface OrganizationDetailsContextType {
  organizationDetailsState: OrganizationDetails;
  updateOrganizationDetails: (details: Partial<OrganizationDetails>) => void;
}

const OrganizationDetailsContext = createContext<OrganizationDetailsContextType | undefined>(undefined);

export const useOrganizationDetails = () => {
  const context = useContext(OrganizationDetailsContext);
  if (!context) {
    throw new Error('useOrganizationDetails must be used within an OrganizationDetailsProvider');
  }
  return context;
};

interface OrganizationDetailsProviderProps {
  children: React.ReactNode;
}

export const OrganizationDetailsProvider: React.FC<OrganizationDetailsProviderProps> = ({ children }) => {
  const [organizationDetailsState, setOrganizationDetailsState] = useState<OrganizationDetails>(() => {
    const savedDetails = Cookies.get('organizationDetailsState');
    return savedDetails ? JSON.parse(savedDetails) : {
      organizationName: '',
      userName: '',
      userEmail: '',
      userTitle: '',
      organizationType: '',
      industry: '',
      irsCategory: '',
      employeeCount: '',
    };
  });

  useEffect(() => {
    Cookies.set('organizationDetailsState', JSON.stringify(organizationDetailsState));
  }, [organizationDetailsState]);

  const updateOrganizationDetails = (details: Partial<OrganizationDetails>) => {
    setOrganizationDetailsState((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <OrganizationDetailsContext.Provider value={{ organizationDetailsState, updateOrganizationDetails }}>
      {children}
    </OrganizationDetailsContext.Provider>
  );
};