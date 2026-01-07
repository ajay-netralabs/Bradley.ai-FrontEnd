import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface OwnerEntityDetails {
  legalName: string;
  organizationalStructure: string;
  ownershipPercentages: string;
  propertyType: string;
  propertyAddressAndType: string;
  yearBuilt: string;
  yearLastRenovated: string;
  squareFootage: string;
  parcelId: string;
  currentOccupancyStatus: string;
  leasedOrVacant: string;
  occupancyRate: string;
  leaseStartEndDates: string;
  majorTenants: string;
  leaseExpirationSchedule: string;
}

interface FinancialDetails {
  estimatedLTV: string;
  appraisedMarketValue: string;
  debtServiceCoverageRatio: string;
  netOperatingIncome: string;
  capRate: string;
  submitProFormaFinancials: string;
}

interface TenantDetails {
  leaseTerms: string;
}

interface LeaseQuestions {
  propertyAddress: string;
  landlordLegalName: string;
  tenantLegalName: string;
  typeOfProperty: string;
  leaseStartDate: string;
  leaseEndDate: string;
  renewalOptions: string;
  termsOfRenewal: string;
  earlyTerminationClause: string;
  leaseStructure: string;
}

interface OtherDetailsState {
  propertyOwnership: string | null;
  leasePeriod: {
    start: string;
    end: string;
  };
  longTermOccupancy: string | null;
  ownerEntityDetails: OwnerEntityDetails;
  financialDetails: FinancialDetails;
  tenantDetails: TenantDetails;
  leaseQuestions: LeaseQuestions;
}

interface OtherDetailsContextType {
  otherDetails: OtherDetailsState;
  updateOtherDetails: (newState: Partial<OtherDetailsState>) => void;
  updateNestedField: <K extends keyof OtherDetailsState>(
    section: K,
    field: keyof OtherDetailsState[K],
    value: string | string[]
  ) => void;
}

const OtherDetailsContext = createContext<OtherDetailsContextType | undefined>(undefined);

export const useOtherDetails = () => {
  const context = useContext(OtherDetailsContext);
  if (!context) {
    throw new Error('useOtherDetails must be used within an OtherDetailsProvider');
  }
  return context;
};

const defaultState: OtherDetailsState = {
  propertyOwnership: null,
  leasePeriod: { start: '', end: '' },
  longTermOccupancy: null,
  ownerEntityDetails: { legalName: '', organizationalStructure: '', ownershipPercentages: '', propertyType: '', propertyAddressAndType: '', yearBuilt: '', yearLastRenovated: '', squareFootage: '', parcelId: '', currentOccupancyStatus: '', leasedOrVacant: '', occupancyRate: '', leaseStartEndDates: '', majorTenants: '', leaseExpirationSchedule: '' },
  financialDetails: { estimatedLTV: '', appraisedMarketValue: '', debtServiceCoverageRatio: '', netOperatingIncome: '', capRate: '', submitProFormaFinancials: '' },
  tenantDetails: { leaseTerms: '' },
  leaseQuestions: { propertyAddress: '', landlordLegalName: '', tenantLegalName: '', typeOfProperty: '', leaseStartDate: '', leaseEndDate: '', renewalOptions: '', termsOfRenewal: '', earlyTerminationClause: '', leaseStructure: '' },
};

export const OtherDetailsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [otherDetails, setOtherDetails] = useState<OtherDetailsState>(() => {
    const savedState = Cookies.get('otherDetailsState');
    return savedState ? JSON.parse(savedState) : defaultState;
  });

  useEffect(() => {
    Cookies.set('otherDetailsState', JSON.stringify(otherDetails));
  }, [otherDetails]);

  const updateOtherDetails = (newState: Partial<OtherDetailsState>) => {
    setOtherDetails((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  
  const updateNestedField = <K extends keyof OtherDetailsState>(
    section: K,
    field: keyof OtherDetailsState[K],
    value: string | string[]
  ) => {
    setOtherDetails(prevState => ({
      ...prevState,
      [section]: {
        ...(prevState[section] as object),
        [field]: value,
      }
    }));
  };

  return (
    <OtherDetailsContext.Provider value={{ otherDetails, updateOtherDetails, updateNestedField }}>
      {children}
    </OtherDetailsContext.Provider>
  );
};