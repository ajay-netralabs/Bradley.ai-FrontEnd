import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// --- Interfaces ---

// Site Characteristics I
export interface BreakerAmperageField {
  id: string;
  value: string;
}

export interface Breaker {
  id: string;
  amperageFields: BreakerAmperageField[];
}

export interface SiteCharacteristicsIState {
  isBreakerSpaceAvailable: boolean;
  overallFacilitySize: string;
  commonAreaSquareFootage: string;
  yearBuildingOperation: string;
  primaryUtilityEntry: string;
  secondaryUtilityEntry: string;
  numberOfOpenBreakers: string;
  breakers: Breaker[];
}

// Site Characteristics II
export interface SiteCharacteristicsIIState {
  shifts: string;
  humidification: string;
  hotColdSpots: string;
  outdoorAirSupply: string;
  hvacOperation: string;
}

// Other Characteristics
export interface OtherSiteCharacteristicsState {
  uniqueFeatures: string;
  topography: string;
  primaryVoltageService: string;
  primaryVoltageServiceCustomValue?: string;
  primaryVoltageFacility: string;
  primaryVoltageFacilityCustomValue?: string;
  secondaryVoltageService: string;
  secondaryVoltageServiceCustomValue?: string;
}

// Facility Usage
export interface FacilityUsageState {
  facilityUsage: string[];
  facilityDetails: string;
  daysOfOperation: string[];
  operatingHours: { [key: string]: string };
}

// MEP Drawings
export interface MEPFileMetadata {
  name: string;
  size: number;
  type: string;
}

export interface MEPDrawingsState {
  files: File[];
  fileMetadata: MEPFileMetadata[];
}

// Roofing
export interface RoofingConsiderationsState {
  roofPenetration: string;
  roofWarrantyTerm: string;
  roofCondition: string;
  insuranceProvider: string;
  policyId: string;
}

// Roof Mount Solar
export interface SelectedArea {
  coordinates: [number, number][];
  area: number;
}

export interface RoofMountSolarState {
  roofArea: string;
  // topography: string;
  address: string;
  showMap: boolean;
  selectedAreas: SelectedArea[];
}

// Solar Assets (Inputs to Maximize)
export interface SolarAssetsState {
  roofSections: string[];
  roofLoadCapacity: string;
  buildingClassification: string;
}

// Ground Mount Solar
export interface GroundMountSolarState {
  landArea: string;
  topography: string;
  address: string;
  showMap: boolean;
  selectedAreas: SelectedArea[];
}

// Carport Solar
export interface CarportSolarState {
  roofPenetration: string;
  totalParkingSpots: string;
  parkingGarageWidth: string;
  parkingGarageLength: string;
  switchgearFloor: string;
  topFloorHeight: string;
}

// Existing Assets
export interface ExistingAssetsState {
  existingSolar: string;
  existingWind: string;
  considerWind: string;
}

// Equipment Preferences
export interface EquipmentPreferencesState {
  primeMover: string;
  primeMoverOther: string;
  primeMoverBrand: string;
  controlsBrand: string;
  controlsBrandOther: string;
  switchgearBrand: string;
  switchgearBrandOther: string;
  standard: string;
  standardOther: string;
}

// --- Combined State ---

export interface SiteAssessmentState {
  siteCharacteristicsI: SiteCharacteristicsIState;
  siteCharacteristicsII: SiteCharacteristicsIIState;
  otherCharacteristics: OtherSiteCharacteristicsState;
  facilityUsage: FacilityUsageState;
  mepDrawings: MEPDrawingsState;
  roofingConsiderations: RoofingConsiderationsState;
  roofMountSolar: RoofMountSolarState;
  solarAssets: SolarAssetsState;
  groundMountSolar: GroundMountSolarState;
  carportSolar: CarportSolarState;
  existingAssets: ExistingAssetsState;
  equipmentPreferences: EquipmentPreferencesState;
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

const defaultSiteI: SiteCharacteristicsIState = {
  isBreakerSpaceAvailable: false,
  overallFacilitySize: '',
  commonAreaSquareFootage: '',
  yearBuildingOperation: '',
  primaryUtilityEntry: 'Option 1',
  secondaryUtilityEntry: 'Option 0',
  numberOfOpenBreakers: '',
  breakers: [],
};

const defaultSiteII: SiteCharacteristicsIIState = {
  shifts: '',
  humidification: '',
  hotColdSpots: '',
  outdoorAirSupply: '',
  hvacOperation: '',
};

const defaultOther: OtherSiteCharacteristicsState = {
  uniqueFeatures: '',
  topography: 'Option 1',
  primaryVoltageService: 'Option 0',
  primaryVoltageServiceCustomValue: '',
  primaryVoltageFacility: 'Option 0',
  primaryVoltageFacilityCustomValue: '',
  secondaryVoltageService: 'Option 0',
  secondaryVoltageServiceCustomValue: '',
};

const defaultFacilityUsage: FacilityUsageState = {
  facilityUsage: [],
  facilityDetails: '',
  daysOfOperation: [],
  operatingHours: {},
};

const defaultMEP: MEPDrawingsState = { files: [], fileMetadata: [] };

const defaultRoofing: RoofingConsiderationsState = {
  roofPenetration: '',
  roofWarrantyTerm: '',
  roofCondition: '',
  insuranceProvider: '',
  policyId: '',
};

const defaultRoofMount: RoofMountSolarState = {
  roofArea: '',
  address: '',
  showMap: false,
  selectedAreas: [],
};

const defaultSolarAssets: SolarAssetsState = {
  roofSections: ['', '', ''],
  roofLoadCapacity: '',
  buildingClassification: 'default',
};

const defaultGroundMount: GroundMountSolarState = {
  landArea: '',
  topography: 'default',
  address: '',
  showMap: false,
  selectedAreas: [],
};

const defaultCarport: CarportSolarState = {
  roofPenetration: '',
  totalParkingSpots: '',
  parkingGarageWidth: '',
  parkingGarageLength: '',
  switchgearFloor: '',
  topFloorHeight: '',
};

const defaultExistingAssets: ExistingAssetsState = {
  existingSolar: '',
  existingWind: '',
  considerWind: '',
};

const defaultEquipment: EquipmentPreferencesState = {
  primeMover: 'default',
  primeMoverOther: '',
  primeMoverBrand: 'default',
  controlsBrand: 'default',
  controlsBrandOther: '',
  switchgearBrand: 'default',
  switchgearBrandOther: '',
  standard: 'All (Default)',
  standardOther: '',
};

const initialState: SiteAssessmentState = {
  siteCharacteristicsI: loadState('siteCharacteristicsIState', defaultSiteI),
  siteCharacteristicsII: loadState('siteCharacteristicsIIState', defaultSiteII),
  otherCharacteristics: loadState('otherCharacteristicsState', defaultOther),
  facilityUsage: loadState('facilityUsageState', defaultFacilityUsage),
  mepDrawings: { ...loadState('mepDrawingsState', defaultMEP), files: [] }, // Hydrate metadata only
  roofingConsiderations: loadState('roofingConsiderationsState', defaultRoofing),
  roofMountSolar: loadState('roofMountSolarState', defaultRoofMount),
  solarAssets: loadState('solarAssetsState', defaultSolarAssets),
  groundMountSolar: loadState('groundMountSolarState', defaultGroundMount),
  carportSolar: loadState('carportSolarState', defaultCarport),
  existingAssets: loadState('existingAssetsState', defaultExistingAssets),
  equipmentPreferences: loadState('equipmentPreferencesState', defaultEquipment),
};

const siteAssessmentSlice = createSlice({
  name: 'siteAssessment',
  initialState,
  reducers: {
    // Site Characteristics I
    updateSiteIField: (state, action: PayloadAction<{ field: keyof Omit<SiteCharacteristicsIState, 'breakers' | 'numberOfOpenBreakers'>; value: string | boolean }>) => {
      // @ts-ignore
      state.siteCharacteristicsI[action.payload.field] = action.payload.value;
      localStorage.setItem('siteCharacteristicsIState', JSON.stringify(state.siteCharacteristicsI));
    },
    setNumberOfBreakers: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      const numValue = parseInt(value, 10);
      if (value === '' || (numValue >= 1 && numValue <= 5)) {
        if (value === '') {
            // keep existing logic? usually clears if empty string
        } else {
             const currentBreakers = state.siteCharacteristicsI.breakers;
             const newBreakers: Breaker[] = [];
             for (let i = 0; i < numValue; i++) {
                const existing = currentBreakers[i];
                newBreakers.push({
                    id: existing?.id || `breaker-${Date.now()}-${i}`,
                    amperageFields: existing?.amperageFields || [{ id: `amperage-${Date.now()}-${i}-0`, value: '' }]
                });
             }
             state.siteCharacteristicsI.breakers = newBreakers;
        }
        state.siteCharacteristicsI.numberOfOpenBreakers = value;
        localStorage.setItem('siteCharacteristicsIState', JSON.stringify(state.siteCharacteristicsI));
      }
    },
    addBreaker: (state) => {
      if (state.siteCharacteristicsI.breakers.length < 5) {
         state.siteCharacteristicsI.breakers.push({ id: `breaker-${Date.now()}`, amperageFields: [{ id: `amperage-${Date.now()}-0`, value: '' }] });
         state.siteCharacteristicsI.numberOfOpenBreakers = state.siteCharacteristicsI.breakers.length.toString();
         localStorage.setItem('siteCharacteristicsIState', JSON.stringify(state.siteCharacteristicsI));
      }
    },
    removeBreaker: (state, action: PayloadAction<number>) => {
        state.siteCharacteristicsI.breakers.splice(action.payload, 1);
        state.siteCharacteristicsI.numberOfOpenBreakers = state.siteCharacteristicsI.breakers.length.toString();
        localStorage.setItem('siteCharacteristicsIState', JSON.stringify(state.siteCharacteristicsI));
    },
    updateAmperageField: (state, action: PayloadAction<{ breakerIndex: number; fieldIndex: number; value: string }>) => {
        const { breakerIndex, fieldIndex, value } = action.payload;
        if (state.siteCharacteristicsI.breakers[breakerIndex]?.amperageFields[fieldIndex]) {
            state.siteCharacteristicsI.breakers[breakerIndex].amperageFields[fieldIndex].value = value;
            localStorage.setItem('siteCharacteristicsIState', JSON.stringify(state.siteCharacteristicsI));
        }
    },

    // Site Characteristics II
    updateSiteIIField: (state, action: PayloadAction<{ field: keyof SiteCharacteristicsIIState; value: string }>) => {
        state.siteCharacteristicsII[action.payload.field] = action.payload.value;
        localStorage.setItem('siteCharacteristicsIIState', JSON.stringify(state.siteCharacteristicsII));
    },

    // Other Characteristics
    updateOtherField: (state, action: PayloadAction<{ field: keyof OtherSiteCharacteristicsState; value: string }>) => {
        state.otherCharacteristics[action.payload.field] = action.payload.value;
        localStorage.setItem('otherCharacteristicsState', JSON.stringify(state.otherCharacteristics));
    },

    // Facility Usage
    updateFacilityUsageMultiSelect: (state, action: PayloadAction<{ field: 'facilityUsage' | 'daysOfOperation'; value: string[] }>) => {
        state.facilityUsage[action.payload.field] = action.payload.value;
        localStorage.setItem('facilityUsageState', JSON.stringify(state.facilityUsage));
    },
    updateFacilityDetails: (state, action: PayloadAction<string>) => {
        state.facilityUsage.facilityDetails = action.payload;
        localStorage.setItem('facilityUsageState', JSON.stringify(state.facilityUsage));
    },
    updateOperatingHour: (state, action: PayloadAction<{ day: string; timeRange: string }>) => {
        state.facilityUsage.operatingHours[action.payload.day] = action.payload.timeRange;
        localStorage.setItem('facilityUsageState', JSON.stringify(state.facilityUsage));
    },

    // MEP Drawings
    addMEPFiles: (state, action: PayloadAction<File[]>) => {
        const newFiles = action.payload;
        const newMetadata = newFiles.map(file => ({ name: file.name, size: file.size, type: file.type }));
        
        const uniqueMetadata = newMetadata.filter(nm => !state.mepDrawings.fileMetadata.some(em => em.name === nm.name));
        const uniqueFiles = newFiles.filter(nf => !state.mepDrawings.files.some(ef => ef.name === nf.name));

        state.mepDrawings.fileMetadata.push(...uniqueMetadata);
        state.mepDrawings.files.push(...uniqueFiles);

        localStorage.setItem('mepDrawingsState', JSON.stringify({ fileMetadata: state.mepDrawings.fileMetadata }));
    },
    removeMEPFile: (state, action: PayloadAction<string>) => {
        const fileName = action.payload;
        state.mepDrawings.files = state.mepDrawings.files.filter(f => f.name !== fileName);
        state.mepDrawings.fileMetadata = state.mepDrawings.fileMetadata.filter(m => m.name !== fileName);
        localStorage.setItem('mepDrawingsState', JSON.stringify({ fileMetadata: state.mepDrawings.fileMetadata }));
    },

    // Roofing
    updateRoofingField: (state, action: PayloadAction<{ field: keyof RoofingConsiderationsState; value: string }>) => {
        state.roofingConsiderations[action.payload.field] = action.payload.value;
        localStorage.setItem('roofingConsiderationsState', JSON.stringify(state.roofingConsiderations));
    },

    // Roof Mount Solar
    updateRoofMountField: (state, action: PayloadAction<{ field: keyof Omit<RoofMountSolarState, 'selectedAreas' | 'roofArea'>; value: string | boolean }>) => {
        // @ts-ignore
        state.roofMountSolar[action.payload.field] = action.payload.value;
        localStorage.setItem('roofMountSolarState', JSON.stringify(state.roofMountSolar));
    },
    updateRoofMountArea: (state, action: PayloadAction<string>) => {
        state.roofMountSolar.roofArea = action.payload;
        localStorage.setItem('roofMountSolarState', JSON.stringify(state.roofMountSolar));
    },
    updateRoofMountSelectedAreas: (state, action: PayloadAction<SelectedArea[]>) => {
        state.roofMountSolar.selectedAreas = action.payload;
        localStorage.setItem('roofMountSolarState', JSON.stringify(state.roofMountSolar));
    },

    // Solar Assets
    updateSolarAssetsField: (state, action: PayloadAction<{ field: keyof Omit<SolarAssetsState, 'roofSections'>; value: string }>) => {
        // @ts-ignore
        state.solarAssets[action.payload.field] = action.payload.value;
        localStorage.setItem('solarAssetsState', JSON.stringify(state.solarAssets));
    },
    updateRoofSection: (state, action: PayloadAction<{ index: number; value: string }>) => {
        state.solarAssets.roofSections[action.payload.index] = action.payload.value;
        localStorage.setItem('solarAssetsState', JSON.stringify(state.solarAssets));
    },
    addRoofSection: (state) => {
        state.solarAssets.roofSections.push('');
        localStorage.setItem('solarAssetsState', JSON.stringify(state.solarAssets));
    },
    removeRoofSection: (state, action: PayloadAction<number>) => {
        state.solarAssets.roofSections.splice(action.payload, 1);
        localStorage.setItem('solarAssetsState', JSON.stringify(state.solarAssets));
    },

    // Ground Mount Solar
    updateGroundMountField: (state, action: PayloadAction<{ field: keyof Omit<GroundMountSolarState, 'selectedAreas' | 'landArea'>; value: string | boolean }>) => {
        // @ts-ignore
        state.groundMountSolar[action.payload.field] = action.payload.value;
        localStorage.setItem('groundMountSolarState', JSON.stringify(state.groundMountSolar));
    },
    updateGroundMountLandArea: (state, action: PayloadAction<string>) => {
        state.groundMountSolar.landArea = action.payload;
        localStorage.setItem('groundMountSolarState', JSON.stringify(state.groundMountSolar));
    },
    updateGroundMountSelectedAreas: (state, action: PayloadAction<SelectedArea[]>) => {
        state.groundMountSolar.selectedAreas = action.payload;
        localStorage.setItem('groundMountSolarState', JSON.stringify(state.groundMountSolar));
    },

    // Carport Solar
    updateCarportField: (state, action: PayloadAction<{ field: keyof CarportSolarState; value: string }>) => {
        state.carportSolar[action.payload.field] = action.payload.value;
        localStorage.setItem('carportSolarState', JSON.stringify(state.carportSolar));
    },

    // Existing Assets
    updateExistingAssetsField: (state, action: PayloadAction<{ field: keyof ExistingAssetsState; value: string }>) => {
        state.existingAssets[action.payload.field] = action.payload.value;
        localStorage.setItem('existingAssetsState', JSON.stringify(state.existingAssets));
    },

    // Equipment Preferences
    updateEquipmentField: (state, action: PayloadAction<{ field: keyof EquipmentPreferencesState; value: string }>) => {
        const { field, value } = action.payload;
        state.equipmentPreferences[field] = value;
        if (field === 'primeMover') {
            state.equipmentPreferences.primeMoverBrand = 'default';
            state.equipmentPreferences.primeMoverOther = '';
        }
        localStorage.setItem('equipmentPreferencesState', JSON.stringify(state.equipmentPreferences));
    },
  },
});

export const {
    updateSiteIField, setNumberOfBreakers, addBreaker, removeBreaker, updateAmperageField,
    updateSiteIIField,
    updateOtherField,
    updateFacilityUsageMultiSelect, updateFacilityDetails, updateOperatingHour,
    addMEPFiles, removeMEPFile,
    updateRoofingField,
    updateRoofMountField, updateRoofMountArea, updateRoofMountSelectedAreas,
    updateSolarAssetsField, updateRoofSection, addRoofSection, removeRoofSection,
    updateGroundMountField, updateGroundMountLandArea, updateGroundMountSelectedAreas,
    updateCarportField,
    updateExistingAssetsField,
    updateEquipmentField
} = siteAssessmentSlice.actions;

export default siteAssessmentSlice.reducer;
