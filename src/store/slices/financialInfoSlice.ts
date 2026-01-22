import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Interfaces ---

// File Metadata (Shared)
export interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

// Ownership Preference
export type Preference = 'own' | 'third-party' | null;

export interface OwnershipPreferenceState {
  preference: Preference;
}

// Budget Goals
export interface BudgetGoalsState {
  yearBudget: string[];
  availableFunds: string;
  simplePayback: string;
}

// Other Energy Commitments
export interface OtherEnergyCommitmentsState {
  commitmentsText: string;
}

// Financing Preferences
export interface FinancingPreferencesState {
  selectedOption: string;
  otherText: string;
}

// Financial Preferences
export interface FinancialPreferencesState {
  taxAppetite: string;
  taxAppetiteReturnDate: string;
  depreciationMethod: string;
  taxRate: number;
}

// Existing Contracts I
export interface ExistingContractsIState {
  hasThirdPartyContract: boolean;
  supplierName: string;
  contractEndDate: string;
  terminationFee: string;
  electricityTakeAmount: string;
}

// Existing PPA Contracts II
export interface ExistingPPAContractsIIState {
  hasPPA: boolean;
  providerName: string;
  ppaStartDate: string;
  ppaEndDate: string;
  ppaRate: string;
  ppaEscalation: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

// Existing PPA Contracts III
export interface ExistingPPAContractsIIIState {
  hasCHP_PPA: boolean;
  ratekWh: string;
  rateMMBTu: string;
  escalatorkWh: string;
  escalatorMMBTu: string;
  termkWh: string;
  termMMBTu: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

// Existing Contracts IV
export interface ExistingContractsIVState {
  hasSteamContract: boolean;
  rate: string;
  escalator: string;
  offtakeRequirement: string;
  condensateReturn: string;
  condensatePercentage: string;
  files: File[];
  fileMetadata: FileMetadata[];
}

// PPA Preferences
export interface PPAPreferencesState {
  electricityRate: string;
  thermalRate: string;
  ppaTerm: number;
  escalationRate: number;
}

// Additional PPA Preferences
export interface AdditionalPPAPreferencesState {
  preferencesText: string;
}

// --- Combined State ---

export interface FinancialInfoState {
  ownershipPreference: OwnershipPreferenceState;
  budgetGoals: BudgetGoalsState;
  otherEnergyCommitments: OtherEnergyCommitmentsState;
  financingPreferences: FinancingPreferencesState;
  financialPreferences: FinancialPreferencesState;
  existingContractsI: ExistingContractsIState;
  existingPPAContractsII: ExistingPPAContractsIIState;
  existingPPAContractsIII: ExistingPPAContractsIIIState;
  existingContractsIV: ExistingContractsIVState;
  ppaPreferences: PPAPreferencesState;
  additionalPPAPreferences: AdditionalPPAPreferencesState;
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

const defaultOwnership: OwnershipPreferenceState = { preference: null };
const defaultBudget: BudgetGoalsState = { yearBudget: ['', '', ''], availableFunds: 'no', simplePayback: 'default' };
const defaultOtherCommitments: OtherEnergyCommitmentsState = { commitmentsText: '' };
const defaultFinancing: FinancingPreferencesState = { selectedOption: '', otherText: '' };
const defaultFinancial: FinancialPreferencesState = { taxAppetite: 'yes', taxAppetiteReturnDate: '', depreciationMethod: 'default', taxRate: 24 };
const defaultContractsI: ExistingContractsIState = { hasThirdPartyContract: false, supplierName: '', contractEndDate: '', terminationFee: '', electricityTakeAmount: '' };
const defaultContractsII: ExistingPPAContractsIIState = { hasPPA: false, providerName: '', ppaStartDate: '', ppaEndDate: '', ppaRate: '', ppaEscalation: '', files: [], fileMetadata: [] };
const defaultContractsIII: ExistingPPAContractsIIIState = { hasCHP_PPA: false, ratekWh: '', rateMMBTu: '', escalatorkWh: '', escalatorMMBTu: '', termkWh: '', termMMBTu: '', files: [], fileMetadata: [] };
const defaultContractsIV: ExistingContractsIVState = { hasSteamContract: false, rate: '', escalator: '', offtakeRequirement: '', condensateReturn: 'no', condensatePercentage: '', files: [], fileMetadata: [] };
const defaultPPA: PPAPreferencesState = { electricityRate: '', thermalRate: '', ppaTerm: 10, escalationRate: 0.5 };
const defaultAdditionalPPA: AdditionalPPAPreferencesState = { preferencesText: '' };

const initialState: FinancialInfoState = {
  ownershipPreference: loadState('ownershipPreference', defaultOwnership),
  budgetGoals: loadState('budgetGoalsState', defaultBudget),
  otherEnergyCommitments: loadState('otherEnergyCommitmentsState', defaultOtherCommitments),
  financingPreferences: loadState('financingPreferencesState', defaultFinancing),
  financialPreferences: loadState('financialPreferencesState', defaultFinancial),
  existingContractsI: loadState('existingContractsIState', defaultContractsI),
  existingPPAContractsII: { ...loadState('existingPPAContractsIIState', defaultContractsII), files: [] },
  existingPPAContractsIII: { ...loadState('existingPPAContractsIIIState', defaultContractsIII), files: [] },
  existingContractsIV: { ...loadState('existingContractsIVState', defaultContractsIV), files: [] },
  ppaPreferences: loadState('ppaPreferencesState', defaultPPA),
  additionalPPAPreferences: loadState('additionalPPAPreferencesState', defaultAdditionalPPA),
};

const financialInfoSlice = createSlice({
  name: 'financialInfo',
  initialState,
  reducers: {
    // Ownership
    setOwnershipPreference: (state, action: PayloadAction<Preference>) => {
      state.ownershipPreference.preference = action.payload;
      localStorage.setItem('ownershipPreference', JSON.stringify(state.ownershipPreference));
    },

    // Budget
    updateBudgetField: (state, action: PayloadAction<{ field: keyof Omit<BudgetGoalsState, 'yearBudget'>; value: string }>) => {
        const { field, value } = action.payload;
        // @ts-ignore
        state.budgetGoals[field] = value;
        if (field === 'availableFunds' && value === 'no') {
            state.budgetGoals.yearBudget = defaultBudget.yearBudget;
        }
        localStorage.setItem('budgetGoalsState', JSON.stringify(state.budgetGoals));
    },
    updateYearBudget: (state, action: PayloadAction<{ index: number; value: string }>) => {
        state.budgetGoals.yearBudget[action.payload.index] = action.payload.value;
        localStorage.setItem('budgetGoalsState', JSON.stringify(state.budgetGoals));
    },
    addYearBudget: (state) => {
        state.budgetGoals.yearBudget.push('');
        localStorage.setItem('budgetGoalsState', JSON.stringify(state.budgetGoals));
    },
    removeYearBudget: (state, action: PayloadAction<number>) => {
        state.budgetGoals.yearBudget.splice(action.payload, 1);
        localStorage.setItem('budgetGoalsState', JSON.stringify(state.budgetGoals));
    },

    // Other Commitments
    updateOtherCommitmentsField: (state, action: PayloadAction<{ field: keyof OtherEnergyCommitmentsState; value: string }>) => {
        state.otherEnergyCommitments[action.payload.field] = action.payload.value;
        localStorage.setItem('otherEnergyCommitmentsState', JSON.stringify(state.otherEnergyCommitments));
    },

    // Financing
    updateFinancingField: (state, action: PayloadAction<{ field: keyof FinancingPreferencesState; value: string }>) => {
        state.financingPreferences[action.payload.field] = action.payload.value;
        if (action.payload.field === 'selectedOption' && action.payload.value !== 'other') {
            state.financingPreferences.otherText = '';
        }
        localStorage.setItem('financingPreferencesState', JSON.stringify(state.financingPreferences));
    },

    // Financial Prefs
    updateFinancialPrefField: (state, action: PayloadAction<{ field: keyof FinancialPreferencesState; value: string | number }>) => {
        // @ts-ignore
        state.financialPreferences[action.payload.field] = action.payload.value;
        if (action.payload.field === 'taxAppetite' && action.payload.value === 'yes') {
            state.financialPreferences.taxAppetiteReturnDate = '';
        }
        localStorage.setItem('financialPreferencesState', JSON.stringify(state.financialPreferences));
    },

    // Contracts I
    updateContractsIField: (state, action: PayloadAction<{ field: keyof ExistingContractsIState; value: string | boolean }>) => {
        // @ts-ignore
        state.existingContractsI[action.payload.field] = action.payload.value;
        localStorage.setItem('existingContractsIState', JSON.stringify(state.existingContractsI));
    },

    // Contracts II (PPA)
    updateContractsIIField: (state, action: PayloadAction<{ field: keyof Omit<ExistingPPAContractsIIState, 'files' | 'fileMetadata'>; value: string | boolean }>) => {
        // @ts-ignore
        state.existingPPAContractsII[action.payload.field] = action.payload.value;
        localStorage.setItem('existingPPAContractsIIState', JSON.stringify({ ...state.existingPPAContractsII, files: undefined }));
    },
    addContractsIIFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
        
        const uniqueMetadata = newMetadata.filter(nm => !state.existingPPAContractsII.fileMetadata.some(em => em.name === nm.name));
        const uniqueFiles = newFiles.filter(nf => !state.existingPPAContractsII.files.some(ef => ef.name === nf.name));

        state.existingPPAContractsII.fileMetadata.push(...uniqueMetadata);
        state.existingPPAContractsII.files.push(...uniqueFiles);
        localStorage.setItem('existingPPAContractsIIState', JSON.stringify({ ...state.existingPPAContractsII, files: undefined }));
    },
    removeContractsIIFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.existingPPAContractsII.files = state.existingPPAContractsII.files.filter(f => f.name !== fileName);
        state.existingPPAContractsII.fileMetadata = state.existingPPAContractsII.fileMetadata.filter(m => m.name !== fileName);
        localStorage.setItem('existingPPAContractsIIState', JSON.stringify({ ...state.existingPPAContractsII, files: undefined }));
    },

    // Contracts III
    updateContractsIIIField: (state, action: PayloadAction<{ field: keyof Omit<ExistingPPAContractsIIIState, 'files' | 'fileMetadata'>; value: string | boolean }>) => {
        // @ts-ignore
        state.existingPPAContractsIII[action.payload.field] = action.payload.value;
        localStorage.setItem('existingPPAContractsIIIState', JSON.stringify({ ...state.existingPPAContractsIII, files: undefined }));
    },
    addContractsIIIFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
        
        const uniqueMetadata = newMetadata.filter(nm => !state.existingPPAContractsIII.fileMetadata.some(em => em.name === nm.name));
        const uniqueFiles = newFiles.filter(nf => !state.existingPPAContractsIII.files.some(ef => ef.name === nf.name));

        state.existingPPAContractsIII.fileMetadata.push(...uniqueMetadata);
        state.existingPPAContractsIII.files.push(...uniqueFiles);
        localStorage.setItem('existingPPAContractsIIIState', JSON.stringify({ ...state.existingPPAContractsIII, files: undefined }));
    },
    removeContractsIIIFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.existingPPAContractsIII.files = state.existingPPAContractsIII.files.filter(f => f.name !== fileName);
        state.existingPPAContractsIII.fileMetadata = state.existingPPAContractsIII.fileMetadata.filter(m => m.name !== fileName);
        localStorage.setItem('existingPPAContractsIIIState', JSON.stringify({ ...state.existingPPAContractsIII, files: undefined }));
    },

    // Contracts IV
    updateContractsIVField: (state, action: PayloadAction<{ field: keyof Omit<ExistingContractsIVState, 'files' | 'fileMetadata'>; value: string | boolean }>) => {
        // @ts-ignore
        state.existingContractsIV[action.payload.field] = action.payload.value;
        if (action.payload.field === 'condensateReturn' && action.payload.value === 'no') {
            state.existingContractsIV.condensatePercentage = '';
        }
        localStorage.setItem('existingContractsIVState', JSON.stringify({ ...state.existingContractsIV, files: undefined }));
    },
    addContractsIVFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
        
        const uniqueMetadata = newMetadata.filter(nm => !state.existingContractsIV.fileMetadata.some(em => em.name === nm.name));
        const uniqueFiles = newFiles.filter(nf => !state.existingContractsIV.files.some(ef => ef.name === nf.name));

        state.existingContractsIV.fileMetadata.push(...uniqueMetadata);
        state.existingContractsIV.files.push(...uniqueFiles);
        localStorage.setItem('existingContractsIVState', JSON.stringify({ ...state.existingContractsIV, files: undefined }));
    },
    removeContractsIVFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.existingContractsIV.files = state.existingContractsIV.files.filter(f => f.name !== fileName);
        state.existingContractsIV.fileMetadata = state.existingContractsIV.fileMetadata.filter(m => m.name !== fileName);
        localStorage.setItem('existingContractsIVState', JSON.stringify({ ...state.existingContractsIV, files: undefined }));
    },

    // PPA Preferences
    updatePPAPrefField: (state, action: PayloadAction<{ field: keyof PPAPreferencesState; value: string | number }>) => {
        // @ts-ignore
        state.ppaPreferences[action.payload.field] = action.payload.value;
        localStorage.setItem('ppaPreferencesState', JSON.stringify(state.ppaPreferences));
    },

    // Additional PPA
    updateAdditionalPPAField: (state, action: PayloadAction<{ field: keyof AdditionalPPAPreferencesState; value: string }>) => {
        state.additionalPPAPreferences[action.payload.field] = action.payload.value;
        localStorage.setItem('additionalPPAPreferencesState', JSON.stringify(state.additionalPPAPreferences));
    },
  },
});

export const {
    setOwnershipPreference,
    updateBudgetField, updateYearBudget, addYearBudget, removeYearBudget,
    updateOtherCommitmentsField,
    updateFinancingField,
    updateFinancialPrefField,
    updateContractsIField,
    updateContractsIIField, addContractsIIFiles, removeContractsIIFile,
    updateContractsIIIField, addContractsIIIFiles, removeContractsIIIFile,
    updateContractsIVField, addContractsIVFiles, removeContractsIVFile,
    updatePPAPrefField,
    updateAdditionalPPAField
} = financialInfoSlice.actions;

export default financialInfoSlice.reducer;
