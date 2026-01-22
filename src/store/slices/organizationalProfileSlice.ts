import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Interfaces ---

// Organization Details
export interface OrganizationDetailsState {
  organizationName: string;
  userName: string;
  userEmail: string;
  userTitle: string;
  organizationType: string;
  industry: string;
  irsCategory: string;
  employeeCount: string;
}

// Other Details
export interface OwnerEntityDetails {
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

export interface FinancialDetails {
  estimatedLTV: string;
  appraisedMarketValue: string;
  debtServiceCoverageRatio: string;
  netOperatingIncome: string;
  capRate: string;
  submitProFormaFinancials: string;
}

export interface TenantDetails {
  leaseTerms: string;
}

export interface LeaseQuestions {
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

export interface OtherDetailsState {
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

// Facility Operation
export interface FacilityOperationState {
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

// Facility Address
// Storing as POJO for Redux
export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface AddressData {
  id: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  areaSqFt: string;
  operationalStart: string;
  operationalEnd: string;
  position: LatLngLiteral | null;
}

export interface FacilityAddressState {
  addresses: AddressData[];
  selectedAddressId: string | null;
}

// Annual Energy Spend
export interface AnnualEnergySpendState {
  electricity: string;
  naturalGas: string;
  water: string;
  oil: string;
  propane: string;
  steam: string;
  chilledWater: string;
  other: string;
  otherLabel: string;
}

// --- Combined State ---

export interface OrganizationalProfileState {
  organizationDetails: OrganizationDetailsState;
  otherDetails: OtherDetailsState;
  facilityOperation: FacilityOperationState;
  facilityAddress: FacilityAddressState;
  annualEnergySpend: AnnualEnergySpendState;
}

// --- Defaults & Hydration ---

const loadState = <T>(key: string, defaultVal: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
    return defaultVal;
  }
};

const defaultOrgDetails: OrganizationDetailsState = {
  organizationName: '',
  userName: '',
  userEmail: '',
  userTitle: '',
  organizationType: '',
  industry: '',
  irsCategory: '',
  employeeCount: '',
};

const defaultOtherDetails: OtherDetailsState = {
  propertyOwnership: null,
  leasePeriod: { start: '', end: '' },
  longTermOccupancy: null,
  ownerEntityDetails: { legalName: '', organizationalStructure: '', ownershipPercentages: '', propertyType: '', propertyAddressAndType: '', yearBuilt: '', yearLastRenovated: '', squareFootage: '', parcelId: '', currentOccupancyStatus: '', leasedOrVacant: '', occupancyRate: '', leaseStartEndDates: '', majorTenants: '', leaseExpirationSchedule: '' },
  financialDetails: { estimatedLTV: '', appraisedMarketValue: '', debtServiceCoverageRatio: '', netOperatingIncome: '', capRate: '', submitProFormaFinancials: '' },
  tenantDetails: { leaseTerms: '' },
  leaseQuestions: { propertyAddress: '', landlordLegalName: '', tenantLegalName: '', typeOfProperty: '', leaseStartDate: '', leaseEndDate: '', renewalOptions: '', termsOfRenewal: '', earlyTerminationClause: '', leaseStructure: '' },
};

const defaultFacilityOp: FacilityOperationState = {
  checked: { twoPipeSystem: false, fourPipeSystem: false, autoLightSensors: false, waterTreatment: false, setbackTemperature: false, freeCooling: false },
  description: { twoPipeSystem: '', fourPipeSystem: '', autoLightSensors: '', waterTreatment: [], freeCooling: '' },
  operationalHours: { startUpTime: '', setBackTime: '' },
  typicalHours: { startUpTime: '', setBackTime: '' },
  setbackTemperature: { summer: '', winter: '' },
  facilityTenantTemperature: '',
};

const defaultAddress: FacilityAddressState = {
  addresses: [],
  selectedAddressId: null,
};

// Custom hydration for addresses to ensure shape
const loadAddressState = (): FacilityAddressState => {
    const s = loadState('bradley_facilityAddressState', defaultAddress);
    // Ensure position matches LatLngLiteral
    if (s.addresses) {
        s.addresses = s.addresses.map((a: any) => ({
            ...a,
            position: a.position && typeof a.position.lat === 'number' ? { lat: a.position.lat, lng: a.position.lng } : null
        }));
    }
    return s;
};

const defaultSpend: AnnualEnergySpendState = {
  electricity: '',
  naturalGas: '',
  water: '',
  oil: '',
  propane: '',
  steam: '',
  chilledWater: '',
  other: '',
  otherLabel: '',
};

const initialState: OrganizationalProfileState = {
  organizationDetails: loadState('organizationDetailsState', defaultOrgDetails),
  otherDetails: loadState('otherDetailsState', defaultOtherDetails),
  facilityOperation: loadState('facilityOperationState', defaultFacilityOp),
  facilityAddress: loadAddressState(),
  annualEnergySpend: loadState('annualEnergySpend', defaultSpend),
};

const organizationalProfileSlice = createSlice({
  name: 'organizationalProfile',
  initialState,
  reducers: {
    // Organization Details
    updateOrganizationDetails: (state, action: PayloadAction<Partial<OrganizationDetailsState>>) => {
        state.organizationDetails = { ...state.organizationDetails, ...action.payload };
        localStorage.setItem('organizationDetailsState', JSON.stringify(state.organizationDetails));
    },

    // Other Details
    updateOtherDetails: (state, action: PayloadAction<Partial<OtherDetailsState>>) => {
        state.otherDetails = { ...state.otherDetails, ...action.payload };
        localStorage.setItem('otherDetailsState', JSON.stringify(state.otherDetails));
    },
    updateOtherDetailsNested: (state, action: PayloadAction<{ section: keyof OtherDetailsState; field: string; value: string | string[] }>) => {
        const { section, field, value } = action.payload;
        // @ts-ignore
        if (typeof state.otherDetails[section] === 'object') {
             // @ts-ignore
            state.otherDetails[section][field] = value;
            localStorage.setItem('otherDetailsState', JSON.stringify(state.otherDetails));
        }
    },

    // Facility Operation
    updateFacilityOperation: (state, action: PayloadAction<Partial<FacilityOperationState>>) => {
         // Deep merge might be needed for nested objects if partial updates are deep, 
         // but Context implementation was { ...prevState, ...newState }.
         // If newState contains a whole 'checked' object, it replaces the old one.
         state.facilityOperation = { ...state.facilityOperation, ...action.payload };
         localStorage.setItem('facilityOperationState', JSON.stringify(state.facilityOperation));
    },

    // Facility Address
    addAddress: (state, action: PayloadAction<AddressData>) => {
        state.facilityAddress.addresses.push(action.payload);
        state.facilityAddress.selectedAddressId = action.payload.id;
        localStorage.setItem('bradley_facilityAddressState', JSON.stringify(state.facilityAddress));
    },
    updateAddress: (state, action: PayloadAction<{ id: string; updates: Partial<Omit<AddressData, 'id'>> }>) => {
        const { id, updates } = action.payload;
        const addrIndex = state.facilityAddress.addresses.findIndex(a => a.id === id);
        if (addrIndex !== -1) {
            state.facilityAddress.addresses[addrIndex] = { ...state.facilityAddress.addresses[addrIndex], ...updates };
            localStorage.setItem('bradley_facilityAddressState', JSON.stringify(state.facilityAddress));
        }
    },
    updateAddressField: (state, action: PayloadAction<{ id: string; field: keyof Omit<AddressData, 'id' | 'position'>; value: string }>) => {
        const { id, field, value } = action.payload;
        const addr = state.facilityAddress.addresses.find(a => a.id === id);
        if (addr) {
            // @ts-ignore
            addr[field] = value;
            localStorage.setItem('bradley_facilityAddressState', JSON.stringify(state.facilityAddress));
        }
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.facilityAddress.addresses = state.facilityAddress.addresses.filter(a => a.id !== id);
        if (state.facilityAddress.selectedAddressId === id) {
            state.facilityAddress.selectedAddressId = state.facilityAddress.addresses.length > 0 ? state.facilityAddress.addresses[0].id : null;
        }
        localStorage.setItem('bradley_facilityAddressState', JSON.stringify(state.facilityAddress));
    },
    setSelectedAddress: (state, action: PayloadAction<string | null>) => {
        state.facilityAddress.selectedAddressId = action.payload;
    },

    // Annual Energy Spend
    updateAnnualEnergySpend: (state, action: PayloadAction<Partial<AnnualEnergySpendState>>) => {
        state.annualEnergySpend = { ...state.annualEnergySpend, ...action.payload };
        localStorage.setItem('annualEnergySpend', JSON.stringify(state.annualEnergySpend));
    },
  },
});

export const {
    updateOrganizationDetails,
    updateOtherDetails, updateOtherDetailsNested,
    updateFacilityOperation,
    addAddress, updateAddress, updateAddressField, deleteAddress, setSelectedAddress,
    updateAnnualEnergySpend
} = organizationalProfileSlice.actions;

export default organizationalProfileSlice.reducer;
