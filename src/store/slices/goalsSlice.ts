import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Interfaces ---

// Prioritization I
export interface PrioritizationIState {
  selectedRanks: { [key: number]: string };
  descriptions: { [key: number]: string };
}

// Prioritization II
export interface Target {
  value: string;
  unit: string;
  date: string;
}

export interface PrioritizationIIState {
  resiliencyIncrease: number;
  scope2Reduction: number;
  costReduction: number;
  renewableGeneration: number; 
  blackStartCapability: string;
  islandModeCapability: string;
  gridIndependentDuration: string;
  backupPowerDuration: string;
  renewableSystemSize: string;
  decarbonizationTarget1: Target;
  decarbonizationTarget2: Target;
  energySavingsTarget: Target;
}

// Financials I
export interface FinancialsIState {
  acceptableIRR: string;
  minimumROI: string;
  paybackPeriod: string;
}

// Financials II
export interface FinancialsIIState {
  investmentAmounts: string[];
  financeOption: string;
  financeDetails: string;
  desiredCostReduction: string;
  preferredTerm: string;
}

// --- Combined State ---

export interface GoalsState {
  prioritizationI: PrioritizationIState;
  prioritizationII: PrioritizationIIState;
  financialsI: FinancialsIState;
  financialsII: FinancialsIIState;
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

const defaultPrioritizationI: PrioritizationIState = {
  selectedRanks: { 1: "Select one", 2: "Select one", 3: "Select one", 4: "Select one" },
  descriptions: { 1: "", 2: "", 3: "", 4: "" },
};

const defaultPrioritizationII: PrioritizationIIState = {
  resiliencyIncrease: 50,
  scope2Reduction: 50,
  costReduction: 50,
  renewableGeneration: 50,
  blackStartCapability: '',
  islandModeCapability: '',
  gridIndependentDuration: '',
  backupPowerDuration: '',
  renewableSystemSize: '',
  decarbonizationTarget1: { value: '', unit: '%', date: '' },
  decarbonizationTarget2: { value: '', unit: '%', date: '' },
  energySavingsTarget: { value: '', unit: '%', date: '' },
};

const defaultFinancialsI: FinancialsIState = {
  acceptableIRR: '10',
  minimumROI: '',
  paybackPeriod: '',
};

const defaultFinancialsII: FinancialsIIState = {
  investmentAmounts: ['', '', ''],
  financeOption: 'default',
  financeDetails: '',
  desiredCostReduction: '',
  preferredTerm: '',
};

const initialState: GoalsState = {
  prioritizationI: loadState('prioritizationIState', defaultPrioritizationI),
  prioritizationII: loadState('prioritizationIIState', defaultPrioritizationII),
  financialsI: loadState('financialsIState', defaultFinancialsI),
  financialsII: loadState('financialsIIState', defaultFinancialsII),
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    // Prioritization I
    updatePrioritizationIRank: (state, action: PayloadAction<{ rank: number; value: string }>) => {
        const { rank, value } = action.payload;
        // Logic from Context
        const newRanks = { ...state.prioritizationI.selectedRanks };
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
        state.prioritizationI.selectedRanks = newRanks;
        localStorage.setItem('prioritizationIState', JSON.stringify(state.prioritizationI));
    },
    updatePrioritizationIDescription: (state, action: PayloadAction<{ rank: number; value: string }>) => {
        const { rank, value } = action.payload;
        state.prioritizationI.descriptions[rank] = value;
        localStorage.setItem('prioritizationIState', JSON.stringify(state.prioritizationI));
    },
    clearPrioritizationI: (state) => {
        state.prioritizationI = defaultPrioritizationI;
        localStorage.setItem('prioritizationIState', JSON.stringify(state.prioritizationI));
    },

    // Prioritization II
    updatePrioritizationIIField: (state, action: PayloadAction<{ field: keyof PrioritizationIIState; value: string | number }>) => {
        // @ts-ignore
        state.prioritizationII[action.payload.field] = action.payload.value;
        localStorage.setItem('prioritizationIIState', JSON.stringify(state.prioritizationII));
    },
    updatePrioritizationIITarget: (state, action: PayloadAction<{ target: 'decarbonizationTarget1' | 'decarbonizationTarget2' | 'energySavingsTarget'; field: keyof Target; value: string }>) => {
        const { target, field, value } = action.payload;
        state.prioritizationII[target][field] = value;
        localStorage.setItem('prioritizationIIState', JSON.stringify(state.prioritizationII));
    },

    // Financials I
    updateFinancialsIField: (state, action: PayloadAction<{ field: keyof FinancialsIState; value: string }>) => {
        state.financialsI[action.payload.field] = action.payload.value;
        localStorage.setItem('financialsIState', JSON.stringify(state.financialsI));
    },

    // Financials II
    updateFinancialsIIField: (state, action: PayloadAction<{ field: keyof Omit<FinancialsIIState, 'investmentAmounts'>; value: string }>) => {
        state.financialsII[action.payload.field] = action.payload.value;
        localStorage.setItem('financialsIIState', JSON.stringify(state.financialsII));
    },
    updateInvestmentAmount: (state, action: PayloadAction<{ index: number; value: string }>) => {
        state.financialsII.investmentAmounts[action.payload.index] = action.payload.value;
        localStorage.setItem('financialsIIState', JSON.stringify(state.financialsII));
    },
    addInvestmentAmount: (state) => {
        state.financialsII.investmentAmounts.push('');
        localStorage.setItem('financialsIIState', JSON.stringify(state.financialsII));
    },
    removeInvestmentAmount: (state, action: PayloadAction<number>) => {
        state.financialsII.investmentAmounts.splice(action.payload, 1);
        localStorage.setItem('financialsIIState', JSON.stringify(state.financialsII));
    },
  },
});

export const {
    updatePrioritizationIRank, updatePrioritizationIDescription, clearPrioritizationI,
    updatePrioritizationIIField, updatePrioritizationIITarget,
    updateFinancialsIField,
    updateFinancialsIIField, updateInvestmentAmount, addInvestmentAmount, removeInvestmentAmount
} = goalsSlice.actions;

export default goalsSlice.reducer;
