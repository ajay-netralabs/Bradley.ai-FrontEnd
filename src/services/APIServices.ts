import { ORGANIZATION_DATA, ADDRESS_DATA, ENERGY_INTERVAL_DATA, THERMAL_ENERGY_NEEDS_I_DATA, THERMAL_ENERGY_NEEDS_II_DATA, THERMAL_ENERGY_NEEDS_III_DATA, THERMAL_ENERGY_NEEDS_IV_DATA, EXISTING_BOILER_COGENERATION_DATA } from './Constants';
import { DashboardData } from '../Context/DashboardDataContext'; // Import the interface

// --- Interfaces for Data Structures (simplified for API interaction) ---

export interface OrganizationDetails {
organizationName: string;
userName: string;
userEmail: string;
userTitle: string;
organizationType: string;
industry: string;
irsCategory: string;
employeeCount: string;
}

export interface OrgDetailsResponse {
message: string;
organization_id: string;
}

export interface AddressPayload {
streetAddress: string;
city: string;
state: string;
zipCode: string;
organizationId: string;
}

export interface BillMetadata {
id: string;
name: string;
size: string;
type: 'electric' | 'gas';
dateRange: { start: string; end: string };
addressId: string;
}

export interface ThermalEnergyNeedsI {
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

export interface ThermalEnergyNeedsII {
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

export interface ThermalEnergyNeedsIII {
showChilledWater: boolean;
chilledCapacity: string;
coolingTonHours: string;
temperatureLeaving: string;
additionalDemand: string;
temperatureReturning: string;
pumpHp: string;
pumpCount: string;
}

export interface WasteHeatSource {
type: string;
temperature: string;
flowRate: string;
utilization: string;
}

export interface ThermalEnergyNeedsIV {
showWasteHeat: boolean;
wasteHeatSources: WasteHeatSource[];
benefitFromUtilization: string;
}

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

export interface ExistingBoilerCogeneration {
sources: BoilerCogenerationSource[];
}

// --- API Service Functions ---

// Organization Details
export const updateOrganizationDetails = async (data: OrganizationDetails): Promise<string> => {
try {
const response = await fetch(ORGANIZATION_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const responseData: OrgDetailsResponse = await response.json();
console.log('Organization details updated successfully');
return responseData.organization_id; // Return the organization ID
} catch (error) {
console.error('Error updating organization details:', error);
throw error; // Re-throw the error to be caught by the caller
}
};

export interface AddressUpdateResponse {
message: string;
facility_ids: string[];
}

// let globalResponse: any = null;

// Facility Address
export const updateFacilityAddresses = async (data: AddressPayload[]): Promise<AddressUpdateResponse> => {
try {
const response = await fetch(ADDRESS_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
const responseData: AddressUpdateResponse = await response.json();
console.log('Facility addresses updated successfully', responseData);
return responseData; // Return the response data
} catch (error) {
console.error('Error updating facility addresses:', error);
throw error; // Re-throw the error to be caught by the caller
}
};

// Bill Upload
export const uploadBillData = async (Files: File[], sources: string[], uuids: string[]): Promise<DashboardData> => {
try {
const formData = new FormData();
Files.forEach(file => {
formData.append('files', file);
});
sources.forEach(source => {
formData.append('sources', source);
});
uuids.forEach(uuid => {
formData.append('uuids', uuid);
});

const response = await fetch(ENERGY_INTERVAL_DATA, {
method: 'POST',
body: formData,
});

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}

// The response is directly the dashboard data array
const responseData: DashboardData = await response.json();
console.log('Bill data uploaded successfully');
return responseData;
} catch (error) {
console.error('Error uploading bill data:', error);
throw error; // Re-throw the error to be caught by the caller
}
};

export const addThermalEnergyNeedsI = async (data: ThermalEnergyNeedsI, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_I_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
console.log('Thermal Energy Needs I data added successfully');
return true;
} catch (error) {
console.error('Error adding Thermal Energy Needs I data:', error);
return false;
}
};

export const addThermalEnergyNeedsII = async (data: ThermalEnergyNeedsII, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_II_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
console.log('Thermal Energy Needs II data added successfully');
return true;
} catch (error) {
console.error('Error adding Thermal Energy Needs II data:', error);
return false;
}
};

export const addThermalEnergyNeedsIII = async (data: ThermalEnergyNeedsIII, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_III_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
console.log('Thermal Energy Needs III data added successfully');
return true;
} catch (error) {
console.error('Error adding Thermal Energy Needs III data:', error);
return false;
}
};

export const addThermalEnergyNeedsIV = async (data: ThermalEnergyNeedsIV, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(THERMAL_ENERGY_NEEDS_IV_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
console.log('Thermal Energy Needs IV data added successfully');
return true;
} catch (error) {
console.error('Error adding Thermal Energy Needs IV data:', error);
return false;
}
};

export const addExistingBoilerCogeneration = async (data: ExistingBoilerCogeneration, file_id: string): Promise<boolean> => {
try {
const payload = { ...data, file_id };
const response = await fetch(EXISTING_BOILER_COGENERATION_DATA, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(payload),
});
if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}
console.log('Existing Boiler Cogeneration data added successfully');
return true;
} catch (error) {
console.error('Error adding Existing Boiler Cogeneration data:', error);
return false;
}
};