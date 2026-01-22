import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Interfaces ---

// Electric & Gas
export interface FileMetadata {
  name: string;
  size: string;
  dateRange: { start: string; end: string };
}

export interface BillUploadState {
  fileMetadata: FileMetadata[];
  files: File[]; // Non-serializable!
}

// Bill Address (New)
export interface Bill {
  id: string;
  name: string;
  size: string;
  type: 'grid' | 'gas' | 'water';
  dateRange: { start: string; end: string };
  addressId?: string;
}

export interface BillAddress {
  id: string;
  address: string;
}

export interface BillAddressState {
  bills: Bill[];
  addresses: BillAddress[];
}

// Thermal I
export interface ThermalEnergyNeedsIState {
  showSteam: boolean;
  annualSteamUsage: string;
  steamPressureRange: string;
  exactSteamPressure: string;
  steamUsageConsistency: string;
  condensateReturn: string;
  returnFLOW: string;
  returnCondensateTemperature: string;
  makeUpWater: string;
}

// Thermal II
export interface ThermalEnergyNeedsIIState {
  showHotWaterHVAC: boolean;
  showHotWaterBoilers: boolean;
  showSteam2HWDomestic: boolean;
  showSteam2HWAHU: boolean;
  showSteam4Washdowns: boolean;
  hotWaterUsage: string;
  hotWaterTemperature: string;
  hotWaterUsageTypeAmount: string;
  hotWaterUsageTypeReason: string;
  preheatForSteam: string;
  foodWashdowns: string;
  otherUsage: string;
  boilerCapacity: string;
  boilerBHP: string;
  boilerType: string;
  boilerModulation: string;
  boilerCount: string;
  bhpBoilerCount: string;
}

// Thermal III
export interface ThermalEnergyNeedsIIIState {
  showChilledWater: boolean;
  chilledCapacity: string;
  coolingTonHours: string;
  temperatureLeaving: string;
  additionalDemand: string;
  temperatureReturning: string;
  pumpHp: string;
  pumpCount: string;
}

// Thermal IV
export interface WasteHeatSource {
  type: string;
  temperature: string;
  flowRate: string;
  utilization: string;
}

export interface ThermalEnergyNeedsIVState {
  showWasteHeat: boolean;
  wasteHeatSources: WasteHeatSource[];
  benefitFromUtilization: string;
}

// Boiler Cogeneration (New)
export interface BoilerCogenerationSource {
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

export interface BoilerCogenerationState {
  sources: BoilerCogenerationSource[];
}

// LOA Form (New)
export interface LOATextFields {
  day: string;
  month: string;
  contactName: string;
}

export interface LOAContactDetails {
  serviceAddress: string;
  phoneNo: string;
  serviceAccountNo: string;
}

export interface LOAFormState {
  utilityCompanyName: string;
  textFields: LOATextFields;
  contactDetails: LOAContactDetails;
  signature: string;
  agreed: boolean;
}

// LOA Status
export type LoaStatusType = 'Awaiting Approval' | 'Approved' | 'Declined' | 'LOA Not Signed';

export interface LOAStatusState {
  status: LoaStatusType;
  details: string;
}

// --- Combined State ---

export interface EnergyProfileState {
  electricBill: BillUploadState;
  naturalGasBill: BillUploadState;
  billAddress: BillAddressState;
  thermalNeedsI: ThermalEnergyNeedsIState;
  thermalNeedsII: ThermalEnergyNeedsIIState;
  thermalNeedsIII: ThermalEnergyNeedsIIIState;
  thermalNeedsIV: ThermalEnergyNeedsIVState;
  boilerCogeneration: BoilerCogenerationState;
  loaForm: LOAFormState;
  loaStatus: LOAStatusState;
}

// --- Defaults ---

const defaultBillState: BillUploadState = { fileMetadata: [], files: [] };

// const defaultBillAddress: BillAddressState = { bills: [], addresses: [] };

const defaultThermalI: ThermalEnergyNeedsIState = {
  showSteam: false,
  annualSteamUsage: '',
  steamPressureRange: '0.5-15',
  exactSteamPressure: '',
  steamUsageConsistency: 'select',
  condensateReturn: '',
  returnFLOW: '',
  returnCondensateTemperature: '',
  makeUpWater: '',
};

const defaultThermalII: ThermalEnergyNeedsIIState = {
  showHotWaterHVAC: false,
  showHotWaterBoilers: false,
  showSteam2HWDomestic: false,
  showSteam2HWAHU: false,
  showSteam4Washdowns: false,
  hotWaterUsage: '',
  hotWaterTemperature: '',
  hotWaterUsageTypeAmount: '',
  hotWaterUsageTypeReason: '',
  preheatForSteam: '',
  foodWashdowns: '',
  otherUsage: '',
  boilerCapacity: '',
  boilerBHP: '',
  boilerType: 'Select Boiler Type',
  boilerModulation: 'Select',
  boilerCount: '',
  bhpBoilerCount: '',
};

const defaultThermalIII: ThermalEnergyNeedsIIIState = {
  showChilledWater: false,
  chilledCapacity: "",
  coolingTonHours: "",
  temperatureLeaving: "",
  additionalDemand: "",
  temperatureReturning: "",
  pumpHp: "",
  pumpCount: "",
};

const defaultThermalIV: ThermalEnergyNeedsIVState = {
  showWasteHeat: false,
  wasteHeatSources: [{ type: '', temperature: '', flowRate: '', utilization: '' }],
  benefitFromUtilization: 'Option 1',
};

const defaultBoiler: BoilerCogenerationState = {
  sources: [{ type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '', wasteHeatCaptured: '' }],
};

const defaultLOAForm: LOAFormState = {
  utilityCompanyName: '',
  textFields: { day: '', month: '', contactName: '' },
  contactDetails: { serviceAddress: '', phoneNo: '', serviceAccountNo: '' },
  signature: '',
  agreed: false,
};

const defaultLOA: LOAStatusState = {
  status: 'LOA Not Signed',
  details: '',
};

// --- Hydration Helpers ---

const loadState = <T>(key: string, defaultVal: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch (e) {
    console.error(`Failed to load ${key}`, e);
    return defaultVal;
  }
};

// Custom loader for BillAddress to match prefix logic if needed, 
// but we will stick to a standard key for Redux migration 'energyProfile_billAddress' or similar.
// The original used dynamic `appPrefix`. We will use 'billAddressState' for simplicity.
const loadBillAddress = (): BillAddressState => {
    // Attempt to load bills
    let bills: Bill[] = [];
    const savedBills = localStorage.getItem('billAddress_bills'); // Standardized key
    if (savedBills) {
        try {
            bills = JSON.parse(savedBills).map((bill: any) => ({
                ...bill,
                dateRange: bill.dateRange || { start: '', end: '' }
            }));
        } catch {}
    }
    const savedAddr = localStorage.getItem('billAddress_addresses');
    const addresses = savedAddr ? JSON.parse(savedAddr) : [];
    return { bills, addresses };
};

// Initialize State
const initialState: EnergyProfileState = {
  electricBill: { ...loadState('electricBillUploadState', defaultBillState), files: [] },
  naturalGasBill: { ...loadState('naturalGasBillUploadState', defaultBillState), files: [] },
  billAddress: loadBillAddress(),
  thermalNeedsI: loadState('thermalEnergyNeedsIState', defaultThermalI),
  thermalNeedsII: loadState('thermalEnergyNeedsIIState', defaultThermalII),
  thermalNeedsIII: loadState('thermalEnergyNeedsIIIState', defaultThermalIII),
  thermalNeedsIV: loadState('thermalEnergyNeedsIVState', defaultThermalIV),
  boilerCogeneration: loadState('boilerCogenerationState', defaultBoiler),
  loaForm: loadState('loaState', defaultLOAForm),
  loaStatus: loadState('loaStatusState', defaultLOA),
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const energyProfileSlice = createSlice({
  name: 'energyProfile',
  initialState,
  reducers: {
    // Electric Bill
    addElectricFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ 
            name: file.name, 
            size: formatFileSize(file.size),
            dateRange: { start: '', end: '' }
        }));
        
        // Filter duplicates
        const uniqueNewMetadata = newMetadata.filter(nm => !state.electricBill.fileMetadata.some(em => em.name === nm.name));
        const uniqueNewFiles = newFiles.filter(nf => !state.electricBill.files.some(ef => ef.name === nf.name));

        state.electricBill.fileMetadata.push(...uniqueNewMetadata);
        state.electricBill.files.push(...uniqueNewFiles);

        // Persist Metadata Only
        localStorage.setItem('electricBillUploadState', JSON.stringify({ ...state.electricBill, files: undefined }));
    },
    removeElectricFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.electricBill.fileMetadata = state.electricBill.fileMetadata.filter(m => m.name !== fileName);
        state.electricBill.files = state.electricBill.files.filter(f => f.name !== fileName);
        localStorage.setItem('electricBillUploadState', JSON.stringify({ ...state.electricBill, files: undefined }));
    },

    // Gas Bill
    addGasFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ 
            name: file.name, 
            size: formatFileSize(file.size),
            dateRange: { start: '', end: '' }
        }));
        
        const uniqueNewMetadata = newMetadata.filter(nm => !state.naturalGasBill.fileMetadata.some(em => em.name === nm.name));
        const uniqueNewFiles = newFiles.filter(nf => !state.naturalGasBill.files.some(ef => ef.name === nf.name));

        state.naturalGasBill.fileMetadata.push(...uniqueNewMetadata);
        state.naturalGasBill.files.push(...uniqueNewFiles);

        localStorage.setItem('naturalGasBillUploadState', JSON.stringify({ ...state.naturalGasBill, files: undefined }));
    },
    removeGasFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.naturalGasBill.fileMetadata = state.naturalGasBill.fileMetadata.filter(m => m.name !== fileName);
        state.naturalGasBill.files = state.naturalGasBill.files.filter(f => f.name !== fileName);
        localStorage.setItem('naturalGasBillUploadState', JSON.stringify({ ...state.naturalGasBill, files: undefined }));
    },

    // Bill Address
    setBills: (state, action: PayloadAction<Bill[]>) => {
        state.billAddress.bills = action.payload;
        localStorage.setItem('billAddress_bills', JSON.stringify(state.billAddress.bills));
    },
    addBill: (state, action: PayloadAction<Omit<Bill, 'id' | 'dateRange' | 'addressId'>>) => {
        const newBill: Bill = { 
            ...action.payload, 
            id: `bill_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
            dateRange: { start: '', end: '' } 
        };
        state.billAddress.bills.push(newBill);
        localStorage.setItem('billAddress_bills', JSON.stringify(state.billAddress.bills));
    },
    removeBill: (state, action: PayloadAction<string>) => {
        state.billAddress.bills = state.billAddress.bills.filter(b => b.id !== action.payload);
        localStorage.setItem('billAddress_bills', JSON.stringify(state.billAddress.bills));
    },
    setAddresses: (state, action: PayloadAction<BillAddress[]>) => {
        state.billAddress.addresses = action.payload;
        localStorage.setItem('billAddress_addresses', JSON.stringify(state.billAddress.addresses));
    },
    assignAddressToBill: (state, action: PayloadAction<{ billId: string; addressId: string }>) => {
        const bill = state.billAddress.bills.find(b => b.id === action.payload.billId);
        if (bill) {
            bill.addressId = action.payload.addressId;
            localStorage.setItem('billAddress_bills', JSON.stringify(state.billAddress.bills));
        }
    },
    updateBillDateRange: (state, action: PayloadAction<{ billId: string; dateRange: { start: string; end: string } }>) => {
        const bill = state.billAddress.bills.find(b => b.id === action.payload.billId);
        if (bill) {
            bill.dateRange = action.payload.dateRange;
            localStorage.setItem('billAddress_bills', JSON.stringify(state.billAddress.bills));
        }
    },

    // Thermal I
    updateThermalI: (state, action: PayloadAction<{ field: keyof ThermalEnergyNeedsIState; value: string | boolean }>) => {
        const { field, value } = action.payload;
        // @ts-ignore
        state.thermalNeedsI[field] = value;
        localStorage.setItem('thermalEnergyNeedsIState', JSON.stringify(state.thermalNeedsI));
    },

    // Thermal II
    updateThermalII: (state, action: PayloadAction<{ field: keyof ThermalEnergyNeedsIIState; value: string | boolean }>) => {
        const { field, value } = action.payload;
        // @ts-ignore
        state.thermalNeedsII[field] = value;
        localStorage.setItem('thermalEnergyNeedsIIState', JSON.stringify(state.thermalNeedsII));
    },

    // Thermal III
    updateThermalIII: (state, action: PayloadAction<{ field: keyof ThermalEnergyNeedsIIIState; value: string | boolean }>) => {
        const { field, value } = action.payload;
        // @ts-ignore
        state.thermalNeedsIII[field] = value;
        localStorage.setItem('thermalEnergyNeedsIIIState', JSON.stringify(state.thermalNeedsIII));
    },

    // Thermal IV
    updateThermalIV: (state, action: PayloadAction<{ field: keyof ThermalEnergyNeedsIVState; value: string | boolean }>) => {
        const { field, value } = action.payload;
        // @ts-ignore
        state.thermalNeedsIV[field] = value;
        localStorage.setItem('thermalEnergyNeedsIVState', JSON.stringify(state.thermalNeedsIV));
    },
    addWasteHeatSource: (state) => {
        state.thermalNeedsIV.wasteHeatSources.push({ type: '', temperature: '', flowRate: '', utilization: '' });
        localStorage.setItem('thermalEnergyNeedsIVState', JSON.stringify(state.thermalNeedsIV));
    },
    removeWasteHeatSource: (state, action: PayloadAction<number>) => {
        state.thermalNeedsIV.wasteHeatSources.splice(action.payload, 1);
        localStorage.setItem('thermalEnergyNeedsIVState', JSON.stringify(state.thermalNeedsIV));
    },
    updateWasteHeatSource: (state, action: PayloadAction<{ index: number; field: keyof WasteHeatSource; value: string }>) => {
        const { index, field, value } = action.payload;
        if (state.thermalNeedsIV.wasteHeatSources[index]) {
            state.thermalNeedsIV.wasteHeatSources[index][field] = value;
            localStorage.setItem('thermalEnergyNeedsIVState', JSON.stringify(state.thermalNeedsIV));
        }
    },

    // Boiler Cogeneration
    addBoilerSource: (state) => {
        state.boilerCogeneration.sources.push({ type: '', capacity: '', fuelSource: '', efficiency: '', age: '', operatingPressure: '', history: '', utilization: '', volume: '', wasteHeatCaptured: '' });
        localStorage.setItem('boilerCogenerationState', JSON.stringify(state.boilerCogeneration));
    },
    removeBoilerSource: (state, action: PayloadAction<number>) => {
        state.boilerCogeneration.sources.splice(action.payload, 1);
        localStorage.setItem('boilerCogenerationState', JSON.stringify(state.boilerCogeneration));
    },
    updateBoilerSource: (state, action: PayloadAction<{ index: number; field: keyof BoilerCogenerationSource; value: string }>) => {
        const { index, field, value } = action.payload;
        if (state.boilerCogeneration.sources[index]) {
            state.boilerCogeneration.sources[index][field] = value;
            localStorage.setItem('boilerCogenerationState', JSON.stringify(state.boilerCogeneration));
        }
    },

    // LOA Form
    updateLOAField: (state, action: PayloadAction<{ field: keyof LOAFormState; value: string | boolean }>) => {
        // @ts-ignore
        state.loaForm[action.payload.field] = action.payload.value;
        localStorage.setItem('loaState', JSON.stringify(state.loaForm));
    },
    updateLOANestedField: (state, action: PayloadAction<{ section: 'textFields' | 'contactDetails'; field: string; value: string }>) => {
        const { section, field, value } = action.payload;
        // @ts-ignore
        state.loaForm[section][field] = value;
        localStorage.setItem('loaState', JSON.stringify(state.loaForm));
    },

    // LOA Status
    updateLOAStatus: (state, action: PayloadAction<{ status: LoaStatusType; details?: string }>) => {
        state.loaStatus.status = action.payload.status;
        if (action.payload.details !== undefined) {
            state.loaStatus.details = action.payload.details;
        }
        localStorage.setItem('loaStatusState', JSON.stringify(state.loaStatus));
    },
  },
});

export const {
    addElectricFiles, removeElectricFile,
    addGasFiles, removeGasFile,
    setBills, addBill, removeBill, setAddresses, assignAddressToBill, updateBillDateRange,
    updateThermalI, updateThermalII, updateThermalIII, 
    updateThermalIV, addWasteHeatSource, removeWasteHeatSource, updateWasteHeatSource,
    addBoilerSource, removeBoilerSource, updateBoilerSource,
    updateLOAField, updateLOANestedField,
    updateLOAStatus
} = energyProfileSlice.actions;

export default energyProfileSlice.reducer;
